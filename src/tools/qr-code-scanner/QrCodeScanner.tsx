"use client";

import { useState, useRef, useEffect } from "react";
import { CopyButton } from "@/components/CopyButton";
import { useTranslation } from "@/i18n/LanguageProvider";
import jsQR from "jsqr";

export function QrCodeScanner() {
  const { t } = useTranslation();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"file" | "camera">("file");
  const [cameraActive, setCameraActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  function scanFile(file: File) {
    setError(null);
    setResult(null);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setResult(code.data);
      } else {
        setError(t("common.qrNotFound"));
      }
    };
    img.onerror = () => setError(t("common.qrImgError"));
    img.src = URL.createObjectURL(file);
  }

  async function startCamera() {
    setError(null);
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.play();
        setCameraActive(true);
        scanLoop();
      }
    } catch {
      setError(t("common.qrCameraError"));
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }

  function scanLoop() {
    if (!cameraActive && !streamRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) {
      requestAnimationFrame(scanLoop);
      return;
    }
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setResult(code.data);
          stopCamera();
          return;
        }
      }
    }
    requestAnimationFrame(scanLoop);
  }

  useEffect(() => {
    return () => { stopCamera(); };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => { stopCamera(); setMode("file"); }}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "file" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}
        >
          {t("common.qrFileMode")}
        </button>
        <button
          onClick={() => { setMode("camera"); setResult(null); setError(null); }}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${mode === "camera" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}
        >
          {t("common.qrCameraMode")}
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {mode === "file" && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) scanFile(f); }}
            className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
          />
        </div>
      )}

      {mode === "camera" && (
        <div className="space-y-3">
          {!cameraActive ? (
            <button
              onClick={startCamera}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {t("common.qrStartCamera")}
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              {t("common.qrStopCamera")}
            </button>
          )}
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <video ref={videoRef} className="w-full" />
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {result && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">{t("common.qrResult")}</span>
            <CopyButton text={result} />
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-mono text-green-800 break-all">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
