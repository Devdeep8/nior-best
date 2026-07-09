"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { heroContent } from "@/content/hero";
import { FullscreenVideoPlayer } from "./FullscreenVideoPlayer";

/**
 * Extracts the YouTube video ID from watch/share/embed URLs.
 * Returns null for non-YouTube sources so the mp4 fallback path is used.
 */
function getYouTubeId(src: string): string | null {
  try {
    const url = new URL(src);
    return (
      (url.hostname.includes("youtube.com") && url.searchParams.get("v")) ||
      (url.hostname === "youtu.be" && url.pathname.slice(1)) ||
      null
    );
  } catch {
    return null;
  }
}

export function HeroThumbnail() {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const thumbnailSrc = heroContent.video.thumbnailVideoSrc || "";
  const youtubeId = getYouTubeId(thumbnailSrc);

  /*
   * Thumbnail embed URL — every possible YouTube UI suppression parameter:
   *   controls=0        → no control bar
   *   modestbranding=1  → no YouTube logo in control bar
   *   rel=0             → no related videos
   *   disablekb=1       → no keyboard shortcuts
   *   fs=0              → no fullscreen button
   *   iv_load_policy=3  → no video annotations
   *   showinfo=0        → no video title/uploader info (legacy but harmless)
   *   playsinline=1     → prevent mobile fullscreen hijack
   *   mute=1            → required for autoplay
   *   loop=1 + playlist → seamless looping
   *
   * Visual trick: the iframe is sized to 500% × 500% of the card and centered.
   * The card's overflow:hidden clips everything outside 184×144px.
   * YouTube's top bar (~30px) and bottom controls (~40px) are each buried
   * 288px below/above the visible edge — completely invisible.
   * The logo watermark (bottom-right) is also outside the clipped area.
   */
  const thumbnailEmbedUrl = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}` +
      `?autoplay=1&mute=1&loop=1&playlist=${youtubeId}` +
      `&controls=0&modestbranding=1&rel=0&disablekb=1&fs=0` +
      `&iv_load_policy=3&showinfo=0&playsinline=1`
    : null;

  /*
   * Fullscreen embed URL — controls enabled so the user can interact normally
   * when the overlay opens after clicking the thumbnail card.
   */
  const fullscreenEmbedUrl = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}` +
      `?autoplay=1&rel=0&modestbranding=1`
    : null;

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
        style={{ position: "relative" }}
      >
        {thumbnailEmbedUrl ? (
          /*
           * The wrapper is position:absolute inset-0 with overflow:hidden.
           * pointer-events:none on BOTH wrapper and iframe — no YouTube
           * interaction is possible at all. The parent motion.div captures
           * the onClick to open our fullscreen player instead.
           *
           * The iframe is 500% × 500%, centered via translate(-50%,-50%).
           * At 500%, the iframe is 920×720px inside a 184×144 window.
           * Each edge crops 368px horizontally and 288px vertically,
           * pushing ALL YouTube chrome (title, controls, logo) out of frame.
           */
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ pointerEvents: "none" }}
          >
            <iframe
              src={thumbnailEmbedUrl}
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              title="Video preview"
              tabIndex={-1}
              style={{
                border: "none",
                position: "absolute",
                width: "500%",
                height: "500%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
          </div>
        ) : thumbnailSrc ? (
          /* ── Direct mp4 fallback (used when thumbnailVideoSrc is a Cloudinary/CDN url) ── */
          <video
            src={thumbnailSrc}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : null}

        {/*
         * Solid black edges vignette — extra insurance so any stray pixel of
         * YouTube chrome that survives the crop is masked at the card borders.
         */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, black 0%, transparent 22%, transparent 78%, black 100%)," +
              "linear-gradient(to right,  black 0%, transparent 22%, transparent 78%, black 100%)",
          }}
        />

        {/* Central dark tint — keeps the card readable without obscuring the video */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500 z-10 pointer-events-none" />

        {/* Play button — sits on top of everything */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
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

      {/* Fullscreen player — uses the YouTube embed with controls when opened */}
      <FullscreenVideoPlayer
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        initialVideoSrc={fullscreenEmbedUrl ?? thumbnailSrc}
        recommendedVideos={recommendedVideos}
      />
    </>
  );
}

export default HeroThumbnail;
