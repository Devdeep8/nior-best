"use client";

interface SectionLabelsProps {
  index?: string;
  title: string;
  indexColor?: string;
  titleColor?: string;
  fontSize?: string;
  letterSpacing?: string;
  className?: string;
}

export function SectionLabels({
  title,
  titleColor = "#999",
  className = "",
}: SectionLabelsProps) {
  return (
    <div
<<<<<<< Updated upstream
      className={`relative w-full flex items-center justify-between border-b border-white/10 pb-4 mb-12 ${className}`}
=======
      className={`relative w-full flex items-center justify-between border-b border-[#41050c]/10 pb-4 mb-12 ${className}`}
>>>>>>> Stashed changes
    >
      {/* Left: Brand Dot + Section Title */}
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
        <span
<<<<<<< Updated upstream
          className="uppercase font-medium tracking-[0.22em] text-[11px] text-white/60"
=======
          className="uppercase font-medium tracking-[0.22em] text-[11px] text-[#41050c]/60"
>>>>>>> Stashed changes
          style={{ color: titleColor }}
        >
          {title}
        </span>
      </div>

      {/* Right: Studio mark */}
<<<<<<< Updated upstream
      <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-white/20 hidden sm:inline">
=======
      <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-[#41050c]/25 hidden sm:inline">
>>>>>>> Stashed changes
        Mixspace Studio
      </span>
    </div>
  );
}

export default SectionLabels;