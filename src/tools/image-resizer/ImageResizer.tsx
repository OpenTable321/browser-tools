"use client";

import { useRef, useState } from "react";
import { ImageDropZone } from "@/components/ImageDropZone";
import {
  formatBytes,
  loadImageFromFile,
  canvasToBlob,
  validateImageFile,
  downloadBlob,
  getBaseName,
} from "@/lib/image-utils";

type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

interface ResizeResult {
  blob: Blob;
  url: string;
  originalSize: number;
  resizedSize: number;
  width: number;
  height: number;
}

const PRESETS = [
  { label: "Original", width: null as number | null, height: null as number | null },
  { label: "1920×1080", width: 1920, height: 1080 },
  { label: "1280×720", width: 1280, height: 720 },
  { label: "800×600", width: 800, height: 600 },
  { label: "640×480", width: 640, height: 480 },
];

export function ImageResizer() {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [fileName, setFileName] = useState("");
  const [targetWidth, setTargetWidth] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [format, setFormat] = useState<OutputFormat>("image/png");
  const [quality, setQuality] = useState(0.85);
  const [result, setResult] = useState<ResizeResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  async function handleFileSelect(file: File) {
    const validationError = validateImageFile(file, [
      "image/jpeg",
      "image/png",
      "image/webp",
    ]);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsProcessing(true);
    setFileName(file.name);
    setOriginalSize(file.size);

    try {
      const { img, dataUrl } = await loadImageFromFile(file);
      imageRef.current = img;
      setOriginalUrl(dataUrl);
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setTargetWidth(img.naturalWidth);
      setTargetHeight(img.naturalHeight);
      setResult(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load image.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleWidthChange(value: number) {
    if (lockAspect && originalWidth > 0) {
      const ratio = originalHeight / originalWidth;
      setTargetWidth(value);
      setTargetHeight(Math.round(value * ratio));
    } else {
      setTargetWidth(value);
    }
  }

  function handleHeightChange(value: number) {
    if (lockAspect && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setTargetHeight(value);
      setTargetWidth(Math.round(value * ratio));
    } else {
      setTargetHeight(value);
    }
  }

  function applyPreset(width: number | null, height: number | null) {
    if (width === null || height === null) {
      setTargetWidth(originalWidth);
      setTargetHeight(originalHeight);
    } else {
      if (lockAspect && originalWidth > 0) {
        const ratio = originalWidth / originalHeight;
        if (width / height > ratio) {
          const newHeight = height;
          const newWidth = Math.round(newHeight * ratio);
          setTargetWidth(newWidth);
          setTargetHeight(newHeight);
        } else {
          const newWidth = width;
          const newHeight = Math.round(newWidth / ratio);
          setTargetWidth(newWidth);
          setTargetHeight(newHeight);
        }
      } else {
        setTargetWidth(width);
        setTargetHeight(height);
      }
    }
  }

  async function handleResize() {
    const img = imageRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    if (targetWidth <= 0 || targetHeight <= 0) {
      setError("Width and height must be greater than 0.");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const blob = await canvasToBlob(
        canvas,
        format,
        format === "image/png" ? undefined : quality,
      );

      const url = URL.createObjectURL(blob);
      setResult((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return {
          blob,
          url,
          originalSize,
          resizedSize: blob.size,
          width: targetWidth,
          height: targetHeight,
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resize image.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleDownload() {
    if (!result) return;
    const baseName = getBaseName(fileName);
    const ext = format === "image/jpeg" ? "jpg" : format === "image/webp" ? "webp" : "png";
    downloadBlob(result.blob, `${baseName}-${result.width}x${result.height}.${ext}`);
  }

  function handleReset() {
    if (result) URL.revokeObjectURL(result.url);
    setOriginalUrl(null);
    setResult(null);
    setOriginalSize(0);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setFileName("");
    setError(null);
    imageRef.current = null;
  }

  const sizeDiff = result ? result.resizedSize - result.originalSize : 0;
  const sizePct =
    result && result.originalSize > 0
      ? Math.round((Math.abs(sizeDiff) / result.originalSize) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      {!originalUrl && (
        <ImageDropZone
          onFileSelect={handleFileSelect}
          accept="image/jpeg,image/png,image/webp"
          label="Drop an image here or click to upload"
          hint="Supports JPG, PNG, and WebP — resized entirely in your browser"
        />
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
              File: <span className="text-slate-900">{fileName}</span>{" "}
              <span className="text-slate-400">
                ({originalWidth}×{originalHeight}, {formatBytes(originalSize)})
              </span>
            </p>
            <button
              onClick={handleReset}
              className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              ← Choose different image
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-sm font-semibold text-slate-700">
              Resize Settings
            </h3>

            <div className="mb-4 flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => applyPreset(preset.width, preset.height)}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Width (px)
                </label>
                <input
                  type="number"
                  min={1}
                  value={targetWidth}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="input-field"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Height (px)
                </label>
                <input
                  type="number"
                  min={1}
                  value={targetHeight}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="input-field"
                />
              </div>
            </div>

            <label className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={lockAspect}
                onChange={(e) => setLockAspect(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-brand-600"
              />
              Lock aspect ratio ({originalWidth > 0 ? (originalWidth / originalHeight).toFixed(2) : "—"})
            </label>

            <div className="mt-6 border-t border-slate-200 pt-6">
              <h3 className="mb-3 text-sm font-semibold text-slate-600">
                Output Format
              </h3>
              <div className="flex flex-wrap gap-2">
                {(["image/png", "image/jpeg", "image/webp"] as OutputFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setFormat(fmt)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      format === fmt
                        ? "bg-brand-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {fmt === "image/png" ? "PNG" : fmt === "image/jpeg" ? "JPEG" : "WebP"}
                  </button>
                ))}
              </div>

              {format !== "image/png" && (
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Quality:{" "}
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
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleResize}
                disabled={isProcessing}
                className="btn-primary"
              >
                {isProcessing ? "Processing…" : "Resize Image"}
              </button>
              {result && (
                <button onClick={handleDownload} className="btn-secondary">
                  Download
                </button>
              )}
            </div>
          </div>

          {result && (
            <>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">
                    Original ({originalWidth}×{originalHeight})
                  </h3>
                  <div
                    className="flex items-center justify-center overflow-hidden rounded-lg bg-slate-50"
                    style={{ minHeight: "200px" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={originalUrl}
                      alt="Original"
                      className="max-h-64 object-contain"
                    />
                  </div>
                  <p className="mt-3 text-center text-sm text-slate-600">
                    {formatBytes(result.originalSize)}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">
                    Resized ({result.width}×{result.height})
                  </h3>
                  <div
                    className="flex items-center justify-center overflow-hidden rounded-lg bg-slate-50"
                    style={{ minHeight: "200px" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={result.url}
                      alt="Resized"
                      className="max-h-64 object-contain"
                    />
                  </div>
                  <p className="mt-3 text-center text-sm text-slate-600">
                    {formatBytes(result.resizedSize)}
                    {sizeDiff !== 0 && (
                      <span
                        className={`ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          sizeDiff < 0
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {sizeDiff < 0 ? "−" : "+"}
                        {sizePct}%
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-slate-100 p-4 text-center">
                  <p className="text-xs text-slate-500">Original Size</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {formatBytes(result.originalSize)}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-100 p-4 text-center">
                  <p className="text-xs text-slate-500">Resized</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {formatBytes(result.resizedSize)}
                  </p>
                </div>
                <div
                  className={`rounded-lg p-4 text-center ${
                    sizeDiff < 0 ? "bg-green-50" : "bg-amber-50"
                  }`}
                >
                  <p
                    className={`text-xs ${
                      sizeDiff < 0 ? "text-green-600" : "text-amber-600"
                    }`}
                  >
                    Change
                  </p>
                  <p
                    className={`mt-1 text-lg font-bold ${
                      sizeDiff < 0 ? "text-green-700" : "text-amber-700"
                    }`}
                  >
                    {sizeDiff < 0 ? "−" : "+"}
                    {sizePct}%
                  </p>
                </div>
                <div className="rounded-lg bg-slate-100 p-4 text-center">
                  <p className="text-xs text-slate-500">New Dimensions</p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {result.width}×{result.height}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
