"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

interface Keyframe { offset: number; color: string; }

export function CssAnimationStudio() {
  const { t } = useTranslation();
  const [keyframes, setKeyframes] = useState<Keyframe[]>([
    { offset: 0, color: "#3b82f6" },
    { offset: 50, color: "#8b5cf6" },
    { offset: 100, color: "#ec4899" },
  ]);
  const [duration, setDuration] = useState(3);
  const [property, setProperty] = useState<"background-color" | "transform">("background-color");

  function updateKeyframe(i: number, field: "offset" | "color", value: string | number) {
    setKeyframes((prev) => prev.map((k, idx) => idx === i ? { ...k, [field]: value } : k));
  }

  function addKeyframe() {
    setKeyframes((prev) => [...prev, { offset: 100, color: "#ffffff" }]);
  }

  function removeKeyframe(i: number) {
    if (keyframes.length <= 2) return;
    setKeyframes((prev) => prev.filter((_, idx) => idx !== i));
  }

  const sorted = [...keyframes].sort((a, b) => a.offset - b.offset);

  function generateCSS(): string {
    const stops = sorted.map((k) => {
      if (property === "background-color") {
        return `  ${k.offset}% { background-color: ${k.color}; }`;
      }
      return `  ${k.offset}% { transform: scale(${0.5 + (k.offset / 100) * 1.5}); }`;
    }).join("\n");
    return `@keyframes myAnimation {\n${stops}\n}\n\n.animated-element {\n  animation: myAnimation ${duration}s ease-in-out infinite;\n}`;
  }

  const css = generateCSS();
  const previewStyle: React.CSSProperties = {
    animation: `myAnimation ${duration}s ease-in-out infinite`,
  };

  const keyframesStyle = `
    @keyframes myAnimation {
      ${sorted.map((k) => property === "background-color" ? `${k.offset}% { background-color: ${k.color}; }` : `${k.offset}% { transform: scale(${0.5 + (k.offset / 100) * 1.5}); }`).join(" ")}
    }
  `;

  return (
    <div className="space-y-6">
      <style dangerouslySetInnerHTML={{ __html: keyframesStyle }} />
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.animProperty")}</label>
          <select value={property} onChange={(e) => setProperty(e.target.value as "background-color" | "transform")} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
            <option value="background-color">{t("common.animBgColor")}</option>
            <option value="transform">{t("common.animTransform")}</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.animDuration")}: {duration}s</label>
          <input type="range" min={1} max={10} value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} className="w-32" />
        </div>
        <button onClick={addKeyframe} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">{t("common.animAddKeyframe")}</button>
      </div>
      <div className="space-y-3">
        {keyframes.map((k, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2">
            <span className="text-xs font-medium text-slate-500">{t("common.animStop")}</span>
            <div>
              <input type="number" min={0} max={100} value={k.offset} onChange={(e) => updateKeyframe(i, "offset", parseInt(e.target.value) || 0)} className="w-16 rounded border border-slate-300 px-2 py-1 text-sm" />
              <span className="ml-1 text-xs text-slate-500">%</span>
            </div>
            {property === "background-color" && (
              <input type="color" value={k.color} onChange={(e) => updateKeyframe(i, "color", e.target.value)} className="h-8 w-12 cursor-pointer rounded border border-slate-300" />
            )}
            <button onClick={() => removeKeyframe(i)} disabled={keyframes.length <= 2} className="ml-auto text-xs text-red-500 hover:underline disabled:opacity-50">{t("common.animRemove")}</button>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-100 p-8">
        <div className="flex h-20 items-center justify-center">
          <div className="h-16 w-16 rounded-lg" style={{ ...previewStyle, backgroundColor: property === "background-color" ? keyframes[0]!.color : "#3b82f6" }} />
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">{t("common.animOutput")}</span>
          <CopyButton text={css} />
        </div>
        <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{css}</pre>
      </div>
    </div>
  );
}
