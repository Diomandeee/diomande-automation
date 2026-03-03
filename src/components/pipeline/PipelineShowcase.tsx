"use client";

import { motion } from "framer-motion";
import { Rocket, CheckCircle, Timer, RefreshCw } from "lucide-react";
import { pipelineStats } from "@/data/pipeline";
import { PipelineFlow } from "./PipelineFlow";
import { AppStatusGrid } from "./AppStatusGrid";
import { PatternCards } from "./PatternCards";

const stats = [
  {
    value: String(pipelineStats.totalApps),
    label: "Apps",
    icon: Rocket,
  },
  {
    value: String(pipelineStats.testflightLive),
    label: "TestFlight",
    icon: CheckCircle,
  },
  {
    value: pipelineStats.successRate,
    label: "Success Rate",
    icon: Timer,
  },
  {
    value: String(pipelineStats.retries),
    label: "Retries",
    icon: RefreshCw,
  },
];

export function PipelineShowcase() {
  return (
    <div className="max-w-4xl mx-auto px-8 lg:px-16 pt-32 pb-24 space-y-20">
      {/* Hero */}
      <section className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-xs font-bold tracking-wider uppercase mb-6">
            <CheckCircle className="w-3 h-3" />
            4/4 Flawless Today
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight">
            Zero-Retry{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6]">
              Pipeline
            </span>
          </h1>
          <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto mt-4">
            Fully automated iOS deployment from icon generation to TestFlight.
            18 apps, 7 steps, zero manual intervention, zero retries.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 pt-4"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8">
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <stat.icon className="w-5 h-5 text-[#00d4ff]" />
                  <div className="text-3xl font-black text-white">
                    {stat.value}
                  </div>
                </div>
                <div className="text-xs font-bold text-[#8888a8] uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div className="w-px h-10 bg-white/10 hidden sm:block" />
              )}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Pipeline Flow */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <PipelineFlow />
      </motion.div>

      {/* App Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <AppStatusGrid />
      </motion.div>

      {/* Patterns */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <PatternCards />
      </motion.div>
    </div>
  );
}
