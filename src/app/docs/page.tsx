import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { getAllDocs } from "@/lib/content";
import { Card } from "@/components/shared/Card";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Learn how to set up and use Diomande Automation for your team.",
};

export default function DocsIndex() {
  const docs = getAllDocs();

  const categories: Record<string, typeof docs> = {};
  for (const doc of docs) {
    const cat = doc.category || "General";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(doc);
  }

  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-white mb-4">
              Documentation
            </h1>
            <p className="text-lg text-[#a0a0b8] mb-12 max-w-2xl">
              Everything you need to understand, deploy, and operate your Claw
              bot instance.
            </p>

            <div className="space-y-12">
              {Object.entries(categories).map(([category, catDocs]) => (
                <div key={category}>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    {category}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catDocs.map((doc) => (
                      <Link key={doc.slug} href={`/docs/${doc.slug}`}>
                        <Card className="h-full group">
                          <div className="flex items-start gap-3">
                            <FileText className="w-5 h-5 text-[#00d4ff] mt-0.5 shrink-0" />
                            <div>
                              <h3 className="font-medium text-white group-hover:text-[#00d4ff] transition-colors">
                                {doc.title}
                              </h3>
                              {doc.description && (
                                <p className="text-sm text-[#6b6b80] mt-1">
                                  {doc.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
