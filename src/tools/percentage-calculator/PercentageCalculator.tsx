"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

type CalcMode = "percentOf" | "isWhatPercent" | "percentChange" | "percentDifference";

export function PercentageCalculator() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<CalcMode>("percentOf");
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calculate() {
    setError(null);
    setResult(null);

    const a = parseFloat(val1);
    const b = parseFloat(val2);

    if (isNaN(a) || isNaN(b)) {
      setError(t("common.pleaseEnterValidNumbersBoth"));
      return;
    }

    switch (mode) {
      case "percentOf": {
        const answer = (a / 100) * b;
        setResult(`${a}% of ${b} = ${answer}`);
        break;
      }
      case "isWhatPercent": {
        if (b === 0) {
          setError(t("common.secondValueCannotBeZero"));
          return;
        }
        const pct = (a / b) * 100;
        setResult(`${a} is ${pct.toFixed(2)}% of ${b}`);
        break;
      }
      case "percentChange": {
        if (b === 0) {
          setError(t("common.originalValueCannotBeZero"));
          return;
        }
        const change = ((a - b) / Math.abs(b)) * 100;
        const direction = change >= 0 ? "increase" : "decrease";
        setResult(`From ${b} to ${a}: ${Math.abs(change).toFixed(2)}% ${direction}`);
        break;
      }
      case "percentDifference": {
        if (a === 0 && b === 0) {
          setError(t("common.bothValuesCannotBeZero"));
          return;
        }
        const avg = (a + b) / 2;
        if (avg === 0) {
          setError(t("common.averageCannotBeZero"));
          return;
        }
        const diff = (Math.abs(a - b) / Math.abs(avg)) * 100;
        setResult(`Percentage difference between ${a} and ${b} = ${diff.toFixed(2)}%`);
        break;
      }
    }
  }

  const labels: Record<CalcMode, [string, string]> = {
    percentOf: [t("common.percentageX"), t("common.valueY")],
    isWhatPercent: [t("common.valueX"), t("common.totalY")],
    percentChange: [t("common.newValue"), t("common.originalValue")],
    percentDifference: [t("common.value1"), t("common.value2")],
  };

  const MODES: { mode: CalcMode; label: string }[] = [
    { mode: "percentOf", label: "X% of Y" },
    { mode: "isWhatPercent", label: "X is what % of Y" },
    { mode: "percentChange", label: "% ↑/↓" },
    { mode: "percentDifference", label: "% Δ" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">{t("common.calculationType")}</h3>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.mode}
              onClick={() => { setMode(m.mode); setResult(null); setError(null); }}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                mode === m.mode ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="pct-val1" className="mb-2 block text-sm font-medium text-slate-600">
              {labels[mode][0]}
            </label>
            <input
              id="pct-val1"
              type="number"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="pct-val2" className="mb-2 block text-sm font-medium text-slate-600">
              {labels[mode][1]}
            </label>
            <input
              id="pct-val2"
              type="number"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={calculate} className="btn-primary">
            {t("common.calculate")}
          </button>
          <button
            onClick={() => { setVal1(""); setVal2(""); setResult(null); setError(null); }}
            className="btn-secondary"
          >
            {t("common.clear")}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-4 text-center">
          <p className="text-lg font-bold text-green-700">{result}</p>
        </div>
      )}
    </div>
  );
}
