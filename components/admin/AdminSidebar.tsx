"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface MenuItem {
  name: string;
  href: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: "📊" },
  { name: "Leads", href: "/admin/dashboard?tab=leads", icon: "📥" },
  { name: "Blogs", href: "/admin/dashboard?tab=blogs", icon: "📝" },
];

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin/dashboard" || pathname === "/admin/dashboard?";
    }
    return pathname.includes(href.split("?")[0]);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-[#080808] border-r border-white/5 z-50
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          {!collapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <Image
                src="/assets/logo/Mixspace-Studio-logo-white-transparent.png"
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-auto object-contain"
              />
              <span className="text-sm font-semibold text-white">Admin</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/admin/dashboard" className="flex items-center justify-center w-full">
              <Image
                src="/assets/logo/Mixspace-Studio-logo-white-transparent.png"
                alt="Logo"
                width={32}
                height={32}
                className="w-8 h-auto object-contain"
              />
            </Link>
          )}

          {/* Collapse Toggle - Desktop */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive(item.href)
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </Link>
          ))}

          {/* Divider */}
          <div className="my-4 border-t border-white/5" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400/80 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <span className="text-lg flex-shrink-0">🚪</span>
            {!collapsed && (
              <span className="text-sm font-medium">Sign Out</span>
            )}
          </button>
        </nav>

        {/* User Info Section */}
        {!collapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Administrator</p>
                <p className="text-xs text-white/40 truncate">System Owner</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
