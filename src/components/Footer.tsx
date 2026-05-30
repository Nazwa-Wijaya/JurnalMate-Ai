/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { BookOpen, ShieldAlert } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-literaku-forest text-slate-300 mt-auto border-t border-literaku-deep/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-literaku-emerald text-white shadow-xs">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                literaKu
              </span>
            </div>
            <p className="text-sm text-literaku-textMuted leading-relaxed max-w-sm">
              Temukan paper relevan, pahami intisarinya, dan susun referensimu dengan lebih tenang.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Peta Situs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-literaku-sage transition-colors">Utama</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-literaku-sage transition-colors">Cari Jurnal</Link>
              </li>
              <li>
                <Link to="/library" className="hover:text-literaku-sage transition-colors">Library Saya</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-literaku-sage transition-colors">Tentang Aplikasi</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">Data Akademis & AI</h3>
            <p className="text-xs text-literaku-textMuted leading-relaxed mb-3">
              Aplikasi ini ditenagai data metadata akademik resmi dari Semantic Scholar API, OpenAlex Discovery API, dan ringkasan dibantu oleh Google Gemini AI.
            </p>
            <div className="flex items-start gap-2 text-literaku-lime text-[11px] bg-literaku-deep/60 p-2 rounded-lg border border-literaku-sage/20">
              <ShieldAlert className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
              <span>
                Intisari AI dihasilkan dari metadata & abstrak publik. Selalu verifikasi data langsung dari paper aslinya sebelum mensitasi.
              </span>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-literaku-deep/80 text-center text-xs text-literaku-textMuted">
          <p>© 2026 literaKu. Dibuat untuk membantu pencarian referensi akademik yang lebih mudah dan etis.</p>
        </div>
      </div>
    </footer>
  );
}
