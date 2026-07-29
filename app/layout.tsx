import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mixspace Studio — Global Branding & Design Studio",
    template: "%s | Mixspace Studio",
  },
  description:
    "We are a premier global branding and digital design studio. We collaborate with ambitious founders to build world-class brands, high-converting websites, and cinematic digital experiences for the modern internet.",
  keywords: [
    "Branding agency",
    "social media marketing agency",
    "social media management services",
    "linkedin marketing",
    "social media content strategy",
    "social media growth strategy",
    "Instagram marketing agency",
    "content strategy and marketing services",
    "SEO content writing",
    "content calendar",
    "content planning",
    "digital creative agency",
    "creative marketing agency",
    "creative advertising agency",
    "SEO for startups",
    "digital marketing trends",
    "digital marketing agency UK",
    "creative agency california",
    "social media agency dubai",
    "branding agency USA",
    "Creative branding agency Canada",
    "rebranding agency",
    "social media marketing for startups",
    "social media trends in 2026",
    "startup marketing guide",
    "branding agency",
    "digital design studio",
    "UI UX design",
    "web development agency",
    "creative studio",
    "brand strategy",
    "Mixspace Studio",
    "custom software development",
    "motion graphics design",
    "high-end websites",
    "Cinematic visual effects",
  ],
  authors: [{ name: "Mixspace Studio" }],
  creator: "Mixspace Studio",
  publisher: "Mixspace Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Mixspace Studio — Global Branding & Design Studio",
    description: "Collaborating with ambitious founders to build world-class brands, high-converting websites, and cinematic digital experiences.",
    url: "https://www.mixspacestudio.com",
    siteName: "Mixspace Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mixspace Studio — Global Branding & Design Studio",
    description: "Collaborating with ambitious founders to build world-class brands and cinematic digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico?v=3",
    shortcut: "/favicon.ico?v=3",
    apple: "/favicon.ico?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full antialiased">
        <Navbar />
        <main id="top">
          <PageTransition>{children}</PageTransition>
        </main>
        
        {/* Global visual elements injected by the configuration */}
        <div id="scroll-progress"></div>

        {/* Inline Global JavaScript Effects */}
        <Script id="noir-global-effects" strategy="afterInteractive">
          {`
            // Scroll progress bar
            const progressBar = document.getElementById('scroll-progress');
            window.addEventListener('scroll', () => {
              const scrollable = document.documentElement.scrollHeight - window.innerHeight;
              const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
              if (progressBar) progressBar.style.width = pct + '%';
            }, { passive: true });



            // Scroll reveal (IntersectionObserver — no GSAP required)
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(el => {
                if (el.isIntersecting) {
                  el.target.classList.add('is-visible');
                  observer.unobserve(el.target);
                }
              });
            }, { threshold: 0.12 });
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
          `}
        </Script>
      </body>
    </html>
  );
}
