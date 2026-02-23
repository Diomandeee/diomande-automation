"use client";

import { motion } from "framer-motion";
import { Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shared/Button";

interface Project {
  id: string;
  name: string;
  builder_name: string;
  description: string;
  tags: string[];
  build_hours: number | null;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: "1",
    name: "SecuriClaw",
    builder_name: "Mo",
    description: "AI security camera with face recognition, pose detection, and live streaming from a spare iPhone",
    tags: ["iOS", "Vision", "Security"],
    build_hours: 48,
    featured: true,
  },
  {
    id: "2",
    name: "SpeakFlow",
    builder_name: "Mo",
    description: "Voice OS — talk and it types anywhere on your Mac. System-wide speech-to-text injection",
    tags: ["macOS", "Voice", "Accessibility"],
    build_hours: 36,
    featured: true,
  },
  {
    id: "3",
    name: "VisionClaw",
    builder_name: "Mo",
    description: "AI assistant for Meta Ray-Ban smart glasses. Voice + vision conversation in real-time",
    tags: ["iOS", "Wearable", "Gemini"],
    build_hours: 32,
    featured: true,
  },
  {
    id: "4",
    name: "Spore",
    builder_name: "Mo",
    description: "Plant ideas, watch them grow. Gamified idea garden with 3D visualization and evolution engine",
    tags: ["iOS", "3D", "Creativity"],
    build_hours: 32,
    featured: true,
  },
  {
    id: "5",
    name: "BWB Suite",
    builder_name: "Mo",
    description: "Full POS + customer + kiosk apps for a wine bar. Voice ordering, inventory, analytics",
    tags: ["iOS", "Commerce", "Voice"],
    build_hours: 60,
    featured: true,
  },
  {
    id: "6",
    name: "Creative Director",
    builder_name: "Mo",
    description: "AI content pipeline with batch generation, Shopify publishing, and AI image generation",
    tags: ["iOS", "Content", "Shopify"],
    build_hours: 40,
    featured: true,
  },
  {
    id: "7",
    name: "LifeOS",
    builder_name: "Mo",
    description: "Voice-first life management from Apple Watch. Health tracking, Siri shortcuts, streaks",
    tags: ["watchOS", "Health", "Voice"],
    build_hours: 28,
    featured: true,
  },
  {
    id: "8",
    name: "Cross-Script Bridge",
    builder_name: "Mo",
    description: "Real-time N'Ko ↔ Arabic ↔ Latin transliteration. PWA, browser extension, iOS keyboard",
    tags: ["TypeScript", "Language", "PWA"],
    build_hours: 44,
    featured: true,
  },
  {
    id: "9",
    name: "Sound Sigils",
    builder_name: "Mo",
    description: "Generate unique audio signatures from concepts. Pure Python, no dependencies, 112 tests",
    tags: ["Python", "Audio", "Generative"],
    build_hours: 24,
    featured: false,
  },
  {
    id: "10",
    name: "Spatial Git",
    builder_name: "Mo",
    description: "Navigate git history in 3D space. Branches as walkways, commits as glowing nodes",
    tags: ["Three.js", "DevTools", "3D"],
    build_hours: 16,
    featured: false,
  },
  {
    id: "11",
    name: "Dream Weaver",
    builder_name: "Mo",
    description: "Autonomous idea incubation via GitHub Actions. Ideas evolve through stages while you sleep",
    tags: ["Python", "Automation", "AI"],
    build_hours: 20,
    featured: false,
  },
  {
    id: "12",
    name: "Compass",
    builder_name: "Mo",
    description: "Agent stack dashboard — single pane of glass for 50+ repos, 136 skills, 23 pipelines",
    tags: ["Next.js", "Dashboard", "D3"],
    build_hours: 28,
    featured: false,
  },
  {
    id: "13",
    name: "Content Pipeline",
    builder_name: "Mo",
    description: "Automated TikTok script generation, scheduling, and cross-platform distribution",
    tags: ["Automation", "Content", "Publishing"],
    build_hours: 18,
    featured: false,
  },
  {
    id: "14",
    name: "LinkIt",
    builder_name: "Mo",
    description: "Link-in-bio SaaS with glassmorphism design, deep analytics, and custom domains",
    tags: ["Next.js", "SaaS", "Analytics"],
    build_hours: 22,
    featured: false,
  },
  {
    id: "15",
    name: "Aesthetic DNA",
    builder_name: "Mo",
    description: "Extract the visual genome from any design — colors, type, texture, motion — and apply it to new creations",
    tags: ["JavaScript", "Design", "Generative"],
    build_hours: 14,
    featured: false,
  },
  {
    id: "16",
    name: "Self-Healing Code",
    builder_name: "Mo",
    description: "Code that detects, diagnoses, and fixes its own bugs. Immune memory and vulnerability scanning",
    tags: ["Python", "DevTools", "AI"],
    build_hours: 20,
    featured: false,
  },
];

