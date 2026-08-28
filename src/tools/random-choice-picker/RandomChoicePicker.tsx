"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function RandomChoicePicker() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  function pick() {
    const choices = text.split(/[,\n]/).map((c) => c.trim()).filter((c) => c !== "");
    if (choices.length === 0) return;
    setSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      setResult(choices[Math.floor(Math.random() * choices.length)] ?? "");
      count++;
      if (count > 15) {
        clearInterval(interval);
        setSpinning(false);
      }
    }, 80);
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.choicePickerInput")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("common.choicePickerPlaceholder")} className="h-32 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      <button onClick={pick} disabled={spinning} className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
        {spinning ? t("common.choicePickerSpinning") : t("common.choicePickerPick")}
      </button>
      {result && (
        <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-8 text-center">
          <div className="text-xs font-medium text-slate-500">{t("common.choicePickerResult")}</div>
          <div className={`mt-2 text-3xl font-bold text-slate-800 ${spinning ? "animate-pulse" : ""}`}>
            {result}
          </div>
          {!spinning && <div className="mt-3"><CopyButton text={result} /></div>}
        </div>
      )}
    </div>
  );
}
