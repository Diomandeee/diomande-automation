"use client";

import { motion } from "framer-motion";
import { stageConfig, type Dream } from "@/data/dreams";

interface DreamCardProps {
  dream: Dream;
  onClick: () => void;
  index: number;
}

export function DreamCard({ dream, onClick, index }: DreamCardProps) {
  const stage = stageConfig[dream.stage] || stageConfig.seed;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      className="w-full glass-card p-5 text-left group cursor-pointer"
      whileHover={{ scale: 1.02 }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-3 h-3 rounded-full shrink-0 mt-1.5"
          style={{ backgroundColor: stage.color }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#00d4ff] transition-colors">
            {dream.title}
          </h3>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium mt-1 ${stage.bg} ${stage.border} border`}
            style={{ color: stage.color }}
          >
            {stage.label}
          </span>
        </div>
      </div>

      {/* Essence */}
      <p className="text-xs text-[#a0a0b8] line-clamp-2 mb-3">
        {dream.essence}
      </p>

      {/* Strength bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-[#6b6b80]">Strength</span>
          <span className="text-[#a0a0b8] font-mono">
            {(dream.strength * 100).toFixed(0)}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: stage.color }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(dream.strength * 100, 100)}%` }}
            transition={{ duration: 0.8, delay: index * 0.03 + 0.3 }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
        <span className="text-[10px] text-[#6b6b80]">
          {dream.evolution_count} evolution{dream.evolution_count !== 1 ? "s" : ""}
        </span>
        {dream.tags && dream.tags.length > 0 && (
          <div className="flex gap-1">
            {dream.tags.slice(0, 2).map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] text-[#8888a8] bg-white/5 px-1.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.button>
  );
}
