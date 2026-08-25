import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolBySlug, getToolSlugs, getToolsByCategory } from "@/lib/tools/registry";
import { getToolComponent } from "@/lib/tools/tool-components";
import { getCategory } from "@/lib/tools/categories";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { ToolCard } from "@/components/ToolCard";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getToolSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    return createMetadata({
      title: "Tool Not Found",
      path: `/tools/${params.slug}`,
    });
  }

  const category = getCategory(tool.category);

  return createMetadata({
    title: tool.name,
    description: tool.description,
    path: `/tools/${tool.slug}`,
    keywords: tool.keywords,
    ogType: "article",
  });
}

export default function ToolPage({ params }: PageProps) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const ToolComponent = getToolComponent(tool.slug);
  if (!ToolComponent) notFound();

  const category = getCategory(tool.category);

  const relatedTools = tool.relatedSlugs
    ? tool.relatedSlugs
        .map((slug) => getToolBySlug(slug))
        .filter((t): t is NonNullable<typeof t> => t !== undefined)
        .slice(0, 3)
    : getToolsByCategory(tool.category)
        .filter((t) => t.slug !== tool.slug)
        .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `${siteConfig.url}/tools/${tool.slug}`,
  };

  const faqJsonLd = tool.faq && tool.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: tool.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${siteConfig.url}/tools`,
      },
      ...(category
        ? [{
            "@type": "ListItem",
            position: 3,
            name: category.name,
            item: `${siteConfig.url}/tools?category=${category.slug}`,
          }]
        : []),
      {
        "@type": "ListItem",
        position: category ? 4 : 3,
        name: tool.name,
        item: `${siteConfig.url}/tools/${tool.slug}`,
      },
    ],
  };

  return (
    <div className="container-page py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-700">
          Home
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-slate-700">
          Tools
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/tools?category=${category.slug}`}
              className="hover:text-slate-700"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-slate-700">{tool.name}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{tool.icon}</span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {tool.name}
          </h1>
        </div>
        <p className="mt-3 max-w-3xl text-lg text-slate-600">
          {tool.description}
        </p>
        {tool.isClientSide && (
          <div className="mt-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              100% Client-side — your data never leaves your browser
            </span>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <ToolComponent />
      </div>

      <div className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900">
          About {tool.name}
        </h2>
        <p className="mt-3 text-slate-600">{tool.longDescription}</p>

        {(tool.supportedFormats || tool.limitations) && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {tool.supportedFormats && tool.supportedFormats.length > 0 && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Supported Formats
                </h3>
                <ul className="mt-2 space-y-1">
                  {tool.supportedFormats.map((fmt) => (
                    <li key={fmt} className="text-sm text-slate-600">
                      {fmt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tool.limitations && tool.limitations.length > 0 && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Limitations
                </h3>
                <ul className="mt-2 space-y-1">
                  {tool.limitations.map((lim) => (
                    <li key={lim} className="text-sm text-slate-600">
                      {lim}
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
              Privacy — 100% Client-Side Processing
            </h3>
            <p className="mt-1 text-sm text-green-700">
              This tool runs entirely in your browser. Your files are never uploaded to any server, stored, or shared. No data leaves your device.
            </p>
          </div>
        )}
      </div>

      {tool.faq && tool.faq.length > 0 && (
        <div className="mt-12 max-w-3xl">
          <h2 className="text-xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-4 space-y-6">
            {tool.faq.map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-slate-900">
                  {item.question}
                </h3>
                <p className="mt-1 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedTools.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">
            Related Tools
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
