// ============================================================================
// MOTION SHARED
// Derived structures over app/utils/motionData.json, used by both the full
// strata visualization (/proof) and the compact homepage strip. Pure data, no
// React, so a server component and a client component can each import it. The
// JSON never carries private repo names, so nothing here can leak one either.
// ============================================================================

import motion from "../../utils/motionData.json";
import type { SiteContent } from "../../content/defaultContent";

export type MotionSeries = {
  label: string;
  constellation: string;
  github?: string;
  months: Record<string, number>;
  total: number;
  first: string;
  last: string;
};

export type MotionData = {
  generated: string;
  source: string;
  githubLogin: string;
  githubWindow: { from: string; to: string };
  grandTotal: number;
  githubTotalCommitContributions: number;
  supplementalCommitContributions?: number;
  repoCount: number;
  firstMonth: string;
  lastMonth: string;
  series: MotionSeries[];
  constellations: { key: string; label: string; note: string }[];
};

export const motionData = motion as unknown as MotionData;

export const GRAND_TOTAL = motionData.grandTotal;
export const REPO_COUNT = motionData.repoCount;

// The visualization axis starts before the first commit so the founder era has
// room to breathe. End follows the data.
export const AXIS_START = "2024-11";
export const AXIS_END = motionData.lastMonth;

// Accent per constellation, drawn from the warm studio palette. Muted, never
// saturated; each band stays distinguishable without shouting.
export const ACCENTS: Record<string, string> = {
  memory: "#6f8696", // dusty blue
  evals: "#b08a4c", // muted gold
  agents: "#b56a4f", // terracotta
  products: "#56695a", // forest
  companies: "#8a4b3a", // deep brick
  implementation: "#7c8b7f", // sage gray
  experiments: "#94795a", // clay
  meta: "#6b655b", // graphite
};

// Band order, top to bottom, per the commission brief.
export const BAND_ORDER = [
  "memory",
  "evals",
  "agents",
  "products",
  "companies",
  "implementation",
  "experiments",
  "meta",
];

// A month counts as a burst for a band when its combined commits clear this bar.
export const BURST_THRESHOLD = 60;

// ---------------------------------------------------------------------------
// Month helpers. Months are "YYYY-MM" strings; we convert to an integer index
// (year * 12 + monthIndex) for range math and back for labels.
// ---------------------------------------------------------------------------

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function toIndex(m: string): number {
  const [y, mo] = m.split("-").map((n) => parseInt(n, 10));
  return y * 12 + (mo - 1);
}

export function monthLabel(m: string): string {
  const [y, mo] = m.split("-").map((n) => parseInt(n, 10));
  return `${MONTH_NAMES[mo - 1]} ${y}`;
}

export function monthShort(m: string): string {
  const [, mo] = m.split("-").map((n) => parseInt(n, 10));
  return MONTH_NAMES[mo - 1];
}

export function monthRange(start: string, end: string): string[] {
  const a = toIndex(start);
  const b = toIndex(end);
  const out: string[] = [];
  for (let i = a; i <= b; i += 1) {
    const y = Math.floor(i / 12);
    const mo = (i % 12) + 1;
    out.push(`${y}-${String(mo).padStart(2, "0")}`);
  }
  return out;
}

export const MONTHS = monthRange(AXIS_START, AXIS_END);

// ---------------------------------------------------------------------------
// Eras. Ranges and captions are factual, taken from the commission context.
// ---------------------------------------------------------------------------

export type Era = {
  key: string;
  name: string;
  range: string;
  caption: string;
  start: string;
  end: string;
};

export function buildEras(
  motionCopy: SiteContent["PAGE_COPY"]["motion"],
): Era[] {
  return motionCopy.eras.map((era) => ({
    ...era,
    end: era.end === "AXIS_END" ? AXIS_END : era.end,
  }));
}

// ---------------------------------------------------------------------------
// Bands. One per constellation, carrying its per-month breakdown (which named
// series contributed, and how much) plus totals for the text alternative.
// ---------------------------------------------------------------------------

export type BandMonthPart = { label: string; count: number; github?: string };
export type BandMonth = { total: number; parts: BandMonthPart[] };

export type Band = {
  key: string;
  label: string;
  note: string;
  accent: string;
  total: number;
  first: string;
  last: string;
  byMonth: Record<string, BandMonth>;
  series: MotionSeries[];
  peak: number; // largest single-month total in this band
};

export function buildBands(): Band[] {
  const meta = new Map(motionData.constellations.map((c) => [c.key, c]));
  const bands: Band[] = [];

  for (const key of BAND_ORDER) {
    const info = meta.get(key);
    if (!info) continue;
    const seriesInBand = motionData.series.filter((s) => s.constellation === key);
    if (seriesInBand.length === 0) continue;

    const byMonth: Record<string, BandMonth> = {};
    let total = 0;
    let peak = 0;

    for (const s of seriesInBand) {
      for (const [m, count] of Object.entries(s.months)) {
        if (!byMonth[m]) byMonth[m] = { total: 0, parts: [] };
        byMonth[m].total += count;
        byMonth[m].parts.push({ label: s.label, count, github: s.github });
        total += count;
      }
    }

    // Sort each month's contributors by count, descending, for tidy captions.
    for (const m of Object.keys(byMonth)) {
      byMonth[m].parts.sort((a, b) => b.count - a.count);
      if (byMonth[m].total > peak) peak = byMonth[m].total;
    }

    const activeMonths = Object.keys(byMonth).sort();

    bands.push({
      key,
      label: info.label,
      note: info.note,
      accent: ACCENTS[key] ?? "#6b655b",
      total,
      first: activeMonths[0],
      last: activeMonths[activeMonths.length - 1],
      byMonth,
      series: seriesInBand,
      peak,
    });
  }

  return bands;
}

// Largest single-month band total across everything, for a shared size scale.
export function globalPeak(bands: Band[]): number {
  let peak = 1;
  for (const b of bands) if (b.peak > peak) peak = b.peak;
  return peak;
}

// Merged per-month total across all constellations, for the compact strip.
export function mergedByMonth(): Record<string, number> {
  const merged: Record<string, number> = {};
  for (const s of motionData.series) {
    for (const [m, count] of Object.entries(s.months)) {
      merged[m] = (merged[m] || 0) + count;
    }
  }
  return merged;
}
