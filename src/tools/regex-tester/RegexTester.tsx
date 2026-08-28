"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

interface MatchSegment {
  text: string;
  isMatch: boolean;
  matchIndex: number;
}

interface MatchInfo {
  match: string;
  index: number;
  groups: string[];
}

export function RegexTester() {
  const { t } = useTranslation();
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({
    g: true,
    i: false,
    m: false,
    s: false,
    u: false,
    y: false,
  });

  const flagString = useMemo(() => {
    return Object.entries(flags)
      .filter(([_, enabled]) => enabled)
      .map(([f]) => f)
      .join("");
  }, [flags]);

  const { error, matches, segments, groupCount } = useMemo(() => {
    if (!pattern) {
      return { error: null, matches: [] as MatchInfo[], segments: [] as MatchSegment[], groupCount: 0 };
    }

    let regex: RegExp;
    try {
      regex = new RegExp(pattern, flagString);
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : t("common.regexInvalid"),
        matches: [] as MatchInfo[],
        segments: [] as MatchSegment[],
        groupCount: 0,
      };
    }

    const groupCount = (pattern.match(/\(/g) || []).length;

    if (!testString) {
      return { error: null, matches: [] as MatchInfo[], segments: [] as MatchSegment[], groupCount };
    }

    const allMatches: MatchInfo[] = [];
    const matchSegments: MatchSegment[] = [];

    if (flags.g) {
      let m: RegExpExecArray | null;
      let lastIndex = 0;
      let matchIdx = 0;
      while ((m = regex.exec(testString)) !== null) {
        if (m.index > lastIndex) {
          matchSegments.push({
            text: testString.slice(lastIndex, m.index),
            isMatch: false,
            matchIndex: -1,
          });
        }
        matchSegments.push({
          text: m[0],
          isMatch: true,
          matchIndex: matchIdx,
        });
        allMatches.push({
          match: m[0],
          index: m.index,
          groups: m.slice(1),
        });
        lastIndex = m.index + m[0].length;
        matchIdx++;
        if (m[0] === "") {
          regex.lastIndex++;
        }
      }
      if (lastIndex < testString.length) {
        matchSegments.push({
          text: testString.slice(lastIndex),
          isMatch: false,
          matchIndex: -1,
        });
      }
    } else {
      const m = regex.exec(testString);
      if (m) {
        if (m.index > 0) {
          matchSegments.push({
            text: testString.slice(0, m.index),
            isMatch: false,
            matchIndex: -1,
          });
        }
        matchSegments.push({
          text: m[0],
          isMatch: true,
          matchIndex: 0,
        });
        if (m.index + m[0].length < testString.length) {
          matchSegments.push({
            text: testString.slice(m.index + m[0].length),
            isMatch: false,
            matchIndex: -1,
          });
        }
        allMatches.push({
          match: m[0],
          index: m.index,
          groups: m.slice(1),
        });
      } else {
        matchSegments.push({
          text: testString,
          isMatch: false,
          matchIndex: -1,
        });
      }
    }

    return { error: null, matches: allMatches, segments: matchSegments, groupCount };
  }, [pattern, testString, flagString, flags.g, t]);

  function toggleFlag(flag: keyof typeof flags) {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  }

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="regex-pattern"
          className="mb-2 block text-sm font-medium text-slate-600"
        >
          {t("common.regexPattern")}
        </label>
        <div className="flex items-center gap-2">
          <span className="font-mono text-lg text-slate-400">/</span>
          <input
            id="regex-pattern"
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder={t("common.regexPatternPlaceholder")}
            className="input-field font-mono text-sm"
            spellCheck={false}
          />
          <span className="font-mono text-lg text-slate-400">/{flagString}</span>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-600">
          {t("common.regexFlags")}
        </label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(flags) as Array<keyof typeof flags>).map((flag) => (
            <button
              key={flag}
              onClick={() => toggleFlag(flag)}
              className={`rounded-lg border px-3 py-1.5 font-mono text-sm font-medium transition ${
                flags[flag]
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-slate-300 bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {flag}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          g — {t("common.flagGlobal")} · i — {t("common.flagCaseInsensitive")} · m — {t("common.flagMultiline")} · s — {t("common.flagDotall")} · u — {t("common.flagUnicode")} · y — {t("common.flagSticky")}
        </p>
      </div>

      <div>
        <label
          htmlFor="regex-test-string"
          className="mb-2 block text-sm font-medium text-slate-600"
        >
          {t("common.testString")}
        </label>
        <textarea
          id="regex-test-string"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder={t("common.testStringPlaceholder")}
          className="input-field min-h-[120px] resize-y font-mono text-sm"
          spellCheck={false}
        />
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="font-semibold">{t("common.regexError")}: </span>
          {error}
        </div>
      )}

      {!error && pattern && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="rounded-lg bg-slate-100 px-4 py-2 text-sm">
              <span className="text-slate-500">{t("common.matchesFound")}: </span>
              <span className="font-bold text-slate-900">{matches.length}</span>
            </div>
            <div className="rounded-lg bg-slate-100 px-4 py-2 text-sm">
              <span className="text-slate-500">{t("common.capturingGroups")}: </span>
              <span className="font-bold text-slate-900">{groupCount}</span>
            </div>
          </div>

          {testString && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                {t("common.highlightedMatches")}
              </h3>
              <div className="overflow-x-auto">
                <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed">
                  {segments.length > 0 ? (
                    segments.map((seg, i) =>
                      seg.isMatch ? (
                        <span
                          key={i}
                          className="rounded bg-yellow-200 px-0.5 font-medium text-slate-900"
                        >
                          {seg.text}
                        </span>
                      ) : (
                        <span key={i} className="text-slate-700">
                          {seg.text}
                        </span>
                      ),
                    )
                  ) : (
                    <span className="text-slate-400">{t("common.noMatches")}</span>
                  )}
                </pre>
              </div>
            </div>
          )}

          {matches.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                {t("common.matchDetails")}
              </h3>
              <div className="space-y-2">
                {matches.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-slate-50 px-3 py-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-500">
                        #{i + 1} @ {m.index}
                      </span>
                      <span className="break-all font-mono font-medium text-brand-700">
                        {m.match || "(empty match)"}
                      </span>
                    </div>
                    {m.groups.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-2">
                        {m.groups.map((g, gi) => (
                          <span
                            key={gi}
                            className="rounded bg-slate-200 px-2 py-0.5 font-mono text-xs text-slate-700"
                          >
                            ${gi + 1}: {g || "(empty)"}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
