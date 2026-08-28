"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function ListRandomizer() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [pickCount, setPickCount] = useState(1);
  const [removeEmpty, setRemoveEmpty] = useState(true);

  let lines = text.split("\n");
  if (removeEmpty) lines = lines.filter((l) => l.trim() !== "");

  function shuffle(arr: string[]): string[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j]!, a[i]!];
    }
    return a;
  }

  const shuffled = text.trim() ? shuffle(lines) : [];
  const picked = shuffled.slice(0, Math.min(pickCount, shuffled.length));

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.listRandomizerInput")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("common.listRandomizerPlaceholder")} className="h-32 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.listRandomizerPickCount")}</label>
          <input type="number" min={1} value={pickCount} onChange={(e) => setPickCount(Math.max(1, parseInt(e.target.value) || 1))} className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <label className="flex items-center gap-2 pt-6 text-sm text-slate-700">
          <input type="checkbox" checked={removeEmpty} onChange={(e) => setRemoveEmpty(e.target.checked)} className="rounded" />
          {t("common.listRandomizerRemoveEmpty")}
        </label>
      </div>
      {shuffled.length > 0 && (
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">{t("common.listRandomizerPicked")}</span>
              <CopyButton text={picked.join("\n")} />
            </div>
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-slate-800">
              {picked.map((item, i) => <div key={i}>{item}</div>)}
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">{t("common.listRandomizerShuffled")}</span>
              <CopyButton text={shuffled.join("\n")} />
            </div>
            <pre className="h-32 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">{shuffled.join("\n")}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
