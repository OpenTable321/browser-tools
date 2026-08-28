"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function CronExpressionGenerator() {
  const { t } = useTranslation();
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [day, setDay] = useState("*");
  const [month, setMonth] = useState("*");
  const [weekday, setWeekday] = useState("*");

  const cron = `${minute} ${hour} ${day} ${month} ${weekday}`;

  function describe(): string {
    const parts: string[] = [];
    if (minute !== "*" && minute !== "*/1") parts.push(`${t("common.cronEvery")} ${minute} ${t("common.cronMinutes")}`);
    if (hour !== "*" && hour !== "*/1") parts.push(`${t("common.cronEvery")} ${hour} ${t("common.cronHours")}`);
    if (day !== "*") parts.push(`${t("common.cronOnDay")} ${day} ${t("common.cronOfMonth")}`);
    if (month !== "*") parts.push(`${t("common.cronInMonth")} ${month}`);
    if (weekday !== "*") parts.push(`${t("common.cronOnWeekday")} ${weekday}`);
    if (parts.length === 0) return t("common.cronEveryMinute");
    return parts.join(", ");
  }

  const fields = [
    { label: t("common.cronMinute"), value: minute, set: setMinute, options: ["*", "0", "15", "30", "45", "*/5", "*/10", "*/15", "*/30"] },
    { label: t("common.cronHour"), value: hour, set: setHour, options: ["*", "0", "6", "9", "12", "18", "*/2", "*/6", "*/12"] },
    { label: t("common.cronDay"), value: day, set: setDay, options: ["*", "1", "2", "5", "10", "15", "20", "25", "28", "L"] },
    { label: t("common.cronMonth"), value: month, set: setMonth, options: ["*", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] },
    { label: t("common.cronWeekday"), value: weekday, set: setWeekday, options: ["*", "0", "1", "2", "3", "4", "5", "6"] },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        {fields.map((f) => (
          <div key={f.label}>
            <label className="mb-1 block text-xs font-medium text-slate-500">{f.label}</label>
            <select value={f.value} onChange={(e) => f.set(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
              {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">{t("common.cronExpression")}</span>
          <CopyButton text={cron} />
        </div>
        <div className="font-mono text-lg text-slate-800">{cron}</div>
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <span className="text-xs font-medium text-slate-500">{t("common.cronDescription")}</span>
        <div className="mt-1 text-sm text-slate-700">{describe()}</div>
      </div>
    </div>
  );
}
