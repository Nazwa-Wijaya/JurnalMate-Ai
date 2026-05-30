/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, HelpCircle, CheckCircle, AlertTriangle, Target, Lightbulb, FileText, ChevronRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { PaperSummary } from "../types";

interface SummaryPanelProps {
  summary: PaperSummary;
}

export function SummaryPanel({ summary }: SummaryPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyText = async () => {
    try {
      const textToCopy = `
=== INTISARI PAPER DIGITAL (literaKu) ===

1. Intisari Singkat:
${summary.intisariSingkat}

2. Masalah yang Dibahas:
${summary.masalahYangDibahas}

3. Tujuan Penelitian:
${summary.tujuanPenelitian}

4. Metode Penelitian:
${summary.metodePenelitian}

5. Hasil Utama:
${summary.hasilUtama}

6. Kesimpulan:
${summary.kesimpulan}

7. Kelebihan Paper:
${summary.kelebihanPaper.map(p => `- ${p}`).join("\n")}

8. Keterbatasan Paper:
${summary.keterbatasanPaper.map(p => `- ${p}`).join("\n")}

9. Relevansi dengan Topik:
${summary.relevansiDenganTopik}

10. Saran Penggunaan:
${summary.saranPenggunaan.map(s => `- ${s}`).join("\n")}

11. Keyword Penting:
${summary.keywordPenting.join(", ")}
      `.trim();

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin ringkasan:", err);
    }
  };

  return (
    <div className="bg-literaku-pale border border-literaku-sage/35 rounded-3xl p-6 md:p-8 shadow-xs space-y-8 animate-in fade-in zoom-in-95 duration-300" id="summary-panel">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-literaku-sage/20 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-literaku-emerald text-white shadow-xs">
            <Sparkles className="w-5.5 h-5.5" />
          </div>
          <div>
            <h3 className="font-display font-black text-literaku-forest text-lg md:text-xl tracking-tight">
              Intisari Paper AI
            </h3>
            <p className="text-xs text-literaku-emerald font-bold uppercase tracking-wider text-[10px]">
              Analisis cerdas instan oleh Google Gemini AI
            </p>
          </div>
        </div>
        
        {/* Copy Entire Summary Button */}
        <button
          onClick={handleCopyText}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-literaku-soft border border-literaku-sage/30 text-literaku-deep hover:text-literaku-emerald font-bold text-xs transition-all shadow-2xs self-start sm:self-center cursor-pointer"
          id="copy-all-summary-btn"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-literaku-emerald" />
              Tersalin!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-literaku-textMuted" />
              Salin Ringkasan AI
            </>
          )}
        </button>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 1. Intisari Singkat */}
        <div className="col-span-1 md:col-span-2 bg-white/80 p-5 rounded-2xl border border-literaku-sage/20 shadow-3xs">
          <h4 className="font-display font-bold text-literaku-forest text-sm md:text-base flex items-center gap-2 mb-3 uppercase tracking-wide">
            <FileText className="w-4.5 h-4.5 text-literaku-emerald" />
            1. Intisari Singkat
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed font-sans font-medium">{summary.intisariSingkat}</p>
        </div>

        {/* 2. Masalah & 3. Tujuan */}
        <div className="bg-white/80 p-5 rounded-2xl border border-literaku-sage/20 shadow-3xs">
          <h4 className="font-display font-bold text-literaku-forest text-sm md:text-base flex items-center gap-2 mb-3 uppercase tracking-wide">
            <HelpCircle className="w-4.5 h-4.5 text-literaku-emerald" />
            2. Masalah yang Dibahas
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed font-sans">{summary.masalahYangDibahas}</p>
        </div>

        <div className="bg-white/80 p-5 rounded-2xl border border-literaku-sage/20 shadow-3xs">
          <h4 className="font-display font-bold text-literaku-forest text-sm md:text-base flex items-center gap-2 mb-3 uppercase tracking-wide">
            <Target className="w-4.5 h-4.5 text-literaku-emerald" />
            3. Tujuan Penelitian
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed font-sans">{summary.tujuanPenelitian}</p>
        </div>

        {/* 4. Metode & 5. Hasil */}
        <div className="bg-white/80 p-5 rounded-2xl border border-literaku-sage/20 shadow-3xs">
          <h4 className="font-display font-bold text-literaku-forest text-sm md:text-base flex items-center gap-2 mb-3 uppercase tracking-wide">
            <FileText className="w-4.5 h-4.5 text-literaku-emerald" />
            4. Metode Penelitian
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed font-sans">{summary.metodePenelitian}</p>
        </div>

        <div className="bg-white/80 p-5 rounded-2xl border border-literaku-sage/20 shadow-3xs">
          <h4 className="font-display font-bold text-literaku-forest text-sm md:text-base flex items-center gap-2 mb-3 uppercase tracking-wide">
            <Lightbulb className="w-4.5 h-4.5 text-literaku-emerald" />
            5. Hasil Utama
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed font-sans">{summary.hasilUtama}</p>
        </div>

        {/* 6. Kesimpulan */}
        <div className="col-span-1 md:col-span-2 bg-white/80 p-5 rounded-2xl border border-literaku-sage/20 shadow-3xs">
          <h4 className="font-display font-bold text-literaku-forest text-sm md:text-base flex items-center gap-2 mb-3 uppercase tracking-wide">
            <CheckCircle className="w-4.5 h-4.5 text-literaku-emerald" />
            6. Kesimpulan Paper
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed font-sans">{summary.kesimpulan}</p>
        </div>

        {/* 7. Kelebihan & 8. Keterbatasan (Side by Side Grid) */}
        <div className="bg-literaku-soft/40 p-5 rounded-2xl border border-literaku-sage/20 shadow-3xs space-y-3">
          <h4 className="font-display font-bold text-literaku-forest text-sm md:text-base flex items-center gap-2 uppercase tracking-wide">
            <CheckCircle className="w-4.5 h-4.5 text-literaku-emerald" />
            7. Kelebihan Paper
          </h4>
          <ul className="space-y-2.5">
            {summary.kelebihanPaper.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-literaku-deep leading-relaxed font-medium">
                <ChevronRight className="w-4 h-4 text-literaku-emerald flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-55/35 p-5 rounded-2xl border border-orange-200/50 shadow-3xs space-y-3">
          <h4 className="font-display font-bold text-orange-950 text-sm md:text-base flex items-center gap-2 uppercase tracking-wide">
            <AlertTriangle className="w-4.5 h-4.5 text-orange-605" />
            8. Keterbatasan Paper
          </h4>
          <ul className="space-y-2.5">
            {summary.keterbatasanPaper.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-orange-950 leading-relaxed font-medium">
                <ChevronRight className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 9. Kenapa Relevan */}
        <div className="col-span-1 md:col-span-2 bg-literaku-mint/40 p-5 rounded-2xl border border-literaku-sage/30 shadow-3xs">
          <h4 className="font-display font-bold text-literaku-forest text-sm md:text-base flex items-center gap-2 mb-3 uppercase tracking-wide">
            <Sparkles className="w-4.5 h-4.5 text-literaku-emerald" />
            9. Kenapa Relevan dengan Topik Anda
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed font-sans font-medium">{summary.relevansiDenganTopik}</p>
        </div>

        {/* 11. Saran Penggunaan */}
        <div className="col-span-1 md:col-span-2 bg-white/80 p-5 rounded-2xl border border-literaku-sage/20 shadow-3xs space-y-3">
          <h4 className="font-display font-bold text-literaku-forest text-sm md:text-base flex items-center gap-2 uppercase tracking-wide">
            <Target className="w-4.5 h-4.5 text-literaku-emerald" />
            10. Saran Penggunaan / Pemanfaatan Bab Rujukan
          </h4>
          <div className="flex flex-wrap gap-2 pt-1">
            {summary.saranPenggunaan.map((saran, idx) => {
              // Custom badges for target rujukan sections
              let badgeStyle = "bg-white text-slate-700 border-slate-200/90";
              const lcSaran = saran.toLowerCase();
              if (lcSaran.includes("latar") || lcSaran.includes("belakang")) {
                badgeStyle = "bg-literaku-soft text-literaku-deep border-literaku-sage/40 font-bold";
              } else if (lcSaran.includes("teori") || lcSaran.includes("pendukung")) {
                badgeStyle = "bg-emerald-50 text-literaku-emerald border-literaku-sage/20 font-bold";
              } else if (lcSaran.includes("metode")) {
                badgeStyle = "bg-amber-50 text-amber-800 border-amber-200/80 font-bold";
              } else if (lcSaran.includes("pembanding") || lcSaran.includes("hasil")) {
                badgeStyle = "bg-emerald-50 text-emerald-800 border-emerald-250 font-bold";
              } else if (lcSaran.includes("literature") || lcSaran.includes("review")) {
                badgeStyle = "bg-cyan-50 text-cyan-800 border-cyan-200/80 font-bold";
              }
              
              return (
                <span key={idx} className={`px-3.5 py-1.5 rounded-xl border text-xs leading-relaxed ${badgeStyle}`}>
                  {saran}
                </span>
              );
            })}
          </div>
        </div>

        {/* 10. Keyword Penting */}
        <div className="col-span-1 md:col-span-2 bg-white p-5 rounded-2xl border border-literaku-sage/25 shadow-2xs space-y-3">
          <h4 className="font-display font-semibold text-literaku-forest text-xs uppercase tracking-wider">
            11. Kata Kunci Terkait
          </h4>
          <div className="flex flex-wrap gap-2">
            {summary.keywordPenting.map((word, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-literaku-soft hover:bg-literaku-mint hover:text-literaku-deep text-slate-700 text-xs font-mono font-semibold rounded-xl border border-literaku-sage/20 cursor-default select-all transition-all">
                #{word}
              </span>
            ))}
          </div>
        </div>

      </div>
      
      {/* Disclaimer disclaimer */}
      <p className="text-[10px] text-literaku-textMuted text-center select-none pt-4">
        Disclaimer: Ringkasan cerdas di atas diekstrak dan dideduksi murni berdasarkan metadata/abstrak paper yang tersedia secara publik. Selalu verifikasi ulang dengan membaca naskah asli (full-text) PDF paper induk sebelum mencantumkannya dalam rujukan resmi skripsi atau literature review Anda.
      </p>
    </div>
  );
}
