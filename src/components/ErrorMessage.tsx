/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ title = "Terjadi Kesalahan", message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 text-slate-800 my-4 max-w-2xl mx-auto shadow-xs" id="error-box">
      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-rose-950 text-base md:text-lg mb-1">{title}</h3>
          <p className="font-sans text-sm text-slate-600 leading-relaxed break-words">{message}</p>
          
          {message.includes("GEMINI_API_KEY") && (
            <div className="mt-3 text-xs text-rose-900/80 bg-rose-200/40 p-2.5 rounded-lg border border-rose-200/30">
              <strong>Tip Pengembang:</strong> Pastikan Anda telah memasang <code>GEMINI_API_KEY</code> di panel <strong>Settings &gt; Secrets</strong> pada editor Google AI Studio Anda!
            </div>
          )}

          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-rose-700 hover:bg-rose-800 transition-colors text-white font-medium text-xs rounded-xl shadow-xs"
              id="retry-btn"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Coba Lagi
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
