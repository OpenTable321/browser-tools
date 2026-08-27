"use client";

import { useCallback, useRef, useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";
import { formatBytes } from "@/lib/image-utils";

interface CompressedResult {
  blob: Blob;
  url: string;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
}

export function ImageCompressor() {
  const { t } = useTranslation();
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [fileName, setFileName] = useState("");
  const [quality, setQuality] = useState(0.8);
  const [format, setFormat] = useState<"image/jpeg" | "image/webp">(
    "image/jpeg",
  );
  const [result, setResult] = useState<CompressedResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError(t("common.pleaseSelectImage"));
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        setError(t("common.fileTooLarge"));
        return;
      }

      setError(null);
      setIsProcessing(true);
      setFileName(file.name);
      setOriginalSize(file.size);

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;

          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          ctx.drawImage(img, 0, 0);

          const origUrl = e.target?.result as string;
          setOriginalUrl(origUrl);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                setError(t("common.failedToCompress"));
                setIsProcessing(false);
                return;
              }

              const url = URL.createObjectURL(blob);
              setResult((prev) => {
                if (prev) URL.revokeObjectURL(prev.url);
                return {
                  blob,
                  url,
                  originalSize: file.size,
                  compressedSize: blob.size,
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                };
              });
              setIsProcessing(false);
            },
            format,
            quality,
          );
        };
        img.onerror = () => {
          setError(t("common.failedToLoadImage"));
          setIsProcessing(false);
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        setError(t("common.failedToReadFile"));
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    },
    [quality, format],
  );

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processImage(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processImage(file);
  }

  function handleRecompress() {
    if (!originalUrl) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsProcessing(true);
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError(t("common.failedToCompressShort"));
          setIsProcessing(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        setResult((prev) => {
          if (prev) URL.revokeObjectURL(prev.url);
          return {
            blob,
            url,
            originalSize,
            compressedSize: blob.size,
            width: canvas.width,
            height: canvas.height,
          };
        });
        setIsProcessing(false);
      },
      format,
      quality,
    );
  }

  function handleDownload() {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    const ext = format === "image/jpeg" ? "jpg" : "webp";
    const baseName = fileName.replace(/\.[^.]+$/, "");
    a.download = `${baseName}-compressed.${ext}`;
    a.click();
  }

  function handleReset() {
    if (result) URL.revokeObjectURL(result.url);
    setOriginalUrl(null);
    setResult(null);
    setOriginalSize(0);
    setFileName("");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const savings =
    result && result.originalSize > 0
      ? Math.round(
          ((result.originalSize - result.compressedSize) /
            result.originalSize) *
            100,
        )
      : 0;

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      {!originalUrl && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Upload image"
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
          <p className="mt-4 text-lg font-medium text-slate-700">
            {t("common.dropImageHere")}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {t("common.supportsJpgPngWebp")}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {originalUrl && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              File: <span className="text-slate-900">{fileName}</span>
            </p>
            <button
              onClick={handleReset}
              className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              {t("common.chooseDifferentImage")}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                {t("common.original")}
              </h3>
              <div className="flex items-center justify-center overflow-hidden rounded-lg bg-slate-50" style={{ minHeight: "200px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={originalUrl}
                  alt="Original"
                  className="max-h-64 object-contain"
                />
              </div>
              <p className="mt-3 text-center text-sm text-slate-600">
                {formatBytes(originalSize)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                {t("common.compressed")}
              </h3>
              <div className="flex items-center justify-center overflow-hidden rounded-lg bg-slate-50" style={{ minHeight: "200px" }}>
                {result ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={result.url}
                    alt="Compressed"
                    className="max-h-64 object-contain"
                  />
                ) : (
                  <p className="text-sm text-slate-400">{t("common.processing")}</p>
                )}
              </div>
              <p className="mt-3 text-center text-sm text-slate-600">
                {result ? formatBytes(result.compressedSize) : "—"}
                {result && savings > 0 && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                    −{savings}%
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-sm font-semibold text-slate-700">
              {t("common.compressionSettings")}
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  {t("common.outputFormat")}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFormat("image/jpeg")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      format === "image/jpeg"
                        ? "bg-brand-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    JPEG
                  </button>
                  <button
                    onClick={() => setFormat("image/webp")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      format === "image/webp"
                        ? "bg-brand-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    WebP
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  {t("common.quality")}: {" "}
                  <span className="font-bold text-brand-600">
                    {Math.round(quality * 100)}%
                  </span>
                </label>
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>{t("common.smallerFile")}</span>
                  <span>{t("common.betterQuality")}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleRecompress}
                disabled={isProcessing}
                className="btn-primary"
              >
                {isProcessing ? t("common.processing") : t("common.recompress")}
              </button>
              {result && (
                <button
                  onClick={handleDownload}
                  className="btn-secondary"
                >
                  {t("common.download")}
                </button>
              )}
            </div>
          </div>

          {result && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-slate-100 p-4 text-center">
                <p className="text-xs text-slate-500">{t("common.original")}</p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {formatBytes(result.originalSize)}
                </p>
              </div>
              <div className="rounded-lg bg-slate-100 p-4 text-center">
                <p className="text-xs text-slate-500">{t("common.compressed")}</p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {formatBytes(result.compressedSize)}
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-4 text-center">
                <p className="text-xs text-green-600">{t("common.saved")}</p>
                <p className="mt-1 text-lg font-bold text-green-700">
                  {savings > 0 ? `${savings}%` : "—"}
                </p>
              </div>
              <div className="rounded-lg bg-slate-100 p-4 text-center">
                <p className="text-xs text-slate-500">{t("common.dimensions")}</p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {result.width}×{result.height}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
