"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

type DiffType = "equal" | "added" | "removed";

interface DiffPart {
  type: DiffType;
  text: string;
}

function tokenize(text: string): string[] {
  const tokens = text.split(/(\s+|[^\w\s])/);
  return tokens.filter((t) => t.length > 0);
}

function computeLcs(a: string[], b: string[]): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i]![j] = dp[i - 1]![j - 1]! + 1;
      } else {
        dp[i]![j] = Math.max(dp[i - 1]![j]!, dp[i]![j - 1]!);
      }
    }
  }
  return dp;
}

function diffTokens(a: string[], b: string[]): DiffPart[] {
  const dp = computeLcs(a, b);
  const result: DiffPart[] = [];
  let i = a.length;
  let j = b.length;

  const parts: DiffPart[] = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      parts.push({ type: "equal", text: a[i - 1]! });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i]![j - 1]! >= dp[i - 1]![j]!)) {
      parts.push({ type: "added", text: b[j - 1]! });
      j--;
    } else {
      parts.push({ type: "removed", text: a[i - 1]! });
      i--;
    }
  }
  parts.reverse();

  for (const part of parts) {
    const last = result[result.length - 1];
    if (last && last.type === part.type) {
      last.text += part.text;
    } else {
      result.push({ ...part });
    }
  }
  return result;
}

export function TextDiffChecker() {
  const { t } = useTranslation();
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showDiff, setShowDiff] = useState(false);

  const diff = useMemo(() => {
    if (!showDiff) return null;
    const tokens1 = tokenize(text1);
    const tokens2 = tokenize(text2);
    return diffTokens(tokens1, tokens2);
  }, [text1, text2, showDiff]);

  const stats = useMemo(() => {
    if (!diff) return null;
    let added = 0;
    let removed = 0;
    let equal = 0;
    for (const part of diff) {
      if (part.type === "added") added += part.text.length;
      else if (part.type === "removed") removed += part.text.length;
      else equal += part.text.length;
    }
    return { added, removed, equal };
  }, [diff]);

  function handleCompare() {
    setShowDiff(true);
  }

  function handleClear() {
    setText1("");
    setText2("");
    setShowDiff(false);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="diff-input-1"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            {t("common.originalText")}
          </label>
          <textarea
            id="diff-input-1"
            value={text1}
            onChange={(e) => {
              setText1(e.target.value);
              setShowDiff(false);
            }}
            placeholder={t("common.enterOriginalText")}
            className="input-field min-h-[200px] resize-y font-mono text-sm"
            spellCheck={false}
          />
        </div>
        <div>
          <label
            htmlFor="diff-input-2"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            {t("common.modifiedText")}
          </label>
          <textarea
            id="diff-input-2"
            value={text2}
            onChange={(e) => {
              setText2(e.target.value);
              setShowDiff(false);
            }}
            placeholder={t("common.enterModifiedText")}
            className="input-field min-h-[200px] resize-y font-mono text-sm"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCompare}
          disabled={!text1 && !text2}
          className="btn-primary"
        >
          {t("common.compare")}
        </button>
        <button
          onClick={handleClear}
          disabled={!text1 && !text2}
          className="btn-secondary"
        >
          {t("common.clear")}
        </button>
      </div>

      {showDiff && diff && (
        <div className="space-y-4">
          {stats && (
            <div className="flex flex-wrap gap-4">
              <div className="rounded-lg bg-green-50 px-4 py-2 text-sm">
                <span className="text-green-600">{t("common.added")}: </span>
                <span className="font-bold text-green-700">{stats.added}</span>
              </div>
              <div className="rounded-lg bg-red-50 px-4 py-2 text-sm">
                <span className="text-red-600">{t("common.removed")}: </span>
                <span className="font-bold text-red-700">{stats.removed}</span>
              </div>
              <div className="rounded-lg bg-slate-100 px-4 py-2 text-sm">
                <span className="text-slate-500">{t("common.unchanged")}: </span>
                <span className="font-bold text-slate-700">{stats.equal}</span>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">
              {t("common.diffResult")}
            </h3>
            <div className="overflow-x-auto">
              <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed">
                {diff.map((part, i) => {
                  if (part.type === "equal") {
                    return (
                      <span key={i} className="text-slate-700">
                        {part.text}
                      </span>
                    );
                  }
                  if (part.type === "added") {
                    return (
                      <span
                        key={i}
                        className="rounded bg-green-100 px-0.5 text-green-800 decoration-green-500"
                        style={{ backgroundColor: "#dcfce7" }}
                      >
                        {part.text}
                      </span>
                    );
                  }
                  return (
                    <span
                      key={i}
                      className="rounded bg-red-100 px-0.5 text-red-800 line-through"
                      style={{ backgroundColor: "#fee2e2" }}
                    >
                      {part.text}
                    </span>
                  );
                })}
              </pre>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-4 w-4 rounded"
                style={{ backgroundColor: "#dcfce7" }}
              />
              {t("common.added")}
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-4 w-4 rounded"
                style={{ backgroundColor: "#fee2e2" }}
              />
              {t("common.removed")}
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 rounded bg-slate-200" />
              {t("common.unchanged")}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
