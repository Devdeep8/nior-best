"use client";

import { useRef, useEffect, useState } from "react";
import { textRevealContent } from "@/content/text-reveal";
import { gsap, ScrollTrigger } from "@/lib/gsap-plugins";

// Spotlight Card sub-component for beautiful hover glow
function SpotlightCard({
  id,
  title,
  subtitle,
}: {
  id: string;
  title: string;
  subtitle: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="tagline-item group relative overflow-hidden rounded-2xl border transition-all duration-700 flex flex-col justify-between min-h-[200px] sm:min-h-[240px] p-6 sm:p-8 lg:p-10 cursor-default w-full max-w-sm md:max-w-none mx-auto backdrop-blur-sm border-[#cecccc]/10 bg-[#41050c] hover:border-[#cecccc]/30 hover:bg-[#41050c]/90 hover:scale-[1.02] hover:-translate-y-2"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Interactive Spotlight Glow — only on hover */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(206, 204, 204, 0.08), transparent 40%)`,
        }}
      />

      {/* Secondary colored glow — only on hover */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl transition-opacity duration-700 z-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(206, 204, 204, 0.12), transparent 60%)`,
        }}
      />

      {/* Top Section: ID Badge */}
      <div className="relative z-10 flex justify-between items-start w-full mb-6 sm:mb-8">
        <span className="font-mono text-sm tracking-wider transition-colors duration-500 text-[#cecccc]/60 group-hover:text-[#cecccc]">
          [{id}]
        </span>

        {/* Decorative small corner graphic */}
        <div className="w-2 h-2 border-t border-r transition-colors duration-500 border-[#cecccc]/20 group-hover:border-[#cecccc]/60" />
      </div>

      {/* Center Section: Typography */}
      <div className="relative z-10 flex flex-col items-start w-full select-none">
        <h3 className="text-2xl sm:text-3xl lg:text-[1.75rem] xl:text-[2.5rem] font-semibold tracking-tight lg:tracking-tighter text-[#cecccc] overflow-hidden relative pb-1 w-full">
          {/* Double layered text effect — hover only */}
          <span className="inline-block transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] whitespace-nowrap group-hover:-translate-y-full group-hover:opacity-0">
            {title}
          </span>
          <span className="absolute left-0 top-0 inline-block transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] text-[#cecccc] whitespace-nowrap translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            {title}
          </span>
        </h3>

        <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-normal leading-relaxed max-w-[240px] transform transition-all duration-500 text-[#cecccc] opacity-80 group-hover:opacity-100">
          {subtitle}
        </p>
      </div>

      {/* Bottom accent bar — hover only */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#cecccc] to-transparent transition-transform duration-700 origin-center z-20 scale-x-0 group-hover:scale-x-100" />
    </div>
  );
}

export function TaglineContainers() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".tagline-item");

    // GSAP Reveal Animation only — no auto-cycling highlight
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom", // fire as soon as cards enter the viewport
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      items,
      {
        opacity: 0,
        y: 30,
        scale: 0.97,
        rotationX: 8,
        force3D: true
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        force3D: true,
        duration: 0.9,
        stagger: 0.12,
        delay: 0,
        ease: "power3.out",
        clearProps: "transform",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-full mt-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto" style={{ perspective: "1000px" }}>
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center w-full"
      >
        {textRevealContent.taglines.items.map((tagline) => (
          <SpotlightCard
            key={tagline.id}
            id={tagline.id}
            title={tagline.title}
            subtitle={tagline.subtitle}
          />
        ))}
      </div>
    </div>
  );
}

export default TaglineContainers;
