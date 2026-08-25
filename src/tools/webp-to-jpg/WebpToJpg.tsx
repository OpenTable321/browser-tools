"use client";

import { ImageFormatConverter } from "@/components/ImageFormatConverter";
import type { ConverterConfig } from "@/components/ImageFormatConverter";

const config: ConverterConfig = {
  acceptedTypes: ["image/webp"],
  acceptedExtensions: ".webp",
  outputFormat: "image/jpeg",
  outputExtension: "jpg",
  outputLabel: "JPG",
  supportsQuality: true,
  defaultQuality: 0.85,
  dropLabel: "Drop a WebP image here or click to upload",
  dropHint: "Converted to JPG entirely in your browser — no uploads",
};

export function WebpToJpg() {
  return <ImageFormatConverter config={config} />;
}
