"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

type IndentSize = 2 | 4;
type ActionMode = "format" | "minify" | "validate" | null;

export function JsonFormatter() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<IndentSize>(2);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [actionMode, setActionMode] = useState<ActionMode>(null);

  function format() {
    setError(null);
    setOutput("");
    setIsValid(false);
    setActionMode("format");

    if (!input.trim()) {
      setError(t("common.pleaseEnterJson", { action: t("common.formatJson").toLowerCase() }));
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setIsValid(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.invalidJson"));
    }
  }

  function minify() {
    setError(null);
    setOutput("");
    setIsValid(false);
    setActionMode("minify");

    if (!input.trim()) {
      setError(t("common.pleaseEnterJson", { action: t("common.minifyJson").toLowerCase() }));
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setIsValid(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.invalidJson"));
    }
  }

  function validate() {
    setError(null);
    setOutput("");
    setIsValid(false);
    setActionMode("validate");

    if (!input.trim()) {
      setError(t("common.pleaseEnterJson", { action: t("common.validateJson").toLowerCase() }));
      return;
    }

    try {
      JSON.parse(input);
      setIsValid(true);
      setOutput(t("common.validJsonCheck"));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.invalidJson"));
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="json-input" className="mb-2 block text-sm font-medium text-slate-600">
          {t("common.jsonInput")}
        </label>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOutput("");
            setError(null);
            setIsValid(false);
            setActionMode(null);
          }}
          placeholder='{"key": "value", "items": [1, 2, 3]}'
          className="input-field min-h-[200px] resize-y font-mono text-sm"
          spellCheck={false}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">{t("common.indentation")}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setIndent(2)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  indent === 2 ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t("common.twoSpaces")}
              </button>
              <button
                onClick={() => setIndent(4)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  indent === 4 ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t("common.fourSpaces")}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={format} className="btn-primary">
              {t("common.formatJson")}
            </button>
            <button onClick={minify} className="btn-secondary">
              {t("common.minifyJson")}
            </button>
            <button onClick={validate} className="btn-secondary">
              {t("common.validateJson")}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <strong>{t("common.jsonError")}</strong> {error}
        </div>
      )}

      {isValid && !error && actionMode === "validate" && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {output}
        </div>
      )}

      {output && (actionMode === "format" || actionMode === "minify") && !error && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="json-output" className="text-sm font-medium text-slate-600">
              {t("common.result")}
            </label>
            <CopyButton text={output} label="JSON" />
          </div>
          <textarea
            id="json-output"
            value={output}
            readOnly
            className="input-field min-h-[200px] resize-y font-mono text-sm"
            spellCheck={false}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => { setInput(""); setOutput(""); setError(null); setIsValid(false); setActionMode(null); }}
          disabled={!input}
          className="btn-secondary"
        >
          {t("common.clear")}
        </button>
      </div>
    </div>
  );
}
