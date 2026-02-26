import type { Metadata } from "next";
import { ImmersiveLanding } from "@/components/immersive/ImmersiveLanding";

export const metadata: Metadata = {
  title: "Diomande — Immersive",
  description:
    "Production AI infrastructure. Zero scroll. Full experience.",
};

export default function ImmersivePage() {
  return <ImmersiveLanding />;
}
