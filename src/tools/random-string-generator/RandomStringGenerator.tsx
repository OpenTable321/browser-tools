"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function RandomStringGenerator() {
  const { t } = useTranslation();
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(5);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecial, setUseSpecial] = useState(false);
  const [noDuplicates, setNoDuplicates] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  function generate() {
    let charset = "";
    if (useLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useNumbers) charset += "0123456789";
    if (useSpecial) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (charset === "") charset = "abcdefghijklmnopqrstuvwxyz";

    const chars = charset.split("");
    const output: string[] = [];
    for (let i = 0; i < count; i++) {
      let str = "";
      const available = [...chars];
      for (let j = 0; j < length; j++) {
        if (noDuplicates && available.length === 0) break;
        const idx = Math.floor(Math.random() * available.length);
        str += available[idx];
        if (noDuplicates) available.splice(idx, 1);
      }
      output.push(str);
    }
    setResults(output);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.randomStringLength")}: {length}</label>
          <input type="range" min={1} max={64} value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.randomStringCount")}: {count}</label>
          <input type="range" min={1} max={50} value={count} onChange={(e) => setCount(parseInt(e.target.value))} className="w-full" />
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} className="rounded" /> A-Z
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} className="rounded" /> a-z
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} className="rounded" /> 0-9
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={useSpecial} onChange={(e) => setUseSpecial(e.target.checked)} className="rounded" /> {t("common.randomStringSpecial")}
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={noDuplicates} onChange={(e) => setNoDuplicates(e.target.checked)} className="rounded" /> {t("common.randomStringNoDup")}
        </label>
      </div>
      <button onClick={generate} className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700">
        {t("common.randomStringGenerate")}
      </button>
      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-2">
              <span className="font-mono text-sm text-slate-800">{r}</span>
              <CopyButton text={r} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
