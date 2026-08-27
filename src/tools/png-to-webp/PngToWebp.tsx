"use client";

import { ImageFormatConverter } from "@/components/ImageFormatConverter";
import type { ConverterConfig } from "@/components/ImageFormatConverter";
import { useTranslation } from "@/i18n/LanguageProvider";

export function PngToWebp() {
  const { t } = useTranslation();
  const config: ConverterConfig = {
    acceptedTypes: ["image/png"],
    acceptedExtensions: ".png",
    outputFormat: "image/webp",
    outputExtension: "webp",
    outputLabel: "WebP",
    supportsQuality: true,
    defaultQuality: 0.85,
    dropLabel: t("common.dropPngHere"),
    dropHint: t("common.convertedToWebp"),
  };
  return <ImageFormatConverter config={config} />;
}
