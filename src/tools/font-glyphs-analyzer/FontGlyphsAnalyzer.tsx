"use client";

import { useState, useRef } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";
import * as opentype from "opentype.js";

interface FontInfo {
  glyphCount: number;
  fontFamily: string;
  unitsPerEm: number;
  ascender: number;
  descender: number;
  scripts: string[];
  sampleGlyphs: string[];
}

export function FontGlyphsAnalyzer() {
  const { t } = useTranslation();
  const [fontInfo, setFontInfo] = useState<FontInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  function analyzeFont(file: File) {
    setError(null);
    setFontInfo(null);
    setFileName(file.name);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!(result instanceof ArrayBuffer)) {
        setError(t("common.fontReadError"));
        setLoading(false);
        return;
      }

      try {
        const font = opentype.parse(result);
        const glyphCount = font.glyphs.length;
        const fontFamily = font.names.fontFamily?.en ?? font.names.fullName?.en ?? "Unknown";
        const unitsPerEm = font.unitsPerEm;
        const ascender = font.ascender;
        const descender = font.descender;

        const scripts: string[] = [];
        const sampleGlyphs: string[] = [];
        const testRanges: { name: string; start: number; end: number }[] = [
          { name: "Latin", start: 0x0020, end: 0x007F },
          { name: "Cyrillic", start: 0x0400, end: 0x04FF },
          { name: "Greek", start: 0x0370, end: 0x03FF },
          { name: "Arabic", start: 0x0600, end: 0x06FF },
          { name: "Hebrew", start: 0x0590, end: 0x05FF },
          { name: "CJK", start: 0x4E00, end: 0x4E20 },
        ];

        for (const range of testRanges) {
          let found = 0;
          for (let cp = range.start; cp <= range.end; cp++) {
            const glyph = font.charToGlyph(String.fromCharCode(cp));
            if (glyph && glyph.index > 0) {
              found++;
              if (sampleGlyphs.length < 48 && found <= 8) {
                sampleGlyphs.push(String.fromCharCode(cp));
              }
            }
          }
          if (found > 0) scripts.push(range.name);
        }

        for (let i = 0; i < Math.min(48, glyphCount); i++) {
          const glyph = font.glyphs.get(i);
          if (glyph && glyph.unicode !== undefined) {
            sampleGlyphs.push(String.fromCharCode(glyph.unicode));
          }
        }

        setFontInfo({
          glyphCount,
          fontFamily,
          unitsPerEm,
          ascender,
          descender,
          scripts,
          sampleGlyphs: [...new Set(sampleGlyphs)].slice(0, 64),
        });
      } catch {
        setError(t("common.fontParseError"));
      }
      setLoading(false);
    };
    reader.onerror = () => {
      setError(t("common.fontReadError"));
      setLoading(false);
    };
    reader.readAsArrayBuffer(file);
  }

  const infoRows = fontInfo ? [
    { label: t("common.fontFamily"), value: fontInfo.fontFamily },
    { label: t("common.fontGlyphs"), value: String(fontInfo.glyphCount) },
    { label: t("common.fontUnitsPerEm"), value: String(fontInfo.unitsPerEm) },
    { label: t("common.fontAscender"), value: String(fontInfo.ascender) },
    { label: t("common.fontDescender"), value: String(fontInfo.descender) },
    { label: t("common.fontScripts"), value: fontInfo.scripts.join(", ") || "—" },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <input
          type="file"
          accept=".ttf,.otf,.woff,.woff2"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) analyzeFont(f); }}
          className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
        />
      </div>

      {fileName && (
        <div className="text-sm text-slate-500">{t("common.fontFile")}: <span className="font-mono text-slate-700">{fileName}</span></div>
      )}

      {loading && (
        <div className="text-sm text-slate-500">{t("common.fontAnalyzing")}</div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {fontInfo && (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {infoRows.map((row) => (
              <div key={row.label} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-xs font-medium text-slate-500">{row.label}</div>
                <div className="mt-1 text-sm font-medium text-slate-800">{row.value}</div>
              </div>
            ))}
          </div>

          <div>
            <span className="mb-2 block text-sm font-medium text-slate-700">{t("common.fontGlyphGrid")}</span>
            <div className="grid grid-cols-8 gap-1 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-12">
              {fontInfo.sampleGlyphs.map((ch, i) => (
                <div
                  key={i}
                  className="flex h-10 items-center justify-center rounded border border-slate-200 bg-white text-lg text-slate-700"
                  style={{ fontFamily: fontInfo.fontFamily }}
                >
                  {ch}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
