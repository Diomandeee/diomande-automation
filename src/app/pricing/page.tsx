import type { Metadata } from "next";
import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { Pricing } from "@/components/marketing/Pricing";
import { PricingFAQ } from "./PricingFAQ";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free community access or Pro membership. Build anything with the mesh.",
};

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Membership
            </h1>
            <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto">
              Start free. Go Pro when you need unlimited builds and priority
              access to the mesh.
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
