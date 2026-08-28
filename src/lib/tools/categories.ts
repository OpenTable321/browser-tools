export type CategorySlug =
  | "image"
  | "text"
  | "generators"
  | "developers"
  | "calculators"
  | "unit"
  | "pdf"
  | "security";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    slug: "image",
    name: "Image Tools",
    description:
      "Compress, resize, convert, and edit images directly in your browser. No uploads required.",
    icon: "🖼️",
  },
  {
    slug: "text",
    name: "Text Tools",
    description:
      "Transform, format, count, and analyze text with fast client-side utilities.",
    icon: "📝",
  },
  {
    slug: "generators",
    name: "Generators",
    description:
      "Generate passwords, QR codes, UUIDs, and other useful data instantly.",
    icon: "⚡",
  },
  {
    slug: "developers",
    name: "Developer Tools",
    description:
      "Format, minify, encode, and decode data with developer-focused utilities.",
    icon: "🛠️",
  },
  {
    slug: "calculators",
    name: "Calculators",
    description: "Quick calculations for everyday tasks — no spreadsheet needed.",
    icon: "🧮",
  },
  {
    slug: "unit",
    name: "Unit Converters",
    description:
      "Convert between units of length, weight, temperature, area, volume, speed, and time — all in your browser.",
    icon: "📏",
  },
  {
    slug: "pdf",
    name: "PDF Tools",
    description:
      "Convert, merge, split, and manipulate PDF files entirely in your browser. No uploads required.",
    icon: "📄",
  },
  {
    slug: "security",
    name: "Security Tools",
    description:
      "Evaluate password strength, generate hashes, and audit security — all client-side, your data never leaves your device.",
    icon: "🔒",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
