"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What do I get with the free community tier?",
    a: "You get full Discord community access, 10 AI tasks per month using Claude, and eligibility to showcase your projects in our gallery. It's a real taste of the infrastructure — not a trial.",
  },
  {
    q: "What counts as a 'task'?",
    a: "A task is a single request submitted through Discord. Team decomposition subtasks count individually. Simple questions and thread management don't count against your limit.",
  },
  {
    q: "Can I upgrade from Free to Pro anytime?",
    a: "Yes. Upgrade or downgrade anytime. Pro access activates immediately. If you downgrade, you keep Pro access through the end of your billing cycle.",
  },
  {
    q: "Do I need my own AI API keys?",
    a: "No. All model costs (Claude, Gemini, Codex) are included. You never need to manage API keys, rate limits, or billing with AI providers — we handle all of that.",
  },
  {
    q: "Is my data private?",
    a: "Your Discord channel is your workspace. Other community members can't see your tasks or outputs. Pro members get dedicated threads that are fully isolated.",
  },
  {
    q: "What makes this different from using ChatGPT or Claude directly?",
    a: "This is a distributed multi-agent system — not a chat interface. Tasks are decomposed across multiple AI models, executed in parallel across a mesh network, and synthesized into production-grade results. It's infrastructure, not a chatbot.",
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
            <div key={i} className="glass-card overflow-hidden">
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
