"use client";

import type { GraphEdge as GE, GraphNode } from "@/lib/project-graph";

interface GraphEdgeProps {
  edge: GE;
  nodes: Map<string, GraphNode>;
  isHighlighted: boolean;
  isDimmed: boolean;
  onHover: (edge: GE | null) => void;
}

export function GraphEdgeComponent({
  edge,
  nodes,
  isHighlighted,
  isDimmed,
  onHover,
}: GraphEdgeProps) {
  const source = nodes.get(edge.source);
  const target = nodes.get(edge.target);
  if (!source || !target) return null;

  const opacity = isDimmed ? 0.03 : isHighlighted ? 0.6 : 0.08 + edge.weight * 0.03;

  return (
    <line
      x1={source.x}
      y1={source.y}
      x2={target.x}
      y2={target.y}
      stroke={isHighlighted ? "#00d4ff" : "#ffffff"}
      strokeWidth={isHighlighted ? 1.5 : 0.5 + edge.weight * 0.2}
      opacity={opacity}
      onMouseEnter={() => onHover(edge)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: "pointer" }}
    />
  );
}
