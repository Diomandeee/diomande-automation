"use client";

import { motion } from "framer-motion";
import { Code2, Server, Search } from "lucide-react";
import { Card } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";

const useCases = [
  {
    icon: Code2,
    badge: "Engineering",
    title: "Engineering Teams",
    description:
      "Automate code review, test generation, documentation, and refactoring across your entire codebase. Your team focuses on architecture — the bot handles the rest.",
    examples: [
      "Automated PR reviews with context-aware feedback",
      "Test generation across frameworks",
      "Documentation that stays in sync with code",
      "Large-scale refactoring with safety checks",
    ],
    color: "#00d4ff",
  },
  {
    icon: Server,
    badge: "DevOps",
    title: "DevOps & Infrastructure",
    description:
      "Deployment automation, infrastructure management, and monitoring — all through natural language commands in Discord or via API.",
    examples: [
      "Deploy services with rollback capability",
      "Infrastructure-as-code generation",
      "Incident response automation",
      "Log analysis and anomaly detection",
    ],
    color: "#8b5cf6",
  },
  {
    icon: Search,
    badge: "Research",
    title: "Research & Knowledge",
    description:
      "Synthesize data, recover context across sessions, and build a semantic knowledge graph that grows with every interaction.",
    examples: [
      "Cross-document synthesis and summarization",
      "Semantic search across 112K+ turns",
      "Knowledge graph construction",
      "Context recovery across conversations",
    ],
    color: "#10b981",
  },
];

export function UseCases() {
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
            Built for Real Workloads
          </h2>
          <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto">
            Not a demo. These capabilities run in production every day, handling
            thousands of tasks across distributed infrastructure.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <Card className="h-full space-y-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${useCase.color}15` }}
                  >
                    <useCase.icon
                      className="w-5 h-5"
                      style={{ color: useCase.color }}
                    />
                  </div>
                  <Badge
                    variant={
                      i === 0 ? "cyan" : i === 1 ? "purple" : "green"
                    }
                  >
                    {useCase.badge}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-[#a0a0b8] leading-relaxed">
                    {useCase.description}
                  </p>
                </div>

                <ul className="space-y-2">
                  {useCase.examples.map((example) => (
                    <li
                      key={example}
                      className="flex items-start gap-2 text-sm text-[#6b6b80]"
                    >
                      <span style={{ color: useCase.color }} className="mt-1">
                        &bull;
                      </span>
                      {example}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
