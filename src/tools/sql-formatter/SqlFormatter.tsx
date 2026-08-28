"use client";

import { useState, useMemo } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";

type KeywordCase = "upper" | "lower" | "preserve";

const MAJOR_KEYWORDS = new Set([
  "SELECT", "FROM", "WHERE", "INSERT", "INTO", "VALUES",
  "UPDATE", "SET", "DELETE", "CREATE", "TABLE", "DROP",
  "ALTER", "ADD", "COLUMN", "INDEX", "VIEW", "JOIN",
  "INNER", "LEFT", "RIGHT", "FULL", "OUTER", "CROSS",
  "ON", "GROUP", "BY", "ORDER", "HAVING", "LIMIT", "OFFSET",
  "UNION", "ALL", "AS", "AND", "OR", "NOT", "IN", "EXISTS",
  "BETWEEN", "LIKE", "IS", "NULL", "CASE", "WHEN", "THEN",
  "ELSE", "END", "DISTINCT", "TOP", "WITH", "RECURSIVE",
  "PRIMARY", "KEY", "FOREIGN", "REFERENCES", "CONSTRAINT",
  "DEFAULT", "CHECK", "UNIQUE", "BEGIN", "COMMIT", "ROLLBACK",
  "TRANSACTION", "TRUNCATE", "MERGE", "USING", "RETURNING",
]);

const SUB_KEYWORDS = new Set([
  "AND", "OR", "ON", "AS", "NOT", "IN", "EXISTS",
  "BETWEEN", "LIKE", "IS", "NULL",
]);

function tokenizeSql(sql: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < sql.length) {
    const ch = sql[i]!;

    if (/\s/.test(ch)) {
      let ws = "";
      while (i < sql.length && /\s/.test(sql[i]!)) {
        ws += sql[i];
        i++;
      }
      tokens.push(ws);
      continue;
    }

    if (ch === "'" || ch === '"') {
      let str = ch;
      i++;
      while (i < sql.length && sql[i] !== ch) {
        str += sql[i];
        i++;
      }
      if (i < sql.length) {
        str += sql[i];
        i++;
      }
      tokens.push(str);
      continue;
    }

    if (ch === "-" && sql[i + 1] === "-") {
      let comment = "";
      while (i < sql.length && sql[i] !== "\n") {
        comment += sql[i];
        i++;
      }
      tokens.push(comment);
      continue;
    }

    if (ch === "/" && sql[i + 1] === "*") {
      let comment = "";
      while (i < sql.length && !(sql[i] === "*" && sql[i + 1] === "/")) {
        comment += sql[i];
        i++;
      }
      if (i < sql.length) {
        comment += "*/";
        i += 2;
      }
      tokens.push(comment);
      continue;
    }

    if (/[(),;]/.test(ch)) {
      tokens.push(ch);
      i++;
      continue;
    }

    if (/[a-zA-Z_]/.test(ch)) {
      let word = "";
      while (i < sql.length && /[a-zA-Z0-9_.]/.test(sql[i]!)) {
        word += sql[i];
        i++;
      }
      tokens.push(word);
      continue;
    }

    tokens.push(ch);
    i++;
  }
  return tokens;
}

