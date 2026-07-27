"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { StudioHeroHeading } from "./StudioHeroHeading";
import { StudioHeroScrollIndicator } from "./StudioHeroScrollIndicator";
import { recentWorkContent } from "@/content/recent-work";

export function StudioHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Get the first 4 images from recent work
  const images = recentWorkContent.projects.slice(0, 4);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    // Entrance animation
    const entranceTl = gsap.timeline({ delay: 0.1 });
    
    entranceTl.to(".hero-top-label", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
    }, 0.2);

    entranceTl.to(".hero-heading-line", {
      y: 0,
      opacity: 1,
      duration: 1.0,
      ease: "power4.out",
    }, 0.4);

    entranceTl.to(".hero-scroll-indicator", {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    }, 1.1);

    // ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000", // Length of the scroll animation
        pin: true,
        scrub: 1, // Smooth scrubbing
      }
    });

    // Dim the background text slightly as we scroll
    tl.to(".studio-bg-container", {
      opacity: 0.2,
      duration: 0.5,
      ease: "power1.inOut"
    }, 0);

    // Animate each image sliding up and stacking
    imagesRef.current.forEach((img, index) => {
      if (!img) return;
      
      // Each image comes from below
      tl.fromTo(img, 
        { y: "120vh", opacity: 0, scale: 0.8 }, 
        { 
          y: "0vh", 
          opacity: 1, 
          scale: 1,
          duration: 1.5, 
          ease: "power2.out" 
        }, 
        // Start time staggered
        index * 1.5
      );
      
      // If it's not the last image, slightly scale it down and darken when the next one comes
      if (index < imagesRef.current.length - 1) {
        tl.to(img, {
          scale: 0.92 - (index * 0.02),
          filter: "brightness(0.5)",
          y: `-${(index + 1) * 2}vh`,
          duration: 1.5,
          ease: "power2.out"
        }, (index + 1) * 1.5);
      }
    });

    return () => {
      entranceTl.kill();
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-black pt-[64px]"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div ref={pinRef} className="relative w-full h-screen overflow-hidden flex flex-col justify-center">
        {/* Top Text Row */}
        <div className="absolute top-[80px] left-[20px] md:left-[40px] right-[20px] md:right-[40px] flex justify-between pointer-events-none z-20">
          <span className="hero-top-label opacity-0 translate-y-[10px] text-[13px] uppercase tracking-[0.1em] text-[#41050c]/70" style={{ fontFamily: "var(--font-body)" }}>
            Think Tank
          </span>
          <span className="hero-top-label opacity-0 translate-y-[10px] text-[13px] uppercase tracking-[0.1em] text-[#41050c]/70" style={{ fontFamily: "var(--font-body)" }}>
            Est. 2019
          </span>
          <span className="hero-top-label opacity-0 translate-y-[10px] text-[13px] uppercase tracking-[0.1em] text-[#41050c]/70 hidden md:block" style={{ fontFamily: "var(--font-body)" }}>
            Creative Studio
          </span>
        </div>

        {/* Center Background Content */}
        <div className="studio-bg-container absolute inset-0 flex flex-col justify-center items-center z-10 w-full pointer-events-none">
          <StudioHeroHeading />
        </div>

        {/* Foreground Stacked Images */}
        <div className="absolute inset-0 flex justify-center items-center z-30 pointer-events-none perspective-[1000px]">
          {images.map((project, idx) => (
            <div 
              key={idx}
              ref={(el) => { imagesRef.current[idx] = el; }}
              className="absolute w-[90vw] md:w-[65vw] max-w-[900px] aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden shadow-2xl border border-[#41050c]/10"
              style={{ 
                transform: "translateY(120vh) scale(0.8)", 
                opacity: 0,
                zIndex: 30 + idx
              }}
            >
              <Image 
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40">
          <StudioHeroScrollIndicator />
        </div>
      </div>
    </section>
  );
}

export default StudioHero;
