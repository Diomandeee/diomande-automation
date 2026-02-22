"use client";

import { useState } from "react";
import { Card } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { CreditCard, ExternalLink } from "lucide-react";

interface BillingCardProps {
  tier: string;
  status: string;
  stripeCustomerId?: string;
}

const tierPricing: Record<string, { monthly: string; setup: string }> = {
  starter: { monthly: "$500", setup: "$2,500" },
  professional: { monthly: "$1,500", setup: "$7,500" },
  enterprise: { monthly: "Custom", setup: "$20,000+" },
};

export function BillingCard({ tier, status, stripeCustomerId }: BillingCardProps) {
  const [loading, setLoading] = useState(false);
  const pricing = tierPricing[tier] || tierPricing.starter;

  async function handleManageBilling() {
    if (!stripeCustomerId) return;
    setLoading(true);
    // In production, this would create a Stripe billing portal session
    window.open("https://billing.stripe.com/p/login", "_blank");
    setLoading(false);
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-[#00d4ff]" />
          <h3 className="text-lg font-semibold text-white">Subscription</h3>
        </div>
        <Badge variant={status === "active" ? "green" : "default"}>
          {status}
        </Badge>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-baseline">
          <span className="text-[#6b6b80]">Plan</span>
          <span className="text-white font-medium capitalize">{tier}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-[#6b6b80]">Monthly</span>
          <span className="text-white font-medium">{pricing.monthly}/mo</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-[#6b6b80]">Setup Fee</span>
          <span className="text-[#a0a0b8]">{pricing.setup} (paid)</span>
        </div>
      </div>

      {stripeCustomerId && (
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleManageBilling}
          loading={loading}
        >
          Manage Billing
          <ExternalLink className="w-4 h-4" />
        </Button>
      )}
    </Card>
  );
}
