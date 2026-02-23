"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Tags,
  Router,
  Cpu,
  Terminal,
  CheckCircle2,
} from "lucide-react";

const stageConfig = [
  { key: "typing", label: "Message Received", icon: MessageSquare, color: "#5865F2" },
  { key: "classifying", label: "Task Classified", icon: Tags, color: "#00d4ff" },
  { key: "routing", label: "Device Routed", icon: Router, color: "#f59e0b" },
  { key: "selecting", label: "Model Selected", icon: Cpu, color: "#8b5cf6" },
  { key: "streaming", label: "Streaming Output", icon: Terminal, color: "#10b981" },
  { key: "complete", label: "Result", icon: CheckCircle2, color: "#10b981" },
] as const;

type Stage = (typeof stageConfig)[number]["key"];

interface PipelineStageProps {
  currentStage: string;
}

export function PipelineStages({ currentStage }: PipelineStageProps) {
  const currentIndex = stageConfig.findIndex((s) => s.key === currentStage);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0 w-full">
      {stageConfig.map((stage, i) => {
        const isActive = stage.key === currentStage;
        const isPast = i < currentIndex;
        const Icon = stage.icon;

        return (
          <div key={stage.key} className="flex items-center flex-1 min-w-0">
            <motion.div
              initial={false}
              animate={{
                opacity: isPast || isActive ? 1 : 0.3,
                scale: isActive ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-white/[0.06] border border-white/[0.1]"
                  : "border border-transparent"
              }`}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: isPast || isActive ? `${stage.color}20` : "transparent",
                  color: isPast || isActive ? stage.color : "#4a4a5a",
                }}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span
                className="text-[11px] font-medium whitespace-nowrap hidden lg:inline"
                style={{
                  color: isPast || isActive ? "#c0c0d8" : "#4a4a5a",
                }}
              >
                {stage.label}
              </span>
            </motion.div>
            {/* Connector */}
            {i < stageConfig.length - 1 && (
              <div className="hidden sm:block flex-1 h-px mx-1 min-w-[8px]">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isPast ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full origin-left"
                  style={{ backgroundColor: isPast ? `${stage.color}40` : "#2a2a3a" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
