"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function DiscountCalculator() {
  const { t } = useTranslation();
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [result, setResult] = useState<{
    finalPrice: number;
    savings: number;
    originalPrice: number;
    discountPercent: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function calculate() {
    setError(null);
    setResult(null);

    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (isNaN(price)) {
      setError(t("common.pleaseEnterValidOriginalPrice"));
      return;
    }
    if (isNaN(discount)) {
      setError(t("common.pleaseEnterValidDiscount"));
      return;
    }
    if (price < 0) {
      setError(t("common.originalPriceCannotBeNegative"));
      return;
    }
    if (discount < 0 || discount > 100) {
      setError(t("common.discountMustBeBetween0And100"));
      return;
    }

    const savings = (price * discount) / 100;
    const finalPrice = price - savings;

    setResult({
      finalPrice,
      savings,
      originalPrice: price,
      discountPercent: discount,
    });
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Discount Calculator</h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="discount-price" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.originalPrice")}
            </label>
            <input
              id="discount-price"
              type="number"
              min={0}
              step="0.01"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="e.g. 99.99"
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="discount-percent" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.discountPercent")}
            </label>
            <input
              id="discount-percent"
              type="number"
              min={0}
              max={100}
              step="0.01"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              placeholder="e.g. 20"
              className="input-field"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={calculate} className="btn-primary">
            {t("common.calculate")}
          </button>
          <button
            onClick={() => {
              setOriginalPrice("");
              setDiscountPercent("");
              setResult(null);
              setError(null);
            }}
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-100 p-6 text-center">
            <p className="text-xs text-slate-500">{t("common.originalPrice")}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {result.originalPrice.toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-6 text-center">
            <p className="text-xs text-green-600">{t("common.youSave")}</p>
            <p className="mt-1 text-2xl font-bold text-green-700">
              {result.savings.toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-green-600">
              {result.discountPercent}{t("common.offLabel")}
            </p>
          </div>
          <div className="rounded-lg bg-brand-50 p-6 text-center">
            <p className="text-xs text-brand-600">{t("common.finalPrice")}</p>
            <p className="mt-1 text-2xl font-bold text-brand-700">
              {result.finalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
