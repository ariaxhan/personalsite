import Link from "next/link";
import Reveal from "../studio/Reveal";
import { PAGE_COPY } from "../../utils/siteCopy";

// NowBlock: a small, dated status update. It stays separate from the exhaustive
// timeline so the homepage can answer what is happening now without listing
// every project or tool that is still running.
export default function NowBlock() {
  const now = PAGE_COPY.now;

  return (
    <section className="mx-auto max-w-content px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
      <Reveal className="grid gap-6 border-t border-[rgba(44,40,35,0.16)] pt-10 lg:grid-cols-[220px_1fr] lg:gap-14">
        <div>
          <div className="kicker">{now.label}</div>
        </div>
        <div className="max-w-[680px]">
          <h2 className="m-0 font-serif text-[clamp(28px,3.4vw,42px)] font-light leading-[1.14] text-ink">
            {now.title}
          </h2>
          <p className="m-0 mt-6 max-w-[58ch] text-[16px] leading-[1.7] text-ink-muted">
            {now.body}
          </p>
          <Link
            href="/timeline/"
            className="mt-6 inline-block border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[17px] italic text-ink transition-colors hover:border-terracotta hover:text-terracotta"
          >
            {now.timelineLink} &rarr;
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
