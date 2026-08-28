"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function UserAgentParser() {
  const { t } = useTranslation();
  const [ua, setUa] = useState(typeof navigator !== "undefined" ? navigator.userAgent : "");

  function parse(userAgent: string) {
    const browser = (() => {
      if (/Edg\//.test(userAgent)) return "Microsoft Edge";
      if (/OPR\//.test(userAgent)) return "Opera";
      if (/Firefox\//.test(userAgent)) return "Firefox";
      if (/Chrome\//.test(userAgent)) return "Chrome";
      if (/Safari\//.test(userAgent) && !/Chrome/.test(userAgent)) return "Safari";
      return t("common.uaUnknown");
    })();
    const os = (() => {
      if (/Windows NT 10/.test(userAgent)) return "Windows 10/11";
      if (/Windows NT 6\.3/.test(userAgent)) return "Windows 8.1";
      if (/Windows NT 6\.1/.test(userAgent)) return "Windows 7";
      if (/Mac OS X/.test(userAgent)) return "macOS";
      if (/Android/.test(userAgent)) return "Android";
      if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";
      if (/Linux/.test(userAgent)) return "Linux";
      return t("common.uaUnknown");
    })();
    const engine = (() => {
      if (/Gecko\/|Firefox\//.test(userAgent)) return "Gecko";
      if (/Blink/.test(userAgent)) return "Blink";
      if (/WebKit\//.test(userAgent)) return "WebKit";
      if (/Trident\//.test(userAgent)) return "Trident";
      return t("common.uaUnknown");
    })();
    const deviceType = /Mobile|Android|iPhone|iPad/i.test(userAgent) ? t("common.uaMobile") : t("common.uaDesktop");
    return { browser, os, engine, deviceType };
  }

  const info = parse(ua);

  const fields = [
    { label: t("common.uaBrowser"), value: info.browser },
    { label: t("common.uaOs"), value: info.os },
    { label: t("common.uaEngine"), value: info.engine },
    { label: t("common.uaDevice"), value: info.deviceType },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.uaInput")}</label>
        <textarea value={ua} onChange={(e) => setUa(e.target.value)} className="h-24 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.label} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="text-xs font-medium text-slate-500">{f.label}</div>
            <div className="mt-1 text-sm text-slate-800">{f.value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-slate-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">{t("common.uaFullString")}</span>
          <CopyButton text={ua} />
        </div>
        <div className="break-all text-sm text-slate-800">{ua}</div>
      </div>
    </div>
  );
}
