"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/shared/Card";
import { StatusCard } from "@/components/portal/StatusCard";
import { Badge } from "@/components/shared/Badge";
import { BarChart3, Zap, Clock, TrendingUp } from "lucide-react";

interface PortalData {
  client: {
    company: string;
    tier: string;
    setup_status: string;
    mesh_device_count: number;
    gateway_types: string[];
  };
  stats: {
    total_tasks: number;
    today_tasks: number;
    avg_duration_ms: number;
    success_rate: number;
  };
}

export default function PortalDashboard() {
  const [data, setData] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/status")
      .then((res) => res.json())
      .then((json) => {
        if (json.client) setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="glass-card p-6 animate-pulse h-28"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <Card className="p-12 text-center">
          <Zap className="w-12 h-12 text-[#00d4ff] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Welcome to Diomande Automation
          </h2>
          <p className="text-[#a0a0b8] mb-6">
            Your account is set up. Head to the Setup page to configure your Claw bot instance.
          </p>
          <Badge variant="cyan">Pending Setup</Badge>
        </Card>
      </div>
    );
  }

  const stats = [
    {
      label: "Tasks Today",
      value: data.stats.today_tasks,
      icon: Zap,
      color: "#00d4ff",
    },
    {
      label: "Total Tasks",
      value: data.stats.total_tasks,
      icon: BarChart3,
      color: "#8b5cf6",
    },
    {
      label: "Avg Duration",
      value: data.stats.avg_duration_ms > 0
        ? `${(data.stats.avg_duration_ms / 1000).toFixed(1)}s`
        : "—",
      icon: Clock,
      color: "#f59e0b",
    },
    {
      label: "Success Rate",
      value: data.stats.total_tasks > 0
        ? `${data.stats.success_rate}%`
        : "—",
      icon: TrendingUp,
      color: "#10b981",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-[#6b6b80]">{data.client.company}</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#6b6b80]">{stat.label}</span>
              <stat.icon
                className="w-4 h-4"
                style={{ color: stat.color }}
              />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Status */}
      <div className="grid lg:grid-cols-2 gap-6">
        <StatusCard
          status={data.client.setup_status}
          tier={data.client.tier}
          meshDevices={data.client.mesh_device_count}
          gateways={data.client.gateway_types}
        />

        <Card>
          <h3 className="text-sm font-medium text-[#a0a0b8] mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3 text-sm text-[#6b6b80]">
            <p>No recent activity to display.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
