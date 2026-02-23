"use client";

import { motion } from "framer-motion";

interface TestFlightCTAProps {
  status: "active" | "coming-soon";
  url?: string;
  projectName: string;
}

export function TestFlightCTA({ status, url, projectName }: TestFlightCTAProps) {
  if (status === "active" && url) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="rounded-xl border border-[#007AFF]/20 bg-[#007AFF]/5 p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Try on TestFlight</h3>
              <p className="text-sm text-[#b0b0c8]">
                Get early access to {projectName} on your iPhone or iPad.
              </p>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#007AFF] text-white font-medium text-sm hover:bg-[#0066DD] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on TestFlight
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Coming to TestFlight</h3>
            <p className="text-sm text-[#b0b0c8]">
              {projectName} will be available for beta testing soon.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[#a0a0b8] text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
            Coming Soon
          </div>
        </div>
      </div>
    </motion.div>
  );
}
