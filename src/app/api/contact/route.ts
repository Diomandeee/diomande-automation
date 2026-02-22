import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendLeadNotification, sendLeadConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, team_size, interest_tier, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    // Get UTM params from referrer or headers
    const referer = request.headers.get("referer") || "";
    let utm_source, utm_medium, utm_campaign;
    try {
      const url = new URL(referer);
      utm_source = url.searchParams.get("utm_source") || undefined;
      utm_medium = url.searchParams.get("utm_medium") || undefined;
      utm_campaign = url.searchParams.get("utm_campaign") || undefined;
    } catch {
      // ignore parse errors
    }

    const { error } = await supabase.from("clawbot_leads").insert({
      name,
      email,
      company,
      team_size,
      interest_tier: interest_tier || "starter",
      message,
      source: "website",
      utm_source,
      utm_medium,
      utm_campaign,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 }
      );
    }

    // Send emails (fire and forget)
    Promise.allSettled([
      sendLeadNotification({ name, email, company, message, tier: interest_tier }),
      sendLeadConfirmation(email, name),
    ]).catch(console.error);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
