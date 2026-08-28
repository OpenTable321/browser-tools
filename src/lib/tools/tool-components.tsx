import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import { ImageCompressor } from "@/tools/image-compressor/ImageCompressor";
import { ImageResizer } from "@/tools/image-resizer/ImageResizer";
import { JpgToWebp } from "@/tools/jpg-to-webp/JpgToWebp";
import { PngToWebp } from "@/tools/png-to-webp/PngToWebp";
import { JpgToPng } from "@/tools/jpg-to-png/JpgToPng";
import { WebpToJpg } from "@/tools/webp-to-jpg/WebpToJpg";
import { PngToJpg } from "@/tools/png-to-jpg/PngToJpg";
import { WebpToPng } from "@/tools/webp-to-png/WebpToPng";
import { ImageCropper } from "@/tools/image-cropper/ImageCropper";
import { WordCounter } from "@/tools/word-counter/WordCounter";
import { CharacterCounter } from "@/tools/character-counter/CharacterCounter";
import { CaseConverter } from "@/tools/case-converter/CaseConverter";
import { RemoveDuplicateLines } from "@/tools/remove-duplicate-lines/RemoveDuplicateLines";
import { TextSorter } from "@/tools/text-sorter/TextSorter";
import { PasswordGenerator } from "@/tools/password-generator/PasswordGenerator";
import { UuidGenerator } from "@/tools/uuid-generator/UuidGenerator";
import { RandomNumberGenerator } from "@/tools/random-number-generator/RandomNumberGenerator";
import { PercentageCalculator } from "@/tools/percentage-calculator/PercentageCalculator";
import { DiscountCalculator } from "@/tools/discount-calculator/DiscountCalculator";
import { AgeCalculator } from "@/tools/age-calculator/AgeCalculator";
import { DateCalculator } from "@/tools/date-calculator/DateCalculator";
import { BmiCalculator } from "@/tools/bmi-calculator/BmiCalculator";
import { JsonFormatter } from "@/tools/json-formatter/JsonFormatter";
import { Base64Encoder } from "@/tools/base64-encoder/Base64Encoder";
import { Base64Decoder } from "@/tools/base64-decoder/Base64Decoder";
import { UnitConverter } from "@/tools/unit-converter/UnitConverter";
import { LoremIpsumGenerator } from "@/tools/lorem-ipsum-generator/LoremIpsumGenerator";
import { UrlEncoderDecoder } from "@/tools/url-encoder-decoder/UrlEncoderDecoder";
import { ImageToBase64 } from "@/tools/image-to-base64/ImageToBase64";
import { HtmlEntityEncoderDecoder } from "@/tools/html-entity-encoder-decoder/HtmlEntityEncoderDecoder";
import { EpochTimestampConverter } from "@/tools/epoch-timestamp-converter/EpochTimestampConverter";
import { TextDiffChecker } from "@/tools/text-diff-checker/TextDiffChecker";
import { MarkdownToHtml } from "@/tools/markdown-to-html/MarkdownToHtml";
import { RegexTester } from "@/tools/regex-tester/RegexTester";
import { JsonXmlConverter } from "@/tools/json-xml-converter/JsonXmlConverter";
import { SvgToPngConverter } from "@/tools/svg-to-png-converter/SvgToPngConverter";
import { ColorPaletteGenerator } from "@/tools/color-palette-generator/ColorPaletteGenerator";
import { SqlFormatter } from "@/tools/sql-formatter/SqlFormatter";
import { JsonValidator } from "@/tools/json-validator/JsonValidator";
import { Md5HashGenerator } from "@/tools/md5-hash-generator/Md5HashGenerator";
import { Sha256HashGenerator } from "@/tools/sha256-hash-generator/Sha256HashGenerator";
import { PasswordStrengthMeter } from "@/tools/password-strength-meter/PasswordStrengthMeter";

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
  "png-to-jpg": PngToJpg,
  "webp-to-png": WebpToPng,
  "image-cropper": ImageCropper,
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
  "discount-calculator": DiscountCalculator,
  "age-calculator": AgeCalculator,
  "date-calculator": DateCalculator,
  "bmi-calculator": BmiCalculator,
  "json-formatter": JsonFormatter,
  "base64-encoder": Base64Encoder,
  "base64-decoder": Base64Decoder,
  "unit-converter": UnitConverter,
  "lorem-ipsum-generator": LoremIpsumGenerator,
  "url-encoder-decoder": UrlEncoderDecoder,
  "image-to-base64": ImageToBase64,
  "html-entity-encoder-decoder": HtmlEntityEncoderDecoder,
  "epoch-timestamp-converter": EpochTimestampConverter,
  "text-diff-checker": TextDiffChecker,
  "markdown-to-html": MarkdownToHtml,
  "regex-tester": RegexTester,
  "json-xml-converter": JsonXmlConverter,
  "svg-to-png-converter": SvgToPngConverter,
  "color-palette-generator": ColorPaletteGenerator,
  "sql-formatter": SqlFormatter,
  "json-validator": JsonValidator,
  "md5-hash-generator": Md5HashGenerator,
  "sha256-hash-generator": Sha256HashGenerator,
  "password-strength-meter": PasswordStrengthMeter,
};

export function getToolComponent(slug: string): ComponentType | undefined {
  return toolComponents[slug];
}
