"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace("#", "").match(/^([0-9a-f]{6}|[0-9a-f]{3})$/i);
  if (!m) return null;
  const h = m[1]!.length === 3 ? m[1]!.split("").map((c) => c + c).join("") : m[1]!;
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  const r1 = r / 255, g1 = g / 255, b1 = b / 255;
  const k = 1 - Math.max(r1, g1, b1);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - r1 - k) / (1 - k)) * 100),
    m: Math.round(((1 - g1 - k) / (1 - k)) * 100),
    y: Math.round(((1 - b1 - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

export function HexRgbConverter() {
  const { t } = useTranslation();
  const [hex, setHex] = useState("#3498db");
  const rgb = hexToRgb(hex);

  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  const cmyk = rgb ? rgbToCmyk(rgb.r, rgb.g, rgb.b) : null;

  const rgbStr = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";
  const hslStr = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "";
  const cmykStr = cmyk ? `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` : "";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <input type="color" value={hex.length === 7 ? hex : "#000000"} onChange={(e) => setHex(e.target.value)} className="h-12 w-16 cursor-pointer rounded border border-slate-300" />
        <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none" />
        {rgb && <div className="h-12 w-12 rounded-lg border border-slate-300" style={{ backgroundColor: hex }} />}
      </div>

      {rgb && (
        <div className="space-y-3">
          {[
            { label: t("common.colorRgb"), value: rgbStr },
            { label: t("common.colorHsl"), value: hslStr },
            { label: t("common.colorCmyk"), value: cmykStr },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="min-w-[60px] text-xs font-medium text-slate-500">{item.label}</span>
              <span className="flex-1 font-mono text-sm text-slate-800">{item.value}</span>
              <CopyButton text={item.value} />
            </div>
          ))}
        </div>
      )}
      {hex && !rgb && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{t("common.colorInvalid")}</div>
      )}
    </div>
  );
}
