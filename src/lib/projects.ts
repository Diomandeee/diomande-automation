import { projects, type Project, type Category } from "@/data/projects";

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: Category): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const project = getProjectBySlug(slug);
  if (!project) return [];

  // Same category, excluding self
  const sameCategory = projects.filter(
    (p) => p.category === project.category && p.slug !== slug
  );

  // If not enough in same category, add from shared tags
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const remaining = limit - sameCategory.length;
  const tagSet = new Set(project.tags);
  const byTags = projects
    .filter(
      (p) =>
        p.slug !== slug &&
        p.category !== project.category &&
        p.tags.some((t) => tagSet.has(t))
    )
    .slice(0, remaining);

  return [...sameCategory, ...byTags].slice(0, limit);
}
