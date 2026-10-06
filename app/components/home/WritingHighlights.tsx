"use client";

import Link from "next/link";
import SectionHeader from "../studio/SectionHeader";
import Reveal from "../studio/Reveal";
import type { WritingTheme } from "../../utils/writingData";
import { useSiteCopy } from "../LocaleProvider";

// WritingHighlights: one strongest essay per working theme, sent to Medium. The
// full archive lives on the writing page. Sourced from writingData, so the four
// picks and their theme labels stay in step with the rest of the site.
const PICKS: WritingTheme[] = [
  "agents",
  "memory-context",
  "evals-verification",
  "ai-coding-workflows",
];

export default function WritingHighlights() {
  const { PAGE_COPY, WRITING_THEMES, articlesByTheme, projectBySlug, locale, href: localHref } = useSiteCopy();
  const book = projectBySlug("the-correction");
  const bookLabel = locale === "ko" ? "소설" : "The novel";
  const themeLabel = (key: WritingTheme) =>
    WRITING_THEMES.find((t) => t.key === key)?.label ?? key;
  const featured = PICKS.map((theme) => ({
    theme,
    article: articlesByTheme(theme)[0],
  })).filter((x) => x.article);

  return (
    <section className="mx-auto max-w-content px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
      <SectionHeader
        fig={PAGE_COPY.sections.writingHighlights.fig}
        label={PAGE_COPY.sections.writingHighlights.label}
        title={PAGE_COPY.sections.writingHighlights.title}
        note={PAGE_COPY.sections.writingHighlights.note}
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
                <span className="font-mono text-caption uppercase tracking-[0.16em] text-terracotta">
                  {themeLabel(theme)}
                </span>
                <span className="font-mono text-caption uppercase tracking-[0.14em] text-ink-mute">
                  {article.read}
                </span>
              </span>
              <span className="font-serif text-[24px] font-light leading-[1.14] text-ink transition-colors group-hover:text-terracotta">
                {article.title}
              </span>
              <span className="max-w-[52ch] text-[15px] leading-[1.6] text-ink-muted">
                {article.excerpt}
              </span>
              <span className="mt-1 font-mono text-caption uppercase tracking-[0.14em] text-ink-ghost">
                {PAGE_COPY.sections.writingHighlights.readOnMedium} &rarr;
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      {book && book.plate && (
        <Reveal className="mt-10">
          <Link
            href={localHref(`/projects/${book.slug}/`)}
            className="group grid grid-cols-[76px_1fr] items-center gap-5 border-y border-[rgba(44,40,35,0.14)] py-6 sm:grid-cols-[88px_1fr]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.plate}
              alt={`${book.name} cover`}
              className="aspect-[5/8] w-full object-cover shadow-[0_18px_30px_-18px_rgba(44,40,35,0.65)] transition-transform duration-500 group-hover:-translate-y-1"
            />
            <span>
              <span className="mb-2 block font-mono text-caption uppercase tracking-[0.16em] text-terracotta">
                {bookLabel} · {book.status}
              </span>
              <span className="block font-serif text-[26px] font-light leading-tight text-ink transition-colors group-hover:text-terracotta">
                {book.name}
              </span>
              <span className="mt-1 block max-w-[58ch] text-[15px] leading-relaxed text-ink-muted">
                {book.thesis}
              </span>
            </span>
          </Link>
        </Reveal>
      )}

      <div className="mt-10">
        <Link
          href={localHref("/writing/")}
          className="inline-block border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[19px] italic text-ink transition-colors hover:border-terracotta hover:text-terracotta"
        >
          {PAGE_COPY.sections.writingHighlights.allWriting} &rarr;
        </Link>
      </div>
    </section>
  );
}
