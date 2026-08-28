"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function LoanCalculator() {
  const { t } = useTranslation();
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("10");

  const p = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseInt(years) || 0) * 12;

  const monthly = r > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / n;
  const total = monthly * n;
  const interest = total - p;

  const fmt = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.loanPrincipal")}</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.loanRate")}</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.loanYears")}</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="text-xs font-medium text-slate-500">{t("common.loanMonthly")}</div>
          <div className="mt-1 text-xl font-bold text-slate-800">{fmt(monthly)}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="text-xs font-medium text-slate-500">{t("common.loanTotalInterest")}</div>
          <div className="mt-1 text-xl font-bold text-slate-800">{fmt(interest)}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="text-xs font-medium text-slate-500">{t("common.loanTotal")}</div>
          <div className="mt-1 text-xl font-bold text-slate-800">{fmt(total)}</div>
        </div>
      </div>
    </div>
  );
}
