import type { Metadata } from "next";
import { siteConfig } from "./site";

interface PageMetaInput {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  ogType?: "website" | "article";
  verification?: Metadata["verification"];
}

export function createMetadata({
  title,
  description,
  path = "",
  keywords = [],
  ogType = "website",
  verification,
}: PageMetaInput): Metadata {
  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : siteConfig.title;

  const desc = description ?? siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  return {
    title: fullTitle,
    description: desc,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: ogType,
      images: [
        {
          url: "/icon-512.png",
          width: 512,
          height: 512,
          alt: title ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description: desc,
      site: siteConfig.twitter,
      images: ["/icon-512.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    ...(verification ? { verification } : {}),
  };
}
