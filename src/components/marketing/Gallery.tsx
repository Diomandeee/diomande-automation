"use client";

import { motion } from "framer-motion";
import { Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/shared/Badge";

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
    builder_name: "Mo Diomande",
    description:
      "AI-powered security camera system with face recognition, pose detection, and live streaming",
    tags: ["iOS", "Computer Vision", "Security"],
    build_hours: 48,
    featured: true,
  },
  {
    id: "2",
    name: "SpeakFlow",
    builder_name: "Mo Diomande",
    description:
      "Speech-to-text injection tool with floating pill UI and system-wide keyboard integration",
    tags: ["macOS", "Speech AI", "Accessibility"],
    build_hours: 36,
    featured: true,
  },
  {
    id: "3",
    name: "Spore",
    builder_name: "Mo Diomande",
    description:
      "Idea cultivation garden with 3D visualization, evolution engine, and seasonal themes",
    tags: ["iOS", "Visualization", "Productivity"],
    build_hours: 32,
    featured: true,
  },
  {
    id: "4",
    name: "Creative Director",
    builder_name: "Mo Diomande",
    description:
      "AI content pipeline with batch processing, scheduling, and multi-platform publishing",
    tags: ["macOS", "Content", "Automation"],
    build_hours: 40,
    featured: true,
  },
  {
    id: "5",
    name: "BWB POS",
    builder_name: "Mo Diomande",
    description:
      "Wine bar point-of-sale system with inventory management and sales analytics",
    tags: ["iOS", "Commerce", "POS"],
    build_hours: 28,
    featured: true,
  },
  {
    id: "6",
    name: "Sound Sigils",
    builder_name: "Mo Diomande",
    description:
      "Audio generation from abstract concepts using AI-driven synthesis and composition",
    tags: ["Audio", "AI Generation", "Creative"],
    build_hours: 24,
    featured: true,
  },
  {
    id: "7",
    name: "Serenity Soother",
    builder_name: "Mo Diomande",
    description:
      "Therapeutic relaxation app with adaptive soundscapes and guided breathing",
    tags: ["iOS", "Wellness", "Audio"],
    build_hours: 20,
    featured: true,
  },
  {
    id: "8",
    name: "Content Pipeline",
    builder_name: "Mo Diomande",
    description:
      "Automated content publishing system with AI writing, scheduling, and distribution",
    tags: ["API", "Automation", "Publishing"],
    build_hours: 18,
    featured: false,
  },
];

const tagColors: Record<string, string> = {
  iOS: "#00d4ff",
  macOS: "#8b5cf6",
  "Computer Vision": "#ef4444",
  "Speech AI": "#f59e0b",
  Security: "#ef4444",
  Accessibility: "#10b981",
  Visualization: "#8b5cf6",
  Productivity: "#10b981",
  Content: "#f59e0b",
  Automation: "#06b6d4",
  Commerce: "#f59e0b",
  POS: "#ef4444",
  Audio: "#8b5cf6",
  "AI Generation": "#00d4ff",
  Creative: "#f59e0b",
  Wellness: "#10b981",
  API: "#06b6d4",
  Publishing: "#10b981",
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
            Built With This Infrastructure
          </h2>
          <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto">
            Real products. Real code. All built using the same AI mesh you get
            access to.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="glass-card group h-full flex flex-col">
                {/* Thumbnail placeholder */}
                <div className="relative h-36 rounded-t-[1rem] overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center border-b border-white/5">
                  <span className="text-3xl font-bold text-white/10 font-[family-name:var(--font-mono)] group-hover:text-white/20 transition-colors">
                    {project.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />
                  {project.build_hours && (
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
                      <Clock className="w-3 h-3 text-[#00d4ff]" />
                      <span className="text-[10px] text-[#a0a0b8] font-[family-name:var(--font-mono)]">
                        {project.build_hours}h
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#00d4ff] transition-colors">
                      {project.name}
                    </h3>
                    <ExternalLink className="w-3.5 h-3.5 text-[#6b6b80] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-[#6b6b80] leading-relaxed mb-3 flex-1">
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
      </div>
    </section>
  );
}
