"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function RemoveDuplicateLines() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimWhitespace, setTrimWhitespace] = useState(true);

  const result = useMemo(() => {
    if (!text.trim()) return { output: "", removed: 0, total: 0 };

    const lines = text.split("\n");
    const seen = new Set<string>();
    const unique: string[] = [];

    for (const line of lines) {
      const processed = trimWhitespace ? line.trim() : line;
      const key = caseSensitive ? processed : processed.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(line);
      }
    }

    return {
      output: unique.join("\n"),
      removed: lines.length - unique.length,
      total: lines.length,
    };
  }, [text, caseSensitive, trimWhitespace]);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="rdl-input" className="mb-2 block text-sm font-medium text-slate-600">
          {t("common.enterOrPasteText")}
        </label>
        <textarea
          id="rdl-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("common.pasteDuplicatesPlaceholder")}
          className="input-field min-h-[150px] resize-y font-mono text-sm"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
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
            checked={trimWhitespace}
            onChange={(e) => setTrimWhitespace(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 accent-brand-600"
          />
          {t("common.trimWhitespace")}
        </label>
      </div>

      {text.trim() && (
        <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700">
          {t("common.resultLines", { count: result.total, unique: result.total - result.removed, removed: result.removed })}
        </div>
      )}

      <div>
        <label htmlFor="rdl-output" className="mb-2 block text-sm font-medium text-slate-600">
          {t("common.resultWithCount", { count: result.total - result.removed })}
        </label>
        <textarea
          id="rdl-output"
          value={result.output}
          readOnly
          className="input-field min-h-[150px] resize-y font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {result.output && <CopyButton text={result.output} label={t("common.result")} />}
        {result.output && (
          <button
            onClick={() => {
              const blob = new Blob([result.output], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "unique-lines.txt";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="btn-secondary"
          >
            {t("common.downloadTxt")}
          </button>
        )}
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
