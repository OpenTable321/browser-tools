"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageProvider";
import { MetadataUpdater } from "@/i18n/MetadataUpdater";

export default function TermsPage() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <div className="container-page py-12">
      <MetadataUpdater
        titleKey="pages.terms.title"
        descriptionKey="pages.terms.description"
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t("pages.terms.heading")}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {t("pages.terms.lastUpdated", { year })}
        </p>

        <div className="mt-6 space-y-6 text-slate-600">
          <p>
            {t("pages.terms.p1")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.terms.freeUse")}
          </h2>
          <p>
            {t("pages.terms.freeUseP")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.terms.noWarranty")}
          </h2>
          <p>
            {t("pages.terms.noWarrantyP")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.terms.liability")}
          </h2>
          <p>
            {t("pages.terms.liabilityP")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.terms.ip")}
          </h2>
          <p>
            {t("pages.terms.ipP")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.terms.acceptableUse")}
          </h2>
          <p>
            {t("pages.terms.acceptableUseP")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.terms.changesTerms")}
          </h2>
          <p>
            {t("pages.terms.changesTermsP")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.terms.contact")}
          </h2>
          <p>
            {t("pages.terms.contactP")}{" "}
            <Link href="/contact" className="text-brand-600 hover:underline">
              {t("pages.terms.contactLink")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
