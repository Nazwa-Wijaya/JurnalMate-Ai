/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useNavigate } from "react-router-dom";
import { BookOpen, Sparkles, Bookmark, Download, FileText, CheckCircle2, ChevronRight, GraduationCap, Leaf } from "lucide-react";
import { SearchForm } from "../components/SearchForm";
import { SearchFilters } from "../services/api";

export function HomePage() {
  const navigate = useNavigate();

  const handleQuickSearch = (query: string, filters?: SearchFilters) => {
    navigate("/search", { 
      state: { 
        initialQuery: query, 
        initialFilters: filters || {
          yearStart: "",
          yearEnd: "",
          isOpenAccessOnly: false,
          sortByField: "relevance"
        } 
      } 
    });
  };

  const exampleChips = [
    "aplikasi prediksi kalori",
    "media sosial kesehatan mental Gen Z",
    "prediksi kelulusan mahasiswa",
    "deteksi penyakit daun",
    "chatbot layanan pelanggan"
  ];

  const features = [
    {
      title: "Masukkan Topik Penelitian",
      desc: "Ketik ide judul, pertanyaan riset, atau tema materi tugas kuliah Anda dalam bahasa Indonesia biasa.",
      icon: FileText,
      step: 1
    },
    {
      title: "AI Cari Paper Relevan",
      desc: "Sistem mendeteksi kecocokan keyword terhadap metadata & abstrak dari database akademik global (Semantic Scholar & OpenAlex).",
      icon: Sparkles,
      step: 2
    },
    {
      title: "Baca Intisari Bahasa Indonesia",
      desc: "Gemini AI menyederhanakan masalah, metode, hasil, dan kelebihan paper ke format santai yang mudah dicerna.",
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
      desc: "Ekstrak otomatis format kutipan APA, IEEE, dan MLA yang siap dicopy-paste langsung ke daftar pustaka.",
      icon: Bookmark
    },
    {
      title: "100% Legal & Etis",
      desc: "Bebas dari sumber bajakan. Semua paper dan PDF ditarik secara legal dari penerbit open access.",
      icon: Download
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-literaku-ivory text-literaku-forest font-sans" id="home-page">
      
      {/* Hero section with beautiful abstract nodes and bento design layout */}
      <section className="relative overflow-hidden bg-gradient-to-b from-literaku-ivory to-literaku-mint/20 px-4 py-16 sm:py-24 border-b border-literaku-sage/30">
        <div className="max-w-7xl mx-auto text-center space-y-10 relative z-10">
          
          {/* Mini launch chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-literaku-mint border border-literaku-sage/40 text-xs text-literaku-deep font-bold tracking-wide shadow-3xs mx-auto">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-literaku-emerald" />
            Asisten Akademik Terpercaya Anda — Bebas Jargon
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-literaku-forest leading-tight">
              Cari Paper Akademik dengan{" "}
              <span className="bg-gradient-to-r from-literaku-emerald via-literaku-teal to-literaku-deep bg-clip-text text-transparent">
                Lebih Tenang dan Tepat
              </span>
            </h1>
            <p className="font-sans text-sm md:text-base text-literaku-textMuted leading-relaxed max-w-3xl mx-auto">
              literaKu membantu kamu menemukan paper relevan, memahami intisarinya dalam bahasa Indonesia, membuat sitasi, dan menyimpan referensi penting dalam satu tempat.
            </p>
          </div>

          {/* Core grand search form */}
          <div className="shadow-xs rounded-3xl p-1 bg-white max-w-4xl mx-auto border border-literaku-sage/20">
            <SearchForm onSearch={handleQuickSearch} />
          </div>

          {/* Suggested keywords chips */}
          <div className="max-w-3xl mx-auto space-y-2">
            <p className="text-xs font-semibold text-literaku-textMuted uppercase tracking-wider">Coba cari ide topik skripsi ini:</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {exampleChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickSearch(chip)}
                  className="text-xs px-3.5 py-1.5 bg-white hover:bg-literaku-mint/60 active:scale-95 text-literaku-deep border border-literaku-sage/30 rounded-full font-medium transition-all cursor-pointer shadow-3xs"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons CTA */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate("/search")}
              className="px-6 py-3 bg-literaku-emerald hover:bg-literaku-deep text-white font-bold text-sm rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-1"
            >
              Mulai Cari Paper
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/library")}
              className="px-6 py-3 bg-white hover:bg-literaku-soft text-literaku-deep border border-literaku-sage/30 font-bold text-sm rounded-xl transition-all shadow-3xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <Bookmark className="w-4 h-4 text-literaku-teal" />
              Lihat Library
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 text-center text-slate-700 text-sm">
            <div className="flex flex-col items-center p-5 bg-white border border-literaku-sage/20 rounded-2xl shadow-3xs hover:border-literaku-emerald transition-all">
              <span className="font-display font-black text-2xl text-literaku-emerald">Ratusan Juta</span>
              <span className="text-xs text-literaku-textMuted mt-1 font-semibold uppercase tracking-wider">Sumber Paper Resmi</span>
            </div>
            <div className="flex flex-col items-center p-5 bg-white border border-literaku-sage/20 rounded-2xl shadow-3xs hover:border-literaku-emerald transition-all">
              <span className="font-display font-black text-2xl text-literaku-teal">Terbuka (OA)</span>
              <span className="text-xs text-literaku-textMuted mt-1 font-semibold uppercase tracking-wider">Download PDF Instan</span>
            </div>
            <div className="flex flex-col items-center p-5 bg-white border border-literaku-sage/20 rounded-2xl shadow-3xs hover:border-literaku-emerald transition-all">
              <span className="font-display font-black text-2xl text-literaku-deep">Intisari AI</span>
              <span className="text-xs text-literaku-textMuted mt-1 font-semibold uppercase tracking-wider">Bahasa Indonesia</span>
            </div>
          </div>

        </div>
        
        {/* Subtle decorative visual graphics background */}
        <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-literaku-mint/20 blur-3xl -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-literaku-sage/10 blur-3xl pointer-events-none" />
      </section>

      {/* 2. Cara Kerja literaKu */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" id="cara-kerja">
        <div className="text-center space-y-3 mb-16">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-literaku-forest tracking-tight">
            Bagaimana literaKu Membantu Anda?
          </h2>
          <p className="font-sans text-sm md:text-base text-literaku-textMuted max-w-sm sm:max-w-xl mx-auto">
            Proses empat langkah terpadu kami mereduksi kerumitan riset makalah skripsi dari berhari-hari menjadi hitungan menit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="relative bg-white border border-literaku-sage/20 shadow-3xs hover:border-literaku-emerald hover:shadow-xs p-6 rounded-2xl transition-all group flex flex-col">
                <div className="absolute top-4 right-4 font-mono font-bold text-2xl text-literaku-emerald/10 group-hover:text-literaku-emerald/20">
                  0{f.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-literaku-mint text-literaku-emerald flex items-center justify-center mb-5 group-hover:bg-literaku-emerald group-hover:text-white transition-all">
                  <Icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-display font-bold text-literaku-forest text-sm md:text-base tracking-tight mb-2">
                  {f.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-literaku-textMuted leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Section Kenapa literaKu? */}
      <section className="bg-literaku-forest text-white py-20 animate-fade-in" id="keuntungan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight bg-gradient-to-r from-white via-literaku-mint to-literaku-sage bg-clip-text text-transparent">
              Kenapa literaKu Berbeda?
            </h2>
            <p className="font-sans text-sm md:text-base text-literaku-sage max-w-xl mx-auto">
              Kami menggabungkan rujukan akademik yang valid dan bertenaga dengan pemahaman instan terperinci.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} className="bg-literaku-deep border border-literaku-sage/10 rounded-2xl p-6 hover:bg-literaku-forest/80 hover:border-literaku-sage/25 transition-all flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-literaku-emerald/15 text-literaku-lime flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-2">
                    {b.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-literaku-sage leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Call to Action banner inside advantages block */}
          <div className="mt-16 bg-gradient-to-r from-literaku-emerald to-literaku-deep p-8 md:p-10 rounded-3xl border border-literaku-sage/20 text-center space-y-6 max-w-4xl mx-auto shadow-xl">
            <h3 className="font-display font-extrabold text-xl md:text-2xl tracking-tight leading-snug">
              Siap Menemukan Rujukan Penelitian Terbaik Anda Sekarang?
            </h3>
            <p className="text-literaku-mint text-sm max-w-2xl mx-auto leading-relaxed">
              literaKu menggunakan indeks data grafik Semantic Scholar &amp; OpenAlex secara legal dan mengekstrak rincian ringkasan berbantuan Gemini yang andal.
            </p>
            <button
              onClick={() => navigate("/search")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 hover:shadow-lg hover:scale-[1.02] text-literaku-forest rounded-xl font-bold tracking-wide transition-all shadow-md text-sm cursor-pointer"
              id="cta-search-now"
            >
              Mulai Cari Paper
              <ChevronRight className="w-4 h-4 text-literaku-emerald" />
            </button>
          </div>

        </div>
      </section>
      
    </div>
  );
}
