"use client";

import { useState, useCallback } from "react";
import { CopyButton } from "@/components/CopyButton";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "nemo", "ipsam",
  "quasi", "architecto", "beatae", "vitae", "dicta", "explicabo", "aspernatur",
  "aut", "odit", "fugit", "sed", "quia", "consequuntur", "magni", "minima",
  "nostrum", "exercitationem", "ullam", "corporis", "suscipit", "laboriosam",
  "nihil", "impedit", "quo", "minus", "id", "quod", "maxime", "placeat",
  "facere", "possimus", "omnis", "voluptas", "assumenda", "est", "omnis",
  "repellendus", "temporibus", "quibusdam", "officiis", "debitis", "aut",
  "rerum", "necessitatibus", "saepe", "eveniet", "voluptates", "repudiandae",
];

type GenMode = "paragraphs" | "sentences" | "words";

function randomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)] ?? "lorem";
}

function generateSentence(): string {
  const wordCount = 8 + Math.floor(Math.random() * 12);
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(randomWord());
  }
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function generateParagraph(): string {
  const sentenceCount = 3 + Math.floor(Math.random() * 5);
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }
  return sentences.join(" ");
}

function generateText(mode: GenMode, count: number): string {
  if (mode === "words") {
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
      words.push(randomWord());
    }
    const text = words.join(" ");
    return text.charAt(0).toUpperCase() + text.slice(1) + ".";
  }
  if (mode === "sentences") {
    const sentences: string[] = [];
    for (let i = 0; i < count; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(" ");
  }
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(generateParagraph());
  }
  return paragraphs.join("\n\n");
}

export function LoremIpsumGenerator() {
  const [mode, setMode] = useState<GenMode>("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [seed, setSeed] = useState(0);

  const generate = useCallback(() => {
    setOutput(generateText(mode, count));
    setSeed((s) => s + 1);
  }, [mode, count]);

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lorem-ipsum.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Settings</h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">Generate</label>
            <div className="flex flex-wrap gap-2">
              {(["paragraphs", "sentences", "words"] as GenMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                    mode === m
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="lorem-count" className="mb-2 block text-sm font-medium text-slate-600">
              Quantity: <span className="font-bold text-brand-600">{count}</span>
            </label>
            <input
              id="lorem-count"
              type="range"
              min={1}
              max={50}
              step={1}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={generate} className="btn-primary">
            Generate
          </button>
          {output && <CopyButton text={output} label="Text" />}
          {output && (
            <button onClick={handleDownload} className="btn-secondary">
              Download TXT
            </button>
          )}
          {output && (
            <button onClick={() => setOutput("")} className="btn-secondary">
              Clear
            </button>
          )}
        </div>
      </div>

      {output && (
        <div>
          <label htmlFor="lorem-output" className="mb-2 block text-sm font-medium text-slate-600">
            Result
          </label>
          <textarea
            id="lorem-output"
            value={output}
            readOnly
            className="input-field min-h-[200px] resize-y text-sm leading-relaxed"
          />
        </div>
      )}

      {!output && (
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
          <p className="text-sm text-slate-400">
            Click &ldquo;Generate&rdquo; to create Lorem Ipsum text
          </p>
        </div>
      )}

      {seed > 0 && (
        <p className="text-center text-xs text-slate-400">
          Generated {count} {mode} · Click Generate again for new text
        </p>
      )}
    </div>
  );
}
