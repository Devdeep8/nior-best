"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";

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
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <div className="admin-theme min-h-screen bg-[#060606] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs tracking-widest text-white/50 uppercase">Loading Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-theme min-h-screen bg-[#060606] text-white font-sans selection:bg-blue-500/30">
      <AdminSidebar onMobileToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <div className="lg:ml-64">
        <AdminHeader
          title="Dashboard"
          subtitle="Welcome back! Here's what's happening today."
          breadcrumbs={[{ label: "Admin" }, { label: "Dashboard" }]}
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

      {/* Main Content */}
      <main className="p-6 lg:p-8">
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl font-mono">
            {error}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Leads"
            value={leads.length}
            icon="📥"
            color="blue"
            description="All submissions"
          />
          <StatsCard
            title="Total Articles"
            value={blogs.length}
            icon="📝"
            color="green"
            description="Published blogs"
          />
          <StatsCard
            title="This Month"
            value={leads.filter(l => {
              const date = new Date(l.createdAt);
              const now = new Date();
              return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
            }).length}
            icon="📊"
            color="purple"
            description="New leads"
          />
          <StatsCard
            title="Quick Actions"
            value="—"
            icon="⚡"
            color="orange"
            description="Shortcuts"
            onClick={() => setActiveTab("blogs")}
          />
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-8 font-mono">
            {error}
          </div>
        )}

        {/* Tab Headers */}
        <div className="flex border-b border-white/5 mb-6 gap-6">
          <button
            onClick={() => setActiveTab("leads")}
            className={`pb-3 px-2 text-sm font-mono tracking-wider uppercase transition-colors relative ${
              activeTab === "leads" ? "text-blue-400 font-semibold" : "text-white/40 hover:text-white/60"
            }`}
          >
            Leads / Inquiries ({leads.length})
            {activeTab === "leads" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`pb-3 px-2 text-sm font-mono tracking-wider uppercase transition-colors relative ${
              activeTab === "blogs" ? "text-blue-400 font-semibold" : "text-white/40 hover:text-white/60"
            }`}
          >
            Journal / Blogs ({blogs.length})
            {activeTab === "blogs" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
            )}
          </button>
        </div>

        {/* Tab Body: LEADS */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {leads.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-white/5 rounded-xl">
                <p className="text-white/40 font-mono text-sm uppercase">No submission records found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-[#080808] border border-white/5 hover:border-blue-500/20 rounded-xl p-5 transition-all duration-200 flex flex-col justify-between gap-4"
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
          <div className="space-y-6">
            {/* Create Action */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white tracking-tight">Journal Articles</h3>
              <Link
                href="/admin/dashboard/blogs/new"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-lg text-xs font-mono tracking-widest uppercase transition-colors flex items-center gap-2"
              >
                <span>+</span> New Article
              </Link>
            </div>

            {blogs.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-white/5 rounded-xl">
                <p className="text-white/40 font-mono text-sm uppercase">No blog articles found</p>
              </div>
            ) : (
              <div className="bg-[#080808] border border-white/5 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5 text-xs font-mono tracking-wider text-white/40 uppercase">
                        <th className="p-4 pl-6">Title</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Read Time</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {blogs.map((blog) => (
                        <tr key={blog.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 pl-6 font-medium text-white max-w-xs truncate">
                            {blog.title}
                          </td>
                          <td className="p-4">
                            <span className="text-xs font-mono bg-blue-500/10 text-blue-400 px-2 py-1 rounded uppercase">
                              {blog.category}
                            </span>
                          </td>
                          <td className="p-4 text-xs text-white/50">{blog.readTime}</td>
                          <td className="p-4 text-xs text-white/40">
                            {new Date(blog.publishedAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 pr-6 text-right space-x-3">
                            <Link
                              href={`/admin/dashboard/blogs/${blog.id}`}
                              className="text-xs font-medium text-white/60 hover:text-white tracking-wide transition-colors"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDeleteBlog(blog.id)}
                              className="text-xs font-medium text-red-400/80 hover:text-red-400 tracking-wide transition-colors"
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
    </div>
  );
}
