"use client";

import { useEffect, useState } from "react";
import { BillingCard } from "@/components/portal/BillingCard";
import { Card } from "@/components/shared/Card";

export default function BillingPage() {
  const [client, setClient] = useState<{
    tier: string;
    setup_status: string;
    stripe_customer_id?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/status")
      .then((res) => res.json())
      .then((json) => {
        if (json.client) setClient(json.client);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Billing</h1>
        <div className="glass-card p-12 animate-pulse h-48" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Billing</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {client ? (
          <BillingCard
            tier={client.tier}
            status={client.setup_status}
            stripeCustomerId={client.stripe_customer_id}
          />
        ) : (
          <Card className="p-8">
            <p className="text-[#6b6b80]">
              No active subscription. Contact us to get started.
            </p>
          </Card>
        )}

        <Card>
          <h3 className="text-sm font-medium text-[#a0a0b8] mb-4">
            Usage This Month
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#6b6b80]">Tasks</span>
                <span className="text-[#a0a0b8]">0 / 500</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] rounded-full"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
