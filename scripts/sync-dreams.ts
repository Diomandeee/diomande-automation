/**
 * sync-dreams.ts
 *
 * Reads dreams.json from the DreamWeaver engine state directory
 * and upserts them into the Supabase `dreams` table.
 *
 * Usage: npx tsx scripts/sync-dreams.ts
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const DREAMS_PATH = resolve(
  process.env.HOME || "~",
  "projects/dream-weaver-engine/state/dreams.json"
);

interface RawDream {
  id: string;
  title?: string;
  seed?: string;
  essence?: string;
  context?: string;
  strength?: number;
  stage?: string;
  evolution_count?: number;
  evolutions?: number;
  last_evolved?: string;
  connections?: string[];
  tags?: string[];
  evolution_notes?: { date: string; note: string }[];
  created_at?: string;
  source?: string;
  enriched?: boolean;
}

function mapStage(stage?: string): string {
  if (!stage) return "seed";
  const normalized = stage.toLowerCase();
  if (["seed", "germinating", "growing", "flowering", "bloom"].includes(normalized)) {
    return normalized;
  }
  // Map alternative stage names
  if (normalized.includes("gestating") || normalized.includes("planted")) return "seed";
  if (normalized.includes("sprout")) return "germinating";
  if (normalized.includes("emerged")) return "growing";
  if (normalized.includes("metamorphos")) return "bloom";
  return "seed";
}

async function main() {
  if (!existsSync(DREAMS_PATH)) {
    console.error(`Dreams file not found at: ${DREAMS_PATH}`);
    process.exit(1);
  }

  const raw = JSON.parse(readFileSync(DREAMS_PATH, "utf-8"));
  const dreams: RawDream[] = Array.isArray(raw) ? raw : raw.dreams || Object.values(raw);

  console.log(`Found ${dreams.length} dreams to sync`);

  const rows = dreams.map((d) => ({
    id: d.id,
    title: d.title || d.seed || "Untitled Dream",
    essence: d.essence || d.seed || "",
    context: d.context || "",
    strength: typeof d.strength === "number" ? d.strength : 0.1,
    stage: mapStage(d.stage),
    evolution_count: d.evolution_count || d.evolutions || 0,
    last_evolved: d.last_evolved || null,
    connections: d.connections || [],
    tags: d.tags || [],
    evolution_notes: d.evolution_notes || [],
    created_at: d.created_at || new Date().toISOString(),
    source: d.source || "dream-weaver",
    enriched: d.enriched || false,
    synced_at: new Date().toISOString(),
  }));

  // Upsert in batches of 50
  const batchSize = 50;
  let upserted = 0;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase.from("dreams").upsert(batch, {
      onConflict: "id",
    });

    if (error) {
      console.error(`Error upserting batch ${i / batchSize + 1}:`, error.message);
    } else {
      upserted += batch.length;
      console.log(`Upserted batch ${i / batchSize + 1} (${batch.length} dreams)`);
    }
  }

  console.log(`Sync complete: ${upserted}/${rows.length} dreams upserted`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
