"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

export function NginxFormatter() {
  const { t } = useTranslation();
  const [text, setText] = useState("");

  function format(input: string): string {
    const lines = input.split("\n");
    let indent = 0;
    const output: string[] = [];
    for (let line of lines) {
      const trimmed = line.trim();
      if (trimmed === "" || trimmed.startsWith("#")) {
        output.push(trimmed);
        continue;
      }
      if (trimmed === "}") indent = Math.max(0, indent - 1);
      output.push("  ".repeat(indent) + trimmed);
      if (trimmed.endsWith("{")) indent++;
    }
    return output.join("\n");
  }

  const output = format(text);

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">{t("common.nginxInput")}</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={"server {\nlisten 80;\nlocation / {\nproxy_pass http://localhost:3000;\n}\n}"} className="h-48 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" />
      </div>
      {output && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.nginxOutput")}</span>
            <CopyButton text={output} />
          </div>
          <pre className="h-48 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-slate-800">{output}</pre>
        </div>
      )}
    </div>
  );
}
