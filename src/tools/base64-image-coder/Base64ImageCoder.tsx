"use client";

import { useState, useRef } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function Base64ImageCoder() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [base64, setBase64] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [decodeInput, setDecodeInput] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setError(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        setBase64(result);
        setPreview(result);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleDecode() {
    setError(null);
    setPreview(null);
    const trimmed = decodeInput.trim();
    if (!trimmed) return;

    const dataUri = trimmed.startsWith("data:") ? trimmed : `data:image/png;base64,${trimmed}`;

    const img = new Image();
    img.onload = () => setPreview(dataUri);
    img.onerror = () => setError(t("common.b64ImgInvalid"));
    img.src = dataUri;
  }

  function downloadImage() {
    if (!preview) return;
    const a = document.createElement("a");
    a.href = preview;
    a.download = `decoded-${Date.now()}.png`;
    a.click();
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => { setMode("encode"); setError(null); }}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "encode" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}
        >
          {t("common.b64ImgEncode")}
        </button>
        <button
          onClick={() => { setMode("decode"); setError(null); }}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "decode" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}
        >
          {t("common.b64ImgDecode")}
        </button>
      </div>

      {mode === "encode" && (
        <>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
            />
          </div>
          {fileName && <div className="text-sm text-slate-500">{t("common.b64ImgFile")}: <span className="font-mono text-slate-700">{fileName}</span></div>}
          {preview && (
            <div>
              <img src={preview} alt="preview" className="max-h-48 rounded-lg border border-slate-200" />
            </div>
          )}
          {base64 && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{t("common.b64ImgOutput")}</span>
                <CopyButton text={base64} />
              </div>
              <textarea
                readOnly
                value={base64}
                className="h-32 w-full rounded-lg border border-slate-300 px-4 py-3 text-xs font-mono focus:outline-none"
              />
            </div>
          )}
        </>
      )}

      {mode === "decode" && (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.b64ImgDecodeInput")}</label>
            <textarea
              value={decodeInput}
              onChange={(e) => setDecodeInput(e.target.value)}
              placeholder="data:image/png;base64,iVBORw0KGgo..."
              className="h-32 w-full rounded-lg border border-slate-300 px-4 py-3 text-xs font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button
            onClick={handleDecode}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {t("common.b64ImgDecodeBtn")}
          </button>
          {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
          {preview && (
            <div className="space-y-3">
              <img src={preview} alt="decoded" className="max-h-64 rounded-lg border border-slate-200" />
              <button
                onClick={downloadImage}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                {t("common.b64ImgDownload")}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
