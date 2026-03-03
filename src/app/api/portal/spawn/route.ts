import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, display_name, description, type, category, initial_goals, constraints } = body;

  if (!name || !type) {
    return NextResponse.json(
      { error: "name and type are required" },
      { status: 400 }
    );
  }

  // Validate name is snake_case
  if (!/^[a-z][a-z0-9_-]*$/.test(name)) {
    return NextResponse.json(
      { error: "name must be snake_case (lowercase, underscores, hyphens)" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("spawn_requests")
    .insert({
      user_id: user.id,
      name,
      display_name: display_name || name,
      description: description || "",
      type,
      category: category || "apps",
      initial_goals: initial_goals || [],
      constraints: constraints || [],
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to create spawn request" },
      { status: 500 }
    );
  }

  return NextResponse.json({ requestId: data.id });
}
