import Link from "next/link";
import {
  MONTHS,
  ERAS,
  GRAND_TOTAL,
  REPO_COUNT,
  motionData,
  monthLabel,
  mergedByMonth,
} from "./motionShared";
import { PAGE_COPY } from "../../utils/siteCopy";

// MotionStrip: the proof-of-motion record, compressed to a single band for the
// homepage. All constellations merge into one per-month total, drawn as small
// bars under the era markers. No interactivity; the whole strip is a door to
// /proof. Self-contained: no props, reads the committed JSON directly.

const BAR_MAX = 72; // px
const MOBILE_ERA_LABELS: Record<string, string> = {
  founder: "Founder",
  independent: "Research",
  implementation: "Build",
};

export default function MotionStrip() {
  const merged = mergedByMonth();
  const cols = MONTHS.length;
  let peak = 1;
  for (const m of MONTHS) if ((merged[m] || 0) > peak) peak = merged[m] || 0;

  const monthCol = (m: string) => MONTHS.indexOf(m) + 1; // 1-based
  const gridTemplateColumns = `repeat(${cols}, minmax(6px, 1fr))`;

  const copy = PAGE_COPY.motion;
  const summary = `${copy.stripSummaryPrefix} ${GRAND_TOTAL.toLocaleString()} ${copy.stripSummaryMiddle} ${REPO_COUNT} ${copy.stripSummarySuffix}, ${monthLabel(
    motionData.firstMonth
  )} to ${monthLabel(motionData.lastMonth)}. ${copy.stripSummaryCta}`;

  return (
    <Link
      href="/proof/"
      aria-label={summary}
      className="group block border border-[rgba(44,40,35,0.16)] bg-studio-card px-4 py-5 shadow-paper transition-colors duration-300 ease-paper hover:border-[rgba(44,40,35,0.3)] sm:px-7 sm:py-6"
    >
      {/* Header row. */}
      <div className="mb-4 flex flex-col items-start gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-6">
        <span className="kicker text-ink-faint transition-colors group-hover:text-terracotta">
          {copy.stripLabel}
        </span>
        <span className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-ink-mute sm:text-[11px] sm:tracking-[0.16em]">
          {GRAND_TOTAL.toLocaleString()} {copy.commits} · {REPO_COUNT} {copy.stripSummarySuffix}
        </span>
      </div>

      {/* Bars: one per month, height by merged commit count. */}
      <div
        aria-hidden="true"
        className="grid items-end gap-[2px]"
        style={{ gridTemplateColumns, height: BAR_MAX }}
      >
        {MONTHS.map((m) => {
          const count = merged[m] || 0;
          const h = count > 0 ? Math.max(3, (Math.sqrt(count) / Math.sqrt(peak)) * BAR_MAX) : 0;
          const t = count > 0 ? Math.sqrt(count) / Math.sqrt(peak) : 0;
          return (
            <span
              key={m}
              className="block w-full rounded-[1px]"
              style={{
                height: h || 2,
                background: count > 0 ? "#b56a4f" : "rgba(44,40,35,0.08)",
                opacity: count > 0 ? 0.4 + t * 0.6 : 1,
              }}
            />
          );
        })}
      </div>

      {/* Era markers, aligned under the bars. */}
      <div aria-hidden="true" className="mt-2 grid grid-cols-3 border-t border-[rgba(44,40,35,0.14)] pt-2 sm:hidden">
        {ERAS.map((era, i) => (
          <div
            key={era.key}
            className="min-w-0 px-2 first:pl-0 last:pr-0"
            style={{ borderLeft: i === 0 ? "none" : "1px solid rgba(44,40,35,0.14)" }}
          >
            <span className="block truncate font-mono text-[8.5px] uppercase leading-relaxed tracking-[0.08em] text-ink-mute">
              {MOBILE_ERA_LABELS[era.key] ?? era.name}
            </span>
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="mt-2 hidden border-t border-[rgba(44,40,35,0.14)] pt-2 sm:grid"
        style={{ gridTemplateColumns }}
      >
        {ERAS.map((era, i) => (
          <div
            key={era.key}
            style={{
              gridColumn: `${monthCol(era.start)} / ${monthCol(era.end) + 1}`,
              borderLeft: i === 0 ? "none" : "1px solid rgba(44,40,35,0.14)",
              paddingLeft: i === 0 ? 0 : 8,
            }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-mute">
              {era.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-serif text-[15px] italic leading-snug text-ink-ghost">
          {copy.stripClaim}
        </span>
        <span className="self-end font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint transition-colors group-hover:text-terracotta sm:self-auto sm:text-[11px] sm:tracking-[0.16em]">
          {copy.stripCta} &rarr;
        </span>
      </div>
    </Link>
  );
}
