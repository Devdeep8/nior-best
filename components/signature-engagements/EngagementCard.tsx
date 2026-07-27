"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap-plugins";
import { EngagementItem } from "@/content/signature-engagements";

interface EngagementCardProps {
  engagement: EngagementItem;
  index: number;
}

export function EngagementCard({ engagement, index }: EngagementCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll-in stagger animation
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: (index % 3) * 0.15, // Stagger columns row by row
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-6"
      style={{ opacity: 0 }} // Hidden before GSAP animation
    >
      {/* Media container with hover effects */}
      <div className="group relative w-full aspect-3/2 overflow-hidden rounded-2xl bg-[#111] cursor-pointer">
        {/* Image or Placeholder - scales on hover */}
        {engagement.image ? (
          <Image
            src={engagement.image}
            alt={engagement.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
<<<<<<< Updated upstream
          <div className="absolute inset-0 bg-[#1a1a1a] transition-transform duration-700 ease-out group-hover:scale-105 flex items-center justify-center border border-white/5">
             <span className="text-white/10 font-mono text-sm tracking-widest uppercase">Media Placeholder</span>
=======
          <div className="absolute inset-0 bg-[#41050c]/5 transition-transform duration-700 ease-out group-hover:scale-105 flex items-center justify-center border border-[#41050c]/10">
             <span className="text-[#41050c]/20 font-mono text-sm tracking-widest uppercase">Media Placeholder</span>
>>>>>>> Stashed changes
          </div>
        )}

        {/* Hover "Inquire" Circle */}
        <div className="absolute inset-0 m-auto w-24 h-24 bg-brand rounded-full flex items-center justify-center pointer-events-none opacity-0 scale-50 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100">
          <span className="text-white font-medium text-sm">Inquire</span>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-3 pr-4">
<<<<<<< Updated upstream
        <h3 className="text-white text-2xl font-medium tracking-tight">
          {engagement.title}
        </h3>
        <p className="text-[#666] text-[15px] leading-relaxed font-normal">
=======
        <h3 className="text-[#41050c] text-2xl font-medium tracking-tight">
          {engagement.title}
        </h3>
        <p className="text-[#41050c]/70 text-[15px] leading-relaxed font-normal">
>>>>>>> Stashed changes
          {engagement.description}
        </p>
      </div>
    </div>
  );
}

export default EngagementCard;
