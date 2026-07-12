"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Lead {
  id: string;
  name: string;
  email: string;
  type: string;
  reason: string;
  companyName: string | null;
  companyStage: string | null;
  hearAboutUs: string | null;
  message: string | null;
  createdAt: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  publishedAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"leads" | "blogs">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Fetch Leads
        const leadsRes = await fetch("/api/admin/submissions");
        if (leadsRes.status === 401) {
          router.push("/admin");
          return;
        }
        if (!leadsRes.ok) throw new Error("Failed to load submissions");
        const leadsData = await leadsRes.json();
        setLeads(leadsData);

        // Fetch Blogs
        const blogsRes = await fetch("/api/admin/blogs");
        if (!blogsRes.ok) throw new Error("Failed to load blogs");
        const blogsData = await blogsRes.json();
        setBlogs(blogsData);
      } catch (err: any) {
        setError(err.message || "An error occurred fetching data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/submissions?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete lead");
      setLeads(leads.filter((l) => l.id !== id));
    } catch (err: any) {
      alert(err.message || "Error deleting lead");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete blog article");
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (err: any) {
      alert(err.message || "Error deleting blog article");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs tracking-widest text-white/50 uppercase">Accessing Database...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white font-sans selection:bg-brand/30">
      {/* Dashboard Top Header */}
      <header className="border-b border-white/5 bg-black py-5 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/assets/logo/Coder-express-logo-white.png"
              alt="Coders Express Logo"
              width={160}
              height={55}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <span className="h-4 w-[1px] bg-white/20 hidden sm:inline" />
          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase hidden sm:inline">
            Control Console
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="border border-white/20 hover:border-brand hover:text-brand rounded-full px-5 py-2 text-xs font-mono tracking-widest uppercase transition-colors"
        >
          Sign Out
        </button>
      </header>

      {/* Main Grid Workspace */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-8 font-mono">
            {error}
          </div>
        )}

        {/* Tab Headers */}
        <div className="flex border-b border-white/5 mb-8 gap-8">
          <button
            onClick={() => setActiveTab("leads")}
            className={`pb-4 text-sm font-mono tracking-wider uppercase transition-colors relative ${
              activeTab === "leads" ? "text-brand font-semibold" : "text-white/40 hover:text-white"
            }`}
          >
            Leads / Inquiries ({leads.length})
            {activeTab === "leads" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`pb-4 text-sm font-mono tracking-wider uppercase transition-colors relative ${
              activeTab === "blogs" ? "text-brand font-semibold" : "text-white/40 hover:text-white"
            }`}
          >
            Journal / Blogs ({blogs.length})
            {activeTab === "blogs" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand" />
            )}
          </button>
        </div>

        {/* Tab Body: LEADS */}
        {activeTab === "leads" && (
          <div className="space-y-6 animate-fadeIn">
            {leads.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/5 rounded-2xl">
                <p className="text-white/40 font-mono text-sm uppercase">No submission records found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-black border border-white/5 hover:border-white/10 rounded-2xl p-6 md:p-8 transition-colors flex flex-col justify-between gap-6"
                  >
                    <div>
                      {/* Top Info */}
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                          <h4 className="text-lg font-serif font-medium text-white">{lead.name}</h4>
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-xs font-mono text-brand hover:underline"
                          >
                            {lead.email}
                          </a>
                        </div>
                        <span className="text-[10px] font-mono tracking-wider text-white/30 uppercase bg-white/5 px-3 py-1.5 rounded-md">
                          {new Date(lead.createdAt).toLocaleString()}
                        </span>
                      </div>

                      {/* Detail Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-t border-b border-white/5 my-4 text-xs font-mono text-white/70">
                        <div>
                          <span className="text-white/35 block mb-1">PROJECT TYPE:</span>
                          <span className="font-sans font-semibold text-white">{lead.type || "Not specified"}</span>
                        </div>
                        <div>
                          <span className="text-white/35 block mb-1">BUDGET/REASON:</span>
                          <span className="font-sans font-semibold text-white">{lead.reason || "Not specified"}</span>
                        </div>
                        <div>
                          <span className="text-white/35 block mb-1">COMPANY STAGE:</span>
                          <span className="font-sans font-semibold text-white">
                            {lead.companyName ? `${lead.companyName} (${lead.companyStage || "Stage N/A"})` : "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* Message body */}
                      {lead.message && (
                        <div className="mt-4 bg-[#090909] p-4 rounded-xl border border-white/[0.03]">
                          <span className="text-[10px] font-mono text-white/35 block mb-2">MESSAGE DETAILS:</span>
                          <p className="text-sm text-white/80 leading-relaxed font-sans whitespace-pre-wrap">
                            {lead.message}
                          </p>
                        </div>
                      )}

                      {/* Hear about us */}
                      {lead.hearAboutUs && (
                        <p className="text-[11px] font-mono text-white/40 mt-3">
                          Referral source: {lead.hearAboutUs}
                        </p>
                      )}
                    </div>

                    {/* Action Panel */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        disabled={deletingId === lead.id}
                        className="text-xs font-mono text-red-500 hover:text-red-400 disabled:opacity-50 tracking-wider uppercase"
                      >
                        {deletingId === lead.id ? "Removing..." : "Delete Inquiry"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Body: BLOGS */}
        {activeTab === "blogs" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Create Action */}
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-serif text-white tracking-tight">Journal Articles</h3>
              <Link
                href="/admin/dashboard/blogs/new"
                className="bg-white hover:bg-brand hover:text-white text-black font-semibold px-6 py-3 rounded-full text-xs font-mono tracking-widest uppercase transition-colors"
              >
                + New Article
              </Link>
            </div>

            {blogs.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-white/5 rounded-2xl mt-4">
                <p className="text-white/40 font-mono text-sm uppercase">No blog articles found.</p>
              </div>
            ) : (
              <div className="bg-black border border-white/5 rounded-2xl overflow-hidden mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-mono tracking-wider text-white/40 uppercase">
                        <th className="p-4 pl-6">Title</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Read Time</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {blogs.map((blog) => (
                        <tr key={blog.id} className="hover:bg-white/[0.01] transition-colors">
                          <td className="p-4 pl-6 font-serif font-medium text-white max-w-xs truncate">
                            {blog.title}
                          </td>
                          <td className="p-4 text-xs font-mono text-brand uppercase">{blog.category}</td>
                          <td className="p-4 text-xs font-mono text-white/50">{blog.readTime}</td>
                          <td className="p-4 text-xs font-mono text-white/40">
                            {new Date(blog.publishedAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 pr-6 text-right space-x-4">
                            <Link
                              href={`/admin/dashboard/blogs/${blog.id}`}
                              className="text-xs font-mono text-white/60 hover:text-white tracking-wide"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteBlog(blog.id)}
                              className="text-xs font-mono text-red-500 hover:text-red-400 tracking-wide"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
