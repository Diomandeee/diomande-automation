// Types and configuration for the DreamWeaver Live Garden

export type DreamStage = "seed" | "germinating" | "growing" | "flowering" | "bloom";

export interface Dream {
  id: string;
  title: string;
  essence: string;
  context: string;
  strength: number;
  stage: DreamStage;
  evolution_count: number;
  last_evolved: string | null;
  connections: string[];
  tags: string[];
  evolution_notes: { date: string; note: string }[];
  created_at: string;
  source: string;
  enriched: boolean;
}

export interface DreamStats {
  total: number;
  byStage: Record<DreamStage, number>;
  avgStrength: number;
  totalEvolutions: number;
}

export const stageConfig: Record<DreamStage, { color: string; label: string; bg: string; border: string }> = {
  seed: { color: "#8B4513", label: "Seed", bg: "bg-[#8B4513]/10", border: "border-[#8B4513]/30" },
  germinating: { color: "#90EE90", label: "Germinating", bg: "bg-[#90EE90]/10", border: "border-[#90EE90]/30" },
  growing: { color: "#3CB371", label: "Growing", bg: "bg-[#3CB371]/10", border: "border-[#3CB371]/30" },
  flowering: { color: "#FF69B4", label: "Flowering", bg: "bg-[#FF69B4]/10", border: "border-[#FF69B4]/30" },
  bloom: { color: "#FF1493", label: "Bloom", bg: "bg-[#FF1493]/10", border: "border-[#FF1493]/30" },
};

export const stages: DreamStage[] = ["seed", "germinating", "growing", "flowering", "bloom"];
