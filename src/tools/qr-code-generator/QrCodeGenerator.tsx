"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

type QrMode = "text" | "url" | "wifi" | "email";

export function QrCodeGenerator() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<QrMode>("text");
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [emailAddress, setEmailAddress] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [svgString, setSvgString] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const qrContent = (() => {
    switch (mode) {
      case "text":
        return text;
      case "url":
        return url;
      case "wifi": {
        if (!wifiSsid) return "";
        const escapedSsid = wifiSsid.replace(/([\\;,:"])/g, "\\$1");
        const escapedPass = wifiPassword.replace(/([\\;,:"])/g, "\\$1");
        return `WIFI:T:${wifiEncryption};S:${escapedSsid};P:${escapedPass};;`;
      }
      case "email": {
        if (!emailAddress) return "";
        const params = new URLSearchParams();
        if (emailSubject) params.set("subject", emailSubject);
        if (emailBody) params.set("body", emailBody);
        const query = params.toString();
        return `mailto:${emailAddress}${query ? `?${query}` : ""}`;
      }
    }
  })();

  useEffect(() => {
    if (!qrContent.trim()) {
      setDataUrl(null);
      setSvgString(null);
      setError(null);
      return;
    }

    let cancelled = false;
    setIsGenerating(true);
    setError(null);

    (async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;

        await QRCode.toCanvas(canvas, qrContent, {
          width: size,
          margin: 2,
          errorCorrectionLevel: errorLevel,
          color: { dark: "#0f172a", light: "#ffffff" },
        });

        if (!cancelled) {
          setDataUrl(canvas.toDataURL("image/png"));
          const svg = await QRCode.toString(qrContent, {
            type: "svg",
            width: size,
            margin: 2,
            errorCorrectionLevel: errorLevel,
            color: { dark: "#0f172a", light: "#ffffff" },
          });
          setSvgString(svg);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : t("common.error"));
          setDataUrl(null);
          setSvgString(null);
        }
      } finally {
        if (!cancelled) setIsGenerating(false);
      }
    })();

    return () => { cancelled = true; };
  }, [qrContent, size, errorLevel]);

  function handleDownloadPng() {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qr-code.png";
    a.click();
  }

  function handleDownloadSvg() {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.svg";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleClear() {
    setText("");
    setUrl("");
    setWifiSsid("");
    setWifiPassword("");
    setEmailAddress("");
    setEmailSubject("");
    setEmailBody("");
    setDataUrl(null);
    setSvgString(null);
  }

  const hasContent = qrContent.trim().length > 0;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">{t("common.qrCodeType")}</h3>
        <div className="flex flex-wrap gap-2">
          {([
            { m: "text" as QrMode, label: t("common.textLabel") },
            { m: "url" as QrMode, label: t("common.urlLabel") },
            { m: "wifi" as QrMode, label: t("common.wifiLabel") },
            { m: "email" as QrMode, label: t("common.emailLabel") },
          ]).map(({ m, label }) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                mode === m ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {mode === "text" && (
        <div>
          <label htmlFor="qr-text" className="mb-2 block text-sm font-medium text-slate-600">
            {t("common.textToEncode")}
          </label>
          <textarea
            id="qr-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("common.enterAnyText")}
            className="input-field min-h-[100px] resize-y text-sm"
          />
        </div>
      )}

      {mode === "url" && (
        <div>
          <label htmlFor="qr-url" className="mb-2 block text-sm font-medium text-slate-600">
            {t("common.urlToEncode")}
          </label>
          <input
            id="qr-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="input-field"
          />
        </div>
      )}

      {mode === "wifi" && (
        <div className="space-y-4">
          <div>
            <label htmlFor="qr-wifi-ssid" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.networkName")}
            </label>
            <input
              id="qr-wifi-ssid"
              type="text"
              value={wifiSsid}
              onChange={(e) => setWifiSsid(e.target.value)}
              placeholder="MyWiFiNetwork"
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="qr-wifi-pass" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.password")}
            </label>
            <input
              id="qr-wifi-pass"
              type="text"
              value={wifiPassword}
              onChange={(e) => setWifiPassword(e.target.value)}
              placeholder={t("common.wifiPasswordPlaceholder")}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="qr-wifi-enc" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.encryption")}
            </label>
            <select
              id="qr-wifi-enc"
              value={wifiEncryption}
              onChange={(e) => setWifiEncryption(e.target.value as "WPA" | "WEP" | "nopass")}
              className="input-field"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">{t("common.noPassword")}</option>
            </select>
          </div>
        </div>
      )}

      {mode === "email" && (
        <div className="space-y-4">
          <div>
            <label htmlFor="qr-email-addr" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.emailAddress")}
            </label>
            <input
              id="qr-email-addr"
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="someone@example.com"
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="qr-email-subject" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.subjectOptional")}
            </label>
            <input
              id="qr-email-subject"
              type="text"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder={t("common.emailSubjectPlaceholder")}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="qr-email-body" className="mb-2 block text-sm font-medium text-slate-600">
              {t("common.bodyOptional")}
            </label>
            <textarea
              id="qr-email-body"
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder={t("common.emailBodyPlaceholder")}
              className="input-field min-h-[80px] resize-y text-sm"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="qr-size" className="mb-2 block text-sm font-medium text-slate-600">
            {t("common.qrSize")}: <span className="font-bold text-brand-600">{size}px</span>
          </label>
          <input
            id="qr-size"
            type="range"
            min={128}
            max={512}
            step={32}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-brand-600"
          />
        </div>

        <div>
          <label htmlFor="qr-error" className="mb-2 block text-sm font-medium text-slate-600">
            {t("common.errorCorrection")}
          </label>
        <select
          id="qr-error"
          value={errorLevel}
          onChange={(e) => setErrorLevel(e.target.value as "L" | "M" | "Q" | "H")}
          className="input-field"
        >
            <option value="L">{t("common.levelL")}</option>
            <option value="M">{t("common.levelM")}</option>
            <option value="Q">{t("common.levelQ")}</option>
            <option value="H">{t("common.levelH")}</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-col items-center gap-4">
        <canvas ref={canvasRef} className="hidden" />

        {isGenerating && (
          <div className="flex h-64 w-64 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
          </div>
        )}

        {!isGenerating && dataUrl && (
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUrl} alt={t("common.generateQr")} className="h-64 w-64" />
          </div>
        )}

        {!isGenerating && !dataUrl && !error && (
          <div className="flex h-64 w-64 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50">
            <p className="text-center text-sm text-slate-400">
              {t("common.enterContentToGenerate")}
            </p>
          </div>
        )}

        {dataUrl && (
          <div className="flex flex-wrap gap-3">
            <button onClick={handleDownloadPng} className="btn-primary">
              {t("common.downloadPng")}
            </button>
            <button onClick={handleDownloadSvg} className="btn-secondary">
              {t("common.downloadSvg")}
            </button>
          </div>
        )}
      </div>

      {hasContent && (
        <button onClick={handleClear} className="btn-secondary">
          {t("common.clear")}
        </button>
      )}
    </div>
  );
}
