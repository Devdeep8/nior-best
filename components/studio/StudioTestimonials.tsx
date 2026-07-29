"use client";

import { useRef, useState } from "react";
import Image from "next/image";

const founders = [
  {
    name: "Anmol Singh Gujral",
    role: "CEO, Mixspace Studio",
    photo: "https://res.cloudinary.com/deepcnbrz/image/upload/v1783598988/6230893929339491087_zq21js.jpg",
    initials: "AS",
    quote:
      "At Mixspace Studio, our vision has always been to bridge creativity with technology, helping businesses build a meaningful digital presence. Every strategy we create is driven by innovation, transparency, and measurable results. Our goal isn't just to deliver services - it's to become a long-term growth partner for every brand that trusts us.",
  },
  {
    name: "Navjyot Singh",
    role: "COO, Mixspace Studio",
    photo: "https://res.cloudinary.com/deepcnbrz/image/upload/v1783598988/6230893929339491086_ehxna8.jpg",
    initials: "NS",
    quote:
      "Operational excellence is the foundation of every successful campaign. As COO, my focus is on building streamlined processes, ensuring seamless execution, and delivering consistent results for our clients. By combining efficient project management with a commitment to quality and collaboration, I strive to transform ideas into impactful outcomes while creating a reliable experience for every brand we work with.",
  },
  {
    name: "Harshita Dewan",
    role: "Creative Director, Mixspace Studio",
    photo: "/images/harshita-dewan.png",
    initials: "HD",
    quote:
      "Great marketing begins with understanding people, not just algorithms. As Creative Director, I focus on building authentic brand stories backed by data-driven strategies that inspire action. From crafting compelling content to designing impactful campaigns, every idea is created with purpose - to help brands connect, engage, and grow in an ever-evolving digital landscape while staying true to their unique identity.",
  },
];

export function StudioTestimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll(".snap-center");
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      if (
        rect.left >= containerRect.left - rect.width / 2 &&
        rect.right <= containerRect.right + rect.width / 2
      ) {
        setActiveIndex(index + 1);
      }
    });
  };

  return (
    <section className="bg-[var(--background)] py-32 border-t border-[#41050c]/10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <h2 className="text-[#41050c] text-[clamp(48px,8vw,96px)] font-normal leading-[1.1] tracking-tight max-w-2xl">
          People Behind the Pixels
        </h2>

        {/* Indicator */}
        <div className="flex items-center gap-4 text-[#41050c]/50 font-mono text-lg pb-4">
          <span className="text-[#41050c]">{activeIndex}</span>
          <span>—</span>
          <span>{founders.length}</span>
        </div>
      </div>

      {/* Draggable/Scrollable container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-4 sm:px-6 lg:px-8 pb-12 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Extra padding div for first item to align with container */}
        <div className="w-[1vw] md:w-[10vw] shrink-0" />

        {founders.map((founder) => (
          <div
            key={founder.name}
            className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] bg-[#41050c] border border-[#f6f5f5]/10 rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[500px]"
          >
            {/* Top row: Avatar & Role */}
            <div className="flex justify-between items-start mb-12">
              <div className="w-24 h-24 rounded-full overflow-hidden relative flex items-center justify-center bg-white/10">
                {founder.photo ? (
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    fill
                    unoptimized
                    sizes="96px"
                    className="object-cover object-top"
                  />
                ) : (
                  <span className="text-[#f6f5f5] text-2xl font-medium tracking-wider">
                    {founder.initials}
                  </span>
                )}
              </div>
              <div className="text-[#f6f5f5]/60 font-semibold tracking-wider uppercase text-sm max-w-[200px] text-right">
                {founder.role}
              </div>
            </div>

            {/* Quote */}
            <p className="text-[#f6f5f5] text-[clamp(18px,2.2vw,28px)] leading-[1.45] font-normal mb-16">
              "{founder.quote}"
            </p>

            {/* Bottom info */}
            <div>
              <p className="text-[#f6f5f5] font-medium text-lg">{founder.name}</p>
              <p className="text-[#f6f5f5]/70 text-sm">{founder.role}</p>
            </div>
          </div>
        ))}

        {/* Extra padding div for last item */}
        <div className="w-[5vw] md:w-[20vw] shrink-0" />
      </div>
    </section>
  );
}

export default StudioTestimonials;
