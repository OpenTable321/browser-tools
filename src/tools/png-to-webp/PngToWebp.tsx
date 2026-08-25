"use client";

import { ImageFormatConverter } from "@/components/ImageFormatConverter";
import type { ConverterConfig } from "@/components/ImageFormatConverter";

const config: ConverterConfig = {
  acceptedTypes: ["image/png"],
  acceptedExtensions: ".png",
  outputFormat: "image/webp",
  outputExtension: "webp",
  outputLabel: "WebP",
  supportsQuality: true,
  defaultQuality: 0.85,
  dropLabel: "Drop a PNG image here or click to upload",
  dropHint: "Converted to WebP entirely in your browser — no uploads",
};

export function PngToWebp() {
  return <ImageFormatConverter config={config} />;
}
