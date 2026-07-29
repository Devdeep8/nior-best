"use client";

import { SectionLabels } from "@/components/about-us/SectionLabels";

const articles = [
  {
    id: 1,
    tag: "Founder Stories",
    title: "Lumen – Behind the Brand",
    subtitle: "Founder — Interview",
    color: "#111", // Placeholder background
  },
  {
    id: 2,
    tag: "Founder Stories",
    title: "Flashback - Behind the Brand",
    subtitle: "Founder — Interview",
    color: "#1a1a1a",
  },
  {
    id: 3,
    tag: "Project Overview",
    title: "Integrate crypto payments confidently with BoomFi",
    subtitle: "Project Review",
    color: "#0a1a0a",
  }
];

export function ResearchSection() {
  return (
    <section className="bg-[var(--background)] py-32 border-t border-[#41050c]/10 px-4 sm:px-6 lg:px-8">
      {/* Header Label [05] */}
      <SectionLabels
        index="[05]"
        title="RESEARCH & WRITINGS"
        indexColor="#41050c/50"
        titleColor="#41050c/50"
      />

      <div className="pt-20 mx-auto max-w-7xl">
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="group cursor-pointer flex flex-col gap-6">
              {/* Image Container with hover scale */}
              <div 
                className="w-full aspect-4/5 rounded-2xl overflow-hidden relative"
                style={{ backgroundColor: article.color }}
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 border border-[#41050c]/10 flex items-center justify-center">
                  <span className="text-[#41050c]/20 font-mono text-sm tracking-widest uppercase">Media</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-3">
                <span className="text-[#41050c]/60 text-sm font-medium tracking-wide">
                  {article.tag}
                </span>
                <h3 className="text-[#41050c] text-2xl font-medium tracking-tight">
                  {article.title}
                </h3>
                <p className="text-[#41050c]/50 text-sm">
                  {article.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResearchSection;
