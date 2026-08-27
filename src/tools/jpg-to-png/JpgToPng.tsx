"use client";

import { ImageFormatConverter } from "@/components/ImageFormatConverter";
import type { ConverterConfig } from "@/components/ImageFormatConverter";
import { useTranslation } from "@/i18n/LanguageProvider";

export function JpgToPng() {
  const { t } = useTranslation();
  const config: ConverterConfig = {
    acceptedTypes: ["image/jpeg"],
    acceptedExtensions: ".jpg,.jpeg",
    outputFormat: "image/png",
    outputExtension: "png",
    outputLabel: "PNG",
    supportsQuality: false,
    defaultQuality: 1,
    dropLabel: t("common.dropJpgHere"),
    dropHint: t("common.convertedToPng"),
  };
  return <ImageFormatConverter config={config} />;
}
