"use client";

import { useTranslation } from "@/i18n/LanguageProvider";
import { MetadataUpdater } from "@/i18n/MetadataUpdater";

export default function ContactPageClient() {
  const { t } = useTranslation();

  return (
    <div className="container-page py-12">
      <MetadataUpdater
        titleKey="pages.contact.title"
        descriptionKey="pages.contact.description"
      />
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t("pages.contact.heading")}
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          {t("pages.contact.p1")}
        </p>

        <div className="mt-8">
          <a
            href="mailto:nnuubbiikk@gmail.com"
            className="card group p-6 block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100">
                <svg
                  className="h-5 w-5 text-brand-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-brand-600 transition">
                  {t("pages.contact.email")}
                </h3>
                <p className="text-sm text-slate-500">nnuubbiikk@gmail.com</p>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="font-semibold text-slate-900">
            {t("pages.contact.suggestTool")}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {t("pages.contact.suggestToolP")}
          </p>
        </div>
      </div>
    </div>
  );
}
