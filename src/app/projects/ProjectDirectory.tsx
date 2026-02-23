"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { projects, categories } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

const allCategories = ["All" as const, ...categories];

export function ProjectDirectory() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const counts = allCategories.map((cat) => ({
    name: cat,
    count:
      cat === "All"
        ? projects.length
        : projects.filter((p) => p.category === cat).length,
  }));

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Project Directory
        </h1>
        <p className="text-lg text-[#b0b0c8] max-w-2xl">
          {projects.length} projects built with the mesh. iOS apps, web
          platforms, AI infrastructure, creative tools, and more — all started
          from a message in Discord.
        </p>
      </motion.div>

      {/* Category filter */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-[#7a7a95] shrink-0" />
        {counts.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === cat.name
                ? "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20"
                : "bg-white/5 text-[#7a7a95] border border-white/5 hover:text-white hover:border-white/10"
            }`}
          >
            {cat.name}
            <span className="ml-1.5 opacity-60">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            variant="directory"
            index={i}
          />
        ))}
      </div>

      {/* Stats footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="flex items-center justify-center gap-8 text-sm text-[#7a7a95]">
          <div>
            <span className="text-2xl font-bold text-white block">
              {projects.filter((p) => p.maturity === "production").length}
            </span>
            Production
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <span className="text-2xl font-bold text-white block">
              {projects.filter((p) => p.maturity === "mvp").length}
            </span>
            MVP
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <span className="text-2xl font-bold text-white block">
              {projects.filter((p) => p.maturity === "prototype").length}
            </span>
            Prototype
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <span className="text-2xl font-bold text-white block">
              {new Set(projects.flatMap((p) => p.tech)).size}+
            </span>
            Technologies
          </div>
        </div>
      </motion.div>
    </div>
  );
}
