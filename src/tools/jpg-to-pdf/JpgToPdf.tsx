"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { MultiFileDropZone } from "@/components/MultiFileDropZone";
import {
  formatBytes,
  validateImageFileForPdf,
  MAX_JPG_TO_PDF_IMAGES,
} from "@/lib/pdf-utils";
import { loadImageFromFile } from "@/lib/image-utils";

type PageSize = "a4" | "letter" | "original";
type Orientation = "portrait" | "landscape";

interface ImageItem {
  file: File;
  dataUrl: string;
  width: number;
  height: number;
}

const PAGE_DIMENSIONS: Record<PageSize, { width: number; height: number }> = {
  a4: { width: 210, height: 297 },
  letter: { width: 215.9, height: 279.4 },
  original: { width: 0, height: 0 },
};

export function JpgToPdf() {
  const { t } = useTranslation();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleFilesSelected(files: File[]) {
    setError(null);

    if (images.length + files.length > MAX_JPG_TO_PDF_IMAGES) {
      setError(t("common.maxImagesAllowed", { count: MAX_JPG_TO_PDF_IMAGES }));
      return;
    }

    for (const file of files) {
      const validationError = validateImageFileForPdf(file);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setIsLoading(true);
    try {
      const newItems: ImageItem[] = [];
      for (const file of files) {
        const { img, dataUrl } = await loadImageFromFile(file);
        newItems.push({
          file,
          dataUrl,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      }
      setImages((prev) => [...prev, ...newItems]);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.failedToLoadImages"));
    } finally {
      setIsLoading(false);
    }
  }

  function moveImage(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= images.length) return;
    setImages((prev) => {
      const next = [...prev];
      [next[index], next[newIndex]] = [next[newIndex]!, next[index]!];
      return next;
    });
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleGenerate() {
    if (images.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      const { jsPDF } = await import("jspdf");

      const getOrientedDims = (w: number, h: number) => {
        if (orientation === "landscape") return { width: h, height: w };
        return { width: w, height: h };
      };

      const pageDims =
        pageSize === "original"
          ? { width: 0, height: 0 }
          : getOrientedDims(
              PAGE_DIMENSIONS[pageSize]!.width,
              PAGE_DIMENSIONS[pageSize]!.height,
            );

      const pdf = new jsPDF({
        orientation,
        unit: "mm",
        format:
          pageSize === "original" ? [images[0]!.width, images[0]!.height] : pageSize,
      });

      for (let i = 0; i < images.length; i++) {
        const img = images[i]!;

        if (i > 0) {
          if (pageSize === "original") {
            pdf.addPage([img.width, img.height], orientation);
          } else {
            pdf.addPage(pageSize, orientation);
          }
        }

        if (pageSize === "original") {
          pdf.addImage(img.dataUrl, "AUTO", 0, 0, img.width, img.height);
        } else {
          const pageW = pageDims.width;
          const pageH = pageDims.height;
          const margin = 10;
          const availW = pageW - margin * 2;
          const availH = pageH - margin * 2;

          const imgRatio = img.width / img.height;
          const availRatio = availW / availH;

          let drawW: number;
          let drawH: number;

          if (imgRatio > availRatio) {
            drawW = availW;
            drawH = availW / imgRatio;
          } else {
            drawH = availH;
            drawW = availH * imgRatio;
          }

          const x = (pageW - drawW) / 2;
          const y = (pageH - drawH) / 2;

          pdf.addImage(img.dataUrl, "AUTO", x, y, drawW, drawH);
        }
      }

      pdf.save("images.pdf");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.failedToGeneratePdf"));
    } finally {
      setIsProcessing(false);
    }
  }

  function handleReset() {
    setImages([]);
    setError(null);
  }

  return (
    <div className="space-y-6">
      {images.length === 0 && (
        <MultiFileDropZone
          onFilesSelected={handleFilesSelected}
          accept="image/jpeg,image/png,image/webp"
          label={t("common.dropImagesHere")}
          hint={t("common.combinedIntoPdf")}
          maxFiles={MAX_JPG_TO_PDF_IMAGES}
        />
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700">
          {t("common.loadingImages")}
        </div>
      )}

      {images.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              {t("common.imagesSelected", { count: images.length })}
            </p>
            <button
              onClick={handleReset}
              className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              {t("common.startOver")}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
              >
                <div className="flex aspect-square items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.dataUrl}
                    alt={`Page ${index + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 bg-white px-2 py-1.5">
                  <span className="text-xs font-medium text-slate-600">
                    {index + 1}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatBytes(img.file.size)}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => moveImage(index, -1)}
                      disabled={index === 0}
                      className="rounded p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
                      aria-label={`Move image ${index + 1} left`}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveImage(index, 1)}
                      disabled={index === images.length - 1}
                      className="rounded p-0.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
                      aria-label={`Move image ${index + 1} right`}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => removeImage(index)}
                      className="rounded p-0.5 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                      aria-label={`Remove image ${index + 1}`}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <MultiFileDropZone
              onFilesSelected={handleFilesSelected}
              accept="image/jpeg,image/png,image/webp"
              label={t("common.addMoreImages")}
              hint={t("common.clickOrDropToAdd")}
              maxFiles={MAX_JPG_TO_PDF_IMAGES}
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-sm font-semibold text-slate-700">
              {t("common.pdfSettings")}
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  {t("common.pageSize")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {(["a4", "letter", "original"] as PageSize[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => setPageSize(size)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                        pageSize === size
                          ? "bg-brand-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {size === "a4" ? "A4" : size === "letter" ? "Letter" : t("common.original")}
                    </button>
                  ))}
                </div>
              </div>

              {pageSize !== "original" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    {t("common.orientation")}
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setOrientation("portrait")}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                        orientation === "portrait"
                          ? "bg-brand-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {t("common.portrait")}
                    </button>
                    <button
                      onClick={() => setOrientation("landscape")}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                        orientation === "landscape"
                          ? "bg-brand-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {t("common.landscape")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleGenerate}
                disabled={isProcessing || images.length === 0}
                className="btn-primary"
              >
                {isProcessing ? t("common.generatingPdf") : `${t("common.generatePdf")} (${images.length} ${images.length > 1 ? t("common.pagesLabel", { count: images.length }) : t("common.page")})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
