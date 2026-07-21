"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const CARD_WIDTH = 400;
const GAP = 8; // generous gap for spacing

const STATS = [
  {
    id: "01",
    stat: "$3.5M",
    client: "Oh.xyz",
    description: "Oh.xyz went on to raise $3.5M following Mixspace Studio Seed sprint.",
    image: "https://res.cloudinary.com/deepcnbrz/image/upload/v1778653876/coders%20express/673e8e75d3a5a5dba9eb1f5c_Oh.xyz_qkou9n.webp",
    gradient: "linear-gradient(135deg, #0a0a14 0%, #1a0a2e 100%)",
  },
  {
    id: "02",
    stat: "15K",
    client: "Stream",
    description:
      "Animoca backed Stream has acquired 15k new users since we created and launched the brand.",
    image: "https://res.cloudinary.com/deepcnbrz/image/upload/v1778653898/coders%20express/673e8e753711fbda192403ac_Stream_luppxx.webp",
    gradient: "linear-gradient(135deg, #1a0800 0%, #2d1200 100%)",
  },
  {
    id: "03",
    stat: "50K+",
    client: "Ringfence",
    description:
      "Following Mixspace Studio Incubation, AI Platform Ringfence has acquired over 50k waitlist signups.",
    image: "https://res.cloudinary.com/deepcnbrz/image/upload/v1778653875/coders%20express/673e8e75edfc15a41bc6e0d0_Ringfence_l1so8j.webp",
    gradient: "linear-gradient(135deg, #060d1a 0%, #0d1e2e 100%)",
  },
  {
    id: "04",
    stat: "$10M",
    client: "Rayls",
    description:
      "Following Brand Project, Parfin's new product Rayls raised $10M Series A.",
    image: "https://res.cloudinary.com/deepcnbrz/image/upload/v1778653876/coders%20express/673e8e753711fbda19240478_Rayls_jui2an.webp",
    gradient: "linear-gradient(135deg, #1a1400 0%, #2a2200 100%)",
  },
];

// Duplicate for seamless infinite loop
const CARDS = [...STATS, ...STATS];

function ResultCard({ card }: { card: (typeof STATS)[0] }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: `${CARD_WIDTH}px`,
        flexShrink: 0,
        cursor: "pointer",
      }}
    >
      {/* Image area — large, fills top portion */}
      <div
        style={{
          width: "100%",
          height: "clamp(480px, 70vh, 720px)",
          position: "relative",
          overflow: "hidden",
          borderRadius: "0px",
          background: card.gradient,
        }}
      >
        {/* Background image */}
        {!imgError ? (
          <Image
            src={card.image}
            alt={card.client}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
            style={{
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.6s ease",
            }}
          />
        ) : null}

        {/* Dark gradient overlay at bottom for text legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
            zIndex: 1,
          }}
        />

        {/* Stat number overlaid at bottom-left of image */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "24px",
            zIndex: 2,
            fontFamily: "var(--font-body)",
            fontSize: "clamp(56px, 6vw, 80px)",
            fontWeight: 300,
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          {card.stat}
        </div>

      </div>

      {/* Description text below image */}
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          lineHeight: 1.6,
          color: "var(--color-text-secondary)",
          margin: "14px 0 0 0",
          paddingLeft: "0",
          maxWidth: `${CARD_WIDTH}px`,
        }}
      >
        {card.description}
      </p>
    </div>
  );
}

export function StudioResults() {
  const stripRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const loopWidth = (CARD_WIDTH + GAP) * 4;

  useEffect(() => {
    if (!stripRef.current) return;

    tweenRef.current = gsap.to(stripRef.current, {
      x: -loopWidth,
      duration: 24,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [loopWidth]);

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--background)",
        padding: "var(--space-xl, 80px) 0 var(--space-2xl, 120px) 0",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Label */}
      <div
        className="section-container flex items-center gap-3 mb-8"
      >
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            display: "flex",
            gap: "12px",
          }}
        >
          <span style={{ color: "var(--color-text-muted)" }}>[04]</span>
          <span style={{ color: "var(--color-text-secondary)" }}>
            Selected Results
          </span>
        </div>
      </div>

      {/* Scrolling strip */}
      <div
        className="w-full overflow-hidden"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.resume()}
        style={{ paddingLeft: "0" }}
      >
        <div
          ref={stripRef}
          style={{
            display: "flex",
            gap: `${GAP}px`,
            width: "max-content",
          }}
        >
          {CARDS.map((card, i) => (
            <ResultCard key={`${card.id}-${i}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudioResults;