const tagColors: Record<string, string> = {
  iOS: "#00d4ff",
  macOS: "#8b5cf6",
  watchOS: "#10b981",
  Vision: "#ef4444",
  Voice: "#f59e0b",
  Security: "#ef4444",
  Accessibility: "#10b981",
  "3D": "#8b5cf6",
  Creativity: "#f59e0b",
  Commerce: "#f59e0b",
  Content: "#f59e0b",
  Shopify: "#10b981",
  Wearable: "#ec4899",
  Gemini: "#06b6d4",
  Health: "#10b981",
  Language: "#8b5cf6",
  TypeScript: "#06b6d4",
  PWA: "#f59e0b",
  Python: "#10b981",
  Audio: "#8b5cf6",
  Generative: "#ec4899",
  "Three.js": "#06b6d4",
  DevTools: "#f59e0b",
  Automation: "#06b6d4",
  AI: "#00d4ff",
  "Next.js": "#8b5cf6",
  Dashboard: "#f59e0b",
  D3: "#10b981",
  Publishing: "#10b981",
  SaaS: "#00d4ff",
  Analytics: "#06b6d4",
  JavaScript: "#f59e0b",
  Design: "#ec4899",
};

export function Gallery() {
  return (
    <section className="py-32 relative" id="gallery">
      <div className="max-w-6xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Built With the Mesh
          </h2>
          <p className="text-xl text-[#c0c0d8] max-w-2xl mx-auto font-medium">
            Real projects. Started as a message. Shipped as a product.
          </p>
        </motion.div>

        <div className="rounded-2xl border border-white/[0.12] bg-white/[0.03] p-6 lg:p-8 shadow-[0_4px_32px_rgba(0,0,0,0.3)]">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter(p => p.featured).map((project, i) => {
            const primaryColor = tagColors[project.tags[0]] || "#00d4ff";
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="glass-card group h-full flex flex-col overflow-hidden">
                  {/* Vibrant Thumbnail */}
                  <div
                    className="relative h-40 flex items-center justify-center overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}20 0%, #0e0e1e 100%)`,
                    }}
                  >
                    {/* Color glow element */}
                    <div
                      className="absolute w-32 h-32 blur-[40px] opacity-30 group-hover:opacity-50 transition-opacity"
                      style={{ backgroundColor: primaryColor }}
                    />

                    <span className="relative z-10 text-4xl font-black text-white/20 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] font-[family-name:var(--font-mono)] group-hover:text-white/30 transition-colors">
                      {project.name.split(" ").map((w) => w[0]).join("")}
                    </span>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#05050a]/80 via-transparent to-transparent" />

                    {project.build_hours && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                        <Clock className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                        <span className="text-[11px] text-white font-bold font-[family-name:var(--font-mono)]">
                          {project.build_hours}h
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                        {project.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-[#8888a8] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-[#c0c0d8] leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2.5 py-1 rounded-md border font-bold uppercase tracking-wider"
                          style={{
                            color: tagColors[tag] || "#a0a0b8",
                            borderColor: `${tagColors[tag] || "#a0a0b8"}40`,
                            backgroundColor: `${tagColors[tag] || "#a0a0b8"}15`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-[#8888a8] mb-6">
            {projects.length} projects and counting. Join and add yours to the wall.
          </p>
          <Link href="/projects">
            <Button variant="secondary" size="lg" className="bg-[#00d4ff]/10 border-[#00d4ff]/20 text-[#00d4ff] hover:bg-[#00d4ff]/20">
              Explore Full Directory
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
