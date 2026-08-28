"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

type Mode = "text" | "file";

function bufToHex(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i]!.toString(16).padStart(2, "0");
  }
  return hex;
}

export function Sha256HashGenerator() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>("text");
  const [input, setInput] = useState("");
  const [uppercase, setUppercase] = useState(false);
  const [hash, setHash] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const textHash = useMemo(() => {
    if (mode !== "text" || !input) return "";
    let cancelled = false;
    (async () => {
      try {
        const data = new TextEncoder().encode(input);
        const buf = await crypto.subtle.digest("SHA-256", data);
        if (!cancelled) {
          const h = bufToHex(buf);
          setHash(uppercase ? h.toUpperCase() : h);
          setError(null);
        }
      } catch {
        if (!cancelled) setError(t("common.sha256Error"));
      }
    })();
    return () => { cancelled = true; };
  }, [input, mode, uppercase, t]);

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setFileName(file.name);
    setFileSize(file.size);
    setLoading(true);
    setHash("");
    try {
      const buf = await file.arrayBuffer();
      const digest = await crypto.subtle.digest("SHA-256", buf);
      const h = bufToHex(digest);
      setHash(uppercase ? h.toUpperCase() : h);
    } catch {
      setError(t("common.sha256Error"));
    } finally {
      setLoading(false);
    }
  }, [uppercase, t]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex rounded-lg border border-slate-300 p-1">
          <button
            onClick={() => {
              setMode("text");
              setHash("");
              setFileName(null);
              setFileSize(null);
              setError(null);
            }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              mode === "text"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t("common.textMode")}
          </button>
          <button
            onClick={() => {
              setMode("file");
              setHash("");
              setInput("");
              setError(null);
            }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              mode === "file"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t("common.fileMode")}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => {
              setUppercase(e.target.checked);
              if (hash) setHash(uppercase ? hash.toLowerCase() : hash.toUpperCase());
            }}
            className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          {t("common.uppercaseOutput")}
        </label>
      </div>

      {mode === "text" && (
        <div>
          <label
            htmlFor="sha256-input"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            {t("common.textInput")}
          </label>
          <textarea
            id="sha256-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("common.sha256InputPlaceholder")}
            className="input-field min-h-[120px] resize-y font-mono text-sm"
            spellCheck={false}
          />
        </div>
      )}

      {mode === "file" && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition ${
            dragOver
              ? "border-brand-500 bg-brand-50"
              : "border-slate-300 hover:border-brand-400 hover:bg-slate-50"
          }`}
        >
          <div className="text-4xl mb-2">📄</div>
          <p className="text-sm font-medium text-slate-600">
            {t("common.dropOrClickFile")}
          </p>
          {fileName && (
            <p className="mt-2 text-xs text-slate-500">
              {fileName}
              {fileSize !== null && ` (${formatBytes(fileSize)})`}
            </p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {(hash || loading) && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">
              {t("common.sha256Hash")}
            </span>
            {hash && <CopyButton text={hash} label={t("common.copy")} />}
          </div>
          {loading ? (
            <p className="text-sm text-slate-400">{t("common.hashing")}…</p>
          ) : (
            <code className="block break-all font-mono text-sm font-semibold text-slate-800">
              {hash}
            </code>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => {
            setInput("");
            setHash("");
            setFileName(null);
            setFileSize(null);
            setError(null);
          }}
          disabled={!input && !fileName}
          className="btn-secondary"
        >
          {t("common.clear")}
        </button>
      </div>
    </div>
  );
}
