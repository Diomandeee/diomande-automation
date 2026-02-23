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

const tierPricing: Record<string, { monthly: string; setup: string | null }> = {
  free: { monthly: "$0", setup: null },
  starter: { monthly: "$0", setup: null },
  pro: { monthly: "$49", setup: null },
  community_pro: { monthly: "$49", setup: null },
  enterprise: { monthly: "Custom", setup: null },
};

export function BillingCard({ tier, status, stripeCustomerId }: BillingCardProps) {
  const [loading, setLoading] = useState(false);
  const pricing = tierPricing[tier] || tierPricing.free;

  async function handleManageBilling() {
    if (!stripeCustomerId) return;
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
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
