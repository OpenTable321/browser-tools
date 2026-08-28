"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function TextPrefixSuffix() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [skipEmpty, setSkipEmpty] = useState(true);

  const output = text
    .split("\n")
    .map((line) => {
      if (skipEmpty && line.trim() === "") return line;
      return prefix + line + suffix;
    })
    .join("\n");

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.prefixSuffixInput")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("common.prefixSuffixPlaceholder")} className="h-32 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.prefixLabel")}</label>
          <input type="text" value={prefix} onChange={(e) => setPrefix(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.suffixLabel")}</label>
          <input type="text" value={suffix} onChange={(e) => setSuffix(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" checked={skipEmpty} onChange={(e) => setSkipEmpty(e.target.checked)} className="rounded" />
        {t("common.prefixSuffixSkipEmpty")}
      </label>
      {output && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.prefixSuffixOutput")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="h-32 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">{output}</pre>
        </div>
      )}
    </div>
  );
}
