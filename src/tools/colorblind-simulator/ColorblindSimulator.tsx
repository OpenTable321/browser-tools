"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function ColorblindSimulator() {
  const { t } = useTranslation();
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#3b82f6");

  function hexToRgb(hex: string): [number, number, number] {
    const h = hex.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }

  function rgbToHex(r: number, g: number, b: number): string {
    return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
  }

  function simulate(hex: string, type: "protanopia" | "deuteranopia" | "tritanopia"): string {
    const [r, g, b] = hexToRgb(hex);
    if (type === "protanopia") {
      return rgbToHex(0.567 * r + 0.433 * g, 0.558 * r + 0.442 * g, 0.242 * g + 0.758 * b);
    }
    if (type === "deuteranopia") {
      return rgbToHex(0.625 * r + 0.375 * g, 0.7 * r + 0.3 * g, 0.3 * g + 0.7 * b);
    }
    return rgbToHex(0.95 * r + 0.05 * g, 0.433 * g + 0.567 * b, 0.475 * g + 0.525 * b);
  }

  function contrastRatio(c1: string, c2: string): number {
    const [r1, g1, b1] = hexToRgb(c1);
    const [r2, g2, b2] = hexToRgb(c2);
    const lum = (r: number, g: number, b: number) => {
      const lin = (v: number) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
      return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    };
    const l1 = lum(r1, g1, b1);
    const l2 = lum(r2, g2, b2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  const types: { key: "protanopia" | "deuteranopia" | "tritanopia"; label: string }[] = [
    { key: "protanopia", label: t("common.cbProtanopia") },
    { key: "deuteranopia", label: t("common.cbDeuteranopia") },
    { key: "tritanopia", label: t("common.cbTritanopia") },
  ];

  const normalRatio = contrastRatio(fg, bg);

  function wcagBadge(ratio: number) {
    const aa = ratio >= 4.5 ? "✓ AA" : "✗ AA";
    const aaa = ratio >= 7 ? "✓ AAA" : "✗ AAA";
    return `${aa} / ${aaa}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.cbForeground")}</label>
          <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-12 w-16 cursor-pointer rounded border border-slate-300" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.cbBackground")}</label>
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-12 w-16 cursor-pointer rounded border border-slate-300" />
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
          <span className="text-slate-500">{t("common.cbNormalRatio")}: </span>
          <span className="font-mono font-bold text-slate-800">{normalRatio.toFixed(2)}:1</span>
          <span className="ml-2 text-xs text-slate-500">{wcagBadge(normalRatio)}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {types.map((type) => {
          const simFg = simulate(fg, type.key);
          const simBg = simulate(bg, type.key);
          const ratio = contrastRatio(simFg, simBg);
          return (
            <div key={type.key} className="rounded-lg border border-slate-200 p-4">
              <div className="mb-2 text-sm font-medium text-slate-700">{type.label}</div>
              <div className="flex h-24 items-center justify-center rounded-lg" style={{ background: simBg }}>
                <span className="text-lg font-bold" style={{ color: simFg }}>Aa</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {t("common.cbRatio")}: <span className="font-mono font-bold text-slate-700">{ratio.toFixed(2)}:1</span>
              </div>
              <div className="text-xs text-slate-500">{wcagBadge(ratio)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
