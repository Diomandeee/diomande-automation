import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return _stripe;
}

export const PRICE_IDS: Record<
  string,
  { setup?: string | null; monthly: string | null }
> = {
  community_pro: {
    monthly: process.env.STRIPE_COMMUNITY_PRO_MONTHLY_PRICE_ID ?? null,
  },
  enterprise: {
    setup: null,
    monthly: null,
  },
};
