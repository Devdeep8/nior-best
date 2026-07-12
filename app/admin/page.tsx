"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isSetup, setIsSetup] = useState(false);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Check if admin is already set up in DB
  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch("/api/admin/status");
        const data = await res.json();
        if (data.hasAdmin === false) {
          setIsSetup(true);
        }
      } catch (err) {
        console.error("Error checking status:", err);
      } finally {
        setChecking(false);
      }
    }
    checkStatus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!username || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isSetup ? "/api/admin/setup" : "/api/admin/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "An error occurred. Please try again.");
      }

      if (isSetup) {
        setSuccess("Admin account created successfully! Signing you in...");
        // Auto login after setup
        const loginRes = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });
        if (loginRes.ok) {
          router.push("/admin/dashboard");
        } else {
          setIsSetup(false);
          setSuccess("");
          setError("Account created, please sign in.");
        }
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to proceed.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs tracking-widest text-white/50 uppercase">Loading Session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden font-sans selection:bg-brand/30">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[420px] z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/assets/logo/Coder-express-logo-white.png"
            alt="Coders Express"
            width={200}
            height={68}
            className="h-10 w-auto object-contain mb-2"
          />
          <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">
            {isSetup ? "SYSTEM ONBOARDING" : "ADMINISTRATOR PORTAL"}
          </h2>
        </div>

        {/* Card */}
        <div className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-xl font-serif font-medium text-white mb-6 tracking-tight">
            {isSetup ? "Configure System Owner" : "Sign in to Dashboard"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-lg leading-relaxed font-mono">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-4 py-3 rounded-lg leading-relaxed font-mono">
                {success}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. administrator"
                className="w-full bg-[#121212] border border-white/10 focus:border-brand/50 rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors"
                disabled={loading}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/40">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#121212] border border-white/10 focus:border-brand/50 rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3.5 rounded-lg text-sm transition-all hover:bg-brand hover:text-white disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{isSetup ? "Create Account" : "Access Console"}</span>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs font-mono tracking-widest text-white/35 hover:text-brand transition-colors uppercase"
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
