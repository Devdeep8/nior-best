"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { heroContent } from "@/content/hero";
import { FullscreenVideoPlayer } from "./FullscreenVideoPlayer";

/** Returns a YouTube embed URL if the src is a YouTube watch/share link, otherwise null. */
function getYouTubeEmbedUrl(src: string): string | null {
  try {
    const url = new URL(src);
    // youtube.com/watch?v=ID or youtu.be/ID
    const id =
      (url.hostname.includes("youtube.com") && url.searchParams.get("v")) ||
      (url.hostname === "youtu.be" && url.pathname.slice(1));
    if (!id) return null;
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0`;
  } catch {
    return null;
  }
}

export function HeroThumbnail() {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const thumbnailSrc = heroContent.video.thumbnailVideoSrc || "";
  const youtubeEmbedUrl = getYouTubeEmbedUrl(thumbnailSrc);

  // Convert recommended videos from schema
  const recommendedVideos = (heroContent.video.recommendedVideos || []).map((vid) => ({
    id: vid.id,
    title: vid.title,
    src: vid.src,
  }));

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: heroContent.animation.thumbnailDelay, duration: 0.6 }}
        onClick={() => setIsPlayerOpen(true)}
        className="group md:absolute relative md:bottom-20 bottom-0 md:left-12 left-0 mt-12 md:mt-0 w-[184px] h-[144px] overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a] cursor-pointer hover:border-[#ca7a3a]/50 hover:scale-[1.05] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        {youtubeEmbedUrl ? (
          /* ── YouTube embed (muted, autoplay loop) ── */
          <iframe
            src={youtubeEmbedUrl}
            className="h-full w-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            title="Thumbnail preview"
            style={{ border: "none", transform: "scale(1.3)" }}
          />
        ) : thumbnailSrc ? (
          /* ── Direct mp4 fallback ── */
          <video
            src={thumbnailSrc}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : null}
        
        {/* Dark gradient vignette overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
        
        {/* Play button overlay with custom brand colors on hover */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-[#ca7a3a] group-hover:border-[#ca7a3a] group-hover:shadow-lg group-hover:shadow-[#ca7a3a]/30">
            <svg
              viewBox="0 0 24 24"
              className="ml-0.5 h-5 w-5 fill-current transition-colors duration-300"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Premium Fullscreen Video Player Overlay */}
      <FullscreenVideoPlayer
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        initialVideoSrc={thumbnailSrc}
        recommendedVideos={recommendedVideos}
      />
    </>
  );
}

export default HeroThumbnail;
