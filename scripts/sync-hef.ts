/**
 * Sync HEF graduated projects from Supabase → projects.ts
 *
 * Reads pending rows from hef_portfolio_projects, generates TypeScript
 * Project literal strings, appends to projects.ts, marks as published,
 * and commits + pushes to trigger Vercel auto-deploy.
 *
 * Usage: npx tsx scripts/sync-hef.ts
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { resolve } from "path";

// ── Config ──────────────────────────────────────────────────────

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://aaqbofotpchgpyuohmmz.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || "";

if (!SUPABASE_KEY) {
  console.error("SUPABASE_ANON_KEY not set");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const PROJECTS_FILE = resolve(__dirname, "../src/data/projects.ts");

// ── Types ───────────────────────────────────────────────────────

interface HefProject {
  id: string;
  instance_id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  tech: string[];
  build_hours: number | null;
  maturity: string;
  featured: boolean;
  device_type: string;
  accent_color: string;
  features: string[];
  github_url: string | null;
  hef_generation: number;
  hef_fitness: number;
}

// ── Project Literal Generator ───────────────────────────────────

function escapeStr(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function toProjectLiteral(p: HefProject): string {
  const lines: string[] = [];
  lines.push(`  {`);
  lines.push(`    slug: "${escapeStr(p.slug)}",`);
  lines.push(`    name: "${escapeStr(p.name)}",`);
  lines.push(`    tagline: "${escapeStr(p.tagline)}",`);
  lines.push(
    `    description: "${escapeStr(p.description)}",`
  );
  lines.push(`    category: "${escapeStr(p.category)}",`);
  lines.push(
    `    tags: [${p.tags.map((t) => `"${escapeStr(t)}"`).join(", ")}],`
  );
  lines.push(
    `    tech: [${p.tech.map((t) => `"${escapeStr(t)}"`).join(", ")}],`
  );
  lines.push(`    buildHours: ${p.build_hours ?? "null"},`);
  lines.push(`    maturity: "${p.maturity}",`);
  lines.push(`    featured: ${p.featured},`);
  lines.push(`    deviceType: "${p.device_type}",`);
  lines.push(`    accentColor: "${p.accent_color}",`);

  if (p.github_url) {
    lines.push(
      `    github: { url: "${escapeStr(p.github_url)}", visibility: "private" },`
    );
  }

  if (p.features && p.features.length > 0) {
    lines.push(`    features: [`);
    for (const f of p.features) {
      lines.push(`      "${escapeStr(f)}",`);
    }
    lines.push(`    ],`);
  }

  lines.push(`  },`);
  return lines.join("\n");
}

// ── Main ────────────────────────────────────────────────────────

async function main() {
  // 1. Fetch pending projects
  const { data: pending, error } = await supabase
    .from("hef_portfolio_projects")
    .select("*")
    .eq("sync_status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Supabase fetch error:", error.message);
    process.exit(1);
  }

  if (!pending || pending.length === 0) {
    console.log("No pending HEF projects to sync");
    return;
  }

  console.log(`Found ${pending.length} pending project(s)`);

  // 2. Read current projects.ts
  let projectsContent = readFileSync(PROJECTS_FILE, "utf-8");

  // 3. Check for slug conflicts with existing projects
  const existingSlugs = new Set<string>();
  const slugMatches = projectsContent.matchAll(/slug:\s*"([^"]+)"/g);
  for (const m of slugMatches) {
    existingSlugs.add(m[1]);
  }

  // 4. Generate new project entries and insert before closing "];
  const newEntries: string[] = [];
  const syncedIds: string[] = [];

  for (const row of pending as HefProject[]) {
    // Skip if slug already exists in projects.ts
    if (existingSlugs.has(row.slug)) {
      console.log(`  Skipping ${row.slug} — already in projects.ts`);
      // Mark as published since it's already there
      syncedIds.push(row.id);
      continue;
    }

    const literal = toProjectLiteral(row);
    newEntries.push(literal);
    syncedIds.push(row.id);
    existingSlugs.add(row.slug);
    console.log(`  Adding: ${row.name} (${row.slug})`);
  }

  if (newEntries.length > 0) {
    // Find the closing "];" and insert before it
    const closingIndex = projectsContent.lastIndexOf("];");
    if (closingIndex === -1) {
      console.error("Could not find closing ]; in projects.ts");
      process.exit(1);
    }

    const before = projectsContent.slice(0, closingIndex);
    const after = projectsContent.slice(closingIndex);

    // Add HEF section comment if first time
    const hefComment = before.includes("// — HEF Graduated Projects")
      ? ""
      : "\n  // — HEF Graduated Projects ——————————————————————————\n";

    projectsContent = before + hefComment + newEntries.join("\n") + "\n" + after;

    // 5. Write updated projects.ts
    writeFileSync(PROJECTS_FILE, projectsContent);
    console.log(`Written ${newEntries.length} new project(s) to projects.ts`);
  }

  // 6. Mark as published in Supabase
  if (syncedIds.length > 0) {
    const { error: updateError } = await supabase
      .from("hef_portfolio_projects")
      .update({
        sync_status: "published",
        published_at: new Date().toISOString(),
      })
      .in("id", syncedIds);

    if (updateError) {
      console.error("Failed to mark as published:", updateError.message);
    } else {
      console.log(`Marked ${syncedIds.length} project(s) as published`);
    }
  }

  // 7. Git commit + push if we added new entries
  if (newEntries.length > 0) {
    try {
      const projectDir = resolve(__dirname, "..");
      execSync("git add src/data/projects.ts", { cwd: projectDir });
      const names = (pending as HefProject[])
        .filter((p) => !existingSlugs.has(p.slug) || syncedIds.includes(p.id))
        .map((p) => p.name)
        .join(", ");
      execSync(
        `git commit -m "feat: add HEF graduated projects — ${names}"`,
        { cwd: projectDir }
      );
      execSync("git push", { cwd: projectDir });
      console.log("Pushed to git — Vercel auto-deploy triggered");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("Git push failed:", msg);
      console.log("Projects are saved locally — push manually when ready");
    }
  }
}

main().catch(console.error);
