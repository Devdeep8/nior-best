"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { heroContent } from "@/content/hero";
import { FullscreenVideoPlayer } from "./FullscreenVideoPlayer";

/**
 * Converts a YouTube watch/share URL into a nocookie embed URL with all
 * player chrome suppressed (controls, logo, annotations, keyboard, fullscreen).
 * Returns null for non-YouTube sources so the mp4 path is used instead.
 */
function getYouTubeEmbedUrl(src: string): string | null {
  try {
    const url = new URL(src);
    const id =
      (url.hostname.includes("youtube.com") && url.searchParams.get("v")) ||
      (url.hostname === "youtu.be" && url.pathname.slice(1));
    if (!id) return null;
    return (
      `https://www.youtube-nocookie.com/embed/${id}` +
      `?autoplay=1&mute=1&loop=1&playlist=${id}` +
      `&controls=0&modestbranding=1&rel=0&disablekb=1&fs=0&iv_load_policy=3&showinfo=0`
    );
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
        className="group md:absolute relative md:bottom-20 bottom-0 md:left-12 left-0 mt-12 md:mt-0 w-[184px] h-[144px] overflow-hidden rounded-xl border border-[#41050c]/10 bg-[#41050c]/5 cursor-pointer hover:border-[#41050c]/30 hover:scale-[1.05] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        {youtubeEmbedUrl ? (
          /*
           * YouTube iframe — oversized and centered so that YouTube's title bar
           * (top) and progress/controls bar (bottom) are cropped out of view.
           * pointer-events-none prevents any YouTube UI interaction; the parent
           * motion.div handles the click to open the fullscreen player instead.
           */
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <iframe
              src={youtubeEmbedUrl}
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              title="Thumbnail preview"
              style={{
                border: "none",
                position: "absolute",
                width: "180%",
                height: "180%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
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

        {/* Dark gradient vignette overlay — sits above iframe so no YouTube UI peeks through */}
        <div className="absolute inset-0 bg-[#41050c]/10 group-hover:bg-[#41050c]/25 transition-colors duration-500 z-10" />

        {/* Play button overlay with custom brand colors on hover */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#41050c]/10 backdrop-blur-md border border-[#41050c]/20 text-[#41050c] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#41050c] group-hover:border-[#41050c] group-hover:text-[#cecccc] group-hover:shadow-lg group-hover:shadow-[#41050c]/20">
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
