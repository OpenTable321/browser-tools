"use client";

import Link from "next/link";
import { getToolBySlug, getToolsByCategory } from "@/lib/tools/registry";
import { getToolComponent } from "@/lib/tools/tool-components";
import { getCategory } from "@/lib/tools/categories";
import { ToolCard } from "@/components/ToolCard";
import { useTranslation } from "@/i18n/LanguageProvider";
import { MetadataUpdater } from "@/i18n/MetadataUpdater";

interface ToolContentProps {
  slug: string;
}

export function ToolContent({ slug }: ToolContentProps) {
  const { t } = useTranslation();
  const tool = getToolBySlug(slug);

  if (!tool) return null;

  const ToolComponent = getToolComponent(tool.slug);
  if (!ToolComponent) return null;

  const category = getCategory(tool.category);

  const relatedTools = tool.relatedSlugs
    ? tool.relatedSlugs
        .map((s) => getToolBySlug(s))
        .filter((tk): tk is NonNullable<typeof tk> => tk !== undefined)
        .slice(0, 3)
    : getToolsByCategory(tool.category)
        .filter((tk) => tk.slug !== tool.slug)
        .slice(0, 3);

  const toolName = t(`tools.${tool.slug}.name`);
  const toolDesc = t(`tools.${tool.slug}.description`);

  return (
    <>
      <MetadataUpdater
        titleKey={`tools.${tool.slug}.name`}
        descriptionKey={`tools.${tool.slug}.description`}
      />
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-700">
          {t("nav.home")}
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-slate-700">
          {t("nav.allTools")}
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/tools?category=${category.slug}`}
              className="hover:text-slate-700"
            >
              {t(`categories.${category.slug}.name`)}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-700">{toolName}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{tool.icon}</span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {toolName}
          </h1>
        </div>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          {toolDesc}
        </p>
        {tool.isClientSide && (
          <div className="mt-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {t("common.clientSideBadge")}
            </span>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <ToolComponent />
      </div>

      <div className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900">
          {t("common.aboutTool", { name: toolName })}
        </h2>
        <p className="mt-3 text-slate-600">{t(`tools.${tool.slug}.longDescription`)}</p>

        {(tool.supportedFormats || tool.limitations) && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {tool.supportedFormats && tool.supportedFormats.length > 0 && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  {t("common.supportedFormats")}
                </h3>
                <ul className="mt-2 space-y-1">
                  {tool.supportedFormats.map((fmt, i) => (
                    <li key={i} className="text-sm text-slate-600">
                      {fmt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tool.limitations && tool.limitations.length > 0 && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  {t("common.limitations")}
                </h3>
                <ul className="mt-2 space-y-1">
                  {tool.limitations.map((lim, i) => (
                    <li key={i} className="text-sm text-slate-600">
                      {t(`tools.${tool.slug}.limitations.${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {tool.isClientSide && (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
            <h3 className="text-sm font-semibold text-green-900">
              {t("common.privacyClientSide")}
            </h3>
            <p className="mt-1 text-sm text-green-700">
              {t("common.privacyClientSideDesc")}
            </p>
          </div>
        )}
      </div>

      {tool.faq && tool.faq.length > 0 && (
        <div className="mt-12 max-w-3xl">
          <h2 className="text-xl font-bold text-slate-900">
            {t("common.faqTitle")}
          </h2>
          <div className="mt-4 space-y-6">
            {tool.faq.map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-slate-900">
                  {t(`tools.${tool.slug}.faq.${i}.question`)}
                </h3>
                <p className="mt-1 text-slate-600">{t(`tools.${tool.slug}.faq.${i}.answer`)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedTools.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">
            {t("common.relatedTools")}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((tk) => (
              <ToolCard key={tk.slug} tool={tk} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
