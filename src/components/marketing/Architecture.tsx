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
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d4ff]/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-[#c0c0d8] max-w-2xl mx-auto font-medium">
            Three steps. No setup. No infrastructure to manage.
          </p>
        </motion.div>

        {/* Visible container box */}
        <div className="rounded-2xl border border-white/[0.12] bg-white/[0.03] p-8 lg:p-12 shadow-[0_4px_32px_rgba(0,0,0,0.3)]">
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-[60px]" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step indicator */}
              <div className="mb-10 relative">
                <div
                  className="w-24 h-24 rounded-[2rem] flex items-center justify-center border-2 transition-all duration-500 group-hover:scale-110"
                  style={{
                    borderColor: `${step.color}50`,
                    backgroundColor: `${step.color}15`,
                    boxShadow: `0 0 40px ${step.color}20`,
                  }}
                >
                  <step.icon
                    className="w-10 h-10"
                    style={{ color: step.color }}
                  />
                </div>
                <div
                  className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 shadow-xl"
                  style={{
                    backgroundColor: "#05050a",
                    borderColor: step.color,
                    color: step.color,
                  }}
                >
                  {step.number}
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-4">
                {step.title}
              </h3>
              <p className="text-base text-[#c0c0d8] leading-relaxed max-w-xs font-medium">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
