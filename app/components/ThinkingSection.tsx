import SectionHeader from "./studio/SectionHeader";
import Reveal from "./studio/Reveal";
import { articles, MEDIUM_PROFILE } from "../utils/studioData";

/**
 * ThinkingSection: the writing, set as an index.
 *
 * Not a card grid, a catalogue of essays. Each entry is a numbered row: the
 * piece large in serif, its first line beneath, the subject and length kept in
 * the margin. Reads like the contents page of a magazine.
 */
export default function ThinkingSection() {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pb-24 sm:px-8 lg:px-14 lg:pb-28" style={{ paddingTop: 120 }}>
      <SectionHeader
        fig="Fig. 09"
        label="Writing"
        title="Essays and field notes"
        note="Agents, memory, model behavior, and the parts of AI that break in real work. Published on Medium."
      />

      <div className="mt-8">
        {articles.map((a, i) => (
          <Reveal key={a.href} delay={Math.min(i, 6) * 40}>
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-b border-[rgba(44,40,35,0.16)] py-7 transition-colors sm:grid-cols-[auto_1fr_auto]"
            >
              <span className="font-mono text-[12px] text-ink-mute">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="m-0 font-serif text-[clamp(22px,2.8vw,30px)] font-normal leading-[1.12] text-ink transition-colors group-hover:text-terracotta">
                  {a.title}
                </h3>
                <p className="m-0 mt-2 max-w-[70ch] text-[15px] leading-relaxed text-ink-faint">
                  {a.excerpt}
                </p>
              </div>
              <div className="col-start-2 flex items-center gap-3 sm:col-start-3 sm:flex-col sm:items-end sm:gap-1 sm:text-right">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-terracotta">
                  {a.category}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                  {a.read}
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <a
          href={MEDIUM_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[20px] italic text-ink transition-colors hover:border-terracotta hover:text-terracotta"
        >
          All articles on Medium {"->"}
        </a>
      </Reveal>
    </section>
  );
}
