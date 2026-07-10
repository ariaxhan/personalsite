"use client";

import { useState } from "react";
import SectionHeader from "./studio/SectionHeader";
import Reveal from "./studio/Reveal";
import { books, type Book } from "../utils/studioData";
import { PAGE_COPY } from "../utils/siteCopy";

function compactTitle(title: string): string {
  return title.replace(", or the Necessity of Violence", "").replace("This Is How You Lose the Time War", "Time War");
}

export default function Bookshelf() {
  const copy = PAGE_COPY.sections.bookshelf;
  const [active, setActive] = useState(0);
  const selected = books[active] ?? books[0];

  return (
    <section className="mx-auto max-w-[1180px] px-5 pb-24 pt-28 sm:px-8 sm:pt-36 lg:px-14 lg:pb-32">
      <SectionHeader as="h1" {...copy} />

      <Reveal className="mt-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] lg:items-start">
          <div>
            <p className="m-0 mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
              {copy.hoverHint}
            </p>
            <div
              className="relative overflow-hidden border border-[rgba(44,40,35,0.14)] bg-studio-card px-5 pb-10 pt-16 sm:px-8"
              style={{
                minHeight: 430,
                boxShadow: "inset 0 -26px 0 rgba(44,40,35,0.07), 0 30px 70px -58px rgba(44,40,35,0.7)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 bottom-[72px] h-4 border-y border-[rgba(44,40,35,0.16)] bg-[#d6c7aa]"
              />
              <div className="relative flex min-h-[310px] items-end justify-center gap-[3px] sm:gap-1.5">
                {books.map((book, i) => (
                  <BookSpine
                    key={book.title}
                    book={book}
                    index={i}
                    active={active === i}
                    onSelect={() => setActive(i)}
                  />
                ))}
              </div>
            </div>
          </div>

          <aside
            className="border-y border-[rgba(44,40,35,0.16)] py-7 lg:sticky lg:top-24"
            aria-live="polite"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
              {copy.selectedLabel}
            </div>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="m-0 font-serif text-[clamp(28px,4vw,48px)] font-normal leading-[0.98] text-ink">
                {selected.title}
              </h2>
              {selected.current && (
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-terracotta">
                  {copy.current}
                </span>
              )}
            </div>
            <p className="m-0 mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
              {selected.author}
            </p>
            <p className="m-0 mt-6 text-[16px] leading-relaxed text-ink-muted">
              {selected.why}
            </p>
            <p className="m-0 mt-4 font-serif text-[20px] italic leading-snug text-ink-ghost">
              {selected.note}
            </p>
          </aside>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, i) => (
            <button
              key={book.title}
              type="button"
              onClick={() => setActive(i)}
              className="border-0 border-t border-[rgba(44,40,35,0.14)] bg-transparent px-0 pt-4 text-left"
            >
              <span className="font-mono text-[10px] text-ink-mute">{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-1 block font-serif text-[20px] leading-tight text-ink">{book.title}</span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.13em] text-ink-mute">
                {book.author}
              </span>
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function BookSpine({
  book,
  index,
  active,
  onSelect,
}: {
  book: Book;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const widths = [46, 38, 42, 40, 44, 48];
  const heights = [270, 292, 248, 236, 260, 304];

  return (
    <button
      type="button"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`${book.title} by ${book.author}`}
      className="group relative flex shrink-0 items-center justify-center rounded-[2px] border border-[rgba(44,40,35,0.18)] px-1 pb-5 pt-4 text-left shadow-paper transition-transform duration-500 ease-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
      style={{
        width: widths[index % widths.length],
        height: heights[index % heights.length],
        background: book.color,
        transform: active ? "translateY(-42px)" : "translateY(0)",
        zIndex: active ? 10 : 1,
      }}
    >
      <span
        className="pointer-events-none absolute left-1.5 top-3 bottom-3 w-px bg-studio-paper/30"
        aria-hidden="true"
      />
      <span
        className="max-h-[230px] overflow-hidden font-serif text-[14px] leading-none text-studio-paper"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        {compactTitle(book.title)}
      </span>
      <span
        className="absolute bottom-3 font-mono text-[8px] uppercase tracking-[0.12em] text-studio-paper/75"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        {book.author.split(" ").slice(-1)[0]}
      </span>
    </button>
  );
}
