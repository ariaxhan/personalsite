"use client";

import Link from "next/link";
import SectionHeader from "./studio/SectionHeader";
import Reveal from "./studio/Reveal";
import { useSiteCopy } from "./LocaleProvider";

export default function KoreanConsultingRoom() {
  const { PAGE_COPY, href: localHref } = useSiteCopy();
  const copy = PAGE_COPY.koreanConsulting;

  return (
    <section
      className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-14"
      style={{ paddingTop: "calc(var(--masthead-height, 7.5rem) + 1.75rem)" }}
    >
      <SectionHeader as="h1" {...copy.header} />

      {/* The bilingual differentiator, then what gets built. */}
      <Reveal className="mt-12 max-w-[760px]">
        <div className="kicker mb-4">{copy.introLabel}</div>
        <p className="m-0 font-serif text-[clamp(24px,3vw,34px)] leading-[1.3] text-ink">
          {copy.intro}
        </p>
      </Reveal>
      <Reveal className="mt-12 max-w-[760px]">
        <div className="kicker mb-4">{copy.buildLabel}</div>
        <p className="m-0 text-[16.5px] leading-[1.75] text-ink-muted">{copy.build}</p>
      </Reveal>

      {/* Audiences. Two-column definition list, hairline separators. */}
      <Reveal className="mt-16">
        <div className="kicker mb-6">{copy.audiencesLabel}</div>
        <dl className="m-0 grid">
          {copy.audiences.map((audience) => (
            <div
              key={audience.title}
              className="grid gap-1.5 border-t border-[rgba(44,40,35,0.14)] py-5 sm:grid-cols-[0.85fr_1.15fr] sm:gap-10"
            >
              <dt className="font-serif text-[20px] leading-snug text-ink">{audience.title}</dt>
              <dd className="m-0 max-w-prose text-[15.5px] leading-relaxed text-ink-muted">
                {audience.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Fixed-scope offers. */}
      <Reveal className="mt-16">
        <div className="kicker mb-6">{copy.offersLabel}</div>
        <dl className="m-0 grid">
          {copy.offers.map((offer) => (
            <div
              key={offer.title}
              className="grid gap-1.5 border-t border-[rgba(44,40,35,0.14)] py-5 sm:grid-cols-[0.85fr_1.15fr] sm:gap-10"
            >
              <dt>
                <span className="font-serif text-[20px] leading-snug text-ink">{offer.title}</span>
                <span className="mt-1.5 block font-mono text-caption uppercase tracking-[0.12em] text-ink-ghost">
                  {offer.price}
                </span>
              </dt>
              <dd className="m-0 max-w-prose text-[15.5px] leading-relaxed text-ink-muted">
                {offer.detail}
              </dd>
            </div>
          ))}
        </dl>
        <p className="m-0 mt-6 text-[15px] leading-relaxed text-ink-ghost">{copy.offersNote}</p>
      </Reveal>

      {/* Proof. */}
      <Reveal className="mt-16">
        <div className="kicker mb-5">{copy.proofLabel}</div>
        <ul className="m-0 grid list-none gap-3 p-0">
          {copy.proof.map((line) => (
            <li
              key={line}
              className="max-w-[760px] border-t border-[rgba(44,40,35,0.12)] pt-3 text-[16px] leading-snug text-ink"
            >
              {line}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* The two doors: free project review, booking calendar (on /contact/). */}
      <Reveal className="mt-20 grid gap-10 border-t border-[rgba(44,40,35,0.14)] pt-10 pb-16 sm:grid-cols-2 sm:gap-16">
        <div>
          <div className="kicker mb-4">{copy.reviewCta.label}</div>
          <p className="m-0 max-w-prose font-serif text-[clamp(20px,2.6vw,28px)] leading-[1.2] text-ink">
            {copy.reviewCta.line}
          </p>
          <div className="mt-7">
            <Link
              href={localHref("/project-review/")}
              className="inline-flex min-h-11 items-center border border-ink bg-ink px-4 py-3 font-mono text-caption uppercase tracking-[0.12em] text-studio-paper transition-colors hover:border-terracotta hover:bg-terracotta sm:px-5 sm:tracking-[0.18em]"
            >
              {copy.reviewCta.button}
            </Link>
          </div>
        </div>
        <div>
          <div className="kicker mb-4">{copy.bookingCta.label}</div>
          <p className="m-0 max-w-prose font-serif text-[clamp(20px,2.6vw,28px)] leading-[1.2] text-ink">
            {copy.bookingCta.line}
          </p>
          <div className="mt-7">
            <Link
              href={localHref("/contact/")}
              className="inline-flex min-h-11 items-center border border-ink bg-ink px-4 py-3 font-mono text-caption uppercase tracking-[0.12em] text-studio-paper transition-colors hover:border-terracotta hover:bg-terracotta sm:px-5 sm:tracking-[0.18em]"
            >
              {copy.bookingCta.button}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
