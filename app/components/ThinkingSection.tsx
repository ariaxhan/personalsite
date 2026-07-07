import SectionHeader from "./studio/SectionHeader";
import Reveal from "./studio/Reveal";
import { WRITING_THEMES, articlesByTheme, MEDIUM_PROFILE } from "../utils/writingData";
import { PAGE_COPY } from "../utils/siteCopy";

/**
 * ThinkingSection: the writing, set as a map.
 *
 * Not a flat feed, a catalogue grouped by the questions underneath the work.
 * Each theme opens with its kicker label and a one-line note, then lists its
 * essays: the piece large in serif, its first line beneath, the read length in
 * the margin. Every article appears exactly once, under one theme. Links stay
 * on Medium; the anchor text is the article title so agents and screen readers
 * get a meaningful destination.
 */
export default function ThinkingSection() {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pb-24 sm:px-8 lg:px-14 lg:pb-28" style={{ paddingTop: 120 }}>
      <SectionHeader
        as="h1"
        fig={PAGE_COPY.sections.writing.fig}
        label={PAGE_COPY.sections.writing.label}
        title={PAGE_COPY.sections.writing.title}
        note={PAGE_COPY.sections.writing.note}
      />

      <Reveal className="mt-6">
        <a
          href={MEDIUM_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[18px] italic text-ink transition-colors hover:border-terracotta hover:text-terracotta"
        >
          {PAGE_COPY.sections.writing.allMedium} {"->"}
        </a>
      </Reveal>

      <div className="mt-14 flex flex-col gap-16">
        {WRITING_THEMES.map((theme) => {
          const themeArticles = articlesByTheme(theme.key);
          if (themeArticles.length === 0) return null;
          return (
            <Reveal key={theme.key} as="section">
              <div className="border-b border-[rgba(44,40,35,0.18)] pb-4">
                <div className="kicker mb-2">{theme.label}</div>
                <p className="m-0 max-w-[60ch] font-serif text-[18px] italic leading-snug text-ink-ghost">
                  {theme.note}
                </p>
              </div>

              <div className="mt-2">
                {themeArticles.map((a, i) => (
                  <a
                    key={a.href}
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-b border-[rgba(44,40,35,0.12)] py-6 transition-colors sm:grid-cols-[auto_1fr_auto]"
                  >
                    <span className="font-mono text-[12px] text-ink-mute">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="m-0 font-serif text-[clamp(20px,2.5vw,27px)] font-normal leading-[1.14] text-ink transition-colors group-hover:text-terracotta">
                        {a.title}
                      </h3>
                      <p className="m-0 mt-2 max-w-[70ch] text-[15px] leading-relaxed text-ink-faint">
                        {a.excerpt}
                      </p>
                    </div>
                    <div className="col-start-2 flex items-center gap-3 sm:col-start-3 sm:flex-col sm:items-end sm:gap-1 sm:text-right">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                        {a.read}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
