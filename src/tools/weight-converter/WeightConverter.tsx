"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function WeightConverter() {
  const { t } = useTranslation();
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("kg");

  const units: Record<string, number> = {
    mg: 0.000001, g: 0.001, kg: 1, t: 1000,
    oz: 0.0283495, lb: 0.453592, st: 6.35029,
  };

  const inputVal = parseFloat(value) || 0;
  const inKg = inputVal * units[fromUnit]!;

  const fmt = (v: number) => {
    if (Math.abs(v) < 0.000001 && v !== 0) return v.toExponential(3);
    return v.toLocaleString("en-US", { maximumFractionDigits: 6 });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.weightValue")}</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.weightUnit")}</label>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
            {Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Object.entries(units).map(([u, mult]) => (
          <div key={u} className={`rounded-lg border px-4 py-3 ${u === fromUnit ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-slate-50"}`}>
            <div className="text-xs font-medium text-slate-500">{u}</div>
            <div className="mt-1 text-sm font-mono text-slate-800">{fmt(inKg / mult)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
