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

  // iOS detection
  if (lang === "swift" || topics.includes("ios") || topics.includes("swiftui")) {
    return { type: "ios", category: "iOS & macOS Apps" };
  }

  // Rust detection
  if (lang === "rust") {
    if (name.includes("lib") || name.includes("kernel") || name.includes("sdk")) {
      return { type: "rust_lib", category: "AI Infrastructure" };
    }
    return { type: "rust_bin", category: "Developer Tools" };
  }

  // Python detection
  if (lang === "python") {
    if (topics.includes("ai") || topics.includes("ml")) {
      return { type: "python", category: "AI Infrastructure" };
    }
    return { type: "python", category: "Developer Tools" };
  }

  // TypeScript/JavaScript web detection
  if (lang === "typescript" || lang === "javascript") {
    if (topics.includes("nextjs") || topics.includes("react") || topics.includes("web")) {
      return { type: "web", category: "Web Platforms" };
    }
    return { type: "typescript", category: "Developer Tools" };
  }

  return { type: "unknown", category: "Research" };
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
        full_name: repo.full_name,
        description: repo.description || "",
        language: repo.language,
        topics: repo.topics || [],
        homepage: repo.homepage || null,
        html_url: repo.html_url,
        visibility: repo.private ? "private" : "public",
        default_branch: repo.default_branch || "main",
        created_at: repo.created_at,
        updated_at: new Date().toISOString(),
        pushed_at: repo.pushed_at,
        auto_detected_type: type,
        category,
        maturity: "prototype",
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
