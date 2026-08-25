"use client";

import { useState } from "react";
import { ImageDropZone } from "@/components/ImageDropZone";
import {
  formatBytes,
  validatePdfFile,
  loadPdfDocument,
  renderPageToCanvas,
  downloadAsZip,
  MAX_PDF_PAGES,
  type pdfjsDocumentProxy,
} from "@/lib/pdf-utils";
import { downloadBlob } from "@/lib/image-utils";

interface PagePreview {
  pageNumber: number;
  thumbnailUrl: string;
  width: number;
  height: number;
}

interface ConvertedImage {
  pageNumber: number;
  blob: Blob;
  url: string;
  fileName: string;
}

export function PdfToJpg() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [previews, setPreviews] = useState<PagePreview[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [quality, setQuality] = useState(0.85);
  const [scale, setScale] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const [convertedImages, setConvertedImages] = useState<ConvertedImage[]>([]);

  async function handleFileSelect(file: File) {
    const validationError = validatePdfFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsProcessing(true);
    setPdfFile(file);
    setConvertedImages([]);
    setSelectedPages(new Set());
    setPreviews([]);

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await loadPdfDocument(bytes);
      setPdfDoc(pdf);
      const count = pdf.numPages;
      setPageCount(count);

      if (count > MAX_PDF_PAGES) {
        setError(`This PDF has ${count} pages. Maximum supported is ${MAX_PDF_PAGES} pages.`);
        setIsProcessing(false);
        return;
      }

      const newPreviews: PagePreview[] = [];
      for (let i = 1; i <= count; i++) {
        const canvas = await renderPageToCanvas(pdf, i, 0.3);
        const url = canvas.toDataURL("image/jpeg", 0.5);
        newPreviews.push({
          pageNumber: i,
          thumbnailUrl: url,
          width: canvas.width,
          height: canvas.height,
        });
      }
      setPreviews(newPreviews);

      const allPages = new Set<number>();
      for (let i = 1; i <= count; i++) allPages.add(i);
      setSelectedPages(allPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load PDF.");
    } finally {
      setIsProcessing(false);
    }
  }

  function togglePage(pageNum: number) {
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageNum)) {
        next.delete(pageNum);
      } else {
        next.add(pageNum);
      }
      return next;
    });
  }

  function toggleAll() {
    if (selectedPages.size === pageCount) {
      setSelectedPages(new Set());
    } else {
      const all = new Set<number>();
      for (let i = 1; i <= pageCount; i++) all.add(i);
      setSelectedPages(all);
    }
  }

  async function handleConvert() {
    if (!pdfDoc || selectedPages.size === 0) return;

    setIsConverting(true);
    setError(null);
    setProgress({ current: 0, total: selectedPages.size });

    try {
      const pages = Array.from(selectedPages).sort((a, b) => a - b);
      const results: ConvertedImage[] = [];

      for (let i = 0; i < pages.length; i++) {
        const pageNum = pages[i]!;
        setProgress({ current: i + 1, total: pages.length });

        const canvas = await renderPageToCanvas(pdfDoc, pageNum, scale);
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error("Failed to convert page."))),
            "image/jpeg",
            quality,
          );
        });

        const url = URL.createObjectURL(blob);
        const baseName = pdfFile?.name.replace(/\.pdf$/i, "") ?? "page";
        results.push({
          pageNumber: pageNum,
          blob,
          url,
          fileName: `${baseName}-page-${pageNum}.jpg`,
        });
      }

      setConvertedImages((prev) => {
        for (const img of prev) URL.revokeObjectURL(img.url);
        return results;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to convert pages.");
    } finally {
      setIsConverting(false);
    }
  }

  async function handleDownloadAll() {
    if (convertedImages.length === 0) return;
    const baseName = pdfFile?.name.replace(/\.pdf$/i, "") ?? "pages";
    await downloadAsZip(
      convertedImages.map((img) => ({ fileName: img.fileName, data: img.blob })),
      `${baseName}-images.zip`,
    );
  }

  function handleReset() {
    for (const img of convertedImages) URL.revokeObjectURL(img.url);
    for (const prev of previews) URL.revokeObjectURL(prev.thumbnailUrl);
    setPdfFile(null);
    setPdfDoc(null);
    setPageCount(0);
    setPreviews([]);
    setSelectedPages(new Set());
    setConvertedImages([]);
    setError(null);
  }

  return (
    <div className="space-y-6">
      {!pdfFile && (
        <ImageDropZone
          onFileSelect={handleFileSelect}
          accept="application/pdf,.pdf"
          label="Drop a PDF here or click to upload"
          hint="Pages rendered to JPG images entirely in your browser — no uploads"
        />
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isProcessing && (
        <div className="flex items-center justify-center rounded-lg border border-brand-200 bg-brand-50 py-8">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
            <p className="text-sm font-medium text-brand-700">Loading PDF…</p>
          </div>
        </div>
      )}

      {pdfFile && !isProcessing && pageCount > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              {pdfFile.name}{" "}
              <span className="text-slate-400">
                ({pageCount} pages, {formatBytes(pdfFile.size)})
              </span>
            </p>
            <button
              onClick={handleReset}
              className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              ← Choose different PDF
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">
                Select Pages ({selectedPages.size}/{pageCount} selected)
              </h3>
              <button
                onClick={toggleAll}
                className="text-sm font-medium text-brand-600 transition hover:text-brand-700"
              >
                {selectedPages.size === pageCount ? "Deselect all" : "Select all"}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {previews.map((preview) => (
                <button
                  key={preview.pageNumber}
                  onClick={() => togglePage(preview.pageNumber)}
                  className={`relative overflow-hidden rounded-lg border-2 transition ${
                    selectedPages.has(preview.pageNumber)
                      ? "border-brand-500 ring-1 ring-brand-500"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  aria-label={`Page ${preview.pageNumber} ${selectedPages.has(preview.pageNumber) ? "selected" : "not selected"}`}
                  aria-pressed={selectedPages.has(preview.pageNumber)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview.thumbnailUrl}
                    alt={`Page ${preview.pageNumber}`}
                    className="aspect-[3/4] w-full object-contain bg-slate-50"
                  />
                  <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-xs font-medium text-white">
                    {preview.pageNumber}
                  </span>
                  {selectedPages.has(preview.pageNumber) && (
                    <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-sm font-semibold text-slate-700">
              Conversion Settings
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Quality:{" "}
                  <span className="font-bold text-brand-600">
                    {Math.round(quality * 100)}%
                  </span>
                </label>
                <input
                  type="range"
                  min={0.3}
                  max={1}
                  step={0.05}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Resolution:{" "}
                  <span className="font-bold text-brand-600">{scale}×</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={4}
                  step={0.5}
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>Faster</span>
                  <span>Higher quality</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleConvert}
                disabled={isConverting || selectedPages.size === 0}
                className="btn-primary"
              >
                {isConverting
                  ? `Converting… (${progress.current}/${progress.total})`
                  : `Convert ${selectedPages.size} page${selectedPages.size > 1 ? "s" : ""} to JPG`}
              </button>
            </div>
          </div>

          {isConverting && (
            <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3">
              <div className="flex items-center justify-between text-sm font-medium text-brand-700">
                <span>Converting pages…</span>
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

          {convertedImages.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-700">
                  {convertedImages.length} image{convertedImages.length > 1 ? "s" : ""} ready
                </h3>
                <button
                  onClick={handleDownloadAll}
                  className="btn-secondary"
                >
                  Download All (ZIP)
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {convertedImages.map((img) => (
                  <div
                    key={img.pageNumber}
                    className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                  >
                    <div className="flex aspect-square items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={`Page ${img.pageNumber}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200 bg-white px-2 py-1.5">
                      <span className="text-xs font-medium text-slate-600">
                        Page {img.pageNumber}
                      </span>
                      <span className="text-xs text-slate-400">
                        {formatBytes(img.blob.size)}
                      </span>
                      <button
                        onClick={() => downloadBlob(img.blob, img.fileName)}
                        className="rounded p-1 text-brand-600 transition hover:bg-brand-50"
                        aria-label={`Download page ${img.pageNumber}`}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
