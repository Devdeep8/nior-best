/**
 * Navbar Content Data
 * All text, links, and configuration for the navbar component
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SectionInfo {
  index: string;
  label: string;
  id: string;
}

export const navbarContent = {
  // Logo configuration
  logo: {
    name: "MIXSPACE STUDIO",
    href: "/",
    ariaLabel: "MIXSPACE STUDIO - Home",
  },

  // Navigation links
  navLinks: [
    { label: "Work", href: "/#recent-work" },
    { label: "Studio", href: "/studio" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],

  // CTA button
  ctaButton: {
    label: "Message Us",
    href: "https://wa.me/message/HHILA74EGXT4K1",
    ariaLabel: "Message us on WhatsApp",
    icon: "chat", // chat icon
  },

  // Section labels for scroll tracking
  sections: [
    { index: "[01]", label: "ABOUT MIXSPACE STUDIO", id: "about-mixspace-studio" },
    { index: "[02]", label: "OUR CAPABILITIES", id: "capabilities" },
    { index: "[03]", label: "RECENT WORK", id: "recent-work" },
    { index: "[04]", label: "SIGNATURE ENGAGEMENTS", id: "signature-engagements" },
    { index: "[05]", label: "TESTIMONIALS", id: "testimonials" },
    // { index: "[06]", label: "NEWS", id: "news" },
  ] as SectionInfo[],

  // Scroll behavior
  scroll: {
    borderThreshold: 100, // pixels
    borderColor: "rgba(255, 255, 255, 0.08)",
  },

  // Mobile menu
  mobile: {
    menuLabel: "Menu",
    closeLabel: "Close",
    animationDuration: 0.3, // seconds
  },
} as const;

export type NavbarContent = typeof navbarContent;
