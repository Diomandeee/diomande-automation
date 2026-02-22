"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { AnimatedTerminal } from "./AnimatedTerminal";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#00d4ff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <Badge variant="cyan">Now accepting clients</Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
            <span className="text-gradient-white">AI-Powered Task</span>
            <br />
            <span className="text-gradient-cyan">Automation</span>
            <br />
            <span className="text-gradient-white">for Your Team</span>
          </h1>

          <p className="text-lg text-[#a0a0b8] max-w-lg leading-relaxed">
            Distributed execution. Multi-agent decomposition. Intelligent model
            routing. Deployed and managed for your infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button size="lg">
                Book a Consultation
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="secondary" size="lg">
                <Play className="w-4 h-4" />
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-6 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">112K+</div>
              <div className="text-xs text-[#6b6b80]">Context turns</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5+</div>
              <div className="text-xs text-[#6b6b80]">AI models</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-xs text-[#6b6b80]">Autonomous</div>
            </div>
          </div>
        </motion.div>

        {/* Right — Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatedTerminal />
        </motion.div>
      </div>
    </section>
  );
}
