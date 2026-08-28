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
import { UrlParser } from "@/tools/url-parser/UrlParser";
import { HtmlStripper } from "@/tools/html-stripper/HtmlStripper";
import { UrlSlugGenerator } from "@/tools/url-slug-generator/UrlSlugGenerator";
import { TextReplacer } from "@/tools/text-replacer/TextReplacer";
import { NumberBaseConverter } from "@/tools/number-base-converter/NumberBaseConverter";
import { HexRgbConverter } from "@/tools/hex-rgb-converter/HexRgbConverter";
import { JwtDecoder } from "@/tools/jwt-decoder/JwtDecoder";
import { MorseCodeTranslator } from "@/tools/morse-code-translator/MorseCodeTranslator";
import { BinaryTextConverter } from "@/tools/binary-text-converter/BinaryTextConverter";
import { TextPrefixSuffix } from "@/tools/text-prefix-suffix/TextPrefixSuffix";
import { ListRandomizer } from "@/tools/list-randomizer/ListRandomizer";
import { UserAgentParser } from "@/tools/user-agent-parser/UserAgentParser";
import { HtmlEncoderDecoder } from "@/tools/html-encoder-decoder/HtmlEncoderDecoder";
import { CsvJsonConverter } from "@/tools/csv-json-converter/CsvJsonConverter";
import { XmlFormatter } from "@/tools/xml-formatter/XmlFormatter";
import { CssMinifier } from "@/tools/css-minifier/CssMinifier";
import { ContrastChecker } from "@/tools/contrast-checker/ContrastChecker";
import { LoanCalculator } from "@/tools/loan-calculator/LoanCalculator";
import { TextLineCounter } from "@/tools/text-line-counter/TextLineCounter";
import { CronExpressionGenerator } from "@/tools/cron-expression-generator/CronExpressionGenerator";
import { CssGradientGenerator } from "@/tools/css-gradient-generator/CssGradientGenerator";
import { SalesTaxCalculator } from "@/tools/sales-tax-calculator/SalesTaxCalculator";
import { RandomChoicePicker } from "@/tools/random-choice-picker/RandomChoicePicker";
import { CssBoxShadowGenerator } from "@/tools/css-box-shadow-generator/CssBoxShadowGenerator";
import { DataSizeConverter } from "@/tools/data-size-converter/DataSizeConverter";
import { TemperatureConverter } from "@/tools/temperature-converter/TemperatureConverter";
import { LengthConverter } from "@/tools/length-converter/LengthConverter";
import { WeightConverter } from "@/tools/weight-converter/WeightConverter";
import { HexBase64Converter } from "@/tools/hex-base64-converter/HexBase64Converter";
import { UnicodeInspector } from "@/tools/unicode-inspector/UnicodeInspector";
import { RandomStringGenerator } from "@/tools/random-string-generator/RandomStringGenerator";
import { AsciiArtGenerator } from "@/tools/ascii-art-generator/AsciiArtGenerator";
import { TextAnonymizer } from "@/tools/text-anonymizer/TextAnonymizer";
import { MarkdownTableGenerator } from "@/tools/markdown-table-generator/MarkdownTableGenerator";
import { JsonPathFinder } from "@/tools/json-path-finder/JsonPathFinder";
import { CssGlassmorphismStudio } from "@/tools/css-glassmorphism-studio/CssGlassmorphismStudio";
import { CssClipPathMaker } from "@/tools/css-clip-path-maker/CssClipPathMaker";
import { ColorblindSimulator } from "@/tools/colorblind-simulator/ColorblindSimulator";
import { SocialMetaPreviewer } from "@/tools/social-meta-previewer/SocialMetaPreviewer";
import { NginxFormatter } from "@/tools/nginx-formatter/NginxFormatter";
import { CsvToSqlConverter } from "@/tools/csv-to-sql-converter/CsvToSqlConverter";
import { HomoglyphDetector } from "@/tools/homoglyph-detector/HomoglyphDetector";
import { JwtSpoofingSimulator } from "@/tools/jwt-spoofing-simulator/JwtSpoofingSimulator";
import { SvgPathEditor } from "@/tools/svg-path-editor/SvgPathEditor";
import { CanvasCodePainter } from "@/tools/canvas-code-painter/CanvasCodePainter";
import { CssAnimationStudio } from "@/tools/css-animation-studio/CssAnimationStudio";
import { CookieExplorer } from "@/tools/cookie-explorer/CookieExplorer";
import { ExifLocationPlotter } from "@/tools/exif-location-plotter/ExifLocationPlotter";
import { AudioTagReader } from "@/tools/audio-tag-reader/AudioTagReader";

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
  "url-parser": UrlParser,
  "html-stripper": HtmlStripper,
  "url-slug-generator": UrlSlugGenerator,
  "text-replacer": TextReplacer,
  "number-base-converter": NumberBaseConverter,
  "hex-rgb-converter": HexRgbConverter,
  "jwt-decoder": JwtDecoder,
  "morse-code-translator": MorseCodeTranslator,
  "binary-text-converter": BinaryTextConverter,
  "text-prefix-suffix": TextPrefixSuffix,
  "list-randomizer": ListRandomizer,
  "user-agent-parser": UserAgentParser,
  "html-encoder-decoder": HtmlEncoderDecoder,
  "csv-json-converter": CsvJsonConverter,
  "xml-formatter": XmlFormatter,
  "css-minifier": CssMinifier,
  "contrast-checker": ContrastChecker,
  "loan-calculator": LoanCalculator,
  "text-line-counter": TextLineCounter,
  "cron-expression-generator": CronExpressionGenerator,
  "css-gradient-generator": CssGradientGenerator,
  "sales-tax-calculator": SalesTaxCalculator,
  "random-choice-picker": RandomChoicePicker,
  "css-box-shadow-generator": CssBoxShadowGenerator,
  "data-size-converter": DataSizeConverter,
  "temperature-converter": TemperatureConverter,
  "length-converter": LengthConverter,
  "weight-converter": WeightConverter,
  "hex-base64-converter": HexBase64Converter,
  "unicode-inspector": UnicodeInspector,
  "random-string-generator": RandomStringGenerator,
  "ascii-art-generator": AsciiArtGenerator,
  "text-anonymizer": TextAnonymizer,
  "markdown-table-generator": MarkdownTableGenerator,
  "json-path-finder": JsonPathFinder,
  "css-glassmorphism-studio": CssGlassmorphismStudio,
  "css-clip-path-maker": CssClipPathMaker,
  "colorblind-simulator": ColorblindSimulator,
  "social-meta-previewer": SocialMetaPreviewer,
  "nginx-formatter": NginxFormatter,
  "csv-to-sql-converter": CsvToSqlConverter,
  "homoglyph-detector": HomoglyphDetector,
  "jwt-spoofing-simulator": JwtSpoofingSimulator,
  "svg-path-editor": SvgPathEditor,
  "canvas-code-painter": CanvasCodePainter,
  "css-animation-studio": CssAnimationStudio,
  "cookie-explorer": CookieExplorer,
  "exif-location-plotter": ExifLocationPlotter,
  "audio-tag-reader": AudioTagReader,
};

export function getToolComponent(slug: string): ComponentType | undefined {
  return toolComponents[slug];
}
