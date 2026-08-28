"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

interface Point { x: number; y: number; }

export function CssClipPathMaker() {
  const { t } = useTranslation();
  const [points, setPoints] = useState<Point[]>([
    { x: 50, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 },
  ]);

  function updatePoint(i: number, x: number, y: number) {
    setPoints((prev) => prev.map((p, idx) => idx === i ? { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) } : p));
  }

  function addPoint() {
    if (points.length >= 12) return;
    setPoints((prev) => [...prev, { x: 50, y: 50 }]);
  }

  function removePoint() {
    if (points.length <= 3) return;
    setPoints((prev) => prev.slice(0, -1));
  }

  const clipPath = `clip-path: polygon(${points.map((p) => `${p.x}% ${p.y}%`).join(", ")});`;

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={addPoint} disabled={points.length >= 12} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">{t("common.clipAddPoint")}</button>
        <button onClick={removePoint} disabled={points.length <= 3} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 disabled:opacity-50">{t("common.clipRemovePoint")}</button>
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-lg border border-slate-200 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon
            points={points.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="rgba(255,255,255,0.9)"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.3"
          />
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#fff" stroke="#3b82f6" strokeWidth="0.5" className="cursor-move" />
          ))}
        </svg>
        {points.map((p, i) => (
          <div
            key={i}
            className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-blue-500 bg-white active:cursor-grabbing"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", String(i))}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const idx = parseInt(e.dataTransfer.getData("text/plain"));
              const rect = e.currentTarget.parentElement?.getBoundingClientRect();
              if (rect) {
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                updatePoint(idx, x, y);
              }
            }}
          />
        ))}
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">{t("common.clipOutput")}</span>
          <CopyButton text={clipPath} />
        </div>
        <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{clipPath}</pre>
      </div>
    </div>
  );
}
