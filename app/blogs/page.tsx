import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { getBlogs } from "@/lib/blogs";

// Dynamic imports for below-the-fold components to reduce initial page load size
const BlogListClient = dynamic(() => import("@/components/blog/BlogListClient").then(m => m.BlogListClient), { ssr: true });
const Footer = dynamic(() => import("@/components/footer/Footer").then(m => m.Footer), { ssr: true });

export const metadata: Metadata = {
  title: "Blogs & Insights",
  description:
    "Explore our collection of articles, design strategies, engineering tutorials, and industry insights by the team at Mixspace Studio.",
};

export const revalidate = 60; // Revalidate page every minute

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[#41050c] selection:bg-brand/30">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-12 overflow-hidden border-b border-[#41050c]/10">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="flex flex-col gap-4 max-w-3xl">
            {/* Breadcrumb / Category Tag */}
            <span className="font-mono text-[11px] tracking-[0.2em] text-[#41050c]/40 uppercase">
              [ JOURNAL & INSIGHTS ]
            </span>

            {/* Page Title */}
            <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-[#41050c] font-medium">
              Insights <span className="text-[#41050c]/30">&</span> Ideas
            </h1>

            {/* Subtext */}
            <p className="text-[#41050c]/60 text-lg md:text-xl font-normal leading-relaxed mt-4">
              Stay ahead in the digital world with expert insights, practical marketing tips, SEO strategies, social media trends, website best practices, and industry updates. Explore our blogs to discover actionable ideas that help your business grow, connect with the right audience, and achieve lasting digital success.
            </p>
          </div>
        </div>
      </section>

      {/* Blog List Client Container */}
      <BlogListClient initialBlogs={blogs} />

      <Footer />
    </main>
  );
}
