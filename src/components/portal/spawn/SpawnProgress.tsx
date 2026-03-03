"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Circle, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { spawnPhases } from "@/data/spawn-templates";

interface SpawnProgressProps {
  requestId: string;
}

type PhaseStatus = "pending" | "in_progress" | "completed" | "error";

export function SpawnProgress({ requestId }: SpawnProgressProps) {
  const [phaseStatuses, setPhaseStatuses] = useState<Record<string, PhaseStatus>>({});
  const [events, setEvents] = useState<{ phase: string; message: string; created_at: string }[]>([]);

  useEffect(() => {
    // Initial fetch
    fetch(`/api/portal/spawn/${requestId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.events) {
          processEvents(data.events);
        }
      })
      .catch(() => {});

    // Realtime subscription
    const supabase = createClient();
    const channel = supabase
      .channel(`spawn-${requestId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "project_creation_events",
          filter: `request_id=eq.${requestId}`,
        },
        (payload) => {
          setEvents((prev) => [...prev, payload.new as typeof events[number]]);
          processEvent(payload.new as { phase: string; status?: string });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [requestId]);

  function processEvents(evts: { phase: string; status?: string }[]) {
    const statuses: Record<string, PhaseStatus> = {};
    for (const evt of evts) {
      if (evt.phase) {
        statuses[evt.phase] = (evt.status as PhaseStatus) || "completed";
      }
    }
    setPhaseStatuses(statuses);
  }

  function processEvent(evt: { phase: string; status?: string }) {
    if (evt.phase) {
      setPhaseStatuses((prev) => ({
        ...prev,
        [evt.phase]: (evt.status as PhaseStatus) || "completed",
      }));
    }
  }

  function getPhaseStatus(phaseId: string): PhaseStatus {
    return phaseStatuses[phaseId] || "pending";
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Spawning Progress</h3>

      <div className="space-y-2">
        {spawnPhases.map((phase, i) => {
          const status = getPhaseStatus(phase.id);
          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02]"
            >
              {/* Status icon */}
              <div className="shrink-0">
                {status === "completed" && (
                  <div className="w-6 h-6 rounded-full bg-[#10b981]/20 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#10b981]" />
                  </div>
                )}
                {status === "in_progress" && (
                  <div className="w-6 h-6 rounded-full bg-[#00d4ff]/20 flex items-center justify-center">
                    <Loader2 className="w-3.5 h-3.5 text-[#00d4ff] animate-spin" />
                  </div>
                )}
                {status === "error" && (
                  <div className="w-6 h-6 rounded-full bg-[#ef4444]/20 flex items-center justify-center">
                    <X className="w-3.5 h-3.5 text-[#ef4444]" />
                  </div>
                )}
                {status === "pending" && (
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                    <Circle className="w-3.5 h-3.5 text-[#6b6b80]" />
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <div
                  className={`text-sm font-medium ${
                    status === "completed"
                      ? "text-[#10b981]"
                      : status === "in_progress"
                        ? "text-[#00d4ff]"
                        : status === "error"
                          ? "text-[#ef4444]"
                          : "text-[#6b6b80]"
                  }`}
                >
                  {phase.label}
                </div>
                <div className="text-xs text-[#6b6b80]">
                  {phase.description}
                </div>
              </div>

              {/* Step number */}
              <span className="text-xs font-mono text-[#6b6b80]">
                {i + 1}/{spawnPhases.length}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Event timeline */}
      {events.length > 0 && (
        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-semibold text-[#8888a8] uppercase tracking-wider">
            Event Log
          </h4>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {events.map((evt, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs py-1.5 border-l-2 border-white/10 pl-3"
              >
                <span className="text-[#6b6b80] font-mono shrink-0">
                  {new Date(evt.created_at).toLocaleTimeString()}
                </span>
                <span className="text-[#a0a0b8]">{evt.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
