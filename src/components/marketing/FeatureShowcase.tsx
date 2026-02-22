"use client";

import { motion } from "framer-motion";
import {
  GitBranch,
  Network,
  Brain,
  Layers,
  MessageSquare,
  Database,
} from "lucide-react";
import { Card } from "@/components/shared/Card";

const features = [
  {
    icon: GitBranch,
    title: "Multi-Agent Task Decomposition",
    description:
      "Complex tasks are automatically split into parallel subtasks, executed across agents, and auto-synthesized into a coherent result.",
    color: "#00d4ff",
  },
  {
    icon: Network,
    title: "Distributed Mesh Execution",
    description:
      "Run across multiple machines with automatic load balancing, failover, and device health monitoring across your infrastructure.",
    color: "#8b5cf6",
  },
  {
    icon: Brain,
    title: "Intelligent Model Routing",
    description:
      "Auto-selects Claude, Gemini, or Codex based on task classification. The right model for the right job, every time.",
    color: "#10b981",
  },
  {
    icon: Layers,
    title: "Thread-Per-Task Architecture",
    description:
      "Every task gets its own isolated thread with full lifecycle management — from ACTIVE through IDLE to ARCHIVED.",
    color: "#f59e0b",
  },
  {
    icon: MessageSquare,
    title: "Multi-Gateway Access",
    description:
      "Discord, Telegram, SMS, REST API — meet your team where they already work. One bot, every interface.",
    color: "#ef4444",
  },
  {
    icon: Database,
    title: "Knowledge-Aware Execution",
    description:
      "112K+ turn context, semantic search, and a knowledge graph that grows with every interaction. Your AI remembers.",
    color: "#06b6d4",
  },
];

export function FeatureShowcase() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Production-Grade AI Infrastructure
          </h2>
          <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto">
            Not a wrapper around an API. A distributed task execution platform
            built from thousands of hours of real-world autonomous operation.
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
