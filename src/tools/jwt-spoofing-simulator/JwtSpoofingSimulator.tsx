"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function JwtSpoofingSimulator() {
  const { t } = useTranslation();
  const [token, setToken] = useState("");
  const [editedPayload, setEditedPayload] = useState("");

  function decodePart(part: string): string {
    try {
      const decoded = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
      return decoded;
    } catch {
      return "";
    }
  }

  function encodePart(str: string): string {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  const parts = token.split(".");
  const header = parts.length > 1 ? decodePart(parts[0]!) : "";
  const payload = parts.length > 2 ? decodePart(parts[1]!) : "";
  const activePayload = editedPayload || payload;

  let modifiedToken = "";
  try {
    if (parts.length === 3 && activePayload) {
      modifiedToken = `${parts[0]}.${encodePart(activePayload)}.${parts[2]}`;
    }
  } catch { /* empty */ }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border-2 border-amber-300 bg-amber-50 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium text-amber-800">
          <span>⚠️</span> {t("common.jwtSpoofWarning")}
        </div>
        <p className="mt-1 text-xs text-amber-700">{t("common.jwtSpoofWarningDesc")}</p>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.jwtSpoofInput")}</label>
        <textarea value={token} onChange={(e) => { setToken(e.target.value); setEditedPayload(""); }} placeholder="eyJhbG..." className="h-24 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      {header && (
        <div>
          <span className="text-sm font-medium text-slate-700">{t("common.jwtSpoofHeader")}</span>
          <pre className="mt-2 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{header}</pre>
        </div>
      )}
      {payload && (
        <div>
          <span className="text-sm font-medium text-slate-700">{t("common.jwtSpoofPayload")}</span>
          <textarea value={activePayload} onChange={(e) => setEditedPayload(e.target.value)} className="mt-2 h-40 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>
      )}
      {modifiedToken && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.jwtSpoofModified")}</span>
            <CopyButton text={modifiedToken} />
          </div>
          <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800 break-all">{modifiedToken}</pre>
        </div>
      )}
    </div>
  );
}
