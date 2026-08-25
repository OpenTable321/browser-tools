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

interface ConvertResult {
  blob: Blob;
  url: string;
  originalSize: number;
  convertedSize: number;
  width: number;
  height: number;
}

export function PngToJpg() {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [fileName, setFileName] = useState("");
  const [quality, setQuality] = useState(0.85);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  async function processImage(file: File) {
    const validationError = validateImageFile(file, ["image/png"]);
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
      await convert(img, file.size);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process image.");
    } finally {
      setIsProcessing(false);
    }
  }

  async function convert(img: HTMLImageElement, origSize: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    const blob = await canvasToBlob(canvas, "image/jpeg", quality);
    const url = URL.createObjectURL(blob);
    setResult((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return {
        blob,
        url,
        originalSize: origSize,
        convertedSize: blob.size,
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
    });
  }

  async function handleReconvert() {
    if (!imageRef.current) return;
    setIsProcessing(true);
    try {
      await convert(imageRef.current, originalSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process image.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleDownload() {
    if (!result) return;
    const baseName = getBaseName(fileName);
    downloadBlob(result.blob, `${baseName}.jpg`);
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

  const sizeDiff = result ? result.convertedSize - result.originalSize : 0;
  const sizePct =
    result && result.originalSize > 0
      ? Math.round((Math.abs(sizeDiff) / result.originalSize) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      {!originalUrl && (
        <ImageDropZone
          onFileSelect={processImage}
          accept=".png"
          label="Drop a PNG image here or click to upload"
          hint="Converted to JPG entirely in your browser — no uploads"
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
              <h3 className="mb-3 text-sm font-semibold text-slate-700">Original (PNG)</h3>
              <div
                className="flex items-center justify-center overflow-hidden rounded-lg bg-slate-50"
                style={{ minHeight: "200px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={originalUrl} alt="Original PNG" className="max-h-64 object-contain" />
              </div>
              <p className="mt-3 text-center text-sm text-slate-600">
                {formatBytes(originalSize)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">JPG</h3>
              <div
                className="flex items-center justify-center overflow-hidden rounded-lg bg-slate-50"
                style={{ minHeight: "200px" }}
              >
                {result ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={result.url} alt="Converted JPG" className="max-h-64 object-contain" />
                ) : (
                  <p className="text-sm text-slate-400">Processing…</p>
                )}
              </div>
              <p className="mt-3 text-center text-sm text-slate-600">
                {result ? formatBytes(result.convertedSize) : "—"}
                {result && sizeDiff !== 0 && (
                  <span
                    className={`ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      sizeDiff < 0 ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {sizeDiff < 0 ? "−" : "+"}
                    {sizePct}%
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-sm font-semibold text-slate-700">Quality Settings</h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="png-jpg-quality" className="mb-2 block text-sm font-medium text-slate-600">
                  Quality:{" "}
                  <span className="font-bold text-brand-600">{Math.round(quality * 100)}%</span>
                </label>
                <input
                  id="png-jpg-quality"
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

              <div>
                <label htmlFor="png-jpg-bg" className="mb-2 block text-sm font-medium text-slate-600">
                  Background Color (for transparency)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="png-jpg-bg"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-10 w-16 cursor-pointer rounded border border-slate-300"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="input-field flex-1"
                    aria-label="Background color hex value"
                  />
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  JPG does not support transparency — transparent areas will be filled with this color.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={handleReconvert} disabled={isProcessing} className="btn-primary">
              {isProcessing ? "Processing…" : "Convert Again"}
            </button>
            {result && (
              <button onClick={handleDownload} className="btn-secondary">
                Download JPG
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
                  className={`text-xs ${sizeDiff < 0 ? "text-green-600" : "text-amber-600"}`}
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
