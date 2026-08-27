"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type Mode = "encode" | "decode";
type Encoding = "encodeURIComponent" | "encodeURI";

export function UrlEncoderDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("encode");
  const [encoding, setEncoding] = useState<Encoding>("encodeURIComponent");

  function process() {
    setError(null);
    if (!input) {
      setError("Please enter text to process.");
      setOutput("");
      return;
    }
    try {
      if (mode === "encode") {
        setOutput(
          encoding === "encodeURIComponent"
            ? encodeURIComponent(input)
            : encodeURI(input),
        );
      } else {
        setOutput(
          encoding === "encodeURIComponent"
            ? decodeURIComponent(input)
            : decodeURI(input),
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to process the input. Check for invalid percent-encoded sequences.",
      );
      setOutput("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex rounded-lg border border-slate-300 p-1">
          <button
            onClick={() => { setMode("encode"); setOutput(""); setError(null); }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              mode === "encode"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => { setMode("decode"); setOutput(""); setError(null); }}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
              mode === "decode"
                ? "bg-brand-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Decode
          </button>
        </div>

        <div className="flex rounded-lg border border-slate-300 p-1">
          <button
            onClick={() => { setEncoding("encodeURIComponent"); setOutput(""); setError(null); }}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              encoding === "encodeURIComponent"
                ? "bg-slate-700 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            encodeURIComponent
          </button>
          <button
            onClick={() => { setEncoding("encodeURI"); setOutput(""); setError(null); }}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              encoding === "encodeURI"
                ? "bg-slate-700 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            encodeURI
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="url-enc-input"
          className="mb-2 block text-sm font-medium text-slate-600"
        >
          {mode === "encode" ? "Text to Encode" : "Text to Decode"}
        </label>
        <textarea
          id="url-enc-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOutput("");
            setError(null);
          }}
          placeholder={
            mode === "encode"
              ? "Enter text or URL to encode…"
              : "Enter percent-encoded text to decode…"
          }
          className="input-field min-h-[150px] resize-y font-mono text-sm"
          spellCheck={false}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={process} className="btn-primary">
          {mode === "encode" ? "Encode" : "Decode"}
        </button>
        {output && <CopyButton text={output} label="Result" />}
        <button
          onClick={() => {
            setInput("");
            setOutput("");
            setError(null);
          }}
          disabled={!input}
          className="btn-secondary"
        >
          Clear
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
            htmlFor="url-enc-output"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            Result
          </label>
          <textarea
            id="url-enc-output"
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
