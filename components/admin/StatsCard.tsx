"use client";

import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  description?: string;
  color?: "blue" | "green" | "purple" | "orange";
  onClick?: () => void;
}

const colorClasses = {
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "text-blue-400",
    trend: "text-blue-400",
  },
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    icon: "text-green-400",
    trend: "text-green-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    icon: "text-purple-400",
    trend: "text-purple-400",
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    icon: "text-orange-400",
    trend: "text-orange-400",
  },
};

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  description,
  color = "blue",
  onClick,
}: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden bg-[#080808] border ${colors.border} rounded-xl p-6
        hover:border-opacity-40 transition-all duration-200
        ${onClick ? "cursor-pointer hover:bg-[#0a0a0a]" : ""}
      `}
    >
      {/* Background Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-full blur-3xl opacity-30 pointer-events-none`} />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-1">
              {title}
            </p>
            <p className="text-3xl font-semibold text-white tracking-tight">
              {value}
            </p>
          </div>

          {icon && (
            <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center ${colors.icon}`}>
              <span className="text-xl">{icon}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {trend && (
            <div className="flex items-center gap-1.5">
              {trend.direction === "up" && (
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {trend.direction === "down" && (
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              <span className={`text-xs font-medium ${
                trend.direction === "up" ? "text-green-400" :
                trend.direction === "down" ? "text-red-400" :
                "text-white/40"
              }`}>
                {trend.value}
              </span>
            </div>
          )}

          {description && (
            <p className="text-xs text-white/30">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
