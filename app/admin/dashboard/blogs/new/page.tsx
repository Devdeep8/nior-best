"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function NewBlogPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Design");
  const [readTime, setReadTime] = useState("5 min read");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const [authorName, setAuthorName] = useState(" Sarah Jenkins");
  const [authorRole, setAuthorRole] = useState("Design Principal");
  const [authorImage, setAuthorImage] = useState("");

  const [previewMode, setPreviewMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!title || !content || !category || !authorName) {
      setError("Please fill in all required fields (Title, Content, Category, Author Name).");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          readTime,
          excerpt,
          content,
          imageUrl: imageUrl || null,
          authorName,
          authorRole: authorRole || null,
          authorImage: authorImage || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create article");

      setSuccess("Article published successfully! Redirecting...");
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="admin-theme min-h-screen bg-[#060606] text-white font-sans selection:bg-blue-500/30 pb-20">
      <AdminSidebar onMobileToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="lg:ml-64">
        <AdminHeader
          title="Create New Article"
          subtitle="Write and publish a new blog post"
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "New Article" }
          ]}
          action={
            <Link
              href="/admin/dashboard"
              className="border border-white/10 hover:border-white/20 rounded-lg px-4 py-2 text-xs font-mono tracking-widest uppercase transition-colors"
            >
              Cancel
            </Link>
          }
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

      {/* Main Content */}
      <main className="p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-serif text-white tracking-tight">Create New Article</h2>
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="text-xs font-mono border border-white/10 px-4 py-2 rounded-full hover:border-white/25 transition-colors"
          >
            {previewMode ? "Edit Mode" : "Preview Content"}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-8 font-mono">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-4 rounded-xl mb-8 font-mono">
            {success}
          </div>
        )}

        {previewMode ? (
          <div className="bg-[#080808] border border-white/5 rounded-xl p-8 min-h-100">
            <span className="text-[11px] font-mono tracking-widest text-brand uppercase block mb-3">
              {category} • {readTime}
            </span>
            <h1 className="text-4xl font-serif font-semibold mb-6">{title || "Untitled Article"}</h1>
            {imageUrl && (
              <div className="w-full aspect-video rounded-xl bg-neutral-900 border border-white/5 relative overflow-hidden mb-8">
                <img src={imageUrl} alt="Cover preview" className="w-full h-full object-cover" />
              </div>
            )}
            <article className="prose prose-invert prose-neutral max-w-none space-y-4">
              {content ? (
                content.split("\n\n").map((para, i) => (
                  <p key={i} className="text-white/60 text-lg leading-relaxed">
                    {para}
                  </p>
                ))
              ) : (
                <p className="text-white/25 italic">No content written yet.</p>
              )}
            </article>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
              {/* Row 1: Title */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/40">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Psychology of High-Ticket Branding"
                  className="w-full bg-[#121212] border border-white/10 focus:border-brand/50 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors"
                  disabled={loading}
                />
              </div>

              {/* Row 2: Category & Read Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/40">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 focus:border-brand/50 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors"
                    disabled={loading}
                  >
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Branding">Branding</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/40">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="w-full bg-[#121212] border border-white/10 focus:border-brand/50 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Row 3: Excerpt */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/40">
                  Short Excerpt
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Summarize the article briefly for the list view..."
                  className="w-full h-20 bg-[#121212] border border-white/10 focus:border-brand/50 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors resize-none"
                  disabled={loading}
                />
              </div>

              {/* Row 4: Image Upload */}
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
                label="Cover Image"
                placeholder="Upload cover image for article"
              />

              {/* Row 5: Content Editor */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/40">
                  Article Body (Supports Markdown) *
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article details here. Use # for headers, - for lists, etc."
                  className="w-full h-80 bg-[#121212] border border-white/10 focus:border-brand/50 rounded-lg px-4 py-4 text-sm text-white placeholder-white/20 outline-none transition-colors resize-y font-mono"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Author details card */}
            <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-6 md:p-8 space-y-6">
              <h4 className="text-sm font-mono uppercase tracking-wider text-brand">Author Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/40">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 focus:border-brand/50 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors"
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-white/40">
                    Author Role
                  </label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 focus:border-brand/50 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors"
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <ImageUpload
                    value={authorImage}
                    onChange={setAuthorImage}
                    label="Author Image"
                    placeholder="Upload author profile image"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 mt-8">
              <Link
                href="/admin/dashboard"
                className="border border-white/10 hover:border-white/25 rounded-full px-8 py-3 text-xs font-mono tracking-widest uppercase transition-colors"
              >
                Discard
              </Link>
              <button
                type="submit"
                className="bg-white text-black hover:bg-brand hover:text-white font-semibold px-8 py-3 rounded-full text-xs font-mono tracking-widest uppercase transition-colors flex items-center gap-2"
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish Article"}
              </button>
            </div>
          </form>
        )}
      </main>
      </div>
    </div>
  );
}
