"use client";

import { motion } from "framer-motion";

const deepFeatures = [
  {
    title: "Task Classification Engine",
    description:
      "Every incoming task is analyzed and classified using a multi-dimensional taxonomy: complexity, domain, required capabilities, and optimal model. The classifier uses pattern matching and semantic analysis to route tasks to the right execution path.",
    code: `classifyTask(content) → {
  model: "claude-sonnet-4-20250514",
  complexity: "high",
  domain: "code_generation",
  requires: ["file_system", "testing"]
}`,
  },
  {
    title: "Team Task Decomposition",
    description:
      "Complex tasks are automatically decomposed into parallel subtasks. Each subtask gets its own execution context, model assignment, and result synthesis. The system handles dependencies, failures, and partial results gracefully.",
    code: `> /team Build authentication system
Decomposed into 4 subtasks:
  1. Database schema design [Claude]
  2. Auth middleware [Claude]
  3. Login/signup endpoints [Gemini]
  4. Test suite [Claude]
Executing in parallel...`,
  },
  {
    title: "Mesh Device Network",
    description:
      "Tasks are distributed across a network of devices with health monitoring, load balancing, and automatic failover. Each device reports its status, available models, and current load. The mesh coordinator assigns tasks to the optimal device.",
    code: `Mesh Status:
  mac-mini-1: online (load: 23%)
  mac-mini-2: online (load: 67%)
  gcp-vm-1:   online (load: 12%)
Routing task → gcp-vm-1 (lowest load)`,
  },
  {
    title: "Thread Lifecycle Management",
    description:
      "Every task gets a dedicated Discord thread with full lifecycle management. Threads transition from ACTIVE to IDLE to ARCHIVED automatically, with configurable thresholds for each stage. No thread pollution, ever.",
    code: `Thread: task-a3f7bc21
  Created:  2m ago
  Status:   ACTIVE → streaming result
  Messages: 3
  Auto-archive: 24h idle`,
  },
];

export function FeaturesDeep() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {deepFeatures.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`grid lg:grid-cols-2 gap-12 items-center ${
              i % 2 === 1 ? "lg:direction-rtl" : ""
            }`}
          >
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-[#a0a0b8] leading-relaxed">
                {feature.description}
              </p>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="terminal">
                <div className="terminal-header">
                  <div className="terminal-dot bg-[#ff5f57]" />
                  <div className="terminal-dot bg-[#febc2e]" />
                  <div className="terminal-dot bg-[#28c840]" />
                </div>
                <pre className="terminal-body text-sm text-[#a0a0b8] font-[family-name:var(--font-mono)] whitespace-pre-wrap">
                  {feature.code}
                </pre>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
