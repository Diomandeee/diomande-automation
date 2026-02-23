import type { Metadata } from "next";
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
        <ProjectDirectory />
      </main>
      <Footer />
    </>
  );
}
