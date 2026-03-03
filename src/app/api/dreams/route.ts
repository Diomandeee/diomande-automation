import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import type { DreamStage, DreamStats } from "@/data/dreams";

export const dynamic = "force-dynamic";
export const revalidate = 300; // 5 minute cache

export async function GET() {
  const supabase = createServiceClient();

  const { data: dreams, error } = await supabase
    .from("dreams")
    .select("*")
    .order("strength", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch dreams" },
      { status: 500 }
    );
  }

  const all = dreams || [];

  const byStage: Record<DreamStage, number> = {
    seed: 0,
    germinating: 0,
    growing: 0,
    flowering: 0,
    bloom: 0,
  };

  let totalStrength = 0;
  let totalEvolutions = 0;

  for (const d of all) {
    const stage = d.stage as DreamStage;
    if (stage in byStage) byStage[stage]++;
    totalStrength += d.strength || 0;
    totalEvolutions += d.evolution_count || 0;
  }

  const stats: DreamStats = {
    total: all.length,
    byStage,
    avgStrength: all.length > 0 ? totalStrength / all.length : 0,
    totalEvolutions,
  };

  return NextResponse.json({ dreams: all, stats });
}
