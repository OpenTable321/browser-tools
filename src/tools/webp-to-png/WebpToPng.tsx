"use client";

import { ImageFormatConverter } from "@/components/ImageFormatConverter";
import type { ConverterConfig } from "@/components/ImageFormatConverter";

const config: ConverterConfig = {
  acceptedTypes: ["image/webp"],
  acceptedExtensions: ".webp",
  outputFormat: "image/png",
  outputExtension: "png",
  outputLabel: "PNG",
  supportsQuality: false,
  defaultQuality: 1,
  dropLabel: "Drop a WebP image here or click to upload",
  dropHint: "Converted to PNG entirely in your browser — no uploads",
};

export function WebpToPng() {
  return <ImageFormatConverter config={config} />;
}
