"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

type CalcMode = "addSubtract" | "difference";

export function DateCalculator() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<CalcMode>("addSubtract");

  const [startDate, setStartDate] = useState("");
  const [daysToAdd, setDaysToAdd] = useState("");
  const [addResult, setAddResult] = useState<string | null>(null);

  const [endDate, setEndDate] = useState("");
  const [diffResult, setDiffResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  function calculateAddSubtract() {
    setError(null);
    setAddResult(null);

    if (!startDate) {
      setError(t("common.pleaseSelectStartDate"));
      return;
    }

    const start = new Date(startDate);
    if (isNaN(start.getTime())) {
      setError(t("common.invalidStartDate"));
      return;
    }

    const days = parseInt(daysToAdd, 10);
    if (isNaN(days)) {
      setError(t("common.pleaseEnterValidDays"));
      return;
    }

    const result = new Date(start);
    result.setDate(result.getDate() + days);

    setAddResult(
      result.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }

  function calculateDifference() {
    setError(null);
    setDiffResult(null);

    if (!startDate || !endDate) {
      setError(t("common.pleaseSelectBothDates"));
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError(t("common.invalidDates"));
      return;
    }

    let s = start;
    let e = end;
    if (s > e) {
      [s, e] = [e, s];
    }

    const totalDays = Math.floor(
      (e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24),
    );
    const totalWeeks = Math.floor(totalDays / 7);

    let years = e.getFullYear() - s.getFullYear();
    let months = e.getMonth() - s.getMonth();
    let days = e.getDate() - s.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(e.getFullYear(), e.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setDiffResult({ days: totalDays, weeks: totalWeeks, months: years * 12 + months, years });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">{t("common.calculationMode")}</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setMode("addSubtract"); setError(null); setAddResult(null); setDiffResult(null); }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              mode === "addSubtract" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {t("common.addSubtractDays")}
          </button>
          <button
            onClick={() => { setMode("difference"); setError(null); setAddResult(null); setDiffResult(null); }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              mode === "difference" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {t("common.differenceBetweenDates")}
          </button>
        </div>
      </div>

      {mode === "addSubtract" && (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="date-start" className="mb-2 block text-sm font-medium text-slate-600">
                {t("common.startDate")}
              </label>
              <input
                id="date-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="date-days" className="mb-2 block text-sm font-medium text-slate-600">
                {t("common.daysToAddSubtract")}
              </label>
              <input
                id="date-days"
                type="number"
                value={daysToAdd}
                onChange={(e) => setDaysToAdd(e.target.value)}
                placeholder="e.g. 30 or -7"
                className="input-field"
              />
              <p className="mt-1 text-xs text-slate-400">
                {t("common.useNegativeToSubtract")}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={calculateAddSubtract} className="btn-primary">
              {t("common.calculate")}
            </button>
            <button
              onClick={() => { setStartDate(""); setDaysToAdd(""); setAddResult(null); setError(null); }}
              className="btn-secondary"
            >
              {t("common.clear")}
            </button>
          </div>
        </div>
      )}

      {mode === "difference" && (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="date-diff-start" className="mb-2 block text-sm font-medium text-slate-600">
                {t("common.startDate")}
              </label>
              <input
                id="date-diff-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="date-diff-end" className="mb-2 block text-sm font-medium text-slate-600">
                {t("common.endDate")}
              </label>
              <input
                id="date-diff-end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={calculateDifference} className="btn-primary">
              {t("common.calculateDifference")}
            </button>
            <button
              onClick={() => { setStartDate(""); setEndDate(""); setDiffResult(null); setError(null); }}
              className="btn-secondary"
            >
              {t("common.clear")}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {addResult && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-4 text-center">
          <p className="text-sm text-green-600">{t("common.resultDate")}</p>
          <p className="mt-1 text-xl font-bold text-green-700">{addResult}</p>
        </div>
      )}

      {diffResult && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-slate-100 p-4 text-center">
            <p className="text-xs text-slate-500">{t("common.days")}</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{diffResult.days}</p>
          </div>
          <div className="rounded-lg bg-slate-100 p-4 text-center">
            <p className="text-xs text-slate-500">{t("common.weeks")}</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{diffResult.weeks}</p>
          </div>
          <div className="rounded-lg bg-slate-100 p-4 text-center">
            <p className="text-xs text-slate-500">{t("common.months")}</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{diffResult.months}</p>
          </div>
          <div className="rounded-lg bg-slate-100 p-4 text-center">
            <p className="text-xs text-slate-500">{t("common.years")}</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{diffResult.years}</p>
          </div>
        </div>
      )}
    </div>
  );
}
