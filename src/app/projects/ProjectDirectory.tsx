"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Filter } from "lucide-react";
import { Badge } from "@/components/shared/Badge";

interface Project {
  name: string;
  description: string;
  category: string;
  tags: string[];
  tech: string[];
  buildHours: number | null;
  maturity: "production" | "mvp" | "prototype";
}

const categories = [
  "All",
  "iOS & macOS Apps",
  "Web Platforms",
  "AI Infrastructure",
  "Creative Tools",
  "Developer Tools",
  "Voice & Media",
  "Language & Culture",
  "Agent Systems",
  "Research",
];

const projects: Project[] = [
  // iOS & macOS Apps
  {
    name: "SecuriClaw",
    description:
      "AI security camera with face recognition, pose detection, and live MJPEG streaming from a spare iPhone",
    category: "iOS & macOS Apps",
    tags: ["Vision", "Security", "MediaPipe"],
    tech: ["SwiftUI", "iOS"],
    buildHours: 48,
    maturity: "mvp",
  },
  {
    name: "SpeakFlow",
    description:
      "Voice OS for macOS and iOS. Streaming speech-to-text with system-wide text injection and N'Ko support",
    category: "iOS & macOS Apps",
    tags: ["Voice", "Accessibility"],
    tech: ["SwiftUI", "AVFoundation"],
    buildHours: 36,
    maturity: "mvp",
  },
  {
    name: "VisionClaw",
    description:
      "Real-time AI assistant for Meta Ray-Ban smart glasses. Voice + vision conversation with tool integration",
    category: "iOS & macOS Apps",
    tags: ["Wearable", "Gemini", "AR"],
    tech: ["SwiftUI", "WebSocket"],
    buildHours: 32,
    maturity: "production",
  },
  {
    name: "Spore",
    description:
      "Gamified idea management — plant thoughts, watch them grow with 3D visualization, evolution engine, and widgets",
    category: "iOS & macOS Apps",
    tags: ["Creativity", "3D", "Gamification"],
    tech: ["SwiftUI", "SpriteKit", "WidgetKit"],
    buildHours: 32,
    maturity: "production",
  },
  {
    name: "BWB Suite",
    description:
      "Multi-app ecosystem for a wine bar: POS, kiosk, and customer apps with voice NLU ordering",
    category: "iOS & macOS Apps",
    tags: ["Commerce", "Voice", "POS"],
    tech: ["SwiftUI", "SwiftData", "Supabase"],
    buildHours: 60,
    maturity: "production",
  },
  {
    name: "Creative Director",
    description:
      "AI content creation and publishing platform with batch pipeline, Shopify integration, and AI image gen",
    category: "iOS & macOS Apps",
    tags: ["Content", "Shopify", "AI"],
    tech: ["SwiftUI", "Supabase"],
    buildHours: 40,
    maturity: "mvp",
  },
  {
    name: "LifeOS",
    description:
      "Voice-first life management from Apple Watch. Health tracking, Clawdbot integration, Siri shortcuts",
    category: "iOS & macOS Apps",
    tags: ["Health", "watchOS", "Voice"],
    tech: ["SwiftUI", "HealthKit", "WatchConnectivity"],
    buildHours: 28,
    maturity: "mvp",
  },
  {
    name: "AgentCommandCenter",
    description:
      "Mission control for autonomous AI agents. Fleet status, parallel streams, cost tracking, channel matrix",
    category: "iOS & macOS Apps",
    tags: ["Dashboard", "Agents", "TCA"],
    tech: ["SwiftUI", "Supabase", "WebSocket"],
    buildHours: 36,
    maturity: "mvp",
  },
  {
    name: "Serenity Soother",
    description:
      "Therapeutic relaxation app with adaptive soundscapes and guided breathing sessions",
    category: "iOS & macOS Apps",
    tags: ["Wellness", "Audio"],
    tech: ["SwiftUI"],
    buildHours: 20,
    maturity: "mvp",
  },
  {
    name: "Aura",
    description:
      "iOS app with multiple completion phases — from concept to polished experience",
    category: "iOS & macOS Apps",
    tags: ["iOS"],
    tech: ["SwiftUI"],
    buildHours: 24,
    maturity: "mvp",
  },

  // Web Platforms
  {
    name: "LinkIt",
    description:
      "Link-in-bio SaaS with glassmorphism design system (GSAPGlass), deep analytics, and custom domains",
    category: "Web Platforms",
    tags: ["SaaS", "Analytics", "GSAP"],
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    buildHours: 22,
    maturity: "mvp",
  },
  {
    name: "QR Dynamic",
    description:
      "Dynamic QR code generation and management with analytics tracking and content updates",
    category: "Web Platforms",
    tags: ["QR", "Analytics"],
    tech: ["Next.js", "TypeScript", "Supabase"],
    buildHours: 16,
    maturity: "prototype",
  },
  {
    name: "Compass",
    description:
      "Agent stack dashboard — single pane of glass for 50+ repos, 136 skills, 23 pipelines with force graph",
    category: "Web Platforms",
    tags: ["Dashboard", "D3", "Visualization"],
    tech: ["Next.js", "React", "react-force-graph"],
    buildHours: 28,
    maturity: "mvp",
  },
  {
    name: "Milkmen Delivery",
    description:
      "Plant-based milk delivery service platform with route optimization and customer management",
    category: "Web Platforms",
    tags: ["Commerce", "Delivery"],
    tech: ["React", "Vite", "Supabase"],
    buildHours: 24,
    maturity: "mvp",
  },
  {
    name: "Meaning Full Power",
    description:
      "Platform for meaningful content and personal power analysis with mobile-first design",
    category: "Web Platforms",
    tags: ["Content", "Mobile"],
    tech: ["React", "Expo", "Supabase"],
    buildHours: 20,
    maturity: "mvp",
  },
  {
    name: "granddiomande.com",
    description: "Personal portfolio and brand website",
    category: "Web Platforms",
    tags: ["Portfolio"],
    tech: ["Next.js"],
    buildHours: 12,
    maturity: "production",
  },

  // AI Infrastructure
  {
    name: "Comp-Core",
    description:
      "73-component motion intelligence ecosystem. Rust kernels, Python ML, TypeScript SDKs across 8 domain layers",
    category: "AI Infrastructure",
    tags: ["Monorepo", "Mesh", "Multi-language"],
    tech: ["Rust", "Python", "TypeScript"],
    buildHours: null,
    maturity: "production",
  },
  {
    name: "RAG++",
    description:
      "High-performance retrieval with HNSW search, CognitiveTwin integration, dual-plane retrieval",
    category: "AI Infrastructure",
    tags: ["RAG", "Search", "HNSW"],
    tech: ["Python", "FastAPI", "Rust (PyO3)"],
    buildHours: 40,
    maturity: "production",
  },
  {
    name: "Graph Kernel",
    description:
      "Deterministic context slicing for conversation DAGs. Policy-based admissibility, HMAC tokens",
    category: "AI Infrastructure",
    tags: ["Context", "DAG", "Admissibility"],
    tech: ["Rust", "Axum", "PostgreSQL"],
    buildHours: 50,
    maturity: "production",
  },
  {
    name: "Orbit Server",
    description:
      "Cross-session memory tracking and project intelligence. Cloud-deployed on GCP",
    category: "AI Infrastructure",
    tags: ["Memory", "Cloud"],
    tech: ["Rust", "Axum", "GCP Cloud Run"],
    buildHours: 30,
    maturity: "production",
  },
  {
    name: "Clawbot Daemon",
    description:
      "Mesh task executor on 5 devices. 3-model fallback (Claude → Gemini → Codex), streaming, team decomposition",
    category: "AI Infrastructure",
    tags: ["Mesh", "Multi-model", "Daemon"],
    tech: ["Python", "Supabase"],
    buildHours: 40,
    maturity: "production",
  },
  {
    name: "CC Discord Gateway",
    description:
      "Discord bot serving multiple servers. Thread-per-task architecture, team decomposition, progress streaming",
    category: "AI Infrastructure",
    tags: ["Discord", "Gateway", "Threads"],
    tech: ["TypeScript", "discord.js", "Supabase"],
    buildHours: 30,
    maturity: "production",
  },
  {
    name: "Unified Memory",
    description:
      "Cross-platform AI context system with full-text search, AES-256-GCM encryption, vector clock sync",
    category: "AI Infrastructure",
    tags: ["Memory", "Encryption", "Sync"],
    tech: ["Node.js", "SQLite", "React Native"],
    buildHours: 24,
    maturity: "mvp",
  },
  {
    name: "Cog-RLM",
    description:
      "Personal AI with stock 3B model. Zero training, zero cloud costs. Knowledge graph + local LLM",
    category: "AI Infrastructure",
    tags: ["Local AI", "Knowledge Graph"],
    tech: ["Python", "Ollama"],
    buildHours: 16,
    maturity: "prototype",
  },

  // Creative Tools
  {
    name: "Sound Sigils",
    description:
      "Generate unique audio signatures from concepts. Pure Python stdlib, 44.1kHz WAV, 112 tests passing",
    category: "Creative Tools",
    tags: ["Audio", "Generative", "Zero-deps"],
    tech: ["Python"],
    buildHours: 24,
    maturity: "mvp",
  },
  {
    name: "Aesthetic DNA",
    description:
      "Extract the visual genome from any design — chromatic, structural, textural, typographic, motion strands",
    category: "Creative Tools",
    tags: ["Design", "Generative", "CSS"],
    tech: ["JavaScript", "CSS"],
    buildHours: 14,
    maturity: "prototype",
  },
  {
    name: "Dream Weaver Engine",
    description:
      "Autonomous idea incubation via GitHub Actions. Dreams evolve through SEED → GERMINATING → BLOOM stages",
    category: "Creative Tools",
    tags: ["Automation", "Dreams", "Cron"],
    tech: ["Python", "GitHub Actions", "Discord"],
    buildHours: 20,
    maturity: "production",
  },
  {
    name: "Evoflow",
    description:
      "300+ creativity frameworks with 54 TIE techniques. Generation, refinement, and distribution phases",
    category: "Creative Tools",
    tags: ["Frameworks", "TIE", "Evolution"],
    tech: ["Python", "MCP Server"],
    buildHours: null,
    maturity: "production",
  },
  {
    name: "Content Pipeline",
    description:
      "Automated TikTok script generation, scheduling, and cross-platform content distribution",
    category: "Creative Tools",
    tags: ["TikTok", "Automation", "Publishing"],
    tech: ["Markdown", "AI"],
    buildHours: 18,
    maturity: "mvp",
  },
  {
    name: "Spatial Git",
    description:
      "Navigate git history in 3D space. Branches as walkways, commits as glowing nodes, time travel",
    category: "Creative Tools",
    tags: ["3D", "Git", "Visualization"],
    tech: ["TypeScript", "Three.js", "Vite"],
    buildHours: 16,
    maturity: "prototype",
  },

  // Developer Tools
  {
    name: "Self-Healing Code",
    description:
      "Systems that detect, diagnose, and fix bugs autonomously. Immune memory and vulnerability scanning",
    category: "Developer Tools",
    tags: ["Auto-fix", "Immune Memory"],
    tech: ["Python", "SQLite"],
    buildHours: 20,
    maturity: "prototype",
  },
  {
    name: "Dependency Oracle",
    description:
      "Predict dependency conflicts before installation. Supports npm and PyPI, git hooks, CI integration",
    category: "Developer Tools",
    tags: ["Dependencies", "CI", "Prediction"],
    tech: ["Python"],
    buildHours: 18,
    maturity: "production",
  },
  {
    name: "Living Docs",
    description:
      "Self-updating documentation that evolves with your codebase automatically",
    category: "Developer Tools",
    tags: ["Docs", "Automation"],
    tech: ["Python"],
    buildHours: 12,
    maturity: "prototype",
  },
  {
    name: "Clarity Agent Protocol",
    description:
      "Agent-agnostic governance for AI task execution. Contract-based validation, structured rejection",
    category: "Developer Tools",
    tags: ["Governance", "Contracts"],
    tech: ["TypeScript", "JSON Schema"],
    buildHours: 16,
    maturity: "prototype",
  },

  // Voice & Media
  {
    name: "Speak",
    description:
      "Voice-powered personal assistant for macOS. Capture → transcribe → analyze with 10-layer personal chain",
    category: "Voice & Media",
    tags: ["Voice", "Whisper", "Knowledge"],
    tech: ["Python", "OpenAI Whisper"],
    buildHours: 30,
    maturity: "production",
  },
  {
    name: "AI Orchestra",
    description:
      "Voice-controlled multi-agent coordination. Dynamic teams, streaming, emotion detection, tool registry",
    category: "Voice & Media",
    tags: ["Voice", "Multi-agent", "Streaming"],
    tech: ["Node.js", "WebSocket"],
    buildHours: 28,
    maturity: "prototype",
  },
  {
    name: "Motion to Music Live",
    description:
      "Real-time motion capture to music generation. Move your body, create sound",
    category: "Voice & Media",
    tags: ["Motion", "Music", "Real-time"],
    tech: ["Python"],
    buildHours: 16,
    maturity: "prototype",
  },
  {
    name: "Kinetic Theater",
    description:
      "Motion visualization engine with phrase intelligence, memory replay, and device choreography",
    category: "Voice & Media",
    tags: ["Motion", "Visualization", "Tauri"],
    tech: ["React", "Framer Motion", "Tauri"],
    buildHours: 24,
    maturity: "mvp",
  },

  // Language & Culture
  {
    name: "Cross-Script Bridge",
    description:
      "Real-time N'Ko ↔ Arabic ↔ Latin transliteration. PWA, browser extension, iOS keyboard, Telegram bot",
    category: "Language & Culture",
    tags: ["N'Ko", "Transliteration", "PWA"],
    tech: ["TypeScript", "Flask", "WebSocket"],
    buildHours: 44,
    maturity: "production",
  },
  {
    name: "N'Ko (PyPI Package)",
    description:
      "Full N'Ko language toolkit for Manding languages (40M+ speakers). Phonetics, morphology, proverbs",
    category: "Language & Culture",
    tags: ["N'Ko", "PyPI", "NLP"],
    tech: ["Python"],
    buildHours: 20,
    maturity: "production",
  },
  {
    name: "N'Ko Keyboard AI",
    description:
      "Intelligent predictive text for Manding languages using N'Ko script with neural models",
    category: "Language & Culture",
    tags: ["N'Ko", "Predictive", "NLP"],
    tech: ["Python", "PyTorch"],
    buildHours: 16,
    maturity: "prototype",
  },
  {
    name: "LearnN'Ko",
    description: "Interactive N'Ko learning platform for script acquisition",
    category: "Language & Culture",
    tags: ["N'Ko", "Education"],
    tech: ["Next.js"],
    buildHours: 14,
    maturity: "prototype",
  },

  // Agent Systems
  {
    name: "Emergent Protocols",
    description:
      "AI-to-AI communication standards that emerge organically. Neuroplasticity, diplomacy, governance",
    category: "Agent Systems",
    tags: ["Protocols", "Emergence", "AI-to-AI"],
    tech: ["Python"],
    buildHours: 18,
    maturity: "prototype",
  },
  {
    name: "Thought Mesh",
    description:
      "Physics-inspired distributed thinking network. Attention flow, dialectic, entanglement, gravity",
    category: "Agent Systems",
    tags: ["Physics", "Distributed", "Thinking"],
    tech: ["Python", "SQLite"],
    buildHours: 16,
    maturity: "prototype",
  },
  {
    name: "Swarm Consensus",
    description:
      "Distributed decision-making across agent swarms using collective intelligence",
    category: "Agent Systems",
    tags: ["Swarm", "Consensus", "Distributed"],
    tech: ["Python"],
    buildHours: 12,
    maturity: "prototype",
  },
  {
    name: "Context Handshake",
    description:
      "Seamless context transfer between agents — no lost context, no re-explaining",
    category: "Agent Systems",
    tags: ["Context", "Transfer"],
    tech: ["Python"],
    buildHours: 10,
    maturity: "prototype",
  },

  // Research
  {
    name: "Cognitive Twin",
    description:
      "User pattern learning with DPO training. Your AI learns how you think and adapts",
    category: "Research",
    tags: ["DPO", "Personalization"],
    tech: ["Python"],
    buildHours: 30,
    maturity: "production",
  },
  {
    name: "Knowledge Fermentation",
    description:
      "Let ideas age and evolve like fermentation. Time-based knowledge maturation",
    category: "Research",
    tags: ["Knowledge", "Time"],
    tech: ["Python"],
    buildHours: 10,
    maturity: "prototype",
  },
  {
    name: "Motion Autocomplete",
    description:
      "AI predicts your next physical movement and pre-loads context before you arrive",
    category: "Research",
    tags: ["Motion", "Prediction", "Context"],
    tech: ["Python"],
    buildHours: 14,
    maturity: "prototype",
  },
  {
    name: "Paradox Navigator",
    description:
      "Navigate and resolve logical paradoxes through multi-perspective reasoning",
    category: "Research",
    tags: ["Logic", "Reasoning"],
    tech: ["Python"],
    buildHours: 12,
    maturity: "prototype",
  },
];

