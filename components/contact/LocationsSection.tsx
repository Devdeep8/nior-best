"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Reusable Live Clock Component
function LiveClock({ timezone }: { timezone: string }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  if (!time) {
    return (
      <div className="min-w-[72px] h-8 bg-white/5 animate-pulse rounded-full" />
    );
  }

  return (
    <div className="bg-[#222222] px-4 py-2 rounded-full text-white font-normal text-sm tracking-wide whitespace-nowrap select-none shrink-0">
      {time}
    </div>
  );
}

export function LocationsSection() {
  const LAT = "28.645368605639444";
  const LNG = "77.14755761534256";

  const location = {
    city: "Delhi",
    email: "delhi@codersexpress.com",
    timezone: "Asia/Kolkata",
    mapEmbedSrc: `https://www.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`,
  };

  return (
    <section className="w-full bg-black pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 lg:pb-20 relative">
      {/* Section Label */}
      <div className="px-4 sm:px-8 lg:px-20 mb-4 sm:mb-6">
        <h3 className="text-[#555] text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] select-none">
          Locations
        </h3>
      </div>

      {/* Single Card */}
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full flex flex-col"
        >
          {/* Map — scales height per breakpoint, same footprint as the old image */}
          <div
            className="group w-full bg-[#1a1a1a] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative shadow-2xl"
            style={{ height: "clamp(260px, 55vw, 680px)" }}
          >
            <iframe
              src={location.mapEmbedSrc}
              title={`${location.city} Location Map`}
              className="absolute inset-0 w-full h-full border-0 grayscale brightness-90 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-[800ms] ease-out"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Info Bar */}
          <div className="w-full pt-4 pb-2 sm:py-5 flex flex-row items-center justify-between gap-3 px-1">
            {/* City + Email */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
              <span className="text-white font-normal text-sm sm:text-base lg:text-lg shrink-0">
                {location.city}
              </span>
              <span className="text-white/40 shrink-0">—</span>

              <a href={`mailto:${location.email}`}
                className="text-white/60 text-sm sm:text-base lg:text-lg font-normal truncate border-b border-transparent hover:border-white hover:text-white transition-all duration-200 min-w-0"
              >
                {location.email}
              </a>
            </div>

            {/* Live Clock — always right-aligned */}
            <LiveClock timezone={location.timezone} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}