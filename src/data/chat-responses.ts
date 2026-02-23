import { projects } from "./projects";

export interface ChatPattern {
  pattern: RegExp;
  handler: (match: RegExpMatchArray) => ChatResponse;
}

export interface ChatResponse {
  text: string;
  projects?: string[]; // slugs to link
}

const projectCount = projects.length;
const productionCount = projects.filter((p) => p.maturity === "production").length;
const allTech = [...new Set(projects.flatMap((p) => p.tech))];

function findByTech(tech: string): typeof projects {
  const lower = tech.toLowerCase();
  return projects.filter((p) =>
    p.tech.some((t) => t.toLowerCase().includes(lower))
  );
}

function findByTag(tag: string): typeof projects {
  const lower = tag.toLowerCase();
  return projects.filter((p) =>
    p.tags.some((t) => t.toLowerCase().includes(lower))
  );
}

function findByCategory(cat: string): typeof projects {
  const lower = cat.toLowerCase();
  return projects.filter((p) => p.category.toLowerCase().includes(lower));
}

function findByName(name: string): typeof projects {
  const lower = name.toLowerCase();
  return projects.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.slug.toLowerCase().includes(lower)
  );
}

export const chatPatterns: ChatPattern[] = [
  // Stats
  {
    pattern: /how many (projects|apps|things)/i,
    handler: () => ({
      text: `${projectCount} projects. ${productionCount} in production, the rest are MVPs or prototypes. All started as a Discord message.`,
    }),
  },
  {
    pattern: /most complex|hardest|biggest/i,
    handler: () => ({
      text: `Comp-Core. 73 components across 8 domain layers — Rust kernels, Python ML, TypeScript SDKs. It's the nervous system everything else runs on.`,
      projects: ["comp-core"],
    }),
  },
  {
    pattern: /most build hours|took the longest|longest/i,
    handler: () => {
      const sorted = [...projects]
        .filter((p) => p.buildHours !== null)
        .sort((a, b) => (b.buildHours ?? 0) - (a.buildHours ?? 0));
      const top = sorted.slice(0, 3);
      return {
        text: `Top 3 by build hours: ${top.map((p) => `${p.name} (${p.buildHours}h)`).join(", ")}. Though Comp-Core has no hours tracked — it never stops.`,
        projects: top.map((p) => p.slug),
      };
    },
  },

  // Tech lookups
  {
    pattern: /(?:show|find|list|what).{0,20}(?:rust|Rust)/i,
    handler: () => {
      const found = findByTech("Rust");
      return {
        text: found.length
          ? `${found.length} Rust project${found.length > 1 ? "s" : ""}: ${found.map((p) => p.name).join(", ")}. Rust handles the performance-critical paths — graph kernels, retrieval engines, cloud servers.`
          : `No Rust projects found. Surprising.`,
        projects: found.map((p) => p.slug),
      };
    },
  },
  {
    pattern: /(?:show|find|list|what).{0,20}(?:swift|SwiftUI|ios|iOS)/i,
    handler: () => {
      const found = findByTech("SwiftUI");
      return {
        text: `${found.length} SwiftUI apps: ${found.map((p) => p.name).join(", ")}. The Apple side of the mesh — from security cameras to idea gardens.`,
        projects: found.map((p) => p.slug),
      };
    },
  },
  {
    pattern: /(?:show|find|list|what).{0,20}(?:python|Python)/i,
    handler: () => {
      const found = findByTech("Python");
      return {
        text: `${found.length} Python projects: ${found.map((p) => p.name).join(", ")}. Python runs the AI orchestration, ML pipelines, and creative tools.`,
        projects: found.map((p) => p.slug),
      };
    },
  },
  {
    pattern: /(?:show|find|list|what).{0,20}(?:next\.?js|Next\.?js|typescript|TypeScript)/i,
    handler: () => {
      const found = [
        ...findByTech("Next.js"),
        ...findByTech("TypeScript"),
      ].filter((p, i, arr) => arr.findIndex((q) => q.slug === p.slug) === i);
      return {
        text: `${found.length} TypeScript/Next.js projects: ${found.map((p) => p.name).join(", ")}. The web layer — portals, gateways, and platforms.`,
        projects: found.map((p) => p.slug),
      };
    },
  },

  // Category lookups
  {
    pattern: /(?:show|find|list|what).{0,20}(?:infrastructure|infra)/i,
    handler: () => {
      const found = findByCategory("AI Infrastructure");
      return {
        text: `${found.length} infrastructure projects: ${found.map((p) => p.name).join(", ")}. The backbone — daemons, kernels, memory, and gateways.`,
        projects: found.map((p) => p.slug),
      };
    },
  },
  {
    pattern: /(?:show|find|list|what).{0,20}(?:creative|art|design)/i,
    handler: () => {
      const found = findByCategory("Creative Tools");
      return {
        text: `${found.length} creative tools: ${found.map((p) => p.name).join(", ")}. From audio signatures to 3D git history.`,
        projects: found.map((p) => p.slug),
      };
    },
  },
  {
    pattern: /(?:show|find|list|what).{0,20}(?:agent|multi-agent)/i,
    handler: () => {
      const found = findByCategory("Agent Systems");
      return {
        text: `${found.length} agent systems: ${found.map((p) => p.name).join(", ")}. How AIs talk to each other, think together, and make group decisions.`,
        projects: found.map((p) => p.slug),
      };
    },
  },

  // Tag lookups
  {
    pattern: /(?:show|find|list|what).{0,20}(?:n'ko|nko|manding)/i,
    handler: () => {
      const found = findByTag("N'Ko");
      return {
        text: `${found.length} N'Ko/Manding projects: ${found.map((p) => p.name).join(", ")}. Language preservation for 40M+ speakers across West Africa.`,
        projects: found.map((p) => p.slug),
      };
    },
  },
  {
    pattern: /(?:show|find|list|what).{0,20}(?:voice|speech)/i,
    handler: () => {
      const found = [...findByTag("Voice"), ...findByCategory("Voice & Media")].filter(
        (p, i, arr) => arr.findIndex((q) => q.slug === p.slug) === i
      );
      return {
        text: `${found.length} voice/media projects: ${found.map((p) => p.name).join(", ")}. Voice is a first-class input — from Apple Watch to Discord.`,
        projects: found.map((p) => p.slug),
      };
    },
  },

  // Connections / relationships
  {
    pattern: /connect|relate|link|between|shared/i,
    handler: (match) => {
      const input = match.input ?? "";
      const names = projects.filter(
        (p) =>
          input.toLowerCase().includes(p.name.toLowerCase()) ||
          input.toLowerCase().includes(p.slug.toLowerCase())
      );
      if (names.length >= 2) {
        const [a, b] = names;
        const sharedTech = a.tech.filter((t) => b.tech.includes(t));
        const sharedTags = a.tags.filter((t) => b.tags.includes(t));
        const shared = [...sharedTech, ...sharedTags];
        return {
          text: shared.length
            ? `${a.name} and ${b.name} share: ${shared.join(", ")}. Check the Interconnection Map for the full web.`
            : `${a.name} and ${b.name} don't share tech or tags directly, but they're both part of the same mesh ecosystem.`,
          projects: [a.slug, b.slug],
        };
      }
      return {
        text: `Every project connects through shared tech and tags. Check the Interconnection Map on the projects page — it shows the full web of relationships.`,
      };
    },
  },

  // Mesh / how it works
  {
    pattern: /how.{0,10}(?:mesh|system|infrastructure|work)/i,
    handler: () => ({
      text: `The mesh is 5 devices (3 Macs, a VM cluster, a laptop) connected via Tailscale. Discord message comes in, gets classified, routed to the best device, matched with the right AI model (Claude, Gemini, or Codex), then executed. Tasks can decompose into subtasks that run in parallel across devices.`,
      projects: ["clawbot-daemon", "cc-discord-gateway", "comp-core"],
    }),
  },

  // Identity / meta
  {
    pattern: /who.{0,10}(?:built|made|created|are you|is mo)/i,
    handler: () => ({
      text: `Mo (Mohamed Diomande) builds everything with the mesh. I'm Claw — the bot that runs inside it. Mo describes what he wants, the mesh figures out how to build it. ${projectCount} projects so far, no signs of slowing down.`,
    }),
  },
  {
    pattern: /what.{0,10}(?:are you|is this|is claw)/i,
    handler: () => ({
      text: `I'm Claw. The AI mesh assistant that powers this whole operation. I route tasks, pick models, decompose work, and ship code. This site showcases what I've helped build — ${projectCount} projects and counting.`,
    }),
  },

  // Featured / best
  {
    pattern: /featured|best|top|favorite|coolest/i,
    handler: () => {
      const feat = projects.filter((p) => p.featured);
      return {
        text: `${feat.length} featured projects: ${feat.map((p) => p.name).join(", ")}. Each one started as a single Discord message.`,
        projects: feat.map((p) => p.slug),
      };
    },
  },

  // Production
  {
    pattern: /production|shipped|live|deployed/i,
    handler: () => {
      const prod = projects.filter((p) => p.maturity === "production");
      return {
        text: `${prod.length} in production: ${prod.map((p) => p.name).join(", ")}. Running, deployed, being used.`,
        projects: prod.map((p) => p.slug),
      };
    },
  },

  // Technologies list
  {
    pattern: /what tech|technologies|stack|tools/i,
    handler: () => ({
      text: `${allTech.length}+ technologies across the mesh. The heavy hitters: SwiftUI, Rust, Python, TypeScript, Next.js, Supabase, PostgreSQL. Plus specialized tools like MediaPipe, PyTorch, Three.js, discord.js, Ollama.`,
    }),
  },
];

export const suggestedQuestions = [
  "What's the most complex project?",
  "Show me the Rust projects",
  "How does the mesh work?",
  "What connects SpeakFlow to N'Ko?",
  "What was built with SwiftUI?",
];
