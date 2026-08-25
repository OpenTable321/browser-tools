"use client";

import { useRef, useState } from "react";

interface MultiFileDropZoneProps {
  onFilesSelected: (files: File[]) => void;
  accept: string;
  label: string;
  hint: string;
  maxFiles?: number;
}

export function MultiFileDropZone({
  onFilesSelected,
  accept,
  label,
  hint,
  maxFiles,
}: MultiFileDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) onFilesSelected(files);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={label}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-16 transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
        isDragging
          ? "border-brand-500 bg-brand-50"
          : "border-slate-300 bg-slate-50 hover:border-brand-400 hover:bg-brand-50/50"
      }`}
    >
      <svg
        className="h-12 w-12 text-slate-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <p className="mt-4 text-lg font-medium text-slate-700">{label}</p>
      <p className="mt-1 text-center text-sm text-slate-500">
        {hint}
        {maxFiles && ` (max ${maxFiles} files)`}
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length > 0) onFilesSelected(files);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }}
        className="hidden"
      />
    </div>
  );
}
