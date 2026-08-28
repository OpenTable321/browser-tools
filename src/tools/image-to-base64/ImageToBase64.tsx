"use client";

import { useCallback, useRef, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";
import { formatBytes } from "@/lib/image-utils";

type OutputMode = "dataUrl" | "html" | "css";

interface ImageInfo {
  name: string;
  size: number;
  type: string;
  width: number;
  height: number;
  dataUrl: string;
}

export function ImageToBase64() {
  const { t } = useTranslation();
  const [image, setImage] = useState<ImageInfo | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outputMode, setOutputMode] = useState<OutputMode>("dataUrl");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError(t("common.pleaseSelectImage"));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(t("common.imageToBase64SizeLimit"));
      return;
    }

    setError(null);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        setError(t("common.failedToReadFile"));
        setIsProcessing(false);
        return;
      }

      const img = new Image();
      img.onload = () => {
        setImage({
          name: file.name,
          size: file.size,
          type: file.type,
          width: img.naturalWidth,
          height: img.naturalHeight,
          dataUrl,
        });
        setIsProcessing(false);
      };
      img.onerror = () => {
        setError(t("common.failedToLoadImage"));
        setIsProcessing(false);
      };
      img.src = dataUrl;
    };
    reader.onerror = () => {
      setError(t("common.failedToReadFile"));
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  }, [t]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }

  function handleReset() {
    setImage(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function getOutput(): string {
    if (!image) return "";
    if (outputMode === "dataUrl") return image.dataUrl;
    if (outputMode === "html")
      return `<img src="${image.dataUrl}" alt="${image.name}" width="${image.width}" height="${image.height}" />`;
    return `background-image: url("${image.dataUrl}");`;
  }

  const output = getOutput();

  return (
    <div className="space-y-6">
      {!image && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={t("common.uploadImage")}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed py-16 transition focus:outline-none focus:ring-2 focus:ring-brand-500 ${
            isDragging
              ? "border-brand-500 bg-brand-50"
              : "border-slate-300 bg-slate-50 hover:border-brand-400 hover:bg-brand-50/50"
          }`}
        >
          <svg
            className="h-12 w-12 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mt-4 text-lg font-medium text-slate-700">
            {t("common.dropImageHere")}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {t("common.imageToBase64Formats")}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isProcessing && (
        <div className="text-center text-sm text-slate-500">
          {t("common.processing")}
        </div>
      )}

      {image && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">
              {t("common.file")}: <span className="text-slate-900">{image.name}</span>
            </p>
            <button
              onClick={handleReset}
              className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
            >
              {t("common.chooseDifferentImage")}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                {t("common.preview")}
              </h3>
              <div className="flex items-center justify-center overflow-hidden rounded-lg bg-slate-50" style={{ minHeight: "150px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.dataUrl}
                  alt={image.name}
                  className="max-h-48 object-contain"
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                {t("common.imageInfo")}
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">{t("common.dimensions")}</dt>
                  <dd className="font-medium text-slate-900">{image.width}×{image.height}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">{t("common.size")}</dt>
                  <dd className="font-medium text-slate-900">{formatBytes(image.size)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">{t("common.format")}</dt>
                  <dd className="font-medium text-slate-900">{image.type.split("/")[1]?.toUpperCase()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">{t("common.base64Length")}</dt>
                  <dd className="font-medium text-slate-900">{formatBytes(image.dataUrl.length)}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                {t("common.outputFormat")}
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setOutputMode("dataUrl")}
                  className={`rounded-lg px-4 py-2 text-left text-sm font-medium transition ${
                    outputMode === "dataUrl"
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {t("common.base64DataUrl")}
                </button>
                <button
                  onClick={() => setOutputMode("html")}
                  className={`rounded-lg px-4 py-2 text-left text-sm font-medium transition ${
                    outputMode === "html"
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {t("common.htmlImgTag")}
                </button>
                <button
                  onClick={() => setOutputMode("css")}
                  className={`rounded-lg px-4 py-2 text-left text-sm font-medium transition ${
                    outputMode === "css"
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {t("common.cssBackgroundImage")}
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="base64-output"
                className="block text-sm font-medium text-slate-600"
              >
                {outputMode === "dataUrl"
                  ? t("common.base64DataUrl")
                  : outputMode === "html"
                    ? t("common.htmlImgTag")
                    : t("common.cssBackgroundImage")}
              </label>
              <CopyButton text={output} label={t("common.result")} />
            </div>
            <textarea
              id="base64-output"
              value={output}
              readOnly
              className="input-field min-h-[200px] resize-y font-mono text-xs"
              spellCheck={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
