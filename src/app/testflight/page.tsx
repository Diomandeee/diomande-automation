import type { Metadata } from "next";
import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { TestFlightShowcase } from "@/components/testflight/TestFlightShowcase";

export const metadata: Metadata = {
  title: "TestFlight | 17 iOS Apps — Diomande Automation",
  description:
    "Try 17 iOS apps on TestFlight. From AI content creation to security cameras, language learning to wine bars — all built with SwiftUI and deployed via zero-retry automation.",
  openGraph: {
    title: "TestFlight — 17 iOS Apps",
    description:
      "Join the beta and try our iOS app expedition. Zero retries, fully automated pipeline.",
  },
};

export default function TestFlightPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0a0a0f]">
        <TestFlightShowcase />
      </main>
      <Footer />
    </>
  );
}
