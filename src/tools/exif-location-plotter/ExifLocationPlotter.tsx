"use client";

import { useState, useRef } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

export function ExifLocationPlotter() {
  const { t } = useTranslation();
  const [exifData, setExifData] = useState<Record<string, string> | null>(null);
  const [gps, setGps] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function readExif(file: File) {
    setError(null);
    setExifData(null);
    setGps(null);
    setPreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!(result instanceof ArrayBuffer)) return;

      try {
        const dataView = new DataView(result);
        let offset = 0;
        if (dataView.getUint16(0, false) !== 0xffd8) {
          setError(t("common.exifNotJpeg"));
          return;
        }
        offset = 2;
        while (offset < dataView.byteLength) {
          const marker = dataView.getUint16(offset, false);
          if (marker === 0xffe1) {
            offset += 2;
            const length = dataView.getUint16(offset, false);
            if (dataView.getUint32(offset + 2, false) !== 0x45786966) break;
            const tiffOffset = offset + 8;
            const byteOrder = dataView.getUint16(tiffOffset, false);
            const isLE = byteOrder === 0x4949;
            const ifdOffset = dataView.getUint32(tiffOffset + 4, isLE);
            readIFD(dataView, tiffOffset, tiffOffset + ifdOffset, isLE);
            break;
          } else if ((marker & 0xff00) !== 0xff00) {
            break;
          } else {
            offset += 2 + dataView.getUint16(offset + 2, false);
          }
        }
      } catch {
        setError(t("common.exifReadError"));
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function readIFD(dataView: DataView, tiffStart: number, ifdStart: number, isLE: boolean) {
    const entries = dataView.getUint16(ifdStart, isLE);
    const data: Record<string, string> = {};
    let gpsIFDOffset = 0;

    for (let i = 0; i < entries; i++) {
      const entryOffset = ifdStart + 2 + i * 12;
      const tag = dataView.getUint16(entryOffset, isLE);
      const type = dataView.getUint16(entryOffset + 2, isLE);
      const count = dataView.getUint32(entryOffset + 4, isLE);
      const valueOffset = entryOffset + 8;

      if (tag === 0x8769) {
        const exifIFD = tiffStart + dataView.getUint32(valueOffset, isLE);
        readIFD(dataView, tiffStart, exifIFD, isLE);
      } else if (tag === 0x8825) {
        gpsIFDOffset = tiffStart + dataView.getUint32(valueOffset, isLE);
      } else {
        const tagNames: Record<number, string> = {
          0x010f: "Make", 0x0110: "Model", 0x0131: "Software",
          0x0132: "DateTime", 0x0101: "ImageHeight", 0x0100: "ImageWidth",
          0x9003: "DateTimeOriginal", 0x9004: "DateTimeDigitized",
          0xa002: "ExifImageWidth", 0xa003: "ExifImageHeight",
        };
        const name = tagNames[tag];
        if (name) {
          if (type === 2) {
            const str = readString(dataView, valueOffset, count, isLE, tiffStart);
            data[name] = str;
          } else if (type === 3) {
            data[name] = String(dataView.getUint16(valueOffset, isLE));
          } else if (type === 4) {
            data[name] = String(dataView.getUint32(valueOffset, isLE));
          }
        }
      }
    }

    if (gpsIFDOffset > 0) {
      const gpsData = readGPS(dataView, tiffStart, gpsIFDOffset, isLE);
      if (gpsData) {
        setGps(gpsData);
        data["GPSLatitude"] = gpsData.lat.toFixed(6);
        data["GPSLongitude"] = gpsData.lon.toFixed(6);
      }
    }

    if (Object.keys(data).length > 0) setExifData(data);
    else if (!gpsIFDOffset) setError(t("common.exifNoData"));
  }

  function readGPS(dataView: DataView, tiffStart: number, gpsIFD: number, isLE: boolean): { lat: number; lon: number } | null {
    const entries = dataView.getUint16(gpsIFD, isLE);
    let latRef = "N", lonRef = "E";
    let latDMS: number[] = [0, 0, 0], lonDMS: number[] = [0, 0, 0];

    for (let i = 0; i < entries; i++) {
      const entryOffset = gpsIFD + 2 + i * 12;
      const tag = dataView.getUint16(entryOffset, isLE);
      const type = dataView.getUint16(entryOffset + 2, isLE);
      const count = dataView.getUint32(entryOffset + 4, isLE);
      const valueOffset = dataView.getUint32(entryOffset + 8, isLE);
      const actualOffset = tiffStart + valueOffset;

      if (tag === 1 && type === 2) {
        latRef = readString(dataView, entryOffset + 8, count, isLE, tiffStart);
      } else if (tag === 2 && type === 5) {
        latDMS = readRationalArray(dataView, actualOffset, count, isLE);
      } else if (tag === 3 && type === 2) {
        lonRef = readString(dataView, entryOffset + 8, count, isLE, tiffStart);
      } else if (tag === 4 && type === 5) {
        lonDMS = readRationalArray(dataView, actualOffset, count, isLE);
      }
    }

    const lat = (latDMS[0]! + latDMS[1]! / 60 + latDMS[2]! / 3600) * (latRef === "S" ? -1 : 1);
    const lon = (lonDMS[0]! + lonDMS[1]! / 60 + lonDMS[2]! / 3600) * (lonRef === "W" ? -1 : 1);

    if (lat === 0 && lon === 0) return null;
    return { lat, lon };
  }

  function readString(dataView: DataView, offset: number, count: number, isLE: boolean, tiffStart: number): string {
    let actualOffset = offset;
    if (count > 4) actualOffset = tiffStart + dataView.getUint32(offset, isLE);
    let str = "";
    for (let i = 0; i < count - 1; i++) {
      str += String.fromCharCode(dataView.getUint8(actualOffset + i));
    }
    return str;
  }

  function readRationalArray(dataView: DataView, offset: number, count: number, isLE: boolean): number[] {
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
      const num = dataView.getUint32(offset + i * 8, isLE);
      const den = dataView.getUint32(offset + i * 8 + 4, isLE);
      result.push(den !== 0 ? num / den : 0);
    }
    return result;
  }

  const mapUrl = gps ? `https://www.openstreetmap.org/export/embed.html?bbox=${gps.lon - 0.01},${gps.lat - 0.01},${gps.lon + 0.01},${gps.lat + 0.01}&marker=${gps.lat},${gps.lon}` : null;
  const mapLink = gps ? `https://www.openstreetmap.org/?mlat=${gps.lat}&mlon=${gps.lon}#map=15/${gps.lat}/${gps.lon}` : null;

  return (
    <div className="space-y-6">
      <div>
        <input ref={fileInputRef} type="file" accept="image/jpeg" onChange={(e) => { const f = e.target.files?.[0]; if (f) readExif(f); }} className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700" />
      </div>
      {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
      {preview && (
        <div>
          <img src={preview} alt="preview" className="max-h-48 rounded-lg border border-slate-200" />
        </div>
      )}
      {exifData && (
        <div>
          <span className="text-sm font-medium text-slate-700">{t("common.exifMetadata")}</span>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {Object.entries(exifData).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm">
                <span className="text-xs text-slate-500">{k}</span>
                <span className="font-mono text-slate-800">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {gps && mapUrl && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.exifMap")}</span>
            <a href={mapLink ?? undefined} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">{t("common.exifOpenMap")}</a>
          </div>
          <iframe src={mapUrl} className="h-64 w-full rounded-lg border border-slate-200" title="GPS location" />
        </div>
      )}
    </div>
  );
}
