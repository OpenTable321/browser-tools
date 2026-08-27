"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

type Category = "length" | "weight" | "temperature" | "area" | "volume" | "speed" | "time";

interface Unit {
  name: string;
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const UNITS: Record<Category, Unit[]> = {
  length: [
    { name: "mm", label: "Millimeter", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: "cm", label: "Centimeter", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    { name: "m", label: "Meter", toBase: (v) => v, fromBase: (v) => v },
    { name: "km", label: "Kilometer", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { name: "in", label: "Inch", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    { name: "ft", label: "Foot", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { name: "yd", label: "Yard", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    { name: "mi", label: "Mile", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    { name: "nmi", label: "Nautical Mile", toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
  ],
  weight: [
    { name: "mg", label: "Milligram", toBase: (v) => v / 1_000_000, fromBase: (v) => v * 1_000_000 },
    { name: "g", label: "Gram", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: "kg", label: "Kilogram", toBase: (v) => v, fromBase: (v) => v },
    { name: "t", label: "Tonne", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { name: "oz", label: "Ounce", toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
    { name: "lb", label: "Pound", toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
    { name: "st", label: "Stone", toBase: (v) => v * 6.35029318, fromBase: (v) => v / 6.35029318 },
  ],
  temperature: [
    { name: "C", label: "Celsius", toBase: (v) => v, fromBase: (v) => v },
    { name: "F", label: "Fahrenheit", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
    { name: "K", label: "Kelvin", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
  area: [
    { name: "mm2", label: "Square Millimeter", toBase: (v) => v / 1_000_000, fromBase: (v) => v * 1_000_000 },
    { name: "cm2", label: "Square Centimeter", toBase: (v) => v / 10_000, fromBase: (v) => v * 10_000 },
    { name: "m2", label: "Square Meter", toBase: (v) => v, fromBase: (v) => v },
    { name: "km2", label: "Square Kilometer", toBase: (v) => v * 1_000_000, fromBase: (v) => v / 1_000_000 },
    { name: "ha", label: "Hectare", toBase: (v) => v * 10_000, fromBase: (v) => v / 10_000 },
    { name: "acre", label: "Acre", toBase: (v) => v * 4046.8564224, fromBase: (v) => v / 4046.8564224 },
    { name: "ft2", label: "Square Foot", toBase: (v) => v * 0.09290304, fromBase: (v) => v / 0.09290304 },
    { name: "in2", label: "Square Inch", toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
  ],
  volume: [
    { name: "ml", label: "Milliliter", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: "l", label: "Liter", toBase: (v) => v, fromBase: (v) => v },
    { name: "m3", label: "Cubic Meter", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { name: "tsp", label: "Teaspoon (US)", toBase: (v) => v * 0.00492892, fromBase: (v) => v / 0.00492892 },
    { name: "tbsp", label: "Tablespoon (US)", toBase: (v) => v * 0.01478676, fromBase: (v) => v / 0.01478676 },
    { name: "floz", label: "Fluid Ounce (US)", toBase: (v) => v * 0.02957353, fromBase: (v) => v / 0.02957353 },
    { name: "cup", label: "Cup (US)", toBase: (v) => v * 0.23658824, fromBase: (v) => v / 0.23658824 },
    { name: "pt", label: "Pint (US)", toBase: (v) => v * 0.47317647, fromBase: (v) => v / 0.47317647 },
    { name: "qt", label: "Quart (US)", toBase: (v) => v * 0.94635295, fromBase: (v) => v / 0.94635295 },
    { name: "gal", label: "Gallon (US)", toBase: (v) => v * 3.78541178, fromBase: (v) => v / 3.78541178 },
  ],
  speed: [
    { name: "mps", label: "Meter/second", toBase: (v) => v, fromBase: (v) => v },
    { name: "kmh", label: "Kilometer/hour", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    { name: "mph", label: "Mile/hour", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
    { name: "fps", label: "Foot/second", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { name: "knot", label: "Knot", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
  ],
  time: [
    { name: "ms", label: "Millisecond", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: "s", label: "Second", toBase: (v) => v, fromBase: (v) => v },
    { name: "min", label: "Minute", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
    { name: "h", label: "Hour", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
    { name: "d", label: "Day", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
    { name: "wk", label: "Week", toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
    { name: "mo", label: "Month (30d)", toBase: (v) => v * 2592000, fromBase: (v) => v / 2592000 },
    { name: "yr", label: "Year (365d)", toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
  ],
};

const CATEGORY_LABELS: Record<Category, string> = {
  length: "Length",
  weight: "Weight",
  temperature: "Temperature",
  area: "Area",
  volume: "Volume",
  speed: "Speed",
  time: "Time",
};

export function UnitConverter() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState(0);
  const [toUnit, setToUnit] = useState(1);
  const [inputValue, setInputValue] = useState("1");
  const [error, setError] = useState<string | null>(null);

  const units = UNITS[category];

  const result = useMemo(() => {
    setError(null);
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      if (inputValue.trim()) {
        setError(t("common.pleaseEnterValidNumber"));
      }
      return null;
    }

    const from = units[fromUnit];
    const to = units[toUnit];
    if (!from || !to) return null;

    const baseValue = from.toBase(val);
    return to.fromBase(baseValue);
  }, [inputValue, fromUnit, toUnit, units]);

  function handleCategoryChange(cat: Category) {
    setCategory(cat);
    setFromUnit(0);
    setToUnit(1);
    setError(null);
  }

  function swap() {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">{t("common.category")}</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(UNITS) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                category === cat
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat === "length" ? t("common.unitLength") : cat === "weight" ? t("common.unitWeight") : cat === "temperature" ? t("common.unitTemperature") : cat === "area" ? t("common.unitArea") : cat === "volume" ? t("common.unitVolume") : cat === "speed" ? t("common.unitSpeed") : t("common.unitTime")}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="uc-from" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.fromUnit")}
            </label>
            <select
              id="uc-from"
              value={fromUnit}
              onChange={(e) => setFromUnit(Number(e.target.value))}
              className="input-field mb-3"
            >
              {units.map((u, i) => (
                <option key={u.name} value={i}>
                  {u.label} ({u.name})
                </option>
              ))}
            </select>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t("common.enterValue")}
              className="input-field"
              aria-label={t("common.swapUnits")}
            />
          </div>

          <div>
            <label htmlFor="uc-to" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.toUnit")}
            </label>
            <select
              id="uc-to"
              value={toUnit}
              onChange={(e) => setToUnit(Number(e.target.value))}
              className="input-field mb-3"
            >
              {units.map((u, i) => (
                <option key={u.name} value={i}>
                  {u.label} ({u.name})
                </option>
              ))}
            </select>
            <div className="input-field flex items-center bg-slate-50 font-mono text-sm text-slate-900">
              {result !== null ? result.toLocaleString("en-US", { maximumFractionDigits: 10 }) : "—"}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={swap}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            aria-label={t("common.swapUnits")}
          >
            {t("common.swap")}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {result !== null && !error && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-4 text-center">
          <p className="text-lg font-bold text-green-700">
            {parseFloat(inputValue)} {units[fromUnit]?.name} = {result.toLocaleString("en-US", { maximumFractionDigits: 10 })} {units[toUnit]?.name}
          </p>
        </div>
      )}
    </div>
  );
}
