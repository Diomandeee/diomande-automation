"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface Event {
  phase: string;
  message: string;
  status?: string;
  created_at: string;
}

interface EventTimelineProps {
  events: Event[];
}

const statusIcons: Record<string, React.ElementType> = {
  completed: CheckCircle,
  error: AlertCircle,
  in_progress: Loader2,
};

const statusColors: Record<string, string> = {
  completed: "text-[#10b981]",
  error: "text-[#ef4444]",
  in_progress: "text-[#00d4ff]",
};

export function EventTimeline({ events }: EventTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-8 h-8 text-[#6b6b80] mx-auto mb-2" />
        <p className="text-sm text-[#6b6b80]">
          Events will appear here as spawning progresses.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {events.map((event, i) => {
        const Icon = statusIcons[event.status || ""] || Clock;
        const color = statusColors[event.status || ""] || "text-[#6b6b80]";

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border-l-2 border-white/10"
          >
            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${color} ${event.status === "in_progress" ? "animate-spin" : ""}`} />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white">{event.message}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-mono text-[#6b6b80]">
                  {event.phase}
                </span>
                <span className="text-[10px] text-[#6b6b80]">
                  {new Date(event.created_at).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
