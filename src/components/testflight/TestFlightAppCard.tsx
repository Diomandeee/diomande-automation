"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { TestFlightApp } from "@/data/testflight";

interface TestFlightAppCardProps {
  app: TestFlightApp;
  index: number;
}

const statusConfig = {
  live: {
    label: "On TestFlight",
    bg: "bg-[#10b981]/10",
    text: "text-[#10b981]",
    border: "border-[#10b981]/20",
    dot: "bg-[#10b981]",
  },
  processing: {
    label: "Processing",
    bg: "bg-[#f59e0b]/10",
    text: "text-[#f59e0b]",
    border: "border-[#f59e0b]/20",
    dot: "bg-[#f59e0b] animate-pulse",
  },
  ready: {
    label: "Ready to Ship",
    bg: "bg-[#00d4ff]/10",
    text: "text-[#00d4ff]",
    border: "border-[#00d4ff]/20",
    dot: "bg-[#00d4ff]",
  },
  building: {
    label: "Building",
    bg: "bg-[#8b5cf6]/10",
    text: "text-[#8b5cf6]",
    border: "border-[#8b5cf6]/20",
    dot: "bg-[#8b5cf6] animate-pulse",
  },
  queued: {
    label: "Queued",
    bg: "bg-white/5",
    text: "text-[#a0a0b8]",
    border: "border-white/10",
    dot: "bg-[#6b6b80]",
  },
};

function getTestFlightUrl(app: TestFlightApp): string | null {
  if (app.status !== "live" || !app.appId) return null;
  return `https://testflight.apple.com/join/${app.appId}`;
}

export function TestFlightAppCard({ app, index }: TestFlightAppCardProps) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[app.status];
  const testflightUrl = getTestFlightUrl(app);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="glass-card p-5 space-y-3 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: app.accentColor + "20", color: app.accentColor }}
          >
            {app.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-white text-sm leading-tight">
              {app.name}
            </h3>
            <p className="text-xs text-[#7a7a95]">{app.category}</p>
          </div>
        </div>
        <span className="text-xs text-[#6b6b80] font-mono">Q{app.queue}</span>
      </div>

      {/* Tagline */}
      <p className="text-sm text-[#a0a0b8] leading-relaxed">{app.tagline}</p>

      {/* Status badge */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.bg} ${status.text} ${status.border}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#6b6b80] hover:text-white transition-colors p-1"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="pt-2 space-y-3 border-t border-white/5"
        >
          {/* Features */}
          <div>
            <div className="text-xs text-[#7a7a95] font-medium mb-1.5">
              Features
            </div>
            <div className="flex flex-wrap gap-1.5">
              {app.features.map((f) => (
                <span
                  key={f}
                  className="px-2 py-0.5 rounded text-xs bg-white/5 text-[#b0b0c8] border border-white/5"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div>
            <div className="text-xs text-[#7a7a95] font-medium mb-1.5">
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {app.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-xs bg-[#00d4ff]/5 text-[#00d4ff] border border-[#00d4ff]/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Bundle ID */}
          <div className="text-xs text-[#6b6b80] font-mono">
            {app.bundleId}
          </div>
        </motion.div>
      )}

      {/* TestFlight CTA */}
      {testflightUrl ? (
        <a
          href={testflightUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#007AFF] text-white text-sm font-medium hover:bg-[#0066DD] transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Join TestFlight Beta
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      ) : app.status === "live" ? (
        <div className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-[#10b981]" />
          Live on TestFlight
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-[#7a7a95] text-sm">
          <Clock className="w-3.5 h-3.5" />
          Coming Soon
        </div>
      )}
    </motion.div>
  );
}

function Clock(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
