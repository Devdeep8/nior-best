"use client";

import { useRef, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap-plugins";
import { heroContent } from "@/content/hero";

interface CTAButtonProps {
  label?: string;
  href?: string;
  ariaLabel?: string;
  className?: string;
  variant?: "outline" | "filled";
  icon?: "arrow-right" | "arrow-down";
}

// Arrow Right Icon
const ArrowRightIcon = forwardRef<SVGSVGElement, { className?: string }>(({ className }, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
ArrowRightIcon.displayName = "ArrowRightIcon";

// Arrow Down Icon
const ArrowDownIcon = forwardRef<SVGSVGElement, { className?: string }>(({ className }, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 5V19M12 19L5 12M12 19L19 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
ArrowDownIcon.displayName = "ArrowDownIcon";

export function CTAButton({
  label = heroContent.ctaButton.label,
  href = heroContent.ctaButton.href,
  ariaLabel = heroContent.ctaButton.ariaLabel,
  className = "",
  variant = "outline",
  icon ="arrow-down",
}: CTAButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  // GSAP hover animation for the arrow
  useEffect(() => {
    const button = buttonRef.current;
    const arrow = arrowRef.current;
    if (!button || !arrow) return;

    const handleMouseEnter = () => {
      gsap.to(arrow, {
        x: 8,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(arrow, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Framer Motion variants for button
  const buttonVariants: import("framer-motion").Variants = {
    initial: {
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: heroContent.animation.duration,
        delay: heroContent.animation.line1Delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  // Base styles based on variant
  const baseClasses =
    variant === "outline"
      ? "border-2 border-[#41050c] !text-[#41050c] bg-transparent hover:bg-[#41050c] hover:!text-[#f6f5f5] hover:border-[#41050c]"
      : "border-2 border-transparent bg-[#41050c] !text-[#f6f5f5] hover:bg-[#404040] hover:border-[#404040] hover:!text-[#f6f5f5]";

  return (
    <motion.a
      ref={buttonRef as any}
      href={href}
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-medium transition-colors duration-300 ${baseClasses} ${className}`}
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
    >
      <span>{label}</span>
      <span className="overflow-hidden">
        {icon === "arrow-right" ? (
          <ArrowRightIcon ref={arrowRef as any} className="h-5 w-5" />
        ) : (
          <ArrowDownIcon ref={arrowRef as any} className="h-5 w-5" />
        )}
      </span>
    </motion.a>
  );
}
