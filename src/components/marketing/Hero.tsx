"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Users } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { AnimatedTerminal } from "./AnimatedTerminal";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#00d4ff]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left -- Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            <span className="text-gradient-white">Describe it.</span>
            <br />
            <span className="text-gradient-cyan">It gets built.</span>
          </h1>

          <p className="text-lg text-[#b0b0c8] max-w-lg leading-relaxed">
            Apps. Bots. Automations. Just type what you want in Discord.
            The AI mesh handles the rest.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#join">
              <Button size="lg">
                <Users className="w-4 h-4" />
                Join Free
              </Button>
            </Link>
            <Link href="#gallery">
              <Button variant="secondary" size="lg">
                <ArrowDown className="w-4 h-4" />
                See What People Built
              </Button>
            </Link>
          </div>

          {/* Stats bar */}
          <div className="flex items-center gap-6 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-xs text-[#7a7a95]">Projects built</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5+</div>
              <div className="text-xs text-[#7a7a95]">AI models</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs text-[#7a7a95]">Mesh uptime</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">112K+</div>
              <div className="text-xs text-[#7a7a95]">Context turns</div>
            </div>
          </div>
        </motion.div>

        {/* Right -- Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatedTerminal />
        </motion.div>
      </div>
    </section>
  );
}
