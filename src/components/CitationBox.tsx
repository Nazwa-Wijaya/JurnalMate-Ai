/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Copy, Check, Quote } from "lucide-react";
import { Paper } from "../types";
import { generateAPACitation, generateIEEECitation, generateMLACitation } from "../utils/citation";

interface CitationBoxProps {
  paper: Paper;
}

type CitationStyle = "APA" | "IEEE" | "MLA";

export function CitationBox({ paper }: CitationBoxProps) {
  const [style, setStyle] = useState<CitationStyle>("APA");
  const [copied, setCopied] = useState(false);

  const getCitationText = (): string => {
    switch (style) {
      case "APA":
        return generateAPACitation(paper);
      case "IEEE":
        return generateIEEECitation(paper);
      case "MLA":
        return generateMLACitation(paper);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getCitationText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin teks sitasi:", err);
    }
  };

  return (
    <div className="bg-white border border-slate-205 rounded-3xl p-6 shadow-2xs" id="citation-box">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-indigo-950">
          <Quote className="w-4 h-4 text-indigo-500" />
          <h4 className="font-display font-bold text-sm tracking-tight text-indigo-950 uppercase">Sitasi Akademik</h4>
        </div>
        
        {/* Style selection buttons */}
        <div className="flex bg-slate-50 p-0.5 rounded-lg border border-slate-200 text-xs font-mono">
          {(["APA", "IEEE", "MLA"] as CitationStyle[]).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                style === s
                  ? "bg-white text-indigo-600 shadow-xs border border-indigo-100"
                  : "text-slate-500 hover:text-slate-705"
              }`}
              id={`citation-styleBtn-${s}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Citation text box */}
      <div className="relative bg-slate-50/50 border border-slate-200/80 rounded-xl p-4 pr-12 text-xs md:text-sm text-slate-700 leading-relaxed font-sans min-h-[4rem] group">
        <p className="select-all break-words">{getCitationText()}</p>
        
        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 transition-colors focus:ring-2 focus:ring-indigo-500/25 cursor-pointer shadow-2xs"
          title="Salin Sitasi"
          id="copy-citation-btn"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <Copy className="w-4 h-4 text-slate-500" />
          )}
        </button>
      </div>
      
      <p className="text-[10px] text-slate-400 mt-2 text-right">
        Klik ikon salin di atas untuk menaruh sitasi di clipboard Anda.
      </p>
    </div>
  );
}
