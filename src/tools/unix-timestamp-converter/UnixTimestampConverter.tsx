"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function UnixTimestampConverter() {
  const { t } = useTranslation();
  const [timestamp, setTimestamp] = useState<string>("");
  const [dateInput, setDateInput] = useState<string>("");
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    setNow(Math.floor(Date.now() / 1000));
    const interval = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  const tsNum = parseInt(timestamp);
  const tsValid = !isNaN(tsNum);
  const tsDate = tsValid ? new Date(tsNum * 1000) : null;

  const dateValid = dateInput !== "" && !isNaN(new Date(dateInput).getTime());
  const dateTs = dateValid ? Math.floor(new Date(dateInput).getTime() / 1000) : null;

  function formatDateTime(d: Date): string {
    return d.toUTCString();
  }

  function formatLocal(d: Date): string {
    return d.toLocaleString();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center">
        <div className="text-xs font-medium text-slate-500">{t("common.unixCurrent")}</div>
        <div className="mt-1 font-mono text-2xl font-bold text-blue-600">{now}</div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.unixToHuman")}</label>
        <input
          type="number"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          placeholder="1696156800"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        {tsValid && tsDate && (
          <div className="mt-3 space-y-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
              <div className="text-xs font-medium text-slate-500">UTC</div>
              <div className="font-mono text-sm text-slate-800">{formatDateTime(tsDate)}</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
              <div className="text-xs font-medium text-slate-500">{t("common.unixLocal")}</div>
              <div className="font-mono text-sm text-slate-800">{formatLocal(tsDate)}</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
              <div className="text-xs font-medium text-slate-500">ISO 8601</div>
              <div className="font-mono text-sm text-slate-800">{tsDate.toISOString()}</div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.unixFromHuman")}</label>
        <input
          type="datetime-local"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        {dateValid && dateTs !== null && (
          <div className="mt-3">
            <div className="mb-2 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5">
              <div>
                <div className="text-xs font-medium text-slate-500">{t("common.unixResult")}</div>
                <div className="font-mono text-sm text-slate-800">{dateTs}</div>
              </div>
              <CopyButton text={String(dateTs)} />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setTimestamp(String(now))}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {t("common.unixUseCurrent")}
        </button>
      </div>
    </div>
  );
}
