"use client";

import { useState } from "react";
import {
  MONTHS,
  ERAS,
  BURST_THRESHOLD,
  GRAND_TOTAL,
  REPO_COUNT,
  motionData,
  monthLabel,
  buildBands,
  globalPeak,
  type Band,
  type BandMonth,
} from "./motionShared";

// Strata: build activity read like sediment. Time runs left to right, one
// horizontal band per constellation, each month a mark whose size is its commit
// count. Bursts get a number. Everything has a text equivalent below, so the
// picture is a bonus, never the only way in.

const GUTTER = 148; // px, left label column
const ROW_H = 54; // px, band row height
const MIN_MARK = 5;
const MAX_MARK = 34;

function markSize(count: number, peak: number): number {
  if (count <= 0) return 0;
  const t = Math.sqrt(count) / Math.sqrt(peak);
  return MIN_MARK + t * (MAX_MARK - MIN_MARK);
}

function captionFor(band: Band, month: string, cell: BandMonth): string {
  const parts = cell.parts.map((p) => `${p.label} ${p.count}`).join(", ");
  const many = cell.parts.length > 1 ? ` (${cell.total} commits)` : "";
  return `${band.label} · ${monthLabel(month)}: ${parts}${many}`;
}

function activeSpan(band: Band): string {
  return band.first === band.last
    ? monthLabel(band.first)
    : `${monthLabel(band.first)} to ${monthLabel(band.last)}`;
}

export default function MotionStrata() {
  const bands = buildBands();
  const peak = globalPeak(bands);
  const cols = MONTHS.length;

  const defaultCaption = `${GRAND_TOTAL.toLocaleString()} commits across ${REPO_COUNT} repositories, ${monthLabel(
    motionData.firstMonth
  )} to ${monthLabel(motionData.lastMonth)}. Hover or focus a mark for the month.`;

  const [caption, setCaption] = useState<string | null>(null);

  const monthCol = (m: string) => MONTHS.indexOf(m) + 2; // +1 gutter, +1 one-based
  const gridTemplateColumns = `${GUTTER}px repeat(${cols}, minmax(20px, 1fr))`;

  return (
    <div>
      {/* Live caption line: reflects the focused or hovered mark. */}
      <p
        aria-live="polite"
        className="m-0 mb-5 min-h-[2.6em] font-mono text-[12px] leading-relaxed text-ink-faint sm:min-h-[1.6em]"
      >
        {caption ?? defaultCaption}
      </p>

      <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <div style={{ minWidth: GUTTER + cols * 22 }}>
          {/* Era header: three spans marking the shape of the years. */}
          <div
            className="grid"
            style={{ gridTemplateColumns }}
            aria-hidden="true"
          >
            <div />
            {ERAS.map((era, i) => (
              <div
                key={era.key}
                className="pb-3"
                style={{
                  gridColumn: `${monthCol(era.start)} / ${monthCol(era.end) + 1}`,
                  borderLeft: i === 0 ? "none" : "1px solid rgba(44,40,35,0.18)",
                  paddingLeft: i === 0 ? 0 : 10,
                }}
              >
                <div className="kicker mb-1 normal-case tracking-[0.14em] text-ink-faint">
                  {era.name}
                </div>
                <div className="font-serif text-[13px] italic leading-snug text-ink-ghost">
                  {era.caption}
                </div>
                <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-mute">
                  {era.range}
                </div>
              </div>
            ))}
          </div>

          {/* Bands. */}
          <div className="border-t border-[rgba(44,40,35,0.16)]">
            {bands.map((band) => (
              <div
                key={band.key}
                className="grid items-center border-b border-[rgba(44,40,35,0.09)]"
                style={{ gridTemplateColumns, height: ROW_H }}
              >
                {/* Left label. */}
                <div className="flex flex-col justify-center pr-4">
                  <span className="flex items-center gap-2 text-[13px] leading-tight text-ink">
                    <span
                      aria-hidden="true"
                      className="inline-block h-2.5 w-2.5 shrink-0 rounded-[2px]"
                      style={{ background: band.accent }}
                    />
                    {band.label}
                  </span>
                  <span className="pl-[18px] font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-mute">
                    {band.total.toLocaleString()} commits
                  </span>
                </div>

                {/* Month cells. */}
                {MONTHS.map((m) => {
                  const cell = band.byMonth[m];
                  if (!cell) {
                    return (
                      <div
                        key={m}
                        aria-hidden="true"
                        className="flex h-full items-center justify-center"
                      >
                        <span
                          className="inline-block rounded-full"
                          style={{
                            width: 3,
                            height: 3,
                            background: "rgba(44,40,35,0.08)",
                          }}
                        />
                      </div>
                    );
                  }
                  const size = markSize(cell.total, peak);
                  const t = Math.sqrt(cell.total) / Math.sqrt(peak);
                  const burst = cell.total >= BURST_THRESHOLD;
                  const label = captionFor(band, m, cell);
                  return (
                    <div
                      key={m}
                      className="relative flex h-full items-center justify-center"
                    >
                      {burst && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[9px] leading-none"
                          style={{ color: band.accent }}
                        >
                          {cell.total}
                        </span>
                      )}
                      <button
                        type="button"
                        aria-label={label}
                        onMouseEnter={() => setCaption(label)}
                        onMouseLeave={() => setCaption(null)}
                        onFocus={() => setCaption(label)}
                        onBlur={() => setCaption(null)}
                        className="grid cursor-help place-items-center border-0 bg-transparent p-0 transition-transform duration-200 ease-paper hover:scale-110 focus-visible:scale-110"
                        style={{ width: MAX_MARK, height: MAX_MARK, minHeight: 0 }}
                      >
                        <span
                          className="block rounded-[2px]"
                          style={{
                            width: size,
                            height: size,
                            background: band.accent,
                            opacity: 0.45 + t * 0.55,
                          }}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Text alternative: the same record, read as a list. This is the
          accessible source of truth, not a fallback afterthought. */}
      <div className="mt-14">
        <h3 className="kicker mb-6">The record, in plain text</h3>
        <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {bands.map((band) => (
            <div
              key={band.key}
              className="border-t border-[rgba(44,40,35,0.16)] pt-4"
            >
              <dt className="mb-1 flex items-center gap-2 font-serif text-[19px] text-ink">
                <span
                  aria-hidden="true"
                  className="inline-block h-3 w-3 shrink-0 rounded-[2px]"
                  style={{ background: band.accent }}
                />
                {band.label}
              </dt>
              <dd className="m-0 text-[14px] leading-relaxed text-ink-faint">
                <span className="text-ink">
                  {band.total.toLocaleString()} commits
                </span>
                , {activeSpan(band)}.{" "}
                <span className="text-ink-ghost">{band.note}</span>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-ink-mute">
                  {band.series.map((s) => (
                    <li key={s.label}>
                      {s.github ? (
                        <a
                          href={s.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-b border-[rgba(44,40,35,0.25)] pb-px transition-colors hover:border-terracotta hover:text-terracotta"
                        >
                          {s.label} {s.total}
                        </a>
                      ) : (
                        <span>
                          {s.label} {s.total}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
