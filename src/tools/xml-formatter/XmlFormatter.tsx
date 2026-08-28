"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function XmlFormatter() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");
  function formatXml(xml: string): string {
    let formatted = "";
    let indent = "";
    const tab = "  ";
    xml.split(/>\s*</).forEach((node) => {
      if (node.match(/^\/\w/)) indent = indent.substring(tab.length);
      formatted += indent + "<" + node + ">\n";
      if (node.match(/^<?\w[^>]*[^/]>$/) && !node.startsWith("?")) indent += tab;
    });
    return formatted.trim();
  }

  function minifyXml(xml: string): string {
    return xml.replace(/>\s+</g, "><").replace(/\s{2,}/g, " ").trim();
  }

  let output = "";
  let error: string | null = null;
  try {
    if (mode === "beautify") output = formatXml(text);
    else output = minifyXml(text);
  } catch {
    error = t("common.xmlError");
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => setMode("beautify")} className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "beautify" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.xmlBeautify")}</button>
        <button onClick={() => setMode("minify")} className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "minify" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.xmlMinify")}</button>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.xmlInput")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="<root><item>value</item></root>" className="h-40 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
      {output && !error && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.xmlOutput")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="h-40 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{output}</pre>
        </div>
      )}
    </div>
  );
}
