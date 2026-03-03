"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image,
  FileKey,
  Key,
  AppWindow,
  Package,
  FileOutput,
  Upload,
  ChevronDown,
} from "lucide-react";
import { pipelineSteps, type PipelineStep } from "@/data/pipeline";

const iconMap: Record<string, React.ElementType> = {
  Image,
  FileKey,
  Key,
  AppWindow,
  Package,
  FileOutput,
  Upload,
};

function StepCard({ step, index }: { step: PipelineStep; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[step.icon] || Package;
  const progress = ((index + 1) / pipelineSteps.length) * 100;

  return (
    <div className="relative">
      {/* Connector line */}
      {index < pipelineSteps.length - 1 && (
        <div className="absolute left-6 top-full w-px h-8 border-l-2 border-dashed border-[#00d4ff]/20" />
      )}

      <motion.button
        onClick={() => setExpanded(!expanded)}
        className="w-full glass-card p-5 text-left group cursor-pointer"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-start gap-4">
          {/* Step number + icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: `linear-gradient(135deg, rgba(0,212,255,${0.1 + index * 0.05}), rgba(139,92,246,${0.1 + index * 0.05}))`,
              border: `1px solid rgba(0,212,255,${0.2 + index * 0.05})`,
            }}
          >
            <Icon className="w-5 h-5 text-[#00d4ff]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#6b6b80]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-white font-semibold">{step.name}</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#8888a8] font-mono">
                  {step.duration}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6b6b80] transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </div>
            </div>
            <p className="text-sm text-[#a0a0b8] mt-1">{step.description}</p>

            {/* Progress gradient */}
            <div className="mt-3 h-0.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, #00d4ff, #8b5cf6)`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                {step.command && (
                  <div className="bg-[#05050a] rounded-lg p-3 border border-[#00d4ff]/10">
                    <code className="text-xs font-mono text-[#00d4ff]">
                      $ {step.command}
                    </code>
                  </div>
                )}
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#a0a0b8]"
                    >
                      <span className="text-[#00d4ff] mt-1">&#8250;</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export function PipelineFlow() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Pipeline Steps</h2>
      <div className="space-y-8">
        {pipelineSteps.map((step, i) => (
          <StepCard key={step.id} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
