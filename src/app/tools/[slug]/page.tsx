import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, getToolSlugs } from "@/lib/tools/registry";
import { getCategory } from "@/lib/tools/categories";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { ToolContent } from "./ToolContent";
import { RelatedTools } from "@/components/RelatedTools";
import { SeoContent } from "@/components/SeoContent";

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

  const category = getCategory(tool.category);

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
      <ToolContent slug={params.slug} />
      <SeoContent slug={params.slug} />
      <RelatedTools slug={params.slug} />
    </div>
  );
}
