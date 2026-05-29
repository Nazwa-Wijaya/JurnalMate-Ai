/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Paper } from "../types";

interface SaveButtonProps {
  paper: Paper;
  className?: string;
  isFullWidth?: boolean;
  onStateChange?: (isSaved: boolean) => void;
}

const STORAGE_KEY = "jurnalmate_saved_papers";

export function SaveButton({ paper, className = "", isFullWidth = false, onStateChange }: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const savedRaw = localStorage.getItem(STORAGE_KEY);
      if (savedRaw) {
        const list: Paper[] = JSON.parse(savedRaw);
        setIsSaved(list.some((p) => p.paperId === paper.paperId));
      }
    } catch (err) {
      console.error("Gagal mengecek status simpan paper:", err);
    }
  }, [paper.paperId]);

  const toggleSave = (e: MouseEvent) => {
    e.stopPropagation();
    try {
      const savedRaw = localStorage.getItem(STORAGE_KEY);
      let list: Paper[] = savedRaw ? JSON.parse(savedRaw) : [];
      
      let nextSavedStatus = false;
      if (isSaved) {
        // Remove
        list = list.filter((p) => p.paperId !== paper.paperId);
        nextSavedStatus = false;
      } else {
        // Add (prevent duplicates)
        if (!list.some((p) => p.paperId === paper.paperId)) {
          list.push(paper);
        }
        nextSavedStatus = true;
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      setIsSaved(nextSavedStatus);
      
      if (onStateChange) {
        onStateChange(nextSavedStatus);
      }
    } catch (err) {
      console.error("Gagal merubah status simpan paper:", err);
    }
  };

  const baseStyles = "flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all border shadow-xs active:scale-[0.98]";

  if (isSaved) {
    return (
      <button
        onClick={toggleSave}
        className={`${baseStyles} bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 ${isFullWidth ? "w-full" : ""} ${className}`}
        id={`save-btn-active-${paper.paperId}`}
        title="Hapus dari Library"
      >
        <BookmarkCheck className="w-4.5 h-4.5 text-indigo-600" />
        Tersimpan
      </button>
    );
  }

  return (
    <button
      onClick={toggleSave}
      className={`${baseStyles} bg-white border-slate-200 text-slate-705 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-250 ${isFullWidth ? "w-full" : ""} ${className} cursor-pointer`}
      id={`save-btn-inactive-${paper.paperId}`}
      title="Simpan untuk Dibaca Nanti"
    >
      <Bookmark className="w-4.5 h-4.5 text-slate-400 group-hover:text-indigo-500 font-bold" />
      Simpan ke Library
    </button>
  );
}
