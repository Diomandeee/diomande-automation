"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Join the community. Start building. No credit card required.",
    features: [
      "Discord community access",
      "10 tasks/month",
      "Single model (Claude)",
      "Community support",
      "Gallery showcase eligibility",
    ],
    cta: "Join Free",
    ctaHref: "#join",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description:
      "Full access to the mesh. Unlimited builds. Priority everything.",
    features: [
      "Unlimited tasks",
      "Multi-model routing (Claude + Gemini + Codex)",
      "Priority mesh execution",
      "Dedicated thread per task",
      "Team decomposition (complex multi-step builds)",
      "Direct support channel",
      "Early access to new features",
    ],
    cta: "Go Pro",
    ctaHref: "#join",
    highlighted: true,
  },
];

export function Pricing() {
  return (
    <section className="py-32 relative section-alt overflow-hidden" id="membership">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00d4ff]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge variant="cyan" className="mb-6">
            Membership
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Pick Your Level
          </h2>
          <p className="text-xl text-[#c0c0d8] max-w-2xl mx-auto font-medium">
            Start free. Go pro when you need more power.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-[2rem] p-10 border transition-all duration-500 overflow-hidden ${
                tier.highlighted
                  ? "border-[#00d4ff]/40 bg-[#00d4ff]/5 shadow-[0_0_80px_rgba(0,212,255,0.15)]"
                  : "border-white/10 bg-[#080812]/80 hover:border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 right-0 px-6 py-2 bg-[#00d4ff] text-[#05050a] font-black text-xs uppercase tracking-widest rounded-bl-2xl flex items-center gap-2 shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  Full Access
                </div>
              )}

              <h3 className="text-3xl font-black text-white mb-3">{tier.name}</h3>
              <p className="text-base text-[#c0c0d8] mb-8 font-medium">
                {tier.description}
              </p>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-white">
                    {tier.price}
                  </span>
                  <span className="text-xl text-[#8888a8] font-bold">{tier.period}</span>
                </div>
              </div>

              <Link href={tier.ctaHref}>
                <Button
                  variant={tier.highlighted ? "primary" : "secondary"}
                  className={`w-full mb-10 ${
                    tier.highlighted ? "shadow-[0_0_30px_rgba(0,212,255,0.4)]" : ""
                  }`}
                >
                  {tier.cta}
                </Button>
              </Link>

              <ul className="space-y-5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-4 text-base"
                  >
                    <div className="mt-1 p-0.5 rounded-full bg-[#10b981]/10">
                      <Check className="w-4 h-4 text-[#10b981]" />
                    </div>
                    <span className="text-[#c0c0d8] font-medium">{feature}</span>
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
