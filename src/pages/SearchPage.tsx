/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ListFilter, Sparkles, Filter, ChevronDown, Award } from "lucide-react";
import { searchPapers, SearchFilters } from "../services/api";
import { Paper, SearchResponse } from "../types";
import { SearchForm } from "../components/SearchForm";
import { PaperCard } from "../components/PaperCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";

type SortOption = "relevance" | "year" | "citations";

const DOMAIN_LABELS: Record<string, { label: string; bg: string; text: string; border: string }> = {
  nutrition_health: {
    label: "Gizi & Kesehatan (Kalori & Estimasi Makanan)",
    bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    text: "text-emerald-700",
    border: "border-emerald-200"
  },
  mental_health_social_media: {
    label: "Kesehatan Mental & Media Sosial Gen Z",
    bg: "bg-rose-50 text-rose-700 border-rose-200",
    text: "text-rose-700",
    border: "border-rose-200"
  },
  education_prediction: {
    label: "Prediksi Akademik & Evaluasi Pendidikan",
    bg: "bg-sky-50 text-sky-700 border-sky-200",
    text: "text-sky-700",
    border: "border-sky-200"
  },
  aquaculture_iot: {
    label: "Sistem IoT & Akuakultur Pintar (Tambak)",
    bg: "bg-amber-50 text-amber-700 border-amber-200",
    text: "text-amber-700",
    border: "border-amber-200"
  },
  other_general: {
    label: "Riset Akademik Umum",
    bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    text: "text-indigo-700",
    border: "border-indigo-200"
  }
};

