"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function CssMinifier() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");

  function beautifyCss(css: string): string {
    return css
      .replace(/\s*{\s*/g, " {\n  ")
      .replace(/;\s*/g, ";\n  ")
      .replace(/\s*}\s*/g, "\n}\n")
      .replace(/\n  \n/g, "\n")
      .replace(/}\n\n/g, "}\n")
      .trim();
  }

  function minifyCss(css: string): string {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*{\s*/g, "{")
      .replace(/\s*}\s*/g, "}")
      .replace(/\s*;\s*/g, ";")
      .replace(/\s*:\s*/g, ":")
      .trim();
  }

  const output = mode === "beautify" ? beautifyCss(text) : minifyCss(text);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setMode("beautify")} className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "beautify" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.cssBeautify")}</button>
        <button onClick={() => setMode("minify")} className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "minify" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.cssMinify")}</button>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.cssInput")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder=".btn { color: red; padding: 10px; }" className="h-40 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      {output && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.cssOutput")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="h-40 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{output}</pre>
        </div>
      )}
    </div>
  );
}
