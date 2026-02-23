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
    .select("notification_preferences")
    .eq("user_id", user.id)
    .single();

  return NextResponse.json({
    notification_preferences: client?.notification_preferences || {
      task_completion: true,
      usage_warnings: true,
      system_updates: true,
    },
  });
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { notification_preferences } = await request.json();

  const { error } = await supabase
    .from("clawbot_clients")
    .update({ notification_preferences })
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
