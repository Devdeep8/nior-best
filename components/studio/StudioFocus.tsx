"use client";

import { useEffect, useRef, useState } from "react";

const INDUSTRIES = [
  {
    id: "web3",
    name: "Web3",
    color: "#ff6b35",
    videoSrc:
      "https://cdn.prod.website-files.com/66855a8fb48b8d40d74e0d01%2F6749f304563a09ff2ebbfb51_01%20Strategy-transcode.mp4",
    bg: "#1a0800",
  },
  {
    id: "defi",
    name: "DeFi",
    color: "#ff8c42",
    videoSrc:
      "https://cdn.prod.website-files.com/66855a8fb48b8d40d74e0d01%2F6749f3c66fef3112b6a8d9a1_05%20Web-transcode.mp4",
    bg: "#180500",
  },
  {
    id: "finance",
    name: "Finance",
    color: "#c8a97e",
    videoSrc:
      "https://cdn.prod.website-files.com/66855a8fb48b8d40d74e0d01%2F675226adf3702bd049989fd3_04%20UX%20UI-transcode.mp4",
    bg: "#0a0f1a",
  },
  {
    id: "ai",
    name: "AI",
    color: "#7eb8c8",
    videoSrc:
      "https://cdn.prod.website-files.com/66855a8fb48b8d40d74e0d01%2F6749f4d2ef445b2b7591c4c5_08%20Content-transcode.mp4",
    bg: "#060d14",
  },
  {
    id: "blockchain",
    name: "Blockchain",
    color: "#a78bfa",
    videoSrc:
      "https://cdn.prod.website-files.com/66855a8fb48b8d40d74e0d01%2F6749f40a01bac18bcf639e9a_10%20Ads-transcode.mp4",
    bg: "#0a0514",
  },
  {
    id: "robotics",
    name: "Robotics",
    color: "#6ee7b7",
    videoSrc:
      "https://cdn.prod.website-files.com/66855a8fb48b8d40d74e0d01%2F6752269d774a939460393441_03%20Product-transcode.mp4",
    bg: "#031209",
  },
  {
    id: "saas",
    name: "SaaS",
    color: "#93c5fd",
    videoSrc:
      "https://cdn.prod.website-files.com/66855a8fb48b8d40d74e0d01%2F6749f304563a09ff2ebbfb51_01%20Strategy-transcode.mp4",
    bg: "#04080f",
  },
  {
    id: "gaming",
    name: "Gaming",
    color: "#f472b6",
    videoSrc:
      "https://cdn.prod.website-files.com/66855a8fb48b8d40d74e0d01%2F6749f4d2ef445b2b7591c4c5_08%20Content-transcode.mp4",
    bg: "#140820",
  },
  {
    id: "space",
    name: "Space",
    color: "#e0e0ff",
    videoSrc:
      "https://cdn.prod.website-files.com/66855a8fb48b8d40d74e0d01%2F675226adf3702bd049989fd3_04%20UX%20UI-transcode.mp4",
    bg: "#04040f",
  },
  {
    id: "vrar",
    name: "VR / AR",
    color: "#fbbf24",
    videoSrc:
      "https://cdn.prod.website-files.com/66855a8fb48b8d40d74e0d01%2F6749f3c66fef3112b6a8d9a1_05%20Web-transcode.mp4",
    bg: "#140f00",
  },
  {
    id: "energy",
    name: "Energy",
    color: "#4ade80",
    videoSrc:
      "https://cdn.prod.website-files.com/66855a8fb48b8d40d74e0d01%2F6749f40a01bac18bcf639e9a_10%20Ads-transcode.mp4",
    bg: "#031408",
  },
];

export function StudioFocus() {
  const [activeId, setActiveId] = useState("defi");
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const active = INDUSTRIES.find((i) => i.id === activeId) ?? INDUSTRIES[1];

  // Scroll reveal
  useEffect(() => {
    const els = [headerRef.current, leftRef.current, rightRef.current].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => {
            if (headerRef.current) {
              headerRef.current.style.transition = "opacity 0.7s ease, transform 0.7s ease";
              headerRef.current.style.opacity = "1";
              headerRef.current.style.transform = "translateY(0)";
            }
            setTimeout(() => {
              if (leftRef.current) {
                leftRef.current.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
                leftRef.current.style.opacity = "1";
                leftRef.current.style.transform = "translateX(0)";
              }
              if (rightRef.current) {
                rightRef.current.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
                rightRef.current.style.opacity = "1";
                rightRef.current.style.transform = "translateX(0)";
              }
            }, 150);
          }, 0);
          observer.disconnect();
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{
        backgroundColor: "var(--background)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "var(--space-xl, 80px) 0 var(--space-2xl, 120px) 0",
      }}
    >
      <div className="section-container">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex items-center gap-3 mb-12"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0,
            transform: "translateY(-12px)",
          }}
        >
          <span style={{ color: "var(--color-text-muted)" }}>[04]</span>
          <span style={{ color: "var(--color-text-secondary)" }}>Area of Focus</span>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

          {/* LEFT — image panel container (Pure Sticky context) */}
          <div
            className="w-full md:w-[clamp(280px,38%,520px)] md:shrink-0 md:sticky md:top-[120px] z-10"
          >
            {/* Inner Reveal Wrapper (Handles transforms and opacity isolation) */}
            <div
              ref={leftRef}
              style={{
                opacity: 0,
                transform: "translateX(-40px)",
                width: "100%",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: "12px",
                  overflow: "hidden",
                  backgroundColor: active.bg,
                  transition: "background-color 0.4s ease",
                }}
              >
                {/* Video layers — crossfade */}
                {INDUSTRIES.map((ind) => (
                  <video
                    key={ind.id}
                    src={ind.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: activeId === ind.id ? 1 : 0,
                      transition: "opacity 0.5s ease",
                      zIndex: activeId === ind.id ? 2 : 1,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — industry name list */}
          <div
            ref={rightRef}
            style={{
              flex: 1,
              opacity: 0,
              transform: "translateX(40px)",
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {INDUSTRIES.map((ind) => {
                const isActive = activeId === ind.id;
                return (
                  <li
                    key={ind.id}
                    onMouseEnter={() => setActiveId(ind.id)}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(36px, 5.5vw, 72px)",
                      fontWeight: isActive ? 500 : 400,
                      lineHeight: 1.1,
                      letterSpacing: "-0.025em",
                      color: isActive ? "var(--color-brand)" : "rgba(255,255,255,0.18)",
                      cursor: "pointer",
                      transition: "color 0.25s ease, font-weight 0.25s ease",
                      padding: "clamp(20px, 2.5vh, 40px) 0",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                      userSelect: "none",
                    }}
                  >
                    {ind.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudioFocus;
