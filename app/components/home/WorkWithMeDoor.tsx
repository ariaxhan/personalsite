import Link from "next/link";
import Reveal from "../studio/Reveal";
import { SITE } from "../../utils/siteMeta";

// WorkWithMeDoor: a single quiet block. The booking line set as a serif
// sentence, and two ways through: a short call, or the contact page for the
// fuller picture of what I take on. No embed here; the scheduler lives on the
// contact page.
export default function WorkWithMeDoor() {
  return (
    <section className="mx-auto max-w-content px-5 py-20 sm:px-8 lg:px-14 lg:py-24">
      <Reveal className="border-t border-[rgba(44,40,35,0.16)] pt-12">
        <div className="kicker mb-6">Work with me</div>
        <p
          className="m-0 max-w-[820px] font-serif font-light text-ink"
          style={{ fontSize: "clamp(26px, 3.6vw, 44px)", lineHeight: 1.2 }}
        >
          {SITE.booking.line}
        </p>
        <div className="mt-9 flex flex-wrap items-baseline gap-x-10 gap-y-4">
          <a
            href={SITE.booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[19px] italic text-ink transition-colors hover:border-terracotta hover:text-terracotta"
          >
            Book a short call &rarr;
          </a>
          <Link
            href="/contact/"
            className="border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[19px] italic text-ink transition-colors hover:border-terracotta hover:text-terracotta"
          >
            What I take on &rarr;
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
