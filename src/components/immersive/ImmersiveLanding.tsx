"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  ArrowLeft,
  ArrowRight,
  Brain,
  Hammer,
  MessageSquare,
  GitBranch,
  Clock,
  Database,
  Check,
  ChevronRight,
  Sparkles,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { projects } from "@/data/projects";
import Link from "next/link";

// ── Types & Data ────────────────────────────────────────────────

type PanelId =
  | "build"
  | "collection"
  | "capabilities"
  | "pipeline"
  | "membership"
  | "connect";

const PANEL_ORDER: PanelId[] = [
  "build",
  "collection",
  "capabilities",
  "pipeline",
  "membership",
  "connect",
];

interface PanelDef {
  id: PanelId;
  label: string;
  subtitle: string;
  accent: string;
}

const PANELS: PanelDef[] = [
  {
    id: "build",
    label: "Build",
    subtitle: "Describe it. It gets built.",
    accent: "#00d4ff",
  },
  {
    id: "collection",
    label: "Collection",
    subtitle: `${projects.filter((p) => p.featured).length}+ projects shipped`,
    accent: "#8b5cf6",
  },
  {
    id: "capabilities",
    label: "Capabilities",
    subtitle: "Multi-agent AI infrastructure",
    accent: "#10b981",
  },
  {
    id: "pipeline",
    label: "Pipeline",
    subtitle: "From prompt to production",
    accent: "#f59e0b",
  },
  {
    id: "membership",
    label: "Membership",
    subtitle: "Free and Pro tiers",
    accent: "#00d4ff",
  },
  {
    id: "connect",
    label: "Connect",
    subtitle: "Join the community",
    accent: "#ec4899",
  },
];

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

const FEATURES: Feature[] = [
  {
    icon: Brain,
    title: "Multi-Agent AI",
    desc: "Claude, Gemini, and Codex working in parallel",
    color: "#00d4ff",
  },
  {
    icon: Hammer,
    title: "Build Anything",
    desc: "iOS apps, web platforms, APIs, automations",
    color: "#8b5cf6",
  },
  {
    icon: MessageSquare,
    title: "Discord-Native",
    desc: "Type in Discord, get production code back",
    color: "#10b981",
  },
  {
    icon: GitBranch,
    title: "Parallel Execution",
    desc: "Tasks decomposed and run across mesh nodes",
    color: "#f59e0b",
  },
  {
    icon: Clock,
    title: "Always On",
    desc: "24/7 autonomous agents monitoring and building",
    color: "#ef4444",
  },
  {
    icon: Database,
    title: "Knowledge System",
    desc: "Semantic graph with 112K+ conversation turns",
    color: "#06b6d4",
  },
];

const PIPELINE_STAGES = [
  { num: "01", title: "Describe", desc: "Natural language input" },
  { num: "02", title: "Classify", desc: "Intent + complexity" },
  { num: "03", title: "Route", desc: "Best model selected" },
  { num: "04", title: "Build", desc: "Agent writes code" },
  { num: "05", title: "Ship", desc: "Deployed live" },
];

const featured = projects.filter((p) => p.featured).slice(0, 8);

// ── Animation Variants ──────────────────────────────────────────

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const panelTransition = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const };

// ── Main Component ──────────────────────────────────────────────

