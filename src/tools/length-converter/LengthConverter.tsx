"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function LengthConverter() {
  const { t } = useTranslation();
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState("m");

  const units: Record<string, number> = {
    mm: 0.001, cm: 0.01, m: 1, km: 1000,
    in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344,
  };

  const inputVal = parseFloat(value) || 0;
  const inMeters = inputVal * units[fromUnit]!;

  const fmt = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 6 });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.lengthValue")}</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.lengthUnit")}</label>
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
            {Object.keys(units).map((u) => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Object.entries(units).map(([u, mult]) => (
          <div key={u} className={`rounded-lg border px-4 py-3 ${u === fromUnit ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-slate-50"}`}>
            <div className="text-xs font-medium text-slate-500">{u}</div>
            <div className="mt-1 text-sm font-mono text-slate-800">{fmt(inMeters / mult)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
