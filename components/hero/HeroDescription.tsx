"use client";

import { motion } from "framer-motion";
import { heroContent } from "@/content/hero";
import { CTAButton } from "./CTAButton";

export function HeroDescription() {
  return (
    <div className="md:absolute relative md:right-12 md:top-[180px] top-0 right-0 max-w-[360px] flex flex-col items-end md:items-start mb-8 md:mb-0 ml-auto md:ml-0 gap-6 z-20">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: heroContent.animation.descriptionDelay, duration: 0.6 }}
        className="text-[15px] md:text-[17px] leading-[1.6] text-white/80 text-right md:text-left font-normal"
        aria-label={heroContent.description.ariaLabel}
      >
        {heroContent.description.text}
      </motion.p>
      
      <CTAButton 
        variant="filled" 
        icon="arrow-right"
        className="mt-1 shadow-lg shadow-black/40 scale-[0.9] md:scale-100 origin-right md:origin-left"
      />
    </div>
  );
}

export default HeroDescription;
