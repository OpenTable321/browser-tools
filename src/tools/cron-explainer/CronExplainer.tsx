"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

function parseCron(expr: string): { valid: boolean; parts: string[]; error?: string } {
  const parts = expr.trim().split(/\s+/);
  if (parts.length < 5 || parts.length > 6) {
    return { valid: false, parts, error: "Expected 5 or 6 fields" };
  }
  return { valid: true, parts };
}

function explainPart(part: string, field: string, t: (k: string) => string): string {
  if (part === "*") return t(`cronEvery${field}`);
  if (part.startsWith("*/")) {
    const n = part.slice(2);
    return t(`cronEveryN${field}`).replace("{n}", n);
  }
  if (part.includes(",")) {
    const items = part.split(",").join(", ");
    return t(`cronSpecific${field}`).replace("{values}", items);
  }
  if (part.includes("-")) {
    return t(`cronRange${field}`).replace("{range}", part);
  }
  return t(`cronAt${field}`).replace("{value}", part);
}

function getNextExecutions(parts: string[], count: number): Date[] {
  const result: Date[] = [];
  const now = new Date();
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setMinutes(now.getMinutes() + 1);

  const maxIter = 50000;
  let iter = 0;

  while (result.length < count && iter < maxIter) {
    iter++;
    if (matchesField(parts[0]!, now.getMinutes(), 0, 59) &&
        matchesField(parts[1]!, now.getHours(), 0, 23) &&
        matchesField(parts[2]!, now.getDate(), 1, 31) &&
        matchesField(parts[3]!, now.getMonth() + 1, 1, 12) &&
        matchesField(parts[4]!, now.getDay(), 0, 6)) {
      result.push(new Date(now));
    }
    now.setMinutes(now.getMinutes() + 1);
  }
  return result;
}

function matchesField(part: string, value: number, min: number, max: number): boolean {
  if (part === "*") return true;
  for (const item of part.split(",")) {
    if (item.includes("/")) {
      const [base, step] = item.split("/");
      const stepNum = parseInt(step!);
      if (base === "*") {
        if ((value - min) % stepNum === 0) return true;
      } else {
        const baseNum = parseInt(base!);
        if (value >= baseNum && (value - baseNum) % stepNum === 0) return true;
      }
    } else if (item.includes("-")) {
      const [lo, hi] = item.split("-").map(Number);
      if (value >= lo! && value <= hi!) return true;
    } else {
      if (parseInt(item) === value) return true;
    }
  }
  return false;
}

export function CronExplainer() {
  const { t } = useTranslation();
  const [expr, setExpr] = useState("*/15 * * * *");

  const parsed = useMemo(() => parseCron(expr), [expr]);

  const explanation = useMemo(() => {
    if (!parsed.valid || parsed.parts.length < 5) return null;
    const [min, hour, dom, mon, dow] = parsed.parts;
    const parts: string[] = [];
    parts.push(explainPart(min!, "Minute", t));
    parts.push(explainPart(hour!, "Hour", t));
    parts.push(explainPart(dom!, "DayOfMonth", t));
    parts.push(explainPart(mon!, "Month", t));
    parts.push(explainPart(dow!, "DayOfWeek", t));
    return parts.join(", ");
  }, [parsed, t]);

  const nextExecutions = useMemo(() => {
    if (!parsed.valid || parsed.parts.length < 5) return [];
    return getNextExecutions(parsed.parts, 5);
  }, [parsed]);

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.cronExpInput")}</label>
        <input
          type="text"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="*/15 * * * *"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {parsed.error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{parsed.error}</div>
      )}

      {explanation && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.cronExplanation")}</span>
            <CopyButton text={explanation} />
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
            {explanation}
          </div>
        </div>
      )}

      {nextExecutions.length > 0 && (
        <div>
          <span className="mb-2 block text-sm font-medium text-slate-700">{t("common.cronNext5")}</span>
          <div className="space-y-1.5">
            {nextExecutions.map((d, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-2">
                <span className="font-mono text-sm text-slate-700">{d.toLocaleString()}</span>
                <span className="text-xs text-slate-400">{d.toISOString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="text-xs font-medium text-slate-500">{t("common.cronFormat")}</div>
        <div className="mt-1 font-mono text-xs text-slate-600">minute hour day-of-month month day-of-week</div>
      </div>
    </div>
  );
}
