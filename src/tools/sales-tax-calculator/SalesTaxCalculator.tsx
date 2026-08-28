"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function SalesTaxCalculator() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("100");
  const [rate, setRate] = useState("20");
  const [inclusive, setInclusive] = useState(false);

  const amt = parseFloat(amount) || 0;
  const r = (parseFloat(rate) || 0) / 100;

  let net: number, tax: number, gross: number;
  if (inclusive) {
    net = amt / (1 + r);
    tax = amt - net;
    gross = amt;
  } else {
    net = amt;
    tax = amt * r;
    gross = amt + tax;
  }

  const fmt = (v: number) => v.toLocaleString("en-US", { maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.taxAmount")}</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.taxRate")}</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setInclusive(false)} className={`rounded-lg px-4 py-2 text-sm font-medium ${!inclusive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.taxExclusive")}</button>
        <button onClick={() => setInclusive(true)} className={`rounded-lg px-4 py-2 text-sm font-medium ${inclusive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>{t("common.taxInclusive")}</button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="text-xs font-medium text-slate-500">{t("common.taxNet")}</div>
          <div className="mt-1 text-xl font-bold text-slate-800">{fmt(net)}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="text-xs font-medium text-slate-500">{t("common.taxTaxAmount")}</div>
          <div className="mt-1 text-xl font-bold text-slate-800">{fmt(tax)}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="text-xs font-medium text-slate-500">{t("common.taxGross")}</div>
          <div className="mt-1 text-xl font-bold text-slate-800">{fmt(gross)}</div>
        </div>
      </div>
    </div>
  );
}
