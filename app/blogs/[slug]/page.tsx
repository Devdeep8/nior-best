import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/footer";
import { getBlogBySlug, getBlogs } from "@/lib/blogs";
import { ShareActions } from "@/components/blog/ShareActions";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate metadata dynamically based on the blog article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      publishedTime: blog.publishedAt.toISOString(),
      authors: [blog.authorName],
    },
  };
}

export const revalidate = 60; // Revalidate dynamic page every minute

function renderMarkdown(content: string) {
  const blocks = content.split(/\n\n+/);
  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Headings
    if (trimmed.startsWith("# ")) {
      return (
        <h1 key={index} className="text-3xl md:text-4xl font-serif text-[#41050c] mt-12 mb-6 font-semibold tracking-tight">
          {trimmed.replace("# ", "")}
        </h1>
      );
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={index} className="text-2xl md:text-3xl font-serif text-[#41050c] mt-10 mb-4 font-semibold tracking-tight">
          {trimmed.replace("## ", "")}
        </h2>
      );
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote key={index} className="border-l-2 border-brand pl-6 my-8 italic text-[#41050c]/70 text-lg md:text-xl font-normal leading-relaxed">
          {trimmed.replace(/^> \s*/g, "").replace(/"/g, "")}
        </blockquote>
      );
    }

    // Unordered List
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split(/\n- /);
      return (
        <ul key={index} className="list-disc pl-6 my-6 space-y-3 text-[#41050c]/60">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {item.replace(/^- /, "").trim()}
            </li>
          ))}
        </ul>
      );
    }

    // Code block
    if (trimmed.startsWith("```")) {
      const lines = trimmed.split("\n");
      const codeLines = lines.slice(1, lines.length - 1).join("\n");
      return (
        <pre key={index} className="bg-[#41050c]/5 border border-[#41050c]/10 p-5 rounded-2xl my-8 overflow-x-auto font-mono text-xs md:text-sm text-brand">
          <code>{codeLines}</code>
        </pre>
      );
    }

    // Paragraph with inline code and bolding
    const parts = trimmed.split(/(\*\*.*?\*\*|`.*?`)/g);
    const parsedParagraph = parts.map((part, pIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={pIdx} className="text-[#41050c] font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={pIdx} className="bg-[#41050c]/10 border border-[#41050c]/10 text-brand px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
      }
      return part;
    });

    return (
      <p key={index} className="text-[#41050c]/60 text-base md:text-lg leading-relaxed mb-6 font-normal">
        {parsedParagraph}
      </p>
    );
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Fetch related blogs in the same category
  const allBlogs = await getBlogs();
  const relatedBlogs = allBlogs
    .filter((b) => b.slug !== slug && b.category === blog.category)
    .slice(0, 3);

  // Pad with other categories if needed
  if (relatedBlogs.length < 3) {
    const otherBlogs = allBlogs.filter((b) => b.slug !== slug && b.category !== blog.category);
    relatedBlogs.push(...otherBlogs.slice(0, 3 - relatedBlogs.length));
  }

  const formattedDate = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-[var(--background)] text-[#41050c] selection:bg-brand/30">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-[#41050c]/10">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Category & Read Time */}
          <div className="flex items-center justify-center gap-3 font-mono text-[11px] tracking-widest text-brand uppercase mb-6">
            <span>{blog.category}</span>
            <span className="text-[#41050c]/20">•</span>
            <span className="text-[#41050c]/40">{blog.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#41050c] tracking-tight leading-tight mb-8 font-medium">
            {blog.title}
          </h1>

          {/* Author & Date Card */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-[#41050c]/10 max-w-sm mx-auto">
            {blog.authorImage ? (
              <div className="h-12 w-12 rounded-full overflow-hidden border border-[#41050c]/10 relative shrink-0">
                <Image
                  src={blog.authorImage}
                  alt={blog.authorName}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-full bg-[#41050c] border border-[#41050c]/10 flex items-center justify-center text-[#cecccc] font-semibold text-base shrink-0">
                {blog.authorName[0]}
              </div>
            )}
            <div className="text-left">
              <p className="text-sm font-medium text-[#41050c]">{blog.authorName}</p>
              <p className="text-xs text-[#41050c]/40">
                {blog.authorRole || "Author"} • {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Column Layout */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Side Info Column (Desktop Sticky Left) */}
          <div className="lg:col-span-3 lg:sticky lg:top-28 lg:h-fit space-y-8 order-2 lg:order-1 border-t lg:border-t-0 pt-10 lg:pt-0 border-[#41050c]/10">
            {/* Back to Blogs */}
            <div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-xs font-mono text-[#41050c]/40 hover:text-brand transition-colors tracking-widest"
              >
                <svg className="h-4 w-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>BACK TO JOURNAL</span>
              </Link>
            </div>

            {/* Sharing widgets */}
            <div className="space-y-4 pt-6 lg:pt-0 border-t border-[#41050c]/10 lg:border-t-0">
              <h4 className="text-[10px] font-mono tracking-[0.2em] text-[#41050c]/30 uppercase">
                Share Article
              </h4>
              <ShareActions title={blog.title} />
            </div>
          </div>

          {/* Article Column */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            {/* Cover Image Area */}
            <div className="w-full aspect-16/9 rounded-3xl bg-[#41050c]/10 border border-[#41050c]/10 relative flex items-center justify-center mb-16 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
              {blog.imageUrl ? (
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  priority
                  sizes="(max-width: 1024px) 100vw, 80vw"
                />
              ) : (
                <div className="absolute inset-0 transition-transform duration-1000 ease-out hover:scale-105 flex items-center justify-center">
                  <span className="text-[#41050c]/20 font-mono text-sm tracking-widest uppercase">
                    {blog.category} Media Poster
                  </span>
                </div>
              )}
            </div>

            {/* Content Display */}
            <article className="prose prose-invert prose-neutral max-w-none">
              {renderMarkdown(blog.content)}
            </article>
          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      {relatedBlogs.length > 0 && (
        <section className="bg-[#41050c]/5 border-t border-[#41050c]/10 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#41050c]/40 uppercase block mb-3">
                  [ CONTINUE READING ]
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-[#41050c] font-medium tracking-tight">
                  Related Articles
                </h2>
              </div>
              <Link
                href="/blogs"
                className="text-xs font-mono text-[#41050c]/60 hover:text-brand transition-colors tracking-widest flex items-center gap-1.5"
              >
                <span>VIEW ALL POSTS</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((rBlog) => (
                <article
                  key={rBlog.id}
                  className="group flex flex-col gap-6 p-6 rounded-3xl border border-[#41050c]/10 bg-[#41050c]/5 hover:bg-[#41050c]/10 hover:border-[#41050c]/20 transition-all duration-500 relative overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="w-full aspect-16/10 rounded-2xl overflow-hidden bg-[#41050c]/10 border border-[#41050c]/10 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                    {rBlog.imageUrl ? (
                      <Image
                        src={rBlog.imageUrl}
                        alt={rBlog.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 flex items-center justify-center">
                        <span className="text-[#41050c]/20 font-mono text-xs tracking-widest uppercase">
                          {rBlog.category} Media
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content details */}
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs font-mono text-[#41050c]/40 mb-3">
                      <span className="text-brand uppercase font-semibold">{rBlog.category}</span>
                      <span>•</span>
                      <span>{rBlog.readTime}</span>
                    </div>

                    <Link href={`/blogs/${rBlog.slug}`} className="group/title">
                      <h3 className="text-lg md:text-xl font-serif text-[#41050c] tracking-tight leading-snug group-hover/title:text-brand transition-colors duration-300 line-clamp-2">
                        {rBlog.title}
                      </h3>
                    </Link>

                    <p className="mt-3 text-[#41050c]/60 text-sm leading-relaxed line-clamp-2 flex-grow">
                      {rBlog.excerpt}
                    </p>

                    <div className="mt-6 pt-6 border-t border-[#41050c]/10 flex items-center justify-between">
                      {/* Author */}
                      <div className="flex items-center gap-3">
                        {rBlog.authorImage ? (
                          <div className="h-8 w-8 rounded-full overflow-hidden border border-[#41050c]/10 relative shrink-0">
                            <Image
                              src={rBlog.authorImage}
                              alt={rBlog.authorName}
                              fill
                              className="object-cover"
                              sizes="32px"
                            />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-[#41050c] border border-[#41050c]/10 flex items-center justify-center text-[#cecccc] font-semibold text-xs shrink-0">
                            {rBlog.authorName[0]}
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-medium text-[#41050c]">{rBlog.authorName}</p>
                          <p className="text-[10px] text-[#41050c]/40">{rBlog.authorRole || "Author"}</p>
                        </div>
                      </div>
                      <Link
                        href={`/blogs/${rBlog.slug}`}
                        className="text-[11px] font-mono text-[#41050c]/40 group-hover:text-[#41050c] transition-colors flex items-center gap-1"
                      >
                        <span>READ ARTICLE</span>
                        <svg className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
