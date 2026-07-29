import Link from "next/link";
import Reveal from "./studio/Reveal";
import CalEmbed from "./CalEmbed";
import { SITE } from "../utils/siteMeta";
import { engagements, goodFit, notAFit } from "../utils/workWithMeData";
import { contactLinks, projectReviewBullets } from "../utils/studioData";
import { PAGE_COPY } from "../utils/siteCopy";

export default function Contact() {
  return (
    <section className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-14" style={{ paddingTop: 120 }}>
      {/* a) Opening. SectionHeader rhythm, but a real h1. */}
      <Reveal className="flex flex-col items-start justify-between gap-5 border-b border-[rgba(44,40,35,0.18)] pb-4 sm:flex-row sm:items-end sm:gap-6">
        <div className="max-w-3xl">
          <div className="kicker mb-3">{PAGE_COPY.contact.fig}</div>
          <h1 className="font-serif font-light leading-[1.02] text-ink text-[clamp(34px,5vw,62px)]">
            {PAGE_COPY.contact.title}
          </h1>
        </div>
        <p className="m-0 max-w-[34rem] text-left font-serif italic text-[16px] leading-snug text-ink-ghost sm:max-w-[260px] sm:text-right sm:text-[17px]">
          {`${SITE.role}. ${SITE.location}.`}
        </p>
      </Reveal>

      <Reveal className="mt-8 max-w-3xl">
        <p className="m-0 mt-4 text-[16px] leading-relaxed text-ink-muted">
          {PAGE_COPY.contact.intro}
        </p>
      </Reveal>

      {/* b) What I take on. Two-column definition list, hairline separators. */}
      <Reveal className="mt-16">
        <div className="kicker mb-6">{PAGE_COPY.contact.takeOn}</div>
        <dl className="m-0 grid">
          {engagements.map((e) => (
            <div
              key={e.title}
              className="grid gap-1.5 border-t border-[rgba(44,40,35,0.14)] py-5 sm:grid-cols-[0.85fr_1.15fr] sm:gap-10"
            >
              <dt className="font-serif text-[20px] leading-snug text-ink">{e.title}</dt>
              <dd className="m-0 max-w-prose text-[15.5px] leading-relaxed text-ink-muted">
                {e.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* c) Fit filter. Two quiet columns, Aria's exact lines. */}
      <Reveal className="mt-16 grid gap-10 border-t border-[rgba(44,40,35,0.14)] pt-10 sm:grid-cols-2 sm:gap-16">
        <div>
          <div className="kicker mb-5">{PAGE_COPY.contact.goodFit}</div>
          <ul className="m-0 grid list-none gap-3 p-0">
            {goodFit.map((line) => (
              <li key={line} className="text-[16px] leading-snug text-ink">
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="kicker mb-5">{PAGE_COPY.contact.notFit}</div>
          <ul className="m-0 grid list-none gap-3 p-0">
            {notAFit.map((line) => (
              <li key={line} className="text-[16px] leading-snug text-ink-ghost">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* d) Booking. Serif line, then the Cal.com embed in a hairline frame. */}
      <Reveal className="mt-20 border-t border-[rgba(44,40,35,0.14)] pt-10">
        <div className="kicker mb-5">{PAGE_COPY.contact.booking}</div>
        <p className="m-0 max-w-2xl font-serif text-[clamp(22px,3vw,32px)] leading-[1.2] text-ink">
          {SITE.booking.line}
        </p>
        <div className="mt-8 overflow-hidden border border-[rgba(44,40,35,0.18)] bg-studio-card">
          <CalEmbed />
        </div>
      </Reveal>

      {/* e) Project review door. Condensed CTA into the intake form. */}
      <Reveal className="mt-20 grid gap-8 border-t border-[rgba(44,40,35,0.14)] pt-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <div className="kicker mb-4">{PAGE_COPY.contact.projectReview}</div>
          <p className="m-0 max-w-prose font-serif text-[clamp(22px,3vw,32px)] leading-[1.15] text-ink">
            {PAGE_COPY.contact.projectReviewLine}
          </p>
          <div className="mt-7">
            <Link
              href="/project-review"
              className="inline-flex min-h-11 items-center border border-ink bg-ink px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-studio-paper transition-colors hover:border-terracotta hover:bg-terracotta sm:px-5 sm:text-[11px] sm:tracking-[0.18em]"
            >
              {PAGE_COPY.contact.submit}
            </Link>
          </div>
        </div>
        <ul className="m-0 grid list-none content-start gap-2.5 p-0">
          {projectReviewBullets.map((bullet) => (
            <li
              key={bullet}
              className="border-t border-[rgba(44,40,35,0.12)] pt-2.5 text-[15.5px] leading-snug text-ink-muted"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* f) Links + working style as the closing note. */}
      <Reveal className="mt-20 border-t border-[rgba(44,40,35,0.14)] pt-10 pb-16">
        <div className="kicker mb-6">{PAGE_COPY.contact.elsewhere}</div>
        <div className="flex flex-wrap gap-x-10 gap-y-5">
          {contactLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[clamp(20px,2.6vw,28px)] text-ink transition-colors hover:border-terracotta hover:text-terracotta"
            >
              {l.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
