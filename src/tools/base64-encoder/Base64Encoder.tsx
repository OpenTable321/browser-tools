"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

export function Base64Encoder() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function encode() {
    setError(null);
    if (!input) {
      setError(t("common.pleaseEnterText"));
      setOutput("");
      return;
    }
    try {
      setOutput(encodeBase64(input));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.error"));
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="b64-enc-input" className="mb-2 block text-sm font-medium text-slate-600">
          {t("common.textToEncode")}
        </label>
        <textarea
          id="b64-enc-input"
          value={input}
          onChange={(e) => { setInput(e.target.value); setOutput(""); setError(null); }}
          placeholder={t("common.enterTextToEncodeB64")}
          className="input-field min-h-[150px] resize-y font-mono text-sm"
          spellCheck={false}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={encode} className="btn-primary">
          {t("common.encodeToBase64")}
        </button>
        {output && <CopyButton text={output} label="Base64" />}
        <button
          onClick={() => { setInput(""); setOutput(""); setError(null); }}
          disabled={!input}
          className="btn-secondary"
        >
          {t("common.clear")}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {output && (
        <div>
          <label htmlFor="b64-enc-output" className="mb-2 block text-sm font-medium text-slate-600">
            {t("common.base64Result")}
          </label>
          <textarea
            id="b64-enc-output"
            value={output}
            readOnly
            className="input-field min-h-[150px] resize-y font-mono text-sm"
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
}
