"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Sprout, TreePine, Flower2, Cherry } from "lucide-react";
import {
  stages,
  stageConfig,
  type Dream,
  type DreamStage,
  type DreamStats,
} from "@/data/dreams";
import { DreamCard } from "./DreamCard";
import { DreamDetail } from "./DreamDetail";
import { DreamConnectionGraph } from "./DreamConnectionGraph";

const stageIcons: Record<DreamStage, React.ElementType> = {
  seed: Sparkles,
  germinating: Sprout,
  growing: TreePine,
  flowering: Flower2,
  bloom: Cherry,
};

export function DreamGarden() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [stats, setStats] = useState<DreamStats | null>(null);
  const [filter, setFilter] = useState<DreamStage | "all">("all");
  const [selected, setSelected] = useState<Dream | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dreams")
      .then((r) => r.json())
      .then((data) => {
        setDreams(data.dreams || []);
        setStats(data.stats || null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "all" ? dreams : dreams.filter((d) => d.stage === filter);

  return (
    <div className="max-w-6xl mx-auto px-8 lg:px-16 pt-32 pb-24 space-y-16">
      {/* Header */}
      <section className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF69B4]/10 border border-[#FF69B4]/20 text-[#FF69B4] text-xs font-bold tracking-wider uppercase mb-6">
            <Flower2 className="w-3 h-3" />
            DreamWeaver Engine
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight">
            Dream{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF69B4] to-[#8b5cf6]">
              Garden
            </span>
          </h1>
          <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto mt-4">
            Ideas evolve from seeds to blooms. Watch {stats?.total || "100+"}
            {" "}dreams grow through the DreamWeaver evolution engine.
          </p>
        </motion.div>

        {/* Stats row */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-8 pt-4"
          >
            <div className="text-center space-y-1">
              <div className="text-3xl font-black text-white">
                {stats.total}
              </div>
              <div className="text-xs font-bold text-[#8888a8] uppercase tracking-widest">
                Dreams
              </div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="text-center space-y-1">
              <div className="text-3xl font-black text-white">
                {(stats.avgStrength * 100).toFixed(0)}%
              </div>
              <div className="text-xs font-bold text-[#8888a8] uppercase tracking-widest">
                Avg Strength
              </div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="text-center space-y-1">
              <div className="text-3xl font-black text-white">
                {stats.totalEvolutions}
              </div>
              <div className="text-xs font-bold text-[#8888a8] uppercase tracking-widest">
                Evolutions
              </div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="text-center space-y-1">
              <div className="text-3xl font-black text-white">
                {stats.byStage.bloom}
              </div>
              <div className="text-xs font-bold text-[#8888a8] uppercase tracking-widest">
                Bloomed
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Stage filter tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            filter === "all"
              ? "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30"
              : "bg-white/5 text-[#a0a0b8] border border-white/10 hover:bg-white/10"
          }`}
        >
          All ({dreams.length})
        </button>
        {stages.map((stage) => {
          const cfg = stageConfig[stage];
          const Icon = stageIcons[stage];
          const count = dreams.filter((d) => d.stage === stage).length;
          return (
            <button
              key={stage}
              onClick={() => setFilter(stage)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                filter === stage
                  ? `${cfg.bg} ${cfg.border} border`
                  : "bg-white/5 text-[#a0a0b8] border border-white/10 hover:bg-white/10"
              }`}
              style={filter === stage ? { color: cfg.color } : undefined}
            >
              <Icon className="w-3 h-3" />
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full animate-spin" />
          <p className="text-[#8888a8] mt-4">Loading dreams...</p>
        </div>
      )}

      {/* Dream cards grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((dream, i) => (
            <DreamCard
              key={dream.id}
              dream={dream}
              index={i}
              onClick={() => setSelected(dream)}
            />
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#8888a8]">No dreams in this stage yet.</p>
        </div>
      )}

      {/* Connection Graph */}
      {!loading && dreams.length > 0 && (
        <DreamConnectionGraph
          dreams={dreams}
          onSelect={(d) => setSelected(d)}
        />
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <DreamDetail
            dream={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
