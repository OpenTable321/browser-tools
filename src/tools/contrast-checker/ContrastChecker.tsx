"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function ContrastChecker() {
  const { t } = useTranslation();
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#000000");

  function hexToRgb(hex: string): [number, number, number] {
    const h = hex.replace("#", "");
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)];
  }

  function luminance(r: number, g: number, b: number): number {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0]! + 0.7152 * a[1]! + 0.0722 * a[2]!;
  }

  function contrastRatio(hex1: string, hex2: string): number {
    const [r1, g1, b1] = hexToRgb(hex1);
    const [r2, g2, b2] = hexToRgb(hex2);
    const l1 = luminance(r1, g1, b1);
    const l2 = luminance(r2, g2, b2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  const ratio = contrastRatio(fg, bg);
  const ratioStr = ratio.toFixed(2) + ":1";

  const aaNormal = ratio >= 4.5;
  const aaLarge = ratio >= 3;
  const aaaNormal = ratio >= 7;
  const aaaLarge = ratio >= 4.5;

  const badges = [
    { label: "AA (Normal)", pass: aaNormal },
    { label: "AA (Large)", pass: aaLarge },
    { label: "AAA (Normal)", pass: aaaNormal },
    { label: "AAA (Large)", pass: aaaLarge },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t("common.contrastFg")}</label>
          <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-12 w-16 cursor-pointer rounded border border-slate-300" />
          <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className="ml-2 w-24 rounded-lg border border-slate-300 px-2 py-1 text-sm font-mono" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t("common.contrastBg")}</label>
          <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-12 w-16 cursor-pointer rounded border border-slate-300" />
          <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className="ml-2 w-24 rounded-lg border border-slate-300 px-2 py-1 text-sm font-mono" />
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 p-6 text-center" style={{ backgroundColor: bg, color: fg }}>
        <span className="text-2xl font-bold">Aa</span>
        <span className="ml-2 text-lg">Sample Text</span>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center">
        <span className="text-xs font-medium text-slate-500">{t("common.contrastRatio")}</span>
        <div className="mt-1 text-2xl font-bold text-slate-800">{ratioStr}</div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {badges.map((b) => (
          <div key={b.label} className={`rounded-lg px-3 py-2 text-center text-sm font-medium ${b.pass ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
            {b.label}: {b.pass ? t("common.contrastPass") : t("common.contrastFail")}
          </div>
        ))}
      </div>
    </div>
  );
}
