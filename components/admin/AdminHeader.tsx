"use client";

import React from "react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  action?: React.ReactNode;
  onMobileMenuToggle?: () => void;
}

export default function AdminHeader({
  title,
  subtitle,
  breadcrumbs = [],
  action,
  onMobileMenuToggle,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#080808]/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="hidden md:flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <span className="text-white/20">/</span>
                  )}
                  {crumb.href ? (
                    <a
                      href={crumb.href}
                      className="text-white/40 hover:text-white/60 transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-white/60">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>

        {/* Right Section - Action */}
        {action && (
          <div className="flex items-center">
            {action}
          </div>
        )}
      </div>

      {/* Page Title Row */}
      <div className="px-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-sm text-white/40 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