export function ImmersiveLanding() {
  const [activePanel, setActivePanel] = useState<PanelId | null>(null);
  const [direction, setDirection] = useState(0);

  const navigateTo = useCallback(
    (id: PanelId) => {
      if (activePanel) {
        const curr = PANEL_ORDER.indexOf(activePanel);
        const next = PANEL_ORDER.indexOf(id);
        setDirection(next > curr ? 1 : -1);
      }
      setActivePanel(id);
    },
    [activePanel]
  );

  const navigateNext = useCallback(() => {
    if (!activePanel) return;
    const idx = PANEL_ORDER.indexOf(activePanel);
    if (idx < PANEL_ORDER.length - 1) navigateTo(PANEL_ORDER[idx + 1]);
  }, [activePanel, navigateTo]);

  const navigatePrev = useCallback(() => {
    if (!activePanel) return;
    const idx = PANEL_ORDER.indexOf(activePanel);
    if (idx > 0) navigateTo(PANEL_ORDER[idx - 1]);
  }, [activePanel, navigateTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePanel(null);
        setDirection(0);
      }
      if (e.key === "ArrowRight") navigateNext();
      if (e.key === "ArrowLeft") navigatePrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigateNext, navigatePrev]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#020205] relative flex flex-col">
      {/* ── Nav ── */}
      <header className="relative z-50 h-14 flex items-center justify-between px-5 md:px-8 shrink-0 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          {activePanel ? (
            <button
              onClick={() => {
                setActivePanel(null);
                setDirection(0);
              }}
              className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase">
                Back
              </span>
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-medium text-white/80 tracking-wide group-hover:text-white/95 transition-colors">
                Diomande<span className="text-[#00d4ff]">.</span>
              </span>
            </Link>
          )}
        </div>

        {/* Dot navigation */}
        {activePanel && (
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            {PANELS.map((p) => (
              <button
                key={p.id}
                onClick={() => navigateTo(p.id)}
                aria-label={p.label}
                className={`rounded-full transition-all duration-300 ${
                  p.id === activePanel
                    ? "w-6 h-1.5 bg-white/70"
                    : "w-1.5 h-1.5 bg-white/15 hover:bg-white/35"
                }`}
              />
            ))}
          </div>
        )}

        <div className="w-24 flex justify-end">
          {!activePanel && (
            <button
              onClick={() => {
                setDirection(0);
                setActivePanel("connect");
              }}
              className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 hover:text-white/70 transition-colors"
            >
              Join Free
            </button>
          )}
          {activePanel && (
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/15">
              esc
            </span>
          )}
        </div>
      </header>

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 min-h-0">
        <AnimatePresence mode="wait" custom={direction}>
          {!activePanel ? (
            <motion.div
              key="grid"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-[6px] p-3 md:p-4"
            >
              {PANELS.map((panel, i) => (
                <PortalCard
                  key={panel.id}
                  panel={panel}
                  index={i}
                  onClick={() => {
                    setDirection(0);
                    setActivePanel(panel.id);
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={activePanel}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0, transition: panelTransition }}
              exit={{
                opacity: 0,
                x: direction * -50,
                transition: { duration: 0.3 },
              }}
              className="h-full flex flex-col"
            >
              {/* Panel content */}
              <div className="flex-1 min-h-0 flex items-center justify-center px-5 md:px-12 py-4">
                <PanelContent id={activePanel} onNavigate={navigateTo} />
              </div>

              {/* Bottom navigation */}
              <div className="shrink-0 h-11 flex items-center justify-center gap-6 border-t border-white/[0.04]">
                <button
                  onClick={navigatePrev}
                  disabled={PANEL_ORDER.indexOf(activePanel) === 0}
                  className="text-white/25 hover:text-white/60 transition-colors disabled:opacity-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/20 min-w-[100px] text-center">
                  {PANELS.find((p) => p.id === activePanel)?.label}
                </span>
                <button
                  onClick={navigateNext}
                  disabled={
                    PANEL_ORDER.indexOf(activePanel) ===
                    PANEL_ORDER.length - 1
                  }
                  className="text-white/25 hover:text-white/60 transition-colors disabled:opacity-0"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Portal Card ─────────────────────────────────────────────────

function PortalCard({
  panel,
  index,
  onClick,
}: {
  panel: PanelDef;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      variants={cardVariants}
      onClick={onClick}
      className="relative group rounded-xl overflow-hidden border border-white/[0.05] bg-white/[0.012] flex flex-col text-left transition-all duration-500 hover:bg-white/[0.03] hover:border-white/[0.1] p-4 md:p-5 cursor-pointer"
      whileHover={{ scale: 1.008 }}
      whileTap={{ scale: 0.995 }}
    >
      {/* Index */}
      <span className="text-[9px] font-mono text-white/10 tracking-[0.3em]">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Preview */}
      <div className="flex-1 flex items-center justify-center py-2 md:py-4">
        <CardPreview id={panel.id} accent={panel.accent} />
      </div>

      {/* Label */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <h2 className="text-sm md:text-base font-light tracking-[0.04em] text-white/80">
            {panel.label}
          </h2>
          <p className="text-[10px] text-white/25 mt-0.5 hidden md:block">
            {panel.subtitle}
          </p>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-white/0 group-hover:text-white/30 transition-all duration-500 shrink-0" />
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 80%, ${panel.accent}06 0%, transparent 70%)`,
        }}
      />
    </motion.button>
  );
}

// ── Card Previews ───────────────────────────────────────────────

function CardPreview({ id, accent }: { id: PanelId; accent: string }) {
  switch (id) {
    case "build":
      return (
        <div className="text-center select-none">
          <p className="text-xl md:text-2xl font-extralight text-white/70 leading-tight">
            Describe it.
          </p>
          <p
            className="text-xl md:text-2xl font-extralight leading-tight"
            style={{ color: `${accent}99` }}
          >
            It gets built.
          </p>
        </div>
      );
    case "collection":
      return (
        <div className="flex flex-wrap gap-1.5 justify-center max-w-[140px]">
          {featured.map((p) => (
            <div
              key={p.slug}
              className="w-2.5 h-2.5 rounded-full transition-transform duration-500 hover:scale-150"
              style={{ backgroundColor: `${p.accentColor}70` }}
            />
          ))}
        </div>
      );
    case "capabilities":
      return (
        <div className="grid grid-cols-3 gap-2.5">
          {FEATURES.map((f) => (
            <f.icon
              key={f.title}
              className="w-3.5 h-3.5"
              style={{ color: `${f.color}50` }}
            />
          ))}
        </div>
      );
    case "pipeline":
      return (
        <div className="flex items-center gap-1">
          {PIPELINE_STAGES.map((_, i) => (
            <div key={i} className="flex items-center">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: accent,
                  opacity: 0.2 + i * 0.15,
                }}
              />
              {i < 4 && <div className="w-3 md:w-5 h-px bg-white/8" />}
            </div>
          ))}
        </div>
      );
    case "membership":
      return (
        <div className="flex items-baseline gap-2.5 select-none">
          <span className="text-lg font-extralight text-white/30">$0</span>
          <span className="text-[10px] text-white/10 font-light">/</span>
          <span
            className="text-lg font-extralight"
            style={{ color: `${accent}80` }}
          >
            $49
          </span>
        </div>
      );
    case "connect":
      return <Sparkles className="w-5 h-5 text-white/15" />;
  }
}

// ── Panel Content Router ────────────────────────────────────────

function PanelContent({
  id,
  onNavigate,
}: {
  id: PanelId;
  onNavigate: (id: PanelId) => void;
}) {
  switch (id) {
    case "build":
      return <BuildPanel onNavigate={onNavigate} />;
    case "collection":
      return <CollectionPanel />;
    case "capabilities":
      return <CapabilitiesPanel />;
    case "pipeline":
      return <PipelinePanel />;
    case "membership":
      return <MembershipPanel onNavigate={onNavigate} />;
    case "connect":
      return <ConnectPanel />;
  }
}

// ── Panel: Build ────────────────────────────────────────────────

function BuildPanel({
  onNavigate,
}: {
  onNavigate: (id: PanelId) => void;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-white/90 leading-[1.08]"
      >
        Describe it.
        <br />
        <span className="bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] bg-clip-text text-transparent">
          It gets built.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-5 md:mt-7 text-sm md:text-base text-white/35 font-light max-w-sm mx-auto leading-relaxed"
      >
        Apps. Bots. Automations. Infrastructure.
        <br className="hidden md:block" /> Just type what you want in Discord.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="mt-8 md:mt-10 flex items-center justify-center gap-3"
      >
        <button
          onClick={() => onNavigate("connect")}
          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-white text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
        >
          Join Free
        </button>
        <button
          onClick={() => onNavigate("collection")}
          className="px-6 py-2.5 rounded-lg border border-white/[0.1] text-white/50 text-sm font-light tracking-wide hover:text-white/80 hover:border-white/[0.2] transition-all"
        >
          See Projects
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.5 }}
        className="mt-12 md:mt-16 flex items-center justify-center gap-8 md:gap-14"
      >
        {[
          { value: "50+", label: "Projects" },
          { value: "5+", label: "Models" },
          { value: "24/7", label: "Uptime" },
          { value: "112K+", label: "Turns" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-base md:text-lg font-light text-white/60">
              {stat.value}
            </div>
            <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/20 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Panel: Collection ───────────────────────────────────────────

function CollectionPanel() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-baseline justify-between mb-5 md:mb-6">
        <h2 className="text-xl md:text-2xl font-extralight text-white/75 tracking-wide">
          Collection
        </h2>
        <Link
          href="/projects"
          className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/25 hover:text-white/50 transition-colors flex items-center gap-1"
        >
          View all <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
        {featured.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i, duration: 0.4 }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="block rounded-lg border border-white/[0.05] bg-white/[0.015] p-3.5 md:p-4 hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-300 group h-full"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: project.accentColor }}
                />
                <span className="text-xs md:text-sm font-medium text-white/75 truncate group-hover:text-white/95 transition-colors">
                  {project.name}
                </span>
              </div>
              <p className="text-[10px] md:text-[11px] text-white/25 line-clamp-2 leading-relaxed">
                {project.tagline}
              </p>
              <div className="mt-2.5">
                <span className="text-[8px] font-mono tracking-[0.1em] uppercase text-white/15 px-1.5 py-0.5 rounded border border-white/[0.05]">
                  {project.maturity}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Panel: Capabilities ─────────────────────────────────────────

function CapabilitiesPanel() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl font-extralight text-white/75 tracking-wide mb-6 md:mb-8 text-center">
        Capabilities
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
            className="rounded-lg border border-white/[0.05] bg-white/[0.012] p-4 md:p-5"
          >
            <feature.icon
              className="w-4.5 h-4.5 md:w-5 md:h-5 mb-2.5"
              style={{ color: feature.color }}
            />
            <h3 className="text-xs md:text-sm font-medium text-white/75 mb-1">
              {feature.title}
            </h3>
            <p className="text-[10px] md:text-[11px] text-white/25 leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Panel: Pipeline ─────────────────────────────────────────────

function PipelinePanel() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl md:text-2xl font-extralight text-white/75 tracking-wide mb-8 md:mb-12 text-center">
        Pipeline
      </h2>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-0">
        {PIPELINE_STAGES.map((stage, i) => (
          <motion.div
            key={stage.num}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.5 }}
            className="flex md:flex-col items-center gap-3 md:gap-2 flex-1 md:text-center relative"
          >
            {/* Connector line */}
            {i < PIPELINE_STAGES.length - 1 && (
              <div className="hidden md:block absolute top-4 left-[55%] right-[-45%] h-px bg-gradient-to-r from-white/8 to-white/3" />
            )}

            <div className="w-8 h-8 rounded-full border border-white/[0.1] bg-white/[0.02] flex items-center justify-center relative z-10 shrink-0">
              <span className="text-[9px] font-mono text-white/40">
                {stage.num}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white/65">
                {stage.title}
              </h3>
              <p className="text-[10px] text-white/20 mt-0.5 md:max-w-[100px]">
                {stage.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Panel: Membership ───────────────────────────────────────────

function MembershipPanel({
  onNavigate,
}: {
  onNavigate: (id: PanelId) => void;
}) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-xl md:text-2xl font-extralight text-white/75 tracking-wide mb-6 md:mb-8 text-center">
        Membership
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {/* Free */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-xl border border-white/[0.05] bg-white/[0.012] p-5 md:p-6"
        >
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/25 mb-2">
            Free
          </div>
          <div className="text-3xl md:text-4xl font-extralight text-white/60 mb-5">
            $0
            <span className="text-xs text-white/20 ml-1 font-normal">
              /forever
            </span>
          </div>
          <ul className="space-y-2 mb-5">
            {[
              "10 tasks / month",
              "Single model",
              "Community support",
              "Gallery eligibility",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[11px] text-white/35"
              >
                <Check className="w-3 h-3 text-white/15 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => onNavigate("connect")}
            className="w-full py-2 rounded-lg border border-white/[0.1] text-white/45 text-sm font-light hover:text-white/70 hover:border-white/[0.2] transition-all"
          >
            Join Free
          </button>
        </motion.div>

        {/* Pro */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="rounded-xl border border-[#00d4ff]/25 bg-[#00d4ff]/[0.02] p-5 md:p-6 relative"
        >
          <div className="absolute top-3 right-3 text-[8px] font-mono tracking-[0.15em] uppercase px-2 py-0.5 rounded-full bg-[#00d4ff]/8 text-[#00d4ff]/50 border border-[#00d4ff]/15">
            Full Access
          </div>
          <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#00d4ff]/40 mb-2">
            Pro
          </div>
          <div className="text-3xl md:text-4xl font-extralight text-white/85 mb-5">
            $49
            <span className="text-xs text-white/25 ml-1 font-normal">
              /mo
            </span>
          </div>
          <ul className="space-y-2 mb-5">
            {[
              "Unlimited tasks",
              "Multi-model routing",
              "Priority execution",
              "Dedicated threads",
              "Direct support",
              "Early access",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[11px] text-white/45"
              >
                <Check className="w-3 h-3 text-[#00d4ff]/40 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => onNavigate("connect")}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Go Pro
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// ── Panel: Connect ──────────────────────────────────────────────

function ConnectPanel() {
  const [formState, setFormState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, source: "immersive" }),
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-sm mx-auto"
      >
        <div className="w-11 h-11 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center mx-auto mb-4">
          <Check className="w-5 h-5 text-[#10b981]" />
        </div>
        <h3 className="text-lg font-light text-white/75 mb-1.5">Welcome</h3>
        <p className="text-xs text-white/35 mb-5">
          You&apos;re in. Join the community on Discord.
        </p>
        <a
          href="https://discord.gg/diomande"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#5865F2]/15 border border-[#5865F2]/25 text-[#5865F2]/80 text-sm hover:bg-[#5865F2]/25 transition-colors"
        >
          Discord <ExternalLink className="w-3 h-3" />
        </a>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl md:text-2xl font-extralight text-white/75 tracking-wide mb-1.5 text-center">
        Connect
      </h2>
      <p className="text-[11px] text-white/25 text-center mb-6 md:mb-8">
        Tell us what you want to build
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-2.5">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="px-3 py-2.5 rounded-lg bg-white/[0.025] border border-white/[0.07] text-sm text-white/75 placeholder-white/15 focus:outline-none focus:border-white/[0.18] transition-colors"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-3 py-2.5 rounded-lg bg-white/[0.025] border border-white/[0.07] text-sm text-white/75 placeholder-white/15 focus:outline-none focus:border-white/[0.18] transition-colors"
          />
        </div>
        <textarea
          placeholder="What do you want to build?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg bg-white/[0.025] border border-white/[0.07] text-sm text-white/75 placeholder-white/15 focus:outline-none focus:border-white/[0.18] transition-colors resize-none"
        />
        <button
          type="submit"
          disabled={formState === "loading"}
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {formState === "loading" ? "Joining..." : "Join the Community"}
        </button>
        {formState === "error" && (
          <p className="text-[11px] text-red-400/50 text-center">
            Something went wrong. Try again.
          </p>
        )}
      </form>

      <div className="mt-5 text-center">
        <a
          href="https://discord.gg/diomande"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-white/20 hover:text-white/40 transition-colors inline-flex items-center gap-1"
        >
          Or join Discord directly <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
