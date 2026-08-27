"use client";

import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/lib/tools/categories";
import { getFeaturedTools, getAllTools } from "@/lib/tools/registry";
import { useTranslation } from "@/i18n/LanguageProvider";
import { MetadataUpdater } from "@/i18n/MetadataUpdater";

export default function HomePage() {
  const { t } = useTranslation();
  const featured = getFeaturedTools();
  const allTools = getAllTools();
  const toolsToShow = featured.length > 0 ? featured : allTools;

  return (
    <>
      <MetadataUpdater
        titleKey="site.title"
        descriptionKey="site.description"
      />
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="container-page py-16 text-center sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {t("home.heroTitle")}
            <span className="block text-brand-600">{t("home.heroSubtitle")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            {t("home.heroDescription")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/tools" className="btn-primary">
              {t("home.browseAllTools")}
            </Link>
            <Link href="/tools/image-compressor" className="btn-secondary">
              {t("home.tryImageCompressor")}
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading
          title={t("home.browseByCategory")}
          subtitle={t("home.browseByCategorySubtitle")}
          centered
        />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const count = allTools.filter(
              (tool) => tool.category === cat.slug,
            ).length;
            return (
              <Link
                key={cat.slug}
                href={`/tools?category=${cat.slug}`}
                className="card group p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-brand-600 transition">
                      {t(`categories.${cat.slug}.name`)}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {count > 0
                        ? t("home.toolsCount", { count })
                        : t("home.comingSoon")}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  {t(`categories.${cat.slug}.description`)}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {toolsToShow.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="container-page py-16">
            <SectionHeading
              title={t("home.featuredTools")}
              subtitle={t("home.featuredToolsSubtitle")}
              centered
            />
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {toolsToShow.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100">
              <svg className="h-6 w-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">{t("home.lightningFast")}</h3>
            <p className="mt-2 text-sm text-slate-600">
              {t("home.lightningFastDesc")}
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">{t("home.private")}</h3>
            <p className="mt-2 text-sm text-slate-600">
              {t("home.privateDesc")}
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 font-semibold text-slate-900">{t("home.alwaysFree")}</h3>
            <p className="mt-2 text-sm text-slate-600">
              {t("home.alwaysFreeDesc")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
