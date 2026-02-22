import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return _stripe;
}

export const PRICE_IDS = {
  starter: {
    setup: process.env.STRIPE_STARTER_SETUP_PRICE_ID,
    monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID,
  },
  professional: {
    setup: process.env.STRIPE_PRO_SETUP_PRICE_ID,
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
  },
  enterprise: {
    setup: null, // Custom pricing
    monthly: null,
  },
} as const;
