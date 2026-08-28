"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function JsonPathFinder() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  let parsed: unknown = null;
  let error: string | null = null;
  try {
    parsed = text.trim() ? JSON.parse(text) : null;
  } catch (e) {
    error = e instanceof Error ? e.message : t("common.jsonPathError");
  }

  function buildPath(base: string, key: string | number): string {
    if (typeof key === "number") return `${base}[${key}]`;
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) return `${base}.${key}`;
    return `${base}["${key}"]`;
  }

  function renderNode(value: unknown, path: string, label: string, depth: number): React.ReactNode {
    const isLeaf = value === null || typeof value !== "object";
    const displayValue = isLeaf ? JSON.stringify(value) : "";
    const type = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;

    return (
      <div key={path + label} style={{ marginLeft: depth * 20 }}>
        <div
          className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-sm cursor-pointer hover:bg-blue-50 ${selectedPath === path ? "bg-blue-100" : ""}`}
          onClick={() => !isLeaf && setSelectedPath(path)}
        >
          <span className="font-medium text-slate-700">{label}:</span>
          {isLeaf ? (
            <span className={`font-mono text-xs ${type === "string" ? "text-green-600" : type === "number" ? "text-blue-600" : type === "boolean" ? "text-purple-600" : "text-slate-500"}`}>{displayValue}</span>
          ) : (
            <span className="text-xs text-slate-400">[{type}]</span>
          )}
          {isLeaf && (
            <button onClick={(e) => { e.stopPropagation(); setSelectedPath(path); }} className="ml-1 text-xs text-blue-500 hover:underline">{t("common.jsonPathCopy")}</button>
          )}
        </div>
        {Array.isArray(value) && value.map((item, i) => (
          <div key={i}>{renderNode(item, buildPath(path, i), `[${i}]`, depth + 1)}</div>
        ))}
        {value !== null && typeof value === "object" && !Array.isArray(value) && Object.entries(value).map(([k, v]) => (
          <div key={k}>{renderNode(v, buildPath(path, k), k, depth + 1)}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.jsonPathInput")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='{"users":[{"id":1,"name":"Alice"}]}' className="h-40 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
      {parsed !== null && !error && (
        <div>
          <span className="text-sm font-medium text-slate-700">{t("common.jsonPathTree")}</span>
          <div className="mt-2 max-h-96 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
            {renderNode(parsed, "$", "root", 0)}
          </div>
        </div>
      )}
      {selectedPath && (
        <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">{t("common.jsonPathSelected")}</span>
            <CopyButton text={selectedPath} />
          </div>
          <code className="text-sm font-mono text-blue-700">{selectedPath}</code>
        </div>
      )}
    </div>
  );
}
