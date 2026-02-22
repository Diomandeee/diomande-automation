"use client";

import { motion } from "framer-motion";

const steps = [
  { label: "Your Team", sub: "Discord / API / SMS / Telegram", color: "#00d4ff" },
  { label: "Gateway", sub: "Multi-channel ingestion", color: "#8b5cf6" },
  { label: "Task Queue", sub: "Priority & classification", color: "#f59e0b" },
  { label: "Mesh Devices", sub: "Distributed execution", color: "#10b981" },
  { label: "AI Models", sub: "Claude / Gemini / Codex", color: "#ef4444" },
  { label: "Result", sub: "Synthesized & delivered", color: "#06b6d4" },
];

export function Architecture() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto">
            From message to result — a production pipeline that handles
            everything automatically.
          </p>
        </motion.div>

        {/* Flow diagram */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-4 lg:gap-0"
            >
              {/* Node */}
              <div className="flex flex-col items-center text-center w-36">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 border"
                  style={{
                    backgroundColor: `${step.color}10`,
                    borderColor: `${step.color}30`,
                  }}
                >
                  <span
                    className="text-lg font-bold font-[family-name:var(--font-mono)]"
                    style={{ color: step.color }}
                  >
                    {i + 1}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">
                  {step.label}
                </h4>
                <p className="text-xs text-[#6b6b80] mt-1">{step.sub}</p>
              </div>

              {/* Arrow */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block w-12 h-px bg-gradient-to-r from-white/20 to-white/5 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-white/20 border-y-[4px] border-y-transparent" />
                </div>
              )}
              {i < steps.length - 1 && (
                <div className="lg:hidden w-px h-8 bg-gradient-to-b from-white/20 to-white/5 relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-[6px] border-t-white/20 border-x-[4px] border-x-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
