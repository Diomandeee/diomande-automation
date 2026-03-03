"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Flower2, ArrowRight } from "lucide-react";
import { stageConfig, type Dream } from "@/data/dreams";
import { Button } from "@/components/shared/Button";

export function DreamFeed() {
  const [dreams, setDreams] = useState<Dream[]>([]);

  useEffect(() => {
    fetch("/api/dreams")
      .then((r) => r.json())
      .then((data) => {
        const all: Dream[] = data.dreams || [];
        // Top 5 by strength
        setDreams(all.sort((a, b) => b.strength - a.strength).slice(0, 5));
      })
      .catch(() => {});
  }, []);

  if (dreams.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF69B4]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF69B4]/10 border border-[#FF69B4]/20 text-[#FF69B4] text-xs font-bold tracking-wider uppercase mb-4">
            <Flower2 className="w-3 h-3" />
            Dream Garden
          </div>
          <h2 className="text-4xl font-black text-white">
            Ideas Evolving in Real Time
          </h2>
          <p className="text-[#a0a0b8] mt-3 max-w-lg mx-auto">
            The DreamWeaver engine grows ideas from seeds to blooms through
            autonomous evolution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {dreams.map((dream, i) => {
            const stage = stageConfig[dream.stage] || stageConfig.seed;
            return (
              <motion.div
                key={dream.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: stage.color }}
                  >
                    {stage.label}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white line-clamp-2">
                  {dream.title}
                </h3>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.min(dream.strength * 100, 100)}%`,
                      backgroundColor: stage.color,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/dreams">
            <Button variant="secondary" size="lg" className="bg-white/5 border-white/10 hover:bg-white/10">
              <Flower2 className="w-4 h-4" />
              Explore Garden
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
