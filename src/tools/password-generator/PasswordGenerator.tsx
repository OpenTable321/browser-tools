"use client";

import { useState, useEffect, useCallback } from "react";
import { CopyButton } from "@/components/CopyButton";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const AMBIGUOUS = "Il1O0o";

function secureRandomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return (array[0] ?? 0) % max;
}

function generatePassword(
  length: number,
  useUpper: boolean,
  useLower: boolean,
  useNumbers: boolean,
  useSymbols: boolean,
  excludeAmbiguous: boolean,
): string {
  let charset = "";
  if (useUpper) charset += UPPER;
  if (useLower) charset += LOWER;
  if (useNumbers) charset += NUMBERS;
  if (useSymbols) charset += SYMBOLS;

  if (excludeAmbiguous) {
    charset = charset.split("").filter((c) => !AMBIGUOUS.includes(c)).join("");
  }

  if (!charset) return "";

  const chars: string[] = [];
  for (let i = 0; i < length; i++) {
    chars.push(charset[secureRandomInt(charset.length)]!);
  }
  return chars.join("");
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    setPassword(
      generatePassword(length, useUpper, useLower, useNumbers, useSymbols, excludeAmbiguous),
    );
  }, [length, useUpper, useLower, useNumbers, useSymbols, excludeAmbiguous]);

  useEffect(() => {
    generate();
  }, [generate]);

  const strength = (() => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (useUpper && useLower) score++;
    if (useNumbers) score++;
    if (useSymbols) score++;
    if (score <= 2) return { label: "Weak", color: "text-red-600", bg: "bg-red-50" };
    if (score <= 3) return { label: "Fair", color: "text-amber-600", bg: "bg-amber-50" };
    if (score <= 4) return { label: "Good", color: "text-blue-600", bg: "bg-blue-50" };
    return { label: "Strong", color: "text-green-600", bg: "bg-green-50" };
  })();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <code className="flex-1 break-all rounded-lg bg-slate-50 px-4 py-3 font-mono text-sm text-slate-900 sm:text-base">
            {password || "—"}
          </code>
          <span className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium ${strength.bg} ${strength.color}`}>
            {strength.label}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={generate} className="btn-primary">
            Regenerate
          </button>
          {password && <CopyButton text={password} label="Password" />}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Settings</h3>

        <div>
          <label htmlFor="pw-length" className="mb-2 block text-sm font-medium text-slate-600">
            Length: <span className="font-bold text-brand-600">{length}</span>
          </label>
          <input
            id="pw-length"
            type="range"
            min={4}
            max={64}
            step={1}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-brand-600"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-brand-600" />
            Uppercase (A–Z)
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-brand-600" />
            Lowercase (a–z)
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-brand-600" />
            Numbers (0–9)
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-brand-600" />
            Symbols (!@#$…)
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={excludeAmbiguous} onChange={(e) => setExcludeAmbiguous(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-brand-600" />
            Exclude ambiguous (Il1O0o)
          </label>
        </div>

        {!useUpper && !useLower && !useNumbers && !useSymbols && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Select at least one character type.
          </div>
        )}
      </div>
    </div>
  );
}
