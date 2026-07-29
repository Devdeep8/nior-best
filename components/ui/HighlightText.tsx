"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-plugins";

interface Segment {
  text: string;
  highlight: boolean;
}

interface HighlightTextProps {
  segments: Segment[];
  className?: string;
}

/**
 * HighlightText — renders a paragraph where specific phrases are
 * white + medium weight while the rest is muted gray.
 * Animates words in on scroll (once, no reverse).
 */
export function HighlightText({ segments, className = "" }: HighlightTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>(".ht-word"));

    // Start hidden
    gsap.set(spans, { opacity: 0, y: 16 });

    const tween = gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.025,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // Split each segment into words so we can stagger per-word
  const rendered = segments.map((seg, si) => {
    const words = seg.text.split(/(\s+)/);
    return words.map((word, wi) => {
      if (word === "" ) return null;
      // Preserve spaces as plain spans so layout isn't disturbed
      if (/^\s+$/.test(word)) {
        return (
          <span key={`${si}-${wi}`} aria-hidden="true">
            {word}
          </span>
        );
      }
      return (
        <span
          key={`${si}-${wi}`}
          className="ht-word inline-block"
          style={{
            color: seg.highlight ? "var(--color-brand)" : "var(--color-text-muted)",
            fontWeight: seg.highlight ? 500 : 400,
          }}
        >
          {word}
        </span>
      );
    });
  });

  return (
    <p
      ref={containerRef}
      className={`leading-[1.3] ${className}`}
    >
      {rendered}
    </p>
  );
}

export default HighlightText;
