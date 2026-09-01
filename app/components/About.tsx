import Reveal from "./studio/Reveal";
import { PAGE_COPY } from "../utils/siteCopy";

/**
 * About: Background. The first-person account, set as editorial body text in a
 * comfortable reading column, with a marginal sidebar of materials and current
 * focus. The two short lines about language are pulled out large,
 * the way a magazine lifts a sentence off the page.
 */
export default function About() {
  const copy = PAGE_COPY.about;

  return (
    <section className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14" style={{ paddingTop: 120 }}>
      {/* Intro */}
      <Reveal className="border-b border-[rgba(44,40,35,0.18)] pb-12">
        <div className="kicker mb-4">{copy.label}</div>
        <h1
          className="m-0 font-serif font-light text-ink"
          style={{ fontSize: "clamp(40px, 7vw, 84px)", lineHeight: 0.98 }}
        >
          {copy.title}
        </h1>
        <p
          className="m-0 mt-6 max-w-[760px] font-serif font-light italic text-ink-soft"
          style={{ fontSize: "clamp(20px, 2.8vw, 32px)", lineHeight: 1.3 }}
        >
          {copy.subtitle}
        </p>
      </Reveal>

      {/* Narrative + sidebar */}
      <div className="grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <Reveal className="max-w-prose">
          {copy.narrative.map((p) => (
            <p key={p} className="m-0 mb-7 text-[17px] leading-[1.8] text-ink-muted">
              {p}
            </p>
          ))}
          <div className="my-10">
            {copy.pulls.map((p) => (
              <p
                key={p}
                className="m-0 mb-3 font-serif font-light italic text-ink"
                style={{ fontSize: "clamp(26px, 3.6vw, 40px)", lineHeight: 1.18 }}
              >
                {p}
              </p>
            ))}
          </div>
          {copy.narrative2.map((p) => (
            <p key={p} className="m-0 mb-7 text-[17px] leading-[1.8] text-ink-muted">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal as="aside" delay={120} className="flex flex-col gap-10">
          <div>
            <div className="kicker mb-4">{copy.worksWithLabel}</div>
            <ul className="flex flex-col gap-2">
              {copy.worksWith.map((w) => (
                <li key={w} className="text-[15px] text-ink-faint">
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="kicker mb-4">{copy.focusLabel}</div>
            <div className="flex flex-col gap-5">
              {copy.focus.map((f) => (
                <p key={f.name} className="m-0 text-[14.5px] leading-relaxed text-ink-faint">
                  <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink">
                    {f.name}
                  </span>
                  <span className="text-ink-ghost">: {f.text}</span>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="kicker mb-2">{copy.locationLabel}</div>
            <p className="m-0 font-serif text-[20px] text-ink">{copy.location}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
