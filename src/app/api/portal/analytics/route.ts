import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const range = request.nextUrl.searchParams.get("range") || "7d";
  const days = range === "90d" ? 90 : range === "30d" ? 30 : 7;
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data: events } = await supabase
    .from("clawbot_analytics")
    .select("event_type, page, metadata, created_at, visitor_id")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false })
    .limit(5000);

  if (!events || events.length === 0) {
    return NextResponse.json({
      total_views: 0,
      unique_visitors: 0,
      top_projects: [],
      top_searches: [],
      daily_timeline: [],
      by_event_type: {},
    });
  }

  // Aggregate
  const uniqueVisitors = new Set(events.map((e) => e.visitor_id).filter(Boolean)).size;

  // Event type counts
  const byEventType: Record<string, number> = {};
  for (const e of events) {
    byEventType[e.event_type] = (byEventType[e.event_type] || 0) + 1;
  }

  // Top projects (from project_view events)
  const projectViews: Record<string, number> = {};
  for (const e of events) {
    if (e.event_type === "project_view" && e.metadata?.slug) {
      const slug = e.metadata.slug as string;
      projectViews[slug] = (projectViews[slug] || 0) + 1;
    }
  }
  const topProjects = Object.entries(projectViews)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([slug, count]) => ({ slug, count }));

  // Top searches
  const searchTerms: Record<string, number> = {};
  for (const e of events) {
    if (e.event_type === "search" && e.metadata?.query) {
      const q = (e.metadata.query as string).toLowerCase();
      searchTerms[q] = (searchTerms[q] || 0) + 1;
    }
  }
  const topSearches = Object.entries(searchTerms)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([term, count]) => ({ term, count }));

  // Daily timeline
  const dailyCounts: Record<string, number> = {};
  for (const e of events) {
    const day = e.created_at.substring(0, 10);
    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
  }
  const dailyTimeline = Object.entries(dailyCounts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, count]) => ({ date, count }));

  return NextResponse.json({
    total_views: events.length,
    unique_visitors: uniqueVisitors,
    top_projects: topProjects,
    top_searches: topSearches,
    daily_timeline: dailyTimeline,
    by_event_type: byEventType,
  });
}
