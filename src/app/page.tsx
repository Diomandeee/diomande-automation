import { Navigation } from "@/components/marketing/Navigation";
import { Hero } from "@/components/marketing/Hero";
import { Gallery } from "@/components/marketing/Gallery";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { Architecture } from "@/components/marketing/Architecture";
import { Pricing } from "@/components/marketing/Pricing";
import { ContactForm } from "@/components/marketing/ContactForm";
import { Footer } from "@/components/marketing/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Gallery />
        <FeatureShowcase />
        <Architecture />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
