"use client";

export function StudioHeroHeading() {
  return (
    <h1 
      className="relative z-0 flex items-center justify-center text-[#41050c] font-normal text-center w-full" 
      style={{ 
        fontFamily: "var(--font-display)",
        fontSize: "clamp(64px, 25vw, 400px)",
        letterSpacing: "-0.04em",
        lineHeight: 1
      }}
    >
      <span className="overflow-hidden block">
        <span className="block hero-heading-line translate-y-full opacity-0">
          Studio
        </span>
      </span>
    </h1>
  );
}
