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
    },
  });
}
