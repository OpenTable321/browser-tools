"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function CookieExplorer() {
  const { t } = useTranslation();
  const [localStorageData, setLocalStorageData] = useState<{ key: string; value: string }[]>([]);
  const [sessionStorageData, setSessionStorageData] = useState<{ key: string; value: string }[]>([]);
  const [cookieData, setCookieData] = useState<{ key: string; value: string }[]>([]);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [target, setTarget] = useState<"localStorage" | "sessionStorage" | "cookie">("localStorage");

  function refresh() {
    if (typeof window === "undefined") return;
    const ls: { key: string; value: string }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      ls.push({ key, value: localStorage.getItem(key) ?? "" });
    }
    setLocalStorageData(ls);

    const ss: { key: string; value: string }[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)!;
      ss.push({ key, value: sessionStorage.getItem(key) ?? "" });
    }
    setSessionStorageData(ss);

    const cookies: { key: string; value: string }[] = [];
    if (document.cookie) {
      document.cookie.split(";").forEach((c) => {
        const [k, ...v] = c.trim().split("=");
        if (k) cookies.push({ key: k, value: v.join("=") });
      });
    }
    setCookieData(cookies);
  }

  useEffect(() => { refresh(); }, []);

  function addItem() {
    if (!newKey) return;
    if (target === "localStorage") localStorage.setItem(newKey, newValue);
    else if (target === "sessionStorage") sessionStorage.setItem(newKey, newValue);
    else document.cookie = `${newKey}=${newValue}; path=/`;
    setNewKey("");
    setNewValue("");
    refresh();
  }

  function deleteItem(key: string, store: "localStorage" | "sessionStorage" | "cookie") {
    if (store === "localStorage") localStorage.removeItem(key);
    else if (store === "sessionStorage") sessionStorage.removeItem(key);
    else document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    refresh();
  }

  function clearAll(store: "localStorage" | "sessionStorage") {
    if (store === "localStorage") localStorage.clear();
    else sessionStorage.clear();
    refresh();
  }

  const maxBytes = 5 * 1024 * 1024;

  function renderTable(data: { key: string; value: string }[], store: "localStorage" | "sessionStorage" | "cookie") {
    const totalBytes = data.reduce((sum, item) => sum + new Blob([item.key + item.value]).size, 0);
    return (
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">
            {store === "localStorage" ? "Local Storage" : store === "sessionStorage" ? "Session Storage" : "Cookies"} ({data.length})
          </span>
          {store !== "cookie" && (
            <button onClick={() => clearAll(store)} className="text-xs text-red-500 hover:underline">{t("common.cookieClearAll")}</button>
          )}
        </div>
        {data.length === 0 ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">{t("common.cookieEmpty")}</div>
        ) : (
          <div className="space-y-1">
            {data.map((item) => (
              <div key={item.key} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm">
                <span className="font-mono font-medium text-slate-700">{item.key}</span>
                <span className="text-slate-400">=</span>
                <span className="flex-1 truncate font-mono text-slate-600">{item.value}</span>
                <button onClick={() => deleteItem(item.key, store)} className="text-xs text-red-500 hover:underline">{t("common.cookieDelete")}</button>
              </div>
            ))}
          </div>
        )}
        {store !== "cookie" && (
          <div className="mt-2">
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full bg-blue-500" style={{ width: `${Math.min(100, (totalBytes / maxBytes) * 100)}%` }} />
            </div>
            <div className="mt-1 text-xs text-slate-500">{(totalBytes / 1024).toFixed(1)} KB / 5,120 KB</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-700">
        {t("common.cookieWarning")}
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t("common.cookieTarget")}</label>
          <select value={target} onChange={(e) => setTarget(e.target.value as "localStorage" | "sessionStorage" | "cookie")} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none">
            <option value="localStorage">Local Storage</option>
            <option value="sessionStorage">Session Storage</option>
            <option value="cookie">Cookie</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t("common.cookieKey")}</label>
          <input type="text" value={newKey} onChange={(e) => setNewKey(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">{t("common.cookieValue")}</label>
          <input type="text" value={newValue} onChange={(e) => setNewValue(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <button onClick={addItem} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">{t("common.cookieAdd")}</button>
        <button onClick={refresh} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">{t("common.cookieRefresh")}</button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {renderTable(localStorageData, "localStorage")}
        {renderTable(sessionStorageData, "sessionStorage")}
        {renderTable(cookieData, "cookie")}
      </div>
    </div>
  );
}
