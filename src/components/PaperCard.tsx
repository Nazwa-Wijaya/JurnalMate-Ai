/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { Calendar, Award, ExternalLink, Sparkles, BookOpen } from "lucide-react";
import { Paper } from "../types";
import { RelevanceBadge } from "./RelevanceBadge";
import { SaveButton } from "./SaveButton";
import { DownloadButton } from "./DownloadButton";

interface PaperCardProps {
  paper: Paper;
  queryContext?: string;
  onSaveStateChange?: (isSaved: boolean) => void;
}

export function PaperCard({ paper, queryContext = "", onSaveStateChange }: PaperCardProps) {
  // Truncate abstract
  const displayAbstract = paper.abstract
    ? paper.abstract.length > 250
      ? `${paper.abstract.slice(0, 250)}...`
      : paper.abstract
    : "Paper ini tidak memiliki abstrak publik yang tercatat di metadata.";

  // Format authors
  const formattedAuthors = () => {
    if (!paper.authors || paper.authors.length === 0) return "Peneliti tidak dikenal";
    const primary = paper.authors.slice(0, 3).map((a) => a.name).join(", ");
    if (paper.authors.length > 3) {
      return `${primary} + ${paper.authors.length - 3} lainnya`;
    }
    return primary;
  };

  return (
    <div
      className="bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-slate-100/45 hover:shadow-md rounded-2xl p-5 md:p-6 transition-all flex flex-col gap-4 animate-in fade-in duration-200"
      id={`paper-card-${paper.paperId}`}
    >
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="space-y-1">
          <Link
            to={`/paper/${paper.paperId}`}
            state={{ queryContext }}
            className="group/title flex items-start gap-1 text-slate-900 hover:text-indigo-700 transition-colors"
          >
            <h3 className="font-display font-bold text-base md:text-lg tracking-tight leading-snug group-hover/title:underline text-indigo-950">
              {paper.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 font-sans italic">
            Oleh: <span className="font-semibold text-slate-700">{formattedAuthors()}</span>
          </p>
        </div>
        
        {/* Actions/Badges block */}
        <div className="flex flex-wrap items-center gap-1.5 self-start flex-shrink-0">
          {paper.isFallback && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-sans font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded-full select-none shadow-3xs">
              Curation Database
            </span>
          )}
          {paper.relevanceScore !== undefined && paper.relevanceLabel && (
            <RelevanceBadge score={paper.relevanceScore} label={paper.relevanceLabel} />
          )}
        </div>
      </div>

      {/* Abstract snapshot */}
      <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans line-clamp-3">
        {displayAbstract}
      </p>

      {/* Relevance Reasons Checklist - marked green as specified */}
      {paper.relevanceReasons && paper.relevanceReasons.length > 0 && (
        <div className="bg-emerald-50/40 border border-emerald-100/50 p-3.5 rounded-xl space-y-1.5" id={`relevance-reasons-${paper.paperId}`}>
          <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 font-sans flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Analisis Relevansi AI:
          </div>
          <ul className="space-y-1">
            {paper.relevanceReasons.map((reason, idx) => (
              <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5 font-sans leading-relaxed">
                <span className="text-emerald-500 font-bold font-sans select-none mt-0.5 flex-shrink-0">✓</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags / Meta block */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono">
        {paper.year && (
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200/60">
            <Calendar className="w-3.5 h-3.5 text-indigo-500/80" />
            <span>Tahun {paper.year}</span>
          </div>
        )}
        
        {paper.citationCount !== undefined && (
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200/60 font-semibold text-slate-600">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>{paper.citationCount} Sitasi</span>
          </div>
        )}

        {paper.venue && (
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200/60 max-w-[200px] truncate" title={paper.venue}>
            <BookOpen className="w-3.5 h-3.5 text-indigo-500/80" />
            <span className="truncate">{paper.venue}</span>
          </div>
        )}
      </div>

      {/* Buttons / Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 mt-auto">
        <div className="flex items-center gap-2">
          {/* Detail Link */}
          <Link
            to={`/paper/${paper.paperId}`}
            state={{ queryContext }}
            className="flex items-center gap-1.5 px-3.5 py-2 hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-200 rounded-xl font-bold text-xs md:text-sm transition-all"
            id={`details-btn-${paper.paperId}`}
          >
            Lihat Detail &amp; Intisari
          </Link>
          
          <Link
            to={`/paper/${paper.paperId}?summary=true`}
            state={{ queryContext }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50/70 border border-indigo-100 hover:border-indigo-305 text-indigo-750 hover:bg-indigo-100/60 rounded-xl font-bold text-xs md:text-sm transition-all"
            id={`gen-summary-btn-${paper.paperId}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            Intisari AI
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Save & Bookmark */}
          <SaveButton paper={paper} onStateChange={onSaveStateChange} />
          
          {/* Download Legal PDF */}
          <DownloadButton pdfUrl={paper.pdfUrl} />
        </div>
      </div>
    </div>
  );
}
