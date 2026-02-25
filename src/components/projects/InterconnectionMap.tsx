"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { projects, categories } from "@/data/projects";
import { computeEdges, computeLayout, type GraphNode, type GraphEdge } from "@/lib/project-graph";
import { GraphNodeComponent } from "./graph/GraphNode";
import { GraphEdgeComponent } from "./graph/GraphEdge";
import { GraphLegend } from "./graph/GraphLegend";
import { GraphControls } from "./graph/GraphControls";
import { useProjectFocus, useSetProjectFocus } from "@/context/ProjectFocusContext";

const WIDTH = 900;
const HEIGHT = 600;

// Mobile category cluster view
function CategoryClusterView() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof projects>();
    for (const cat of categories) {
      map.set(cat, projects.filter((p) => p.category === cat));
    }
    return map;
  }, []);

  return (
    <div className="space-y-3">
      {categories.map((cat) => {
        const catProjects = grouped.get(cat) ?? [];
        const isOpen = expanded === cat;
        return (
          <div key={cat}>
            <button
              onClick={() => setExpanded(isOpen ? null : cat)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] transition-colors cursor-pointer"
            >
              <span className="text-sm font-medium text-white">{cat}</span>
              <span className="text-xs text-[#6b6b80]">{catProjects.length} projects</span>
            </button>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-1 space-y-1 pl-2"
              >
                {catProjects.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => router.push(`/projects/${p.slug}`)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#c0c0d8] hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
                  >
                    {p.name}
                    <span className="ml-2 text-xs text-[#6b6b80]">{p.maturity}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function InterconnectionMap() {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<GraphEdge | null>(null);
  const [zoom, setZoom] = useState(1);
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    () => new Set(categories)
  );

  const { focusedProject } = useProjectFocus();
  const { setFocus, clearFocus } = useSetProjectFocus();

  const edges = useMemo(() => computeEdges(projects), []);
  const nodes = useMemo(() => computeLayout(projects, edges, WIDTH, HEIGHT), [edges]);

  const nodeMap = useMemo(() => {
    const m = new Map<string, GraphNode>();
    for (const n of nodes) m.set(n.slug, n);
    return m;
  }, [nodes]);

  // Adjacency for highlight
  const adjacency = useMemo(() => {
    const adj = new Map<string, Set<string>>();
    for (const e of edges) {
      if (!adj.has(e.source)) adj.set(e.source, new Set());
      if (!adj.has(e.target)) adj.set(e.target, new Set());
      adj.get(e.source)!.add(e.target);
      adj.get(e.target)!.add(e.source);
    }
    return adj;
  }, [edges]);

  const handleCategoryToggle = useCallback((cat: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  // Merge local hover with cross-feature focus
  const effectiveHover = hoveredNode ?? focusedProject;

  const connectedToHovered = useMemo(() => {
    if (!effectiveHover) return new Set<string>();
    return adjacency.get(effectiveHover) ?? new Set<string>();
  }, [effectiveHover, adjacency]);

  const isNodeHighlighted = (slug: string) =>
    slug === effectiveHover || connectedToHovered.has(slug);

  const isNodeDimmed = (slug: string) =>
    !activeCategories.has(nodeMap.get(slug)?.category ?? "") ||
    (effectiveHover !== null && !isNodeHighlighted(slug));

  const isEdgeHighlighted = (edge: GraphEdge) =>
    edge === hoveredEdge ||
    edge.source === effectiveHover ||
    edge.target === effectiveHover;

  const isEdgeDimmed = (edge: GraphEdge) => {
    const srcCat = nodeMap.get(edge.source)?.category ?? "";
    const tgtCat = nodeMap.get(edge.target)?.category ?? "";
    return (
      !activeCategories.has(srcCat) ||
      !activeCategories.has(tgtCat) ||
      (effectiveHover !== null && !isEdgeHighlighted(edge))
    );
  };

  // Tooltip
  const tooltip = useMemo(() => {
    if (hoveredEdge) {
      const src = nodeMap.get(hoveredEdge.source);
      const tgt = nodeMap.get(hoveredEdge.target);
      if (!src || !tgt) return null;
      return {
        x: (src.x + tgt.x) / 2,
        y: (src.y + tgt.y) / 2,
        text: `${src.name} + ${tgt.name}: ${hoveredEdge.sharedItems.join(", ")}`,
      };
    }
    if (effectiveHover) {
      const node = nodeMap.get(effectiveHover);
      if (!node) return null;
      const connections = adjacency.get(effectiveHover)?.size ?? 0;
      return {
        x: node.x,
        y: node.y - 20,
        text: `${node.name} — ${connections} connection${connections !== 1 ? "s" : ""}`,
      };
    }
    return null;
  }, [effectiveHover, hoveredEdge, nodeMap, adjacency]);

  return (
    <div className="space-y-4">
      {/* Desktop: SVG Graph */}
      <div className="hidden md:block relative rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
        <GraphControls
          onZoomIn={() => setZoom((z) => Math.min(z + 0.2, 2.5))}
          onZoomOut={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
          onReset={() => setZoom(1)}
        />
        <div className="overflow-hidden" style={{ height: HEIGHT }}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="w-full h-full"
            style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
          >
            {/* Edges */}
            {edges.map((edge) => (
              <GraphEdgeComponent
                key={`${edge.source}-${edge.target}`}
                edge={edge}
                nodes={nodeMap}
                isHighlighted={isEdgeHighlighted(edge)}
                isDimmed={isEdgeDimmed(edge)}
                onHover={setHoveredEdge}
              />
            ))}
            {/* Nodes */}
            {nodes.map((node) => (
              <GraphNodeComponent
                key={node.slug}
                node={node}
                isHighlighted={isNodeHighlighted(node.slug)}
                isDimmed={isNodeDimmed(node.slug)}
                onHover={(slug: string | null) => {
                  setHoveredNode(slug);
                  if (slug) setFocus(slug, "map", true);
                  else clearFocus();
                }}
                onClick={(slug: string) => {
                  setFocus(slug, "map");
                  router.push(`/projects/${slug}`);
                }}
              />
            ))}
            {/* Tooltip */}
            {tooltip && (
              <g>
                <rect
                  x={tooltip.x - 100}
                  y={tooltip.y - 28}
                  width={200}
                  height={24}
                  rx={6}
                  fill="#0a0a18"
                  fillOpacity={0.95}
                  stroke="#ffffff20"
                  strokeWidth={0.5}
                />
                <text
                  x={tooltip.x}
                  y={tooltip.y - 12}
                  textAnchor="middle"
                  fill="#c0c0d8"
                  fontSize={10}
                  fontFamily="var(--font-body)"
                >
                  {tooltip.text.length > 40
                    ? tooltip.text.slice(0, 40) + "..."
                    : tooltip.text}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Mobile: Category clusters */}
      <div className="md:hidden">
        <CategoryClusterView />
      </div>

      {/* Legend (shared) */}
      <GraphLegend
        activeCategories={activeCategories}
        onToggle={handleCategoryToggle}
      />
    </div>
  );
}
