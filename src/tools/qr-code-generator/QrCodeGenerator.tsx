"use client";

import { useEffect, useRef, useState } from "react";

export function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!text.trim()) {
      setDataUrl(null);
      setError(null);
      return;
    }

    let cancelled = false;
    setIsGenerating(true);
    setError(null);

    (async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        await QRCode.toCanvas(canvas, text, {
          width: size,
          margin: 2,
          errorCorrectionLevel: errorLevel,
          color: { dark: "#0f172a", light: "#ffffff" },
        });

        if (!cancelled) {
          setDataUrl(canvas.toDataURL("image/png"));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to generate QR code.");
          setDataUrl(null);
        }
      } finally {
        if (!cancelled) setIsGenerating(false);
      }
    })();

    return () => { cancelled = true; };
  }, [text, size, errorLevel]);

  function handleDownload() {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qr-code.png";
    a.click();
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="qr-input" className="mb-2 block text-sm font-medium text-slate-600">
          Text or URL to encode
        </label>
        <input
          id="qr-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com or any text…"
          className="input-field"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="qr-size" className="mb-2 block text-sm font-medium text-slate-600">
            Size: <span className="font-bold text-brand-600">{size}px</span>
          </label>
          <input
            id="qr-size"
            type="range"
            min={128}
            max={512}
            step={32}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-brand-600"
          />
        </div>

        <div>
          <label htmlFor="qr-error" className="mb-2 block text-sm font-medium text-slate-600">
            Error Correction
          </label>
          <select
            id="qr-error"
            value={errorLevel}
            onChange={(e) => setErrorLevel(e.target.value as "L" | "M" | "Q" | "H")}
            className="input-field"
          >
            <option value="L">Low (7%)</option>
            <option value="M">Medium (15%)</option>
            <option value="Q">Quartile (25%)</option>
            <option value="H">High (30%)</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <canvas ref={canvasRef} className="hidden" />

        {isGenerating && (
          <div className="flex h-64 w-64 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
          </div>
        )}

        {!isGenerating && dataUrl && (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUrl} alt="Generated QR code" className="h-64 w-64" />
          </div>
        )}

        {!isGenerating && !dataUrl && !error && (
          <div className="flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50">
            <p className="text-center text-sm text-slate-400">
              Enter text or a URL to generate a QR code
            </p>
          </div>
        )}

        {dataUrl && (
          <button onClick={handleDownload} className="btn-primary">
            Download PNG
          </button>
        )}
      </div>

      {text && (
        <button
          onClick={() => { setText(""); setDataUrl(null); }}
          className="btn-secondary"
        >
          Clear
        </button>
      )}
    </div>
  );
}
