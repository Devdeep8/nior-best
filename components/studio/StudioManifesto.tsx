"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MANIFESTO_TEXT =
  "We live at a time when technology is accelerating at an exponential rate, changing the way we live and relate to the world around us. Mixspace Studio operates as a hybrid think tank and design studio. By studying the effects of emerging technologies we envision how forward-thinking companies can thrive amidst exponential change.";

const MUTED = "var(--color-text-muted)";
const LIT = "var(--color-brand)";

type GsapTimeline = ReturnType<typeof gsap.timeline>;

/** Group word-span elements into visual lines by their rounded top offset */
function groupIntoLines(spans: HTMLSpanElement[]): HTMLSpanElement[][] {
  const lines: HTMLSpanElement[][] = [];
  let current: HTMLSpanElement[] = [];
  let lastTop: number | null = null;

  spans.forEach((el) => {
    const top = Math.round(el.getBoundingClientRect().top);
    if (lastTop === null || top !== lastTop) {
      if (current.length > 0) lines.push(current);
      current = [el];
      lastTop = top;
    } else {
      current.push(el);
    }
  });

  if (current.length > 0) lines.push(current);
  return lines;
}

export function StudioManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const tlsRef = useRef<GsapTimeline[]>([]);

  const words = MANIFESTO_TEXT.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    const para = textRef.current;
    if (!section || !para) return;

    // ── Helpers ──────────────────────────────────────────────────────────
    function killLineAnimations() {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
      tlsRef.current.forEach((t) => t.kill());
      tlsRef.current = [];
    }

    // ── Line-by-line scroll animation ────────────────────────────────────
    function buildLineAnimations() {
      killLineAnimations();

      const spans = Array.from(para!.querySelectorAll<HTMLSpanElement>("[data-word]"));

      // Reset to muted using the actual hex so GSAP has a real colour to tween from
      gsap.set(spans, { color: MUTED });

      const lines = groupIntoLines(spans);

      lines.forEach((lineSpans) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: lineSpans[0],
            start: "top center",
            end: "bottom center",
            scrub: 0.6,
          },
        });

        // fromTo with explicit hex colours so GSAP can always interpolate correctly
        tl.fromTo(
          lineSpans,
          { color: MUTED },
          { color: LIT, duration: 0.3, ease: "none" },
          0
        );

        tlsRef.current.push(tl);
      });

      ScrollTrigger.refresh();
    }

    // ── Ghost watermark ──────────────────────────────────────────────────
    const ctx = gsap.context(() => {
      if (ghostRef.current) {
        gsap.fromTo(
          ghostRef.current,
          { opacity: 0 },
          {
            opacity: 0.055,
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "top 20%",
              scrub: 1.5,
            },
          }
        );
        gsap.to(ghostRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: section,
            start: "bottom 80%",
            end: "bottom 10%",
            scrub: 1.5,
          },
        });
      }
    }, section);

    // First build — defer one frame for layout
    const rafId = requestAnimationFrame(() => buildLineAnimations());

    // Rebuild on resize for responsiveness
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => buildLineAnimations());
    });
    ro.observe(para);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      killLineAnimations();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "var(--background)",
        paddingTop: "var(--space-3xl, 180px)",
        paddingBottom: "var(--space-3xl, 180px)",
      }}
    >
      {/* Ghost "Studio" watermark */}
      <div
        ref={ghostRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(120px, 28vw, 420px)",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            lineHeight: 1,
<<<<<<< Updated upstream
            color: "#ffffff",
=======
            color: "#41050c",
>>>>>>> Stashed changes
            whiteSpace: "nowrap",
          }}
        >
          Studio
        </span>
      </div>

      {/* Full-width top border */}
      <div
        className="absolute top-0 left-0 right-0"
<<<<<<< Updated upstream
        style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
=======
        style={{ borderTop: "1px solid rgba(65,5,12,0.10)" }}
>>>>>>> Stashed changes
      />

      {/* Content */}
      <div
        className="relative z-10 mx-auto w-full px-5 sm:px-10"
        style={{ maxWidth: "1100px" }}
      >
        <div style={{ paddingTop: "clamp(60px, 8vw, 120px)" }}>
          <p
            ref={textRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(22px, 3.2vw, 46px)",
              fontWeight: 400,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              textAlign: "center",
              margin: 0,
            }}
          >
            {words.map((word, i) => (
              <span key={i}>
                <span
                  data-word="true"
                  style={{ color: MUTED, display: "inline", transition: "none" }}
                >
                  {word}
                </span>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

export default StudioManifesto;
