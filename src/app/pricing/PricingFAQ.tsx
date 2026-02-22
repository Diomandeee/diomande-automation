"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What does the setup fee cover?",
    a: "The setup fee covers deploying and configuring your Claw bot instance — Discord server setup, gateway configuration, mesh device enrollment, model routing preferences, knowledge system initialization, and a guided test run to verify everything works.",
  },
  {
    q: "Can I switch tiers later?",
    a: "Yes. You can upgrade or downgrade at any time. Upgrades are prorated. Downgrades take effect at the next billing cycle. Additional setup may be required when adding new gateways or mesh devices.",
  },
  {
    q: "What counts as a 'task'?",
    a: "A task is a single request submitted through any gateway (Discord command, API call, SMS, etc.). Team decomposition subtasks are counted individually. Thread management operations (archive, unarchive) do not count as tasks.",
  },
  {
    q: "What happens if I exceed my task limit?",
    a: "We'll notify you at 80% usage. If you go over, tasks continue processing — we don't cut you off. Overages are billed at $0.50/task for Starter and $0.25/task for Professional. Enterprise plans have no limits.",
  },
  {
    q: "Do I need my own AI API keys?",
    a: "No. API costs for Claude, Gemini, and Codex are included in your monthly fee. You never need to manage API keys or worry about rate limits — we handle all of that.",
  },
  {
    q: "What's included in 'Priority Support'?",
    a: "Priority support includes a private Discord channel with Mo for direct access, monthly review calls to optimize your setup, and guaranteed 4-hour response time during business hours. Enterprise gets dedicated Slack + weekly reviews.",
  },
];

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer"
              >
                <span className="font-medium text-white">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#6b6b80] transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-6 pb-4 text-sm text-[#a0a0b8] leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
