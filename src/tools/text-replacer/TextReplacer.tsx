"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function TextReplacer() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);

  let output = text;
  try {
    if (find) {
      const flags = caseSensitive ? "g" : "gi";
      const pattern = useRegex ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags);
      output = text.replace(pattern, replace);
    }
  } catch {
    output = t("common.textReplacerError");
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.textReplacerInput")}</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("common.textReplacerPlaceholder")}
          className="h-32 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.textReplacerFind")}</label>
          <input type="text" value={find} onChange={(e) => setFind(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.textReplacerReplace")}</label>
          <input type="text" value={replace} onChange={(e) => setReplace(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded" />
          {t("common.textReplacerCaseSensitive")}
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} className="rounded" />
          {t("common.textReplacerUseRegex")}
        </label>
      </div>
      {output && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.textReplacerOutput")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="h-32 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">{output}</pre>
        </div>
      )}
    </div>
  );
}
