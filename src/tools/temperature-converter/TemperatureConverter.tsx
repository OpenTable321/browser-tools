"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function TemperatureConverter() {
  const { t } = useTranslation();
  const [celsius, setCelsius] = useState(0);

  const f = celsius * 9 / 5 + 32;
  const k = celsius + 273.15;

  const fmt = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 4 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Celsius (°C)</label>
          <input type="number" value={fmt(celsius)} onChange={(e) => setCelsius(parseFloat(e.target.value) || 0)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Fahrenheit (°F)</label>
          <input type="number" value={fmt(f)} onChange={(e) => setCelsius(((parseFloat(e.target.value) || 0) - 32) * 5 / 9)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Kelvin (K)</label>
          <input type="number" value={fmt(k)} onChange={(e) => setCelsius((parseFloat(e.target.value) || 0) - 273.15)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        {t("common.tempHint")}
      </div>
    </div>
  );
}
