/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, AlertCircle, Quote, Calendar, Award, ExternalLink, HelpCircle, Save, Download, RefreshCw } from "lucide-react";
import { getPaperDetail, generateAISummary } from "../services/api";
import { Paper, PaperSummary } from "../types";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { SummaryPanel } from "../components/SummaryPanel";
import { CitationBox } from "../components/CitationBox";
import { SaveButton } from "../components/SaveButton";
import { DownloadButton } from "../components/DownloadButton";

export function PaperDetailPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Extract navigation parameters
  const routeState = location.state as { queryContext?: string } | null;
  const initialQueryContext = routeState?.queryContext || "";

  // Query parameter checks (e.g. ?summary=true)
  const searchParams = new URLSearchParams(location.search);
  const shouldAutoSummarize = searchParams.get("summary") === "true";

  // Core States
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Summary States
  const [queryContext, setQueryContext] = useState(initialQueryContext);
  const [summary, setSummary] = useState<PaperSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  // Fetch paper metadata on mount
  useEffect(() => {
    if (!id) return;
    
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getPaperDetail(id);
        setPaper(result);
        
        // Auto run summarization if query param ?summary=true is parsed
        if (shouldAutoSummarize) {
          triggerAISummary(result);
        }
      } catch (err: any) {
        console.error("Gagal memuat detail paper:", err);
        setError(err.message || "Gagal menghubungi Semantic Scholar API.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, shouldAutoSummarize]);

  // Launch AI summarizing
  const triggerAISummary = async (targetPaper: Paper) => {
    setSummaryLoading(true);
    setSummaryError(null);
    setSummary(null);

    try {
      const summaryContextQuery = queryContext.trim() || "Kajian Literatur Umum";
      const aiSummary = await generateAISummary(summaryContextQuery, targetPaper);
      setSummary(aiSummary);
      
      // Save summary in local storage so next time we load, we persist details (voluntary luxury)
      const cachedSummariesRaw = localStorage.getItem("jurnalmate_cached_summaries") || "{}";
      const cached = JSON.parse(cachedSummariesRaw);
      cached[targetPaper.paperId] = aiSummary;
      localStorage.setItem("jurnalmate_cached_summaries", JSON.stringify(cached));
    } catch (err: any) {
      console.error("Failed to generate AI summary:", err);
      setSummaryError(err.message || "Gagal memproses intisari dengan Gemini AI.");
    } finally {
      setSummaryLoading(false);
    }
  };

  // Inspect cached summary
  useEffect(() => {
    if (!paper) return;
    try {
      const cachedSummariesRaw = localStorage.getItem("jurnalmate_cached_summaries");
      if (cachedSummariesRaw) {
        const cached = JSON.parse(cachedSummariesRaw);
        if (cached[paper.paperId] && !summary) {
          setSummary(cached[paper.paperId]);
        }
      }
    } catch (err) {
      console.error("Gagal memeriksa cache intisari lokal:", err);
    }
  }, [paper]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <LoadingSpinner message="Menghubungi Semantic Scholar untuk memuat detail lengkap naskah..." />
      </div>
    );
  }

  if (error || !paper) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ErrorMessage
          title="Gagal Memuat Detail"
          message={error || "Data paper ketiadaan atau ID tidak terdaftar."}
          onRetry={() => navigate("/search")}
        />
        <div className="text-center mt-4">
          <Link to="/search" className="text-blue-600 hover:underline inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Kembali ke halaman pencarian
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen" id="detail-page">
      
      {/* Navigation breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/search"
          state={{ initialQuery: queryContext }}
          className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors"
          id="back-to-search"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Pencarian
        </Link>
        
        <span className="text-xs text-slate-400 font-mono">
          Paper ID: {paper.paperId.slice(0, 8)}...
        </span>
      </div>

      {/* Main Grid: Left Column (Metadata & Abstract) vs Right Column (Sidebar Quick tools) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-10">
        
        {/* Left main columns */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xs space-y-5">
            
            {/* Title & Publishers banner */}
            <div className="space-y-2">
              <h1 className="font-display font-black text-xl sm:text-2xl md:text-3xl tracking-tight text-indigo-950 leading-snug">
                {paper.title}
              </h1>
              
              {/* Authors List */}
              <p className="font-sans text-sm text-slate-500">
                Oleh peneliti:{" "}
                <span className="font-semibold text-slate-800">
                  {paper.authors.length > 0 
                    ? paper.authors.map((a) => a.name).join(", ") 
                    : "Peneliti Publikasi Resmi"}
                </span>
              </p>
            </div>

            {/* Micro badges tags */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500">
              {paper.year && (
                <span className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  Tahun {paper.year}
                </span>
              )}
              {paper.citationCount !== undefined && (
                <span className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 font-semibold text-slate-600">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  {paper.citationCount} Sitasi Tercatat
                </span>
              )}
              
              {paper.venue && (
                <span className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200" title={paper.venue}>
                  <Quote className="w-3.5 h-3.5 text-indigo-550" />
                  {paper.venue}
                </span>
              )}

              {paper.doi && (
                <span className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                  DOI: {paper.doi}
                </span>
              )}
            </div>

            {/* Research Fields list */}
            {paper.fieldsOfStudy && paper.fieldsOfStudy.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-400 flex items-center select-none uppercase tracking-wider">Bidang:</span>
                {paper.fieldsOfStudy.map((f, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-indigo-50/70 border border-indigo-100/60 text-indigo-805 text-[11px] font-sans font-bold">
                    {f}
                  </span>
                ))}
              </div>
            )}

            {/* Core Abstract Text */}
            <div className="space-y-2 border-t border-slate-200 pt-5">
              <h3 className="font-display font-bold text-indigo-950 text-sm uppercase tracking-wider">Abstrak Jurnal</h3>
              <p className="font-sans text-sm md:text-base text-slate-600 leading-relaxed font-sans select-all indent-8">
                {paper.abstract || "Naskah publikasi ini tidak menyediakan deskripsi abstrak publik dalam catatan metadata Semantic Scholar."}
              </p>
            </div>

            {/* External link back to publisher */}
            {paper.url && (
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-650 hover:text-indigo-800 font-bold hover:underline border-t border-slate-200 pt-4 w-full"
                id="external-publisher-link"
              >
                Kunjungi Sumber Asli / Publisher Semantic Scholar
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

          </div>
        </div>

        {/* Right Columns (Action sidebar tools) */}
        <div className="space-y-6">
          
          {/* Quick Access cards for downloads, saves */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-4">
            <h3 className="font-display font-bold text-indigo-950 text-sm">Aksi Referensi</h3>
            
            <div className="grid grid-cols-1 gap-2.5">
              {/* Save Paper */}
              <SaveButton paper={paper} isFullWidth />
              
              {/* Download PDF handle */}
              <DownloadButton pdfUrl={paper.pdfUrl} isFullWidth />
            </div>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed font-sans font-medium">
              Menyimpan rujukan akan menaruhnya di Library offline lokal Anda tanpa harus mendaftar akun.
            </p>
          </div>

          {/* Citation Generator Widget box */}
          <CitationBox paper={paper} />

        </div>
      </div>

      {/* LOWER COMPONENT SECTION: AI summary triggers */}
      <div className="border-t border-slate-200/60 pt-10" id="ai-intisari-trigger-block">
        
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Custom query input if they want to associate paper with their specific thesis title */}
          {!summary && !summaryLoading && (
            <div className="bg-white border border-slate-205 rounded-3xl p-6 md:p-8 shadow-xs space-y-5 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-5 justify-between">
                <div className="space-y-1 md:flex-1">
                  <h3 className="font-display font-black text-indigo-950 text-base md:text-lg tracking-tight flex items-center justify-center md:justify-start gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-650 animate-pulse" />
                    Belum Paham Isi Paper Ini?
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-slate-500 font-medium">
                    Gunakan Gemini AI untuk meringkas abstrak, metode, kesimpulan, dan menganalisis mengapa paper ini cocok untuk rujukan skripsi Anda.
                  </p>
                </div>
                
                <button
                  onClick={() => triggerAISummary(paper)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs md:text-sm rounded-xl transition-all shadow-md shadow-indigo-100/40 active:scale-95 cursor-pointer flex-shrink-0"
                  id="generate-summary-btn-main"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  Generate Intisari AI
                </button>
              </div>

              {/* Relevance topic form */}
              <div className="border-t border-slate-200 pt-4 text-left">
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Hubungkan dengan Judul/Topik Penelitian Anda (Opsional):
                </label>
                <input
                  type="text"
                  value={queryContext}
                  onChange={(e) => setQueryContext(e.target.value)}
                  placeholder="Contoh: 'Pengaruh stres akademis terhadap insomnia pada Gen Z'"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl px-4 py-2.5 text-xs md:text-sm text-slate-700 outline-none transition-all placeholder-slate-400 focus:ring-1 focus:ring-indigo-100"
                  id="summary-topic-context"
                />
                <span className="text-[10px] text-slate-450 block mt-1 font-sans">
                  AI akan secara cerdas mengaitkan abstrak ini dengan topik Anda agar bab Latar Belakang tulisan Anda selaras.
                </span>
              </div>
            </div>
          )}

          {/* Loading spinner */}
          {summaryLoading && (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-2xs">
              <LoadingSpinner message="Gemini AI sedang menyisir setiap baris abstrak dan data rujukan untuk mendeduksi intisari cerdas..." />
            </div>
          )}

          {/* Error warning */}
          {summaryError && (
            <ErrorMessage
              title="Gagal Menghasilkan Intisari"
              message={summaryError}
              onRetry={() => triggerAISummary(paper)}
            />
          )}

          {/* Majestic summary display panel */}
          {summary && !summaryLoading && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => triggerAISummary(paper)}
                  className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors inline-flex items-center gap-1.5 p-1.5"
                  id="ref-summary-btn"
                >
                  <RefreshCw className="w-3 h-3 animate-spin duration-3000" />
                  Regenerate dengan topik baru
                </button>
              </div>
              <SummaryPanel summary={summary} />
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
