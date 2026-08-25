import { formatBytes } from "./image-utils";

export const MAX_PDF_FILE_SIZE = 50 * 1024 * 1024;
export const MAX_PDF_PAGES = 100;
export const MAX_MERGE_FILES = 20;
export const MAX_TOTAL_MERGE_SIZE = 200 * 1024 * 1024;
export const MAX_JPG_TO_PDF_IMAGES = 50;

export { formatBytes };

export function validatePdfFile(file: File): string | null {
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    return "Please select a PDF file.";
  }
  if (file.size > MAX_PDF_FILE_SIZE) {
    return `File too large (${formatBytes(file.size)}). Maximum supported size is ${formatBytes(MAX_PDF_FILE_SIZE)}.`;
  }
  return null;
}

export function validateImageFileForPdf(file: File): string | null {
  if (!file.type.startsWith("image/")) {
    return "Please select image files only.";
  }
  if (file.size > MAX_PDF_FILE_SIZE) {
    return `File "${file.name}" is too large (${formatBytes(file.size)}). Maximum is ${formatBytes(MAX_PDF_FILE_SIZE)}.`;
  }
  return null;
}

export async function getPdfPageCount(file: File): Promise<number> {
  const { PDFDocument } = await import("pdf-lib");
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  return pdf.getPageCount();
}

export async function mergePdfFiles(
  files: File[],
  onProgress?: (current: number, total: number) => void,
): Promise<Uint8Array> {
  const { PDFDocument } = await import("pdf-lib");
  const mergedPdf = await PDFDocument.create();

  for (let i = 0; i < files.length; i++) {
    onProgress?.(i + 1, files.length);
    const bytes = await files[i]!.arrayBuffer();
    const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const pageIndices = pdf.getPageIndices();
    const pages = await mergedPdf.copyPages(pdf, pageIndices);
    for (const page of pages) {
      mergedPdf.addPage(page);
    }
  }

  return mergedPdf.save();
}

export async function extractPdfPages(
  file: File,
  pageIndices: number[],
): Promise<Uint8Array> {
  const { PDFDocument } = await import("pdf-lib");
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(pdf, pageIndices);
  for (const page of pages) {
    newPdf.addPage(page);
  }
  return newPdf.save();
}

export async function splitEveryPage(
  file: File,
  onProgress?: (current: number, total: number) => void,
): Promise<{ fileName: string; data: Uint8Array }[]> {
  const { PDFDocument } = await import("pdf-lib");
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdf.getPageCount();
  const baseName = file.name.replace(/\.pdf$/i, "");
  const results: { fileName: string; data: Uint8Array }[] = [];

  for (let i = 0; i < pageCount; i++) {
    onProgress?.(i + 1, pageCount);
    const newPdf = await PDFDocument.create();
    const [page] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(page);
    const data = await newPdf.save();
    results.push({
      fileName: `${baseName}-page-${i + 1}.pdf`,
      data,
    });
  }

  return results;
}

export async function loadPdfJs() {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
  return pdfjsLib;
}

export async function loadPdfDocument(data: ArrayBuffer) {
  const pdfjsLib = await loadPdfJs();
  const loadingTask = pdfjsLib.getDocument({ data });
  return loadingTask.promise;
}

export async function renderPageToCanvas(
  pdf: pdfjsDocumentProxy,
  pageNumber: number,
  scale: number,
): Promise<HTMLCanvasElement> {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context.");
  await page.render({ canvasContext: ctx, viewport }).promise;
  return canvas;
}

export type pdfjsDocumentProxy = Awaited<ReturnType<typeof loadPdfDocument>>;

export function parsePageRanges(input: string, maxPage: number): number[] {
  const result: number[] = [];
  const parts = input.split(",").map((p) => p.trim());

  for (const part of parts) {
    if (!part) continue;
    const rangeMatch = part.match(/^(\d+)\s*[-–]\s*(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1]!, 10);
      const end = parseInt(rangeMatch[2]!, 10);
      if (start < 1 || end > maxPage || start > end) {
        throw new Error(`Invalid range "${part}". Valid pages: 1–${maxPage}.`);
      }
      for (let i = start; i <= end; i++) {
        if (!result.includes(i - 1)) result.push(i - 1);
      }
    } else {
      const num = parseInt(part, 10);
      if (isNaN(num) || num < 1 || num > maxPage) {
        throw new Error(`Invalid page "${part}". Valid pages: 1–${maxPage}.`);
      }
      if (!result.includes(num - 1)) result.push(num - 1);
    }
  }

  return result.sort((a, b) => a - b);
}

export async function downloadAsZip(
  items: { fileName: string; data: Uint8Array | Blob }[],
  zipName: string,
): Promise<void> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  for (const item of items) {
    zip.file(item.fileName, item.data);
  }
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = zipName;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadPdfBytes(data: Uint8Array, fileName: string): void {
  const blob = new Blob([data as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
