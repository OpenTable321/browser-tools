"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageSwitcher() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      onClick={toggleLocale}
      className="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
      aria-label="Switch language"
    >
      <span className={locale === "en" ? "font-bold text-brand-600" : "text-slate-400"}>EN</span>
      <span className="mx-0.5 text-slate-300">/</span>
      <span className={locale === "ru" ? "font-bold text-brand-600" : "text-slate-400"}>RU</span>
    </button>
  );
}
