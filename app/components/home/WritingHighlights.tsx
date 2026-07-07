import Link from "next/link";
import SectionHeader from "../studio/SectionHeader";
import Reveal from "../studio/Reveal";
import {
  articlesByTheme,
  WRITING_THEMES,
  type WritingTheme,
} from "../../utils/writingData";

// WritingHighlights: one strongest essay per working theme, sent to Medium. The
// full archive lives on the writing page. Sourced from writingData, so the four
// picks and their theme labels stay in step with the rest of the site.
const PICKS: WritingTheme[] = [
  "agents",
  "memory-context",
  "evals-verification",
  "ai-coding-workflows",
];

const themeLabel = (key: WritingTheme) =>
  WRITING_THEMES.find((t) => t.key === key)?.label ?? key;

export default function WritingHighlights() {
  const featured = PICKS.map((theme) => ({
    theme,
    article: articlesByTheme(theme)[0],
  })).filter((x) => x.article);

  return (
    <section className="mx-auto max-w-content px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
      <SectionHeader
        fig="Fig. 03"
        label="Writing"
        title="Notes from the work"
        note="One essay from each thread I keep pulling on. The rest of the archive is one click away."
      />

      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-2 lg:grid-cols-2">
        {featured.map(({ theme, article }, i) => (
          <Reveal key={article.href} delay={Math.min(i, 4) * 60}>
            <a
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-2.5 border-b border-[rgba(44,40,35,0.12)] py-7 transition-colors hover:border-[rgba(44,40,35,0.3)]"
            >
              <span className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-terracotta">
                  {themeLabel(theme)}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                  {article.read}
                </span>
              </span>
              <span className="font-serif text-[24px] font-light leading-[1.14] text-ink transition-colors group-hover:text-terracotta">
                {article.title}
              </span>
              <span className="max-w-[52ch] text-[15px] leading-[1.6] text-ink-muted">
                {article.excerpt}
              </span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-ghost">
                Read on Medium &rarr;
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/writing/"
          className="inline-block border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[19px] italic text-ink transition-colors hover:border-terracotta hover:text-terracotta"
        >
          All writing &rarr;
        </Link>
      </div>
    </section>
  );
}
