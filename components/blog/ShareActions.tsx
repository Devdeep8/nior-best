"use client";

import { useState } from "react";

interface ShareActionsProps {
  title: string;
}

export function ShareActions({ title }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const shareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="flex flex-row lg:flex-col items-center gap-3 w-full">
      {/* Twitter Share */}
      <button
        onClick={shareTwitter}
<<<<<<< Updated upstream
        className="flex-1 lg:flex-initial flex items-center justify-center gap-2 lg:h-12 lg:w-12 rounded-full border border-white/10 hover:border-brand/40 bg-white/[0.01] hover:bg-brand/5 px-4 py-2.5 lg:p-0 text-xs lg:text-sm text-white/60 hover:text-white transition-all duration-300"
=======
        className="flex-1 lg:flex-initial flex items-center justify-center gap-2 lg:h-12 lg:w-12 rounded-full border border-[#41050c]/10 hover:border-[#41050c]/30 bg-[#41050c]/5 hover:bg-[#41050c]/10 px-4 py-2.5 lg:p-0 text-xs lg:text-sm text-[#41050c]/60 hover:text-[#41050c] transition-all duration-300"
>>>>>>> Stashed changes
        title="Share on X"
      >
        <span className="lg:hidden font-mono uppercase tracking-wider text-[10px]">Share on X</span>
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* LinkedIn Share */}
      <button
        onClick={shareLinkedIn}
<<<<<<< Updated upstream
        className="flex-1 lg:flex-initial flex items-center justify-center gap-2 lg:h-12 lg:w-12 rounded-full border border-white/10 hover:border-brand/40 bg-white/[0.01] hover:bg-brand/5 px-4 py-2.5 lg:p-0 text-xs lg:text-sm text-white/60 hover:text-white transition-all duration-300"
=======
        className="flex-1 lg:flex-initial flex items-center justify-center gap-2 lg:h-12 lg:w-12 rounded-full border border-[#41050c]/10 hover:border-[#41050c]/30 bg-[#41050c]/5 hover:bg-[#41050c]/10 px-4 py-2.5 lg:p-0 text-xs lg:text-sm text-[#41050c]/60 hover:text-[#41050c] transition-all duration-300"
>>>>>>> Stashed changes
        title="Share on LinkedIn"
      >
        <span className="lg:hidden font-mono uppercase tracking-wider text-[10px]">LinkedIn</span>
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </button>

      {/* Copy Link Button */}
      <button
        onClick={handleCopy}
<<<<<<< Updated upstream
        className="flex-1 lg:flex-initial flex items-center justify-center gap-2 lg:h-12 lg:w-12 rounded-full border border-white/10 hover:border-brand/40 bg-white/[0.01] hover:bg-brand/5 px-4 py-2.5 lg:p-0 text-xs lg:text-sm text-white/60 hover:text-white transition-all duration-300 relative"
=======
        className="flex-1 lg:flex-initial flex items-center justify-center gap-2 lg:h-12 lg:w-12 rounded-full border border-[#41050c]/10 hover:border-[#41050c]/30 bg-[#41050c]/5 hover:bg-[#41050c]/10 px-4 py-2.5 lg:p-0 text-xs lg:text-sm text-[#41050c]/60 hover:text-[#41050c] transition-all duration-300 relative"
>>>>>>> Stashed changes
        title="Copy link"
      >
        <span className="lg:hidden font-mono uppercase tracking-wider text-[10px]">
          {copied ? "Copied!" : "Copy Link"}
        </span>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {copied ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          )}
        </svg>

        {/* Floating tooltip */}
        {copied && (
<<<<<<< Updated upstream
          <span className="hidden lg:block absolute left-14 bg-brand text-white text-[10px] font-mono uppercase px-2.5 py-1 rounded-md tracking-wider shadow-xl animate-fade-in whitespace-nowrap">
=======
          <span className="hidden lg:block absolute left-14 bg-[#41050c] text-[#cecccc] text-[10px] font-mono uppercase px-2.5 py-1 rounded-md tracking-wider shadow-xl animate-fade-in whitespace-nowrap">
>>>>>>> Stashed changes
            Link Copied!
          </span>
        )}
      </button>
    </div>
  );
}
