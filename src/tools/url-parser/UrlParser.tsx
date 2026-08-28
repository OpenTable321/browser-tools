"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

interface ParsedUrl {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  hash: string;
  search: string;
  params: { key: string; value: string }[];
}

function parseUrl(url: string): ParsedUrl | null {
  try {
    const u = new URL(url);
    const params: { key: string; value: string }[] = [];
    u.searchParams.forEach((value, key) => {
      params.push({ key, value });
    });
    return {
      protocol: u.protocol,
      hostname: u.hostname,
      port: u.port,
      pathname: u.pathname,
      hash: u.hash,
      search: u.search,
      params,
    };
  } catch {
    return null;
  }
}

export function UrlParser() {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [params, setParams] = useState<{ key: string; value: string }[]>([]);

  const parsed = parseUrl(url);

  function handleDeleteParam(idx: number) {
    setParams((prev) => prev.filter((_, i) => i !== idx));
  }

  const displayParams = params.length > 0 ? params : parsed?.params ?? [];

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {t("common.urlParserInput")}
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setParams([]);
          }}
          placeholder={t("common.urlParserPlaceholder")}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {url && !parsed && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {t("common.urlParserError")}
        </div>
      )}

      {parsed && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { label: t("common.urlParserProtocol"), value: parsed.protocol },
              { label: t("common.urlParserHostname"), value: parsed.hostname },
              { label: t("common.urlParserPort"), value: parsed.port || "—" },
              { label: t("common.urlParserPath"), value: parsed.pathname },
              { label: t("common.urlParserHash"), value: parsed.hash || "—" },
              { label: t("common.urlParserSearch"), value: parsed.search || "—" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <div className="text-xs font-medium text-slate-500">{item.label}</div>
                <div className="mt-1 break-all text-sm text-slate-800">{item.value}</div>
              </div>
            ))}
          </div>

          {displayParams.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                {t("common.urlParserQueryParams")}
              </h3>
              <div className="space-y-2">
                {displayParams.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2"
                  >
                    <span className="min-w-[80px] text-sm font-medium text-blue-600">{p.key}</span>
                    <span className="flex-1 break-all text-sm text-slate-700">{p.value}</span>
                    <button
                      onClick={() => handleDeleteParam(idx)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      {t("common.urlParserDelete")}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-lg bg-slate-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{t("common.urlParserFullUrl")}</span>
              <CopyButton text={url} />
            </div>
            <div className="break-all text-sm text-slate-800">{url}</div>
          </div>
        </div>
      )}
    </div>
  );
}
