"use client";

import { useState, useEffect, useCallback } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

type TimezoneMode = "local" | "utc";

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function formatDateLocal(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function formatDateUTC(d: Date): string {
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}

function parseDateInput(value: string, utc: boolean): number | null {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return Math.floor(d.getTime() / 1000);
}

export function EpochTimestampConverter() {
  const { t } = useTranslation();
  const [timezone, setTimezone] = useState<TimezoneMode>("local");
  const [epochInput, setEpochInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [nowEpoch, setNowEpoch] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const updateNow = useCallback(() => {
    setNowEpoch(Math.floor(Date.now() / 1000));
  }, []);

  useEffect(() => {
    updateNow();
    const interval = setInterval(updateNow, 1000);
    return () => clearInterval(interval);
  }, [updateNow]);

  function handleEpochTo(epoch: number): string {
    const d = new Date(epoch * 1000);
    return timezone === "utc" ? formatDateUTC(d) : formatDateLocal(d);
  }

  function handleEpochChange(value: string) {
    setEpochInput(value);
    setError(null);
    if (!value) {
      setDateInput("");
      return;
    }
    const num = Number(value);
    if (isNaN(num)) {
      setError(t("common.invalidTimestamp"));
      setDateInput("");
      return;
    }
    setDateInput(handleEpochTo(num));
  }

  function handleDateChange(value: string) {
    setDateInput(value);
    setError(null);
    if (!value) {
      setEpochInput("");
      return;
    }
    const epoch = parseDateInput(value, timezone === "utc");
    if (epoch === null) {
      setError(t("common.invalidDate"));
      setEpochInput("");
      return;
    }
    setEpochInput(String(epoch));
  }

  function useCurrentTime() {
    const epoch = Math.floor(Date.now() / 1000);
    setEpochInput(String(epoch));
    setDateInput(handleEpochTo(epoch));
    setError(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex rounded-lg border border-slate-300 p-1">
          <button
            onClick={() => { setTimezone("local"); }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              timezone === "local"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t("common.localTime")}
          </button>
          <button
            onClick={() => { setTimezone("utc"); }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              timezone === "utc"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t("common.utcTime")}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-100 px-4 py-2 text-sm">
            <span className="text-slate-500">{t("common.currentEpoch")}: </span>
            <span className="font-mono font-bold text-slate-900">{nowEpoch}</span>
          </div>
          <button onClick={useCurrentTime} className="btn-secondary">
            {t("common.useCurrentTime")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="epoch-input"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            {t("common.unixTimestamp")}
          </label>
          <input
            id="epoch-input"
            type="number"
            value={epochInput}
            onChange={(e) => handleEpochChange(e.target.value)}
            placeholder={t("common.enterEpochPlaceholder")}
            className="input-field font-mono text-sm"
            spellCheck={false}
          />
          <p className="mt-2 text-xs text-slate-500">
            {t("common.epochToDateTimeHint")}
          </p>
        </div>

        <div>
          <label
            htmlFor="date-input"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            {t("common.dateTime")}
          </label>
          <input
            id="date-input"
            type="datetime-local"
            value={dateInput}
            onChange={(e) => handleDateChange(e.target.value)}
            className="input-field font-mono text-sm"
            spellCheck={false}
          />
          <p className="mt-2 text-xs text-slate-500">
            {t("common.dateTimeToEpochHint")}
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {epochInput && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs text-slate-500">{t("common.unixTimestamp")}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="break-all font-mono text-sm font-bold text-slate-900">{epochInput}</p>
              <CopyButton text={epochInput} label={t("common.unixTimestamp")} />
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs text-slate-500">
              {t("common.dateTime")} ({timezone === "utc" ? "UTC" : t("common.localTime")})
            </p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="break-all font-mono text-sm font-bold text-slate-900">
                {(() => {
                  const d = new Date(Number(epochInput) * 1000);
                  return timezone === "utc"
                    ? `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`
                    : d.toLocaleString();
                })()}
              </p>
              <CopyButton text={dateInput} label={t("common.dateTime")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
