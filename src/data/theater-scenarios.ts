export type TaskClass = "code" | "research" | "general";
export type TheaterStage =
  | "idle"
  | "typing"
  | "classifying"
  | "routing"
  | "selecting"
  | "streaming"
  | "complete";

export interface MeshDevice {
  id: string;
  label: string;
  type: "vm" | "mac" | "laptop";
}

export const meshDevices: MeshDevice[] = [
  { id: "vm", label: "VM Cluster", type: "vm" },
  { id: "mac1", label: "Mac Mini 1", type: "mac" },
  { id: "mac3", label: "Mac Mini 3", type: "mac" },
  { id: "mac4", label: "Mac Mini 4", type: "mac" },
  { id: "laptop", label: "MacBook Pro", type: "laptop" },
];

export interface Scenario {
  prompt: string;
  classification: TaskClass;
  routedDevice: string;
  selectedModel: string;
  fallbackChain: string[];
  streamingLines: { text: string; type: "command" | "output" | "success" | "info" }[];
  resultProject?: string;
  resultSummary: string;
  stageTimings: number[]; // ms delay for each stage transition
}

export const scenarios: Scenario[] = [
  {
    prompt: "Build a REST API with auth and tests",
    classification: "code",
    routedDevice: "mac1",
    selectedModel: "Claude Opus",
    fallbackChain: ["Claude Opus", "Gemini Pro", "Codex"],
    streamingLines: [
      { text: "> Decomposing into 3 subtasks...", type: "info" },
      { text: "  [1/3] Scaffolding Express + Prisma schema", type: "output" },
      { text: "  [2/3] Implementing JWT auth middleware", type: "output" },
      { text: "  [3/3] Writing 12 integration tests", type: "output" },
      { text: "  \u2713 Subtask 1 complete [Claude] (12s)", type: "success" },
      { text: "  \u2713 Subtask 2 complete [Claude] (18s)", type: "success" },
      { text: "  \u2713 Subtask 3 complete [Gemini] (9s)", type: "success" },
      { text: "\u2713 47 files, 3 endpoints, 12 tests passing", type: "success" },
    ],
    resultSummary: "47 files generated. 3 REST endpoints with JWT auth. 12 tests all green.",
    stageTimings: [800, 600, 800, 600, 1200, 500],
  },
  {
    prompt: "Research the best vector DB for 1M docs",
    classification: "research",
    routedDevice: "vm",
    selectedModel: "Gemini Pro",
    fallbackChain: ["Gemini Pro", "Claude Opus", "Codex"],
    streamingLines: [
      { text: "> Researching vector databases...", type: "info" },
      { text: "  Analyzing: Pinecone, Weaviate, Qdrant, pgvector, Milvus", type: "output" },
      { text: "  Benchmarking: latency, cost, scale, managed vs self-hosted", type: "output" },
      { text: "  \u2713 5 databases compared across 8 dimensions", type: "success" },
      { text: "  Winner for 1M docs: Qdrant (self-hosted) or Pinecone (managed)", type: "success" },
    ],
    resultSummary: "Comparison of 5 vector DBs. Qdrant wins self-hosted, Pinecone wins managed.",
    stageTimings: [800, 700, 900, 600, 1400, 500],
  },
  {
    prompt: "Create a Discord bot for my team",
    classification: "code",
    routedDevice: "mac3",
    selectedModel: "Claude Opus",
    fallbackChain: ["Claude Opus", "Gemini Pro", "Codex"],
    streamingLines: [
      { text: "> Setting up discord.js v14 project...", type: "info" },
      { text: "  Creating command handler + event system", type: "output" },
      { text: "  Adding slash commands: /help, /status, /assign", type: "output" },
      { text: "  Configuring gateway intents and permissions", type: "output" },
      { text: "  \u2713 Bot scaffold complete with 5 commands", type: "success" },
      { text: "  \u2713 Dockerfile + deploy script included", type: "success" },
    ],
    resultProject: "cc-discord-gateway",
    resultSummary: "Discord bot with 5 slash commands, event system, and Docker deployment.",
    stageTimings: [800, 600, 800, 700, 1200, 500],
  },
  {
    prompt: "Generate a landing page for my SaaS",
    classification: "general",
    routedDevice: "mac4",
    selectedModel: "Codex",
    fallbackChain: ["Codex", "Claude Opus", "Gemini Pro"],
    streamingLines: [
      { text: "> Generating Next.js landing page...", type: "info" },
      { text: "  Hero section with gradient + CTA", type: "output" },
      { text: "  Feature grid with 6 cards", type: "output" },
      { text: "  Pricing table + FAQ accordion", type: "output" },
      { text: "  Responsive + dark mode + animations", type: "output" },
      { text: "  \u2713 Landing page complete: 4 sections, mobile-ready", type: "success" },
    ],
    resultSummary: "Full landing page: hero, features, pricing, FAQ. Responsive + animated.",
    stageTimings: [800, 500, 700, 600, 1400, 500],
  },
];

// Fuzzy match user input to nearest scenario
export function matchScenario(input: string): Scenario {
  const lower = input.toLowerCase();
  const keywords: Record<number, string[]> = {
    0: ["api", "rest", "auth", "backend", "server", "endpoint"],
    1: ["research", "vector", "database", "compare", "best", "analyze"],
    2: ["discord", "bot", "chat", "team", "slack"],
    3: ["landing", "page", "saas", "website", "frontend", "generate"],
  };

  let bestIndex = 0;
  let bestScore = 0;
  for (const [idx, words] of Object.entries(keywords)) {
    const score = words.filter((w) => lower.includes(w)).length;
    if (score > bestScore) {
      bestScore = score;
      bestIndex = parseInt(idx);
    }
  }

  return scenarios[bestIndex];
}

export const classColors: Record<TaskClass, string> = {
  code: "#00d4ff",
  research: "#8b5cf6",
  general: "#10b981",
};
