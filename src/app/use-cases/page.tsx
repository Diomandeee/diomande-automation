import type { Metadata } from "next";
import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { UseCases } from "@/components/marketing/UseCases";
import { ContactForm } from "@/components/marketing/ContactForm";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "See how engineering teams, DevOps, and research organizations use Diomande Automation to scale their operations.",
};

export default function UseCasesPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Real Workloads, Real Results
            </h1>
            <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto">
              From code review to deployment automation — see how teams use
              distributed AI execution to ship faster.
            </p>
          </div>
        </section>
        <UseCases />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
