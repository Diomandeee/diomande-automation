"use client";

import { motion } from "framer-motion";

interface ProjectTechStackProps {
  tech: string[];
  tags: string[];
  tagColors: Record<string, string>;
}

export function ProjectTechStack({ tech, tags, tagColors }: ProjectTechStackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-xl font-bold text-white mb-6">Tech Stack</h2>
      <div className="flex flex-wrap gap-3">
        {tech.map((t) => (
          <span
            key={t}
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border bg-white/5 text-[#c0c0d8] border-white/10"
          >
            {t}
          </span>
        ))}
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full border font-medium"
              style={{
                color: tagColors[tag] || "#a0a0b8",
                borderColor: `${tagColors[tag] || "#a0a0b8"}30`,
                backgroundColor: `${tagColors[tag] || "#a0a0b8"}10`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
