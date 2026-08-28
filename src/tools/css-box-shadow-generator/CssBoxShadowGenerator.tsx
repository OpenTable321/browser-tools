"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function CssBoxShadowGenerator() {
  const { t } = useTranslation();
  const [hOffset, setHOffset] = useState(4);
  const [vOffset, setVOffset] = useState(4);
  const [blur, setBlur] = useState(10);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(30);
  const [inset, setInset] = useState(false);

  function hexToRgba(hex: string, alpha: number): string {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
  }

  const shadow = `${inset ? "inset " : ""}${hOffset}px ${vOffset}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;
  const css = `box-shadow: ${shadow};`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.shadowHOffset")}: {hOffset}px</label>
          <input type="range" min={-50} max={50} value={hOffset} onChange={(e) => setHOffset(parseInt(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.shadowVOffset")}: {vOffset}px</label>
          <input type="range" min={-50} max={50} value={vOffset} onChange={(e) => setVOffset(parseInt(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.shadowBlur")}: {blur}px</label>
          <input type="range" min={0} max={100} value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.shadowSpread")}: {spread}px</label>
          <input type="range" min={-50} max={50} value={spread} onChange={(e) => setSpread(parseInt(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.shadowColor")}</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-16 cursor-pointer rounded border border-slate-300" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.shadowOpacity")}: {opacity}%</label>
          <input type="range" min={0} max={100} value={opacity} onChange={(e) => setOpacity(parseInt(e.target.value))} className="w-full" />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} className="rounded" />
        {t("common.shadowInset")}
      </label>
      <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white p-12">
        <div className="h-24 w-24 rounded-lg bg-blue-500" style={{ boxShadow: shadow }} />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">{t("common.shadowOutput")}</span>
          <CopyButton text={css} />
        </div>
        <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{css}</pre>
      </div>
    </div>
  );
}
