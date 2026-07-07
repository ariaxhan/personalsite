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

// MotionStrip: the proof-of-motion record, compressed to a single band for the
// homepage. All constellations merge into one per-month total, drawn as small
// bars under the era markers. No interactivity; the whole strip is a door to
// /proof. Self-contained: no props, reads the committed JSON directly.

const BAR_MAX = 72; // px

export default function MotionStrip() {
  const merged = mergedByMonth();
  const cols = MONTHS.length;
  let peak = 1;
  for (const m of MONTHS) if ((merged[m] || 0) > peak) peak = merged[m] || 0;

  const monthCol = (m: string) => MONTHS.indexOf(m) + 1; // 1-based
  const gridTemplateColumns = `repeat(${cols}, minmax(6px, 1fr))`;

  const summary = `Proof of motion: ${GRAND_TOTAL.toLocaleString()} commits across ${REPO_COUNT} repositories, ${monthLabel(
    motionData.firstMonth
  )} to ${monthLabel(motionData.lastMonth)}. View the full record.`;

  return (
    <Link
      href="/proof/"
      aria-label={summary}
      className="group block border border-[rgba(44,40,35,0.16)] bg-studio-card px-5 py-5 shadow-paper transition-colors duration-300 ease-paper hover:border-[rgba(44,40,35,0.3)] sm:px-7 sm:py-6"
    >
      {/* Header row. */}
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="kicker text-ink-faint transition-colors group-hover:text-terracotta">
          Proof of motion · live from git
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">
          {GRAND_TOTAL.toLocaleString()} commits · {REPO_COUNT} repositories
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
      <div
        aria-hidden="true"
        className="mt-2 grid border-t border-[rgba(44,40,35,0.14)] pt-2"
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

      <div className="mt-4 flex items-center justify-between">
        <span className="font-serif text-[15px] italic text-ink-ghost">
          The record, not the claim.
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint transition-colors group-hover:text-terracotta">
          See the strata &rarr;
        </span>
      </div>
    </Link>
  );
}
