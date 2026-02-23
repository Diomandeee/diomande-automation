"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
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
    <section className="py-24 relative section-alt" id="membership">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="cyan" className="mb-4">
            Membership
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pick Your Level
          </h2>
          <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto">
            Start free. Go pro when you need more power.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                  Full Access
                </Badge>
              )}

              <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
              <p className="text-sm text-[#a0a0b8] mt-2 mb-6">
                {tier.description}
              </p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">
                    {tier.price}
                  </span>
                  <span className="text-[#6b6b80]">{tier.period}</span>
                </div>
              </div>

              <Link href={tier.ctaHref}>
                <Button
                  variant={tier.highlighted ? "primary" : "secondary"}
                  className="w-full mb-8"
                >
                  {tier.cta}
                </Button>
              </Link>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm"
                  >
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
