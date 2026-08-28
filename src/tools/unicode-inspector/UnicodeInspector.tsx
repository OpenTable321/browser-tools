"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function UnicodeInspector() {
  const { t } = useTranslation();
  const [text, setText] = useState("A");

  const chars = Array.from(text);

  const info = chars.map((ch) => {
    const code = ch.codePointAt(0) ?? 0;
    const hex = code.toString(16).toUpperCase().padStart(4, "0");
    return {
      char: ch,
      codePoint: `U+${hex}`,
      decimal: code,
      htmlEntity: `&#${code};`,
      hexEntity: `&#x${hex};`,
      utf8: Array.from(new TextEncoder().encode(ch)).map((b) => b.toString(16).padStart(2, "0").toUpperCase()).join(" "),
      utf16: Array.from(ch).map((c) => c.charCodeAt(0).toString(16).padStart(4, "0").toUpperCase()).join(" "),
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.unicodeInput")}</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      {info.length > 0 && (
        <div className="space-y-3">
          {info.map((c, i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-3xl font-bold text-slate-800">{c.char}</span>
                <span className="text-lg font-mono text-blue-600">{c.codePoint}</span>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <div className="flex items-center justify-between rounded border border-slate-200 bg-white px-3 py-1.5">
                  <span className="text-xs text-slate-500">Decimal</span>
                  <span className="font-mono text-slate-800">{c.decimal}</span>
                </div>
                <div className="flex items-center justify-between rounded border border-slate-200 bg-white px-3 py-1.5">
                  <span className="text-xs text-slate-500">HTML Entity</span>
                  <span className="font-mono text-slate-800">{c.htmlEntity}</span>
                </div>
                <div className="flex items-center justify-between rounded border border-slate-200 bg-white px-3 py-1.5">
                  <span className="text-xs text-slate-500">Hex Entity</span>
                  <span className="font-mono text-slate-800">{c.hexEntity}</span>
                </div>
                <div className="flex items-center justify-between rounded border border-slate-200 bg-white px-3 py-1.5">
                  <span className="text-xs text-slate-500">UTF-8</span>
                  <span className="font-mono text-slate-800">{c.utf8}</span>
                </div>
                <div className="flex items-center justify-between rounded border border-slate-200 bg-white px-3 py-1.5">
                  <span className="text-xs text-slate-500">UTF-16</span>
                  <span className="font-mono text-slate-800">{c.utf16}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
