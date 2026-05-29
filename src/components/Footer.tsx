/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { BookOpen, ShieldAlert } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-600 text-white shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                JurnalMate <span className="text-indigo-400 font-extrabold">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Cari paper relevan, pahami intisarinya, dan simpan referensi akademikmu dalam hitungan detik dengan bantuan kecerdasan buatan.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Peta Situs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition-colors">Utama</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-indigo-400 transition-colors">Cari Jurnal</Link>
              </li>
              <li>
                <Link to="/library" className="hover:text-indigo-400 transition-colors">Library Saya</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition-colors">Tentang Aplikasi</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Data Akademis & AI</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Aplikasi ini ditenagai data metadata akademik resmi dari Semantic Scholar API dan model bahasa generatif Google Gemini AI.
            </p>
            <div className="flex items-start gap-2 text-amber-400/90 text-[11px] bg-amber-950/40 p-2 rounded-lg border border-amber-900/40">
              <ShieldAlert className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
              <span>
                Intisari AI dihasilkan dari metadata & abstrak publik. Selalu verifikasi data langsung dari paper aslinya sebelum mensitasi.
              </span>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} JurnalMate AI. Seluruh hak cipta dilindungi. Dirancang untuk membantu mahasiswa, peneliti pemula, dan Gen Z.</p>
        </div>
      </div>
    </footer>
  );
}
