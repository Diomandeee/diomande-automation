"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, Github, Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import { maturityConfig } from "@/data/projects";
import { DeviceFrame } from "./DeviceFrame";
import { MockupContent } from "./mockups/MockupContent";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const mat = maturityConfig[project.maturity];

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center">
      {/* Device mockup */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex justify-center"
      >
        <div className="relative max-w-sm w-full">
          {/* Background glow */}
          <div
            className="absolute inset-0 blur-[60px] opacity-15"
            style={{ backgroundColor: project.accentColor }}
          />
          {project.screenshot ? (
            <Image
              src={project.screenshot}
              alt={`${project.name} screenshot`}
              width={1280}
              height={800}
              className="rounded-xl border border-white/10 shadow-2xl shadow-black/40"
            />
          ) : (
            <DeviceFrame
              deviceType={project.deviceType}
              title={project.name}
              url={`https://${project.slug}.app`}
              filename={`${project.slug}.ts`}
            >
              <MockupContent
                slug={project.slug}
                category={project.category}
                accentColor={project.accentColor}
                name={project.name}
              />
            </DeviceFrame>
          )}
        </div>
      </motion.div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full lg:w-1/2"
      >
        <div className="flex items-center gap-3 mb-4">
          {project.icon && (
            <Image
              src={project.icon}
              alt={`${project.name} icon`}
              width={48}
              height={48}
              className="rounded-xl shadow-lg shadow-black/40"
            />
          )}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {project.name}
            </h1>
            <p className="text-lg text-[#c0c0d8]">{project.tagline}</p>
          </div>
        </div>

        {/* Meta badges */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className={`text-xs px-3 py-1 rounded-full ${mat.bg} ${mat.text} font-medium`}>
            {mat.label}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-[#a0a0b8] border border-white/10">
            {project.category}
          </span>
          {project.buildHours && (
            <span className="flex items-center gap-1.5 text-xs text-[#a0a0b8]">
              <Clock className="w-3.5 h-3.5 text-[#00d4ff]" />
              {project.buildHours} build hours
            </span>
          )}
        </div>

        <p className="text-[#b0b0c8] leading-relaxed text-base mb-6">
          {project.description}
        </p>

        {/* Links + GitHub */}
        <div className="flex gap-3 flex-wrap">
          {project.github && (
            project.github.visibility === "public" ? (
              <a
                href={project.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors"
              >
                <Github className="w-4 h-4" />
                View Source
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-[#7a7a95]">
                <Lock className="w-3.5 h-3.5" />
                Private Repo
              </span>
            )
          )}
          {project.links?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
