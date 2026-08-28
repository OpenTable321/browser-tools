"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

interface ValidationResult {
  valid: boolean;
  error: string | null;
  errorLine: number | null;
  errorColumn: number | null;
  errorContext: string | null;
  formatted: string | null;
  keyCount: number | null;
  depth: number | null;
}

function extractErrorPosition(
  input: string,
  error: Error,
): { line: number; column: number; context: string } | null {
  const msg = error.message;
  const posMatch = msg.match(/position\s+(\d+)/i);
  let pos = posMatch ? parseInt(posMatch[1]!, 10) : -1;

  if (pos === -1) {
    const lineMatch = msg.match(/line\s+(\d+)\s+column\s+(\d+)/i);
    if (lineMatch) {
      const line = parseInt(lineMatch[1]!, 10);
      const col = parseInt(lineMatch[2]!, 10);
      const lines = input.split("\n");
      const ctxLine = lines[line - 1] ?? "";
      return { line, column: col, context: ctxLine.trim() };
    }
    return null;
  }

  const before = input.slice(0, pos);
  const lines = before.split("\n");
  const line = lines.length;
  const column = pos - before.lastIndexOf("\n");

  const allLines = input.split("\n");
  const ctxLine = allLines[line - 1] ?? "";
  return { line, column, context: ctxLine.trim() };
}

function countKeysAndDepth(obj: unknown, currentDepth = 0): { keys: number; depth: number } {
  if (typeof obj !== "object" || obj === null) {
    return { keys: 0, depth: currentDepth };
  }

  let keys = 0;
  let maxDepth = currentDepth;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      const result = countKeysAndDepth(item, currentDepth + 1);
      keys += result.keys;
      maxDepth = Math.max(maxDepth, result.depth);
    }
  } else {
    const record = obj as Record<string, unknown>;
    for (const key of Object.keys(record)) {
      keys++;
      const result = countKeysAndDepth(record[key], currentDepth + 1);
      keys += result.keys;
      maxDepth = Math.max(maxDepth, result.depth);
    }
  }

  return { keys, depth: maxDepth };
}

function validateJson(input: string, indentSize: number): ValidationResult {
  if (!input.trim()) {
    return {
      valid: false,
      error: null,
      errorLine: null,
      errorColumn: null,
      errorContext: null,
      formatted: null,
      keyCount: null,
      depth: null,
    };
  }

  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, indentSize);
    const { keys, depth } = countKeysAndDepth(parsed);

    return {
      valid: true,
      error: null,
      errorLine: null,
      errorColumn: null,
      errorContext: null,
      formatted,
      keyCount: keys,
      depth,
    };
  } catch (err) {
    const error = err as Error;
    const pos = extractErrorPosition(input, error);
    return {
      valid: false,
      error: error.message,
      errorLine: pos?.line ?? null,
      errorColumn: pos?.column ?? null,
      errorContext: pos?.context ?? null,
      formatted: null,
      keyCount: null,
      depth: null,
    };
  }
}

export function JsonValidator() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [indentSize, setIndentSize] = useState(2);

  const result = useMemo(() => validateJson(input, indentSize), [input, indentSize]);

  const inputLines = input.split("\n");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            {t("common.indentSize")}
          </label>
          <div className="flex rounded-lg border border-slate-300 p-1">
            {[2, 4].map((size) => (
              <button
                key={size}
                onClick={() => setIndentSize(size)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
                  indentSize === size
                    ? "bg-brand-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {size} {t("common.spaces")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="json-validate-input"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            {t("common.jsonInput")}
          </label>
          <textarea
            id="json-validate-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("common.jsonInputPlaceholder")}
            className="input-field min-h-[300px] resize-y font-mono text-sm"
            spellCheck={false}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="json-validate-output"
              className="block text-sm font-medium text-slate-600"
            >
              {t("common.jsonOutput")}
            </label>
            {result.formatted && <CopyButton text={result.formatted} label={t("common.copy")} />}
          </div>
          <textarea
            id="json-validate-output"
            value={result.formatted ?? ""}
            readOnly
            className="input-field min-h-[300px] resize-y font-mono text-sm"
            spellCheck={false}
          />
        </div>
      </div>

      {input.trim() && (
        <div className="space-y-3">
          {result.valid ? (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg text-green-600">✓</span>
                <span className="font-semibold text-green-800">
                  {t("common.jsonValid")}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-green-700">
                <span>
                  {t("common.keys")}: <strong>{result.keyCount}</strong>
                </span>
                <span>
                  {t("common.nestingDepth")}: <strong>{result.depth}</strong>
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-lg text-red-600">✕</span>
                <span className="font-semibold text-red-800">
                  {t("common.jsonInvalid")}
                </span>
              </div>
              {result.error && (
                <p className="mt-2 text-sm text-red-700">{result.error}</p>
              )}
              {result.errorLine !== null && (
                <p className="mt-1 text-sm text-red-600">
                  {t("common.errorAtLine")} {result.errorLine}
                  {result.errorColumn !== null && `, ${t("common.column")} ${result.errorColumn}`}
                </p>
              )}
              {result.errorContext && (
                <div className="mt-3 overflow-x-auto rounded bg-red-100 px-3 py-2">
                  <p className="mb-1 text-xs font-medium text-red-600">
                    {t("common.errorContext")}:
                  </p>
                  <pre className="font-mono text-sm text-red-800">
                    {result.errorContext}
                  </pre>
                </div>
              )}
              {result.errorLine !== null && result.errorLine <= inputLines.length && (
                <div className="mt-3 overflow-x-auto rounded border border-red-300 bg-white px-3 py-2">
                  <p className="mb-1 text-xs font-medium text-slate-500">
                    {t("common.linePreview")} {result.errorLine}:
                  </p>
                  <pre className="font-mono text-sm text-slate-800">
                    <span className="mr-3 select-none text-slate-400">
                      {result.errorLine}
                    </span>
                    {inputLines[result.errorLine - 1]}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => setInput("")}
          disabled={!input}
          className="btn-secondary"
        >
          {t("common.clear")}
        </button>
      </div>
    </div>
  );
}
