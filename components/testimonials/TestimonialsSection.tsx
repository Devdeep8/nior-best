"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// avatarBg: "white" | "black" — set to "black" when the logo is white/light on transparent
const testimonials = [
  {
    id: 1,
    quote: "Working with Mixspace Studio has been a great experience for MyBoat Ride. They handled our social media and website efficiently and delivered everything exactly within the promised timeline. The team was responsive, professional, and easy to work with. We're really happy with the quality of work and overall experience.",
    name: "Gurpreet Bakshi",
    company: "Ceo, MyBoatRide",
    avatar: "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871444/coders%20express/company%20logos/7_fgprla.png",
    avatarBg: "white" as const,
  },
  {
    id: 2,
    quote: "Our experience with Mixspace Studio for Macaire's branding and logo design has been excellent. They understood our vision perfectly and created a brand identity that truly reflects our style. The process was smooth, the team was supportive throughout, and the final outcome exceeded our expectations.",
    name: "Harshdeep Singh",
    company: "Founder, Macaire",
    avatar: "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871463/coders%20express/company%20logos/15_glaovk.png",
    avatarBg: "white" as const,
  },
  {
    id: 3,
    quote: "Working with Mixspace Studio for our social media marketing and website development was a smooth and satisfying experience. Their team understood our requirements well, maintained clear communication throughout the process, and delivered quality work on time. We're really happy with the overall results and the support we received.",
    name: "Harsh Tanwar",
    company: "Founder, LevelUpSkool",
    avatar: "https://res.cloudinary.com/deepcnbrz/image/upload/v1783594335/6230893929339491024_kqkyxw.jpg",
    avatarBg: "white" as const,
  },
  {
    id: 4,
    quote: "We had a great experience working with Mixspace Studio for our webinar content. From ideation and creative planning to designing and delivering the final videos, the team handled everything seamlessly. They understood our requirements well, stayed on track with timelines, and delivered engaging content that matched our vision perfectly.",
    name: "Aman Singh",
    company: "CEO, Feed Sync",
    avatar: "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871443/coders%20express/company%20logos/6_jflud9.png",
    avatarBg: "black" as const, // white logo — needs dark background
  },
  {
    id: 5,
    quote: "Working with Mixspace Studio for our social media management and marketing has been a wonderful experience. From editing impactful videos to handling our digital presence, the team has been dedicated and professional throughout. They understand our vision, maintain consistency, and have helped us communicate our message effectively across platforms.",
    name: "Hardayal Singh",
    company: "Founder, United Sikhs",
    avatar: "https://res.cloudinary.com/deepcnbrz/image/upload/v1783597694/6230893929339491072_t2ayvr.jpg",
    avatarBg: "white" as const,
  },
  {
    id: 6,
    quote: "Working with Mixspace Studio for our social media management has been a great experience. From handling shoots and content ideation to managing our overall social presence, the team has been creative, proactive, and consistent. They understand our brand well and always come up with fresh ideas that align with our vision.",
    name: "Kabir Sawhney",
    company: "Co-founder, torque & gear",
    avatar: "https://res.cloudinary.com/deepcnbrz/image/upload/v1783594336/6230893929339491025_d4g6m2.jpg",
    avatarBg: "black" as const,
  },
];

export function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  // Update active index based on scroll position
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.clientWidth; // Assuming cards are roughly 100vw or we can estimate
    // A more accurate way:
    const cards = container.querySelectorAll('.snap-center');
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      // If the center of the card is within the center of the container
      if (
        rect.left >= containerRect.left - rect.width / 2 &&
        rect.right <= containerRect.right + rect.width / 2
      ) {
        setActiveIndex(index + 1);
      }
    });
  };

  return (
    <section className="bg-[var(--background)] py-32 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <h2 className="text-white text-[clamp(48px,8vw,96px)] font-normal leading-[1.1] tracking-tight max-w-2xl">
          Our Testimonials
        </h2>

        {/* Indicator */}
        <div className="flex items-center gap-4 text-[#555] font-mono text-lg pb-4">
          <span className="text-white">{activeIndex}</span>
          <span>—</span>
          <span>{testimonials.length}</span>
        </div>
      </div>

      {/* Draggable/Scrollable container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar px-4 sm:px-6 lg:px-8 pb-12 cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Extra padding div for first item to align with container */}
        <div className="w-[1vw] md:w-[10vw] shrink-0" />

        {testimonials.map((t) => (
          <div
            key={t.id}
            className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] bg-[#41050c] border border-[#cecccc]/10 rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[500px]"
          >
            {/* Top row: Avatar placeholder & Logo placeholder */}
            <div className="flex justify-between items-start mb-12">
              <div
                className="w-24 h-24 rounded-full overflow-hidden relative flex items-center justify-center"
                style={{ background: t.avatarBg === "black" ? "#111" : "#ffffff" }}
              >
                {/* Avatar / Logo */}
                {t.avatar && (
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    unoptimized
                    sizes="80px"
                    className="object-contain"
                  />
                )}
              </div>
              <div className="text-[#cecccc]/60 font-semibold tracking-wider uppercase text-sm">
                {t.company}
              </div>
            </div>

            {/* Quote */}
            <p className="text-[#cecccc] text-[clamp(20px,2.5vw,32px)] leading-[1.3] font-normal mb-16">
              "{t.quote}"
            </p>

            {/* Bottom info */}
            <div>
              <p className="text-[#cecccc] font-medium text-lg">{t.name}</p>
              <p className="text-[#cecccc]/70 text-sm">{t.company}</p>
            </div>
          </div>
        ))}

        {/* Extra padding div for last item */}
        <div className="w-[5vw] md:w-[20vw] shrink-0" />
      </div>
    </section>
  );
}

export default TestimonialsSection;
