"use client";

import { motion } from "framer-motion";
import { meshDevices } from "@/data/theater-scenarios";

interface MeshNodesProps {
  activeDevice: string | null;
  accentColor: string;
}

// Layout positions for 5 nodes in an arc
const positions = [
  { x: 50, y: 75 },   // vm (left)
  { x: 155, y: 30 },  // mac1 (top-left)
  { x: 270, y: 20 },  // mac3 (top-center)
  { x: 385, y: 30 },  // mac4 (top-right)
  { x: 490, y: 75 },  // laptop (right)
];

export function MeshNodes({ activeDevice, accentColor }: MeshNodesProps) {
  return (
    <svg viewBox="0 0 540 110" className="w-full max-w-xl mx-auto h-auto">
      {/* Connection lines between nodes */}
      {positions.map((pos, i) =>
        positions.slice(i + 1).map((pos2, j) => (
          <line
            key={`${i}-${i + j + 1}`}
            x1={pos.x}
            y1={pos.y}
            x2={pos2.x}
            y2={pos2.y}
            stroke="#ffffff"
            strokeWidth={0.5}
            opacity={0.06}
            strokeDasharray="4 4"
          />
        ))
      )}

      {/* Animated routing line to active device */}
      {activeDevice && (() => {
        const idx = meshDevices.findIndex((d) => d.id === activeDevice);
        if (idx === -1) return null;
        const target = positions[idx];
        // Route from center-bottom
        return (
          <motion.line
            x1={270}
            y1={110}
            x2={target.x}
            y2={target.y}
            stroke={accentColor}
            strokeWidth={2}
            strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        );
      })()}

      {/* Nodes */}
      {meshDevices.map((device, i) => {
        const pos = positions[i];
        const isActive = device.id === activeDevice;
        return (
          <g key={device.id}>
            {/* Pulse ring */}
            {isActive && (
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={22}
                fill="none"
                stroke={accentColor}
                strokeWidth={1.5}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.3, 1.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            {/* Node circle */}
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={16}
              fill={isActive ? `${accentColor}30` : "#0f0f1d"}
              stroke={isActive ? accentColor : "#2a2a3a"}
              strokeWidth={isActive ? 2 : 1}
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            />
            {/* Device icon (simple text) */}
            <text
              x={pos.x}
              y={pos.y + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11}
              fill={isActive ? accentColor : "#6b6b80"}
            >
              {device.type === "vm" ? "\u2601" : device.type === "mac" ? "\u25A0" : "\u2302"}
            </text>
            {/* Label */}
            <text
              x={pos.x}
              y={pos.y + 30}
              textAnchor="middle"
              fontSize={9}
              fill={isActive ? "#c0c0d8" : "#4a4a5a"}
              fontFamily="var(--font-body)"
            >
              {device.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
