"use client";

import { SectionLabels } from "@/components/about-us/SectionLabels";
import { HighlightText } from "@/components/ui/HighlightText";
import { EngagementCard } from "./EngagementCard";
import { signatureEngagementsContent } from "@/content/signature-engagements";

export function SignatureEngagementsSection() {
  const { label, headline, engagements } = signatureEngagementsContent;

  return (
    <section id="signature-engagements" className="relative bg-[var(--background)] px-4 sm:px-6 lg:px-8 pt-24 pb-32 border-t border-[#41050c]/10">
      {/* Header Label [04] SIGNATURE ENGAGEMENTS */}
      <SectionLabels
        index={label.index}
        title={label.title}
        indexColor="#41050c/50"
        titleColor="#41050c/50"
      />

      <div className="pt-20">
        {/* Highlighted headline — centred, large font */}
        <div className="mx-auto max-w-[90%] text-center mb-24">
          <HighlightText
            segments={headline.segments}
            className="text-[clamp(24px,3.5vw,56px)] leading-[1.15]"
          />
        </div>

        {/* 3-Column Grid for Engagements */}
        <div className="mx-auto max-w-[95%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-20">
            {engagements.map((engagement, index) => (
              <EngagementCard
                key={engagement.id}
                engagement={engagement}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignatureEngagementsSection;
