"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TerminalLine {
  text: string;
  type: "command" | "output" | "success" | "info" | "blank";
  delay: number;
}

const terminalLines: TerminalLine[] = [
  { text: "> /team Build a REST API with auth, CRUD, and tests", type: "command", delay: 0 },
  { text: "Task queued: a3f7bc21", type: "info", delay: 800 },
  { text: "Decomposed into 3 subtasks...", type: "output", delay: 1400 },
  { text: "", type: "blank", delay: 1800 },
  { text: "  ✓ Subtask 1 complete [Claude] (12s)", type: "success", delay: 2600 },
  { text: "  ✓ Subtask 2 complete [Claude] (18s)", type: "success", delay: 3800 },
  { text: "  ✓ Subtask 3 complete [Gemini] (9s)", type: "success", delay: 4800 },
  { text: "", type: "blank", delay: 5200 },
  { text: "Synthesizing...", type: "info", delay: 5600 },
  { text: "✓ Team task complete: 47 files, 3 endpoints, 12 tests", type: "success", delay: 6800 },
];

const typeColors: Record<TerminalLine["type"], string> = {
  command: "text-[#00d4ff]",
  output: "text-[#a0a0b8]",
  success: "text-[#10b981]",
  info: "text-[#6b6b80]",
  blank: "",
};

export function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    terminalLines.forEach((line, i) => {
      timers.push(
        setTimeout(() => setVisibleLines(i + 1), line.delay)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="terminal w-full max-w-2xl mx-auto shadow-2xl shadow-black/50">
      <div className="terminal-header">
        <div className="terminal-dot bg-[#ff5f57]" />
        <div className="terminal-dot bg-[#febc2e]" />
        <div className="terminal-dot bg-[#28c840]" />
        <span className="ml-3 text-xs text-[#6b6b80] font-[family-name:var(--font-mono)]">
          claw-bot — bash
        </span>
      </div>
      <div className="terminal-body min-h-[280px]">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`font-[family-name:var(--font-mono)] text-sm leading-7 ${typeColors[line.type]}`}
          >
            {line.text || "\u00A0"}
          </motion.div>
        ))}
        {visibleLines < terminalLines.length && (
          <span className="inline-block w-2 h-4 bg-[#00d4ff] animate-terminal-blink ml-0.5" />
        )}
      </div>
    </div>
  );
}
