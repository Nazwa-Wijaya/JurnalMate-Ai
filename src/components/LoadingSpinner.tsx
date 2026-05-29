/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
}

const DEFAULT_MESSAGES = [
  "Mencari index paper di database Semantic Scholar...",
  "Menganalisis relevansi dengan topik penelitian...",
  "Mengambil metadata publikasi (penulis, tahun, jurnal)...",
  "Menyusun visualisasi skor relevansi...",
  "Menyiapkan intisari AI dalam bahasa Indonesia...",
];

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    if (message) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % DEFAULT_MESSAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 border-r-blue-600"
          id="loading-spinner-circle"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-blue-600 animate-pulse" />
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={message || msgIndex}
        className="font-sans text-slate-600 text-sm font-medium tracking-wide max-w-md"
        id="loading-spinner-message"
      >
        {message || DEFAULT_MESSAGES[msgIndex]}
      </motion.p>
      
      {!message && (
        <span className="text-[11px] text-slate-400 mt-2 font-mono">
          Mohon tunggu, ini mungkin memerlukan waktu beberapa detik...
        </span>
      )}
    </div>
  );
}
