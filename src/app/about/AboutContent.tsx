"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { ArrowRight } from "lucide-react";

const milestones = [
  {
    title: "Discord Gateway",
    description: "Built a production Discord bot that accepts natural language tasks and routes them to AI models.",
  },
  {
    title: "Multi-Agent Decomposition",
    description: "Developed team task decomposition — complex tasks split into parallel subtasks across multiple AI agents.",
  },
  {
    title: "Mesh Network",
    description: "Expanded to distributed execution across multiple machines with automatic load balancing and failover.",
  },
  {
    title: "Intelligent Routing",
    description: "Added task classification that automatically selects the optimal AI model for each task type.",
  },
  {
    title: "Knowledge System",
    description: "Built a 112K+ turn context system with semantic search, knowledge graph, and context recovery.",
  },
  {
    title: "Autonomous Operations",
    description: "Achieved 24/7 autonomous operation with Pulse sessions — multi-iteration development loops that run independently.",
  },
];

export function AboutContent() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Built by a Builder,
            <br />
            <span className="text-gradient-cyan">for Builders</span>
          </h1>
          <p className="text-lg text-[#a0a0b8] leading-relaxed mb-4">
            I&apos;m Mohamed Diomande. I built Claw bot because I wanted an AI
            system that actually works in production — not a demo, not a
            wrapper, but a real distributed execution platform that handles
            real workloads 24/7.
          </p>
          <p className="text-lg text-[#a0a0b8] leading-relaxed">
            What started as a Discord bot grew into a multi-agent, multi-model,
            multi-device platform with 112K+ turns of context, autonomous
            development loops, and intelligent task routing. Now I help other
            teams deploy the same infrastructure.
          </p>
        </motion.div>

        {/* Milestones */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8">
            How We Got Here
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full">
                  <div className="text-xs text-[#00d4ff] font-[family-name:var(--font-mono)] mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-[#a0a0b8] leading-relaxed">
                    {milestone.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Deploy?
          </h2>
          <p className="text-[#a0a0b8] mb-8 max-w-lg mx-auto">
            Let&apos;s talk about how Claw bot can be deployed for your team.
            Free 30-minute consultation.
          </p>
          <Link href="/contact">
            <Button size="lg">
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