function formatSql(sql: string, keywordCase: KeywordCase): string {
  const tokens = tokenizeSql(sql);
  const lines: string[] = [];
  let indent = 0;
  let currentLine = "";
  let parenDepth = 0;

  function applyCase(token: string): string {
    const upper = token.toUpperCase();
    if (MAJOR_KEYWORDS.has(upper)) {
      if (keywordCase === "upper") return upper;
      if (keywordCase === "lower") return upper.toLowerCase();
      return token;
    }
    return token;
  }

  function pushLine() {
    if (currentLine.trim()) {
      lines.push("  ".repeat(Math.max(0, indent)) + currentLine.trim());
    }
    currentLine = "";
  }

  for (let idx = 0; idx < tokens.length; idx++) {
    const rawToken = tokens[idx]!;
    const token = rawToken.trim();

    if (!token) continue;

    const upper = token.toUpperCase();

    if (token === "(") {
      parenDepth++;
      currentLine += " (";
      continue;
    }

    if (token === ")") {
      parenDepth = Math.max(0, parenDepth - 1);
      currentLine += ")";
      continue;
    }

    if (token === ",") {
      currentLine += ",";
      if (parenDepth === 0) {
        pushLine();
      }
      continue;
    }

    if (token === ";") {
      currentLine += ";";
      pushLine();
      indent = 0;
      continue;
    }

    if (
      MAJOR_KEYWORDS.has(upper) &&
      !SUB_KEYWORDS.has(upper)
    ) {
      if (
        upper === "SELECT" ||
        upper === "INSERT" ||
        upper === "UPDATE" ||
        upper === "DELETE" ||
        upper === "CREATE" ||
        upper === "DROP" ||
        upper === "ALTER" ||
        upper === "TRUNCATE" ||
        upper === "WITH" ||
        upper === "MERGE" ||
        upper === "BEGIN" ||
        upper === "COMMIT" ||
        upper === "ROLLBACK"
      ) {
        pushLine();
        indent = 0;
      } else if (
        upper === "FROM" ||
        upper === "WHERE" ||
        upper === "GROUP" ||
        upper === "ORDER" ||
        upper === "HAVING" ||
        upper === "LIMIT" ||
        upper === "OFFSET" ||
        upper === "UNION" ||
        upper === "VALUES" ||
        upper === "SET" ||
        upper === "RETURNING" ||
        upper === "INTO" ||
        upper === "USING"
      ) {
        pushLine();
        indent = 1;
      } else if (
        upper === "JOIN" ||
        upper === "INNER" ||
        upper === "LEFT" ||
        upper === "RIGHT" ||
        upper === "FULL" ||
        upper === "OUTER" ||
        upper === "CROSS"
      ) {
        pushLine();
        indent = 1;
      } else if (upper === "ON") {
        pushLine();
        indent = 2;
      } else if (upper === "AND" || upper === "OR") {
        if (parenDepth === 0) {
          pushLine();
          indent = 2;
        }
      }
    }

    const casedToken = applyCase(token);
    if (currentLine && !currentLine.endsWith("(") && !currentLine.endsWith(",")) {
      currentLine += " ";
    }
    currentLine += casedToken;
  }

  pushLine();
  return lines.join("\n");
}

export function SqlFormatter() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [keywordCase, setKeywordCase] = useState<KeywordCase>("upper");

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      return formatSql(input, keywordCase);
    } catch {
      return t("common.sqlFormatError");
    }
  }, [input, keywordCase, t]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            {t("common.keywordCasing")}
          </label>
          <div className="flex rounded-lg border border-slate-300 p-1">
            {(["upper", "lower", "preserve"] as KeywordCase[]).map((c) => (
              <button
                key={c}
                onClick={() => setKeywordCase(c)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
                  keywordCase === c
                    ? "bg-brand-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {t(`common.casing_${c}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="sql-input"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            {t("common.sqlInput")}
          </label>
          <textarea
            id="sql-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("common.sqlInputPlaceholder")}
            className="input-field min-h-[300px] resize-y font-mono text-sm"
            spellCheck={false}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="sql-output"
              className="block text-sm font-medium text-slate-600"
            >
              {t("common.sqlOutput")}
            </label>
            {output && <CopyButton text={output} label={t("common.copy")} />}
          </div>
          <textarea
            id="sql-output"
            value={output}
            readOnly
            className="input-field min-h-[300px] resize-y font-mono text-sm"
            spellCheck={false}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            setInput("");
          }}
          disabled={!input}
          className="btn-secondary"
        >
          {t("common.clear")}
        </button>
      </div>
    </div>
  );
}
