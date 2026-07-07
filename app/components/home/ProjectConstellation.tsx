"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SectionHeader from "../studio/SectionHeader";
import Reveal from "../studio/Reveal";
import { projects, projectBySlug, type Project } from "../../utils/projectsData";
import { PAGE_COPY } from "../../utils/siteCopy";

// ProjectConstellation: the thirteen projects as a constellation, not a grid.
// Nodes sit in theme neighborhoods (memory NW, evals NE, agents center,
// products S, companies SW); edges come from each project's declared
// connections. Resting on a node warms its edges and neighbors and prints its
// thesis in the caption slot below; selecting one opens its story on the
// Systems or Open Source page. A plain-text index underneath carries the same
// information for readers, agents, and search. Calm by design.

// Hand-tuned positions, percent of the field. Neighborhoods, not a force layout.
const POS: Record<string, { x: number; y: number }> = {
  // memory, north-west
  metabrain: { x: 19, y: 21 },
  // evals, north-east
  "latent-diagnostics": { x: 66, y: 26 },
  "llm-bench": { x: 79, y: 19 },
  "model-familiarity-engine": { x: 88, y: 37 },
  // agents, center
  kernel: { x: 49, y: 45 },
  "the-agent-library": { x: 62, y: 55 },
  substrate: { x: 43, y: 62 },
  // companies, south-west
  heycontext: { x: 24, y: 55 },
  heycontent: { x: 13, y: 72 },
  "brink-mind": { x: 31, y: 74 },
  // products, south
  "paper-rooms": { x: 46, y: 86 },
  modelmind: { x: 58, y: 82 },
  our4cuts: { x: 70, y: 88 },
};

function targetHref(p: Project): string {
  const page = p.kind === "product" || p.kind === "company" ? "systems" : "open-source";
  return `/${page}/#${p.slug}`;
}

export default function ProjectConstellation() {
  const [active, setActive] = useState<string | null>(null);

  const nodes = useMemo(
    () => projects.filter((p) => POS[p.slug]).map((p) => ({ p, ...POS[p.slug] })),
    []
  );

  // Dedupe connection pairs into undirected edges.
  const edges = useMemo(() => {
    const seen = new Set<string>();
    const out: { a: string; b: string }[] = [];
    for (const p of projects) {
      for (const c of p.connections) {
        if (!POS[p.slug] || !POS[c]) continue;
        const key = [p.slug, c].sort().join("|");
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ a: p.slug, b: c });
      }
    }
    return out;
  }, []);

  // Neighbor set for the active node (itself included).
  const neighbors = useMemo(() => {
    const m: Record<string, Set<string>> = {};
    for (const p of projects) if (POS[p.slug]) m[p.slug] = new Set([p.slug]);
    for (const e of edges) {
      m[e.a]?.add(e.b);
      m[e.b]?.add(e.a);
    }
    return m;
  }, [edges]);

  const activeProject = active ? projectBySlug(active) : undefined;
  const caption = activeProject ? activeProject.thesis : PAGE_COPY.sections.projectMap.defaultCaption;

  return (
    <section
      className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28"
      style={{ background: "linear-gradient(180deg, #efe8da, #ece4d2)" }}
    >
      <div className="mx-auto max-w-content">
        <SectionHeader
          fig={PAGE_COPY.sections.projectMap.fig}
          label={PAGE_COPY.sections.projectMap.label}
          title={PAGE_COPY.sections.projectMap.title}
          note={PAGE_COPY.sections.projectMap.note}
        />

        <Reveal
          className="relative mt-10 overflow-hidden rounded-[5px]"
          style={{
            minHeight: "clamp(460px, 68vh, 600px)",
            background: "radial-gradient(120% 100% at 32% 8%, #f5efe2, #e7ddc9)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,.5)",
          }}
        >
          {/* edges */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {edges.map((e) => {
              const on = active != null && (e.a === active || e.b === active);
              const op = on ? 0.6 : active != null ? 0.05 : 0.14;
              return (
                <line
                  key={`${e.a}|${e.b}`}
                  x1={POS[e.a].x}
                  y1={POS[e.a].y}
                  x2={POS[e.b].x}
                  y2={POS[e.b].y}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    stroke: on ? "#b56a4f" : "#2c2823",
                    strokeWidth: on ? 1.5 : 0.85,
                    strokeOpacity: op,
                    transition: "stroke .5s ease, stroke-width .5s ease, stroke-opacity .5s ease",
                  }}
                />
              );
            })}
          </svg>

          {/* nodes */}
          {nodes.map(({ p, x, y }) => {
            const near = active != null && neighbors[active]?.has(p.slug);
            const dim = active != null && !near;
            const isActive = active === p.slug;
            return (
              <Link
                key={p.slug}
                href={targetHref(p)}
                onMouseEnter={() => setActive(p.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(p.slug)}
                onBlur={() => setActive(null)}
                aria-label={`${p.name}: ${p.thesis}`}
                className="absolute flex flex-col items-center gap-1.5"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%,-50%)",
                  opacity: dim ? 0.32 : 1,
                  transition: "opacity .55s ease",
                  width: 120,
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    width: isActive ? 12 : 8,
                    height: isActive ? 12 : 8,
                    borderRadius: "50%",
                    background: isActive ? "#b56a4f" : "#2c2823",
                    boxShadow: isActive ? "0 0 0 6px rgba(181,106,79,.14)" : "none",
                    transition: "all .5s cubic-bezier(.2,.6,.2,1)",
                  }}
                />
                <span
                  className="font-mono uppercase leading-tight"
                  style={{
                    fontSize: 10.5,
                    letterSpacing: "0.08em",
                    color: isActive ? "#b56a4f" : "#4a453d",
                    transition: "color .5s ease",
                  }}
                >
                  {p.name}
                </span>
              </Link>
            );
          })}
        </Reveal>

        {/* caption slot, fixed height so the layout never jumps */}
        <p
          className="mx-auto mt-7 max-w-[680px] text-center font-serif italic text-ink-soft"
          style={{ fontSize: "clamp(17px, 2.1vw, 23px)", lineHeight: 1.45, minHeight: "3.2em" }}
        >
          {caption}
        </p>

        {/* plain-text index: same data, readable and crawlable */}
        <div className="mt-12 border-t border-[rgba(44,40,35,0.16)] pt-8">
          <div className="kicker mb-5">{PAGE_COPY.sections.projectMap.plainText}</div>
          <ul className="grid list-none grid-cols-1 gap-x-12 gap-y-4 p-0 sm:grid-cols-2">
            {nodes.map(({ p }) => (
              <li key={p.slug} className="border-b border-[rgba(44,40,35,0.1)] pb-4">
                <Link
                  href={targetHref(p)}
                  className="group grid gap-1"
                >
                  <span className="font-serif text-[19px] font-light text-ink transition-colors group-hover:text-terracotta">
                    {p.name}
                  </span>
                  <span className="text-[14.5px] leading-[1.55] text-ink-muted">{p.thesis}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
