"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import { stageConfig, type Dream } from "@/data/dreams";

interface DreamConnectionGraphProps {
  dreams: Dream[];
  onSelect: (dream: Dream) => void;
}

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  dream: Dream;
}

interface Edge {
  source: string;
  target: string;
}

export function DreamConnectionGraph({
  dreams,
  onSelect,
}: DreamConnectionGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const animRef = useRef<number>(0);

  const edges = useMemo(() => {
    const e: Edge[] = [];
    const ids = new Set(dreams.map((d) => d.id));
    for (const d of dreams) {
      if (d.connections) {
        for (const c of d.connections) {
          if (ids.has(c) && d.id < c) {
            e.push({ source: d.id, target: c });
          }
        }
      }
    }
    return e;
  }, [dreams]);

  // Initialize nodes
  useEffect(() => {
    const w = 600;
    const h = 400;
    const initial = dreams.slice(0, 60).map((dream, i) => {
      const angle = (i / Math.min(dreams.length, 60)) * Math.PI * 2;
      const radius = 120 + Math.random() * 60;
      return {
        id: dream.id,
        x: w / 2 + Math.cos(angle) * radius,
        y: h / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        r: 4 + dream.strength * 12,
        dream,
      };
    });
    setNodes(initial);
  }, [dreams]);

  // Simple force simulation
  useEffect(() => {
    if (nodes.length === 0) return;

    const w = 600;
    const h = 400;
    const nodeMap = new Map<string, Node>();

    let frame = 0;
    const maxFrames = 120;

    function tick() {
      if (frame >= maxFrames) return;
      frame++;

      setNodes((prev) => {
        nodeMap.clear();
        for (const n of prev) nodeMap.set(n.id, { ...n });

        const updated = Array.from(nodeMap.values());

        // Repulsion
        for (let i = 0; i < updated.length; i++) {
          for (let j = i + 1; j < updated.length; j++) {
            const a = updated[i];
            const b = updated[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
            const force = 200 / (dist * dist);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            a.vx -= fx;
            a.vy -= fy;
            b.vx += fx;
            b.vy += fy;
          }
        }

        // Attraction along edges
        for (const edge of edges) {
          const a = nodeMap.get(edge.source);
          const b = nodeMap.get(edge.target);
          if (!a || !b) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = (dist - 80) * 0.01;
          const fx = (dx / Math.max(dist, 1)) * force;
          const fy = (dy / Math.max(dist, 1)) * force;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }

        // Center gravity
        for (const n of updated) {
          n.vx += (w / 2 - n.x) * 0.002;
          n.vy += (h / 2 - n.y) * 0.002;
          n.vx *= 0.9;
          n.vy *= 0.9;
          n.x += n.vx;
          n.y += n.vy;
          n.x = Math.max(n.r, Math.min(w - n.r, n.x));
          n.y = Math.max(n.r, Math.min(h - n.r, n.y));
        }

        return updated;
      });

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [nodes.length, edges]);

  const nodeMap = new Map<string, Node>();
  for (const n of nodes) nodeMap.set(n.id, n);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Connection Graph</h2>
      <div className="glass-card p-4 overflow-hidden">
        <svg
          ref={svgRef}
          viewBox="0 0 600 400"
          className="w-full h-auto"
          style={{ maxHeight: 400 }}
        >
          {/* Edges */}
          {edges.map((edge) => {
            const a = nodeMap.get(edge.source);
            const b = nodeMap.get(edge.target);
            if (!a || !b) return null;
            return (
              <line
                key={`${edge.source}-${edge.target}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="rgba(0,212,255,0.15)"
                strokeWidth={1}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const color =
              stageConfig[node.dream.stage]?.color || stageConfig.seed.color;
            const isHovered = hoveredId === node.id;
            return (
              <g key={node.id}>
                {isHovered && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r + 4}
                    fill="none"
                    stroke={color}
                    strokeWidth={1}
                    opacity={0.4}
                  />
                )}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill={color}
                  opacity={isHovered ? 1 : 0.7}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelect(node.dream)}
                />
                {isHovered && (
                  <text
                    x={node.x}
                    y={node.y - node.r - 6}
                    textAnchor="middle"
                    fill="white"
                    fontSize={10}
                    fontFamily="var(--font-body)"
                  >
                    {node.dream.title.slice(0, 30)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
