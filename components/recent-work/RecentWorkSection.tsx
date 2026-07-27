"use client";

import { SectionLabels } from "@/components/about-us/SectionLabels";
import { HighlightText } from "@/components/ui/HighlightText";
import { ProjectCard } from "./ProjectCard";
import { recentWorkContent } from "@/content/recent-work";
import { ScrollMarquee } from "@/components/ui/ScrollMarquee";

export function RecentWorkSection() {
  const { label, headline, projects } = recentWorkContent;

  // Layout:
  // Row 1: card[0] (normal, left half) | card[1] (normal, right half)
  // Row 2: card[2] (wide, full width)
  // Row 3: card[3] (normal, left half) | card[4] (normal, right half)

  const row1 = projects.slice(0, 2);
  const row2 = projects.slice(2, 3);
  const row3 = projects.slice(3, 5);

  return (
    <section id="recent-work" className="relative bg-black px-4 sm:px-6 lg:px-8 pt-8 pb-24 ">
      {/* Header */}
      <SectionLabels
        index={label.index}
        title={label.title}
<<<<<<< Updated upstream
        indexColor="#555"
        titleColor="#555"
=======
        indexColor="#41050c/50"
        titleColor="#41050c/50"
>>>>>>> Stashed changes
      />
      <div className="pt-20 ">

        {/* Highlighted headline — centred, large */}
        <div className="mx-auto max-w-7xl text-center mb-16 lg:mb-20">
          <HighlightText
            segments={headline.segments}
            className="text-[clamp(20px,2.4vw,48px)]"
          />
        </div>

        {/* Project grid */}
        <div className="mx-auto max-w-[92%]  flex flex-col gap-4">

          {/* Row 1 — two equal columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {row1.map((p, i) => (
              <div key={p.id} className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/3]">
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </div>

          {/* Row 2 — wide single card */}
          {row2.map((p, i) => (
            <div key={p.id} className="relative w-full aspect-video md:aspect-[21/9]">
              <ProjectCard project={p} index={i + 2} />
            </div>
          ))}

          {/* Row 3 — two equal columns (only rendered if items exist) */}
          {row3.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {row3.map((p, i) => (
                <div key={p.id} className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/3]">
                  <ProjectCard project={p} index={i + 3} />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
      <ScrollMarquee text="From scrolling to stopping." />

    </section>
  );
}

export default RecentWorkSection;
