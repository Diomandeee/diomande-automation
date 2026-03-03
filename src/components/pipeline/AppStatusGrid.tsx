"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { appEntries, type AppEntry } from "@/data/pipeline";

const statusConfig: Record<
  AppEntry["testflightStatus"],
  { label: string; color: string; bg: string; border: string }
> = {
  live: {
    label: "TestFlight",
    color: "text-[#10b981]",
    bg: "bg-[#10b981]/10",
    border: "border-[#10b981]/30",
  },
  pending: {
    label: "Pending",
    color: "text-[#f59e0b]",
    bg: "bg-[#f59e0b]/10",
    border: "border-[#f59e0b]/30",
  },
  "not-submitted": {
    label: "Not Submitted",
    color: "text-[#6b6b80]",
    bg: "bg-white/5",
    border: "border-white/10",
  },
};

type Filter = "all" | AppEntry["testflightStatus"];

export function AppStatusGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "live", label: "Live" },
    { value: "pending", label: "Pending" },
    { value: "not-submitted", label: "Not Submitted" },
  ];

  const filtered =
    filter === "all"
      ? appEntries
      : appEntries.filter((a) => a.testflightStatus === filter);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white">App Fleet</h2>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                filter === f.value
                  ? "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/30"
                  : "bg-white/5 text-[#a0a0b8] border border-white/10 hover:bg-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((app, i) => {
          const status = statusConfig[app.testflightStatus];
          return (
            <motion.div
              key={app.bundleId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff]/10 to-[#8b5cf6]/10 border border-white/10 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-[#00d4ff]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white text-sm truncate">
                  {app.name}
                </div>
                <div className="text-xs font-mono text-[#6b6b80] truncate">
                  {app.bundleId}
                </div>
              </div>
              <span
                className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${status.bg} ${status.color} ${status.border}`}
              >
                {status.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
