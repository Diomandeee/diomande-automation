import type { Metadata } from "next";
import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { PipelineShowcase } from "@/components/pipeline/PipelineShowcase";

export const metadata: Metadata = {
  title: "Zero-Retry iOS Pipeline | Diomande Automation",
  description:
    "Fully automated iOS deployment pipeline — icon generation to TestFlight. 12 apps, 7 steps, zero manual intervention.",
  openGraph: {
    title: "Zero-Retry iOS Pipeline",
    description:
      "Fully automated iOS deployment — 12 apps with zero retries.",
  },
};

export default function PipelinePage() {
  return (
    <>
      <Navigation />
      <main>
        <PipelineShowcase />
      </main>
      <Footer />
    </>
  );
}
