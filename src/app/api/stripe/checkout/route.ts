import { NextRequest, NextResponse } from "next/server";
import { getStripe, PRICE_IDS } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tier } = await request.json();
    const priceConfig = PRICE_IDS[tier as keyof typeof PRICE_IDS];

    if (!priceConfig || !priceConfig.monthly) {
      return NextResponse.json(
        { error: "Invalid tier or custom pricing required" },
        { status: 400 }
      );
    }

    const lineItems = [];
    if (priceConfig.setup) {
      lineItems.push({ price: priceConfig.setup, quantity: 1 });
    }
    lineItems.push({ price: priceConfig.monthly, quantity: 1 });

    const session = await getStripe().checkout.sessions.create({
      customer_email: user.email,
      line_items: lineItems,
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/portal/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/portal/billing?canceled=true`,
      metadata: {
        user_id: user.id,
        tier,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
