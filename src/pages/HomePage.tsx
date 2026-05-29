/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useNavigate } from "react-router-dom";
import { BookOpen, Sparkles, Bookmark, Download, FileText, CheckCircle2, ChevronRight, GraduationCap } from "lucide-react";
import { SearchForm } from "../components/SearchForm";
import { SearchFilters } from "../services/api";

export function HomePage() {
  const navigate = useNavigate();

  const handleQuickSearch = (query: string, filters: SearchFilters) => {
    // Redirect to search page with state
    navigate("/search", { state: { initialQuery: query, initialFilters: filters } });
  };

  const features = [
    {
      title: "Masukkan Topik Penelitian",
      desc: "Ketik ide judul, pertanyaan riset, atau tema materi tugas kuliah Anda dalam bahasa Indonesia biasa.",
      icon: FileText,
      step: 1
    },
    {
      title: "AI Cari Paper Relevan",
      desc: "Sistem mendeteksi kecocokan keyword terhadap metadata & abstrak dari jutaan database dari Semantic Scholar API.",
      icon: Sparkles,
      step: 2
    },
    {
      title: "Baca Intisari Bahasa Indonesia",
      desc: "Gemini AI menyederhanakan masalah, metode, hasil, dan kelebihan paper ke naskah santai yang mudah dicerna.",
      icon: BookOpen,
      step: 3
    },
    {
      title: "Simpan & Unduh Secara Legal",
      desc: "Kumpulkan rujukan Anda di Library dan miliki PDF aslinya seketika jika berstatus open access.",
      icon: Download,
      step: 4
    }
  ];

  const benefits = [
    {
      title: "Hemat Waktu Skripsi",
      desc: "Kurangi riset bulanan membaca ratusan halaman paper yang ternyata tidak relevan bagi skripsi Anda.",
      icon: CheckCircle2
    },
    {
      title: "Bahasa Bebas Jargon",
      desc: "Tidak pusing lagi dengan bahasa akademik rumit. Intisari diterjemahkan ke bahasa yang masuk akal.",
      icon: GraduationCap
    },
    {
      title: "Sitasi Cepat Tiga Format",
      desc: "Ekstrak otomatis format kutipan APA, IEEE, dan MLA yang siap di-copas langsung ke daftar pustaka.",
      icon: Bookmark
    },
    {
      title: "100% Legal & Etis",
      desc: "Bebas dari sumber bajakan. Semua paper dan PDF ditarik secara legal dari penerbit open access.",
      icon: Download
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans" id="home-page">
      
      {/* Hero section with beautiful abstract nodes and bento design layout */}
      <section className="relative overflow-hidden bg-white px-4 py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto text-center space-y-10 relative z-10 animate-fade-in">
          
          {/* Mini launch chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-150/40 text-xs text-indigo-700 font-bold tracking-wide shadow-xs mx-auto">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-500" />
            Asisten Akademik AI Terpercaya Anda
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-indigo-950 leading-tight">
              Review Literatur Skripsi Jadi{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 bg-clip-text text-transparent">
                Lancar &amp; Menyenangkan
              </span>
            </h1>
            <p className="font-sans text-sm md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
              <strong>Cari paper relevan, pahami intisarinya, dan simpan referensi akademikmu</strong> tanpa pusing dengan jargon rumit — ditenagai Semantic Scholar &amp; Google Gemini AI.
            </p>
          </div>

          {/* Core grand search form */}
          <div className="shadow-xs rounded-3xl p-1 bg-slate-50 max-w-4xl mx-auto border border-slate-200">
            <SearchForm onSearch={handleQuickSearch} />
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 text-center text-slate-700 text-sm">
            <div className="flex flex-col items-center p-5 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-indigo-100 transition-all">
              <span className="font-display font-black text-2xl text-indigo-600">Ratusan Juta</span>
              <span className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Paper Resmi</span>
            </div>
            <div className="flex flex-col items-center p-5 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-indigo-100 transition-all">
              <span className="font-display font-black text-2xl text-emerald-600">Terbuka (OA)</span>
              <span className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Download PDF Instan</span>
            </div>
            <div className="flex flex-col items-center p-5 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-indigo-100 transition-all">
              <span className="font-display font-black text-2xl text-indigo-805">Intisari AI</span>
              <span className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">Bahasa Indonesia</span>
            </div>
          </div>

        </div>
        
        {/* Subtle decorative visual graphics background */}
        <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-indigo-100/10 blur-3xl -translate-y-1/2 mix-blend-multiply pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-violet-100/10 blur-3xl pointer-events-none" />
      </section>

      {/* 2. Cara Kerja JurnalMate AI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="cara-kerja">
        <div className="text-center space-y-3 mb-16">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-indigo-950 tracking-tight">
            Bagaimana JurnalMate AI Membantu Anda?
          </h2>
          <p className="font-sans text-sm md:text-base text-slate-500 max-w-sm sm:max-w-xl mx-auto">
            Proses empat langkah terpadu kami mereduksi kerumitan riset makalah skripsi dari berhari-hari menjadi hitungan menit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="relative bg-white border border-slate-200 shadow-2xs hover:border-indigo-400 hover:shadow-xs p-6 rounded-2xl transition-all group flex flex-col">
                <div className="absolute top-4 right-4 font-mono font-bold text-2xl text-indigo-500/15 group-hover:text-indigo-550/25">
                  0{f.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-display font-bold text-indigo-950 text-sm md:text-base tracking-tight mb-2">
                  {f.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Section Kenapa JurnalMate AI? */}
      <section className="bg-slate-900 text-white py-20" id="keuntungan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Kenapa JurnalMate AI Berbeda?
            </h2>
            <p className="font-sans text-sm md:text-base text-slate-400 max-w-xl mx-auto">
              Kami menggabungkan rujukan akademik yang valid dan bertenaga dengan pemahaman instan terperinci.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} className="bg-slate-805 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800 hover:border-slate-700 transition-all flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-2">
                    {b.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-slate-400 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Call to Action banner inside advantages block */}
          <div className="mt-16 bg-gradient-to-r from-indigo-700 to-violet-850 p-8 md:p-10 rounded-3xl border border-indigo-500/20 text-center space-y-6 max-w-4xl mx-auto shadow-xl">
            <h3 className="font-display font-extrabold text-xl md:text-2xl tracking-tight leading-snug">
              Siap Menemukan Rujukan Penelitian Terbaik Anda Sekarang?
            </h3>
            <p className="text-indigo-100/90 text-sm max-w-2xl mx-auto leading-relaxed">
              JurnalMate AI menggunakan indeks data grafik Semantic Scholar secara legal dan mengekstrak ringkasan menggunakan Gemini yang objektif.
            </p>
            <button
              onClick={() => navigate("/search")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-150 hover:shadow-lg hover:scale-[1.02] text-indigo-900 rounded-xl font-bold tracking-wide transition-all shadow-md text-sm cursor-pointer"
              id="cta-search-now"
            >
              Mulai Cari Paper
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>
      
    </div>
  );
}