const maturityColors = {
  production: { bg: "bg-[#10b981]/10", text: "text-[#10b981]", label: "Production" },
  mvp: { bg: "bg-[#f59e0b]/10", text: "text-[#f59e0b]", label: "MVP" },
  prototype: { bg: "bg-[#6b6b80]/10", text: "text-[#7a7a95]", label: "Prototype" },
};

const tagColors: Record<string, string> = {
  Vision: "#ef4444", Security: "#ef4444", Voice: "#f59e0b",
  Accessibility: "#10b981", Wearable: "#ec4899", Gemini: "#06b6d4",
  AR: "#8b5cf6", Creativity: "#f59e0b", "3D": "#8b5cf6",
  Gamification: "#ec4899", Commerce: "#f59e0b", POS: "#ef4444",
  Content: "#f59e0b", Shopify: "#10b981", AI: "#00d4ff",
  Health: "#10b981", watchOS: "#10b981", Dashboard: "#f59e0b",
  Agents: "#00d4ff", TCA: "#8b5cf6", Wellness: "#10b981",
  Audio: "#8b5cf6", iOS: "#00d4ff", SaaS: "#00d4ff",
  Analytics: "#06b6d4", GSAP: "#ec4899", QR: "#f59e0b",
  D3: "#10b981", Visualization: "#8b5cf6", Delivery: "#f59e0b",
  Mobile: "#00d4ff", Portfolio: "#8b5cf6", Monorepo: "#ef4444",
  Mesh: "#00d4ff", "Multi-language": "#8b5cf6", RAG: "#10b981",
  Search: "#06b6d4", HNSW: "#ec4899", Context: "#f59e0b",
  DAG: "#8b5cf6", Admissibility: "#ef4444", Memory: "#8b5cf6",
  Cloud: "#06b6d4", "Multi-model": "#00d4ff", Daemon: "#ef4444",
  Discord: "#5865F2", Gateway: "#06b6d4", Threads: "#f59e0b",
  Encryption: "#ef4444", Sync: "#10b981", "Local AI": "#8b5cf6",
  "Knowledge Graph": "#10b981", Generative: "#ec4899", "Zero-deps": "#10b981",
  Design: "#ec4899", CSS: "#06b6d4", Automation: "#06b6d4",
  Dreams: "#8b5cf6", Cron: "#f59e0b", Frameworks: "#00d4ff",
  TIE: "#ec4899", Evolution: "#8b5cf6", TikTok: "#ef4444",
  Publishing: "#10b981", Git: "#f59e0b", "Auto-fix": "#10b981",
  "Immune Memory": "#8b5cf6", Dependencies: "#f59e0b", CI: "#06b6d4",
  Prediction: "#ec4899", Docs: "#06b6d4", Governance: "#ef4444",
  Contracts: "#f59e0b", Whisper: "#f59e0b", Knowledge: "#10b981",
  "Multi-agent": "#00d4ff", Streaming: "#06b6d4", Music: "#ec4899",
  "Real-time": "#ef4444", Motion: "#8b5cf6", Tauri: "#f59e0b",
  "N'Ko": "#f59e0b", Transliteration: "#8b5cf6", PWA: "#f59e0b",
  PyPI: "#10b981", NLP: "#06b6d4", Predictive: "#ec4899",
  Education: "#10b981", Protocols: "#00d4ff", Emergence: "#8b5cf6",
  "AI-to-AI": "#ef4444", Physics: "#06b6d4", Distributed: "#00d4ff",
  Thinking: "#8b5cf6", Swarm: "#f59e0b", Consensus: "#10b981",
  Transfer: "#06b6d4", DPO: "#ec4899", Personalization: "#f59e0b",
  Time: "#8b5cf6", Logic: "#06b6d4", Reasoning: "#10b981",
};

export function ProjectDirectory() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const counts = categories.map((cat) => ({
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
        {filtered.map((project, i) => {
          const mat = maturityColors[project.maturity];
          return (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="glass-card p-5 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {project.name}
                  </h3>
                  <span className="text-[10px] text-[#7a7a95]">
                    {project.category}
                  </span>
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
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${mat.bg} ${mat.text} font-medium`}
                  >
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
                {project.tech.map((t) => (
                  <Badge key={t} variant="default" className="text-[10px] py-0 px-2">
                    {t}
                  </Badge>
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
            </motion.div>
          );
        })}
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
