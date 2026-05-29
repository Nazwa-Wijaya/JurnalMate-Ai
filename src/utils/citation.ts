/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Paper, Author } from "../types";

function parseName(fullName: string) {
  const clean = fullName.trim();
  const parts = clean.split(/\s+/);
  if (parts.length === 1) {
    return { last: parts[0], initial: parts[0][0] || "", raw: clean };
  }
  const last = parts[parts.length - 1];
  const firsts = parts.slice(0, -1);
  const initials = firsts.map(f => f[0] ? `${f[0]}.` : "").join("");
  return { last, initial: initials, raw: clean };
}

export function generateAPACitation(paper: Paper): string {
  if (!paper.authors || paper.authors.length === 0) {
    const title = paper.title || "Untitled Paper";
    const year = paper.year ? `(${paper.year})` : "(n.d.)";
    const venue = paper.venue ? `. ${paper.venue}` : "";
    const doiText = paper.doi ? `. https://doi.org/${paper.doi}` : (paper.url ? `. ${paper.url}` : "");
    return `${title}. ${year}${venue}${doiText}`;
  }

  const formattedAuthors = paper.authors.map((author, index) => {
    const parsed = parseName(author.name);
    const nameStr = parsed.last && parsed.initial ? `${parsed.last}, ${parsed.initial.split("").join(". ")}.` : author.name;
    
    if (index === 0) return nameStr;
    if (index === paper.authors.length - 1) return ` & ${nameStr}`;
    return `, ${nameStr}`;
  }).join("");

  const yearStr = paper.year ? `(${paper.year})` : "(n.d.)";
  const titleStr = paper.title ? `${paper.title}.` : "Untitled paper.";
  const venueStr = paper.venue ? ` ${paper.venue},` : "";
  const doiStr = paper.doi ? ` https://doi.org/${paper.doi}` : (paper.url ? ` ${paper.url}` : "");

  return `${formattedAuthors} ${yearStr}. ${titleStr}${venueStr}${doiStr}`.replace(/\.\./g, ".").trim();
}

export function generateIEEECitation(paper: Paper): string {
  if (!paper.authors || paper.authors.length === 0) {
    const title = paper.title ? `"${paper.title}"` : '"Untitled Paper"';
    const venue = paper.venue ? `, in ${paper.venue}` : "";
    const year = paper.year ? `, ${paper.year}` : "";
    const urlText = paper.doi ? `, DOI: ${paper.doi}` : (paper.url ? `, URL: ${paper.url}` : "");
    return `${title}${venue}${year}${urlText}.`;
  }

  const formattedAuthors = paper.authors.map((author, index) => {
    const parsed = parseName(author.name);
    const initialName = parsed.initial && parsed.last ? `${parsed.initial.split("").join(". ")}. ${parsed.last}` : author.name;
    
    if (index === 0) return initialName;
    if (index === paper.authors.length - 1) {
      return paper.authors.length === 2 ? ` and ${initialName}` : `, and ${initialName}`;
    }
    return `, ${initialName}`;
  }).join("");

  const titleStr = paper.title ? `"${paper.title},"` : '"Untitled,"';
  const venueStr = paper.venue ? ` in ${paper.venue},` : "";
  const yearStr = paper.year ? ` ${paper.year}.` : "";
  const linkStr = paper.doi ? ` DOI: ${paper.doi}.` : (paper.url ? ` URL: ${paper.url}.` : "");

  return `${formattedAuthors}, ${titleStr}${venueStr}${yearStr}${linkStr}`.replace(/\.\./g, ".").trim();
}

export function generateMLACitation(paper: Paper): string {
  if (!paper.authors || paper.authors.length === 0) {
    const title = paper.title ? `"${paper.title}."` : '"Untitled Paper."';
    const venue = paper.venue ? ` ${paper.venue},` : "";
    const year = paper.year ? ` ${paper.year},` : "";
    const urlText = paper.doi ? ` doi:${paper.doi}.` : (paper.url ? ` ${paper.url}.` : "");
    return `${title}${venue}${year}${urlText}`;
  }

  let formattedAuthors = "";
  if (paper.authors.length === 1) {
    const parsed = parseName(paper.authors[0].name);
    formattedAuthors = parsed.last && parsed.initial ? `${parsed.last}, ${parsed.raw.split(/\s+/)[0]}` : paper.authors[0].name;
  } else if (paper.authors.length === 2) {
    const parsed1 = parseName(paper.authors[0].name);
    const name1 = parsed1.last && parsed1.initial ? `${parsed1.last}, ${parsed1.raw.split(/\s+/)[0]}` : paper.authors[0].name;
    const name2 = paper.authors[1].name;
    formattedAuthors = `${name1}, and ${name2}`;
  } else {
    const parsed1 = parseName(paper.authors[0].name);
    const name1 = parsed1.last && parsed1.initial ? `${parsed1.last}, ${parsed1.raw.split(/\s+/)[0]}` : paper.authors[0].name;
    formattedAuthors = `${name1}, et al`;
  }

  const titleStr = paper.title ? `"${paper.title}."` : '"Untitled."';
  const venueStr = paper.venue ? ` ${paper.venue},` : "";
  const yearStr = paper.year ? ` ${paper.year},` : "";
  const linkStr = paper.doi ? ` doi:${paper.doi}.` : (paper.url ? ` ${paper.url}.` : "");

  return `${formattedAuthors}. ${titleStr}${venueStr}${yearStr}${linkStr}`.replace(/\.\./g, ".").trim();
}
