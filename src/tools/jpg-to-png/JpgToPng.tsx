"use client";

import { ImageFormatConverter } from "@/components/ImageFormatConverter";
import type { ConverterConfig } from "@/components/ImageFormatConverter";

const config: ConverterConfig = {
  acceptedTypes: ["image/jpeg"],
  acceptedExtensions: ".jpg,.jpeg",
  outputFormat: "image/png",
  outputExtension: "png",
  outputLabel: "PNG",
  supportsQuality: false,
  defaultQuality: 1,
  dropLabel: "Drop a JPG image here or click to upload",
  dropHint: "Converted to PNG entirely in your browser — no uploads",
};

export function JpgToPng() {
  return <ImageFormatConverter config={config} />;
}
