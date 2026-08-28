"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

const HOMOGLYPHS: Record<string, string> = {
  "а": "Cyrillic 'а' looks like Latin 'a'",
  "е": "Cyrillic 'е' looks like Latin 'e'",
  "о": "Cyrillic 'о' looks like Latin 'o'",
  "р": "Cyrillic 'р' looks like Latin 'p'",
  "с": "Cyrillic 'с' looks like Latin 'c'",
  "у": "Cyrillic 'у' looks like Latin 'y'",
  "х": "Cyrillic 'х' looks like Latin 'x'",
  "А": "Cyrillic 'А' looks like Latin 'A'",
  "В": "Cyrillic 'В' looks like Latin 'B'",
  "Е": "Cyrillic 'Е' looks like Latin 'E'",
  "К": "Cyrillic 'К' looks like Latin 'K'",
  "М": "Cyrillic 'М' looks like Latin 'M'",
  "Н": "Cyrillic 'Н' looks like Latin 'H'",
  "О": "Cyrillic 'О' looks like Latin 'O'",
  "Р": "Cyrillic 'Р' looks like Latin 'P'",
  "С": "Cyrillic 'С' looks like Latin 'C'",
  "Т": "Cyrillic 'Т' looks like Latin 'T'",
  "і": "Cyrillic 'і' looks like Latin 'i'",
  "ј": "Cyrillic 'ј' looks like Latin 'j'",
  "ѕ": "Cyrillic 'ѕ' looks like Latin 's'",
  "ɡ": "Latin 'ɡ' looks like 'g'",
  "ɪ": "IPA 'ɪ' looks like 'I'",
  "ν": "Greek 'ν' looks like Latin 'v'",
  "ο": "Greek 'ο' looks like Latin 'o'",
  "ρ": "Greek 'ρ' looks like Latin 'p'",
};

export function HomoglyphDetector() {
  const { t } = useTranslation();
  const [text, setText] = useState("");

  const detections: { char: string; index: number; description: string }[] = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]!;
    if (HOMOGLYPHS[ch]) {
      detections.push({ char: ch, index: i, description: HOMOGLYPHS[ch]! });
    }
  }

  const highlighted = text.split("").map((ch, i) => {
    if (HOMOGLYPHS[ch]) {
      return <mark key={i} className="rounded bg-red-200 px-0.5" title={HOMOGLYPHS[ch]}>{ch}</mark>;
    }
    return <span key={i}>{ch}</span>;
  });

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.homoglyphInput")}</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="example.com" className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      {text && (
        <div>
          <span className="text-sm font-medium text-slate-700">{t("common.homoglyphHighlighted")}</span>
          <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-4 text-lg font-mono text-slate-800">{highlighted}</div>
        </div>
      )}
      {detections.length > 0 ? (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.homoglyphDetected")} ({detections.length})</span>
          </div>
          <div className="space-y-2">
            {detections.map((d, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                <span className="text-lg font-bold text-red-600">{d.char}</span>
                <span className="text-slate-500">@ index {d.index}</span>
                <span className="text-slate-700">{d.description}</span>
              </div>
            ))}
          </div>
        </div>
      ) : text ? (
        <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{t("common.homoglyphClean")}</div>
      ) : null}
    </div>
  );
}
