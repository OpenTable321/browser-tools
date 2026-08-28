"use client";

import { useState, useRef } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

interface AudioMeta {
  title?: string;
  artist?: string;
  album?: string;
  year?: string;
  genre?: string;
  track?: string;
}

export function AudioTagReader() {
  const { t } = useTranslation();
  const [meta, setMeta] = useState<AudioMeta | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function readTags(file: File) {
    setError(null);
    setMeta(null);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const buf = e.target?.result;
      if (!(buf instanceof ArrayBuffer)) return;
      const data = new Uint8Array(buf);
      const dataView = new DataView(buf);

      try {
        if (file.name.toLowerCase().endsWith(".mp3")) {
          readID3v2(data, dataView);
        } else if (file.name.toLowerCase().endsWith(".m4a")) {
          readM4A(data, dataView);
        } else {
          setError(t("common.audioUnsupported"));
        }
      } catch {
        setError(t("common.audioReadError"));
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function readID3v2(data: Uint8Array, dataView: DataView) {
    if (data[0] !== 0x49 || data[1] !== 0x44 || data[2] !== 0x33) {
      setError(t("common.audioNoTags"));
      return;
    }
    const version = data[3]!;
    const headerSize = 10;
    const sizeBytes = [data[6]!, data[7]!, data[8]!, data[9]!];
    const tagSize = (sizeBytes[0]! << 21) | (sizeBytes[1]! << 14) | (sizeBytes[2]! << 7) | sizeBytes[3]!;

    let offset = headerSize;
    const result: AudioMeta = {};
    const frameMap: Record<string, keyof AudioMeta> = {
      TIT2: "title", TPE1: "artist", TALB: "album",
      TYER: "year", TDRC: "year", TCON: "genre", TRCK: "track",
    };

    while (offset < headerSize + tagSize) {
      const frameId = String.fromCharCode(data[offset]!, data[offset + 1]!, data[offset + 2]!, data[offset + 3]!);
      if (frameId.charCodeAt(0) === 0) break;

      const frameSize = version === 4
        ? ((data[offset + 4]! << 21) | (data[offset + 5]! << 14) | (data[offset + 6]! << 7) | data[offset + 7]!)
        : (dataView.getUint32(offset + 4, false) & 0x00ffffff);

      const frameDataStart = offset + 10;
      const encoding = data[frameDataStart]!;

      let value = "";
      if (encoding === 0) {
        for (let i = frameDataStart + 1; i < frameDataStart + frameSize; i++) {
          if (data[i] === 0) break;
          value += String.fromCharCode(data[i]!);
        }
      } else if (encoding === 1) {
        for (let i = frameDataStart + 3; i < frameDataStart + frameSize - 1; i += 2) {
          const code = (data[i]! << 8) | data[i + 1]!;
          if (code === 0) break;
          value += String.fromCharCode(code);
        }
      }

      const field = frameMap[frameId];
      if (field) result[field] = value;

      offset = frameDataStart + frameSize;
    }

    if (Object.keys(result).length > 0) setMeta(result);
    else setError(t("common.audioNoTags"));
  }

  function readM4A(data: Uint8Array, dataView: DataView) {
    let offset = 0;
    const result: AudioMeta = {};

    while (offset < data.length - 8) {
      const size = dataView.getUint32(offset, false);
      const type = String.fromCharCode(data[offset + 4]!, data[offset + 5]!, data[offset + 6]!, data[offset + 7]!);
      if (size === 0 || size > data.length - offset) break;

      if (type === "moov" || type === "udta" || type === "ilst") {
        offset += 8;
        continue;
      }

      if (type === "\xa9nam" || type === "\xa9ART" || type === "\xa9alb" || type === "\xa9day" || type === "\xa9gen" || type === "\xa9trk") {
        const dataOffset = offset + 16;
        const dataSize = dataView.getUint32(offset + 8, false) - 16;
        let value = "";
        for (let i = dataOffset; i < dataOffset + dataSize && i < data.length; i++) {
          if (data[i]! >= 32) value += String.fromCharCode(data[i]!);
        }
        const map: Record<string, keyof AudioMeta> = {
          "\xa9nam": "title", "\xa9ART": "artist", "\xa9alb": "album",
          "\xa9day": "year", "\xa9gen": "genre", "\xa9trk": "track",
        };
        const field = map[type];
        if (field) result[field] = value;
      }

      offset += size;
    }

    if (Object.keys(result).length > 0) setMeta(result);
    else setError(t("common.audioNoTags"));
  }

  const fields: { key: keyof AudioMeta; label: string }[] = [
    { key: "title", label: t("common.audioTitle") },
    { key: "artist", label: t("common.audioArtist") },
    { key: "album", label: t("common.audioAlbum") },
    { key: "year", label: t("common.audioYear") },
    { key: "genre", label: t("common.audioGenre") },
    { key: "track", label: t("common.audioTrack") },
  ];

  return (
    <div className="space-y-6">
      <div>
        <input type="file" accept=".mp3,.m4a" onChange={(e) => { const f = e.target.files?.[0]; if (f) readTags(f); }} className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700" />
      </div>
      {fileName && <div className="text-sm text-slate-500">{t("common.audioFile")}: <span className="font-mono text-slate-700">{fileName}</span></div>}
      {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
      {meta && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="text-xs font-medium text-slate-500">{f.label}</div>
              <div className="mt-1 text-sm font-medium text-slate-800">{meta[f.key] ?? "—"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
