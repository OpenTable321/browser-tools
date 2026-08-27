"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageProvider";
import { MetadataUpdater } from "@/i18n/MetadataUpdater";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="container-page py-12">
      <MetadataUpdater
        titleKey="pages.about.title"
        descriptionKey="pages.about.description"
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t("pages.about.heading")}
        </h1>

        <div className="mt-6 space-y-6 text-slate-600">
          <p>
            {t("pages.about.p1")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">{t("pages.about.mission")}</h2>
          <p>
            {t("pages.about.missionP")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">
            {t("pages.about.howItWorks")}
          </h2>
          <p>
            {t("pages.about.howItWorksP")}
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>{t("pages.about.howItWorksLi1")}</li>
            <li>{t("pages.about.howItWorksLi2")}</li>
            <li>{t("pages.about.howItWorksLi3")}</li>
            <li>{t("pages.about.howItWorksLi4")}</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900">{t("pages.about.technology")}</h2>
          <p>
            {t("pages.about.technologyP")}
          </p>

          <h2 className="text-xl font-bold text-slate-900">{t("pages.about.contact")}</h2>
          <p>
            {t("pages.about.contactP")}{" "}
            <Link href="/contact" className="text-brand-600 hover:underline">{t("pages.about.contactLink")}</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
