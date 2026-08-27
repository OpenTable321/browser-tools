"use client";

import Link from "next/link";
import { categories } from "@/lib/tools/categories";
import { useTranslation } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-slate-900"
            >
              <span className="text-xl">🧰</span>
              <span className="text-lg">{t("site.name")}</span>
            </Link>
            <p className="mt-3 text-sm text-slate-600">
              {t("site.description")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">{t("footer.categories")}</h3>
            <ul className="mt-3 space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/tools?category=${cat.slug}`}
                    className="text-sm text-slate-600 transition hover:text-slate-900"
                  >
                    {t(`categories.${cat.slug}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">{t("footer.site")}</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-slate-600 transition hover:text-slate-900"
                >
                  {t("nav.allTools")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 transition hover:text-slate-900"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-600 transition hover:text-slate-900"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">{t("footer.legal")}</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-600 transition hover:text-slate-900"
                >
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-600 transition hover:text-slate-900"
                >
                  {t("footer.termsOfService")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <p className="text-center text-sm text-slate-500">
            {t("footer.copyright", { year, name: t("site.name") })}
          </p>
        </div>
      </div>
    </footer>
  );
}
