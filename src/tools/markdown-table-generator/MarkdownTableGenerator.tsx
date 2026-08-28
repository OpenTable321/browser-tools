"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function MarkdownTableGenerator() {
  const { t } = useTranslation();
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState<string[][]>([["Header 1", "Header 2", "Header 3"], ["", "", ""], ["", "", ""]]);
  const [aligns, setAligns] = useState<("left" | "center" | "right")[]>(["left", "left", "left"]);

  function updateCell(r: number, c: number, val: string) {
    setData((prev) => {
      const next = prev.map((row) => [...row]);
      if (!next[r]) next[r] = Array(cols).fill("");
      next[r]![c] = val;
      return next;
    });
  }

  function resize(newRows: number, newCols: number) {
    setRows(newRows);
    setCols(newCols);
    setData((prev) => {
      const next: string[][] = [];
      for (let r = 0; r < newRows; r++) {
        const row: string[] = [];
        for (let c = 0; c < newCols; c++) {
          row.push(prev[r]?.[c] ?? "");
        }
        next.push(row);
      }
      return next;
    });
    setAligns((prev) => {
      const next: ("left" | "center" | "right")[] = [];
      for (let c = 0; c < newCols; c++) next.push(prev[c] ?? "left");
      return next;
    });
  }

  function generate(): string {
    if (data.length === 0 || cols === 0) return "";
    const header = `| ${data[0]!.map((c) => c || " ").join(" | ")} |`;
    const sep = `| ${aligns.slice(0, cols).map((a) => a === "center" ? ":---:" : a === "right" ? "---:" : ":---").join(" | ")} |`;
    const body = data.slice(1).map((row) => `| ${row.slice(0, cols).map((c) => c || " ").join(" | ")} |`).join("\n");
    return [header, sep, body].filter(Boolean).join("\n");
  }

  const output = generate();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.mdTableRows")}: {rows}</label>
          <input type="number" min={1} max={20} value={rows} onChange={(e) => resize(parseInt(e.target.value) || 1, cols)} className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.mdTableCols")}: {cols}</label>
          <input type="number" min={1} max={10} value={cols} onChange={(e) => resize(rows, parseInt(e.target.value) || 1)} className="w-20 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              {Array.from({ length: cols }).map((_, c) => (
                <th key={c} className="border border-slate-300 px-2 py-1">
                  <input value={data[0]?.[c] ?? ""} onChange={(e) => updateCell(0, c, e.target.value)} className="w-full rounded border border-slate-200 px-2 py-1 text-sm font-medium focus:border-blue-500 focus:outline-none" />
                  <select value={aligns[c] ?? "left"} onChange={(e) => setAligns((prev) => { const next = [...prev]; next[c] = e.target.value as "left" | "center" | "right"; return next; })} className="mt-1 w-full rounded border border-slate-200 px-1 py-0.5 text-xs focus:outline-none">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, r) => (
              <tr key={r}>
                {Array.from({ length: cols }).map((_, c) => (
                  <td key={c} className="border border-slate-300 px-2 py-1">
                    <input value={row[c] ?? ""} onChange={(e) => updateCell(r + 1, c, e.target.value)} className="w-full rounded border border-slate-200 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {output && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.mdTableOutput")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{output}</pre>
        </div>
      )}
    </div>
  );
}
