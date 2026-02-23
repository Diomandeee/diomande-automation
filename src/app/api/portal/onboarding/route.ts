import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: client } = await supabase
    .from("clawbot_clients")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!client) {
    return NextResponse.json({ steps: [] });
  }

  const { data: steps } = await supabase
    .from("clawbot_onboarding_steps")
    .select("*")
    .eq("client_id", client.id)
    .order("step_order", { ascending: true });

  return NextResponse.json({ steps: steps || [] });
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { step_id, status } = await request.json();

  if (!step_id || !status) {
    return NextResponse.json({ error: "step_id and status required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("clawbot_onboarding_steps")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", step_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
