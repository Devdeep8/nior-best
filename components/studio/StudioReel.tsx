"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

const VIDEO_URL =
  "https://res.cloudinary.com/deepcnbrz/video/upload/v1778650111/coders%20express/ffeca7bb_mue19m.mp4";

export function StudioReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    // Scale-in scroll animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { scale: 0.92, borderRadius: "24px" },
        {
          scale: 1.0,
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 20%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    // IntersectionObserver: autoplay when visible, pause when out of view
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(video);

    return () => {
      ctx.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "var(--background)",
        padding: "var(--space-2xl, 120px) 0",
      }}
    >
      {/* Label */}
      <p
        className="text-center mb-6 tracking-[0.15em] uppercase select-none"
        style={{
          fontSize: "11px",
          color: "var(--color-text-muted)",
          fontFamily: "var(--font-body)",
        }}
      >
        — Showreel 2024 —
      </p>

      {/* Full-width video container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "16/9",
          backgroundColor: "#111111",
          borderRadius: "0px",
          transformOrigin: "center center",
        }}
      >
        {/* Shimmer skeleton shown before video loads */}
        <div
          className="absolute inset-0 z-0 studio-reel-shimmer"
          style={{ backgroundColor: "#111111" }}
        />

        {/* Video */}
        <video
          ref={videoRef}
          src={VIDEO_URL}
          className="absolute inset-0 w-full h-full object-cover z-10"
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>
    </section>
  );
}

export default StudioReel;
