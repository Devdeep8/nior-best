"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { navbarContent, type SectionInfo } from "@/content/navbar";

// Logo SVG Component
function LogoMark() {
  return (
    <div className="grid items-center group h-12 pointer-events-auto">
      {/* Primary White Logo */}
      <div className="col-start-1 row-start-1 flex items-center justify-center">
        <Image
          src="/assets/logo/Mixspace-Studio-logo-white.png"
          alt="Mixspace Studio"
          width={1981}
          height={675}
          className="h-12 w-auto object-contain py-1 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
          priority
        />
      </div>
      {/* Hover Orange Logo */}
      <div className="col-start-1 row-start-1 flex items-center justify-center">
        <Image
          src="/assets/logo/Mixspace Studio logo orange.png"
          alt="Mixspace Studio Hover"
          width={1697}
          height={516}
          className="h-12 w-auto object-contain py-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 scale-[0.8]"
          priority
        />
      </div>
    </div>
  );
}

// Chat Icon Component
function ChatIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 18.5 3.5 21V6A2.5 2.5 0 0 1 6 3.5h12A2.5 2.5 0 0 1 20.5 6v7A2.5 2.5 0 0 1 18 15.5H7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Close Icon Component with className support
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className || "h-6 w-6"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface NavbarProps {
  sections?: SectionInfo[];
}

import { usePathname } from "next/navigation";

export function Navbar({ sections = navbarContent.sections }: NavbarProps) {
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState<SectionInfo | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > navbarContent.scroll.borderThreshold);

      // Find current section based on scroll position
      const sectionElements = sections.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { section: s, rect: null };
        return { section: s, rect: el.getBoundingClientRect() };
      });

      const visibleSection = sectionElements.find(({ rect }) => {
        return (
          rect && rect.top <= window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4
        );
      });

      if (visibleSection) {
        setCurrentSection(visibleSection.section);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Close mobile menu when clicking on a link
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 ${hasScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/8" : "bg-transparent"
          }`}
      >
        <div className="relative mx-auto h-20 px-6 lg:px-12 flex items-center justify-between w-full">
          {/* Logo - Left */}
          <Link
            href={navbarContent.logo.href}
            className="flex items-center relative z-10 shrink-0"
            aria-label={navbarContent.logo.ariaLabel}
          >
            <LogoMark />
          </Link>

          {/* Navigation Links - Center */}
          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden items-center gap-8 md:flex lg:gap-12">
            {navbarContent.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] text-white transition-colors duration-200 hover:text-[#eabca8] whitespace-nowrap"
                onClick={handleNavClick}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side - CTA button and Mobile menu toggle */}
          <div className="flex items-center gap-3 relative z-10 shrink-0">
            {/* Work with us button - Hidden on mobile */}
            <a
              href={navbarContent.ctaButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-3 rounded-full border border-white/30 bg-[#171717] px-5 py-3 text-[15px] text-white transition-colors duration-200 hover:bg-brand hover:border-brand hover:text-white"
              aria-label={navbarContent.ctaButton.ariaLabel}
              onClick={handleNavClick}
            >
              <ChatIcon />
              <span>{navbarContent.ctaButton.label}</span>
            </a>

            {/* Mobile Menu button - Text "Menu" instead of hamburger */}
            <button
              className="sm:hidden flex items-center justify-center rounded-full border border-white/30 bg-[#171717] px-4 h-10 text-[15px] text-white hover:bg-brand hover:border-brand hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? navbarContent.mobile.closeLabel : navbarContent.mobile.menuLabel}
            >
              {isMobileMenuOpen ? (
                <>
                  <CloseIcon className="mr-2 h-4 w-4" />
                  <span>Close</span>
                </>
              ) : (
                <span>Menu</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Section indicators (Desktop) */}


      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Mobile menu header */}
        <div className="flex h-20 items-center justify-between px-6">
          <Link href={navbarContent.logo.href} className="flex items-center" onClick={handleNavClick}>
            <LogoMark />
          </Link>

          <div className="flex items-center gap-3">
            {/* Chat icon button */}
            <a
              href={navbarContent.ctaButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#171717] text-white hover:bg-brand hover:border-brand hover:text-white transition-colors"
              aria-label={navbarContent.ctaButton.ariaLabel}
              onClick={handleNavClick}
            >
              <ChatIcon />
            </a>

            {/* Close button */}
            <button
              className="flex h-10 items-center justify-center rounded-full border border-white/20 bg-[#222] px-4 text-[15px] text-white hover:bg-brand hover:border-brand hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Close
            </button>
          </div>
        </div>

        {/* Mobile navigation links */}
        <nav className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center px-6">
          {navbarContent.navLinks.map((link, index) => (
            <div key={link.label} className="w-full max-w-sm">
              <Link
                href={link.href}
                className="block border-t border-white/10 py-6 text-center text-[28px] font-normal text-white hover:text-[#eabca8] transition-colors"
                onClick={handleNavClick}
              >
                {link.label}
              </Link>
              {index === navbarContent.navLinks.length - 1 && (
                <div className="border-t border-white/10" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
