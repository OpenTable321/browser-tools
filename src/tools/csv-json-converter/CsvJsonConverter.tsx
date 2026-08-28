"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function CsvJsonConverter() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"csv2json" | "json2csv">("csv2json");
  const [delimiter, setDelimiter] = useState(",");

  function csvToJson(csv: string, delim: string): string {
    const lines = csv.trim().split("\n").filter((l) => l.trim());
    if (lines.length < 1) return "[]";
    const headers = lines[0]!.split(delim).map((h) => h.trim());
    const result = lines.slice(1).map((line) => {
      const values = line.split(delim);
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => { obj[h] = (values[i] ?? "").trim(); });
      return obj;
    });
    return JSON.stringify(result, null, 2);
  }

  function jsonToCsv(jsonStr: string, delim: string): string {
    try {
      const data = JSON.parse(jsonStr);
      if (!Array.isArray(data) || data.length === 0) return "";
      const headers = Object.keys(data[0]!);
      const lines = [headers.join(delim)];
      data.forEach((row: Record<string, unknown>) => {
        lines.push(headers.map((h) => String(row[h] ?? "")).join(delim));
      });
      return lines.join("\n");
    } catch {
      return t("common.csvJsonError");
    }
  }

  const output = mode === "csv2json" ? csvToJson(text, delimiter) : jsonToCsv(text, delimiter);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button onClick={() => { setMode("csv2json"); setText(""); }} className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "csv2json" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.csvToJson")}</button>
        <button onClick={() => { setMode("json2csv"); setText(""); }} className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "json2csv" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.jsonToCsv")}</button>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.csvJsonDelimiter")}</label>
        <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
          <option value=",">Comma (,)</option>
          <option value=";">Semicolon (;)</option>
          <option value={"\t"}>Tab</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.csvJsonInput")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={mode === "csv2json" ? "name,age\nAlice,30" : '[{"name":"Alice","age":30}]'} className="h-40 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      {output && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.csvJsonOutput")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="h-40 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{output}</pre>
        </div>
      )}
    </div>
  );
}
