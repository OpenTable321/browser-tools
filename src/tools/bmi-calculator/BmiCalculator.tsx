"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

type UnitSystem = "metric" | "imperial";

function getBMICategory(bmi: number, t: (key: string) => string): { label: string; color: string; bg: string } {
  if (bmi < 18.5) return { label: t("common.underweight"), color: "text-blue-700", bg: "bg-blue-50" };
  if (bmi < 25) return { label: t("common.normalWeight"), color: "text-green-700", bg: "bg-green-50" };
  if (bmi < 30) return { label: t("common.overweight"), color: "text-amber-700", bg: "bg-amber-50" };
  return { label: t("common.obese"), color: "text-red-700", bg: "bg-red-50" };
}

export function BmiCalculator() {
  const { t } = useTranslation();
  const [system, setSystem] = useState<UnitSystem>("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calculate() {
    setError(null);
    setBmi(null);

    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w)) {
      setError(t("common.pleaseEnterValidHeightWeight"));
      return;
    }
    if (h <= 0 || w <= 0) {
      setError(t("common.heightWeightMustBePositive"));
      return;
    }

    let bmiValue: number;
    if (system === "metric") {
      const heightM = h / 100;
      bmiValue = w / (heightM * heightM);
    } else {
      bmiValue = (w / (h * h)) * 703;
    }

    setBmi(Math.round(bmiValue * 10) / 10);
  }

  const category = bmi !== null ? getBMICategory(bmi, t) : null;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">{t("common.unitSystem")}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setSystem("metric")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              system === "metric" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {t("common.metric")}
          </button>
          <button
            onClick={() => setSystem("imperial")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              system === "imperial" ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {t("common.imperial")}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="bmi-height" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.height")} ({system === "metric" ? "cm" : "inches"})
            </label>
            <input
              id="bmi-height"
              type="number"
              min={0}
              step="0.1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={system === "metric" ? "e.g. 175" : "e.g. 69"}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="bmi-weight" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.weight")} ({system === "metric" ? "kg" : "lbs"})
            </label>
            <input
              id="bmi-weight"
              type="number"
              min={0}
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={system === "metric" ? "e.g. 70" : "e.g. 154"}
              className="input-field"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={calculate} className="btn-primary">
            {t("common.calculateBmi")}
          </button>
          <button
            onClick={() => { setHeight(""); setWeight(""); setBmi(null); setError(null); }}
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

      {bmi !== null && category && (
        <div className="space-y-4">
          <div className={`rounded-lg border p-6 text-center ${category.bg} ${
            category.color.includes("blue") ? "border-blue-200" :
            category.color.includes("green") ? "border-green-200" :
            category.color.includes("amber") ? "border-amber-200" : "border-red-200"
          }`}>
            <p className="text-sm text-slate-600">{t("common.yourBmi")}</p>
            <p className={`mt-2 text-4xl font-bold ${category.color}`}>{bmi}</p>
            <p className={`mt-2 text-sm font-medium ${category.color}`}>{category.label}</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-sm font-semibold text-slate-700">{t("common.bmiCategories")}</h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              <li>{t("common.bmiUnderweight")}</li>
              <li>{t("common.bmiNormal")}</li>
              <li>{t("common.bmiOverweight")}</li>
              <li>{t("common.bmiObese")}</li>
            </ul>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>{t("common.disclaimer")}</strong> {t("common.bmiDisclaimer")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
