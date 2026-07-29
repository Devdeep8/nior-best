"use client";

import { aboutUsContent } from "@/content/about-us";

export function AboutUsLink() {
  return (
    <a
      href={aboutUsContent.link.href}
      className="absolute bottom-20 left-8 border-b border-[#41050c]/30 text-[16px] text-[#41050c] transition-colors hover:text-brand hover:border-brand sm:left-12 lg:left-16"
      style={{
        fontSize: aboutUsContent.link.fontSize,
        opacity: aboutUsContent.link.hoverOpacity || 1,
      }}
      aria-label={aboutUsContent.link.ariaLabel}
    >
      {aboutUsContent.link.label}
    </a>
  );
}

export default AboutUsLink;
