"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { ContactHero } from "@/components/contact/ContactHero";

// Dynamic imports for below-the-fold modules to maximize page load performance
const LocationsSection = dynamic(
  () =>
    import("@/components/contact/LocationsSection").then(
      (m) => m.LocationsSection,
    ),
  { ssr: true },
);
const Footer = dynamic(
  () => import("@/components/footer/Footer").then((m) => m.Footer),
  { ssr: true },
);

// Placeholder for intermediate section still awaiting spec
function PlaceholderSection({ title }: { title: string }) {
  return (
    <div className="w-full py-12 px-4 lg:px-20 border-t border-white/5 opacity-40 flex flex-col gap-4">
      <div className="text-sm uppercase tracking-widest text-[#666]">
        {title}
      </div>
      <div className="h-[1px] bg-white/10 w-full" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black selection:bg-brand/30">
      <Navbar />

      <ContactHero />

      {/* Stub representing intermediate link region */}
      <PlaceholderSection title="Additional Contact Links" />

      <LocationsSection />

      <Footer />
    </main>
  );
}
