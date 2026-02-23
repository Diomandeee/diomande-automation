import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: client } = await supabase
    .from("clawbot_clients")
    .select("*, clawbot_onboarding_steps(*)")
    .eq("user_id", user.id)
    .single();

  if (!client) {
    return NextResponse.json({ status: "no_client" });
  }

  // Get task stats
  const { count: totalTasks } = await supabase
    .from("clawbot_client_tasks")
    .select("*", { count: "exact", head: true })
    .eq("client_id", client.id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { count: todayTasks } = await supabase
    .from("clawbot_client_tasks")
    .select("*", { count: "exact", head: true })
    .eq("client_id", client.id)
    .gte("created_at", today.toISOString());

  // Avg duration + success rate
  const { data: taskMetrics } = await supabase
    .from("clawbot_client_tasks")
    .select("status, duration_ms")
    .eq("client_id", client.id);

  let avgDuration = 0;
  let successRate = 100;
  if (taskMetrics && taskMetrics.length > 0) {
    const durations = taskMetrics
      .map((t) => t.duration_ms)
      .filter((d): d is number => d != null && d > 0);
    avgDuration = durations.length > 0
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
      : 0;
    const completed = taskMetrics.filter((t) => t.status === "completed" || t.status === "done").length;
    const failed = taskMetrics.filter((t) => t.status === "failed" || t.status === "error").length;
    const total = completed + failed;
    successRate = total > 0 ? Math.round((completed / total) * 1000) / 10 : 100;
  }

  return NextResponse.json({
    client: {
      id: client.id,
      company: client.company,
      tier: client.tier,
      setup_status: client.setup_status,
      mesh_device_count: client.mesh_device_count,
      gateway_types: client.gateway_types,
    },
    onboarding: client.clawbot_onboarding_steps || [],
    stats: {
      total_tasks: totalTasks || 0,
      today_tasks: todayTasks || 0,
      avg_duration_ms: avgDuration,
      success_rate: successRate,
    },
  });
}
