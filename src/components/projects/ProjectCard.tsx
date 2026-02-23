"use client";

import { motion } from "framer-motion";
import { Clock, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { tagColors, maturityConfig } from "@/data/projects";
import { DeviceFrame } from "./DeviceFrame";
import { MockupContent } from "./mockups/MockupContent";

interface ProjectCardProps {
  project: Project;
  variant: "featured" | "directory";
  index?: number;
}

export function ProjectCard({ project, variant, index = 0 }: ProjectCardProps) {
  if (variant === "featured") {
    return <FeaturedCard project={project} index={index} />;
  }
  return <DirectoryCard project={project} index={index} />;
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const primaryColor = tagColors[project.tags[0]] || project.accentColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="glass-card group h-full flex flex-col overflow-hidden">
          {/* Mockup Thumbnail */}
          <div
            className="relative h-48 overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${primaryColor}15 0%, #0e0e1e 100%)` }}
          >
            {/* Device mockup (scaled down) */}
            <div className="absolute inset-0 flex items-center justify-center scale-[0.55] origin-center">
              <DeviceFrame deviceType={project.deviceType} title={project.name} scale="sm">
                <MockupContent
                  slug={project.slug}
                  category={project.category}
                  accentColor={project.accentColor}
                  name={project.name}
                />
              </DeviceFrame>
            </div>

            {/* Color glow */}
            <div
              className="absolute w-32 h-32 blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: primaryColor }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05050a]/90 via-transparent to-transparent" />

            {/* App icon overlay */}
            {project.icon && (
              <div className="absolute bottom-3 left-3 z-10">
                <Image
                  src={project.icon}
                  alt={`${project.name} icon`}
                  width={32}
                  height={32}
                  className="rounded-lg shadow-lg shadow-black/40"
                />
              </div>
            )}

            {/* Build hours badge */}
            {project.buildHours && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 z-10">
                <Clock className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                <span className="text-[11px] text-white font-bold font-[family-name:var(--font-mono)]">
                  {project.buildHours}h
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-white group-hover:text-[#00d4ff] transition-colors">
                {project.name}
              </h3>
              <ExternalLink className="w-4 h-4 text-[#8888a8] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Maturity badge */}
            <div className="mb-2">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${maturityConfig[project.maturity].bg} ${maturityConfig[project.maturity].text} font-medium`}>
                {maturityConfig[project.maturity].label}
              </span>
            </div>

            <p className="text-sm text-[#c0c0d8] leading-relaxed mb-4 flex-1">
              {project.tagline}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag) => (
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
      </Link>
    </motion.div>
  );
}

function DirectoryCard({ project, index }: { project: Project; index: number }) {
  const mat = maturityConfig[project.maturity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="glass-card group p-5 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {project.icon && (
                <Image
                  src={project.icon}
                  alt={`${project.name} icon`}
                  width={24}
                  height={24}
                  className="rounded-md"
                />
              )}
              <div>
                <h3 className="text-base font-semibold text-white group-hover:text-[#00d4ff] transition-colors">
                  {project.name}
                </h3>
                <span className="text-[10px] text-[#7a7a95]">{project.category}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {project.buildHours && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#00d4ff]" />
                  <span className="text-[10px] text-[#7a7a95] font-[family-name:var(--font-mono)]">
                    {project.buildHours}h
                  </span>
                </div>
              )}
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${mat.bg} ${mat.text} font-medium`}>
                {mat.label}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[#b0b0c8] leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border bg-white/5 text-[#a0a0b8] border-white/10">
                {t}
              </span>
            ))}
          </div>

          {/* Tags */}
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
      </Link>
    </motion.div>
  );
}
