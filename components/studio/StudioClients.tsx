"use client";

import { useRef, useState, useEffect } from "react";

const CLIENTS: { name: string; url: string }[] = [
  { name: "Myboatride", url: "https://myboatride.com" },
  { name: "Paytm", url: "https://www.instagram.com/paytm/?hl=en" },
  { name: "Ekprint.in", url: "https://linktr.ee/ekprint.in" },
  { name: "Italian Crust", url: "https://www.instagram.com/italiancrust/" },
  { name: "Aryan Hr Solutions", url: "" },
  { name: "The Flavour Trail", url: "https://theflavourtrail.com" },
  { name: "Tata Motors", url: "https://cars.tatamotors.com/sierra/ice.html" },
  { name: "Pc Jeweller", url: "https://www.pcjeweller.com" },
  { name: "Jaypee Group", url: "https://www.jaypeehotels.com" },
  { name: "Infinity Harbour Services", url: "https://www.instagram.com/watertaximumbai/" },
  { name: "Tata Consultancy Services", url: "https://www.tcs.com/home-page" },
  { name: "Radisson Blu", url: "https://www.radissonhotels.com/" },
  { name: "Torque N Gears", url: "https://www.instagram.com/torquengears/" },
  { name: "Macaire Bakery", url: "https://www.instagram.com/macairebakers/" },
  { name: "In The Cavern", url: "https://inthecavern.com/" },
  { name: "Haannaa AI", url: "https://haannaa.com" },
  { name: "Scholars Academy, Delhi", url: "https://www.instagram.com/Scholarsacademyindia" },
];

function ClientName({ name, url, isLast }: { name: string; url: string; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  const textStyle = {
    textDecoration: "none",
    color: hovered && url ? "#eabca8" : "var(--color-text-muted)",
    cursor: url ? "pointer" : "default",
    transition: "color 0.2s ease",
    display: "inline",
  };

  return (
    <>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={textStyle}
        >
          {name}
        </a>
      ) : (
        <span style={textStyle}>{name}</span>
      )}
      {!isLast && (
        <span style={{ color: "var(--color-text-muted)" }}>,&nbsp;</span>
      )}
    </>
  );
}

export function StudioClients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          list.style.transition =
            "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)";
          list.style.opacity = "1";
          list.style.transform = "translateY(0)";
          observer.unobserve(list);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(list);
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
        {/* Header row */}
        <div
          className="flex items-center justify-between mb-12"
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
              Selected Clients
            </span>
          </div>

          <a
            href="/work"
            className="studio-clients-portfolio-link"
            style={{
              color: "var(--color-text-secondary)",
              letterSpacing: "0.08em",
              textDecoration: "none",
              transition: "color 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            View portfolio →
          </a>
        </div>

        {/* Client name flowing block */}
        <div
          ref={listRef}
          style={{
            opacity: 0,
            transform: "translateY(30px)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 4vw, 52px)",
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {CLIENTS.map((client, i) => (
              <ClientName key={client.name} name={client.name} url={client.url} isLast={i === CLIENTS.length - 1} />
            ))}
          </p>
        </div>
      </div>

      <style>{`
        .studio-clients-portfolio-link:hover {
          color: #ffffff !important;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      `}</style>
    </section>
  );
}

export default StudioClients;
