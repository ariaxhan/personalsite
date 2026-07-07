import Link from "next/link";
import SectionHeader from "../studio/SectionHeader";
import Reveal from "../studio/Reveal";
import { engagements } from "../../utils/workWithMeData";
import { PAGE_COPY } from "../../utils/siteCopy";

// WhatIBuild: Fig. 01, the seven kinds of engagement, sourced from
// workWithMeData. Each row is a compact typographic entry (a tiny CSS-drawn
// glyph, a serif title, a one-line detail) and a door to the contact page.
// Two columns on large screens.
export default function WhatIBuild() {
  return (
    <section className="mx-auto max-w-content px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
      <SectionHeader
        fig={PAGE_COPY.sections.whatIBuild.fig}
        label={PAGE_COPY.sections.whatIBuild.label}
        title={PAGE_COPY.sections.whatIBuild.title}
        note={PAGE_COPY.sections.whatIBuild.note}
      />

      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-1 lg:grid-cols-2">
        {engagements.map((e, i) => (
          <Reveal key={e.title} delay={Math.min(i, 6) * 40}>
            <Link
              href="/contact/"
              className="group grid grid-cols-[auto_1fr] items-start gap-5 border-b border-[rgba(44,40,35,0.12)] py-6 transition-colors hover:border-[rgba(44,40,35,0.3)]"
            >
              <span
                className="mt-1 grid h-10 w-10 shrink-0 place-items-center"
                aria-hidden="true"
              >
                <RowGlyph i={i} />
              </span>
              <span className="grid gap-1.5">
                <span className="font-serif text-[22px] font-light leading-tight text-ink transition-colors group-hover:text-terracotta">
                  {e.title}
                </span>
                <span className="max-w-[46ch] text-[15px] leading-[1.6] text-ink-muted">
                  {e.detail}
                </span>
              </span>
            </Link>
          </Reveal>
        ))}

        {/* Keep the final row balanced on two columns with a quiet door out. */}
        <Reveal delay={280} className="hidden lg:block">
          <Link
            href="/contact/"
            className="group grid h-full grid-cols-[auto_1fr] items-center gap-5 border-b border-dashed border-[rgba(44,40,35,0.16)] py-6"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center" aria-hidden="true">
              <span
                className="text-[22px] font-light text-ink-mute transition-colors group-hover:text-terracotta"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                &rarr;
              </span>
            </span>
            <span className="font-serif text-[19px] italic leading-tight text-ink-ghost transition-colors group-hover:text-terracotta">
              {PAGE_COPY.sections.whatIBuild.unsure}
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** Small CSS-drawn marks, one per engagement, in the DeskDrawing spirit. */
function RowGlyph({ i }: { i: number }) {
  const ink = "#2c2823";
  const accent = "#b56a4f";
  switch (i % 7) {
    case 0: // workflow: two nodes joined by a line
      return (
        <span className="relative block h-8 w-8">
          <span style={{ position: "absolute", left: 2, top: 13, width: 8, height: 8, borderRadius: "50%", border: `1.5px solid ${ink}` }} />
          <span style={{ position: "absolute", right: 2, top: 13, width: 8, height: 8, borderRadius: "50%", background: accent }} />
          <span style={{ position: "absolute", left: 10, top: 16.5, width: 12, height: 1.5, background: ink }} />
        </span>
      );
    case 1: // internal tool: a small window
      return (
        <span className="relative block h-8 w-8" style={{ border: `1.5px solid ${ink}`, borderRadius: 2 }}>
          <span style={{ position: "absolute", left: 0, right: 0, top: 7, height: 1.5, background: ink }} />
          <span style={{ position: "absolute", left: 4, top: 2.5, width: 4, height: 2, background: accent }} />
        </span>
      );
    case 2: // agents: three connected nodes
      return (
        <span className="relative block h-8 w-8">
          <span style={{ position: "absolute", left: 12, top: 1, width: 7, height: 7, borderRadius: "50%", background: accent }} />
          <span style={{ position: "absolute", left: 2, bottom: 1, width: 7, height: 7, borderRadius: "50%", border: `1.5px solid ${ink}` }} />
          <span style={{ position: "absolute", right: 2, bottom: 1, width: 7, height: 7, borderRadius: "50%", border: `1.5px solid ${ink}` }} />
          <span style={{ position: "absolute", left: 7, top: 6, width: 14, height: 1.4, background: ink, transform: "rotate(34deg)", transformOrigin: "left" }} />
          <span style={{ position: "absolute", right: 6, top: 6, width: 14, height: 1.4, background: ink, transform: "rotate(-34deg)", transformOrigin: "right" }} />
        </span>
      );
    case 3: // evals: two measured bars
      return (
        <span className="relative block h-8 w-8">
          <span style={{ position: "absolute", left: 4, bottom: 0, width: 6, height: 16, background: ink }} />
          <span style={{ position: "absolute", left: 14, bottom: 0, width: 6, height: 26, background: accent }} />
          <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1.5, background: ink }} />
        </span>
      );
    case 4: // code hardening: brackets
      return (
        <span className="relative block h-8 w-8">
          <span style={{ position: "absolute", left: 3, top: 2, bottom: 2, width: 6, borderLeft: `1.5px solid ${ink}`, borderTop: `1.5px solid ${ink}`, borderBottom: `1.5px solid ${ink}` }} />
          <span style={{ position: "absolute", right: 3, top: 2, bottom: 2, width: 6, borderRight: `1.5px solid ${accent}`, borderTop: `1.5px solid ${accent}`, borderBottom: `1.5px solid ${accent}` }} />
        </span>
      );
    case 5: // memory: stacked layers
      return (
        <span className="relative block h-8 w-8">
          <span style={{ position: "absolute", left: 2, right: 2, top: 3, height: 5, border: `1.5px solid ${ink}`, borderRadius: 2 }} />
          <span style={{ position: "absolute", left: 2, right: 2, top: 13, height: 5, border: `1.5px solid ${ink}`, borderRadius: 2 }} />
          <span style={{ position: "absolute", left: 2, right: 2, top: 23, height: 5, background: accent, borderRadius: 2 }} />
        </span>
      );
    default: // low-code: a grid of blocks
      return (
        <span className="relative block h-8 w-8">
          <span style={{ position: "absolute", left: 2, top: 2, width: 11, height: 11, border: `1.5px solid ${ink}` }} />
          <span style={{ position: "absolute", right: 2, top: 2, width: 11, height: 11, background: accent }} />
          <span style={{ position: "absolute", left: 2, bottom: 2, width: 11, height: 11, background: accent }} />
          <span style={{ position: "absolute", right: 2, bottom: 2, width: 11, height: 11, border: `1.5px solid ${ink}` }} />
        </span>
      );
  }
}
