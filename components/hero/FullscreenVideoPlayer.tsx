"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

/** Converts a YouTube watch URL to an embed URL, or returns null for non-YouTube srcs. */
function getYouTubeEmbedUrl(src: string): string | null {
  try {
    const url = new URL(src);
    const id =
      (url.hostname.includes("youtube.com") && url.searchParams.get("v")) ||
      (url.hostname === "youtu.be" && url.pathname.slice(1));
    if (!id) return null;
    // autoplay=1 so it plays immediately when the overlay opens
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  } catch {
    return null;
  }
}

export interface RecommendedVideo {
  id: string;
  title: string;
  src: string;
}

interface FullscreenVideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  initialVideoSrc: string;
  recommendedVideos: RecommendedVideo[];
}

export function FullscreenVideoPlayer({
  isOpen,
  onClose,
  initialVideoSrc,
  recommendedVideos,
}: FullscreenVideoPlayerProps) {
  const [currentVideo, setCurrentVideo] = useState(initialVideoSrc);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track mounting state for Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle locking scroll when open
  useEffect(() => {
    if (isOpen) {
      setCurrentVideo(initialVideoSrc);
      setShowEndScreen(false);
      setIsPlaying(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, initialVideoSrc]);

  // Handle video sources change
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShowEndScreen(false);
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [currentVideo, isOpen]);

  const handleVideoEnded = () => {
    setShowEndScreen(true);
    setIsPlaying(false);
  };

  const handlePlayRecommended = (src: string) => {
    setCurrentVideo(src);
  };

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleReplayCurrent = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setShowEndScreen(false);
    setIsPlaying(true);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md overflow-hidden"
        >
          {/* Main Video Container */}
          <div className="relative w-full h-full flex items-center justify-center group">
            {getYouTubeEmbedUrl(currentVideo) ? (
              /* ── YouTube fullscreen iframe ── */
              <iframe
                src={getYouTubeEmbedUrl(currentVideo)!}
                className="w-full h-full"
                allow="autoplay; fullscreen; encrypted-media"
                allowFullScreen
                title="Video player"
                style={{ border: "none" }}
              />
            ) : (
              /* ── Direct mp4 player ── */
              <video
                ref={videoRef}
                src={currentVideo}
                className="w-full h-full max-h-screen object-contain cursor-pointer"
                onClick={handlePlayToggle}
                onEnded={handleVideoEnded}
                playsInline
                controls={false}
              />
            )}

            {/* Central Pause Indicator Overlay (Fades out) */}
            <AnimatePresence>
              {!isPlaying && !showEndScreen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handlePlayToggle}
                  className="absolute flex h-20 w-20 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white cursor-pointer z-10"
                >
                  <svg viewBox="0 0 24 24" className="h-8 w-8 ml-1 fill-current">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Elegant Floating Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-50 flex items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-black/50 text-white/70 hover:text-white hover:border-[#eabca8]/50 hover:bg-[#eabca8]/10 transition-all duration-300 group/close"
              aria-label="Close video player"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 stroke-current stroke-2 fill-none transition-transform duration-300 group-hover/close:rotate-90"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Custom Progress Bar at Bottom */}
            {!showEndScreen && (
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10 z-20 pointer-events-none">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#eabca8] to-[#e8a87c]"
                  initial={{ scaleX: 0 }}
                  style={{
                    transformOrigin: "left",
                  }}
                  animate={{
                    scaleX: isPlaying ? 1 : 0,
                  }}
                  transition={{
                    duration: videoRef.current?.duration || 10,
                    ease: "linear",
                  }}
                  // Replaced purely visual state-bound animation with native progress later if needed, but for now this maintains simple premium visual.
                />
              </div>
            )}

            {/* Premium End Screen Overlay (Netflix/YouTube Premium Style) */}
            <AnimatePresence>
              {showEndScreen && (
                <motion.div
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  className="absolute inset-0 flex flex-col items-center justify-start md:justify-center bg-black/75 z-30 px-6 py-20 overflow-y-auto scrollbar-none"
                >
                  <div className="w-full max-w-6xl text-center my-auto">
                    {/* Header Titles */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-12"
                    >
                      <h2 className="text-sm md:text-base font-mono tracking-widest text-[#eabca8] uppercase mb-2">
                        Watch More Stories
                      </h2>
                      <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Recommended Projects
                      </h3>
                      <div className="mt-4 w-24 h-1 bg-[#eabca8] mx-auto rounded-full" />
                    </motion.div>

                    {/* 3 Recommended Videos Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mb-12">
                      {recommendedVideos.map((vid, idx) => (
                        <motion.div
                          key={vid.id}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          onClick={() => handlePlayRecommended(vid.src)}
                          className="group/card relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 aspect-video md:aspect-[4/3] cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:border-[#eabca8]/50 hover:shadow-2xl hover:shadow-[#eabca8]/10"
                        >
                          {/* Background Looping Muted Video */}
                          <video
                            src={vid.src}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover/card:opacity-80 group-hover/card:scale-105 transition-all duration-700"
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

                          {/* Floating Content */}
                          <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
                            {/* Small dynamic badge */}
                            <span className="self-start px-2.5 py-1 rounded bg-[#eabca8]/20 border border-[#eabca8]/30 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#e8a87c] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                              Up Next
                            </span>

                            <div className="flex items-center justify-between w-full translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
                              <h4 className="text-lg md:text-xl font-semibold text-white tracking-wide text-left drop-shadow-lg">
                                {vid.title}
                              </h4>

                              {/* Action Button */}
                              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-white text-black scale-90 opacity-0 group-hover/card:scale-100 group-hover/card:opacity-100 transition-all duration-300">
                                <svg
                                  viewBox="0 0 24 24"
                                  className="h-4 w-4 fill-current ml-0.5"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Replay Current/Back Controls */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex justify-center items-center gap-6"
                    >
                      <button
                        onClick={handleReplayCurrent}
                        className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-none stroke-current stroke-2 group-hover:rotate-180 transition-transform duration-500"
                        >
                          <path d="M23 4v6h-6M1 20v-6h6" />
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                        </svg>
                        <span className="text-sm font-medium tracking-wide">Replay Video</span>
                      </button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default FullscreenVideoPlayer;
