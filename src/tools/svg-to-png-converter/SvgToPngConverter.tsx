"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function SvgToPngConverter() {
  const { t } = useTranslation();
  const [svgText, setSvgText] = useState("");
  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);
  const [outputWidth, setOutputWidth] = useState(512);
  const [outputHeight, setOutputHeight] = useState(512);
  const [keepAspect, setKeepAspect] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseSvgDimensions = useCallback((text: string): { width: number; height: number } => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const svgEl = doc.documentElement;

    if (svgEl.tagName.toLowerCase() !== "svg") {
      throw new Error(t("common.notValidSvg"));
    }

    let width = 0;
    let height = 0;

    const wAttr = svgEl.getAttribute("width");
    const hAttr = svgEl.getAttribute("height");
    if (wAttr && hAttr) {
      width = parseFloat(wAttr);
      height = parseFloat(hAttr);
    }

    if (!width || !height) {
      const viewBox = svgEl.getAttribute("viewBox");
      if (viewBox) {
        const parts = viewBox.split(/[\s,]+/);
        if (parts.length >= 4) {
          width = parseFloat(parts[2]!);
          height = parseFloat(parts[3]!);
        }
      }
    }

    if (!width || !height) {
      width = 300;
      height = 150;
    }

    return { width, height };
  }, [t]);

  const handleSvgInput = useCallback((text: string) => {
    setSvgText(text);
    setError(null);
    setPngUrl(null);
    if (!text.trim()) {
      setSvgWidth(0);
      setSvgHeight(0);
      setPreviewUrl(null);
      return;
    }
    try {
      const { width, height } = parseSvgDimensions(text);
      setSvgWidth(width);
      setSvgHeight(height);
      setOutputWidth(Math.round(width));
      setOutputHeight(Math.round(height));
      const blob = new Blob([text], { type: "image/svg+xml" });
      setPreviewUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.svgLoadError"));
      setPreviewUrl(null);
    }
  }, [parseSvgDimensions, t]);

  const handleFileLoad = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      handleSvgInput(text);
    };
    reader.onerror = () => setError(t("common.svgLoadError"));
    reader.readAsText(file);
  }, [handleSvgInput, t]);

  const handleWidthChange = useCallback((w: number) => {
    setOutputWidth(w);
    if (keepAspect && svgWidth > 0) {
      setOutputHeight(Math.round((w / svgWidth) * svgHeight));
    }
  }, [keepAspect, svgWidth, svgHeight]);

  const handleHeightChange = useCallback((h: number) => {
    setOutputHeight(h);
    if (keepAspect && svgHeight > 0) {
      setOutputWidth(Math.round((h / svgHeight) * svgWidth));
    }
  }, [keepAspect, svgWidth, svgHeight]);

  const handleConvert = useCallback(() => {
    setError(null);
    if (!svgText.trim()) {
      setError(t("common.pasteSvgFirst"));
      return;
    }

    const img = new Image();
    const blob = new Blob([svgText], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError(t("common.canvasError"));
        URL.revokeObjectURL(url);
        return;
      }
      ctx.drawImage(img, 0, 0, outputWidth, outputHeight);
      URL.revokeObjectURL(url);

      canvas.toBlob((pngBlob) => {
        if (!pngBlob) {
          setError(t("common.pngConvertError"));
          return;
        }
        if (pngUrl) URL.revokeObjectURL(pngUrl);
        setPngUrl(URL.createObjectURL(pngBlob));
      }, "image/png");
    };

    img.onerror = () => {
      setError(t("common.svgRenderError"));
      URL.revokeObjectURL(url);
    };

    img.src = url;
  }, [svgText, outputWidth, outputHeight, pngUrl, t]);

  const handleDownload = useCallback(() => {
    if (!pngUrl) return;
    const a = document.createElement("a");
    a.href = pngUrl;
    a.download = "converted.png";
    a.click();
  }, [pngUrl]);

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="svg-input"
            className="block text-sm font-medium text-slate-600"
          >
            {t("common.svgInput")}
          </label>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-secondary text-sm"
          >
            {t("common.loadSvgFile")}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".svg,image/svg+xml"
            onChange={handleFileLoad}
            className="hidden"
          />
        </div>
        <textarea
          id="svg-input"
          value={svgText}
          onChange={(e) => handleSvgInput(e.target.value)}
          placeholder={t("common.svgInputPlaceholder")}
          className="input-field min-h-[150px] resize-y font-mono text-sm"
          spellCheck={false}
        />
      </div>

      {svgWidth > 0 && (
        <div className="text-sm text-slate-500">
          {t("common.originalSize")}: {svgWidth} × {svgHeight} px
        </div>
      )}

      {previewUrl && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">
            {t("common.svgPreview")}
          </h3>
          <div className="flex items-center justify-center rounded-lg bg-slate-50 p-4">
            <img
              src={previewUrl}
              alt="SVG preview"
              className="max-h-[200px] max-w-full"
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={keepAspect}
              onChange={(e) => setKeepAspect(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            {t("common.keepAspectRatio")}
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="output-width"
              className="mb-2 block text-sm font-medium text-slate-600"
            >
              {t("common.outputWidth")}
            </label>
            <input
              id="output-width"
              type="number"
              min={1}
              value={outputWidth}
              onChange={(e) => handleWidthChange(Number(e.target.value))}
              className="input-field text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="output-height"
              className="mb-2 block text-sm font-medium text-slate-600"
            >
              {t("common.outputHeight")}
            </label>
            <input
              id="output-height"
              type="number"
              min={1}
              value={outputHeight}
              onChange={(e) => handleHeightChange(Number(e.target.value))}
              className="input-field text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleConvert}
          disabled={!svgText.trim()}
          className="btn-primary"
        >
          {t("common.convertToPng")}
        </button>
        {pngUrl && (
          <button onClick={handleDownload} className="btn-secondary">
            {t("common.downloadPng")}
          </button>
        )}
        <button
          onClick={() => {
            setSvgText("");
            setPreviewUrl(null);
            setPngUrl(null);
            setError(null);
            setSvgWidth(0);
            setSvgHeight(0);
          }}
          disabled={!svgText}
          className="btn-secondary"
        >
          {t("common.clear")}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {pngUrl && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">
            {t("common.pngResult")} ({outputWidth} × {outputHeight})
          </h3>
          <div className="flex items-center justify-center rounded-lg bg-slate-50 p-4">
            <img
              src={pngUrl}
              alt="PNG result"
              className="max-h-[300px] max-w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
