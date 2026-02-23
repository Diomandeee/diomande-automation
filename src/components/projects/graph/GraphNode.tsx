"use client";

import { motion } from "framer-motion";
import type { GraphNode as GN } from "@/lib/project-graph";
import { categoryColors } from "@/lib/project-graph";

interface GraphNodeProps {
  node: GN;
  isHighlighted: boolean;
  isDimmed: boolean;
  onHover: (slug: string | null) => void;
  onClick: (slug: string) => void;
}

const sizeMap = { production: 12, mvp: 9, prototype: 6 } as const;

export function GraphNodeComponent({
  node,
  isHighlighted,
  isDimmed,
  onHover,
  onClick,
}: GraphNodeProps) {
  const r = sizeMap[node.maturity];
  const color = categoryColors[node.category];

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isDimmed ? 0.15 : 1,
        scale: 1,
      }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => onHover(node.slug)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(node.slug)}
      style={{ cursor: "pointer" }}
    >
      {/* Glow ring on highlight */}
      {isHighlighted && (
        <circle
          cx={node.x}
          cy={node.y}
          r={r + 6}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          opacity={0.4}
        />
      )}
      <circle
        cx={node.x}
        cy={node.y}
        r={r}
        fill={`${color}30`}
        stroke={color}
        strokeWidth={isHighlighted ? 2 : 1}
      />
      {/* Label (show on hover or for large nodes) */}
      {(isHighlighted || r >= 12) && (
        <text
          x={node.x}
          y={node.y + r + 14}
          textAnchor="middle"
          fill="#c0c0d8"
          fontSize={10}
          fontFamily="var(--font-body)"
        >
          {node.name}
        </text>
      )}
    </motion.g>
  );
}
