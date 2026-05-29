/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Download, FileWarning } from "lucide-react";

interface DownloadButtonProps {
  pdfUrl?: string;
  className?: string;
  isFullWidth?: boolean;
}

export function DownloadButton({ pdfUrl, className = "", isFullWidth = false }: DownloadButtonProps) {
  const isAvailable = pdfUrl && pdfUrl.trim().length > 0;

  const handleDownload = () => {
    if (!isAvailable) return;
    // Route through backend proxy URL redirect safely
    const proxyUrl = `/api/download?url=${encodeURIComponent(pdfUrl)}`;
    window.open(proxyUrl, "_blank", "noopener,noreferrer");
  };

  const baseStyles = "flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-xs";
  
  if (!isAvailable) {
    return null;
  }

  return (
    <button
      onClick={handleDownload}
      className={`${baseStyles} bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white hover:shadow-md cursor-pointer ${isFullWidth ? "w-full" : ""} ${className}`}
      id="download-pdf-enabled"
      title="Download PDF Open Access Original secara Legal"
    >
      <Download className="w-4 h-4" />
      Download PDF
    </button>
  );
}
