"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

type CaseType = "upper" | "lower" | "title" | "sentence" | "camel" | "snake" | "inverse";

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}

function toSentenceCase(str: string): string {
  return str.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()).toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
}

function toInverseCase(str: string): string {
  return str.split("").map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())).join("");
}

function toCamelCase(str: string): string {
  const words = str.trim().split(/[\s_\-]+/).filter(Boolean);
  if (words.length === 0) return "";
  const first = words[0]!.toLowerCase();
  const rest = words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  return first + rest.join("");
}

function toSnakeCase(str: string): string {
  return str
    .trim()
    .split(/[\s\-]+/)
    .filter(Boolean)
    .map((w) => w.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase())
    .join("_");
}

function convertCase(text: string, type: CaseType): string {
  switch (type) {
    case "upper": return text.toUpperCase();
    case "lower": return text.toLowerCase();
    case "title": return toTitleCase(text);
    case "sentence": return toSentenceCase(text);
    case "camel": return toCamelCase(text);
    case "snake": return toSnakeCase(text);
    case "inverse": return toInverseCase(text);
  }
}

export function CaseConverter() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType | null>(null);

  const CASE_LABELS: Record<CaseType, string> = {
    upper: t("common.uppercase"),
    lower: t("common.lowercase"),
    title: t("common.titleCase"),
    sentence: t("common.sentenceCase"),
    camel: t("common.camelCase"),
    snake: t("common.snakeCase"),
    inverse: t("common.inverseCase"),
  };

  const output = activeCase ? convertCase(text, activeCase) : "";

  function handleConvert(type: CaseType) {
    setActiveCase(type);
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="case-input" className="mb-2 block text-sm font-medium text-slate-600">
          {t("common.enterOrPasteText")}
        </label>
        <textarea
          id="case-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setActiveCase(null);
          }}
          placeholder={t("common.startTypingPlaceholder")}
          className="input-field min-h-[150px] resize-y font-mono text-sm"
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-700">{t("common.chooseCase")}</h3>
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
            {t("common.result")}
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
        {output && <CopyButton text={output} label={t("common.result")} />}
        {output && (
          <button
            onClick={() => {
              const blob = new Blob([output], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "converted-text.txt";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="btn-secondary"
          >
            {t("common.downloadTxt")}
          </button>
        )}
        <button
          onClick={() => {
            setText("");
            setActiveCase(null);
          }}
          disabled={!text}
          className="btn-secondary"
        >
          {t("common.clear")}
        </button>
      </div>
    </div>
  );
}
