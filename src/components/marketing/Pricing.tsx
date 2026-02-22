"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";

const tiers = [
  {
    name: "Starter",
    setup: "$2,500",
    monthly: "$500",
    description: "Perfect for small teams getting started with AI automation.",
    features: [
      "Single gateway (Discord OR API)",
      "1 AI model (Claude)",
      "Single device execution",
      "Basic task dispatch",
      "500 tasks/month",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    setup: "$7,500",
    monthly: "$1,500",
    description: "For teams that need multi-agent decomposition and mesh execution.",
    features: [
      "Multi-gateway (Discord + API + 1 more)",
      "Multi-model routing (Claude + Gemini)",
      "Mesh network (up to 3 devices)",
      "Team task decomposition",
      "Thread-per-task architecture",
      "2,000 tasks/month",
      "Priority support + monthly review",
    ],
    cta: "Book a Call",
    highlighted: true,
  },
  {
    name: "Enterprise",
    setup: "$20,000+",
    monthly: "Custom",
    description: "Full platform deployment with unlimited scale and dedicated support.",
    features: [
      "All gateways (Discord, Telegram, SMS, API, custom)",
      "Full model routing (Claude, Gemini, Codex)",
      "Unlimited mesh devices",
      "Knowledge system (RAG++, context recovery)",
      "Pulse autonomous sessions",
      "Custom integrations",
      "Unlimited tasks",
      "Dedicated support + weekly reviews",
      "SLA guarantee",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section className="py-24 relative section-alt" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto">
            One-time setup plus a monthly service fee. No hidden costs. Scale up
            or down as your needs change.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className={`rounded-2xl p-8 border ${
                tier.highlighted
                  ? "border-[#00d4ff]/30 bg-[rgba(0,212,255,0.06)] shadow-[0_0_60px_rgba(0,212,255,0.1)]"
                  : "border-white/10 bg-[rgba(26,26,40,0.7)]"
              }`}
            >
              {tier.highlighted && (
                <Badge variant="cyan" className="mb-4">
                  Most Popular
                </Badge>
              )}

              <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
              <p className="text-sm text-[#a0a0b8] mt-2 mb-6">
                {tier.description}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {tier.monthly}
                  </span>
                  {tier.monthly !== "Custom" && (
                    <span className="text-[#6b6b80]">/mo</span>
                  )}
                </div>
                <p className="text-sm text-[#6b6b80] mt-1">
                  {tier.setup} one-time setup
                </p>
              </div>

              <Link href="/contact">
                <Button
                  variant={tier.highlighted ? "primary" : "secondary"}
                  className="w-full mb-8"
                >
                  {tier.cta}
                </Button>
              </Link>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-[#10b981] mt-0.5 shrink-0" />
                    <span className="text-[#a0a0b8]">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
