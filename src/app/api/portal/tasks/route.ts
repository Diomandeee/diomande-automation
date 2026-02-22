import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const status = searchParams.get("status");
  const offset = (page - 1) * limit;

  // Get client record
  const { data: client } = await supabase
    .from("clawbot_clients")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!client) {
    return NextResponse.json({ tasks: [], total: 0 });
  }

  let query = supabase
    .from("clawbot_client_tasks")
    .select("*", { count: "exact" })
    .eq("client_id", client.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq("status", status);
  }

  const { data: tasks, count } = await query;

  return NextResponse.json({ tasks: tasks || [], total: count || 0 });
}
