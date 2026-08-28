"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function CssGradientGenerator() {
  const { t } = useTranslation();
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(90);
  const [color1, setColor1] = useState("#3498db");
  const [color2, setColor2] = useState("#9b59b6");
  const [color3, setColor3] = useState("#e74c3c");
  const [useThird, setUseThird] = useState(true);

  const stops = useThird ? `${color1}, ${color2}, ${color3}` : `${color1}, ${color2}`;
  const gradient = type === "linear" ? `linear-gradient(${angle}deg, ${stops})` : `radial-gradient(circle, ${stops})`;
  const css = `background: ${gradient};`;

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setType("linear")} className={`rounded-lg px-4 py-2 text-sm font-medium ${type === "linear" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.gradientLinear")}</button>
        <button onClick={() => setType("radial")} className={`rounded-lg px-4 py-2 text-sm font-medium ${type === "radial" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.gradientRadial")}</button>
      </div>
      {type === "linear" && (
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.gradientAngle")}: {angle}°</label>
          <input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} className="w-full" />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t("common.gradientColor1")}</label>
          <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="h-12 w-16 cursor-pointer rounded border border-slate-300" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t("common.gradientColor2")}</label>
          <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="h-12 w-16 cursor-pointer rounded border border-slate-300" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t("common.gradientColor3")}</label>
          <div className="flex items-center gap-2">
            <input type="color" value={color3} onChange={(e) => setColor3(e.target.value)} className="h-12 w-16 cursor-pointer rounded border border-slate-300" disabled={!useThird} />
            <label className="flex items-center gap-1 text-sm text-slate-700">
              <input type="checkbox" checked={useThird} onChange={(e) => setUseThird(e.target.checked)} className="rounded" />
            </label>
          </div>
        </div>
      </div>
      <div className="h-40 rounded-lg border border-slate-200" style={{ background: gradient }} />
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">{t("common.gradientOutput")}</span>
          <CopyButton text={css} />
        </div>
        <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{css}</pre>
      </div>
    </div>
  );
}
