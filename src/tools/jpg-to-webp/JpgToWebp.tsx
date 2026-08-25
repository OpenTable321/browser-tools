"use client";

import { ImageFormatConverter } from "@/components/ImageFormatConverter";
import type { ConverterConfig } from "@/components/ImageFormatConverter";

const config: ConverterConfig = {
  acceptedTypes: ["image/jpeg"],
  acceptedExtensions: ".jpg,.jpeg",
  outputFormat: "image/webp",
  outputExtension: "webp",
  outputLabel: "WebP",
  supportsQuality: true,
  defaultQuality: 0.85,
  dropLabel: "Drop a JPG image here or click to upload",
  dropHint: "Converted to WebP entirely in your browser — no uploads",
};

export function JpgToWebp() {
  return <ImageFormatConverter config={config} />;
}
