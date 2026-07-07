import Link from "next/link";
import Reveal from "../studio/Reveal";
import { moments } from "../../utils/studioData";

// NowBlock: a small, dated status line. Current focus is sourced from the top of
// the timeline (moments[0]); the active-work line names what is running right
// now. Honest and quiet, no hype. Links to the full timeline.
export default function NowBlock() {
  const now = moments[0];

  return (
    <section className="mx-auto max-w-content px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
      <Reveal className="grid gap-6 border-t border-[rgba(44,40,35,0.16)] pt-10 lg:grid-cols-[220px_1fr] lg:gap-14">
        <div>
          <div className="kicker">Now · July 2026</div>
        </div>
        <div className="max-w-[760px]">
          <p className="m-0 font-serif text-[clamp(21px,2.7vw,30px)] font-light leading-[1.28] text-ink">
            {now.title}. {now.body}
          </p>
          <p className="m-0 mt-5 text-[16px] leading-[1.7] text-ink-muted">
            Still active in the open: KERNEL, my memory-and-rules layer for Claude
            Code; llm-bench, the 21-test model benchmark; and the daily Substrate
            pipeline that ships one agent-made artwork a day.
          </p>
          <Link
            href="/timeline/"
            className="mt-6 inline-block border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[17px] italic text-ink transition-colors hover:border-terracotta hover:text-terracotta"
          >
            The full timeline &rarr;
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
