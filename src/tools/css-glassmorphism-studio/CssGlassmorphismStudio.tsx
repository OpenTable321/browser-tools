"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function CssGlassmorphismStudio() {
  const { t } = useTranslation();
  const [blur, setBlur] = useState(10);
  const [opacity, setOpacity] = useState(60);
  const [radius, setRadius] = useState(16);
  const [tint, setTint] = useState("#ffffff");
  const [shadow, setShadow] = useState(20);

  const rgba = (hex: string, a: number) => {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a / 100})`;
  };

  const glassStyle: React.CSSProperties = {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    background: rgba(tint, opacity),
    borderRadius: `${radius}px`,
    boxShadow: `0 8px ${shadow}px ${rgba("#000000", 15)}`,
    border: `1px solid ${rgba("#ffffff", 20)}`,
  };

  const css = `backdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nbackground: ${rgba(tint, opacity)};\nborder-radius: ${radius}px;\nbox-shadow: 0 8px ${shadow}px ${rgba("#000000", 15)};\nborder: 1px solid ${rgba("#ffffff", 20)};`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.glassBlur")}: {blur}px</label>
          <input type="range" min={0} max={30} value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.glassOpacity")}: {opacity}%</label>
          <input type="range" min={0} max={100} value={opacity} onChange={(e) => setOpacity(parseInt(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.glassRadius")}: {radius}px</label>
          <input type="range" min={0} max={50} value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.glassShadow")}: {shadow}px</label>
          <input type="range" min={0} max={50} value={shadow} onChange={(e) => setShadow(parseInt(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.glassTint")}</label>
          <input type="color" value={tint} onChange={(e) => setTint(e.target.value)} className="h-10 w-16 cursor-pointer rounded border border-slate-300" />
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)" }}>
        <div className="flex h-64 items-center justify-center p-8">
          <div className="h-32 w-64" style={glassStyle}>
            <div className="flex h-full items-center justify-center text-white font-medium drop-shadow">{t("common.glassPreview")}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">{t("common.glassOutput")}</span>
          <CopyButton text={css} />
        </div>
        <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{css}</pre>
      </div>
    </div>
  );
}
