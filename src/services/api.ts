/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Paper, PaperSummary, SearchResponse } from "../types";

export interface SearchFilters {
  yearFrom?: string;
  yearTo?: string;
  field?: string;
  limit?: number;
  openAccessOnly?: boolean;
}

export async function searchPapers(q: string, filters: SearchFilters = {}): Promise<SearchResponse> {
  const params = new URLSearchParams();
  params.append("q", q);
  
  if (filters.yearFrom) params.append("yearFrom", filters.yearFrom);
  if (filters.yearTo) params.append("yearTo", filters.yearTo);
  if (filters.field) params.append("field", filters.field);
  if (filters.limit) params.append("limit", String(filters.limit));
  if (filters.openAccessOnly) params.append("openAccessOnly", "true");

  const response = await fetch(`/api/search?${params.toString()}`);
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Error searching papers: ${response.statusText}`);
  }
  return response.json();
}

export async function getPaperDetail(id: string): Promise<Paper> {
  const response = await fetch(`/api/paper/${id}`);
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Error loading paper details: ${response.statusText}`);
  }
  return response.json();
}

export async function generateAISummary(query: string, paper: Paper): Promise<PaperSummary> {
  const response = await fetch("/api/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, paper })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || `Gagal menghasilkan intisari AI: ${response.statusText}`);
  }
  return response.json();
}

export async function checkServerHealth(): Promise<{ status: string; app: string }> {
  try {
    const response = await fetch("/api/health");
    if (!response.ok) throw new Error("Server unhealthy");
    return response.json();
  } catch (err) {
    return { status: "error", app: "literaKu" };
  }
}
