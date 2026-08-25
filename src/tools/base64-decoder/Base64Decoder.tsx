"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

function decodeBase64(base64: string): string {
  const binary = atob(base64.trim());
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder("utf-8").decode(bytes);
}

export function Base64Decoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function decode() {
    setError(null);
    if (!input.trim()) {
      setError("Please enter Base64 text to decode.");
      setOutput("");
      return;
    }
    try {
      setOutput(decodeBase64(input));
    } catch {
      setError("Invalid Base64 input. Please check your text and try again.");
      setOutput("");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="b64-dec-input" className="mb-2 block text-sm font-medium text-slate-600">
          Base64 Text to Decode
        </label>
        <textarea
          id="b64-dec-input"
          value={input}
          onChange={(e) => { setInput(e.target.value); setOutput(""); setError(null); }}
          placeholder="Enter Base64 encoded text…"
          className="input-field min-h-[150px] resize-y font-mono text-sm"
          spellCheck={false}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={decode} className="btn-primary">
          Decode from Base64
        </button>
        {output && <CopyButton text={output} label="Text" />}
        <button
          onClick={() => { setInput(""); setOutput(""); setError(null); }}
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
          <label htmlFor="b64-dec-output" className="mb-2 block text-sm font-medium text-slate-600">
            Decoded Text
          </label>
          <textarea
            id="b64-dec-output"
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
