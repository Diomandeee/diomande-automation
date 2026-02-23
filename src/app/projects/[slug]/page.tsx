import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { getProjectBySlug, getAllSlugs } from "@/lib/projects";
import { tagColors } from "@/data/projects";
import { ProjectHero } from "@/components/projects/ProjectHero";
import { ProjectFeatures } from "@/components/projects/ProjectFeatures";
import { ProjectTechStack } from "@/components/projects/ProjectTechStack";
import { TestFlightCTA } from "@/components/projects/TestFlightCTA";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { ProjectViewTracker } from "@/components/projects/ProjectViewTracker";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.description,
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectViewTracker slug={project.slug} />
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-[#7a7a95] mb-10">
            <Link href="/projects" className="hover:text-white transition-colors">
              Projects
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={`/projects?category=${encodeURIComponent(project.category)}`} className="hover:text-white transition-colors">
              {project.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{project.name}</span>
          </nav>

          {/* Hero */}
          <section className="mb-16">
            <ProjectHero project={project} />
          </section>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <section className="mb-16">
              <ProjectFeatures features={project.features} accentColor={project.accentColor} />
            </section>
          )}

          {/* Tech Stack */}
          <section className="mb-16">
            <ProjectTechStack tech={project.tech} tags={project.tags} tagColors={tagColors} />
          </section>

          {/* TestFlight CTA */}
          {project.testflight && (
            <section className="mb-16">
              <TestFlightCTA
                status={project.testflight.status}
                url={project.testflight.url}
                projectName={project.name}
              />
            </section>
          )}

          {/* Related Projects */}
          <section className="mb-16">
            <RelatedProjects slug={project.slug} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
