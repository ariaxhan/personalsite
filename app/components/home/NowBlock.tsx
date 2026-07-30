import Link from "next/link";
import Reveal from "../studio/Reveal";
import { getSiteContent } from "../../content/repository";

// NowBlock: a small, dated status line. Current focus is sourced from the top of
// the timeline (moments[0]); the active-work line names what is running right
// now. Honest and quiet, no hype. Links to the full timeline.
export default async function NowBlock() {
  const { content: { moments, PAGE_COPY } } = await getSiteContent();
  const now = moments[0];

  return (
    <section className="mx-auto max-w-content px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
      <Reveal className="grid gap-6 border-t border-[rgba(44,40,35,0.16)] pt-10 lg:grid-cols-[220px_1fr] lg:gap-14">
        <div>
          <div className="kicker">{PAGE_COPY.now.label}</div>
        </div>
        <div className="max-w-[760px]">
          <p className="m-0 font-serif text-[clamp(21px,2.7vw,30px)] font-light leading-[1.28] text-ink">
            {now.title}. {now.body}
          </p>
          <p className="m-0 mt-5 text-[16px] leading-[1.7] text-ink-muted">
            {PAGE_COPY.now.active}
          </p>
          <Link
            href="/timeline/"
            className="mt-6 inline-block border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[17px] italic text-ink transition-colors hover:border-terracotta hover:text-terracotta"
          >
            {PAGE_COPY.now.timelineLink} &rarr;
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
