"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

const STATEMENT =
  "Brand builders and strategists who all have deep experience designing, building and shipping brands and digital products for some of the biggest companies in the world.";

export function StudioStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const words = STATEMENT.split(" ");

  useEffect(() => {
    if (!sectionRef.current || wordsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(wordsRef.current, { color: "#555555" });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const total = wordsRef.current.length - 1;
          wordsRef.current.forEach((word, i) => {
            if (!word) return;
            const threshold = (i / total) * 0.85;
            gsap.to(word, {
              color: progress >= threshold ? "#eabca8" : "#555555",
              duration: 0.2,
              ease: "none",
              overwrite: "auto",
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-5 sm:px-10 py-20 md:py-32"
      style={{
        backgroundColor: "var(--background)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 3.8vw, 52px)",
            fontWeight: 400,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            maxWidth: "900px",
            margin: 0,
          }}
        >
          {words.map((word, i) => (
            <span key={i}>
              <span
                ref={(el) => {
                  if (el) wordsRef.current[i] = el;
                }}
                style={{ color: "#555555" }}
              >
                {word}
              </span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

export default StudioStatement;
