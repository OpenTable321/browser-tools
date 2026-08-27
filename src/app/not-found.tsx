"use client";

import Link from "next/link";
import { getAllTools } from "@/lib/tools/registry";
import { useTranslation } from "@/i18n/LanguageProvider";
import { MetadataUpdater } from "@/i18n/MetadataUpdater";

export default function NotFound() {
  const { t } = useTranslation();
  const popularTools = getAllTools().slice(0, 3);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <MetadataUpdater titleKey="common.pageNotFound" />
      <p className="text-7xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        {t("common.pageNotFound")}
      </h1>
      <p className="mt-2 max-w-md text-slate-600">
        {t("common.pageNotFoundDesc")}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          {t("common.backToHome")}
        </Link>
        <Link href="/tools" className="btn-secondary">
          {t("common.browseAllToolsBtn")}
        </Link>
      </div>

      {popularTools.length > 0 && (
        <div className="mt-12">
          <p className="text-sm font-medium text-slate-500">
            {t("common.popularTools")}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {popularTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                {tool.icon} {t(`tools.${tool.slug}.name`)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
