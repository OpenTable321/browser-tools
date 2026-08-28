"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseInline(text: string): string {
  let result = text;

  result = result.replace(/`([^`]+)`/g, (_, code) =>
    `<code>${escapeHtml(code)}</code>`,
  );

  result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) =>
    `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`,
  );

  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, label, href) =>
      `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`,
  );

  result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/__([^_]+)__/g, "<strong>$1</strong>");

  result = result.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  result = result.replace(/_([^_]+)_/g, "<em>$1</em>");

  result = result.replace(/~~([^~]+)~~/g, "<del>$1</del>");

  return result;
}

function parseMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!;

    if (!line.trim()) {
      i++;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1]!.length;
      html.push(`<h${level}>${parseInline(headingMatch[2]!)}</h${level}>`);
      i++;
      continue;
    }

    if (/^[-*+]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i]!)) {
        const itemText = lines[i]!.replace(/^[-*+]\s+/, "");
        items.push(`<li>${parseInline(itemText)}</li>`);
        i++;
      }
      html.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i]!)) {
        const itemText = lines[i]!.replace(/^\d+\.\s+/, "");
        items.push(`<li>${parseInline(itemText)}</li>`);
        i++;
      }
      html.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    if (/^>\s/.test(line)) {
      const blockquoteLines: string[] = [];
      while (i < lines.length && /^>\s/.test(lines[i]!)) {
        blockquoteLines.push(lines[i]!.replace(/^>\s+/, ""));
        i++;
      }
      html.push(
        `<blockquote>${parseInline(blockquoteLines.join(" "))}</blockquote>`,
      );
      continue;
    }

    if (/^```/.test(line)) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i]!)) {
        codeLines.push(lines[i]!);
        i++;
      }
      i++;
      html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      continue;
    }

    if (/^---+\s*$/.test(line)) {
      html.push("<hr />");
      i++;
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i]!.trim() &&
      !/^(#{1,6}\s|[-*+]\s|\d+\.\s|>\s|```|---+\s*$)/.test(lines[i]!)
    ) {
      paraLines.push(lines[i]!);
      i++;
    }
    if (paraLines.length > 0) {
      html.push(`<p>${parseInline(paraLines.join(" "))}</p>`);
    }
  }

  return html.join("\n");
}

export function MarkdownToHtml() {
  const { t } = useTranslation();
  const [markdown, setMarkdown] = useState("");
  const [view, setView] = useState<"split" | "preview" | "html">("split");

  const html = useMemo(() => {
    if (!markdown) return "";
    return parseMarkdown(markdown);
  }, [markdown]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-lg border border-slate-300 p-1">
          <button
            onClick={() => setView("split")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              view === "split"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t("common.splitView")}
          </button>
          <button
            onClick={() => setView("preview")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              view === "preview"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t("common.preview")}
          </button>
          <button
            onClick={() => setView("html")}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              view === "html"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t("common.htmlCode")}
          </button>
        </div>
        {html && <CopyButton text={html} label={t("common.htmlCode")} />}
      </div>

      <div
        className={`grid gap-4 ${
          view === "split" ? "md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {(view === "split" || view === "preview") && (
          <div className={view === "split" ? "" : "hidden"}>
            <label
              htmlFor="md-input"
              className="mb-2 block text-sm font-medium text-slate-600"
            >
              {t("common.markdownInput")}
            </label>
            <textarea
              id="md-input"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder={t("common.markdownPlaceholder")}
              className="input-field min-h-[400px] resize-y font-mono text-sm"
              spellCheck={false}
            />
          </div>
        )}

        {view === "split" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.livePreview")}
            </label>
            <div className="min-h-[400px] overflow-y-auto rounded-lg border border-slate-300 bg-white p-4">
              {markdown ? (
                <div
                  className="prose prose-sm max-w-none prose-headings:font-bold prose-a:text-brand-600 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-pre:bg-slate-900 prose-pre:text-slate-100"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : (
                <p className="text-sm text-slate-400">
                  {t("common.previewEmpty")}
                </p>
              )}
            </div>
          </div>
        )}

        {view === "preview" && (
          <div>
            <div className="min-h-[400px] overflow-y-auto rounded-lg border border-slate-300 bg-white p-4">
              {markdown ? (
                <div
                  className="prose prose-sm max-w-none prose-headings:font-bold prose-a:text-brand-600 prose-code:rounded prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-pre:bg-slate-900 prose-pre:text-slate-100"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : (
                <p className="text-sm text-slate-400">
                  {t("common.previewEmpty")}
                </p>
              )}
            </div>
          </div>
        )}

        {view === "html" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.htmlOutput")}
            </label>
            <textarea
              readOnly
              value={html}
              className="input-field min-h-[400px] resize-y font-mono text-sm"
              spellCheck={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
