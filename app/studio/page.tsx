"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { StudioHero } from "@/components/studio/StudioHero";

// Dynamic imports for below-the-fold sections to optimize initial bundle size & performance
const StudioManifesto = dynamic(
  () =>
    import("@/components/studio/StudioManifesto").then(
      (m) => m.StudioManifesto,
    ),
  { ssr: true },
);
const StudioReel = dynamic(
  () => import("@/components/studio/StudioReel").then((m) => m.StudioReel),
  { ssr: true },
);
const StudioAbout = dynamic(
  () => import("@/components/studio/StudioAbout").then((m) => m.StudioAbout),
  { ssr: true },
);
const StudioClients = dynamic(
  () =>
    import("@/components/studio/StudioClients").then((m) => m.StudioClients),
  { ssr: true },
);
const StudioServices = dynamic(
  () =>
    import("@/components/studio/StudioServices").then((m) => m.StudioServices),
  { ssr: true },
);
const StudioStatement = dynamic(
  () =>
    import("@/components/studio/StudioStatement").then(
      (m) => m.StudioStatement,
    ),
  { ssr: true },
);
const ScrollMarquee = dynamic(
  () => import("@/components/ui/ScrollMarquee").then((m) => m.ScrollMarquee),
  { ssr: true },
);
const StudioTestimonials = dynamic(
  () =>
    import("@/components/studio/StudioTestimonials").then(
      (m) => m.StudioTestimonials,
    ),
  { ssr: true },
);
const BookCallSection = dynamic(
  () =>
    import("@/components/book-call/BookCallSection").then(
      (m) => m.BookCallSection,
    ),
  { ssr: true },
);
const Footer = dynamic(
  () => import("@/components/footer/Footer").then((m) => m.Footer),
  { ssr: true },
);

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

      <StudioStatement />

      <ScrollMarquee text="Hear from founders." />

      <StudioTestimonials />

      <BookCallSection />

      <Footer />
    </main>
  );
}
