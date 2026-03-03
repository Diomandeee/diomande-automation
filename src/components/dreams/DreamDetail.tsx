"use client";

import { motion } from "framer-motion";
import { X, Clock, Link2, Sparkles } from "lucide-react";
import { stageConfig, type Dream } from "@/data/dreams";

interface DreamDetailProps {
  dream: Dream;
  onClose: () => void;
}

export function DreamDetail({ dream, onClose }: DreamDetailProps) {
  const stage = stageConfig[dream.stage] || stageConfig.seed;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-card p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-3">
            <div
              className="w-4 h-4 rounded-full shrink-0 mt-1"
              style={{ backgroundColor: stage.color }}
            />
            <div>
              <h2 className="text-xl font-bold text-white">{dream.title}</h2>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${stage.bg} ${stage.border} border`}
                style={{ color: stage.color }}
              >
                {stage.label}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#6b6b80] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Essence */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-[#8888a8] uppercase tracking-wider mb-2">
            Essence
          </h3>
          <p className="text-sm text-[#c0c0d8] leading-relaxed">
            {dream.essence}
          </p>
        </div>

        {/* Context */}
        {dream.context && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-[#8888a8] uppercase tracking-wider mb-2">
              Context
            </h3>
            <p className="text-sm text-[#a0a0b8] leading-relaxed">
              {dream.context}
            </p>
          </div>
        )}

        {/* Strength */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#8888a8] font-semibold uppercase tracking-wider">
              Strength
            </span>
            <span className="text-white font-mono">
              {(dream.strength * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: stage.color }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(dream.strength * 100, 100)}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 text-[#8888a8] text-xs mb-1">
              <Sparkles className="w-3 h-3" />
              Evolutions
            </div>
            <div className="text-lg font-bold text-white">
              {dream.evolution_count}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-2 text-[#8888a8] text-xs mb-1">
              <Link2 className="w-3 h-3" />
              Connections
            </div>
            <div className="text-lg font-bold text-white">
              {dream.connections?.length || 0}
            </div>
          </div>
        </div>

        {/* Tags */}
        {dream.tags && dream.tags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-[#8888a8] uppercase tracking-wider mb-2">
              Tags
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {dream.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs text-[#a0a0b8] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Evolution Timeline */}
        {dream.evolution_notes && dream.evolution_notes.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-[#8888a8] uppercase tracking-wider mb-3">
              Evolution Timeline
            </h3>
            <div className="space-y-3">
              {dream.evolution_notes.map(
                (note: { date: string; note: string }, i: number) => (
                  <div
                    key={i}
                    className="flex gap-3 text-sm border-l-2 border-white/10 pl-4"
                  >
                    <div className="flex items-center gap-1.5 text-[#6b6b80] shrink-0">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs font-mono">
                        {new Date(note.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[#a0a0b8]">{note.note}</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
