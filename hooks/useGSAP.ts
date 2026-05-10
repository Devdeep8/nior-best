/**
 * Custom GSAP Hook for React
 * Provides a convenient way to use GSAP with proper cleanup
 */

import { useEffect, useRef, useCallback } from "react";
import { gsap, cleanupScrollTriggers, ScrollTrigger } from "@/lib/gsap-plugins";

interface UseGSAPOptions {
  scope?: HTMLElement | React.RefObject<HTMLElement>;
  revertOnUpdate?: boolean;
}

interface UseGSAPReturn {
  context: gsap.Context;
  refresh: () => void;
  revert: () => void;
}

/**
 * Custom hook for GSAP animations in React components
 * Handles context management and cleanup automatically
 */
export function useGSAP<T extends HTMLElement = HTMLElement>(
  callback: (context: gsap.Context) => void | gsap.Context | (() => void),
  options: UseGSAPOptions = {}
): UseGSAPReturn {
  const { scope, revertOnUpdate = false } = options;
  const contextRef = useRef<gsap.Context | null>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const scopeElement = scope
      ? scope instanceof HTMLElement
        ? scope
        : scope.current
      : undefined;

    // Create GSAP context
    const ctx = gsap.context(() => {
      const result = callbackRef.current(contextRef as any);
      if (typeof result === "function") {
        return result as () => void;
      }
    }, scopeElement);

    contextRef.current = ctx;

    return () => { 
      ctx.revert();
      cleanupScrollTriggers();
    };
  }, [scope, revertOnUpdate]);

  const refresh = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  const revert = useCallback(() => {
    contextRef.current?.revert();
    cleanupScrollTriggers();
  }, []);

  return {
    context: contextRef.current!,
    refresh,
    revert,
  };
}

/**
 * Hook for timeline-based animations with automatic cleanup
 */
export function useGSAPTimeline<T extends HTMLElement = HTMLElement>(
  scope?: HTMLElement | React.RefObject<HTMLElement>
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const timeline = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    timelineRef.current = gsap.timeline({ paused: true });
    return timelineRef.current;
  }, []);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      cleanupScrollTriggers();
    };
  }, [scope]);

  return timeline;
}

/**
 * Hook for animating text with stagger effects
 */
export function useTextAnimation<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T | null> | { current: T | null },
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
  } = {}
) {
  const { duration = 0.8, stagger = 0.1, delay = 0, ease = "power3.out" } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Split text into words
    const words = element.innerText.split(/\s+/);
    element.innerHTML = words
      .map((word) => `<span class="word" style="display: inline-block; opacity: 0; transform: translateY(30px);">${word}</span>`)
      .join(" ");

    const wordElements = element.querySelectorAll<HTMLElement>(".word");

    // Animate words
    const tl = gsap.timeline({
      delay,
      onComplete: () => {
        // Clean up the inline styles after animation
        wordElements.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      },
    });

    tl.to(wordElements, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
    });

    return () => {
      tl.kill();
    };
  }, [ref, duration, stagger, delay, ease]);
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  animation: gsap.TweenVars,
  triggerOptions: gsap.plugins.ScrollTriggerInstanceVars = {}
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { ...animation.from, opacity: animation.from?.opacity ?? 0 },
        {
          ...animation.to,
          opacity: animation.to?.opacity ?? 1,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            ...triggerOptions,
          },
        }
      );
    });

    return () => {
      ctx.revert();
      cleanupScrollTriggers();
    };
  }, [ref, animation, triggerOptions]);
}
