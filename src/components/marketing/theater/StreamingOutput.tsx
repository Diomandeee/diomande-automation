"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface StreamingLine {
  text: string;
  type: "command" | "output" | "success" | "info";
}

interface StreamingOutputProps {
  lines: StreamingLine[];
  isActive: boolean;
}

const typeColors: Record<StreamingLine["type"], string> = {
  command: "text-[#00d4ff]",
  output: "text-[#a0a0b8]",
  success: "text-[#10b981]",
  info: "text-[#6b6b80]",
};

export function StreamingOutput({ lines, isActive }: StreamingOutputProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setVisibleCount(0);
      return;
    }
    setVisibleCount(0);
    const timers: NodeJS.Timeout[] = [];
    lines.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleCount(i + 1), (i + 1) * 300)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [isActive, lines]);

  if (!isActive && visibleCount === 0) return null;

  return (
    <div className="terminal w-full max-w-lg mx-auto">
      <div className="terminal-header">
        <div className="terminal-dot bg-[#ff5f57]" />
        <div className="terminal-dot bg-[#febc2e]" />
        <div className="terminal-dot bg-[#28c840]" />
        <span className="ml-3 text-xs text-[#6b6b80] font-[family-name:var(--font-mono)]">
          mesh-output
        </span>
      </div>
      <div className="terminal-body min-h-[140px]">
        {lines.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={`font-[family-name:var(--font-mono)] text-xs leading-6 ${typeColors[line.type]}`}
          >
            {line.text}
          </motion.div>
        ))}
        {isActive && visibleCount < lines.length && (
          <span className="inline-block w-2 h-3.5 bg-[#00d4ff] animate-terminal-blink ml-0.5" />
        )}
      </div>
    </div>
  );
}
