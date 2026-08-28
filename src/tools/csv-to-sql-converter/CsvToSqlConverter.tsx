"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function CsvToSqlConverter() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [tableName, setTableName] = useState("my_table");
  const [separator, setSeparator] = useState(",");

  function escapeVal(val: string): string {
    if (val === "") return "NULL";
    const num = Number(val);
    if (!isNaN(num) && val.trim() !== "") return String(num);
    return `'${val.replace(/'/g, "''")}'`;
  }

  function generate(): string {
    const lines = text.split("\n").filter((l) => l.trim() !== "");
    if (lines.length < 2) return "";
    const headers = lines[0]!.split(separator).map((h) => h.trim().replace(/^["']|["']$/g, ""));
    const sql: string[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i]!.split(separator).map((v) => v.trim().replace(/^["']|["']$/g, ""));
      const cols = headers.join(", ");
      const vals = values.map(escapeVal).join(", ");
      sql.push(`INSERT INTO ${tableName} (${cols}) VALUES (${vals});`);
    }
    return sql.join("\n");
  }

  const output = generate();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.csvSqlTable")}</label>
          <input type="text" value={tableName} onChange={(e) => setTableName(e.target.value)} className="w-48 rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.csvSqlSeparator")}</label>
          <select value={separator} onChange={(e) => setSeparator(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value={"\t"}>Tab</option>
          </select>
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.csvSqlInput")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={"id,name,age\n1,Alice,30\n2,Bob,25"} className="h-40 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      {output && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.csvSqlOutput")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="h-48 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{output}</pre>
        </div>
      )}
    </div>
  );
}
