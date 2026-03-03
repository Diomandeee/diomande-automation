import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createServiceClient();

  const { data: projects, error } = await supabase
    .from("project_registry")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch registry" }, { status: 500 });
  }

  const stats = {
    total: projects?.length || 0,
    byLanguage: {} as Record<string, number>,
    byCategory: {} as Record<string, number>,
    synced: projects?.filter((p) => p.github_id).length || 0,
  };

  for (const p of projects || []) {
    if (p.language) {
      stats.byLanguage[p.language] = (stats.byLanguage[p.language] || 0) + 1;
    }
    if (p.category) {
      stats.byCategory[p.category] = (stats.byCategory[p.category] || 0) + 1;
    }
  }

  return NextResponse.json({ projects: projects || [], stats });
}
