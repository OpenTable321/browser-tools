"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

interface StrengthResult {
  entropy: number;
  score: number;
  level: "very-weak" | "weak" | "fair" | "good" | "strong";
  crackTime: string;
  charsetSize: number;
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
    noCommon: boolean;
  };
}

const COMMON_PASSWORDS = new Set([
  "password", "123456", "12345678", "qwerty", "abc123", "monkey",
  "1234567", "letmein", "trustno1", "dragon", "baseball", "iloveyou",
  "master", "sunshine", "ashley", "bailey", "passw0rd", "shadow",
  "123123", "654321", "superman", "qazwsx", "michael", "football",
  "password1", "password123", "admin", "welcome", "hello", "freedom",
  "whatever", "qazwsxedc", "trustno1", "password!", "1234", "111111",
]);

function formatCrackTime(seconds: number): string {
  if (seconds < 1) return "instant";
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  const years = seconds / 31536000;
  if (years < 1000) return `${Math.round(years)} years`;
  if (years < 1e6) return `${Math.round(years / 1000)}K years`;
  if (years < 1e9) return `${Math.round(years / 1e6)}M years`;
  if (years < 1e12) return `${Math.round(years / 1e9)}B years`;
  return `${Math.round(years / 1e12)}T years`;
}

function evaluatePassword(password: string): StrengthResult {
  let charsetSize = 0;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  if (hasLower) charsetSize += 26;
  if (hasUpper) charsetSize += 26;
  if (hasNumber) charsetSize += 10;
  if (hasSymbol) charsetSize += 33;

  const entropy = password.length > 0 && charsetSize > 0
    ? password.length * Math.log2(charsetSize)
    : 0;

  const isCommon = COMMON_PASSWORDS.has(password.toLowerCase());

  const checks = {
    length: password.length >= 12,
    uppercase: hasUpper,
    lowercase: hasLower,
    numbers: hasNumber,
    symbols: hasSymbol,
    noCommon: password.length > 0 && !isCommon,
  };

  const passedChecks = Object.values(checks).filter(Boolean).length;

  let score: number;
  let level: StrengthResult["level"];

  if (entropy < 28 || isCommon) {
    score = 1;
    level = "very-weak";
  } else if (entropy < 36) {
    score = 2;
    level = "weak";
  } else if (entropy < 60) {
    score = 3;
    level = "fair";
  } else if (entropy < 128) {
    score = 4;
    level = "good";
  } else {
    score = 5;
    level = "strong";
  }

  const guessesPerSecond = 1e10;
  const totalCombinations = Math.pow(charsetSize || 1, password.length);
  const avgGuesses = totalCombinations / 2;
  const crackSeconds = avgGuesses / guessesPerSecond;
  const crackTime = formatCrackTime(crackSeconds);

  return { entropy, score, level, crackTime, charsetSize, checks };
}

const STRENGTH_COLORS: Record<StrengthResult["level"], string> = {
  "very-weak": "bg-red-500",
  "weak": "bg-orange-500",
  "fair": "bg-yellow-500",
  "good": "bg-lime-500",
  "strong": "bg-green-500",
};

export function PasswordStrengthMeter() {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const result = useMemo(() => {
    if (!password) return null;
    return evaluatePassword(password);
  }, [password]);

  const checkItems = [
    { key: "length", label: t("common.pwCheckLength") },
    { key: "uppercase", label: t("common.pwCheckUppercase") },
    { key: "lowercase", label: t("common.pwCheckLowercase") },
    { key: "numbers", label: t("common.pwCheckNumbers") },
    { key: "symbols", label: t("common.pwCheckSymbols") },
    { key: "noCommon", label: t("common.pwCheckNoCommon") },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="pw-input"
          className="mb-2 block text-sm font-medium text-slate-600"
        >
          {t("common.enterPassword")}
        </label>
        <div className="relative">
          <input
            id="pw-input"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("common.passwordPlaceholder")}
            className="input-field pr-12 font-mono text-sm"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-600"
          >
            {showPassword ? t("common.hide") : t("common.show")}
          </button>
        </div>
      </div>

      {result && (
        <>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                {t("common.strengthLevel")}
              </span>
              <span className="text-sm font-bold text-slate-800">
                {t(`common.pwLevel_${result.level}`)}
              </span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition ${
                    i <= result.score
                      ? STRENGTH_COLORS[result.level]
                      : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-500">{t("common.entropy")}</p>
              <p className="text-lg font-bold text-slate-800">
                {Math.round(result.entropy)} <span className="text-xs font-normal text-slate-400">bits</span>
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-500">{t("common.charsetSize")}</p>
              <p className="text-lg font-bold text-slate-800">
                {result.charsetSize} <span className="text-xs font-normal text-slate-400">chars</span>
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-500">{t("common.estimatedCrackTime")}</p>
              <p className="text-lg font-bold text-slate-800">
                {result.crackTime}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-700">
              {t("common.securityChecklist")}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {checkItems.map((item) => {
                const passed = result.checks[item.key];
                return (
                  <div
                    key={item.key}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                      passed
                        ? "border border-green-200 bg-green-50 text-green-800"
                        : "border border-slate-200 bg-slate-50 text-slate-500"
                    }`}
                  >
                    <span className="text-base">{passed ? "✓" : "○"}</span>
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`rounded-lg border px-4 py-3 text-sm ${
              result.level === "strong" || result.level === "good"
                ? "border-green-200 bg-green-50 text-green-800"
                : result.level === "fair"
                ? "border-yellow-200 bg-yellow-50 text-yellow-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {t(`common.pwReport_${result.level}`)}
          </div>
        </>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => setPassword("")}
          disabled={!password}
          className="btn-secondary"
        >
          {t("common.clear")}
        </button>
      </div>

      <p className="text-center text-xs text-slate-400">
        {t("common.pwPrivacyNote")}
      </p>
    </div>
  );
}
