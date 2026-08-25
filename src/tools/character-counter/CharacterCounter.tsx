"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

export function CharacterCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length || (trimmed.length > 0 ? 1 : 0) : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
    return { characters, charactersNoSpaces, words, lines, sentences, paragraphs };
  }, [text]);

  const statCards = [
    { label: "Characters", value: stats.characters },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces },
    { label: "Words", value: stats.words },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Lines", value: stats.lines },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="char-counter-input" className="mb-2 block text-sm font-medium text-slate-600">
          Enter or paste your text
        </label>
        <textarea
          id="char-counter-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste text here…"
          className="input-field min-h-[200px] resize-y font-mono text-sm"
          aria-describedby="char-counter-stats"
        />
      </div>

      <div id="char-counter-stats" className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
