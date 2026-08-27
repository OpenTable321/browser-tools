"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

type SortOrder = "asc" | "desc";
type SortMode = "alphabetical" | "numeric";

export function TextSorter() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [order, setOrder] = useState<SortOrder>("asc");
  const [mode, setMode] = useState<SortMode>("alphabetical");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);

  const result = useMemo(() => {
    if (!text.trim()) return "";

    let lines = text.split("\n");

    if (trimLines) {
      lines = lines.map((l) => l.trim());
    }
    if (removeEmpty) {
      lines = lines.filter((l) => l.trim().length > 0);
    }

    lines.sort((a, b) => {
      let cmp: number;

      if (mode === "numeric") {
        const aNum = parseFloat(a.replace(/[^0-9.-]/g, ""));
        const bNum = parseFloat(b.replace(/[^0-9.-]/g, ""));
        cmp = (isNaN(aNum) ? -Infinity : aNum) - (isNaN(bNum) ? -Infinity : bNum);
      } else {
        const aCmp = caseSensitive ? a : a.toLowerCase();
        const bCmp = caseSensitive ? b : b.toLowerCase();
        cmp = aCmp < bCmp ? -1 : aCmp > bCmp ? 1 : 0;
      }

      return order === "asc" ? cmp : -cmp;
    });

    if (removeDuplicates) {
      const seen = new Set<string>();
      lines = lines.filter((l) => {
        const key = caseSensitive ? l : l.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    return lines.join("\n");
  }, [text, order, mode, caseSensitive, trimLines, removeEmpty, removeDuplicates]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="sorter-input" className="mb-2 block text-sm font-medium text-slate-600">
          {t("common.enterLinesToSort")}
        </label>
        <textarea
          id="sorter-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("common.pasteOneItemPerLine")}
          className="input-field min-h-[150px] resize-y font-mono text-sm"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">{t("common.sortSettings")}</h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">{t("common.sortMode")}</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setMode("alphabetical")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  mode === "alphabetical" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t("common.sortAlphabetical")}
              </button>
              <button
                onClick={() => setMode("numeric")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  mode === "numeric" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t("common.sortNumerical")}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">{t("common.orderLabel")}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setOrder("asc")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  order === "asc" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {mode === "alphabetical" ? "A–Z" : t("common.sortAscending")}
              </button>
              <button
                onClick={() => setOrder("desc")}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  order === "desc" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {mode === "alphabetical" ? "Z–A" : t("common.sortDescending")}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-brand-600"
            />
            {t("common.caseSensitive")}
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-brand-600"
            />
            {t("common.trimLines")}
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={removeEmpty}
              onChange={(e) => setRemoveEmpty(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-brand-600"
            />
            {t("common.removeEmptyLines")}
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={removeDuplicates}
              onChange={(e) => setRemoveDuplicates(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-brand-600"
            />
            {t("common.removeDuplicates")}
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="sorter-output" className="mb-2 block text-sm font-medium text-slate-600">
          {t("common.sortedResult")}
        </label>
        <textarea
          id="sorter-output"
          value={result}
          readOnly
          className="input-field min-h-[150px] resize-y font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {result && <CopyButton text={result} label={t("common.result")} />}
        <button
          onClick={() => setText("")}
          disabled={!text}
          className="btn-secondary"
        >
          {t("common.clear")}
        </button>
      </div>
    </div>
  );
}
