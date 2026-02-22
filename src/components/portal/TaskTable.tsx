"use client";

import { Badge } from "@/components/shared/Badge";

interface Task {
  id: string;
  task_content: string;
  status: string;
  model_used: string;
  duration_ms: number;
  created_at: string;
}

interface TaskTableProps {
  tasks: Task[];
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusVariants: Record<string, "green" | "cyan" | "purple" | "default"> = {
  completed: "green",
  running: "cyan",
  queued: "purple",
  failed: "default",
};

export function TaskTable({ tasks }: TaskTableProps) {
  if (tasks.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <p className="text-[#6b6b80]">No tasks yet. Submit your first task to get started.</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            <th className="text-left text-xs font-medium text-[#6b6b80] uppercase tracking-wider px-6 py-3">
              Task
            </th>
            <th className="text-left text-xs font-medium text-[#6b6b80] uppercase tracking-wider px-6 py-3">
              Status
            </th>
            <th className="text-left text-xs font-medium text-[#6b6b80] uppercase tracking-wider px-6 py-3">
              Model
            </th>
            <th className="text-left text-xs font-medium text-[#6b6b80] uppercase tracking-wider px-6 py-3">
              Duration
            </th>
            <th className="text-left text-xs font-medium text-[#6b6b80] uppercase tracking-wider px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
            >
              <td className="px-6 py-4">
                <p className="text-sm text-white truncate max-w-xs">
                  {task.task_content}
                </p>
              </td>
              <td className="px-6 py-4">
                <Badge variant={statusVariants[task.status] || "default"}>
                  {task.status}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-[#a0a0b8] font-[family-name:var(--font-mono)]">
                  {task.model_used || "—"}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-[#a0a0b8]">
                  {task.duration_ms ? formatDuration(task.duration_ms) : "—"}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-[#6b6b80]">
                  {formatDate(task.created_at)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
