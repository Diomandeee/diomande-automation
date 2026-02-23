import type { Metadata } from "next";
import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { ContactForm } from "@/components/marketing/ContactForm";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Join the Diomande community. Get access to production AI infrastructure and start building.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
