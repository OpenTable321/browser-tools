"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type CaseType = "upper" | "lower" | "title" | "sentence" | "toggle";

const CASE_LABELS: Record<CaseType, string> = {
  upper: "UPPERCASE",
  lower: "lowercase",
  title: "Title Case",
  sentence: "Sentence case",
  toggle: "tOGGLE cASE",
};

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}

function toSentenceCase(str: string): string {
  return str.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()).toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
}

function toToggleCase(str: string): string {
  return str.split("").map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join("");
}

function convertCase(text: string, type: CaseType): string {
  switch (type) {
    case "upper": return text.toUpperCase();
    case "lower": return text.toLowerCase();
    case "title": return toTitleCase(text);
    case "sentence": return toSentenceCase(text);
    case "toggle": return toToggleCase(text);
  }
}

export function CaseConverter() {
  const [text, setText] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType | null>(null);

  const output = activeCase ? convertCase(text, activeCase) : "";

  function handleConvert(type: CaseType) {
    setActiveCase(type);
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="case-input" className="mb-2 block text-sm font-medium text-slate-600">
          Enter or paste your text
        </label>
        <textarea
          id="case-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setActiveCase(null);
          }}
          placeholder="Start typing or paste text here…"
          className="input-field min-h-[150px] resize-y font-mono text-sm"
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-700">Choose a case transformation</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(CASE_LABELS) as CaseType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleConvert(type)}
              disabled={!text}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeCase === type
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50"
              }`}
            >
              {CASE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {activeCase && (
        <div>
          <label htmlFor="case-output" className="mb-2 block text-sm font-medium text-slate-600">
            Result
          </label>
          <textarea
            id="case-output"
            value={output}
            readOnly
            className="input-field min-h-[150px] resize-y font-mono text-sm"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {output && <CopyButton text={output} label="Result" />}
        <button
          onClick={() => {
            setText("");
            setActiveCase(null);
          }}
          disabled={!text}
          className="btn-secondary"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
