"use client";

import { useEffect, useState } from "react";
import SectionHeader from "./studio/SectionHeader";
import { obsessions } from "../utils/studioData";

/**
 * Obsessions: Fig. 07, lately on my mind.
 *
 * A living list. Every few seconds it reorders itself, gently, the way a pile of
 * preoccupations rearranges over a week. Nothing is added or removed; the order
 * just breathes so the section feels alive rather than fixed.
 */
export default function Obsessions() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 4200);
    return () => clearInterval(id);
  }, []);

  const ordered = obsessions
    .map((text, i) => ({ text, k: i * 7 + tick * 3 }))
    .sort((a, b) => Math.sin(a.k) - Math.sin(b.k));

  return (
    <section className="mx-auto max-w-[1120px] px-5 py-24 sm:px-8 lg:px-14 lg:py-28">
      <SectionHeader
        fig="Fig. 07"
        label="Current Obsessions"
        title="Lately, on my mind"
        note="Reshuffles on its own."
      />

      <div className="mt-10">
        {ordered.map((o) => (
          <div
            key={o.text}
            className="flex items-baseline gap-5 border-b border-dashed border-[rgba(44,40,35,0.16)] py-4 transition-opacity duration-700"
          >
            <span className="shrink-0 font-mono text-[11px] tracking-[0.1em] text-terracotta">
              Now
            </span>
            <span
              className="font-serif font-light italic leading-tight text-ink"
              style={{ fontSize: "clamp(24px, 3.6vw, 40px)" }}
            >
              {o.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
