"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

interface UrlCheck {
  url: string;
  blocked: boolean;
  rule: string | null;
}

export function RobotsTxtTester() {
  const { t } = useTranslation();
  const [robotsTxt, setRobotsTxt] = useState<string>("User-agent: *\nDisallow: /admin\nDisallow: /private\nAllow: /admin/public\nSitemap: https://example.com/sitemap.xml");
  const [urls, setUrls] = useState<string>("/admin\n/admin/public\n/private/settings\n/blog/post-1");
  const [results, setResults] = useState<UrlCheck[] | null>(null);
  const [sitemapUrl, setSitemapUrl] = useState<string | null>(null);

  function parseRobots(txt: string) {
    const lines = txt.split("\n");
    let currentUserAgent = "*";
    const rules: Record<string, { allow: string[]; disallow: string[] }> = {};
    let sitemap: string | null = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const colonIdx = trimmed.indexOf(":");
      if (colonIdx === -1) continue;

      const field = trimmed.substring(0, colonIdx).trim().toLowerCase();
      const value = trimmed.substring(colonIdx + 1).trim();

      if (field === "user-agent") {
        currentUserAgent = value || "*";
        if (!rules[currentUserAgent]) rules[currentUserAgent] = { allow: [], disallow: [] };
      } else if (field === "disallow") {
        if (!rules[currentUserAgent]) rules[currentUserAgent] = { allow: [], disallow: [] };
        if (value) rules[currentUserAgent]!.disallow.push(value);
      } else if (field === "allow") {
        if (!rules[currentUserAgent]) rules[currentUserAgent] = { allow: [], disallow: [] };
        if (value) rules[currentUserAgent]!.allow.push(value);
      } else if (field === "sitemap") {
        sitemap = value;
      }
    }
    return { rules, sitemap };
  }

  function matchesRule(path: string, rule: string): boolean {
    if (rule === "/") return true;
    if (rule.endsWith("$")) {
      const r = rule.slice(0, -1);
      return path === r || path === r.replace(/\*/g, "");
    }
    const escaped = rule.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
    return new RegExp("^" + escaped).test(path);
  }

  function checkUrl(path: string, rules: Record<string, { allow: string[]; disallow: string[] }>): UrlCheck {
    const uaRules = rules["*"] || { allow: [], disallow: [] };
    let blocked = false;
    let matchedRule: string | null = null;

    for (const dis of uaRules.disallow) {
      if (matchesRule(path, dis)) {
        let overridden = false;
        for (const allow of uaRules.allow) {
          if (matchesRule(path, allow) && allow.length >= dis.length) {
            overridden = true;
            break;
          }
        }
        if (!overridden) {
          blocked = true;
          matchedRule = `Disallow: ${dis}`;
          break;
        }
      }
    }

    return { url: path, blocked, rule: matchedRule };
  }

  function runTest() {
    const { rules, sitemap } = parseRobots(robotsTxt);
    setSitemapUrl(sitemap);
    const urlList = urls.split("\n").map(u => u.trim()).filter(Boolean);
    const checks = urlList.map(u => checkUrl(u, rules));
    setResults(checks);
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.robotsInput")}</label>
        <textarea
          value={robotsTxt}
          onChange={(e) => setRobotsTxt(e.target.value)}
          className="h-40 w-full rounded-lg border border-slate-300 px-4 py-3 text-xs font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.robotsUrls")}</label>
        <textarea
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          className="h-32 w-full rounded-lg border border-slate-300 px-4 py-3 text-xs font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <button
        onClick={runTest}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        {t("common.robotsRun")}
      </button>

      {sitemapUrl && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm">
          <span className="font-medium text-blue-700">{t("common.robotsSitemap")}: </span>
          <span className="font-mono text-blue-800">{sitemapUrl}</span>
        </div>
      )}

      {results && (
        <div>
          <span className="mb-2 block text-sm font-medium text-slate-700">{t("common.robotsResults")}</span>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-slate-600">URL</th>
                  <th className="px-4 py-2 text-left font-medium text-slate-600">{t("common.robotsStatus")}</th>
                  <th className="px-4 py-2 text-left font-medium text-slate-600">{t("common.robotsRule")}</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className="border-t border-slate-200">
                    <td className="px-4 py-2 font-mono text-xs text-slate-700">{r.url}</td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${r.blocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {r.blocked ? t("common.robotsBlocked") : t("common.robotsAllowed")}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-slate-500">{r.rule ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
