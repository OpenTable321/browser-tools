"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function TextLineCounter() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [trimLines, setTrimLines] = useState(false);
  const [removeEmpty, setRemoveEmpty] = useState(false);
  const [maxChars, setMaxChars] = useState(0);

  let lines = text.split("\n");
  if (trimLines) lines = lines.map((l) => l.trim());
  if (removeEmpty) lines = lines.filter((l) => l !== "");
  if (maxChars > 0) lines = lines.map((l) => l.slice(0, maxChars));

  const output = lines.join("\n");

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.lineCounterInput")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("common.lineCounterPlaceholder")} className="h-32 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={trimLines} onChange={(e) => setTrimLines(e.target.checked)} className="rounded" />
          {t("common.lineCounterTrim")}
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} className="rounded" />
          {t("common.lineCounterRemoveEmpty")}
        </label>
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <label>{t("common.lineCounterMaxChars")}</label>
          <input type="number" min={0} value={maxChars} onChange={(e) => setMaxChars(parseInt(e.target.value) || 0)} className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        {t("common.lineCounterCount")}: <span className="font-bold">{lines.length}</span>
      </div>
      {output && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.lineCounterOutput")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="h-32 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">{output}</pre>
        </div>
      )}
    </div>
  );
}
