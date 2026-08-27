"use client";

import { useState, useCallback } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

function secureRandomFloat(): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return (array[0] ?? 0) / 0x100000000;
}

function generateNumber(min: number, max: number, isInteger: boolean): number {
  if (min > max) {
    [min, max] = [max, min];
  }
  if (isInteger) {
    const range = max - min + 1;
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return Math.floor((array[0] ?? 0) / 0x100000000 * range) + min;
  }
  return secureRandomFloat() * (max - min) + min;
}

export function RandomNumberGenerator() {
  const { t } = useTranslation();
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [isInteger, setIsInteger] = useState(true);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(() => {
    setError(null);

    const minNum = parseFloat(min);
    const maxNum = parseFloat(max);

    if (isNaN(minNum) || isNaN(maxNum)) {
      setError(t("common.pleaseEnterValidNumbers"));
      return;
    }

    if (minNum === maxNum) {
      setError(t("common.minMaxMustDiffer"));
      return;
    }

    if (!allowDuplicates && isInteger) {
      const range = Math.abs(maxNum - minNum) + 1;
      if (count > range) {
        setError(t("common.cannotGenerateUnique", { count, range }));
        return;
      }
    }

    const nums: number[] = [];
    if (!allowDuplicates && isInteger) {
      const available: number[] = [];
      const lo = Math.min(minNum, maxNum);
      const hi = Math.max(minNum, maxNum);
      for (let i = lo; i <= hi; i++) available.push(i);
      for (let i = available.length - 1; i > 0; i--) {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const j = (array[0] ?? 0) % (i + 1);
        [available[i], available[j]] = [available[j]!, available[i]!];
      }
      for (let i = 0; i < count; i++) nums.push(available[i]!);
    } else {
      for (let i = 0; i < count; i++) {
        nums.push(generateNumber(minNum, maxNum, isInteger));
      }
    }
    setResults(nums);
  }, [min, max, isInteger, count, allowDuplicates]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">{t("common.settings")}</h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="rng-min" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.minimum")}
            </label>
            <input
              id="rng-min"
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="rng-max" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.maximum")}
            </label>
            <input
              id="rng-max"
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="rng-count" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.quantity")}: <span className="font-bold text-brand-600">{count}</span>
            </label>
            <input
              id="rng-count"
              type="range"
              min={1}
              max={100}
              step={1}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">{t("common.numberType")}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setIsInteger(true)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isInteger ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t("common.integer")}
              </button>
              <button
                onClick={() => setIsInteger(false)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  !isInteger ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {t("common.decimal")}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-brand-600"
            />
            {t("common.allowDuplicates")}
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={generate} className="btn-primary">
            {t("common.generate")}
          </button>
          {results.length > 0 && (
            <CopyButton text={results.join(", ")} label={t("common.numbers")} />
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {results.map((num, i) => (
              <div key={i} className="rounded-lg bg-slate-100 p-4 text-center">
                <p className="text-lg font-bold text-slate-900">
                  {isInteger ? num : num.toFixed(4)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
