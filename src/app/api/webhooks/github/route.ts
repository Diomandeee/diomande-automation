import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function verifySignature(payload: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function detectType(repo: {
  language?: string | null;
  topics?: string[];
  name?: string;
}): { type: string; category: string } {
  const lang = (repo.language || "").toLowerCase();
  const topics = (repo.topics || []).map((t: string) => t.toLowerCase());
  const name = (repo.name || "").toLowerCase();

  if (lang === "swift" || topics.includes("ios") || topics.includes("swiftui")) {
    return { type: "ios", category: "ios" };
  }
  if (lang === "rust") {
    return name.includes("lib") || name.includes("kernel") || name.includes("sdk")
      ? { type: "rust_lib", category: "core" }
      : { type: "rust_bin", category: "tools" };
  }
  if (lang === "python") {
    return topics.includes("ai") || topics.includes("ml")
      ? { type: "python", category: "infrastructure" }
      : { type: "python", category: "tools" };
  }
  if (lang === "typescript" || lang === "javascript") {
    return topics.includes("nextjs") || topics.includes("react") || topics.includes("web")
      ? { type: "web", category: "web" }
      : { type: "typescript", category: "tools" };
  }
  return { type: "unknown", category: "research" };
}

export async function POST(request: NextRequest) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("x-hub-signature-256");

  if (!verifySignature(body, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = request.headers.get("x-github-event");
  const payload = JSON.parse(body);

  // Handle repository creation and push events
  if (event !== "repository" && event !== "push" && event !== "create") {
    return NextResponse.json({ status: "ignored", event });
  }

  const repo = payload.repository;
  if (!repo) {
    return NextResponse.json({ error: "No repository in payload" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { type, category } = detectType({
    language: repo.language,
    topics: repo.topics || [],
    name: repo.name,
  });

  const slug = slugify(repo.name);

  const { error } = await supabase
    .from("project_registry")
    .upsert(
      {
        github_id: repo.id,
        slug,
        name: repo.name,
        display_name: repo.name,
        full_name: repo.full_name,
        description: repo.description || "",
        path: repo.html_url,
        language: repo.language,
        topics: repo.topics || [],
        homepage: repo.homepage || null,
        html_url: repo.html_url,
        visibility: repo.private ? "private" : "public",
        default_branch: repo.default_branch || "main",
        created_at: repo.created_at,
        updated_at: new Date().toISOString(),
        pushed_at: repo.pushed_at,
        project_type: type,
        category,
        maturity: "prototype",
        state: "active",
        source_type: "github",
        created_by: "github-webhook",
      },
      { onConflict: "github_id" }
    );

  if (error) {
    console.error("Failed to upsert project:", error.message);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({
    status: "registered",
    slug,
    type,
    category,
    repo: repo.full_name,
  });
}
