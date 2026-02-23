import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "crypto";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: client } = await supabase
    .from("clawbot_clients")
    .select("api_key")
    .eq("user_id", user.id)
    .single();

  if (!client?.api_key) {
    return NextResponse.json({ api_key: null });
  }

  // Return masked version
  const key = client.api_key;
  const masked = key.substring(0, 6) + "••••••••••••" + key.substring(key.length - 4);
  return NextResponse.json({ api_key: masked });
}

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const newKey = `da_${randomUUID().replace(/-/g, "")}`;

  const { error } = await supabase
    .from("clawbot_clients")
    .update({ api_key: newKey })
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return full key once on generation
  return NextResponse.json({ api_key: newKey });
}
