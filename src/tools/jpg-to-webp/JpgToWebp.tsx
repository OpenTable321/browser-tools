"use client";

import { ImageFormatConverter } from "@/components/ImageFormatConverter";
import type { ConverterConfig } from "@/components/ImageFormatConverter";
import { useTranslation } from "@/i18n/LanguageProvider";

export function JpgToWebp() {
  const { t } = useTranslation();
  const config: ConverterConfig = {
    acceptedTypes: ["image/jpeg"],
    acceptedExtensions: ".jpg,.jpeg",
    outputFormat: "image/webp",
    outputExtension: "webp",
    outputLabel: "WebP",
    supportsQuality: true,
    defaultQuality: 0.85,
    dropLabel: t("common.dropJpgHere"),
    dropHint: t("common.convertedToWebp"),
  };
  return <ImageFormatConverter config={config} />;
}
