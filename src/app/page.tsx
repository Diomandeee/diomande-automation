import { Navigation } from "@/components/marketing/Navigation";
import { Hero } from "@/components/marketing/Hero";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { Architecture } from "@/components/marketing/Architecture";
import { UseCases } from "@/components/marketing/UseCases";
import { Pricing } from "@/components/marketing/Pricing";
import { Testimonials } from "@/components/marketing/Testimonials";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Footer } from "@/components/marketing/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <FeatureShowcase />
        <Architecture />
        <UseCases />
        <Testimonials />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
