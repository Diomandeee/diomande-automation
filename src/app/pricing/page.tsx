import type { Metadata } from "next";
import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { Pricing } from "@/components/marketing/Pricing";
import { PricingFAQ } from "./PricingFAQ";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for AI task automation. Starter, Professional, and Enterprise tiers.",
};

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Pricing That Scales With You
            </h1>
            <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto">
              One-time setup to deploy your infrastructure, plus a monthly
              service fee for ongoing management and support.
            </p>
          </div>
        </section>
        <Pricing />
        <PricingFAQ />
      </main>
      <Footer />
    </>
  );
}
