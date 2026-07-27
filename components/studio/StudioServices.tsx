"use client";

import { useState } from "react";

const SERVICES = [
  {
    id: "01",
    name: "Strategy",
    description:
      "We distill the complex. Defining a brand strategy and big idea that is unique to you.",
    items: [
      "Research & Insights",
      "Stakeholder Interviews",
      "Brand Narrative & Naming",
      "Positioning & Messaging",
      "Brand Architecture",
      "Brand Strategy",
    ],
  },
  {
    id: "02",
    name: "Branding",
    description:
      "We craft distinctive visual identities that communicate your brand's values and create lasting impressions.",
    items: [
      "Visual Brand Identity",
      "Brand Guidelines",
      "Brand Design System",
      "3D, Animation & Motion",
      "Pitch Deck / Assets",
      "Brand Video",
    ],
  },
  {
    id: "03",
    name: "Web / Product Design",
    description:
      "We design intuitive digital products and high-performance websites that convert visitors into customers.",
    items: [
      "Website & Product Design",
      "App / dApp Design",
      "UX / UI Design",
      "Webflow Development",
      "API / Wallet Connect",
      "React / Java / Typescript",
    ],
  },
  {
    id: "04",
    name: "Marketing",
    description:
      "We build growth engines using data-driven strategies that drive measurable results across every channel.",
    items: [
      "Paid Media / Social",
      "Performance Creative",
      "Email Marketing",
      "CRO / SEO",
      "Content Strategy",
      "Advertising & OOH",
    ],
  },
];

// Plus / Minus SVG icon
function ToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      style={{
        width: "28px",
        height: "28px",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Horizontal bar — always visible */}
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "rgba(65,5,12,0.6)",
          transform: "translateY(-50%)",
          transition: "transform 0.3s ease",
        }}
      />
      {/* Vertical bar — hidden when open (becomes minus) */}
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "1px",
          backgroundColor: "rgba(65,5,12,0.6)",
          transform: `translateX(-50%) scaleY(${isOpen ? 0 : 1})`,
          transition: "transform 0.3s ease",
        }}
      />
    </div>
  );
}

function ServiceRow({
  service,
  isOpen,
  onToggle,
}: {
  service: (typeof SERVICES)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(65,5,12,0.1)",
        cursor: "pointer",
      }}
      onClick={onToggle}
    >
      {/* Always-visible collapsed bar: Name + Icon */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "28px 0" }}
      >
        <h3
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(20px, 2.8vw, 36px)",
            fontWeight: 400,
            color: "#41050c",
            margin: 0,
            letterSpacing: "-0.015em",
          }}
        >
          {service.name}
        </h3>
        <ToggleIcon isOpen={isOpen} />
      </div>

      {/* Expanded: 3-column horizontal row (stacks on mobile) */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[40px]"
        style={{
          maxHeight: isOpen ? "600px" : "0px", // slightly higher for mobile stacked content
          overflow: "hidden",
          opacity: isOpen ? 1 : 0,
          transition:
            "max-height 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
          paddingBottom: isOpen ? "40px" : "0px",
        }}
      >
        {/* Col 1: Empty (hidden on mobile, aligns with name above on desktop) */}
        <div className="hidden md:block" />

        {/* Col 2: Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(13px, 1.2vw, 15px)",
            lineHeight: 1.7,
            color: "rgba(65,5,12,0.6)",
            margin: 0,
          }}
        >
          {service.description}
        </p>

        {/* Col 3: Items list */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {service.items.map((item, i) => (
            <li
              key={i}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                lineHeight: 2,
                color: "#41050c",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function StudioServices() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--background)",
        borderTop: "1px solid rgba(65,5,12,0.1)",
        padding: "var(--space-xl, 80px) 0 var(--space-2xl, 120px) 0",
      }}
    >
      <div className="section-container">
        {/* Section header row — stacks on mobile, 3 col grid on desktop */}
        <div
          className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-[40px] mb-10"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <div className="flex items-center gap-3">
            <span style={{ color: "var(--color-text-muted)" }}>[02]</span>
            <span style={{ color: "var(--color-text-secondary)" }}>
              What We Do
            </span>
          </div>
          <div className="hidden md:block" /> {/* empty middle col */}
          <div className="hidden md:block" /> {/* empty right col */}
        </div>

        {/* Accordion rows */}
        <div>
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.id}
              service={service}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
          <div style={{ borderTop: "1px solid rgba(65,5,12,0.1)" }} />
        </div>
      </div>
    </section>
  );
}

export default StudioServices;
