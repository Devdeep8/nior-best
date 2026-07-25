"use client";

import { InfiniteMarquee } from "@/components/InfiniteMarquee";

const row1Tags = [
  "Brand Strategy",
  "Brand Identity & Positioning",
  "UX/UI Design",
  "Website Design & Development",
  "Website Management",
  "Content Strategy",
  "Content Creation",
  "Product Shoot & Photography"
];

const row2Tags = [
  "Search Engine Optimisation",
  "Social Media Management & Marketing",
  "Performance Marketing",
  "Meta Ads",
  "Lead Generation Campaigns",
  "Influencer Marketing",
  "Email Marketing",
  "Whatsapp Marketing"
];

export function CapabilitiesMarquee() {
  const renderTag = (text: string, index: number) => (
    <div
      key={`${text}-${index}`}
      className="group px-6 py-3.5 sm:px-8 sm:py-4 rounded-full border border-[#41050c]/10 bg-[#cecccc] backdrop-blur-xs flex items-center justify-center transition-all duration-300 hover:border-[#404040] hover:bg-[#404040] cursor-default"
    >
      <span className="text-[#41050c] font-medium tracking-wide text-sm sm:text-base md:text-lg transition-colors duration-300 group-hover:text-[#f6f5f5]">
        {text}
      </span>
    </div>
  );

  return (
    <section className="bg-[var(--background)] py-16 sm:py-24 overflow-hidden border-t border-b border-white/5 relative">
      <div className="flex flex-col gap-6 sm:gap-8 relative w-full">
        {/* Subtle left and right fade effects */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[var(--background)] via-[var(--background)]/80 to-transparent z-10 pointer-events-none" />

        {/* First row moving left */}
        <InfiniteMarquee
          items={row1Tags.map((tag, i) => renderTag(tag, i))}
          direction="left"
          speed={35}
        />

        {/* Second row moving right */}
        <InfiniteMarquee
          items={row2Tags.map((tag, i) => renderTag(tag, i))}
          direction="right"
          speed={38}
        />
      </div>
    </section>
  );
}

export default CapabilitiesMarquee;
