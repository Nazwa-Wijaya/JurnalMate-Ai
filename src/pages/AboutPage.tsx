/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Sparkles, ShieldCheck, Database, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function AboutPage() {
  const limitations = [
    "Aplikasi menggunakan data metadata abstrak dan sitasi dari API publik Semantic Scholar dan OpenAlex secara legal.",
    "Model bahasa kecerdasan buatan (Gemini AI) tidak selalu membaca dokumen utuh (full-text PDF) melainkan melakukan deduksi logis dari metadata dan struktur abstrak yang terekam pada API.",
    "Hasil ringkasan instan AI merupakan estimasi/intisari sekunder instan dan wajib diperiksa ulang terhadap dokumen primer (original paper) sebelum dimasukkan ke rujukan tulisan skripsi Anda.",
    "Fitur unduh (Download PDF) hanya diaktifkan untuk dokumen yang berstatus publikasi terbuka (Open Access PDF) dengan URL legal yang disediakan secara universal dari server publisher.",
    "Aplikasi ini didesain sebagai sarana asisten pembantu percepatan literature review sekunder, dan bukan pengganti aktivitas membaca artikel ilmiah original secara utuh."
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen space-y-12" id="about-page">
      
      {/* Intro Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-snug">
          Tentang JurnalMate AI
        </h1>
        <p className="font-sans text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
          Teman terbaik mahasiswa dan peneliti pemula untuk mendeduksi paper akademik seketika tanpa pusing.
        </p>
      </div>

      {/* 2. Platform Mission */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
        <h2 className="font-display font-bold text-slate-800 text-lg md:text-xl tracking-tight flex items-center gap-2">
          <GraduationCap className="w-5.5 h-5.5 text-blue-600 animate-pulse" />
          Misi JurnalMate AI
        </h2>
        <p className="font-sans text-sm text-slate-600 leading-relaxed">
          Kami menyadari bahwa mahasiswa S1, peneliti pemula, dan rekan-rekan Gen Z sering kali dihadapkan pada puluhan artikel jurnal berbahasa asing dengan terminologi akademik yang rumit saat menyusun bab Latar Belakang tulisan proposal penelitian atau skripsi.
        </p>
        <p className="font-sans text-sm text-slate-600 leading-relaxed">
          <strong>JurnalMate AI</strong> hadir untuk menjembatani jurang pemisah tersebut. Dengan mengombinasikan ketepatan pencarian metadata akademik global (Semantic Scholar API) dan kecerdasan analisis generatif bahasa Indonesia (Google Gemini AI), kami membantu Anda menyortir esensi terdalam suatu paper dalam hitungan detik.
        </p>
      </div>

      {/* 3. Tech Stack & Integration Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 shrink-0 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-display font-bold text-slate-800 text-sm md:text-base">Semantic Scholar API</h3>
            <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed">
              Daya pencarian paper ditunjang secara legal oleh grafik akademik Semantic Scholar. Kita memperoleh metadata akurat seperti penulis, tahun terbit, nama jurnal rujukan, dan hitungan database sitasi primer.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 shrink-0 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h3 className="font-display font-bold text-slate-800 text-sm md:text-base">Google Gemini AI Engine</h3>
            <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed">
              Meringkas abstrak, mendefinisikan problem, rincian metodologi riset, rincian hasil temuan, pro &amp; kontra naskah, hingga merumuskan saran skripsi dalam jangkauan kalimat bahasa Indonesia yang ramah.
            </p>
          </div>
        </div>

      </div>

      {/* 4. Limitation Section (Required) */}
      <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-6 md:p-8 space-y-4" id="platform-limitations">
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
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-650 to-indigo-655 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
          id="about-cta-btn"
        >
          Cari Paper Sekarang
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
