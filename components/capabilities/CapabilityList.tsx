"use client";

import { useRef, useEffect } from "react";
import { capabilitiesContent } from "@/content/capabilities";
import { gsap, ScrollTrigger } from "@/lib/gsap-plugins";

interface CapabilityListProps {
  activeCapability: string;
  onCapabilityChange: (id: string) => void;
}

export function CapabilityList({ activeCapability, onCapabilityChange }: CapabilityListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  // Keep the callback in a ref so ScrollTriggers always call the latest
  // version without needing to re-register every time the parent re-renders.
  const onCapabilityChangeRef = useRef(onCapabilityChange);
  useEffect(() => {
    onCapabilityChangeRef.current = onCapabilityChange;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Store item references
    itemsRef.current = Array.from(container.querySelectorAll<HTMLElement>(".capability-item"));

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    // Set up scroll-triggered capability detection
    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          end: "bottom 15%",
          onEnter: () => {
            onCapabilityChangeRef.current(capabilitiesContent.capabilities[index].id);
          },
          onLeaveBack: () => {
            if (index > 0) {
              onCapabilityChangeRef.current(capabilitiesContent.capabilities[index - 1].id);
            }
          },
        })
      );
    });

    // Animate items fading in ONCE — no reverse so it never re-plays on scroll
    const tween = gsap.fromTo(
      itemsRef.current.filter(Boolean),
      {
        opacity: capabilitiesContent.animation.startOpacity,
        y: capabilitiesContent.animation.startY,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: capabilitiesContent.animation.stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: capabilitiesContent.animation.triggerStart,
          // "play none none none" = play once, never reverse/reset
          toggleActions: "play none none none",
          once: true,
        },
      }
    );

    return () => {
      triggers.forEach((t) => t.kill());
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once on mount

  return (
    <div
      ref={containerRef}
      className="flex flex-col"
    >
      {capabilitiesContent.capabilities.map((capability) => (
        <button
          key={capability.id}
          className="capability-item text-left font-medium transition-all duration-200 select-none hover:text-brand"
          style={{
            color: activeCapability === capability.id ? "var(--color-brand)" : "var(--color-text-secondary)",
            fontSize: "clamp(26px, 3.2vw, 64px)",
            lineHeight: 1.18,
            padding: "clamp(18px, 2.5vh, 36px) 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            width: "100%",
          }}
          onMouseEnter={() => onCapabilityChangeRef.current(capability.id)}
          aria-label={capability.name}
        >
          {capability.name}
        </button>
      ))}
    </div>
  );
}

export default CapabilityList;
