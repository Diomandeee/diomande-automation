"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProjectFeaturesProps {
  features: string[];
  accentColor: string;
}

export function ProjectFeatures({ features, accentColor }: ProjectFeaturesProps) {
  if (!features.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-bold text-white mb-6">Features</h2>
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
              className="flex items-start gap-3"
            >
              <div
                className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <Check className="w-3 h-3" style={{ color: accentColor }} />
              </div>
              <span className="text-sm text-[#c0c0d8] leading-relaxed">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
