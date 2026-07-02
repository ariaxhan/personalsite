import type { CSSProperties } from "react";
import SectionHeader from "./studio/SectionHeader";
import Reveal from "./studio/Reveal";
import { hackathons } from "../utils/studioData";

/**
 * HackathonsGrid: Fig. 02c, built under pressure.
 *
 * Six wins pinned up like exhibits in a vitrine. Each card is a small piece of
 * proof: the award, the room it was won in, what it did, and the tools it leaned
 * on. Resting on one lifts it; the title links out to the build.
 */
export default function HackathonsGrid() {
  return (
    <section className="mx-auto max-w-wall px-5 sm:px-8 lg:px-14" style={{ paddingTop: 120 }}>
      <SectionHeader
        fig="Fig. 02c"
        label="Hackathons"
        title="Built under pressure"
        note="Six hackathon wins in two years. Each built in 24 to 48 hours, judged by strangers. A few kept going into production."
      />

      <div className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] items-start gap-x-8 gap-y-12">
        {hackathons.map((e, i) => (
          <Reveal key={e.name} delay={Math.min(i, 6) * 50}>
            <a
              href={e.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block sm:[transform:var(--hackathon-tilt)]"
              style={{
                "--hackathon-tilt": `rotate(${[-1.6, 1.2, -0.8, 1.8, -1.3, 0.9][i % 6]}deg)`,
                transition: "transform .6s cubic-bezier(.2,.6,.2,1)",
              } as CSSProperties}
            >
              <span
                className="absolute left-1/2 top-[-9px] z-10 h-[15px] w-[15px] -translate-x-1/2 rounded-full"
                style={{ background: "radial-gradient(circle at 38% 32%, #c97a5e, #8a4334)", boxShadow: "0 4px 6px -2px rgba(44,40,35,.5)" }}
              />
              <div
                className="flex h-full flex-col bg-studio-card p-6 transition-shadow duration-500 ease-paper group-hover:shadow-paper-lift"
                style={{ border: "1px solid rgba(44,40,35,.07)", boxShadow: "0 22px 34px -28px rgba(44,40,35,.55)" }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-terracotta">
                    {e.metric}
                  </span>
                  <span className="font-mono text-[10px] text-ink-mute">{e.year}</span>
                </div>
                <h3 className="m-0 font-serif text-[26px] font-normal leading-tight text-ink transition-colors group-hover:text-terracotta">
                  {e.name}
                </h3>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-ghost">
                  {e.hackathon}
                </div>
                {e.award && (
                  <div className="mt-3 font-serif text-[16px] italic text-ink-soft">{e.award}</div>
                )}
                <p className="m-0 mt-3 text-[14.5px] leading-relaxed text-ink-muted">
                  {e.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-dashed border-[rgba(44,40,35,0.18)] pt-4">
                  {e.technologies.map((t) => (
                    <span key={t} className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-mute">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
