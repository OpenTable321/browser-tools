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

export interface ConverterConfig {
  acceptedTypes: string[];
  acceptedExtensions: string;
  outputFormat: "image/jpeg" | "image/png" | "image/webp";
  outputExtension: string;
  outputLabel: string;
  supportsQuality: boolean;
  defaultQuality: number;
  dropLabel: string;
  dropHint: string;
}

interface ConvertResult {
  blob: Blob;
  url: string;
  originalSize: number;
  convertedSize: number;
  width: number;
  height: number;
}

interface ImageFormatConverterProps {
  config: ConverterConfig;
}

export function ImageFormatConverter({ config }: ImageFormatConverterProps) {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [fileName, setFileName] = useState("");
  const [quality, setQuality] = useState(config.defaultQuality);
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  async function processImage(file: File) {
    const validationError = validateImageFile(file, config.acceptedTypes);
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

      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      const blob = await canvasToBlob(
        canvas,
        config.outputFormat,
        config.supportsQuality ? quality : undefined,
      );

      const url = URL.createObjectURL(blob);
      setResult((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return {
          blob,
          url,
          originalSize: file.size,
          convertedSize: blob.size,
          width: img.naturalWidth,
          height: img.naturalHeight,
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process image.");
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleReconvert() {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    setIsProcessing(true);
    try {
      const blob = await canvasToBlob(
        canvas,
        config.outputFormat,
        config.supportsQuality ? quality : undefined,
      );

      const url = URL.createObjectURL(blob);
      setResult((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return {
          blob,
          url,
          originalSize,
          convertedSize: blob.size,
          width: canvas.width,
          height: canvas.height,
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process image.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleDownload() {
    if (!result) return;
    const baseName = getBaseName(fileName);
    downloadBlob(result.blob, `${baseName}.${config.outputExtension}`);
  }

  function handleReset() {
    if (result) URL.revokeObjectURL(result.url);
    setOriginalUrl(null);
    setResult(null);
    setOriginalSize(0);
    setFileName("");
    setError(null);
    imageRef.current = null;
  }

  const sizeDiff = result
    ? result.convertedSize - result.originalSize
    : 0;
  const sizePct = result && result.originalSize > 0
    ? Math.round((Math.abs(sizeDiff) / result.originalSize) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      {!originalUrl && (
        <ImageDropZone
          onFileSelect={processImage}
          accept={config.acceptedExtensions}
          label={config.dropLabel}
          hint={config.dropHint}
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
              File: <span className="text-slate-900">{fileName}</span>
            </p>
            <button
              onClick={handleReset}
              className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              ← Choose different image
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                Original
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
                {formatBytes(originalSize)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                {config.outputLabel}
              </h3>
              <div
                className="flex items-center justify-center overflow-hidden rounded-lg bg-slate-50"
                style={{ minHeight: "200px" }}
              >
                {result ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={result.url}
                    alt={config.outputLabel}
                    className="max-h-64 object-contain"
                  />
                ) : (
                  <p className="text-sm text-slate-400">Processing…</p>
                )}
              </div>
              <p className="mt-3 text-center text-sm text-slate-600">
                {result ? formatBytes(result.convertedSize) : "—"}
                {result && sizeDiff !== 0 && (
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

          {config.supportsQuality && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="mb-4 text-sm font-semibold text-slate-700">
                Quality Settings
              </h3>

              <div>
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
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleReconvert}
              disabled={isProcessing}
              className="btn-primary"
            >
              {isProcessing ? "Processing…" : "Convert Again"}
            </button>
            {result && (
              <button onClick={handleDownload} className="btn-secondary">
                Download {config.outputExtension.toUpperCase()}
              </button>
            )}
          </div>

          {result && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-slate-100 p-4 text-center">
                <p className="text-xs text-slate-500">Original</p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {formatBytes(result.originalSize)}
                </p>
              </div>
              <div className="rounded-lg bg-slate-100 p-4 text-center">
                <p className="text-xs text-slate-500">Converted</p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {formatBytes(result.convertedSize)}
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
                <p className="text-xs text-slate-500">Dimensions</p>
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
