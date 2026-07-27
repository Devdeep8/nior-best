"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { type BlogPost } from "@/lib/blogs";

interface BlogListClientProps {
  initialBlogs: BlogPost[];
}

const CATEGORIES = ["All", "Design", "Development", "Branding", "Insights"];

export function BlogListClient({ initialBlogs }: BlogListClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs = activeCategory === "All"
    ? initialBlogs
    : initialBlogs.filter((blog) => blog.category.toLowerCase() === activeCategory.toLowerCase());

  // First blog is featured (only if in "All" or if we have results)
  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const remainingBlogs = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  return (
    <div className="pt-24 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-[#41050c]/10 pb-8 mb-16">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="group relative px-5 py-2.5 text-[15px] font-medium rounded-full transition-colors duration-300"
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-[#41050c] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-300 ${
                isActive ? "text-[#cecccc]" : "text-[#41050c]/60 group-hover:text-[#41050c]"
              }`}>
                {category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid Content with AnimatePresence */}
      <div className="relative">
        {filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-[#41050c]/40"
          >
            No articles found in this category. Check back soon.
          </motion.div>
        ) : (
          <div className="space-y-16">
            {/* Featured Post Card */}
            {featuredBlog && activeCategory === "All" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 md:p-8 rounded-3xl border border-[#41050c]/10 bg-[#41050c]/5 hover:bg-[#41050c]/10 hover:border-[#41050c]/20 transition-all duration-500 overflow-hidden"
              >
                {/* Background Shimmer Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Cover Image */}
                <div className="lg:col-span-7 aspect-16/10 rounded-2xl overflow-hidden bg-[#41050c]/10 border border-[#41050c]/10 relative flex items-center justify-center lg:min-h-[300px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  {featuredBlog.imageUrl ? (
                    <Image
                      src={featuredBlog.imageUrl}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  ) : (
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 flex items-center justify-center">
                      <span className="text-[#41050c]/20 font-mono text-sm tracking-widest uppercase">
                        {featuredBlog.category} Media
                      </span>
                    </div>
                  )}
                  {/* Category Badge on Image */}
                  <span className="absolute bottom-6 left-6 z-20 bg-[#41050c] text-[#cecccc] text-xs uppercase font-mono px-3.5 py-1.5 rounded-full tracking-wider">
                    Featured
                  </span>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 flex flex-col justify-center relative z-20">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#41050c]/40 mb-6">
                    <span className="text-brand uppercase font-semibold">{featuredBlog.category}</span>
                    <span>•</span>
                    <span>{featuredBlog.readTime}</span>
                  </div>

                  <Link href={`/blogs/${featuredBlog.slug}`} className="group/title">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#41050c] leading-tight group-hover/title:text-brand transition-colors duration-300">
                      {featuredBlog.title}
                    </h2>
                  </Link>

                  <p className="mt-4 text-[#41050c]/60 text-base leading-relaxed line-clamp-3">
                    {featuredBlog.excerpt}
                  </p>

                  <div className="mt-8 pt-8 border-t border-[#41050c]/10 flex items-center justify-between">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                      {featuredBlog.authorImage ? (
                        <div className="h-10 w-10 rounded-full overflow-hidden border border-[#41050c]/10 relative shrink-0">
                          <Image
                            src={featuredBlog.authorImage}
                            alt={featuredBlog.authorName}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-[#41050c] border border-[#41050c]/10 flex items-center justify-center text-[#cecccc] font-semibold text-sm shrink-0">
                          {featuredBlog.authorName[0]}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-[#41050c]">{featuredBlog.authorName}</p>
                        <p className="text-xs text-[#41050c]/40">{featuredBlog.authorRole || "Author"}</p>
                      </div>
                    </div>

                    {/* Arrow Button */}
                    <Link
                      href={`/blogs/${featuredBlog.slug}`}
                      className="h-12 w-12 rounded-full border border-[#41050c]/20 hover:border-brand flex items-center justify-center text-[#41050c] transition-all duration-300 hover:bg-[#41050c] hover:text-[#cecccc]"
                    >
                      <svg className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Standard Blogs Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {/* Adjust source lists based on active category */}
                {(activeCategory === "All" ? remainingBlogs : filteredBlogs).map((blog) => (
                  <motion.article
                    key={blog.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group flex flex-col gap-6 p-6 rounded-3xl border border-[#41050c]/10 bg-[#41050c]/5 hover:bg-[#41050c]/10 hover:border-[#41050c]/20 transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Cover image area */}
                    <div className="w-full aspect-16/10 rounded-2xl overflow-hidden bg-[#41050c]/10 border border-[#41050c]/10 relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                      {blog.imageUrl ? (
                        <Image
                          src={blog.imageUrl}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 flex items-center justify-center">
                          <span className="text-[#41050c]/20 font-mono text-xs tracking-widest uppercase">
                            {blog.category} Media
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-xs font-mono text-[#41050c]/40 mb-3">
                        <span className="text-brand uppercase font-semibold">{blog.category}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>

                      <Link href={`/blogs/${blog.slug}`} className="group/title">
                        <h3 className="text-xl md:text-2xl font-serif text-[#41050c] tracking-tight leading-snug group-hover/title:text-brand transition-colors duration-300">
                          {blog.title}
                        </h3>
                      </Link>

                      <p className="mt-3 text-[#41050c]/60 text-sm leading-relaxed line-clamp-3 flex-grow">
                        {blog.excerpt}
                      </p>

                      <div className="mt-6 pt-6 border-t border-[#41050c]/10 flex items-center justify-between">
                        {/* Author */}
                        <div className="flex items-center gap-3">
                          {blog.authorImage ? (
                            <div className="h-8 w-8 rounded-full overflow-hidden border border-[#41050c]/10 relative shrink-0">
                              <Image
                                src={blog.authorImage}
                                alt={blog.authorName}
                                fill
                                className="object-cover"
                                sizes="32px"
                              />
                            </div>
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-[#41050c] border border-[#41050c]/10 flex items-center justify-center text-[#cecccc] font-semibold text-xs shrink-0">
                              {blog.authorName[0]}
                            </div>
                          )}
                          <div>
                            <p className="text-xs font-medium text-[#41050c]">{blog.authorName}</p>
                            <p className="text-[10px] text-[#41050c]/40">{blog.authorRole || "Author"}</p>
                          </div>
                        </div>

                        {/* Read More */}
                        <Link
                          href={`/blogs/${blog.slug}`}
                          className="text-xs font-mono text-[#41050c]/40 hover:text-[#41050c] flex items-center gap-1.5 transition-colors group-hover:text-[#41050c]"
                        >
                          <span>READ ARTICLE</span>
                          <svg className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
