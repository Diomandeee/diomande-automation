import { notFound } from "next/navigation";
import { getDocBySlug, getDocNavigation, getAllDocs } from "@/lib/content";
import { DocLayout } from "@/components/docs/DocLayout";
import { DocRenderer } from "./DocRenderer";

interface DocPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug.split("/"),
  }));
}

export async function generateMetadata({ params }: DocPageProps) {
  const { slug } = await params;
  const slugStr = slug.join("/");
  const doc = getDocBySlug(slugStr);

  if (!doc) return { title: "Not Found" };

  return {
    title: doc.meta.title,
    description: doc.meta.description,
  };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const slugStr = slug.join("/");
  const doc = getDocBySlug(slugStr);

  if (!doc) notFound();

  const navigation = getDocNavigation();

  return (
    <DocLayout navigation={navigation} currentSlug={slugStr}>
      <h1 className="text-3xl font-bold text-white mb-2">{doc.meta.title}</h1>
      {doc.meta.description && (
        <p className="text-lg text-[#a0a0b8] mb-8">{doc.meta.description}</p>
      )}
      <DocRenderer content={doc.content} />
    </DocLayout>
  );
}
