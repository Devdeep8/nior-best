"use client";

import { useEffect, useRef, useState } from "react";

export function StudioAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [arrowHovered, setArrowHovered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const heading = headingRef.current;
          if (heading) {
            heading.style.transition =
              "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)";
            heading.style.opacity = "1";
            heading.style.transform = "translateY(0)";
          }

          const para = paragraphRef.current;
          if (para) {
            setTimeout(() => {
              para.style.transition =
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
              para.style.opacity = "1";
              para.style.transform = "translateY(0)";
            }, 200);
          }

          const cta = ctaRef.current;
          if (cta) {
            setTimeout(() => {
              cta.style.transition =
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
              cta.style.opacity = "1";
              cta.style.transform = "translateY(0)";
            }, 380);
          }

          observer.unobserve(section);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{
        backgroundColor: "var(--background)",
        borderTop: "1px solid rgba(65,5,12,0.1)",
      }}
    >
      <div
        className="mx-auto w-full flex flex-col md:flex-row"
        style={{ maxWidth: "1440px" }}
      >
        {/* ── LEFT: narrow label column ── */}
        <div
          className="shrink-0 flex items-start w-full md:w-[clamp(140px,22vw,280px)] px-6 md:px-0 md:pl-[clamp(20px,4vw,60px)] pt-12 md:pt-[clamp(48px,6vw,96px)] pb-4 md:pb-[clamp(48px,6vw,96px)]"
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              color: "var(--color-text-secondary)",
              textTransform: "uppercase" as const,
            }}
          >
            About Mixspace Studio®
          </span>
        </div>

        {/* ── RIGHT: heading + paragraph ── */}
        <div
          className="flex-1 flex flex-col px-6 md:px-0 md:pr-[clamp(20px,4vw,60px)] pt-4 md:pt-[clamp(48px,6vw,96px)] pb-12 md:pb-[clamp(48px,6vw,96px)]"
        >
          {/* Large mixed-weight heading */}
          <h2
            ref={headingRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(36px, 5.5vw, 72px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "#41050c",
              margin: "0 0 clamp(32px, 4vw, 56px) 0",
              maxWidth: "900px",
              opacity: 0,
              transform: "translateY(36px)",
            }}
          >
            {/* Mixed weight — lighter text / bold emphasis / lighter / bold */}
            <span style={{ color: "rgba(65, 5, 12, 0.6)", fontWeight: 300 }}>Mixspace Studio provides </span>
            <span style={{ color: "var(--color-brand)", fontWeight: 700 }}>services globally with its design &amp; development studio </span>
            <span style={{ color: "rgba(65, 5, 12, 0.6)", fontWeight: 300 }}>based in </span>
            <span style={{ color: "var(--color-brand)", fontWeight: 700 }}>Delhi, India.</span>
          </h2>

          {/* Body paragraph */}
          <p
            ref={paragraphRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.2vw, 16px)",
              lineHeight: 1.75,
              color: "var(--color-text-secondary)",
              maxWidth: "600px",
              margin: 0,
              opacity: 0,
              transform: "translateY(24px)",
            }}
          >
            Since 2019, we've helped shape the technology landscape, creating breakthrough brands, products and protocols. We work with brands at the intersection of culture &amp; technology, applying our agile frameworks to sprint-based engagements and long-term partnerships. Founded by technologists, creatives &amp; strategists who have worked for some of the world's biggest brands, we're leveraging our cross-sector experience to create and launch emerging technology brands of the future.
          </p>

          {/* CTA button */}
          <a
            ref={ctaRef}
            href="/contact"
            onMouseEnter={() => setArrowHovered(true)}
            onMouseLeave={() => setArrowHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "36px",
              padding: "14px 28px",
              border: "1px solid rgba(65,5,12,0.15)",
              borderRadius: "100px",
              fontSize: "13px",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              fontFamily: "var(--font-body)",
              color: "#41050c",
              backgroundColor: "transparent",
              cursor: "pointer",
              width: "fit-content",
              opacity: 0,
              transform: "translateY(20px)",
              textDecoration: "none",
            }}
            className="studio-about-cta"
          >
            Book a call
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.3s ease",
                transform: arrowHovered ? "translateX(4px)" : "translateX(0px)",
              }}
            >
              →
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .studio-about-cta {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
        .studio-about-cta:hover {
          background-color: var(--brand) !important;
          color: var(--background) !important;
          border-color: var(--brand) !important;
        }
      `}</style>
    </section>
  );
}

export default StudioAbout;
