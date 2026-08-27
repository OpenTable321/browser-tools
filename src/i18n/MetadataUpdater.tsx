"use client";

import { useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

interface MetadataUpdaterProps {
  titleKey?: string;
  descriptionKey?: string;
  titleVars?: Record<string, string | number>;
  descriptionVars?: Record<string, string | number>;
}

export function MetadataUpdater({
  titleKey,
  descriptionKey,
  titleVars,
  descriptionVars,
}: MetadataUpdaterProps) {
  const { t, locale } = useLanguage();

  useEffect(() => {
    if (titleKey) {
      const title = t(titleKey, titleVars);
      document.title = title;
    } else {
      document.title = t("site.title");
    }

    if (descriptionKey) {
      const desc = t(descriptionKey, descriptionVars);
      let meta = document.querySelector(
        'meta[name="description"]',
      ) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = desc;
    }

    const ogTitle = document.querySelector(
      'meta[property="og:title"]',
    ) as HTMLMetaElement | null;
    if (ogTitle) {
      ogTitle.content = titleKey ? t(titleKey, titleVars) : t("site.title");
    }

    const ogDesc = document.querySelector(
      'meta[property="og:description"]',
    ) as HTMLMetaElement | null;
    if (ogDesc) {
      ogDesc.content = descriptionKey
        ? t(descriptionKey, descriptionVars)
        : t("site.description");
    }
  }, [t, locale, titleKey, descriptionKey, titleVars, descriptionVars]);

  return null;
}
