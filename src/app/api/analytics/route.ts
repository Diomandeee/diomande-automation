import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { event_type, page, metadata, visitor_id } = await request.json();

    if (!event_type) {
      return NextResponse.json(
        { error: "event_type is required" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();
    const referrer = request.headers.get("referer") || undefined;

    await supabase.from("clawbot_analytics").insert({
      event_type,
      page,
      metadata: metadata || {},
      visitor_id,
      referrer,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
