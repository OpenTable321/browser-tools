"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function DataSizeConverter() {
  const { t } = useTranslation();
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("KB");
  const [base, setBase] = useState<2 | 10>(2);

  const units = base === 2
    ? ["b", "B", "KB", "MB", "GB", "TB", "PB"]
    : ["b", "B", "KB", "MB", "GB", "TB", "PB"];

  const multipliers: Record<string, number> = {};
  const factor = base === 2 ? 1024 : 1000;
  const sizes = [1, 8, factor, factor * factor, factor ** 3, factor ** 4, factor ** 5];
  units.forEach((u, i) => { multipliers[u] = sizes[i]!; });

  const inputVal = parseFloat(value) || 0;
  const inBits = inputVal * multipliers[fromUnit]!;

  const results = units.map((u) => ({
    unit: u,
    value: inBits / multipliers[u]!,
  }));

  const fmt = (v: number) => {
    if (v === 0) return "0";
    if (Math.abs(v) < 0.0001) return v.toExponential(2);
    if (Math.abs(v) >= 1e15) return v.toExponential(2);
    return v.toLocaleString("en-US", { maximumFractionDigits: 6 });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.dataSizeValue")}</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.dataSizeUnit")}</label>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
            {units.map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setBase(2)} className={`rounded-lg px-3 py-2 text-sm font-medium ${base === 2 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>Base 2 (1024)</button>
          <button onClick={() => setBase(10)} className={`rounded-lg px-3 py-2 text-sm font-medium ${base === 10 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>Base 10 (1000)</button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {results.map((r) => (
          <div key={r.unit} className={`rounded-lg border px-4 py-3 ${r.unit === fromUnit ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-slate-50"}`}>
            <div className="text-xs font-medium text-slate-500">{r.unit}</div>
            <div className="mt-1 text-sm font-mono text-slate-800">{fmt(r.value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
