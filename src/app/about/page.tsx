import type { Metadata } from "next";
import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Mohamed Diomande — the builder behind Diomande Automation and the Claw bot platform.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
