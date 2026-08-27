"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label = "Copy", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignore
      }
      document.body.removeChild(textarea);
    }
  }

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className={className ?? "btn-secondary"}
      aria-label={t("common.copyAria", { label })}
    >
      {copied ? t("common.copied") : `${t("common.copy")} ${label}`}
    </button>
  );
}
