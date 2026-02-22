import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DOCS_DIR = path.join(process.cwd(), "src/content/docs");

export interface DocMeta {
  title: string;
  description: string;
  order: number;
  slug: string;
  category?: string;
}

export interface Doc {
  meta: DocMeta;
  content: string;
}

function getSlugFromPath(filePath: string): string {
  return filePath
    .replace(DOCS_DIR + "/", "")
    .replace(/\.mdx?$/, "")
    .replace(/\/index$/, "");
}

export function getDocBySlug(slug: string): Doc | null {
  const possiblePaths = [
    path.join(DOCS_DIR, `${slug}.mdx`),
    path.join(DOCS_DIR, `${slug}/index.mdx`),
    path.join(DOCS_DIR, `${slug}.md`),
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        meta: {
          title: data.title || slug,
          description: data.description || "",
          order: data.order || 0,
          slug: slug || "index",
          category: data.category,
        },
        content,
      };
    }
  }

  return null;
}

export function getAllDocs(): DocMeta[] {
  const docs: DocMeta[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
        const raw = fs.readFileSync(fullPath, "utf-8");
        const { data } = matter(raw);
        const slug = getSlugFromPath(fullPath);
        docs.push({
          title: data.title || slug,
          description: data.description || "",
          order: data.order || 99,
          slug,
          category: data.category,
        });
      }
    }
  }

  walk(DOCS_DIR);
  return docs.sort((a, b) => a.order - b.order);
}

export interface DocNav {
  title: string;
  items: { title: string; slug: string }[];
}

export function getDocNavigation(): DocNav[] {
  const docs = getAllDocs();

  const categories: Record<string, { title: string; slug: string }[]> = {};

  for (const doc of docs) {
    const cat = doc.category || "General";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({ title: doc.title, slug: doc.slug });
  }

  const categoryOrder = [
    "General",
    "Features",
    "Integrations",
  ];

  return categoryOrder
    .filter((cat) => categories[cat])
    .map((cat) => ({
      title: cat,
      items: categories[cat],
    }));
}
