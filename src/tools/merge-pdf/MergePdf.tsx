"use client";

import { useState } from "react";
import { MultiFileDropZone } from "@/components/MultiFileDropZone";
import {
  formatBytes,
  validatePdfFile,
  mergePdfFiles,
  downloadPdfBytes,
  getPdfPageCount,
  MAX_MERGE_FILES,
  MAX_TOTAL_MERGE_SIZE,
} from "@/lib/pdf-utils";

interface PdfItem {
  file: File;
  pageCount: number | null;
}

export function MergePdf() {
  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);

  async function handleFilesSelected(files: File[]) {
    setError(null);

    if (pdfs.length + files.length > MAX_MERGE_FILES) {
      setError(`Maximum ${MAX_MERGE_FILES} PDF files allowed.`);
      return;
    }

    for (const file of files) {
      const validationError = validatePdfFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    const totalSize =
      pdfs.reduce((sum, p) => sum + p.file.size, 0) +
      files.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_TOTAL_MERGE_SIZE) {
      setError(`Total file size exceeds ${formatBytes(MAX_TOTAL_MERGE_SIZE)}.`);
      return;
    }

    setIsLoading(true);
    try {
      const newItems: PdfItem[] = [];
      for (const file of files) {
        let pageCount: number | null = null;
        try {
          pageCount = await getPdfPageCount(file);
        } catch {
          pageCount = null;
        }
        newItems.push({ file, pageCount });
      }
      setPdfs((prev) => [...prev, ...newItems]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load PDF files.");
    } finally {
      setIsLoading(false);
    }
  }

  function movePdf(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= pdfs.length) return;
    setPdfs((prev) => {
      const next = [...prev];
      [next[index], next[newIndex]] = [next[newIndex]!, next[index]!];
      return next;
    });
  }

  function removePdf(index: number) {
    setPdfs((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleMerge() {
    if (pdfs.length < 2) return;

    setIsProcessing(true);
    setError(null);
    setProgress({ current: 0, total: pdfs.length });

    try {
      const files = pdfs.map((p) => p.file);
      const merged = await mergePdfFiles(files, (current, total) => {
        setProgress({ current, total });
      });
      downloadPdfBytes(merged, "merged.pdf");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to merge PDFs.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleReset() {
    setPdfs([]);
    setError(null);
  }

  const totalPages = pdfs.reduce((sum, p) => sum + (p.pageCount ?? 0), 0);

  return (
    <div className="space-y-6">
      {pdfs.length === 0 && (
        <MultiFileDropZone
          onFilesSelected={handleFilesSelected}
          accept="application/pdf,.pdf"
          label="Drop PDF files here or click to upload"
          hint="Multiple PDFs merged into one file in your browser"
          maxFiles={MAX_MERGE_FILES}
        />
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700">
          Loading PDF files…
        </div>
      )}

      {pdfs.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              {pdfs.length} PDF{pdfs.length > 1 ? "s" : ""} selected
              {totalPages > 0 && (
                <span className="text-slate-400"> ({totalPages} pages total)</span>
              )}
            </p>
            <button
              onClick={handleReset}
              className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              ← Start over
            </button>
          </div>

          <div className="space-y-3">
            {pdfs.map((pdf, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-50 text-xl">
                  📄
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {pdf.file.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatBytes(pdf.file.size)}
                    {pdf.pageCount !== null && ` · ${pdf.pageCount} pages`}
                  </p>
                </div>
                <div className="flex flex-shrink-0 gap-1">
                  <button
                    onClick={() => movePdf(index, -1)}
                    disabled={index === 0}
                    className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
                    aria-label={`Move ${pdf.file.name} up`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => movePdf(index, 1)}
                    disabled={index === pdfs.length - 1}
                    className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
                    aria-label={`Move ${pdf.file.name} down`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => removePdf(index)}
                    className="rounded p-1 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                    aria-label={`Remove ${pdf.file.name}`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <MultiFileDropZone
              onFilesSelected={handleFilesSelected}
              accept="application/pdf,.pdf"
              label="Add more PDFs"
              hint="Click or drop to add"
              maxFiles={MAX_MERGE_FILES}
            />
          </div>

          {isProcessing && (
            <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3">
              <div className="flex items-center justify-between text-sm font-medium text-brand-700">
                <span>Merging PDFs…</span>
                <span>{progress.current}/{progress.total}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-100">
                <div
                  className="h-full bg-brand-600 transition-all"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleMerge}
              disabled={isProcessing || pdfs.length < 2}
              className="btn-primary"
            >
              {isProcessing ? "Merging…" : `Merge ${pdfs.length} PDFs`}
            </button>
            {pdfs.length < 2 && (
              <p className="self-center text-sm text-slate-400">
                Add at least 2 PDFs to merge
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
