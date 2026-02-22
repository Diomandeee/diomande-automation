"use client";

import { useEffect, useState } from "react";
import { TaskTable } from "@/components/portal/TaskTable";

interface Task {
  id: string;
  task_content: string;
  status: string;
  model_used: string;
  duration_ms: number;
  created_at: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (filter) params.set("status", filter);

    fetch(`/api/portal/tasks?${params}`)
      .then((res) => res.json())
      .then((json) => {
        setTasks(json.tasks || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Task History</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white"
        >
          <option value="">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="running">Running</option>
          <option value="queued">Queued</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {loading ? (
        <div className="glass-card p-12 text-center animate-pulse">
          <p className="text-[#6b6b80]">Loading tasks...</p>
        </div>
      ) : (
        <TaskTable tasks={tasks} />
      )}
    </div>
  );
}
