"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function HexBase64Converter() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"hex2b64" | "b642hex">("hex2b64");

  function hexToBase64(hex: string): string {
    const clean = hex.replace(/\s+/g, "").replace(/^0x/i, "");
    if (!/^[0-9a-fA-F]*$/.test(clean)) throw new Error("Invalid hex");
    if (clean.length % 2 !== 0) throw new Error("Odd length");
    const bytes = new Uint8Array(clean.length / 2);
    for (let i = 0; i < clean.length; i += 2) {
      bytes[i / 2] = parseInt(clean.slice(i, i + 2), 16);
    }
    let binary = "";
    bytes.forEach((b) => { binary += String.fromCharCode(b); });
    return btoa(binary);
  }

  function base64ToHex(b64: string): string {
    const binary = atob(b64);
    let hex = "";
    for (let i = 0; i < binary.length; i++) {
      hex += binary.charCodeAt(i).toString(16).padStart(2, "0");
    }
    return hex;
  }

  let output = "";
  let error: string | null = null;
  try {
    output = mode === "hex2b64" ? hexToBase64(text) : base64ToHex(text);
  } catch {
    error = mode === "hex2b64" ? t("common.hexB64HexError") : t("common.hexB64B64Error");
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => { setMode("hex2b64"); setText(""); }} className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "hex2b64" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.hexToBase64")}</button>
        <button onClick={() => { setMode("b642hex"); setText(""); }} className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "b642hex" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.base64ToHex")}</button>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.hexB64Input")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={mode === "hex2b64" ? "48656c6c6f" : "SGVsbG8="} className="h-32 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
      {output && !error && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.hexB64Output")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="h-32 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{output}</pre>
        </div>
      )}
    </div>
  );
}
