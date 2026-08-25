"use client";

import { useState } from "react";
import { ImageDropZone } from "@/components/ImageDropZone";
import {
  formatBytes,
  validatePdfFile,
  getPdfPageCount,
  extractPdfPages,
  splitEveryPage,
  downloadPdfBytes,
  downloadAsZip,
  parsePageRanges,
  MAX_PDF_PAGES,
} from "@/lib/pdf-utils";

type SplitMode = "range" | "every-page";

export function SplitPdf() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [splitMode, setSplitMode] = useState<SplitMode>("range");
  const [rangeInput, setRangeInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const [resultCount, setResultCount] = useState(0);

  async function handleFileSelect(file: File) {
    const validationError = validatePdfFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsLoading(true);
    setPdfFile(file);
    setPageCount(0);
    setResultCount(0);
    setRangeInput("");

    try {
      const count = await getPdfPageCount(file);
      setPageCount(count);

      if (count > MAX_PDF_PAGES) {
        setError(`This PDF has ${count} pages. Maximum supported is ${MAX_PDF_PAGES} pages.`);
        setIsLoading(false);
        return;
      }

      setRangeInput(`1-${count}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Failed to read PDF: ${err.message}`
          : "Failed to read PDF. The file may be corrupted or encrypted.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSplit() {
    if (!pdfFile) return;

    setError(null);
    setResultCount(0);

    if (splitMode === "range") {
      let pageIndices: number[];
      try {
        pageIndices = parsePageRanges(rangeInput, pageCount);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invalid page range.");
        return;
      }

      if (pageIndices.length === 0) {
        setError("Please specify at least one page to extract.");
        return;
      }

      setIsProcessing(true);
      setProgress({ current: 0, total: 1 });

      try {
        const data = await extractPdfPages(pdfFile, pageIndices);
        const baseName = pdfFile.name.replace(/\.pdf$/i, "");
        const pagesStr =
          pageIndices.length === 1
            ? `page-${pageIndices[0]! + 1}`
            : `${pageIndices.length}-pages`;
        downloadPdfBytes(data, `${baseName}-${pagesStr}.pdf`);
        setResultCount(1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to extract pages.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      setIsProcessing(true);
      setProgress({ current: 0, total: pageCount });

      try {
        const results = await splitEveryPage(pdfFile, (current, total) => {
          setProgress({ current, total });
        });

        const baseName = pdfFile.name.replace(/\.pdf$/i, "");
        await downloadAsZip(
          results.map((r) => ({ fileName: r.fileName, data: r.data })),
          `${baseName}-split.zip`,
        );
        setResultCount(results.length);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to split PDF.");
      } finally {
        setIsProcessing(false);
      }
    }
  }

  function handleReset() {
    setPdfFile(null);
    setPageCount(0);
    setRangeInput("");
    setError(null);
    setResultCount(0);
  }

  return (
    <div className="space-y-6">
      {!pdfFile && (
        <ImageDropZone
          onFileSelect={handleFileSelect}
          accept="application/pdf,.pdf"
          label="Drop a PDF here or click to upload"
          hint="Split or extract pages entirely in your browser — no uploads"
        />
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="flex items-center justify-center rounded-lg border border-brand-200 bg-brand-50 py-8">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
            <p className="text-sm font-medium text-brand-700">Loading PDF…</p>
          </div>
        </div>
      )}

      {pdfFile && !isLoading && pageCount > 0 && (
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

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-sm font-semibold text-slate-700">
              Split Mode
            </h3>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSplitMode("range")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  splitMode === "range"
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Extract page range
              </button>
              <button
                onClick={() => setSplitMode("every-page")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  splitMode === "every-page"
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Split every page
              </button>
            </div>

            {splitMode === "range" && (
              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Pages to extract
                </label>
                <input
                  type="text"
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  placeholder="e.g. 1-3, 5, 7-9"
                  className="input-field"
                />
                <p className="mt-2 text-xs text-slate-400">
                  Enter page numbers separated by commas. Use hyphens for ranges.
                  This PDF has {pageCount} pages.
                </p>
              </div>
            )}

            {splitMode === "every-page" && (
              <div className="mt-6 rounded-lg bg-slate-50 p-4">
                <p className="text-sm text-slate-600">
                  This will create <strong>{pageCount}</strong> individual PDF files,
                  one per page. They will be downloaded as a ZIP archive.
                </p>
              </div>
            )}

            {isProcessing && (
              <div className="mt-6 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3">
                <div className="flex items-center justify-between text-sm font-medium text-brand-700">
                  <span>
                    {splitMode === "range" ? "Extracting pages…" : "Splitting PDF…"}
                  </span>
                  {splitMode === "every-page" && (
                    <span>{progress.current}/{progress.total}</span>
                  )}
                </div>
                {splitMode === "every-page" && (
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-100">
                    <div
                      className="h-full bg-brand-600 transition-all"
                      style={{ width: `${(progress.current / progress.total) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleSplit}
                disabled={isProcessing}
                className="btn-primary"
              >
                {isProcessing
                  ? "Processing…"
                  : splitMode === "range"
                    ? "Extract Pages"
                    : `Split into ${pageCount} PDFs`}
              </button>
            </div>
          </div>

          {resultCount > 0 && !isProcessing && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {splitMode === "range"
                ? "PDF extracted successfully. Check your downloads."
                : `${resultCount} PDF files created. Check your downloads for the ZIP file.`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
