import type { Metadata } from "next";
import { Suspense } from "react";
import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { ProjectDirectory } from "./ProjectDirectory";

export const metadata: Metadata = {
  title: "Projects — Diomande Automation",
  description:
    "120+ projects built with the mesh. iOS apps, AI infrastructure, creative tools, dev tools, and more.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16">
        <Suspense fallback={<div className="max-w-7xl mx-auto px-6 animate-pulse h-96" />}>
          <ProjectDirectory />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
