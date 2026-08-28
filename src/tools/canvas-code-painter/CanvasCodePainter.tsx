"use client";

import { useState, useRef, useEffect } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

interface Shape {
  type: "rect" | "circle" | "line" | "text";
  x: number; y: number;
  x2?: number; y2?: number;
  r?: number;
  text?: string;
}

export function CanvasCodePainter() {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [mode, setMode] = useState<"rect" | "circle" | "line" | "text">("rect");
  const [fillColor, setFillColor] = useState("#3b82f6");
  const [strokeColor, setStrokeColor] = useState("#1e40af");
  const [textInput, setTextInput] = useState("Hello");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const s of shapes) {
      ctx.fillStyle = fillColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      if (s.type === "rect") {
        ctx.fillRect(s.x, s.y, (s.x2 ?? s.x) - s.x, (s.y2 ?? s.y) - s.y);
      } else if (s.type === "circle") {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r ?? 20, 0, Math.PI * 2);
        ctx.fill();
      } else if (s.type === "line") {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x2 ?? s.x, s.y2 ?? s.y);
        ctx.stroke();
      } else if (s.type === "text") {
        ctx.font = "16px sans-serif";
        ctx.fillText(s.text ?? "", s.x, s.y);
      }
    }
  }, [shapes, fillColor, strokeColor]);

  function getMousePos(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = e.currentTarget.width / rect.width;
    const scaleY = e.currentTarget.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }

  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const pos = getMousePos(e);
    startPos.current = pos;
    if (mode === "circle") {
      setShapes((prev) => [...prev, { type: "circle", x: pos.x, y: pos.y, r: 25 }]);
    } else if (mode === "text") {
      setShapes((prev) => [...prev, { type: "text", x: pos.x, y: pos.y, text: textInput }]);
    }
  }

  function handleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!startPos.current) return;
    const pos = getMousePos(e);
    const startX = startPos.current.x;
    const startY = startPos.current.y;
    if (mode === "rect") {
      setShapes((prev) => [...prev, { type: "rect", x: startX, y: startY, x2: pos.x, y2: pos.y }]);
    } else if (mode === "line") {
      setShapes((prev) => [...prev, { type: "line", x: startX, y: startY, x2: pos.x, y2: pos.y }]);
    }
    startPos.current = null;
  }

  function generateCode(): string {
    const lines: string[] = [];
    lines.push("const canvas = document.getElementById('canvas');");
    lines.push("const ctx = canvas.getContext('2d');");
    for (const s of shapes) {
      if (s.type === "rect") {
        const w = (s.x2 ?? s.x) - s.x;
        const h = (s.y2 ?? s.y) - s.y;
        lines.push(`ctx.fillStyle = '${fillColor}';`);
        lines.push(`ctx.fillRect(${Math.round(s.x)}, ${Math.round(s.y)}, ${Math.round(w)}, ${Math.round(h)});`);
      } else if (s.type === "circle") {
        lines.push(`ctx.fillStyle = '${fillColor}';`);
        lines.push(`ctx.beginPath();`);
        lines.push(`ctx.arc(${Math.round(s.x)}, ${Math.round(s.y)}, ${s.r ?? 20}, 0, Math.PI * 2);`);
        lines.push(`ctx.fill();`);
      } else if (s.type === "line") {
        lines.push(`ctx.strokeStyle = '${strokeColor}';`);
        lines.push(`ctx.beginPath();`);
        lines.push(`ctx.moveTo(${Math.round(s.x)}, ${Math.round(s.y)});`);
        lines.push(`ctx.lineTo(${Math.round(s.x2 ?? s.x)}, ${Math.round(s.y2 ?? s.y)});`);
        lines.push(`ctx.stroke();`);
      } else if (s.type === "text") {
        lines.push(`ctx.font = '16px sans-serif';`);
        lines.push(`ctx.fillStyle = '${fillColor}';`);
        lines.push(`ctx.fillText('${s.text}', ${Math.round(s.x)}, ${Math.round(s.y)});`);
      }
    }
    return lines.join("\n");
  }

  const code = generateCode();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex gap-2">
          {(["rect", "circle", "line", "text"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`rounded-lg px-3 py-2 text-sm font-medium ${mode === m ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>
              {t(`common.canvas${m.charAt(0).toUpperCase() + m.slice(1)}`)}
            </button>
          ))}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t("common.canvasFill")}</label>
          <input type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} className="h-10 w-12 cursor-pointer rounded border border-slate-300" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t("common.canvasStroke")}</label>
          <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} className="h-10 w-12 cursor-pointer rounded border border-slate-300" />
        </div>
        {mode === "text" && (
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">{t("common.canvasText")}</label>
            <input type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          </div>
        )}
        <button onClick={() => setShapes([])} className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200">{t("common.canvasClear")}</button>
      </div>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="w-full cursor-crosshair rounded-lg border border-slate-300"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
      {code && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.canvasOutput")}</span>
            <CopyButton text={code} />
          </div>
          <pre className="h-48 overflow-auto rounded-lg border border-slate-200 bg-slate-900 p-4 text-sm font-mono text-green-400">{code}</pre>
        </div>
      )}
    </div>
  );
}
