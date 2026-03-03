import type { Metadata } from "next";
import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { DreamGarden } from "@/components/dreams/DreamGarden";

export const metadata: Metadata = {
  title: "Dream Garden | Diomande Automation",
  description:
    "Watch 100+ ideas evolve from seeds to blooms in the DreamWeaver engine. Live garden of evolving AI-generated concepts.",
  openGraph: {
    title: "Dream Garden — DreamWeaver Engine",
    description:
      "100+ dreams evolving through the DreamWeaver evolution engine.",
  },
};

export default function DreamsPage() {
  return (
    <>
      <Navigation />
      <main>
        <DreamGarden />
      </main>
      <Footer />
    </>
  );
}
