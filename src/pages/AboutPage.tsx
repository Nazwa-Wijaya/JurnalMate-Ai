/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Sparkles, ShieldCheck, Database, GraduationCap, ArrowRight, Search, Download } from "lucide-react";
import { Link } from "react-router-dom";

export function AboutPage() {
  const limitations = [
    "Aplikasi menggunakan data metadata abstrak dan sitasi dari API publik Semantic Scholar dan OpenAlex secara resmi.",
    "Model bahasa kecerdasan buatan (Gemini AI) tidak selalu membaca dokumen utuh (full-text PDF) melainkan melakukan analisis logis dari metadata dan struktur abstrak yang tersedia.",
    "Hasil ringkasan instan AI merupakan estimasi/intisari sekunder instan dan wajib diperiksa ulang terhadap dokumen primer (original paper) sebelum dimasukkan ke rujukan skripsi atau makalah resmi.",
    "Fitur unduh (Download PDF) hanya diaktifkan untuk dokumen yang berstatus publikasi terbuka (Open Access PDF) dengan URL resmi yang disediakan secara terbuka dari server penerbit.",
    "Aplikasi ini didesain sebagai sarana asisten pembantu percepatan literature review sekunder, dan bukan pengganti aktivitas membaca artikel ilmiah original secara utuh."
  ];

  const corePillars = [
    {
      title: "1. Apa itu literaKu",
      desc: "literaKu adalah asisten penjelas dan pencari paper akademik modern dalam Bahasa Indonesia yang didesain untuk mahasiswa, akademisi, dan peneliti muda. Kami mendedikasikan aplikasi ini sebagai sarana pendamping riset yang handal, tenang, dan bebas jargon.",
      icon: BookOpen,
      color: "bg-literaku-mint text-literaku-deep"
    },
    {
      title: "2. Masalah yang Diselesaikan",
      desc: "Banyak mahasiswa merasa kewalahan saat harus mengulas puluhan jurnal asing karena kosa kata teoretis yang rumit. literaKu menerjemahkan hambatan ini menjadi penjelas modular yang ramah dikonsumsi demi kemudahan pengerjaan skripsi Anda.",
      icon: Search,
      color: "bg-literaku-soft text-literaku-emerald"
    },
    {
      title: "3. Cara Kerja Sistem",
      desc: "Masukkan topik pencarian, literaKu memperluas kueri dan melakukan penyaringan domain terarah. Kami kemudian menghitung skor relevansi makalah lalu memadukannya dengan intisari AI otomatis untuk hasil riset instan.",
      icon: Sparkles,
      color: "bg-literaku-mint text-literaku-teal"
    },
    {
      title: "4. Teknologi yang Digunakan",
      desc: "Kami mengintegrasikan Semantic Scholar Graph, OpenAlex Discovery, serta Google Gemini AI API SDK. Kombinasi ini menjamin pencarian rujukan valid dengan mesin ringkasan sekunder yang responsif dan andal.",
      icon: Database,
      color: "bg-literaku-soft text-literaku-emerald"
    },
    {
      title: "5. Etika Download Paper",
      desc: "Kami sangat menjunjung tinggi hak cipta akademik. Semua unduhan artikel (Full PDF) disajikan melalui pranala legal Open Access resmi tanpa menggunakan akses ilegal atau tidak etis.",
      icon: Download,
      color: "bg-literaku-mint text-literaku-deep"
    },
    {
      title: "6. Batasan Aplikasi",
      desc: "Kecerdasan buatan membantu memetakan kerangka abstrak primer. Pengguna tetap diimbau melakukan pemeriksaan komparatif langsung pada bagian naskah utama sebelum mencantumkannya pada bagian rujukan.",
      icon: ShieldCheck,
      color: "bg-literaku-soft text-literaku-teal"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen space-y-12" id="about-page">
      
      {/* Intro Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-literaku-emerald text-white shadow-xs">
          <BookOpen className="w-7 h-7 text-white" />
        </div>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-literaku-forest tracking-tight leading-snug">
          Tentang literaKu
        </h1>
        <p className="font-sans text-sm md:text-base text-literaku-textMuted max-w-xl mx-auto leading-relaxed">
          Temukan paper relevan, pahami intisarinya, dan susun referensimu dengan lebih tenang.
        </p>
      </div>

      {/* Grid Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {corePillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div key={idx} className="bg-white border border-literaku-sage/20 rounded-3xl p-6 shadow-3xs flex gap-4 hover:border-literaku-emerald hover:shadow-xs transition-all duration-200">
              <div className={`w-10 h-10 rounded-xl ${pillar.color} shrink-0 flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-literaku-forest text-sm md:text-base">{pillar.title}</h3>
                <p className="font-sans text-xs md:text-sm text-literaku-textMuted leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Core Mission */}
      <div className="bg-literaku-pale border border-literaku-sage/20 rounded-3xl p-6 md:p-8 space-y-4">
        <h2 className="font-display font-bold text-literaku-forest text-lg tracking-tight flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-literaku-emerald" />
          Komitmen Literasi Akademik
        </h2>
        <p className="font-sans text-sm text-literaku-textMuted leading-relaxed">
          Kami menyadari bahwa mahasiswa S1, peneliti pemula, dan rekan-rekan mahasiswa sering kali dihadapkan pada puluhan artikel jurnal berbahasa asing dengan terminologi akademik yang rumit saat menyusun bab Latar Belakang (Bab I) tulisan proposal penelitian atau skripsi.
        </p>
        <p className="font-sans text-sm text-literaku-textMuted leading-relaxed">
          <strong>literaKu</strong> hadir untuk menjembatani jurang pemisah tersebut. Dengan mengombinasikan ketepatan pencarian metadata akademik global (Semantic Scholar API & OpenAlex API) dan kecerdasan analisis generatif bahasa Indonesia (Google Gemini AI), kami membantu Anda menyortir esensi terdalam suatu paper dalam hitungan detik.
        </p>
      </div>

      {/* Limitations Disclaimer */}
      <div className="bg-amber-50/40 border border-amber-100 rounded-3xl p-6 md:p-8 space-y-4 shadow-3xs" id="platform-limitations">
        <h2 className="font-display font-bold text-amber-900 text-sm md:text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          Batasan &amp; Disclaimer Aplikasi
        </h2>
        <ul className="space-y-3">
          {limitations.map((limit, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600 leading-relaxed">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0 mt-2" />
              <span>{limit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Footer */}
      <div className="text-center pt-4">
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-6 py-3 bg-literaku-emerald hover:bg-literaku-deep text-white font-bold text-sm rounded-xl transition-all shadow-xs active:scale-[0.98] cursor-pointer"
          id="about-cta-btn"
        >
          Mulai Cari Paper Sekarang
          <ArrowRight className="w-4 h-4 text-white" />
        </Link>
      </div>

    </div>
  );
}
