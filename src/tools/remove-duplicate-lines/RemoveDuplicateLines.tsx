"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

export function RemoveDuplicateLines() {
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
          Enter or paste your text
        </label>
        <textarea
          id="rdl-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste lines with potential duplicates…"
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
          Case sensitive
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={trimWhitespace}
            onChange={(e) => setTrimWhitespace(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 accent-brand-600"
          />
          Trim whitespace before comparing
        </label>
      </div>

      {text.trim() && (
        <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700">
          {result.total} lines → {result.total - result.removed} unique · {result.removed} duplicate{result.removed !== 1 ? "s" : ""} removed
        </div>
      )}

      <div>
        <label htmlFor="rdl-output" className="mb-2 block text-sm font-medium text-slate-600">
          Result ({result.total - result.removed} lines)
        </label>
        <textarea
          id="rdl-output"
          value={result.output}
          readOnly
          className="input-field min-h-[150px] resize-y font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {result.output && <CopyButton text={result.output} label="Result" />}
        <button
          onClick={() => setText("")}
          disabled={!text}
          className="btn-secondary"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
