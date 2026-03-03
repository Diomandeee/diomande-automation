import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: request, error } = await supabase
    .from("spawn_requests")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !request) {
    return NextResponse.json(
      { error: "Spawn request not found" },
      { status: 404 }
    );
  }

  // Fetch associated events if any
  const { data: events } = await supabase
    .from("project_creation_events")
    .select("*")
    .eq("request_id", id)
    .order("created_at", { ascending: true });

  return NextResponse.json({ request, events: events || [] });
}
