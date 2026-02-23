"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TheaterInput } from "./theater/TheaterInput";
import { PipelineStages } from "./theater/PipelineStage";
import { MeshNodes } from "./theater/MeshNodes";
import { StreamingOutput } from "./theater/StreamingOutput";
import {
  matchScenario,
  classColors,
  type Scenario,
  type TheaterStage,
} from "@/data/theater-scenarios";

export function Theater() {
  const [stage, setStage] = useState<TheaterStage>("idle");
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [prompt, setPrompt] = useState("");
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const runScenario = useCallback(
    (input: string) => {
      clearTimers();
      const matched = matchScenario(input);
      setScenario(matched);
      setPrompt(input);
      setStage("typing");

      const stages: TheaterStage[] = [
        "classifying",
        "routing",
        "selecting",
        "streaming",
        "complete",
      ];
      let elapsed = matched.stageTimings[0]; // initial delay for "typing"

      stages.forEach((s, i) => {
        elapsed += matched.stageTimings[i + 1] ?? 600;
        const t = setTimeout(() => setStage(s), elapsed);
        timersRef.current.push(t);
      });
    },
    [clearTimers]
  );

  const reset = useCallback(() => {
    clearTimers();
    setStage("idle");
    setScenario(null);
    setPrompt("");
  }, [clearTimers]);

  const classColor = scenario ? classColors[scenario.classification] : "#00d4ff";

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00d4ff]/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-[#c0c0d8] max-w-2xl mx-auto font-medium">
            Type a message. Watch the mesh turn it into a product.
          </p>
        </motion.div>

        <div className="rounded-2xl border border-white/[0.12] bg-white/[0.03] p-6 lg:p-10 shadow-[0_4px_32px_rgba(0,0,0,0.3)] space-y-8">
          {/* Input */}
          <TheaterInput
            onSubmit={runScenario}
            disabled={stage !== "idle" && stage !== "complete"}
          />

          {/* Pipeline stages indicator */}
          {stage !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PipelineStages currentStage={stage} />
            </motion.div>
          )}

          {/* Stage content area */}
          <AnimatePresence mode="wait">
            {/* Typing: show the message bubble */}
            {stage === "typing" && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5865F2]/15 border border-[#5865F2]/30 text-sm text-[#dbdee1]">
                  <span className="text-[#5865F2]">#build</span>
                  <span>{prompt}</span>
                </div>
              </motion.div>
            )}

            {/* Classifying: show the badge */}
            {stage === "classifying" && scenario && (
              <motion.div
                key="classifying"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium"
                  style={{
                    backgroundColor: `${classColor}15`,
                    borderColor: `${classColor}30`,
                    color: classColor,
                  }}
                >
                  Classified as: {scenario.classification}
                </div>
              </motion.div>
            )}

            {/* Routing: show mesh nodes */}
            {stage === "routing" && scenario && (
              <motion.div
                key="routing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <MeshNodes
                  activeDevice={scenario.routedDevice}
                  accentColor={classColor}
                />
              </motion.div>
            )}

            {/* Selecting: show model + fallback */}
            {stage === "selecting" && scenario && (
              <motion.div
                key="selecting"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="text-lg font-bold text-white">
                  {scenario.selectedModel}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#6b6b80]">
                  <span>Fallback:</span>
                  {scenario.fallbackChain.map((model, i) => (
                    <span
                      key={model}
                      className={i === 0 ? "text-[#8888a8]" : "opacity-40"}
                    >
                      {model}
                      {i < scenario.fallbackChain.length - 1 && (
                        <span className="mx-1 opacity-30">&rarr;</span>
                      )}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Streaming + Complete: show terminal output */}
            {(stage === "streaming" || stage === "complete") && scenario && (
              <motion.div
                key="streaming"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <StreamingOutput
                  lines={scenario.streamingLines}
                  isActive={stage === "streaming" || stage === "complete"}
                />
                {stage === "complete" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 text-sm text-[#10b981] font-medium">
                      {scenario.resultSummary}
                    </div>
                    <div className="flex items-center gap-3">
                      {scenario.resultProject && (
                        <Link
                          href={`/projects/${scenario.resultProject}`}
                          className="text-xs text-[#00d4ff] hover:underline"
                        >
                          View similar project &rarr;
                        </Link>
                      )}
                      <button
                        onClick={reset}
                        className="text-xs text-[#6b6b80] hover:text-white transition-colors cursor-pointer"
                      >
                        Try another
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
