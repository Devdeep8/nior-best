"use client";

import { useState } from "react";
import Image from "next/image";

const TEAM = [
  {
    id: "01",
    name: "Anmol Gujral",
    title: "Chief executive officer",
    photo: "https://res.cloudinary.com/deepcnbrz/image/upload/v1778653876/coders%20express/673e8e753711fbda19240478_Rayls_jui2an.webp",
    bio: "Anthony role is connecting our studio teams, ventures and partners. His experience building companies from the ground up across a multitude of industries, means he has a broad depth of knowledge across every aspect of venture building. Anthony works closely with our partner network of VC's, ensuring our founders can access advice and capital when they need it.",
  },
  {
    id: "02",
    name: "Navjyot Singh",
    title: "Chief operating officer",
    photo: "",
    bio: "Jamie oversees operations across all Mixspace Studio verticals, ensuring seamless delivery across studio, ventures and marketing. With a background spanning strategy, operations and brand, Jamie brings the connective tissue that keeps complex, multi-stakeholder projects running on time and on brief.",
  },
  {
    id: "03",
    name: "Harshita Dewan",
    title: "Creative Director ( Content & Strategies)",
    photo: "/images/harshita-dewan.png",
    bio: "Luca leads the creative vision across all Mixspace Studio studio output. With a background in brand identity, motion and digital design, he has shaped campaigns and identities for Fortune 500 companies and emerging Web3 brands alike.",
  },

];

function ToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div style={{ width: "20px", height: "20px", position: "relative", flexShrink: 0 }}>
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "rgba(65,5,12,0.6)",
          transform: "translateY(-50%)",
        }}
      />
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

function TeamRow({
  member,
  isOpen,
  onToggle,
}: {
  member: (typeof TEAM)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{ borderTop: "1px solid rgba(65,5,12,0.1)", cursor: "pointer" }}
      onClick={onToggle}
    >
      {/* Collapsed header row: Name | Title | — | Toggle (stacks on mobile, aligns on tablet+) */}
      <div
        className="flex items-center justify-between gap-6 md:gap-[40px]"
        style={{ padding: "24px 0" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center flex-1 gap-1 sm:gap-[40px]">
          {/* Name */}
          <h3
            className="shrink-0 sm:w-[clamp(180px,25%,320px)]"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(18px, 2vw, 26px)",
              fontWeight: 400,
              color: "#41050c",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {member.name}
          </h3>

          {/* Title */}
          <span
            className="flex-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(13px, 1.4vw, 17px)",
              fontWeight: 400,
              color: "rgba(65,5,12,0.6)",
            }}
          >
            {member.title}
          </span>
        </div>

        {/* Toggle icon */}
        <ToggleIcon isOpen={isOpen} />
      </div>

      {/* Expanded: Photo | Bio */}
      <div
        style={{
          maxHeight: isOpen ? "650px" : "0px", // extra buffer for stacked layout
          overflow: "hidden",
          opacity: isOpen ? 1 : 0,
          transition:
            "max-height 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-[clamp(180px,25%,320px)_1fr_1.5fr] gap-6 md:gap-[40px] pb-10"
        >
          {/* Empty col aligns with name (hidden on mobile) */}
          <div className="hidden md:block" />

          {/* Photo */}
          <div
            style={{
              width: "140px",
              height: "160px",
              position: "relative",
              backgroundColor: "#1a1a1a",
              borderRadius: "4px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover object-top grayscale"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Photo
                </span>
              </div>
            )}
          </div>

          {/* Bio */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              lineHeight: 1.75,
              color: "rgba(65,5,12,0.8)",
              margin: 0,
            }}
          >
            {member.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export function StudioTeam() {
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
        {/* Section header */}
        <div
          className="flex items-center gap-3 mb-10"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "var(--color-text-muted)" }}>[03]</span>
          <span style={{ color: "var(--color-text-secondary)" }}>
            Leadership Team
          </span>
        </div>

        {/* Team accordion */}
        <div>
          {TEAM.map((member, i) => (
            <TeamRow
              key={member.id}
              member={member}
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

export default StudioTeam;
