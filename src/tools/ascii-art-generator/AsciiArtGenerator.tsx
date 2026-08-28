"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

const FONT_MAP: Record<string, Record<string, string[]>> = {
  Block: {
    A: ["  █████  ", " ██   ██ ", " ███████ ", " ██   ██ ", " ██   ██ "],
    B: [" ██████  ", " ██   ██ ", " ██████  ", " ██   ██ ", " ██████  "],
    C: ["  ██████ ", " ██      ", " ██      ", " ██      ", "  ██████ "],
    D: [" ██████  ", " ██   ██ ", " ██   ██ ", " ██   ██ ", " ██████  "],
    E: [" ███████ ", " ██      ", " █████   ", " ██      ", " ███████ "],
    F: [" ███████ ", " ██      ", " █████   ", " ██      ", " ██      "],
    G: ["  ██████ ", " ██      ", " ██  ███ ", " ██   ██ ", "  ██████ "],
    H: [" ██   ██ ", " ██   ██ ", " ███████ ", " ██   ██ ", " ██   ██ "],
    I: [" ███████ ", "    ██   ", "    ██   ", "    ██   ", " ███████ "],
    J: ["     ███ ", "      ██ ", " ██   ██ ", " ██   ██ ", "  █████  "],
    K: [" ██   ██ ", " ██  ██  ", " █████   ", " ██  ██  ", " ██   ██ "],
    L: [" ██      ", " ██      ", " ██      ", " ██      ", " ███████ "],
    M: [" ███    ███ ", " ████  ████ ", " ██ ████ ██ ", " ██  ██  ██ ", " ██      ██ "],
    N: [" ███    ██ ", " ████   ██ ", " ██ ██  ██ ", " ██  ██ ██ ", " ██   ████ "],
    O: ["  ██████  ", " ██    ██ ", " ██    ██ ", " ██    ██ ", "  ██████  "],
    P: [" ██████  ", " ██   ██ ", " ██████  ", " ██      ", " ██      "],
    Q: ["  ██████  ", " ██    ██ ", " ██    ██ ", " ██  ████ ", "  ██████  "],
    R: [" ██████  ", " ██   ██ ", " ██████  ", " ██  ██  ", " ██   ██ "],
    S: ["  ██████ ", " ██      ", "  █████  ", "      ██ ", " ██████  "],
    T: [" ███████ ", "    ██   ", "    ██   ", "    ██   ", "    ██   "],
    U: [" ██   ██ ", " ██   ██ ", " ██   ██ ", " ██   ██ ", "  █████  "],
    V: [" ██     ██ ", " ██     ██ ", " ██     ██ ", "  ██   ██  ", "   ████    "],
    W: [" ██  ██  ██ ", " ██  ██  ██ ", " ██  ██  ██ ", " ██  ██  ██ ", "  ███  ███  "],
    X: [" ██   ██ ", "  ██ ██  ", "   ███   ", "  ██ ██  ", " ██   ██ "],
    Y: [" ██    ██ ", "  ██  ██  ", "   ████   ", "    ██    ", "    ██    "],
    Z: [" ███████ ", "    ███  ", "   ██    ", "  ██     ", " ███████ "],
    "0": ["  █████  ", " ██  ██  ", " ██  ██  ", " ██  ██  ", "  █████  "],
    "1": ["   ██   ", "  ███   ", "   ██   ", "   ██   ", " ██████ "],
    "2": [" █████  ", "██   ██ ", "   ███  ", "  ██    ", "███████ "],
    "3": [" █████  ", "██   ██ ", "  ████  ", "██   ██ ", " █████  "],
    "4": ["██   ██ ", "██   ██ ", "███████ ", "     ██ ", "     ██ "],
    "5": ["███████ ", "██      ", "███████ ", "     ██ ", "███████ "],
    "6": [" █████  ", "██      ", "███████ ", "██   ██ ", " █████  "],
    "7": ["███████ ", "    ██  ", "   ██   ", "  ██    ", " ██     "],
    "8": [" █████  ", "██   ██ ", " █████  ", "██   ██ ", " █████  "],
    "9": [" █████  ", "██   ██ ", "███████ ", "     ██ ", " █████  "],
    " ": ["    ", "    ", "    ", "    ", "    "],
  },
};

export function AsciiArtGenerator() {
  const { t } = useTranslation();
  const [text, setText] = useState("HELLO");
  const [fontName, setFontName] = useState("Block");

  function generate(): string {
    const font = FONT_MAP[fontName]!;
    const upper = text.toUpperCase();
    const lines: string[] = ["", "", "", "", ""];
    for (const ch of upper) {
      const charMap = font[ch];
      if (charMap) {
        for (let i = 0; i < 5; i++) {
          lines[i]! += charMap[i]!;
        }
      }
    }
    return lines.join("\n");
  }

  const output = generate();

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.asciiInput")}</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} maxLength={20} className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.asciiFont")}</label>
        <select value={fontName} onChange={(e) => setFontName(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
          {Object.keys(FONT_MAP).map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      {output && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.asciiOutput")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-900 p-4 text-sm font-mono text-green-400">{output}</pre>
        </div>
      )}
    </div>
  );
}
