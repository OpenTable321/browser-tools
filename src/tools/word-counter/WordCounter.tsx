"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

export function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length || (trimmed.length > 0 ? 1 : 0) : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
    const readingTime = Math.ceil(words / 200);

    return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
  }, [text]);

  const statCards = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.characters },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading Time", value: `${stats.readingTime} min` },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="word-counter-input" className="mb-2 block text-sm font-medium text-slate-600">
          Enter or paste your text
        </label>
        <textarea
          id="word-counter-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste text here…"
          className="input-field min-h-[200px] resize-y font-mono text-sm"
          aria-describedby="word-counter-stats"
        />
      </div>

      <div id="word-counter-stats" className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {statCards.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-slate-100 p-4 text-center">
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <CopyButton text={text} label="Text" />
        <button
          onClick={() => setText("")}
          disabled={!text}
          className="btn-secondary"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
