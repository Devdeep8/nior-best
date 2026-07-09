"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap-plugins";
import { WorkProject } from "@/content/recent-work";

interface ProjectCardProps {
  project: WorkProject;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  /** Seek the video to the configured start time (if any) */
  const seekToStart = () => {
    const vid = videoRef.current;
    if (vid && project.videoStartTime) {
      vid.currentTime = project.videoStartTime;
    }
  };

  // Scroll-in animation (once, staggered by index)
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: index * 0.12,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  }, [index]);

  // Hover: subtle scale on image
  const handleMouseEnter = () => {
    setHovered(true);
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1.04, duration: 0.5, ease: "power2.out" });
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (imgRef.current) {
      gsap.to(imgRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative h-full w-full overflow-hidden rounded-xl cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: 0 }}
    >
      {/* Media (Video or Image) */}
      <div ref={imgRef} className="relative w-full h-full bg-[#111]">
        {project.videoSrc ? (
          <video
            ref={videoRef}
            src={project.videoSrc}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            playsInline
            onLoadedMetadata={seekToStart}
            onLoadedData={seekToStart}
            onEnded={() => {
              seekToStart();
              videoRef.current?.play();
            }}
          />
        ) : (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={index < 2}
          />
        )}
      </div>

      {/* Dark overlay on hover */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/30"
        style={{ opacity: 0 }}
      />

      {/* Tag — top right */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className="text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}
        >
          {project.tag}
        </span>
      </div>

      {/* Name + year — bottom left, slides up on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5 z-10 flex items-end justify-between transition-transform duration-500"
        style={{ transform: hovered ? "translateY(0)" : "translateY(8px)", opacity: hovered ? 1 : 0, transition: "transform 0.4s ease, opacity 0.4s ease" }}
      >
        <span className="text-white text-base font-medium transition-colors group-hover:text-brand">{project.name}</span>
        <span className="text-white/50 text-xs">{project.year}</span>
      </div>

      {/* Bottom gradient for legibility */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-black/70 to-transparent z-5 pointer-events-none" />
    </div>
  );
}

export default ProjectCard;
