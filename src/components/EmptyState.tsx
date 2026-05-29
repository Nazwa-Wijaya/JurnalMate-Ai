/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import { Search, Info } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: "search" | "info";
  actionButton?: ReactNode;
}

export function EmptyState({
  title = "Tidak Ada Hasil",
  description = "Silakan coba masukkan kata kunci lain atau sesuaikan filter pencarian Anda.",
  icon = "search",
  actionButton
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-lg mx-auto" id="empty-state">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-5 shadow-xs">
        {icon === "search" ? <Search className="w-8 h-8 text-blue-500/80" /> : <Info className="w-8 h-8 text-indigo-500/80" />}
      </div>
      <h3 className="font-display font-bold text-slate-800 text-lg md:text-xl tracking-tight mb-2">
        {title}
      </h3>
      <p className="font-sans text-sm text-slate-500 leading-relaxed mb-6">
        {description}
      </p>
      {actionButton && <div className="mt-2">{actionButton}</div>}
    </div>
  );
}
