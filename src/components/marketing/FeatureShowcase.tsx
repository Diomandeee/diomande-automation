"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Hammer,
  MessageSquare,
  GitBranch,
  Clock,
  Database,
} from "lucide-react";
import { Card } from "@/components/shared/Card";

const features = [
  {
    icon: Brain,
    title: "Multi-Agent AI",
    description:
      "Claude, Gemini, Codex. The system picks the best model for your task automatically. No configuration needed.",
    color: "#00d4ff",
  },
  {
    icon: Hammer,
    title: "Build Anything",
    description:
      "Apps, APIs, bots, automations, content pipelines. If you can describe it, the mesh builds it.",
    color: "#8b5cf6",
  },
  {
    icon: MessageSquare,
    title: "Discord-Native",
    description:
      "Just type in Discord. No CLI, no IDE, no setup. Your channel is your workspace.",
    color: "#10b981",
  },
  {
    icon: GitBranch,
    title: "Parallel Execution",
    description:
      "Complex tasks decompose into subtasks, running across multiple machines simultaneously.",
    color: "#f59e0b",
  },
  {
    icon: Clock,
    title: "Always On",
    description:
      "24/7 mesh network. Queue tasks at 3am, get results by morning. The infrastructure never sleeps.",
    color: "#ef4444",
  },
  {
    icon: Database,
    title: "Knowledge System",
    description:
      "112K+ context turns. The AI remembers your project, your patterns, your preferences.",
    color: "#06b6d4",
  },
];

export function FeatureShowcase() {
  return (
    <section className="py-24 relative" id="community">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What You Get
          </h2>
          <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto">
            Production AI infrastructure built from thousands of hours of
            real-world autonomous operation. Not a wrapper around an API.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon
                    className="w-5 h-5"
                    style={{ color: feature.color }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#a0a0b8] leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
