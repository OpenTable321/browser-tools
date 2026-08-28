"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function TextAnonymizer() {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [maskEmail, setMaskEmail] = useState(true);
  const [maskPhone, setMaskPhone] = useState(true);
  const [maskIP, setMaskIP] = useState(true);

  function anonymize(input: string): string {
    let result = input;
    if (maskEmail) result = result.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL_REDACTED]");
    if (maskPhone) result = result.replace(/(\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{2,4}/g, "[PHONE_REDACTED]");
    if (maskIP) result = result.replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, "[IP_REDACTED]");
    return result;
  }

  const output = anonymize(text);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={maskEmail} onChange={(e) => setMaskEmail(e.target.checked)} className="rounded" /> {t("common.anonEmail")}
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={maskPhone} onChange={(e) => setMaskPhone(e.target.checked)} className="rounded" /> {t("common.anonPhone")}
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={maskIP} onChange={(e) => setMaskIP(e.target.checked)} className="rounded" /> {t("common.anonIP")}
        </label>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.anonInput")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("common.anonPlaceholder")} className="h-40 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      {output && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.anonOutput")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="h-40 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">{output}</pre>
        </div>
      )}
    </div>
  );
}
