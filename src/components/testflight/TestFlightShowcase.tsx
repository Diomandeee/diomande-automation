"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  CheckCircle,
  Clock,
  Layers,
  Zap,
  Filter,
} from "lucide-react";
import { testflightApps, expeditionStats } from "@/data/testflight";
import { TestFlightAppCard } from "./TestFlightAppCard";

type StatusFilter = "all" | "live" | "ready";

const stats = [
  { value: String(expeditionStats.totalApps), label: "Apps", icon: Smartphone },
  { value: String(expeditionStats.live), label: "On TestFlight", icon: CheckCircle },
  { value: String(expeditionStats.ready), label: "Ready to Ship", icon: Clock },
  { value: String(expeditionStats.queues), label: "Queues", icon: Layers },
];

const filters: { key: StatusFilter; label: string; count: number }[] = [
  { key: "all", label: "All Apps", count: testflightApps.length },
  {
    key: "live",
    label: "On TestFlight",
    count: testflightApps.filter((a) => a.status === "live").length,
  },
  {
    key: "ready",
    label: "Ready",
    count: testflightApps.filter((a) => a.status === "ready").length,
  },
];

export function TestFlightShowcase() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [selectedQueue, setSelectedQueue] = useState<number | null>(null);

  const filteredApps = testflightApps.filter((app) => {
    if (statusFilter === "live" && app.status !== "live") return false;
    if (statusFilter === "ready" && app.status !== "ready") return false;
    if (selectedQueue !== null && app.queue !== selectedQueue) return false;
    return true;
  });

  const queues = Array.from(new Set(testflightApps.map((a) => a.queue))).sort();

  return (
    <div className="max-w-5xl mx-auto px-8 lg:px-16 pt-32 pb-24 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/20 text-[#007AFF] text-xs font-bold tracking-wider uppercase mb-6">
            <Zap className="w-3 h-3" />
            17-App Expedition
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight">
            Try on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] to-[#00d4ff]">
              TestFlight
            </span>
          </h1>
          <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto mt-4">
            17 iOS apps built with SwiftUI, deployed via zero-retry automation.
            Tap any live app to join the beta on TestFlight.
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
                  <stat.icon className="w-5 h-5 text-[#007AFF]" />
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

      {/* Filters */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="w-4 h-4 text-[#6b6b80]" />
          {/* Status filters */}
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                statusFilter === f.key
                  ? "bg-[#007AFF]/15 text-[#007AFF] border border-[#007AFF]/30"
                  : "bg-white/5 text-[#a0a0b8] border border-white/10 hover:bg-white/10"
              }`}
            >
              {f.label}{" "}
              <span className="text-xs opacity-60">({f.count})</span>
            </button>
          ))}

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Queue filters */}
          <button
            onClick={() => setSelectedQueue(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedQueue === null
                ? "bg-[#00d4ff]/15 text-[#00d4ff] border border-[#00d4ff]/30"
                : "bg-white/5 text-[#a0a0b8] border border-white/10 hover:bg-white/10"
            }`}
          >
            All Queues
          </button>
          {queues.map((q) => (
            <button
              key={q}
              onClick={() => setSelectedQueue(q)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedQueue === q
                  ? "bg-[#00d4ff]/15 text-[#00d4ff] border border-[#00d4ff]/30"
                  : "bg-white/5 text-[#a0a0b8] border border-white/10 hover:bg-white/10"
              }`}
            >
              Q{q}
            </button>
          ))}
        </div>
      </motion.section>

      {/* App Grid */}
      <section>
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredApps.map((app, i) => (
              <TestFlightAppCard key={app.bundleId} app={app} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
        {filteredApps.length === 0 && (
          <div className="text-center py-16 text-[#6b6b80]">
            No apps match the current filters.
          </div>
        )}
      </section>

      {/* Queue Legend */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="glass-card p-6 space-y-4"
      >
        <h2 className="text-lg font-bold text-white">Deployment Queues</h2>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-sm">
          {[
            { q: 1, label: "Pioneer", desc: "First wave — proven & shipped" },
            { q: 2, label: "Security", desc: "Vision & surveillance" },
            { q: 3, label: "Commerce", desc: "BWB wine bar suite" },
            { q: 4, label: "Infrastructure", desc: "Platform & mesh clients" },
            { q: 5, label: "Fleet", desc: "Full ecosystem deployment" },
          ].map((queue) => {
            const count = testflightApps.filter(
              (a) => a.queue === queue.q
            ).length;
            const liveCount = testflightApps.filter(
              (a) => a.queue === queue.q && a.status === "live"
            ).length;
            return (
              <button
                key={queue.q}
                onClick={() =>
                  setSelectedQueue(selectedQueue === queue.q ? null : queue.q)
                }
                className={`p-3 rounded-lg border text-left transition-all ${
                  selectedQueue === queue.q
                    ? "border-[#00d4ff]/30 bg-[#00d4ff]/5"
                    : "border-white/5 bg-white/[0.02] hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#00d4ff] font-bold">Q{queue.q}</span>
                  <span className="text-white font-medium">{queue.label}</span>
                </div>
                <div className="text-[#7a7a95] text-xs">{queue.desc}</div>
                <div className="text-[#a0a0b8] text-xs mt-1">
                  {count} apps{" "}
                  {liveCount > 0 && (
                    <span className="text-[#10b981]">
                      ({liveCount} live)
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h2 className="text-2xl font-bold text-white">
          Zero retries. Fully automated.
        </h2>
        <p className="text-[#a0a0b8] max-w-lg mx-auto">
          Every app goes through our 7-step pipeline: icon generation, bundle ID
          registration, archive, export, and TestFlight upload — all headless.
        </p>
        <a
          href="/pipeline"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-white font-medium text-sm hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-shadow"
        >
          See the Pipeline
        </a>
      </motion.section>
    </div>
  );
}
