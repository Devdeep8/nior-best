"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
import { TextRevealSection } from "@/components/text-reveal";
import { AboutUsSection } from "@/components/about-us";

// Dynamically import below-the-fold components to reduce initial JavaScript execution
const CapabilitiesSection = dynamic(() => import("@/components/capabilities").then(m => m.CapabilitiesSection), { ssr: true });
const CapabilitiesMarquee = dynamic(() => import("@/components/capabilities").then(m => m.CapabilitiesMarquee), { ssr: true });
const RecentWorkSection = dynamic(() => import("@/components/recent-work").then(m => m.RecentWorkSection), { ssr: true });
const InvestorsSection = dynamic(() => import("@/components/investors").then(m => m.InvestorsSection), { ssr: true });
const TestimonialsSection = dynamic(() => import("@/components/testimonials").then(m => m.TestimonialsSection), { ssr: true });
const FAQSection = dynamic(() => import("@/components/faq").then(m => m.FAQSection), { ssr: true });
const BookCallSection = dynamic(() => import("@/components/book-call").then(m => m.BookCallSection), { ssr: true });
const Footer = dynamic(() => import("@/components/footer").then(m => m.Footer), { ssr: true });

export default function Home() {
  return (
<<<<<<< Updated upstream
    <div className="min-h-screen bg-black text-white">
=======
    <div className="min-h-screen bg-[var(--background)] text-[#41050c]">
>>>>>>> Stashed changes
      {/* Hero Section */}
      <Hero />

      {/* Text Reveal Section - Custom highlighted words */}
      <TextRevealSection
        highlightedWords={["high-performance", "cut", "40%"]} // Only highlight these specific words
        enableHighlight={true} // Turn on word highlighting
      />

      {/* About Us Section - Custom highlighted words */}
      <AboutUsSection
        highlightedWords={["grow", "online", "social", "media,", "SEO,", "web", "development,", "digital", "ads."]} // Highlight core services
        enableHighlight={true} // Turn on word highlighting
      />

      {/* Our Capabilities Section */}
      <CapabilitiesSection />

      {/* Infinite Tags Marquee */}
      <CapabilitiesMarquee />

      {/* Recent Work Section [03] */}
      <RecentWorkSection />

      {/* Signature Engagements Section [04] */}
      {/* <SignatureEngagementsSection /> */}

      {/* Investors Marquee Section */}
      <InvestorsSection />

      {/* Founders Testimonials Slider */}
      <TestimonialsSection />

      {/* Research & Writings [05] */}
      {/* <ResearchSection /> */}

      {/* FAQ Section */}
      <FAQSection />

      {/* Call to Action */}
      <BookCallSection />

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
