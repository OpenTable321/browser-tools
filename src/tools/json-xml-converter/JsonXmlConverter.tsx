"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

type Mode = "json-to-xml" | "xml-to-json";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function jsonToXml(value: unknown, rootName: string, indent: number): string {
  const pad = "  ".repeat(indent);

  if (value === null) {
    return `${pad}<${rootName} type="null" />`;
  }

  if (typeof value === "string") {
    return `${pad}<${rootName}>${escapeXml(value)}</${rootName}>`;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return `${pad}<${rootName}>${String(value)}</${rootName}>`;
  }

  if (Array.isArray(value)) {
    const items = value
      .map((item) => jsonToXml(item, "item", indent + 1))
      .join("\n");
    return `${pad}<${rootName}>\n${items}\n${pad}</${rootName}>`;
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const children = Object.entries(obj)
      .map(([key, val]) => jsonToXml(val, key, indent + 1))
      .join("\n");
    return `${pad}<${rootName}>\n${children}\n${pad}</${rootName}>`;
  }

  return `${pad}<${rootName}>${escapeXml(String(value))}</${rootName}>`;
}

function xmlToJson(xml: string): unknown {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");

  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    throw new Error("Invalid XML: " + parseError.textContent?.slice(0, 100));
  }

  if (!doc.documentElement) {
    throw new Error("Invalid XML: no root element found");
  }

  function elementToJson(el: Element): unknown {
    const children = Array.from(el.children);

    if (children.length === 0) {
      const text = el.textContent?.trim() ?? "";
      if (text === "") return null;
      if (text === "true") return true;
      if (text === "false") return false;
      if (text === "null") return null;
      const num = Number(text);
      if (!isNaN(num) && text !== "") return num;
      return text;
    }

    const obj: Record<string, unknown> = {};

    const grouped: Record<string, Element[]> = {};
    for (const child of children) {
      const tag = child.tagName;
      if (!grouped[tag]) grouped[tag] = [];
      grouped[tag].push(child);
    }

    for (const [tag, els] of Object.entries(grouped)) {
      if (els.length > 1) {
        obj[tag] = els.map((e) => elementToJson(e));
      } else {
        obj[tag] = elementToJson(els[0]!);
      }
    }

    return obj;
  }

  const result: Record<string, unknown> = {};
  result[doc.documentElement.tagName] = elementToJson(doc.documentElement);
  return result;
}

export function JsonXmlConverter() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>("json-to-xml");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function convert() {
    setError(null);
    if (!input.trim()) {
      setError(t("common.pleaseEnterJsonXml"));
      setOutput("");
      return;
    }

    try {
      if (mode === "json-to-xml") {
        const parsed = JSON.parse(input);
        const xml = jsonToXml(parsed, "root", 0);
        setOutput(`<?xml version="1.0" encoding="UTF-8"?>\n${xml}`);
      } else {
        const json = xmlToJson(input);
        setOutput(JSON.stringify(json, null, 2));
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : t("common.failedToConvertJsonXml"),
      );
      setOutput("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex rounded-lg border border-slate-300 p-1">
          <button
            onClick={() => { setMode("json-to-xml"); setOutput(""); setError(null); }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              mode === "json-to-xml"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t("common.jsonToXml")}
          </button>
          <button
            onClick={() => { setMode("xml-to-json"); setOutput(""); setError(null); }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              mode === "xml-to-json"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t("common.xmlToJson")}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="jsonxml-input"
          className="mb-2 block text-sm font-medium text-slate-600"
        >
          {mode === "json-to-xml" ? t("common.jsonInput") : t("common.xmlInput")}
        </label>
        <textarea
          id="jsonxml-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOutput("");
            setError(null);
          }}
          placeholder={
            mode === "json-to-xml"
              ? t("common.jsonInputPlaceholder")
              : t("common.xmlInputPlaceholder")
          }
          className="input-field min-h-[200px] resize-y font-mono text-sm"
          spellCheck={false}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={convert} className="btn-primary">
          {t("common.convert")}
        </button>
        {output && <CopyButton text={output} label={t("common.result")} />}
        <button
          onClick={() => {
            setInput("");
            setOutput("");
            setError(null);
          }}
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
          <label
            htmlFor="jsonxml-output"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            {mode === "json-to-xml" ? t("common.xmlOutput") : t("common.jsonOutput")}
          </label>
          <textarea
            id="jsonxml-output"
            value={output}
            readOnly
            className="input-field min-h-[200px] resize-y font-mono text-sm"
            spellCheck={false}
          />
        </div>
      )}
    </div>
  );
}
