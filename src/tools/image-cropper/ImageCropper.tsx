"use client";

import { useRef, useState, useCallback } from "react";
import { ImageDropZone } from "@/components/ImageDropZone";
import {
  formatBytes,
  loadImageFromFile,
  canvasToBlob,
  validateImageFile,
  downloadBlob,
  getBaseName,
} from "@/lib/image-utils";

type OutputFormat = "image/png" | "image/jpeg";
type AspectPreset = "free" | "1:1" | "4:3" | "16:9" | "3:4" | "9:16";

const PRESETS: { label: string; value: AspectPreset; ratio: number | null }[] = [
  { label: "Free", value: "free", ratio: null },
  { label: "1:1", value: "1:1", ratio: 1 },
  { label: "4:3", value: "4:3", ratio: 4 / 3 },
  { label: "3:4", value: "3:4", ratio: 3 / 4 },
  { label: "16:9", value: "16:9", ratio: 16 / 9 },
  { label: "9:16", value: "9:16", ratio: 9 / 16 },
];

interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function ImageCropper() {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [imgDims, setImgDims] = useState({ w: 0, h: 0 });
  const [preset, setPreset] = useState<AspectPreset>("free");
  const [format, setFormat] = useState<OutputFormat>("image/png");
  const [quality, setQuality] = useState(0.85);
  const [result, setResult] = useState<{ blob: Blob; url: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ type: "move" | "resize"; startX: number; startY: number; origRect: CropRect } | null>(null);

  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, w: 0, h: 0 });
  const [displayScale, setDisplayScale] = useState(1);

  const handleFileSelect = useCallback(async (file: File) => {
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
      setImgDims({ w: img.naturalWidth, h: img.naturalHeight });
      setCrop({ x: 0, y: 0, w: img.naturalWidth, h: img.naturalHeight });
      setResult(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load image.");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  function applyPreset(p: AspectPreset, ratio: number | null) {
    setPreset(p);
    if (!imageRef.current) return;
    const iw = imageRef.current.naturalWidth;
    const ih = imageRef.current.naturalHeight;
    if (ratio === null) {
      setCrop({ x: 0, y: 0, w: iw, h: ih });
      return;
    }
    let w = iw;
    let h = w / ratio;
    if (h > ih) {
      h = ih;
      w = h * ratio;
    }
    setCrop({
      x: Math.round((iw - w) / 2),
      y: Math.round((ih - h) / 2),
      w: Math.round(w),
      h: Math.round(h),
    });
  }

  function updateDisplayScale() {
    const container = containerRef.current;
    if (!container || !imageRef.current) return;
    const cw = container.clientWidth;
    const scale = cw / imageRef.current.naturalWidth;
    setDisplayScale(scale);
  }

  function handleMouseDown(e: React.MouseEvent, type: "move" | "resize") {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = {
      type,
      startX: e.clientX,
      startY: e.clientY,
      origRect: { ...crop },
    };
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragRef.current || !imageRef.current) return;
    const { type, startX, startY, origRect } = dragRef.current;
    const dx = (e.clientX - startX) / displayScale;
    const dy = (e.clientY - startY) / displayScale;
    const iw = imageRef.current.naturalWidth;
    const ih = imageRef.current.naturalHeight;

    if (type === "move") {
      let nx = origRect.x + dx;
      let ny = origRect.y + dy;
      nx = Math.max(0, Math.min(nx, iw - origRect.w));
      ny = Math.max(0, Math.min(ny, ih - origRect.h));
      setCrop({ ...origRect, x: Math.round(nx), y: Math.round(ny) });
    } else {
      let nw = Math.max(10, origRect.w + dx);
      let nh = Math.max(10, origRect.h + dy);
      const presetRatio = PRESETS.find((p) => p.value === preset)?.ratio;
      if (presetRatio) {
        if (Math.abs(dx) > Math.abs(dy)) {
          nh = nw / presetRatio;
        } else {
          nw = nh * presetRatio;
        }
      }
      nw = Math.min(nw, iw - origRect.x);
      nh = Math.min(nh, ih - origRect.y);
      setCrop({ ...origRect, w: Math.round(nw), h: Math.round(nh) });
    }
  }

  function handleMouseUp() {
    dragRef.current = null;
  }

  async function handleCrop() {
    const img = imageRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    if (crop.w < 1 || crop.h < 1) {
      setError("Crop area is too small.");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      canvas.width = crop.w;
      canvas.height = crop.h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);

      const blob = await canvasToBlob(
        canvas,
        format,
        format === "image/png" ? undefined : quality,
      );
      const url = URL.createObjectURL(blob);
      setResult((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return { blob, url };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to crop image.");
    } finally {
      setIsProcessing(false);
    }
  }

  function handleDownload() {
    if (!result) return;
    const baseName = getBaseName(fileName);
    const ext = format === "image/png" ? "png" : "jpg";
    downloadBlob(result.blob, `${baseName}-cropped.${ext}`);
  }

  function handleReset() {
    if (result) URL.revokeObjectURL(result.url);
    setOriginalUrl(null);
    setResult(null);
    setOriginalSize(0);
    setFileName("");
    setError(null);
    imageRef.current = null;
    setCrop({ x: 0, y: 0, w: 0, h: 0 });
  }

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      {!originalUrl && (
        <ImageDropZone
          onFileSelect={handleFileSelect}
          accept="image/jpeg,image/png,image/webp"
          label="Drop an image here or click to upload"
          hint="Supports JPG, PNG, and WebP — cropped entirely in your browser"
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
                ({imgDims.w}×{imgDims.h}, {formatBytes(originalSize)})
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
            <h3 className="mb-4 text-sm font-semibold text-slate-700">Aspect Ratio Presets</h3>
            <div className="mb-4 flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => applyPreset(p.value, p.ratio)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    preset === p.value
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div
              ref={containerRef}
              className="relative inline-block max-w-full overflow-hidden rounded-lg bg-slate-50"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalUrl}
                alt="Image to crop"
                className="block max-w-full"
                onLoad={updateDisplayScale}
              />
              {crop.w > 0 && crop.h > 0 && (
                <div
                  className="absolute border-2 border-brand-500 cursor-move"
                  style={{
                    left: crop.x * displayScale,
                    top: crop.y * displayScale,
                    width: crop.w * displayScale,
                    height: crop.h * displayScale,
                    boxShadow: "0 0 0 9999px rgba(0,0,0,0.4)",
                  }}
                  onMouseDown={(e) => handleMouseDown(e, "move")}
                >
                  <div
                    className="absolute -bottom-1 -right-1 h-4 w-4 cursor-se-resize rounded-full border-2 border-brand-500 bg-white"
                    onMouseDown={(e) => handleMouseDown(e, "resize")}
                  />
                </div>
              )}
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Drag the crop area to move. Drag the bottom-right handle to resize.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-sm font-semibold text-slate-700">Output Settings</h3>
            <div className="flex flex-wrap gap-2">
              {(["image/png", "image/jpeg"] as OutputFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    format === fmt
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {fmt === "image/png" ? "PNG" : "JPG"}
                </button>
              ))}
            </div>

            {format === "image/jpeg" && (
              <div className="mt-4">
                <label htmlFor="crop-quality" className="mb-2 block text-sm font-medium text-slate-600">
                  Quality:{" "}
                  <span className="font-bold text-brand-600">{Math.round(quality * 100)}%</span>
                </label>
                <input
                  id="crop-quality"
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

            <div className="mt-4 text-sm text-slate-600">
              Crop area: {crop.w}×{crop.h}px at ({crop.x}, {crop.y})
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={handleCrop} disabled={isProcessing} className="btn-primary">
                {isProcessing ? "Processing…" : "Crop Image"}
              </button>
              {result && (
                <button onClick={handleDownload} className="btn-secondary">
                  Download
                </button>
              )}
            </div>
          </div>

          {result && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">Cropped Result</h3>
              <div
                className="flex items-center justify-center overflow-hidden rounded-lg bg-slate-50"
                style={{ minHeight: "200px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={result.url} alt="Cropped result" className="max-h-64 object-contain" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
