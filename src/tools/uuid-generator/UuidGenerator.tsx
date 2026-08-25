"use client";

import { useState, useCallback } from "react";
import { CopyButton } from "@/components/CopyButton";

function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;

  const hex: string[] = [];
  for (const b of bytes) hex.push(b.toString(16).padStart(2, "0"));

  return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`;
}

export function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = useCallback(() => {
    const results: string[] = [];
    for (let i = 0; i < count; i++) {
      let uuid = generateUUID();
      if (uppercase) uuid = uuid.toUpperCase();
      results.push(uuid);
    }
    setUuids(results);
  }, [count, uppercase]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">Settings</h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="uuid-count" className="mb-2 block text-sm font-medium text-slate-600">
              Quantity: <span className="font-bold text-brand-600">{count}</span>
            </label>
            <input
              id="uuid-count"
              type="range"
              min={1}
              max={50}
              step={1}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-brand-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">Format</label>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-brand-600"
              />
              Uppercase
            </label>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={generate} className="btn-primary">
            Generate
          </button>
          {uuids.length > 0 && (
            <CopyButton text={uuids.join("\n")} label="All UUIDs" />
          )}
          {uuids.length > 0 && (
            <button
              onClick={() => {
                const blob = new Blob([uuids.join("\n")], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "uuids.txt";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="btn-secondary"
            >
              Download TXT
            </button>
          )}
        </div>
      </div>

      {uuids.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="space-y-2">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-4 py-2">
                <code className="flex-1 break-all font-mono text-sm text-slate-900">{uuid}</code>
                <CopyButton text={uuid} label="" className="flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-brand-600 transition hover:bg-brand-50" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
