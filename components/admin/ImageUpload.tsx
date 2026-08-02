"use client";

import React, { useState, useRef } from "react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

interface UploadResult {
  url: string;
  id: string;
  width: number;
  height: number;
  format: string;
  size: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  placeholder = "Upload image",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);
  const [imageInfo, setImageInfo] = useState<UploadResult | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPEG, PNG, WebP, and GIF images are allowed");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError("File size must be less than 5MB");
      return;
    }

    setError("");
    setUploading(true);

    // Create local preview
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setPreview(data.url);
      setImageInfo(data);
      onChange(data.url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
      setPreview(undefined);
      setImageInfo(null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    setImageInfo(null);
    onChange("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-mono uppercase tracking-wider text-white/40">
        {label}
      </label>

      <div className="relative">
        {/* Upload Area */}
        <div className="flex gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            id={`image-upload-${label}`}
          />

          <label
            htmlFor={`image-upload-${label}`}
            className={`flex-1 bg-[#121212] border ${
              error ? "border-red-500/50" : "border-white/10"
            } focus-within:border-brand/50 rounded-lg px-4 py-3 text-sm text-white outline-none transition-colors cursor-pointer hover:border-white/20 flex items-center justify-between gap-4`}
          >
            <span className="text-white/40 truncate">
              {preview ? "Change image" : placeholder}
            </span>
            <span className="text-xs font-mono text-brand uppercase tracking-wider whitespace-nowrap">
              {uploading ? "Uploading..." : "Browse"}
            </span>
          </label>

          {preview && (
            <button
              type="button"
              onClick={handleRemove}
              className="px-4 py-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 rounded-lg text-red-400 text-xs font-mono uppercase tracking-wider transition-colors"
            >
              Remove
            </button>
          )}
        </div>

        {error && (
          <p className="text-red-400 text-xs mt-2 font-mono">{error}</p>
        )}
      </div>

      {/* Image Preview with Info */}
      {preview && (
        <div className="mt-4 space-y-3">
          {/* Preview Image */}
          <div className="relative bg-[#121212] border border-white/5 rounded-xl overflow-hidden">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto max-h-[300px] object-contain"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
                    Uploading to Cloudinary...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Image Dimensions */}
          {imageInfo && (
            <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-3 flex flex-wrap gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-white/40">Dimensions:</span>
                <span className="text-white">{imageInfo.width} × {imageInfo.height}px</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/40">Format:</span>
                <span className="text-brand uppercase">{imageInfo.format}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/40">Size:</span>
                <span className="text-white">{imageInfo.size}</span>
              </div>
              <div className="flex-1 min-w-[150px]">
                <input
                  type="text"
                  readOnly
                  value={imageInfo.url}
                  className="w-full bg-transparent text-white/40 text-[10px] truncate"
                />
              </div>
            </div>
          )}

          {!imageInfo && preview && (
            <div className="bg-[#0a0a0a] border border-white/5 rounded-lg p-3">
              <p className="text-xs font-mono text-white/60">
                Image URL: <span className="text-white/40">{preview}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Manual URL Input Fallback */}
      <div className="mt-2 pt-2 border-t border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Or paste URL</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => {
            onChange(e.target.value);
            setPreview(e.target.value);
            setImageInfo(null);
          }}
          placeholder="https://example.com/image.jpg"
          className="w-full bg-[#121212] border border-white/10 focus:border-brand/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-colors font-mono"
        />
      </div>
    </div>
  );
}
