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
    description:
      "AI security camera with face recognition, pose detection, and live streaming from a spare iPhone",
    tags: ["iOS", "Vision", "Security"],
    build_hours: 48,
    featured: true,
  },
  {
    id: "2",
    name: "SpeakFlow",
    builder_name: "Mo",
    description:
      "Voice OS — talk and it types anywhere on your Mac. System-wide speech-to-text injection",
    tags: ["macOS", "Voice", "Accessibility"],
    build_hours: 36,
    featured: true,
  },
  {
    id: "3",
    name: "VisionClaw",
    builder_name: "Mo",
    description:
      "AI assistant for Meta Ray-Ban smart glasses. Voice + vision conversation in real-time",
    tags: ["iOS", "Wearable", "Gemini"],
    build_hours: 32,
    featured: true,
  },
  {
    id: "4",
    name: "Spore",
    builder_name: "Mo",
    description:
      "Plant ideas, watch them grow. Gamified idea garden with 3D visualization and evolution engine",
    tags: ["iOS", "3D", "Creativity"],
    build_hours: 32,
    featured: true,
  },
  {
    id: "5",
    name: "BWB Suite",
    builder_name: "Mo",
    description:
      "Full POS + customer + kiosk apps for a wine bar. Voice ordering, inventory, analytics",
    tags: ["iOS", "Commerce", "Voice"],
    build_hours: 60,
    featured: true,
  },
  {
    id: "6",
    name: "Creative Director",
    builder_name: "Mo",
    description:
      "AI content pipeline with batch generation, Shopify publishing, and AI image generation",
    tags: ["iOS", "Content", "Shopify"],
    build_hours: 40,
    featured: true,
  },
  {
    id: "7",
    name: "LifeOS",
    builder_name: "Mo",
    description:
      "Voice-first life management from Apple Watch. Health tracking, Siri shortcuts, streaks",
    tags: ["watchOS", "Health", "Voice"],
    build_hours: 28,
    featured: true,
  },
  {
    id: "8",
    name: "Cross-Script Bridge",
    builder_name: "Mo",
    description:
      "Real-time N'Ko ↔ Arabic ↔ Latin transliteration. PWA, browser extension, iOS keyboard",
    tags: ["TypeScript", "Language", "PWA"],
    build_hours: 44,
    featured: true,
  },
  {
    id: "9",
    name: "Sound Sigils",
    builder_name: "Mo",
    description:
      "Generate unique audio signatures from concepts. Pure Python, no dependencies, 112 tests",
    tags: ["Python", "Audio", "Generative"],
    build_hours: 24,
    featured: false,
  },
  {
    id: "10",
    name: "Spatial Git",
    builder_name: "Mo",
    description:
      "Navigate git history in 3D space. Branches as walkways, commits as glowing nodes",
    tags: ["Three.js", "DevTools", "3D"],
    build_hours: 16,
    featured: false,
  },
  {
    id: "11",
    name: "Dream Weaver",
    builder_name: "Mo",
    description:
      "Autonomous idea incubation via GitHub Actions. Ideas evolve through stages while you sleep",
    tags: ["Python", "Automation", "AI"],
    build_hours: 20,
    featured: false,
  },
  {
    id: "12",
    name: "Compass",
    builder_name: "Mo",
    description:
      "Agent stack dashboard — single pane of glass for 50+ repos, 136 skills, 23 pipelines",
    tags: ["Next.js", "Dashboard", "D3"],
    build_hours: 28,
    featured: false,
  },
  {
    id: "13",
    name: "Content Pipeline",
    builder_name: "Mo",
    description:
      "Automated TikTok script generation, scheduling, and cross-platform distribution",
    tags: ["Automation", "Content", "Publishing"],
    build_hours: 18,
    featured: false,
  },
  {
    id: "14",
    name: "LinkIt",
    builder_name: "Mo",
    description:
      "Link-in-bio SaaS with glassmorphism design, deep analytics, and custom domains",
    tags: ["Next.js", "SaaS", "Analytics"],
    build_hours: 22,
    featured: false,
  },
  {
    id: "15",
    name: "Aesthetic DNA",
    builder_name: "Mo",
    description:
      "Extract the visual genome from any design — colors, type, texture, motion — and apply it to new creations",
    tags: ["JavaScript", "Design", "Generative"],
    build_hours: 14,
    featured: false,
  },
  {
    id: "16",
    name: "Self-Healing Code",
    builder_name: "Mo",
    description:
      "Code that detects, diagnoses, and fixes its own bugs. Immune memory and vulnerability scanning",
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
    <section className="py-24 relative" id="gallery">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built With the Mesh
          </h2>
          <p className="text-lg text-[#b0b0c8] max-w-2xl mx-auto">
            Real projects. Started as a message. Shipped as a product.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="glass-card group h-full flex flex-col">
                {/* Thumbnail placeholder */}
                <div className="relative h-36 rounded-t-[1rem] overflow-hidden bg-gradient-to-br from-[#00d4ff]/5 via-[#8b5cf6]/5 to-[#0e0e1e] flex items-center justify-center border-b border-white/8">
                  <span className="text-3xl font-bold text-white/15 font-[family-name:var(--font-mono)] group-hover:text-[#00d4ff]/25 transition-colors">
                    {project.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e1e]/80 to-transparent" />
                  {project.build_hours && (
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
                      <Clock className="w-3 h-3 text-[#00d4ff]" />
                      <span className="text-[10px] text-[#b0b0c8] font-[family-name:var(--font-mono)]">
                        {project.build_hours}h
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#00d4ff] transition-colors">
                      {project.name}
                    </h3>
                    <ExternalLink className="w-3.5 h-3.5 text-[#7a7a95] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-[#9090a8] leading-relaxed mb-3 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full border font-medium"
                        style={{
                          color: tagColors[tag] || "#a0a0b8",
                          borderColor: `${tagColors[tag] || "#a0a0b8"}30`,
                          backgroundColor: `${tagColors[tag] || "#a0a0b8"}08`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-[#7a7a95] mb-4">
            16 projects and counting. Join and add yours to the wall.
          </p>
          <Link href="/projects">
            <Button variant="secondary" size="sm">
              See all projects
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
