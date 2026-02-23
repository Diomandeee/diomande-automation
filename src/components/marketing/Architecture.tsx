"use client";

import { motion } from "framer-motion";
import { UserPlus, MessageSquareText, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Join",
    description: "Get a Discord invite. Pick your channel. You're in.",
    color: "#00d4ff",
  },
  {
    icon: MessageSquareText,
    number: "02",
    title: "Build",
    description:
      "Describe what you want in plain language. The mesh handles the rest — model routing, task decomposition, execution.",
    color: "#8b5cf6",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Ship",
    description:
      "Get production code, deployed apps, or whatever you asked for. Review, iterate, ship.",
    color: "#10b981",
  },
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
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[#b0b0c8] max-w-2xl mx-auto">
            Three steps. No setup. No infrastructure to manage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="glass-card p-8 text-center"
            >
              {/* Large icon circle */}
              <div className="relative mx-auto mb-8 w-fit">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto border-2"
                  style={{
                    borderColor: `${step.color}40`,
                    backgroundColor: `${step.color}10`,
                    boxShadow: `0 0 30px ${step.color}15`,
                  }}
                >
                  <step.icon
                    className="w-9 h-9"
                    style={{ color: step.color }}
                  />
                </div>
                <span
                  className="absolute -top-2 -right-2 text-sm font-bold font-[family-name:var(--font-mono)] px-2.5 py-0.5 rounded-full border"
                  style={{
                    color: step.color,
                    borderColor: `${step.color}30`,
                    backgroundColor: `${step.color}15`,
                  }}
                >
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[#b0b0c8] leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
