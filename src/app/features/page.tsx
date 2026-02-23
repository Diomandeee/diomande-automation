import type { Metadata } from "next";
import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { Architecture } from "@/components/marketing/Architecture";
import { FeaturesDeep } from "./FeaturesDeep";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Multi-agent decomposition, distributed mesh execution, intelligent model routing, and more. See what powers Diomande Automation.",
};

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              What You Get
            </h1>
            <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto">
              A production-grade distributed AI task execution platform, built
              from thousands of hours of real autonomous operation.
            </p>
          </div>
        </section>
        <FeatureShowcase />
        <FeaturesDeep />
        <Architecture />
      </main>
      <Footer />
    </>
  );
}
