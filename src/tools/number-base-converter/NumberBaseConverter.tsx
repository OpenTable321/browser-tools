"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function NumberBaseConverter() {
  const { t } = useTranslation();
  const [decimal, setDecimal] = useState("");

  const num = parseInt(decimal, 10);
  const valid = decimal !== "" && !isNaN(num);

  const binary = valid ? num.toString(2) : "";
  const octal = valid ? num.toString(8) : "";
  const hex = valid ? num.toString(16).toUpperCase() : "";
  const base36 = valid ? num.toString(36).toUpperCase() : "";

  const fields = [
    { label: t("common.nbcBinary"), value: binary, base: 2 },
    { label: t("common.nbcOctal"), value: octal, base: 8 },
    { label: t("common.nbcDecimal"), value: valid ? num.toString() : "", base: 10 },
    { label: t("common.nbcHex"), value: hex, base: 16 },
    { label: t("common.nbcBase36"), value: base36, base: 36 },
  ];

  function handleChange(value: string, base: number) {
    const n = parseInt(value, base);
    if (!isNaN(n)) setDecimal(n.toString());
    else if (value === "") setDecimal("");
  }

  return (
    <div className="space-y-4">
      {fields.map((f) => (
        <div key={f.base}>
          <label className="mb-1 block text-sm font-medium text-slate-700">{f.label}</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={f.value}
              onChange={(e) => handleChange(e.target.value, f.base)}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {f.value && <CopyButton text={f.value} />}
          </div>
        </div>
      ))}
    </div>
  );
}
