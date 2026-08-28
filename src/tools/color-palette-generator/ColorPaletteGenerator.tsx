"use client";

import { useState, useCallback, useRef } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

interface ColorInfo {
  hex: string;
  rgb: string;
  r: number;
  g: number;
  b: number;
  count: number;
  percentage: number;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function quantizeColors(
  imageData: ImageData,
  numColors: number,
): ColorInfo[] {
  const data = imageData.data;
  const bucketSize = 32;
  const buckets = new Map<string, { r: number; g: number; b: number; count: number }>();

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3]!;
    if (a < 128) continue;

    const r = data[i]!;
    const g = data[i + 1]!;
    const b = data[i + 2]!;

    const rq = Math.floor(r / bucketSize) * bucketSize;
    const gq = Math.floor(g / bucketSize) * bucketSize;
    const bq = Math.floor(b / bucketSize) * bucketSize;
    const key = `${rq},${gq},${bq}`;

    const existing = buckets.get(key);
    if (existing) {
      existing.r += r;
      existing.g += g;
      existing.b += b;
      existing.count++;
    } else {
      buckets.set(key, { r, g, b, count: 1 });
    }
  }

  const sorted = Array.from(buckets.values()).sort((a, b) => b.count - a.count);
  const top = sorted.slice(0, numColors);
  const totalPixels = top.reduce((sum, c) => sum + c.count, 0);

  return top.map((c) => {
    const avgR = Math.round(c.r / c.count);
    const avgG = Math.round(c.g / c.count);
    const avgB = Math.round(c.b / c.count);
    return {
      hex: rgbToHex(avgR, avgG, avgB),
      rgb: `rgb(${avgR}, ${avgG}, ${avgB})`,
      r: avgR,
      g: avgG,
      b: avgB,
      count: c.count,
      percentage: Math.round((c.count / totalPixels) * 100),
    };
  });
}

export function ColorPaletteGenerator() {
  const { t } = useTranslation();
  const [colors, setColors] = useState<ColorInfo[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback(
    (file: File) => {
      setError(null);
      if (!file.type.startsWith("image/")) {
        setError(t("common.pleaseSelectImage"));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 200;
          const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            setError(t("common.canvasError"));
            return;
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const extracted = quantizeColors(imageData, 5);
          setColors(extracted);
        };
        img.onerror = () => setError(t("common.imageLoadError"));
        img.src = reader.result as string;
        setPreviewUrl(reader.result as string);
      };
      reader.onerror = () => setError(t("common.imageLoadError"));
      reader.readAsDataURL(file);
    },
    [t],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processImage(file);
    },
    [processImage],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processImage(file);
    },
    [processImage],
  );

  const handleCopy = useCallback(
    async (text: string, index: number) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch {
        // fallback
      }
    },
    [],
  );

  function isLightColor(r: number, g: number, b: number): boolean {
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  }

  return (
    <div className="space-y-6">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition ${
          dragOver
            ? "border-brand-500 bg-brand-50"
            : "border-slate-300 hover:border-brand-400 hover:bg-slate-50"
        }`}
      >
        <div className="text-4xl mb-2">🎨</div>
        <p className="text-sm font-medium text-slate-600">
          {t("common.dropOrClickImage")}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          {t("common.colorPaletteFormats")}
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {previewUrl && (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-4">
          <img
            src={previewUrl}
            alt="Uploaded preview"
            className="max-h-[200px] max-w-full rounded-lg"
          />
        </div>
      )}

      {colors.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">
            {t("common.dominantColors")}
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
            {colors.map((color, i) => {
              const light = isLightColor(color.r, color.g, color.b);
              const textColor = light ? "text-slate-800" : "text-white";
              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border border-slate-200"
                >
                  <div
                    className="flex h-32 flex-col items-center justify-center p-3"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className={`text-sm font-bold ${textColor}`}>
                      {color.percentage}%
                    </span>
                  </div>
                  <div className="space-y-1.5 bg-white p-3">
                    <button
                      onClick={() => handleCopy(color.hex, i)}
                      className="flex w-full items-center justify-between rounded-lg bg-slate-100 px-2 py-1.5 text-xs font-mono font-medium text-slate-700 transition hover:bg-slate-200"
                    >
                      <span>{color.hex}</span>
                      <span className="text-brand-600">
                        {copiedIndex === i ? t("common.copied") : t("common.copy")}
                      </span>
                    </button>
                    <button
                      onClick={() => handleCopy(color.rgb, i + 100)}
                      className="flex w-full items-center justify-between rounded-lg bg-slate-100 px-2 py-1.5 text-xs font-mono font-medium text-slate-700 transition hover:bg-slate-200"
                    >
                      <span>{color.rgb}</span>
                      <span className="text-brand-600">
                        {copiedIndex === i + 100 ? t("common.copied") : t("common.copy")}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              setColors([]);
              setPreviewUrl(null);
              setError(null);
            }}
            className="btn-secondary"
          >
            {t("common.clear")}
          </button>
        </div>
      )}
    </div>
  );
}
