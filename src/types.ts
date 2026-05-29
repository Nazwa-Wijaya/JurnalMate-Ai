/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Author {
  authorId?: string;
  name: string;
}

export interface Paper {
  paperId: string;
  title: string;
  authors: Author[];
  year?: number;
  venue?: string;
  abstract?: string;
  citationCount?: number;
  fieldsOfStudy?: string[];
  url?: string;
  doi?: string;
  pdfUrl?: string;
  relevanceScore?: number;
  relevanceLabel?: string;
  relevanceReasons?: string[];
  isFallback?: boolean;
}

export interface SearchResponse {
  originalQuery: string;
  expandedQueries: string[];
  detectedDomain: string;
  suggestedKeywords: string[];
  totalFoundBeforeFiltering: number;
  totalAfterFiltering: number;
  papers: Paper[];
}

export interface PaperSummary {
  intisariSingkat: string;
  masalahYangDibahas: string;
  tujuanPenelitian: string;
  metodePenelitian: string;
  hasilUtama: string;
  kesimpulan: string;
  kelebihanPaper: string[];
  keterbatasanPaper: string[];
  relevansiDenganTopik: string;
  keywordPenting: string[];
  saranPenggunaan: string[];
}
