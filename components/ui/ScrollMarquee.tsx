"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap-plugins";

interface ScrollMarqueeProps {
  /** The single large text to display */
  text?: string;
  className?: string;
}

/**
 * ScrollMarquee — a single large text string that slides horizontally
 * strictly based on scroll position (to and fro). It does not loop or auto-play.
 */
export function ScrollMarquee({
  text = "From scrolling to stopping.",
  className = "",
}: ScrollMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    // We start the text slightly translated to the right,
    // and as we scroll, we move it significantly to the left.
    const tween = gsap.fromTo(
      textEl,
      { x: "50vw", force3D: true }, // Force GPU acceleration
      {
        x: "-70vw",
        force3D: true,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom", // Starts when top of section hits bottom of viewport
          end: "bottom top",   // Ends when bottom of section hits top of viewport
          scrub: 1,            // 1 second smoothing so it goes to and fro smoothly
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-background py-16 border-y border-white/8 flex items-center justify-center ${className}`}
    >
      <h2
        ref={textRef}
        className="whitespace-nowrap text-brand select-none will-change-transform"
        style={{
          fontSize: "clamp(48px, 10vw, 245.76px)",
          fontWeight: 400,
          letterSpacing: "-0.02em",
        }}
      >
        {text}
      </h2>
    </div>
  );
}

export default ScrollMarquee;
