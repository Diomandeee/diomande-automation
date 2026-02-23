"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

const featured = projects.filter((p) => p.featured);

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
            {featured.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="featured"
                index={i}
              />
            ))}
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
          <div className="flex items-center gap-3 justify-center flex-wrap">
            <Link href="/projects">
              <Button variant="secondary" size="lg" className="bg-[#00d4ff]/10 border-[#00d4ff]/20 text-[#00d4ff] hover:bg-[#00d4ff]/20">
                Explore Full Directory
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/projects?view=map">
              <Button variant="secondary" size="lg" className="bg-[#8b5cf6]/10 border-[#8b5cf6]/20 text-[#8b5cf6] hover:bg-[#8b5cf6]/20">
                Explore Connections
                <GitBranch className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
