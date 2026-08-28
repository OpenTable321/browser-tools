"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function HtmlStripper() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"strip" | "breaks">("strip");

  const output = mode === "strip"
    ? input.replace(/<[^>]*>/g, "")
    : input.replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n").replace(/<\/div>/gi, "\n").replace(/<\/li>/gi, "\n").replace(/<[^>]*>/g, "").replace(/\n{3,}/g, "\n\n").trim();

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.htmlStripperInput")}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("common.htmlStripperPlaceholder")}
          className="h-40 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setMode("strip")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "strip" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}
        >{t("common.htmlStripperModeStrip")}</button>
        <button
          onClick={() => setMode("breaks")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "breaks" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}
        >{t("common.htmlStripperModeBreaks")}</button>
      </div>

      {output && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.htmlStripperOutput")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="h-40 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">{output}</pre>
        </div>
      )}
    </div>
  );
}
