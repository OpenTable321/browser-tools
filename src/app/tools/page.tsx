"use client";

import { Suspense } from "react";
import { ToolsExplorer } from "@/components/ToolsExplorer";
import { useTranslation } from "@/i18n/LanguageProvider";
import { MetadataUpdater } from "@/i18n/MetadataUpdater";

export default function ToolsPage() {
  const { t } = useTranslation();

  return (
    <div className="container-page py-12">
      <MetadataUpdater
        titleKey="pages.tools.title"
        descriptionKey="pages.tools.description"
      />
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t("pages.tools.title")}
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          {t("pages.tools.subtitle")}
        </p>
      </div>

      <Suspense
        fallback={
          <div className="py-16 text-center text-slate-400">
            {t("common.loadingTools")}
          </div>
        }
      >
        <ToolsExplorer />
      </Suspense>
    </div>
  );
}
