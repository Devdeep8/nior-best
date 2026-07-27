"use client";

import { useState, useEffect, useRef } from "react";
import { CapabilityVisual } from "./CapabilityVisual";
import { CapabilityList } from "./CapabilityList";
import { capabilitiesContent } from "@/content/capabilities";
import { SectionLabels } from "@/components/about-us/SectionLabels";
import { gsap, ScrollTrigger } from "@/lib/gsap-plugins";

export function CapabilitiesSection() {
  const [activeCapability, setActiveCapability] = useState(
    capabilitiesContent.visual.defaultCapability
  );
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top bottom", // Enter when top enters viewport bottom
      end: "bottom top",   // Exit when bottom leaves viewport top
      onToggle: (self) => setIsVisible(self.isActive),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="capabilities" className="relative bg-black">
      {/* Header — full-width with side padding */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        <SectionLabels {...capabilitiesContent.label} />
      </div>

      {/*
        Two-column row.
        - Left: sticky container centered around 120px top offset for parity with studio.
        - Right: flexible scrollable space.
      */}
      <div className="flex w-full flex-col lg:flex-row lg:items-start gap-12 lg:gap-16 px-4 sm:px-6 lg:px-8 mt-12 pb-24">

        {/* ── LEFT: locked image panel ── */}
        <div className="hidden lg:block lg:w-[clamp(280px,42%,640px)] lg:shrink-0 lg:sticky lg:top-[120px] z-10">
          <div className="h-[55vh] w-full overflow-hidden rounded-2xl">
            <CapabilityVisual activeCapability={activeCapability} />
          </div>
        </div>

        {/* Mobile: Floating Video locked to bottom-right when section is active */}
        <div
<<<<<<< Updated upstream
          className={`fixed bottom-6 right-4 z-40 w-44 sm:w-52 aspect-[4/3] overflow-hidden rounded-xl shadow-2xl border border-white/20 transition-all duration-500 transform lg:hidden ${
=======
          className={`fixed bottom-6 right-4 z-40 w-44 sm:w-52 aspect-[4/3] overflow-hidden rounded-xl shadow-2xl border border-[#41050c]/25 transition-all duration-500 transform lg:hidden ${
>>>>>>> Stashed changes
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95 pointer-events-none"
          }`}
        >
          <CapabilityVisual activeCapability={activeCapability} />
        </div>

        {/* ── RIGHT: scrollable list ── */}
        <div className="w-full lg:flex-1 mt-8 lg:mt-0">
          <CapabilityList
            activeCapability={activeCapability}
            onCapabilityChange={setActiveCapability}
          />
        </div>
      </div>
    </section>
  );
}

export default CapabilitiesSection;
