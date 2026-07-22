"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroContent } from "@/content/hero";

interface VideoBackgroundProps {
  src?: string;
  fallbackColor?: string;
  alt?: string;
  className?: string;
}

export function VideoBackground({
  src = heroContent.video.src,
  fallbackColor = heroContent.video.fallbackColor,
  alt = heroContent.video.alt,
  className = "",
}: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };

    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    video.addEventListener("loadeddata", handleLoadedData);

    // Set a timeout to show fallback if video takes too long
    const timeoutId = setTimeout(() => {
      if (!isLoaded) {
        setIsLoading(false);
      }
    }, 3000);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadeddata", handleLoadedData);
      clearTimeout(timeoutId);
    };
  }, [isLoaded]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video element */}
      {!hasError && (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto" // Instruct browser to preload video data ASAP
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
        />
      )}

      {/* Fallback background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: hasError ? fallbackColor : fallbackColor,
          opacity: isLoaded ? 0.3 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

      {/* Loading indicator */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black"
          >
            <div className="relative">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
