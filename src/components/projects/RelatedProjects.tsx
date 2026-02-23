"use client";

import { motion } from "framer-motion";
import { getRelatedProjects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

interface RelatedProjectsProps {
  slug: string;
}

export function RelatedProjects({ slug }: RelatedProjectsProps) {
  const related = getRelatedProjects(slug, 3);

  if (!related.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="text-xl font-bold text-white mb-6">Related Projects</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            variant="directory"
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}
