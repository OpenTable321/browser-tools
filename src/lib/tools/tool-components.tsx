import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import { ImageCompressor } from "@/tools/image-compressor/ImageCompressor";
import { ImageResizer } from "@/tools/image-resizer/ImageResizer";
import { JpgToWebp } from "@/tools/jpg-to-webp/JpgToWebp";
import { PngToWebp } from "@/tools/png-to-webp/PngToWebp";
import { JpgToPng } from "@/tools/jpg-to-png/JpgToPng";
import { WebpToJpg } from "@/tools/webp-to-jpg/WebpToJpg";
import { WordCounter } from "@/tools/word-counter/WordCounter";
import { CharacterCounter } from "@/tools/character-counter/CharacterCounter";
import { CaseConverter } from "@/tools/case-converter/CaseConverter";
import { RemoveDuplicateLines } from "@/tools/remove-duplicate-lines/RemoveDuplicateLines";
import { TextSorter } from "@/tools/text-sorter/TextSorter";
import { PasswordGenerator } from "@/tools/password-generator/PasswordGenerator";
import { UuidGenerator } from "@/tools/uuid-generator/UuidGenerator";
import { RandomNumberGenerator } from "@/tools/random-number-generator/RandomNumberGenerator";
import { PercentageCalculator } from "@/tools/percentage-calculator/PercentageCalculator";

const JpgToPdf = dynamic(() =>
  import("@/tools/jpg-to-pdf/JpgToPdf").then((m) => m.JpgToPdf),
);
const PdfToJpg = dynamic(() =>
  import("@/tools/pdf-to-jpg/PdfToJpg").then((m) => m.PdfToJpg),
);
const MergePdf = dynamic(() =>
  import("@/tools/merge-pdf/MergePdf").then((m) => m.MergePdf),
);
const SplitPdf = dynamic(() =>
  import("@/tools/split-pdf/SplitPdf").then((m) => m.SplitPdf),
);
const QrCodeGenerator = dynamic(() =>
  import("@/tools/qr-code-generator/QrCodeGenerator").then((m) => m.QrCodeGenerator),
);

/**
 * Maps tool slugs to their React components.
 * Add new entries here when you create a new tool component.
 * PDF tools and QR Code use next/dynamic to keep heavy libraries in separate chunks.
 */
const toolComponents: Record<string, ComponentType> = {
  "image-compressor": ImageCompressor,
  "image-resizer": ImageResizer,
  "jpg-to-webp": JpgToWebp,
  "png-to-webp": PngToWebp,
  "jpg-to-png": JpgToPng,
  "webp-to-jpg": WebpToJpg,
  "jpg-to-pdf": JpgToPdf,
  "pdf-to-jpg": PdfToJpg,
  "merge-pdf": MergePdf,
  "split-pdf": SplitPdf,
  "word-counter": WordCounter,
  "character-counter": CharacterCounter,
  "case-converter": CaseConverter,
  "remove-duplicate-lines": RemoveDuplicateLines,
  "text-sorter": TextSorter,
  "qr-code-generator": QrCodeGenerator,
  "password-generator": PasswordGenerator,
  "uuid-generator": UuidGenerator,
  "random-number-generator": RandomNumberGenerator,
  "percentage-calculator": PercentageCalculator,
};

export function getToolComponent(slug: string): ComponentType | undefined {
  return toolComponents[slug];
}
