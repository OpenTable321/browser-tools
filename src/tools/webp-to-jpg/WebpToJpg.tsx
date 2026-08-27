"use client";

import { ImageFormatConverter } from "@/components/ImageFormatConverter";
import type { ConverterConfig } from "@/components/ImageFormatConverter";
import { useTranslation } from "@/i18n/LanguageProvider";

export function WebpToJpg() {
  const { t } = useTranslation();
  const config: ConverterConfig = {
    acceptedTypes: ["image/webp"],
    acceptedExtensions: ".webp",
    outputFormat: "image/jpeg",
    outputExtension: "jpg",
    outputLabel: "JPG",
    supportsQuality: true,
    defaultQuality: 0.85,
    dropLabel: t("common.dropWebpHere"),
    dropHint: t("common.convertedToJpg"),
  };
  return <ImageFormatConverter config={config} />;
}
