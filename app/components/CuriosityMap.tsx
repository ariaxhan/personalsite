"use client";

import { useMemo, useState } from "react";
import SectionHeader from "./studio/SectionHeader";
import Reveal from "./studio/Reveal";
import { topics, topicEdges, mapDefaultBlurb } from "../utils/studioData";

/**
 * CuriosityMap: Fig. 04, ideas that recognize each other.
 *
 * Not a network graph, a constellation. Topics sit where they fall; the lines
 * between them stay faint until you rest on a star, and then its neighbours warm
 * up and the rest of the sky dims. The caption underneath narrates whatever you
 * are looking at.
 */
export default function CuriosityMap() {
  const [active, setActive] = useState<number | null>(null);

  const adj = useMemo(() => {
    const a: Record<number, Set<number>> = {};
    topics.forEach((_, i) => (a[i] = new Set([i])));
    topicEdges.forEach(([x, y]) => {
      a[x].add(y);
      a[y].add(x);
    });
    return a;
  }, []);

  const blurb = active != null ? topics[active].blurb : mapDefaultBlurb;

  return (
    <section
      className="px-5 py-24 sm:px-8 lg:px-14 lg:py-32"
      style={{ background: "linear-gradient(180deg, #efe8da, #ece4d2)" }}
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader
          fig="Fig. 04"
          label="Curiosity Map"
          title="Ideas that recognize each other"
          note="A constellation, not a network. Hover a point."
        />

        <Reveal
          className="relative mt-10 overflow-hidden rounded-[5px]"
          style={{
            minHeight: "clamp(440px, 62vh, 540px)",
            background: "radial-gradient(120% 100% at 30% 10%, #f5efe2, #e7ddc9)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,.5)",
          }}
        >
          {/* faint scattered stars */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: 0.5,
              backgroundImage:
                "radial-gradient(1.5px 1.5px at 14% 22%, rgba(44,40,35,.25), transparent), radial-gradient(1.5px 1.5px at 72% 18%, rgba(44,40,35,.2), transparent), radial-gradient(1.5px 1.5px at 46% 64%, rgba(44,40,35,.2), transparent), radial-gradient(1.5px 1.5px at 88% 72%, rgba(44,40,35,.18), transparent), radial-gradient(1.5px 1.5px at 24% 82%, rgba(44,40,35,.2), transparent)",
            }}
          />

          {/* connecting lines */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {topicEdges.map(([x, y], i) => {
              const on = active != null && (x === active || y === active);
              const op = on ? 0.65 : active != null ? 0.05 : 0.16;
              return (
                <line
                  key={i}
                  x1={topics[x].x}
                  y1={topics[x].y}
                  x2={topics[y].x}
                  y2={topics[y].y}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    stroke: on ? "#b56a4f" : "#2c2823",
                    strokeWidth: on ? 1.6 : 0.9,
                    strokeOpacity: op,
                    transition: "stroke .55s ease, stroke-width .55s ease, stroke-opacity .55s ease",
                  }}
                />
              );
            })}
          </svg>

          {/* topic points */}
          {topics.map((t, i) => {
            const near = active != null && adj[active].has(i);
            const dim = active != null && !near;
            const isActive = active === i;
            return (
              <button
                key={t.name}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(isActive ? null : i)}
                className="absolute flex cursor-pointer flex-col items-center gap-2 border-0 bg-transparent"
                style={{
                  left: `${t.x}%`,
                  top: `${t.y}%`,
                  transform: "translate(-50%,-50%)",
                  opacity: dim ? 0.32 : 1,
                  transition: "opacity .6s ease",
                }}
              >
                <span
                  style={{
                    width: isActive ? 13 : 8,
                    height: isActive ? 13 : 8,
                    borderRadius: "50%",
                    background: isActive ? "#b56a4f" : "#2c2823",
                    boxShadow: isActive ? "0 0 0 7px rgba(181,106,79,.14)" : "none",
                    transition: "all .5s cubic-bezier(.2,.6,.2,1)",
                  }}
                />
                <span
                  className="font-serif text-ink"
                  style={{
                    fontSize: isActive ? 23 : 20,
                    fontStyle: near ? "italic" : "normal",
                    lineHeight: 1,
                    transition: "all .5s ease",
                  }}
                >
                  {t.name}
                </span>
              </button>
            );
          })}
        </Reveal>

        <p
          className="mx-auto mt-7 max-w-[640px] text-center font-serif italic text-ink-soft"
          style={{ fontSize: "clamp(18px, 2.2vw, 24px)", lineHeight: 1.45, minHeight: "2.6em" }}
        >
          {blurb}
        </p>
      </div>
    </section>
  );
}
