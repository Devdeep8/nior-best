"use client";

import Image from "next/image";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";

const row1Logos = [
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871468/coders%20express/company%20logos/Logo-02-resize.png_oln08i.avif",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871466/coders%20express/company%20logos/18_lzmy3c.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871466/coders%20express/company%20logos/16_ot7zeg.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871465/coders%20express/company%20logos/14_qt7b3o.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871465/coders%20express/company%20logos/13_wr9ywe.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871465/coders%20express/company%20logos/WhatsApp_Image_2026-05-15_at_20.34.34_weafog.jpg",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871463/coders%20express/company%20logos/17_g2w2ig.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871463/coders%20express/company%20logos/15_glaovk.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871463/coders%20express/company%20logos/15_glaovk.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871444/coders%20express/company%20logos/11_vso8ln.png",
];

const row2Logos = [
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871444/coders%20express/company%20logos/12_hmfp8d.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871444/coders%20express/company%20logos/8_jfnulw.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871444/coders%20express/company%20logos/7_fgprla.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871444/coders%20express/company%20logos/10_mowgct.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871443/coders%20express/company%20logos/1_k7oukn.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871443/coders%20express/company%20logos/9_bj0izz.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871443/coders%20express/company%20logos/2_e775hq.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871443/coders%20express/company%20logos/6_jflud9.png",
  "https://res.cloudinary.com/deepcnbrz/image/upload/v1778871443/coders%20express/company%20logos/4_ocuou2.png",
];

export function InvestorsSection() {
  const renderLogos = (logos: string[]) =>
    logos.map((url, i) => (
      <div
        key={i}
        className="px-3 flex items-center justify-center"
      >
        {/* Outer glow ring — only visible on hover */}
        <div className="relative group">
          <div
            className="absolute -inset-[2px] rounded-[20px] opacity-0 group-hover:opacity-100
              bg-gradient-to-br from-white/40 via-white/10 to-white/30
              transition-opacity duration-500 blur-[1px]"
          />
          <div
            className="relative flex items-center justify-center
              px-8 py-5 rounded-[18px]
              bg-gradient-to-br from-white via-white/98 to-slate-50
              border border-white/30
              shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.05)]
              group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.6),inset_0_1px_0_rgba(255,255,255,1)]
              group-hover:from-white group-hover:via-white group-hover:to-white
              group-hover:-translate-y-0.5
              transition-all duration-300 ease-out
              min-w-[160px] sm:min-w-[210px] md:min-w-[240px] min-h-[80px] sm:min-h-[90px] md:min-h-[100px]"
          >
            <div className="relative h-12 sm:h-14 md:h-16 w-full max-w-[160px] sm:max-w-[200px] md:max-w-[220px]">
              <Image
                src={url}
                alt="Partner Logo"
                fill
                unoptimized
                className="object-contain group-hover:scale-105 group-hover:brightness-90 transition-all duration-400 cursor-pointer"
                sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, 220px"
              />
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <section className="bg-black py-24 sm:py-32 overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-[#555] text-xl md:text-2xl font-medium tracking-tight">
          At Mixspace Studio, we’re proud partners of brands making an impact.
        </h2>
      </div>

      <div className="flex flex-col gap-8 relative">
        {/* Left and right fade gradients for the marquee */}
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />

        <InfiniteMarquee
          items={renderLogos(row1Logos)}
          direction="left"
          speed={40}
        />

        <InfiniteMarquee
          items={renderLogos(row2Logos)}
          direction="right"
          speed={45}
        />
      </div>
    </section>
  );
}

export default InvestorsSection;
