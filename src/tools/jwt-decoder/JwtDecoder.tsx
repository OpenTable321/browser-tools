"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function JwtDecoder() {
  const { t } = useTranslation();
  const [token, setToken] = useState("");

  let header: string | null = null;
  let payload: string | null = null;
  let exp: number | null = null;
  let error: string | null = null;

  if (token.trim()) {
    const parts = token.trim().split(".");
    if (parts.length >= 2) {
      try {
        header = JSON.stringify(JSON.parse(atob(parts[0]!.replace(/-/g, "+").replace(/_/g, "/"))), null, 2);
        payload = JSON.stringify(JSON.parse(atob(parts[1]!.replace(/-/g, "+").replace(/_/g, "/"))), null, 2);
        const payloadObj = JSON.parse(atob(parts[1]!.replace(/-/g, "+").replace(/_/g, "/")));
        if (payloadObj.exp) exp = payloadObj.exp;
      } catch {
        error = t("common.jwtError");
      }
    } else {
      error = t("common.jwtError");
    }
  }

  const isExpired = exp ? exp * 1000 < Date.now() : null;

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.jwtInput")}</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder={t("common.jwtPlaceholder")}
          className="h-24 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

      {header && payload && (
        <div className="space-y-4">
          {exp && (
            <div className={`rounded-lg px-4 py-3 text-sm font-medium ${isExpired ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
              {isExpired ? t("common.jwtExpired") : t("common.jwtActive")} — {new Date(exp * 1000).toLocaleString()}
            </div>
          )}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">{t("common.jwtHeader")}</span>
              <CopyButton text={header} />
            </div>
            <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-900 p-4 text-sm text-green-400">{header}</pre>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">{t("common.jwtPayload")}</span>
              <CopyButton text={payload} />
            </div>
            <pre className="overflow-auto rounded-lg border border-slate-200 bg-slate-900 p-4 text-sm text-green-400">{payload}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
