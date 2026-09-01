"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageProvider";
import { MetadataUpdater } from "@/i18n/MetadataUpdater";

export default function PrivacyPageClient() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <div className="container-page py-12">
      <MetadataUpdater
        titleKey="pages.privacy.title"
        descriptionKey="pages.privacy.description"
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t("pages.privacy.heading")}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {t("pages.privacy.lastUpdated", { year })}
        </p>

        <div className="mt-6 space-y-6 text-slate-600">
          <p>
            {t("pages.privacy.p1")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.privacy.toolData")}
          </h2>
          <p>
            {t("pages.privacy.toolDataP")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.privacy.analytics")}
          </h2>
          <p>
            {t("pages.privacy.analyticsP")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.privacy.cookies")}
          </h2>
          <p>
            {t("pages.privacy.cookiesP")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.privacy.thirdParty")}
          </h2>
          <p>
            {t("pages.privacy.thirdPartyP")}{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              className="text-brand-600 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              Vercel&apos;s Privacy Policy
            </a>
            .
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.privacy.advertising")}
          </h2>
          <p>
            {t("pages.privacy.advertisingP")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.privacy.changes")}
          </h2>
          <p>
            {t("pages.privacy.changesP")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.privacy.contact")}
          </h2>
          <p>
            {t("pages.privacy.contactP")}{" "}
            <Link href="/contact" className="text-brand-600 hover:underline">
              {t("pages.privacy.contactLink")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
