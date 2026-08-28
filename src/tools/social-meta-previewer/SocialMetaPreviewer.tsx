"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function SocialMetaPreviewer() {
  const { t } = useTranslation();
  const [title, setTitle] = useState("My Awesome Website");
  const [description, setDescription] = useState("Check out this amazing website with great content and features.");
  const [siteName, setSiteName] = useState("MySite");
  const [url, setUrl] = useState("https://example.com");
  const [image, setImage] = useState("https://example.com/og-image.png");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.socialTitle")}</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.socialSiteName")}</label>
          <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.socialDescription")}</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.socialURL")}</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">{t("common.socialImage")}</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Google SERP */}
        <div>
          <h3 className="mb-2 text-sm font-medium text-slate-700">{t("common.socialGoogle")}</h3>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs text-green-700">{url}</div>
            <div className="text-lg text-blue-700 hover:underline cursor-pointer">{title}</div>
            <div className="text-sm text-slate-600">{description}</div>
          </div>
        </div>

        {/* Facebook */}
        <div>
          <h3 className="mb-2 text-sm font-medium text-slate-700">{t("common.socialFacebook")}</h3>
          <div className="max-w-md overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="flex h-48 items-center justify-center bg-slate-100 text-slate-400 text-sm">{t("common.socialImagePreview")}</div>
            <div className="p-3 bg-slate-50">
              <div className="text-xs uppercase text-slate-500">{siteName}</div>
              <div className="text-sm font-semibold text-slate-800 truncate">{title}</div>
              <div className="text-xs text-slate-500 line-clamp-2">{description}</div>
            </div>
          </div>
        </div>

        {/* Twitter/X */}
        <div>
          <h3 className="mb-2 text-sm font-medium text-slate-700">{t("common.socialTwitter")}</h3>
          <div className="max-w-md overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="flex h-32 items-center justify-center bg-slate-100 text-slate-400 text-sm">{t("common.socialImagePreview")}</div>
            <div className="p-3">
              <div className="text-xs text-slate-500">{url}</div>
              <div className="text-sm font-semibold text-slate-800 truncate">{title}</div>
              <div className="text-xs text-slate-500 line-clamp-2">{description}</div>
            </div>
          </div>
        </div>

        {/* Discord */}
        <div>
          <h3 className="mb-2 text-sm font-medium text-slate-700">{t("common.socialDiscord")}</h3>
          <div className="max-w-md overflow-hidden rounded-lg border-l-4 border-blue-500 bg-slate-800 p-0">
            <div className="flex h-32 items-center justify-center bg-slate-700 text-slate-400 text-sm">{t("common.socialImagePreview")}</div>
            <div className="p-3">
              <div className="text-sm font-semibold text-white">{siteName}</div>
              <div className="text-sm font-medium text-blue-400">{title}</div>
              <div className="text-xs text-slate-300 line-clamp-2">{description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
