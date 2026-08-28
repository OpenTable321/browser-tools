"use client";

import { useState, useRef, useEffect } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

interface PathNode { x: number; y: number; }

export function SvgPathEditor() {
  const { t } = useTranslation();
  const [pathData, setPathData] = useState("M 50 100 L 150 100 L 100 50 Z");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<PathNode[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    try {
      const path2d = new Path2D(pathData);
      ctx.stroke(path2d);
    } catch { /* invalid path */ }

    nodes.forEach((n) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ef4444";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [pathData, nodes]);

  useEffect(() => {
    const parsed: PathNode[] = [];
    const tokens = pathData.match(/[MLCQAZ][^MLCQAZ]*/gi) || [];
    for (const token of tokens) {
      const cmd = token[0]!.toUpperCase();
      const nums = token.slice(1).trim().split(/[\s,]+/).filter(Boolean).map(Number);
      if (cmd === "M" || cmd === "L" || cmd === "Z") {
        for (let i = 0; i + 1 < nums.length; i += 2) {
          if (!isNaN(nums[i]!) && !isNaN(nums[i + 1]!)) parsed.push({ x: nums[i]!, y: nums[i + 1]! });
        }
      }
    }
    setNodes(parsed);
  }, [pathData]);

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.svgPathInput")}</label>
        <textarea value={pathData} onChange={(e) => setPathData(e.target.value)} className="h-24 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <canvas ref={canvasRef} width={400} height={200} className="w-full" />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">{t("common.svgPathNodes")} ({nodes.length})</span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {nodes.map((n, i) => (
            <div key={i} className="rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-mono text-slate-700">
              {i}: ({n.x.toFixed(0)}, {n.y.toFixed(0)})
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">{t("common.svgPathOutput")}</span>
          <CopyButton text={pathData} />
        </div>
        <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{pathData}</pre>
      </div>
    </div>
  );
}
