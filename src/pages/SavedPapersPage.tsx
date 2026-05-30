/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Search, Trash2, Calendar, FileJson, ArrowRight, Download, BookOpen, Quote, Sparkles } from "lucide-react";
import { Paper } from "../types";
import { EmptyState } from "../components/EmptyState";
import { DownloadButton } from "../components/DownloadButton";
import { generateAPACitation, generateIEEECitation, generateMLACitation } from "../utils/citation";

const STORAGE_KEY = "literaku_saved_papers";

export function SavedPapersPage() {
  const [savedPapers, setSavedPapers] = useState<Paper[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyFormat, setCopyFormat] = useState<"APA" | "IEEE" | "MLA">("APA");

  // Load papers on mount with migration fallback
  useEffect(() => {
    loadSavedPapers();
  }, []);

  const loadSavedPapers = () => {
    try {
      const savedRaw = localStorage.getItem(STORAGE_KEY);
      if (savedRaw) {
        setSavedPapers(JSON.parse(savedRaw));
      } else {
        // Fallback or migrate old JurnalMate data
        const oldRaw = localStorage.getItem("jurnalmate_saved_papers");
        if (oldRaw) {
          localStorage.setItem(STORAGE_KEY, oldRaw);
          setSavedPapers(JSON.parse(oldRaw));
        }
      }
    } catch (err) {
      console.error("Gagal memuat paper tersimpan:", err);
    }
  };

  const deletePaper = (id: string) => {
    try {
      const updated = savedPapers.filter((p) => p.paperId !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSavedPapers(updated);
      
      // Clean up cached summary too (non-blocking)
      const cachedSummariesRaw = localStorage.getItem("jurnalmate_cached_summaries");
      if (cachedSummariesRaw) {
        const cached = JSON.parse(cachedSummariesRaw);
        delete cached[id];
        localStorage.setItem("jurnalmate_cached_summaries", JSON.stringify(cached));
      }
    } catch (err) {
      console.error("Gagal menghapus paper:", err);
    }
  };

  const exportLibraryJson = () => {
    if (savedPapers.length === 0) return;
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedPapers, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "literaku_library_export.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error("Gagal mengekspor data:", err);
    }
  };

  // Extract unique years present in stored items
  const getUniqueYears = (): number[] => {
    const yearsSet = new Set<number>();
    savedPapers.forEach((p) => {
      if (p.year) yearsSet.add(p.year);
    });
    return Array.from(yearsSet).sort((a, b) => b - a);
  };

  const uniqueYears = getUniqueYears();

  // Copy Citation Text
  const copyCitation = async (paper: Paper) => {
    let citationText = "";
    if (copyFormat === "APA") citationText = generateAPACitation(paper);
    else if (copyFormat === "IEEE") citationText = generateIEEECitation(paper);
    else citationText = generateMLACitation(paper);

    try {
      await navigator.clipboard.writeText(citationText);
      setCopiedId(paper.paperId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Gagal menyalin sitasi:", err);
    }
  };

  // Perform search and year filtering
  const filteredPapersList = savedPapers.filter((p) => {
    // Search filter
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.authors || []).some((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.venue || "").toLowerCase().includes(searchQuery.toLowerCase());

    // Year filter
    const matchesYear = selectedYear === "all" || (p.year && String(p.year) === selectedYear);

    return matchesSearch && matchesYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen" id="library-page">
      
      {/* Header section with exporting controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-literaku-sage/20 pb-6 mb-8">
        <div className="space-y-1 text-center sm:text-left">
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-literaku-forest tracking-tight flex items-center justify-center sm:justify-start gap-2.5">
            <Bookmark className="w-6.5 h-6.5 text-literaku-emerald" />
            Library Saya
          </h1>
          <p className="font-sans text-xs md:text-sm text-literaku-textMuted">
            Daftar paper pilihan Anda yang disimpan di local browser untuk penyusunan proposal penelitian.
          </p>
        </div>

        {/* Action button bar */}
        {savedPapers.length > 0 && (
          <button
            onClick={exportLibraryJson}
            className="flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl border border-literaku-sage/30 bg-literaku-mint/40 hover:bg-literaku-mint hover:text-literaku-deep transition-all font-bold text-xs text-literaku-emerald cursor-pointer shadow-3xs"
            id="export-library-btn"
            title="Ekspor seluruh daftar rujukan ke file JSON"
          >
            <FileJson className="w-4 h-4" />
            Ekspor JSON Library
          </button>
        )}
      </div>

      {/* Main interface body */}
      {savedPapers.length === 0 ? (
        <EmptyState
          icon="info"
          title="Library Masih Kosong"
          description="Anda belum menambahkan paper rujukan ke Library. Klik tombol 'Simpan' pada hasil pencarian jurnal untuk mengumpulkan literatur penting Anda di sini."
          actionButton={
            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-literaku-emerald hover:bg-literaku-deep text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              id="library-start-searching"
            >
              Mulai Cari Paper
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />
      ) : (
        <div className="space-y-6">
          
          {/* Internal filters search, years, copy types */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-literaku-soft/40 border border-literaku-sage/20 rounded-3xl p-4.5">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative flex items-center bg-white rounded-xl border border-literaku-sage/30 px-3 py-1 bg-white focus-within:border-literaku-emerald focus-within:ring-2 focus-within:ring-literaku-mint/45">
              <Search className="w-4.5 h-4.5 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari dalam library (judul, penulis, venue)..."
                className="w-full bg-transparent border-none outline-none text-xs text-slate-705 placeholder-slate-455 py-2"
                id="library-search-inline"
              />
            </div>

            {/* Publication Year selection dropdown */}
            <div className="md:col-span-3 flex items-center gap-2 bg-white rounded-xl border border-literaku-sage/30 px-3 py-1">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs text-slate-705 font-sans cursor-pointer py-2 font-semibold"
                id="library-year-filter"
              >
                <option value="all">Semua Tahun</option>
                {uniqueYears.map((y) => (
                  <option key={y} value={String(y)}>
                    Tahun {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick-copy citation type choice */}
            <div className="md:col-span-4 flex items-center justify-between gap-2.5 bg-white border border-literaku-sage/35 px-3 py-1.5 rounded-xl text-xs">
              <span className="text-slate-400 font-bold flex items-center shrink-0 uppercase tracking-wider text-[10px]">
                <Quote className="w-3.5 h-3.5 text-literaku-emerald mr-1" /> Sitasi:
              </span>
              <div className="flex bg-slate-50 p-0.5 rounded-md border border-slate-200 text-[10px] font-mono">
                {(["APA", "IEEE", "MLA"] as const).map((format) => (
                  <button
                    key={format}
                    onClick={() => setCopyFormat(format)}
                    className={`px-2 py-0.5 rounded-sm font-bold cursor-pointer ${
                      copyFormat === format
                        ? "bg-literaku-mint/60 text-literaku-deep shadow-xs border border-literaku-sage/30"
                        : "text-slate-500"
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* List of saved papers grids */}
          {filteredPapersList.length === 0 ? (
            <div className="bg-white border border-literaku-sage/20 rounded-3xl py-12 px-4 shadow-xs">
              <EmptyState
                title="Rujukan Tidak Ditemukan"
                description="Kombinasi pencarian atau filter tahun dalam library Anda tidak membuahkan hasil. Setel ulang filter atau perkecil istilah pencarian Anda."
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4" id="library-paper-feed">
              {filteredPapersList.map((paper) => (
                <div
                  key={paper.paperId}
                  className="bg-white border border-literaku-sage/30 rounded-2xl p-5 hover:border-literaku-emerald hover:shadow-literaku-mint/30 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-5 relative group"
                  id={`library-item-${paper.paperId}`}
                >
                  {/* Left Column: Metadata rujukan */}
                  <div className="flex-1 space-y-2 max-w-3xl">
                    <div className="flex items-start gap-2.5 flex-wrap">
                      <Link
                        to={`/paper/${paper.paperId}`}
                        className="font-display font-bold text-literaku-forest group-hover:text-literaku-emerald text-sm md:text-base leading-snug hover:underline pr-4 block"
                      >
                        {paper.title}
                      </Link>
                    </div>

                    <p className="text-xs text-literaku-textMuted font-sans italic">
                      Oleh:{" "}
                      <span className="font-semibold text-literaku-forest">
                        {paper.authors.length > 0
                          ? paper.authors.slice(0, 4).map((a) => a.name).join(", ")
                          : "Peneliti Publikasi Resmi"}
                        {paper.authors.length > 4 && " et al."}
                      </span>
                    </p>

                    {/* Meta tag chips */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs text-literaku-textMuted font-mono pt-1">
                      {paper.year && (
                        <span className="flex items-center gap-1 bg-literaku-soft border border-literaku-sage/10 px-2 py-0.5 rounded-md font-medium">
                          Tahun {paper.year}
                        </span>
                      )}
                      
                      {paper.venue && (
                        <span className="flex items-center gap-1 bg-literaku-soft border border-literaku-sage/10 px-2 py-0.5 rounded-md truncate max-w-[150px] font-medium">
                          {paper.venue}
                        </span>
                      )}

                      {paper.citationCount !== undefined && (
                        <span className="flex items-center gap-1 bg-literaku-soft border border-literaku-sage/10 px-2 py-0.5 rounded-md font-semibold text-literaku-emerald">
                          {paper.citationCount} Sitasi
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Interaction, Quick copy citation, downloads, deletion handles */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 flex-shrink-0 border-t sm:border-t-0 border-slate-200 pt-3 sm:pt-0">
                    
                    {/* Citations Copy handle */}
                    <button
                      onClick={() => copyCitation(paper)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                        copiedId === paper.paperId
                          ? "bg-literaku-mint/80 border-literaku-emerald text-literaku-emerald"
                          : "bg-literaku-soft border-literaku-sage/30 text-literaku-deep hover:bg-literaku-mint/50"
                      }`}
                      id={`lib-copy-${paper.paperId}`}
                    >
                      <Quote className="w-3.5 h-3.5 flex-shrink-0" />
                      {copiedId === paper.paperId ? "Tersalin!" : `Salin ${copyFormat}`}
                    </button>

                    <div className="flex items-center gap-2">
                      {/* Navigate details */}
                      <Link
                        to={`/paper/${paper.paperId}`}
                        className="p-1 px-2.5 rounded-lg border border-literaku-sage/30 text-literaku-deep hover:text-literaku-emerald hover:bg-literaku-soft hover:border-literaku-emerald bg-white transition-colors text-xs font-bold flex items-center justify-center shrink-0 min-h-[32px] cursor-pointer"
                        title="Lihat Detail & Intisari AI"
                      >
                        Detail
                      </Link>

                      {/* Download PDF Legal handles */}
                      <DownloadButton pdfUrl={paper.pdfUrl} className="min-h-[32px] text-xs py-1.5" />

                      {/* Trash Delete list item button */}
                      <button
                        onClick={() => deletePaper(paper.paperId)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all flex items-center justify-center cursor-pointer"
                        title="Hapus dari Library"
                        id={`delete-lib-${paper.paperId}`}
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
