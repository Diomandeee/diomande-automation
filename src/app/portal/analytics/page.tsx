"use client";

import { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/shared/Card";
import { Eye, Users, Search, BarChart3 } from "lucide-react";

type Range = "7d" | "30d" | "90d";

interface AnalyticsData {
  total_views: number;
  unique_visitors: number;
  top_projects: { slug: string; count: number }[];
  top_searches: { term: string; count: number }[];
  daily_timeline: { date: string; count: number }[];
  by_event_type: Record<string, number>;
}

export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>("7d");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/portal/analytics?range=${range}`);
    setData(await res.json());
    setLoading(false);
  }, [range]);

  useEffect(() => {
    load();
  }, [load]);

  const maxDaily = data?.daily_timeline
    ? Math.max(...data.daily_timeline.map((d) => d.count), 1)
    : 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <div className="flex gap-1 bg-white/5 rounded-lg p-1">
          {(["7d", "30d", "90d"] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                range === r
                  ? "bg-[#00d4ff]/10 text-[#00d4ff]"
                  : "text-[#6b6b80] hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass-card p-6 animate-pulse h-28" />
          ))}
        </div>
      ) : data ? (
        <>
          {/* Stat cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6b6b80]">Total Events</span>
                <Eye className="w-4 h-4 text-[#00d4ff]" />
              </div>
              <div className="text-2xl font-bold text-white">
                {data.total_views.toLocaleString()}
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6b6b80]">Unique Visitors</span>
                <Users className="w-4 h-4 text-[#8b5cf6]" />
              </div>
              <div className="text-2xl font-bold text-white">
                {data.unique_visitors.toLocaleString()}
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6b6b80]">Project Views</span>
                <BarChart3 className="w-4 h-4 text-[#10b981]" />
              </div>
              <div className="text-2xl font-bold text-white">
                {(data.by_event_type.project_view || 0).toLocaleString()}
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6b6b80]">Searches</span>
                <Search className="w-4 h-4 text-[#f59e0b]" />
              </div>
              <div className="text-2xl font-bold text-white">
                {(data.by_event_type.search || 0).toLocaleString()}
              </div>
            </Card>
          </div>

          {/* Daily timeline chart */}
          {data.daily_timeline.length > 0 && (
            <Card>
              <h3 className="text-sm font-medium text-[#a0a0b8] mb-4">
                Daily Activity
              </h3>
              <div className="flex items-end gap-1 h-32">
                {data.daily_timeline.map((day) => (
                  <div
                    key={day.date}
                    className="flex-1 group relative"
                  >
                    <div
                      className="w-full rounded-t bg-[#00d4ff]/60 hover:bg-[#00d4ff] transition-colors min-h-[2px]"
                      style={{
                        height: `${(day.count / maxDaily) * 100}%`,
                      }}
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1a1a2e] text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {day.date}: {day.count}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-[#6b6b80]">
                <span>{data.daily_timeline[0]?.date}</span>
                <span>{data.daily_timeline[data.daily_timeline.length - 1]?.date}</span>
              </div>
            </Card>
          )}

          {/* Top projects + searches */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-sm font-medium text-[#a0a0b8] mb-4">
                Top Projects
              </h3>
              {data.top_projects.length > 0 ? (
                <div className="space-y-3">
                  {data.top_projects.slice(0, 5).map((p, i) => (
                    <div key={p.slug} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#6b6b80] w-4">{i + 1}</span>
                        <span className="text-sm text-white">{p.slug}</span>
                      </div>
                      <span className="text-sm text-[#a0a0b8]">{p.count} views</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#6b6b80]">No project views yet</p>
              )}
            </Card>

            <Card>
              <h3 className="text-sm font-medium text-[#a0a0b8] mb-4">
                Top Searches
              </h3>
              {data.top_searches.length > 0 ? (
                <div className="space-y-3">
                  {data.top_searches.slice(0, 5).map((s, i) => (
                    <div key={s.term} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#6b6b80] w-4">{i + 1}</span>
                        <span className="text-sm text-white">&quot;{s.term}&quot;</span>
                      </div>
                      <span className="text-sm text-[#a0a0b8]">{s.count}x</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#6b6b80]">No searches yet</p>
              )}
            </Card>
          </div>

          {/* Event type breakdown */}
          <Card>
            <h3 className="text-sm font-medium text-[#a0a0b8] mb-4">
              Events by Type
            </h3>
            <div className="flex flex-wrap gap-4">
              {Object.entries(data.by_event_type)
                .sort((a, b) => b[1] - a[1])
                .map(([type, count]) => (
                  <div key={type} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00d4ff]" />
                    <span className="text-sm text-[#a0a0b8]">{type}</span>
                    <span className="text-sm font-medium text-white">{count}</span>
                  </div>
                ))}
            </div>
          </Card>
        </>
      ) : null}
    </div>
  );
}
