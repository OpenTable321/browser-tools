export const MAX_FILE_SIZE = 50 * 1024 * 1024;

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function loadImageFromFile(file: File): Promise<{
  img: HTMLImageElement;
  dataUrl: string;
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        reject(new Error("Failed to read file."));
        return;
      }

      const img = new Image();
      img.onload = () => resolve({ img, dataUrl });
      img.onerror = () => reject(new Error("Failed to load image. The file may be corrupted."));
      img.src = dataUrl;
    };
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to process image. Try a different format."));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });
}

export function validateImageFile(
  file: File,
  acceptedTypes: string[],
): string | null {
  if (!file.type.startsWith("image/")) {
    return "Please select an image file.";
  }
  if (!acceptedTypes.includes(file.type)) {
    const accepted = acceptedTypes
      .map((t) => t.split("/")[1]?.toUpperCase() ?? t)
      .join(", ");
    return `Unsupported format. Please select ${accepted}.`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File too large. Please select an image under 50 MB.";
  }
  return null;
}

export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export function getBaseName(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, "");
}