export function SearchPage() {
  const location = useLocation();
  
  // States
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  // Read state from route redirection (from home)
  useEffect(() => {
    const state = location.state as { initialQuery?: string; initialFilters?: SearchFilters } | null;
    if (state && state.initialQuery) {
      handleSearch(state.initialQuery, state.initialFilters || {});
    }
  }, [location.state]);

  const handleSearch = async (newQuery: string, newFilters: SearchFilters) => {
    setQuery(newQuery);
    setFilters(newFilters);
    setLoading(true);
    setError(null);
    setPapers([]);
    setResponse(null);

    try {
      const searchRes = await searchPapers(newQuery, newFilters);
      setResponse(searchRes);
      setPapers(searchRes.papers || []);
    } catch (err: any) {
      console.error("Search failed:", err);
      setError(err.message || "Gagal melakukan pencarian paper. Silakan periksa koneksi Anda.");
    } finally {
      setLoading(false);
    }
  };

  const getSortedPapers = () => {
    const list = [...papers];
    if (sortBy === "relevance") {
      return list.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
    }
    if (sortBy === "year") {
      return list.sort((a, b) => (b.year || 0) - (a.year || 0));
    }
    if (sortBy === "citations") {
      return list.sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0));
    }
    return list;
  };

  const sortedPapersList = getSortedPapers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen" id="search-page">
      
      {/* Title block */}
      <div className="space-y-2 text-center md:text-left mb-8">
        <h1 className="font-display font-black text-2xl md:text-3xl text-indigo-950 tracking-tight flex items-center justify-center md:justify-start gap-2.5">
          <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
          Ekspedisi Pencarian Paper
        </h1>
        <p className="font-sans text-sm text-slate-500 max-w-xl">
          Temukan paper yang kredibel secara etis dan hitung estimasi relevansinya secara instan dengan mesin rekomendasi AI.
        </p>
      </div>

      {/* Embedded top-level search form - Styled like a bento container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs mb-8">
        <SearchForm
          initialQuery={query}
          initialFilters={filters}
          onSearch={handleSearch}
          isLoading={loading}
        />
      </div>

      {/* AI Analytical Insights Bento-Dashboard Section */}
      {!loading && !error && response && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" id="ai-insights-dashboard">
          {/* Domain & Transference card */}
          <div className="md:col-span-2 bg-white border border-slate-250 p-5 rounded-3xl space-y-4 shadow-3xs">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400">
                Sistem Klasifikasi Domain AI:
              </span>
              {DOMAIN_LABELS[response.detectedDomain] ? (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${DOMAIN_LABELS[response.detectedDomain].bg}`}>
                  {DOMAIN_LABELS[response.detectedDomain].label}
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {response.detectedDomain || "Riset Akademik Umum"}
                </span>
              )}
            </div>

            {response.expandedQueries && response.expandedQueries.length > 0 && (
              <div className="space-y-1.5 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-sans font-semibold text-slate-400 uppercase tracking-wider block">
                  Translasi & Ekspansi Kata Kunci Akademik:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-lg border border-slate-200 font-medium">
                    "{response.originalQuery}"
                  </span>
                  <span className="text-xs text-slate-300 font-bold">➔</span>
                  {response.expandedQueries.slice(0, 3).map((eq, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-1 bg-indigo-50/50 text-indigo-600 border border-indigo-100/80 rounded-lg font-mono font-medium">
                      "{eq}"
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filtering Performance Card */}
          <div className="bg-white border border-slate-250 p-5 rounded-3xl flex flex-col justify-between shadow-3xs">
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Efisiensi Query & Filter AI
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-450 block">Ditemukan S2/API:</span>
                  <div className="text-2xl font-bold font-display text-indigo-900">
                    {response.totalFoundBeforeFiltering}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-450 block">Lulus Ambang Batas:</span>
                  <div className="text-2xl font-bold font-display text-emerald-600">
                    {response.totalAfterFiltering}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-sans leading-tight mt-3 border-t border-slate-100 pt-2">
              Papers dengan skor relevansi di bawah threshold (&lt; 50) disisihkan secara otomatis untuk meningkatkan akurasi.
            </p>
          </div>
        </div>
      )}

      {/* Fast search recommendation chips */}
      {!loading && !error && response?.suggestedKeywords && response.suggestedKeywords.length > 0 && (
        <div className="mb-8 space-y-2.5" id="suggested-keywords-chips">
          <div className="text-xs font-sans font-bold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-indigo-500" />
            Topik & Istilah Terkait Untuk Dieksplorasi:
          </div>
          <div className="flex flex-wrap gap-2">
            {response.suggestedKeywords.map((kw, idx) => (
              <button
                key={idx}
                onClick={() => handleSearch(kw, filters)}
                className="text-xs px-3.5 py-1.5 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 rounded-full font-sans font-medium transition-all duration-150 active:scale-95 cursor-pointer"
              >
                # {kw}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sorting panel & outcomes */}
      {papers.length > 0 && !loading && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6" id="sorting-panel-container">
          <div className="text-slate-600 text-sm font-sans font-medium">
            Menampilkan <span className="font-bold text-indigo-600">{papers.length}</span> paper rujukan berkualitas
          </div>
          
          {/* Sorting choices selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-xs font-sans font-semibold flex items-center gap-1">
              <ListFilter className="w-3.5 h-3.5" />
              Urutkan berdasarkan:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-250 rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-slate-700 cursor-pointer outline-none focus:border-indigo-500 transition-all font-sans"
                id="search-sorting-select"
              >
                <option value="relevance">Skor Relevansi (Terbaik)</option>
                <option value="year">Tahun Terbaru</option>
                <option value="citations">Sitasi Terbanyak</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute top-2.5 right-3.5 pointer-events-none" />
            </div>
          </div>
        </div>
      )}

      {/* Search results rendering area */}
      <div className="space-y-6">
        
        {/* Loading details wrapper */}
        {loading && <LoadingSpinner />}

        {/* Error warning detail */}
        {error && (
          <ErrorMessage
            message={error}
            onRetry={() => handleSearch(query, filters)}
          />
        )}

        {/* Comprehensive Empty state matching the Indonesia slang instructions */}
        {!loading && !error && query && papers.length === 0 && (
          <div className="bg-white border border-slate-200 p-10 rounded-3xl shadow-2xs text-center space-y-6 max-w-2xl mx-auto" id="no-relevant-papers-empty">
            <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-500">
              <Filter className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-lg text-slate-800">
                Pencarian tidak membuahkan hasil relevan
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Kami tidak menemukan rujukan akademik yang lulus filter kelayakan atau batas minimum skor relevansi (Skor ≥ 50) untuk kata kunci <span className="font-mono bg-slate-50 px-1.5 py-0.5 border rounded text-rose-600 font-semibold">"{query}"</span>.
              </p>
            </div>

            {response?.suggestedKeywords && response.suggestedKeywords.length > 0 && (
              <div className="space-y-3 pt-5 border-t border-slate-100">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 block">
                  Coba Salah Satu Istilah Rekomendasi AI Berikut:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {response.suggestedKeywords.map((kw, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearch(kw, filters)}
                      className="text-xs px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 rounded-full font-sans font-medium transition-all duration-150 cursor-pointer"
                    >
                      # {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-xs text-slate-400 italic font-sans pt-1">
              "Jujurly, mending pakai keyword Bahasa Inggris di atas demi hasil riset jurnal internasional yang super legit."
            </div>
          </div>
        )}

        {/* Default landing prompt */}
        {!loading && !error && !query && (
          <div className="text-center py-20 text-slate-400 font-sans space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100/60 flex items-center justify-center mx-auto text-slate-400">
              <Filter className="w-7 h-7" />
            </div>
            <div className="max-w-md mx-auto">
              <h3 className="font-semibold text-slate-700 text-sm md:text-base">Mulai Petualangan Riset Anda</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Gunakan boks pencari di atas untuk mencari jurnal ilmiah. Sistem kami akan memperluas query Anda secara otomatis ke literatur global yang sejalan dengan bidang riset Anda!
              </p>
            </div>
          </div>
        )}

        {/* The beautiful paper card feeds */}
        {!loading && !error && sortedPapersList.length > 0 && (
          <div className="grid grid-cols-1 gap-6" id="search-results-feed">
            {sortedPapersList.map((paper) => (
              <PaperCard
                key={paper.paperId}
                paper={paper}
                queryContext={query}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
