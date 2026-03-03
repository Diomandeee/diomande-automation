/**
 * sync-github-repos.ts
 *
 * Fetches all repos from the Diomandeee GitHub account
 * and upserts them into the Supabase project_registry table.
 *
 * Usage: GITHUB_TOKEN=ghp_... npx tsx scripts/sync-github-repos.ts
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY");
  process.exit(1);
}

if (!GITHUB_TOKEN) {
  console.error("Missing GITHUB_TOKEN — set it to a personal access token with repo scope");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  homepage: string | null;
  html_url: string;
  private: boolean;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function detectType(repo: GitHubRepo): { type: string; category: string } {
  const lang = (repo.language || "").toLowerCase();
  const topics = repo.topics.map((t) => t.toLowerCase());
  const name = repo.name.toLowerCase();

  if (lang === "swift" || topics.includes("ios") || topics.includes("swiftui")) {
    return { type: "ios", category: "iOS & macOS Apps" };
  }
  if (lang === "rust") {
    return name.includes("lib") || name.includes("kernel")
      ? { type: "rust_lib", category: "AI Infrastructure" }
      : { type: "rust_bin", category: "Developer Tools" };
  }
  if (lang === "python") {
    return topics.includes("ai") || topics.includes("ml")
      ? { type: "python", category: "AI Infrastructure" }
      : { type: "python", category: "Developer Tools" };
  }
  if (lang === "typescript" || lang === "javascript") {
    return topics.includes("nextjs") || topics.includes("react")
      ? { type: "web", category: "Web Platforms" }
      : { type: "typescript", category: "Developer Tools" };
  }
  return { type: "unknown", category: "Research" };
}

async function fetchAllRepos(): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;

  while (true) {
    const res = await fetch(
      `https://api.github.com/user/repos?per_page=100&page=${page}&sort=pushed`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      break;
    }

    const batch: GitHubRepo[] = await res.json();
    if (batch.length === 0) break;

    repos.push(...batch);
    page++;

    if (batch.length < 100) break;
  }

  return repos;
}

async function main() {
  console.log("Fetching GitHub repos...");
  const repos = await fetchAllRepos();
  console.log(`Found ${repos.length} repos`);

  const rows = repos.map((repo) => {
    const { type, category } = detectType(repo);
    return {
      github_id: repo.id,
      slug: slugify(repo.name),
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || "",
      language: repo.language,
      topics: repo.topics || [],
      homepage: repo.homepage || null,
      html_url: repo.html_url,
      visibility: repo.private ? "private" : "public",
      default_branch: repo.default_branch,
      created_at: repo.created_at,
      updated_at: new Date().toISOString(),
      pushed_at: repo.pushed_at,
      auto_detected_type: type,
      category,
      maturity: "prototype",
    };
  });

  // Upsert in batches
  const batchSize = 50;
  let upserted = 0;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase.from("project_registry").upsert(batch, {
      onConflict: "github_id",
    });

    if (error) {
      console.error(`Batch ${i / batchSize + 1} error:`, error.message);
    } else {
      upserted += batch.length;
      console.log(`Upserted batch ${i / batchSize + 1} (${batch.length} repos)`);
    }
  }

  console.log(`Sync complete: ${upserted}/${rows.length} repos registered`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
