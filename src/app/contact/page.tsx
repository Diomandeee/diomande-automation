import type { Metadata } from "next";
import { Navigation } from "@/components/marketing/Navigation";
import { Footer } from "@/components/marketing/Footer";
import { ContactForm } from "@/components/marketing/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free consultation to discuss deploying AI task automation for your team.",
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
