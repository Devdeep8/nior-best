"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/footer/Footer";
import { StudioHero, StudioManifesto, StudioReel, StudioAbout, StudioClients, StudioServices, StudioResults, StudioStatement, StudioTeam, StudioModel, StudioFocus } from "@/components/studio";
import { ScrollMarquee } from "@/components/ui/ScrollMarquee";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { BookCallSection } from "@/components/book-call/BookCallSection";

export default function StudioPage() {
  return (
    <main className="min-h-screen bg-black selection:bg-brand/30">
      <Navbar />

      <StudioHero />

      <StudioManifesto />

      <StudioReel />

      <StudioAbout />

      <StudioClients />

      <StudioServices />

      {/* <StudioResults /> */}

      <StudioStatement />

      <StudioTeam />

      {/* <StudioModel /> */}

      {/* <StudioFocus /> */}

      <ScrollMarquee text="Hear from founders." />

      <TestimonialsSection />

      <BookCallSection />

      <Footer />
    </main>
  );
}
