"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { AnimatedTerminal } from "./AnimatedTerminal";

export function Hero() {
  return (
    <section className="relative pt-48 pb-24 lg:pt-56 lg:pb-32 overflow-hidden">
      {/* Dynamic ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#00d4ff]/15 rounded-full blur-[140px] opacity-60" />
        <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-[#8b5cf6]/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
        {/* Left -- Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3" />
            V2 Mesh Now Live
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight">
            <span className="text-gradient-white block">Describe it.</span>
            <span className="text-gradient-cyan block mt-2">It gets built.</span>
          </h1>

          <p className="text-xl text-[#c0c0d8] max-w-lg leading-relaxed font-medium">
            Apps. Bots. Automations. Just type what you want in Discord.
            The AI mesh handles the rest.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5">
            <Link href="#join">
              <Button size="lg" className="h-14 px-8 shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all">
                <Users className="w-5 h-5" />
                Join Free
              </Button>
            </Link>
            <Link href="#gallery">
              <Button variant="secondary" size="lg" className="h-14 px-8 bg-white/5 border-white/10 hover:bg-white/10">
                <ArrowDown className="w-5 h-5" />
                See What People Built
              </Button>
            </Link>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center gap-8 pt-6">
            <div className="space-y-1">
              <div className="text-3xl font-black text-white">50+</div>
              <div className="text-xs font-bold text-[#8888a8] uppercase tracking-widest">Projects</div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="space-y-1">
              <div className="text-3xl font-black text-white">5+</div>
              <div className="text-xs font-bold text-[#8888a8] uppercase tracking-widest">Models</div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="space-y-1">
              <div className="text-3xl font-black text-white">24/7</div>
              <div className="text-xs font-bold text-[#8888a8] uppercase tracking-widest">Uptime</div>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="space-y-1">
              <div className="text-3xl font-black text-white">112K+</div>
              <div className="text-xs font-bold text-[#8888a8] uppercase tracking-widest">Turns</div>
            </div>
          </div>
        </motion.div>

        {/* Right -- Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-[#00d4ff]/20 blur-[100px] -z-10 rounded-full" />
          <AnimatedTerminal />
        </motion.div>
      </div>
    </section>
  );
}
