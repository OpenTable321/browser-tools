"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type IndentSize = 2 | 4;
type ActionMode = "format" | "minify" | "validate" | null;

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indent, setIndent] = useState<IndentSize>(2);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [actionMode, setActionMode] = useState<ActionMode>(null);

  function format() {
    setError(null);
    setOutput("");
    setIsValid(false);
    setActionMode("format");

    if (!input.trim()) {
      setError("Please enter JSON to format.");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setIsValid(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON.");
    }
  }

  function minify() {
    setError(null);
    setOutput("");
    setIsValid(false);
    setActionMode("minify");

    if (!input.trim()) {
      setError("Please enter JSON to minify.");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setIsValid(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON.");
    }
  }

  function validate() {
    setError(null);
    setOutput("");
    setIsValid(false);
    setActionMode("validate");

    if (!input.trim()) {
      setError("Please enter JSON to validate.");
      return;
    }

    try {
      JSON.parse(input);
      setIsValid(true);
      setOutput("Valid JSON ✓");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="json-input" className="mb-2 block text-sm font-medium text-slate-600">
          JSON Input
        </label>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOutput("");
            setError(null);
            setIsValid(false);
            setActionMode(null);
          }}
          placeholder='{"key": "value", "items": [1, 2, 3]}'
          className="input-field min-h-[200px] resize-y font-mono text-sm"
          spellCheck={false}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">Indentation</label>
            <div className="flex gap-2">
              <button
                onClick={() => setIndent(2)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  indent === 2 ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                2 Spaces
              </button>
              <button
                onClick={() => setIndent(4)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  indent === 4 ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                4 Spaces
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={format} className="btn-primary">
              Format
            </button>
            <button onClick={minify} className="btn-secondary">
              Minify
            </button>
            <button onClick={validate} className="btn-secondary">
              Validate
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <strong>JSON Error:</strong> {error}
        </div>
      )}

      {isValid && !error && actionMode === "validate" && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {output}
        </div>
      )}

      {output && (actionMode === "format" || actionMode === "minify") && !error && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="json-output" className="text-sm font-medium text-slate-600">
              Result
            </label>
            <CopyButton text={output} label="JSON" />
          </div>
          <textarea
            id="json-output"
            value={output}
            readOnly
            className="input-field min-h-[200px] resize-y font-mono text-sm"
            spellCheck={false}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => { setInput(""); setOutput(""); setError(null); setIsValid(false); setActionMode(null); }}
          disabled={!input}
          className="btn-secondary"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
