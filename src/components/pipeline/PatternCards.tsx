"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lightbulb } from "lucide-react";
import { learnedPatterns, type LearnedPattern } from "@/data/pipeline";

function PatternCard({ pattern }: { pattern: LearnedPattern }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.button
      onClick={() => setOpen(!open)}
      className="w-full glass-card p-5 text-left cursor-pointer"
      whileHover={{ scale: 1.005 }}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4 text-[#f59e0b]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-white">
              {pattern.title}
            </h3>
            <ChevronDown
              className={`w-4 h-4 text-[#6b6b80] transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
            />
          </div>
          <p className="text-xs text-[#a0a0b8] mt-1">{pattern.description}</p>
        </div>
      </div>

      <AnimatePresence>
        {open && pattern.code && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-[#05050a] rounded-lg p-4 border border-[#00d4ff]/10">
              <pre className="text-xs font-mono text-[#c0c0d8] whitespace-pre-wrap">
                {pattern.code}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function PatternCards() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Learned Patterns</h2>
      <p className="text-[#a0a0b8]">
        Hard-won lessons from deploying 12 apps with zero retries.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learnedPatterns.map((pattern) => (
          <PatternCard key={pattern.title} pattern={pattern} />
        ))}
      </div>
    </section>
  );
}
