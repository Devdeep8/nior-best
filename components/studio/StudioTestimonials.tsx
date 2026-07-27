"use client";

import Image from "next/image";

const founders = [
  {
    name: "Anmol Singh Gujral",
    role: "CEO, Mixspace Studio",
    photo: "https://res.cloudinary.com/deepcnbrz/image/upload/v1783598988/6230893929339491087_zq21js.jpg",
    initials: "AS",
    quote:
      "At Mixspace Studio, our vision has always been to bridge creativity with technology, helping businesses build a meaningful digital presence. Every strategy we create is driven by innovation, transparency, and measurable results. Our goal isn't just to deliver services - it's to become a long-term growth partner for every brand that trusts us.",
  },
  {
    name: "Navjyot Singh",
    role: "COO, Mixspace Studio",
    photo: "https://res.cloudinary.com/deepcnbrz/image/upload/v1783598988/6230893929339491086_ehxna8.jpg",
    initials: "NS",
    quote:
      "Operational excellence is the foundation of every successful campaign. As COO, my focus is on building streamlined processes, ensuring seamless execution, and delivering consistent results for our clients. By combining efficient project management with a commitment to quality and collaboration, I strive to transform ideas into impactful outcomes while creating a reliable experience for every brand we work with.",
  },
  {
    name: "Harshita Dewan",
    role: "Creative Director, Mixspace Studio",
    photo: "",
    initials: "HD",
    quote:
      "Great marketing begins with understanding people, not just algorithms. As Creative Director, I focus on building authentic brand stories backed by data-driven strategies that inspire action. From crafting compelling content to designing impactful campaigns, every idea is created with purpose - to help brands connect, engage, and grow in an ever-evolving digital landscape while staying true to their unique identity.",
  },
];

export function StudioTestimonials() {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: "var(--background)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="mx-auto w-full"
        style={{ maxWidth: "1440px" }}
      >
        {/* Section header */}
        <div
          className="px-6 md:px-0 md:pl-[clamp(20px,4vw,60px)] pt-16 md:pt-[clamp(64px,8vw,120px)] pb-10 md:pb-[clamp(40px,5vw,60px)]"
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
            [04] Our Founders
          </span>
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(36px, 5.5vw, 72px)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
<<<<<<< Updated upstream
              color: "#ffffff",
=======
              color: "#41050c",
>>>>>>> Stashed changes
              marginTop: "clamp(16px, 2vw, 24px)",
              maxWidth: "600px",
            }}
          >
            People Behind the Pixels
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#cecccc]/15">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className="flex flex-col p-6 md:p-10 md:pr-[clamp(40px,5vw,80px)] md:pl-[clamp(40px,5vw,80px)]"
              style={{
                backgroundColor: "#41050c",
                borderRight: index < founders.length - 1 ? "1px solid rgba(206, 204, 204, 0.15)" : "none",
                borderBottom: "1px solid rgba(206, 204, 204, 0.15)",
              }}
            >
              {/* Circular avatar */}
              <div className="mb-10">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden relative flex items-center justify-center"
                  style={{ backgroundColor: "rgba(206, 204, 204, 0.1)" }}
                >
                  {founder.photo ? (
                    <Image
                      src={founder.photo}
                      alt={founder.name}
                      fill
                      unoptimized
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "#cecccc",
                        fontSize: "16px",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {founder.initials}
                    </span>
                  )}
                </div>
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(14px, 1.2vw, 17px)",
                  lineHeight: 1.75,
                  color: "#cecccc",
                  margin: 0,
                  flex: 1,
                }}
              >
                &quot;{founder.quote}&quot;
              </p>

              {/* Bottom info */}
              <div className="mt-10 pt-6" style={{ borderTop: "1px solid rgba(206, 204, 204, 0.15)" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(16px, 1.5vw, 20px)",
                    fontWeight: 500,
                    color: "#cecccc",
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {founder.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(12px, 1vw, 14px)",
                    color: "rgba(206, 204, 204, 0.7)",
                    margin: 0,
                    marginTop: "6px",
                  }}
                >
                  {founder.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudioTestimonials;
