import Link from "next/link";
import { Navigation } from "@/components/marketing/Navigation";
import { TableOfContents } from "./TableOfContents";
import type { DocNav } from "@/lib/content";

interface DocLayoutProps {
  navigation: DocNav[];
  currentSlug: string;
  children: React.ReactNode;
}

export function DocLayout({ navigation, currentSlug, children }: DocLayoutProps) {
  return (
    <>
      <Navigation />
      <div className="pt-16 min-h-screen flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-white/5 p-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <Link
            href="/docs"
            className="text-sm font-semibold text-white mb-6 block"
          >
            Documentation
          </Link>
          <nav className="space-y-6">
            {navigation.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold text-[#6b6b80] uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/docs/${item.slug}`}
                        className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${
                          currentSlug === item.slug
                            ? "text-[#00d4ff] bg-[#00d4ff]/10"
                            : "text-[#a0a0b8] hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content + TOC */}
        <div className="flex-1 flex max-w-5xl mx-auto px-6 py-12 gap-8">
          <article className="flex-1 min-w-0 doc-content prose-invert">
            {children}
          </article>
          <TableOfContents />
        </div>
      </div>
    </>
  );
}
