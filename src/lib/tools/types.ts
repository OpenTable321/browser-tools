import type { CategorySlug } from "./categories";

export interface ToolMeta {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: CategorySlug;
  keywords: string[];
  icon: string;
  isClientSide: boolean;
  featured?: boolean;
  faq?: { question: string; answer: string }[];
  relatedSlugs?: string[];
  supportedFormats?: string[];
  limitations?: string[];
}

