/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Search, SlidersHorizontal, Calendar, Database, Check } from "lucide-react";
import { SearchFilters } from "../services/api";

interface SearchFormProps {
  initialQuery?: string;
  initialFilters?: SearchFilters;
  onSearch: (query: string, filters: SearchFilters) => void;
  isLoading?: boolean;
}

const FIELDS_OF_STUDY = [
  { value: "all", label: "Semua Bidang Studi" },
  { value: "Computer Science", label: "Computer Science (IT)" },
  { value: "Psychology", label: "Psikologi" },
  { value: "Education", label: "Kemahasiswaan & Pendidikan" },
  { value: "Medicine", label: "Kedokteran & Kesehatan" },
  { value: "Social Science", label: "Ilmu Sosial" },
  { value: "Business", label: "Bisnis & Ekonomi" },
  { value: "Engineering", label: "Teknik & Rekayasa" },
  { value: "Mathematics", label: "Matematika" },
];

export function SearchForm({ initialQuery = "", initialFilters = {}, onSearch, isLoading = false }: SearchFormProps) {
  const [q, setQ] = useState(initialQuery);
  const [yearFrom, setYearFrom] = useState(initialFilters.yearFrom || "");
  const [yearTo, setYearTo] = useState(initialFilters.yearTo || "");
  const [field, setField] = useState(initialFilters.field || "all");
  const [limit, setLimit] = useState(initialFilters.limit || 10);
  const [openAccessOnly, setOpenAccessOnly] = useState(initialFilters.openAccessOnly || false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    
    onSearch(q.trim(), {
      yearFrom: yearFrom.trim() || undefined,
      yearTo: yearTo.trim() || undefined,
      field: field === "all" ? undefined : field,
      limit: Number(limit),
      openAccessOnly: openAccessOnly || undefined,
    });
  };

  const handleChipsClick = (interestQuery: string) => {
    setQ(interestQuery);
    onSearch(interestQuery, {
      yearFrom: yearFrom.trim() || undefined,
      yearTo: yearTo.trim() || undefined,
      field: field === "all" ? undefined : field,
      limit: Number(limit),
      openAccessOnly: openAccessOnly || undefined,
    });
  };

  const sampleChips = [
    "aplikasi prediksi kalori",
    "media sosial kesehatan mental gen z",
    "prediksi kelulusan mahasiswa",
    "aplikasi deteksi penyakit daun",
    "chatbot layanan pelanggan"
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto" id="search-form-el">
      {/* Search Input Group */}
      <div className="relative flex items-center bg-white rounded-2xl border border-slate-200/90 shadow-sm focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100/60 p-1.5 transition-all mb-4">
        <div className="flex-shrink-0 pl-3.5 pr-1 text-slate-400">
          <Search className="w-5.5 h-5.5" />
        </div>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ketik topik penelitian (misal: 'Kesehatan mental mahasiswa kedokteran')..."
          className="flex-grow bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 px-2 py-3 text-sm md:text-base font-sans"
          disabled={isLoading}
          id="search-input"
          required
        />
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              showAdvanced || yearFrom || yearTo || field !== "all" || openAccessOnly
                ? "bg-indigo-50/60 border-indigo-200 text-indigo-700 hover:bg-indigo-100/80"
                : "bg-white border-slate-150 text-slate-500 hover:text-indigo-750 hover:bg-indigo-50/20"
            }`}
            title="Filter Pencarian Lebih Spesifik"
            id="filter-toggle-btn"
          >
            <SlidersHorizontal className="w-4.5 h-4.5" />
          </button>
          <button
            type="submit"
            disabled={isLoading || !q.trim()}
            className="px-5 py-2.5 md:py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md shadow-indigo-100/40 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            id="search-submit-btn"
          >
            {isLoading ? "Mencari..." : "Mulai Cari"}
          </button>
        </div>
      </div>

      {/* Recommended Quick Topics */}
      {q.length === 0 && !isLoading && (
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          <span className="text-slate-400 font-semibold select-none uppercase tracking-wider text-[10px]">Topik Cepat:</span>
          {sampleChips.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleChipsClick(chip)}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-250 border border-slate-200 text-slate-600 font-sans font-medium transition-all shadow-2xs hover:scale-[1.01] cursor-pointer"
            >
              “{chip}”
            </button>
          ))}
        </div>
      )}

      {/* Advanced Filters Drawer */}
      {showAdvanced && (
        <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-3 duration-200" id="advanced-filters-panel">
          
          {/* Year Range */}
          <div className="space-y-1.5 col-span-1 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-555" />
              Tahun Publikasi (Rentang)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1950"
                max="2030"
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
                placeholder="Awal (misal: 2020)"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
                id="filter-year-from"
                disabled={isLoading}
              />
              <span className="text-slate-400 text-xs">—</span>
              <input
                type="number"
                min="1950"
                max="2030"
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
                placeholder="Akhir (misal: 2026)"
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
                id="filter-year-to"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Field of Study */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-555" />
              Bidang Studi
            </label>
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none focus:border-indigo-500 cursor-pointer"
              id="filter-field"
              disabled={isLoading}
            >
              {FIELDS_OF_STUDY.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Results Limit */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              Jumlah Hasil
            </label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none focus:border-indigo-500 cursor-pointer"
              id="filter-limit"
              disabled={isLoading}
            >
              <option value={5}>5 Paper</option>
              <option value={10}>10 Paper (Default)</option>
              <option value={15}>15 Paper</option>
              <option value={20}>20 Paper</option>
              <option value={25}>25 Paper max</option>
            </select>
          </div>

          {/* Open Access Checkbox */}
          <div className="sm:col-span-2 md:col-span-4 border-t border-slate-200/60 pt-3.5 mt-1.5">
            <label className="relative flex items-center gap-2.5 cursor-pointer select-none group" id="filter-openaccess-container">
              <input
                type="checkbox"
                checked={openAccessOnly}
                onChange={(e) => setOpenAccessOnly(e.target.checked)}
                className="sr-only peer"
                disabled={isLoading}
              />
              <div className="w-5 h-5 rounded-md border border-slate-300 bg-white peer-checked:bg-indigo-600 peer-checked:border-indigo-600 flex items-center justify-center transition-all group-hover:border-indigo-400">
                <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
              </div>
              <span className="text-xs font-medium text-slate-600 group-hover:text-slate-800">
                Hanya tampilkan paper open access (yang memiliki tautan unduh PDF resmi)
              </span>
            </label>
          </div>
        </div>
      )}
    </form>
  );
}
