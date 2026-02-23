import type { Project, Category } from "@/data/projects";

export interface GraphNode {
  slug: string;
  name: string;
  category: Category;
  maturity: "production" | "mvp" | "prototype";
  accentColor: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
  sharedItems: string[];
}

// Category cluster positions (normalized 0-1) for initial seeding
const categorySeeds: Record<Category, { x: number; y: number }> = {
  "iOS & macOS Apps": { x: 0.2, y: 0.2 },
  "Web Platforms": { x: 0.8, y: 0.2 },
  "AI Infrastructure": { x: 0.5, y: 0.15 },
  "Creative Tools": { x: 0.15, y: 0.7 },
  "Developer Tools": { x: 0.85, y: 0.5 },
  "Voice & Media": { x: 0.3, y: 0.5 },
  "Language & Culture": { x: 0.75, y: 0.75 },
  "Agent Systems": { x: 0.5, y: 0.85 },
  Research: { x: 0.5, y: 0.55 },
};

export function computeEdges(projects: Project[]): GraphEdge[] {
  const edges: GraphEdge[] = [];
  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const a = projects[i];
      const b = projects[j];
      const sharedTech = a.tech.filter((t) => b.tech.includes(t));
      const sharedTags = a.tags.filter((t) => b.tags.includes(t));
      const shared = [...sharedTech, ...sharedTags];
      if (shared.length >= 2) {
        edges.push({
          source: a.slug,
          target: b.slug,
          weight: shared.length,
          sharedItems: shared,
        });
      }
    }
  }
  return edges;
}

export function computeLayout(
  projects: Project[],
  edges: GraphEdge[],
  width: number,
  height: number,
  iterations = 80
): GraphNode[] {
  const padding = 60;
  const w = width - padding * 2;
  const h = height - padding * 2;

  // Initialize with category-clustered positions + jitter
  const nodes: GraphNode[] = projects.map((p) => {
    const seed = categorySeeds[p.category];
    const jitterX = (Math.random() - 0.5) * 0.12;
    const jitterY = (Math.random() - 0.5) * 0.12;
    return {
      slug: p.slug,
      name: p.name,
      category: p.category,
      maturity: p.maturity,
      accentColor: p.accentColor,
      x: padding + (seed.x + jitterX) * w,
      y: padding + (seed.y + jitterY) * h,
    };
  });

  // Build adjacency lookup
  const adj = new Map<string, Set<string>>();
  const edgeWeightMap = new Map<string, number>();
  for (const e of edges) {
    if (!adj.has(e.source)) adj.set(e.source, new Set());
    if (!adj.has(e.target)) adj.set(e.target, new Set());
    adj.get(e.source)!.add(e.target);
    adj.get(e.target)!.add(e.source);
    edgeWeightMap.set(`${e.source}-${e.target}`, e.weight);
    edgeWeightMap.set(`${e.target}-${e.source}`, e.weight);
  }

  const centerX = width / 2;
  const centerY = height / 2;

  // Force simulation
  for (let iter = 0; iter < iterations; iter++) {
    const temperature = 1 - iter / iterations;
    const forces = nodes.map(() => ({ fx: 0, fy: 0 }));

    // Repulsion (inverse square)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const repulse = 800 / (dist * dist);
        const fx = (dx / dist) * repulse;
        const fy = (dy / dist) * repulse;
        forces[i].fx += fx;
        forces[i].fy += fy;
        forces[j].fx -= fx;
        forces[j].fy -= fy;
      }
    }

    // Attraction (connected nodes)
    for (let i = 0; i < nodes.length; i++) {
      const neighbors = adj.get(nodes[i].slug);
      if (!neighbors) continue;
      for (const neighborSlug of neighbors) {
        const j = nodes.findIndex((n) => n.slug === neighborSlug);
        if (j <= i) continue;
        const weight = edgeWeightMap.get(`${nodes[i].slug}-${neighborSlug}`) ?? 1;
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const attract = dist * 0.005 * weight;
        const fx = (dx / dist) * attract;
        const fy = (dy / dist) * attract;
        forces[i].fx += fx;
        forces[i].fy += fy;
        forces[j].fx -= fx;
        forces[j].fy -= fy;
      }
    }

    // Center gravity
    for (let i = 0; i < nodes.length; i++) {
      const dx = centerX - nodes[i].x;
      const dy = centerY - nodes[i].y;
      forces[i].fx += dx * 0.002;
      forces[i].fy += dy * 0.002;
    }

    // Apply forces with damping
    const damping = 0.95 * temperature;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].x += forces[i].fx * damping;
      nodes[i].y += forces[i].fy * damping;
      // Clamp to bounds
      nodes[i].x = Math.max(padding, Math.min(width - padding, nodes[i].x));
      nodes[i].y = Math.max(padding, Math.min(height - padding, nodes[i].y));
    }
  }

  return nodes;
}

export const categoryColors: Record<Category, string> = {
  "iOS & macOS Apps": "#00d4ff",
  "Web Platforms": "#8b5cf6",
  "AI Infrastructure": "#10b981",
  "Creative Tools": "#ec4899",
  "Developer Tools": "#f59e0b",
  "Voice & Media": "#06b6d4",
  "Language & Culture": "#f59e0b",
  "Agent Systems": "#ef4444",
  Research: "#8b5cf6",
};
