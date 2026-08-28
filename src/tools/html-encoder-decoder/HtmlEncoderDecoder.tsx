"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function HtmlEncoderDecoder() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const htmlEntities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const reverseEntities: Record<string, string> = Object.fromEntries(Object.entries(htmlEntities).map(([k, v]) => [v, k]));

  function encode(str: string): string {
    return str.replace(/[&<>"']/g, (ch) => htmlEntities[ch] ?? ch);
  }
  function decode(str: string): string {
    return str.replace(/&(amp|lt|gt|quot|#39);/g, (m) => reverseEntities[m] ?? m);
  }

  const output = mode === "encode" ? encode(text) : decode(text);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => { setMode("encode"); setText(""); }} className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "encode" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.htmlEncode")}</button>
        <button onClick={() => { setMode("decode"); setText(""); }} className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "decode" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.htmlDecode")}</button>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.htmlEncInput")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={mode === "encode" ? "<div>Hello</div>" : "&lt;div&gt;Hello&lt;/div&gt;"} className="h-32 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      {output && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.htmlEncOutput")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="h-32 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{output}</pre>
        </div>
      )}
    </div>
  );
}
