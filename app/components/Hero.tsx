import Image from "next/image";
import Link from "next/link";
import { SITE, proofStats } from "../utils/siteMeta";
import { projectBySlug } from "../utils/projectsData";
import { PAGE_COPY } from "../utils/siteCopy";
import SystemDiagram from "./home/SystemDiagram";

// Hero: the ten-second answer. Who (Aria Han, the role, Los Angeles), what
// (the one-liner), the strange line that says why the work is different, and
// four doors to where to go next. The proof-stat grid and the system diagram
// carry the evidence. Every number is sourced from siteMeta; nothing here is
// typed twice.

const quickLinks = [
  {
    title: "Paper Rooms",
    href: "https://paper-rooms.com",
    image: "/studio/paperrooms-icon.jpg",
    note: projectBySlug("paper-rooms")?.thesis ?? "",
    initial: null,
  },
  {
    title: "ModelMind",
    href: "https://model-mind.org",
    image: "/studio/modelmind-icon.jpg",
    note: projectBySlug("modelmind")?.thesis ?? "",
    initial: null,
  },
  {
    title: PAGE_COPY.hero.githubTitle,
    href: "https://github.com/ariaxhan",
    image: null,
    note: `${SITE.proof.publicRepos.value} ${PAGE_COPY.hero.githubNoteSuffix}`,
    initial: PAGE_COPY.hero.githubInitial,
  },
];

export default function Hero() {
  return (
    <section
      id="entrance"
      className="relative grid min-h-[100svh] grid-cols-[minmax(0,1fr)] overflow-hidden px-5 pb-8 sm:px-8 sm:pb-10 lg:px-14"
      style={{ gridTemplateRows: "auto 1fr auto", paddingTop: "clamp(88px, 10vw, 118px)" }}
    >
      {/* Kicker row: figure label + role on the left, location on the right. */}
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="kicker max-w-[260px]" style={{ lineHeight: 2 }}>
          Fig. 00 · Entrance
          <br />
          {SITE.role}
        </div>
        <div
          className="kicker max-w-[160px] text-right sm:max-w-[230px]"
          style={{ lineHeight: 2, letterSpacing: "0.14em" }}
        >
          {SITE.location}
          <br />
          {PAGE_COPY.hero.builtSince}
        </div>
      </div>

      <div className="grid min-w-0 max-w-[1320px] gap-8 self-center py-10 sm:w-full lg:grid-cols-[minmax(0,0.94fr)_minmax(420px,0.7fr)] lg:items-center lg:gap-12">
        <div className="grid min-w-0 gap-6">
          <h1
            className="m-0 font-serif font-light text-ink"
            style={{
              fontSize: "clamp(54px, 9vw, 120px)",
              lineHeight: 0.94,
              paddingTop: "0.06em",
            }}
          >
            Aria Han
          </h1>

          <p
            className="m-0 max-w-[680px] font-serif font-light text-ink"
            style={{ fontSize: "clamp(23px, 2.9vw, 38px)", lineHeight: 1.2 }}
          >
            {SITE.oneLiner}
          </p>

          <p
            className="m-0 max-w-[620px] font-serif font-light italic text-ink-soft"
            style={{ fontSize: "clamp(18px, 2vw, 25px)", lineHeight: 1.3 }}
          >
            {SITE.strangeLine}
          </p>

          {/* Where next: four text doors. */}
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {PAGE_COPY.hero.ctas.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="border-b border-[rgba(44,40,35,0.3)] pb-0.5 font-serif text-[17px] italic text-ink transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {c.label} &rarr;
              </Link>
            ))}
          </div>

          {/* Proof grid, sourced from siteMeta. */}
          <div className="mt-1 grid grid-cols-2 border-y border-[rgba(44,40,35,0.16)] sm:grid-cols-3">
            {proofStats.map((stat) => (
              <div
                key={stat.label}
                className="min-h-[96px] border-b border-r border-[rgba(44,40,35,0.12)] px-4 py-4 [&:nth-child(2n)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 sm:min-h-[104px] sm:px-6 sm:py-5 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b sm:[&:nth-last-child(-n+3)]:border-b-0"
              >
                <div className="font-serif text-[36px] font-light leading-none text-ink sm:text-[44px]">
                  {stat.value}
                </div>
                <div className="mt-2 max-w-[130px] font-mono text-[9px] uppercase leading-4 tracking-[0.16em] text-ink-mute">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column, large screens: the system diagram. On small screens it
            renders as its own section from the homepage. */}
        <div className="hidden lg:block">
          <SystemDiagram />
        </div>
      </div>

      {/* Three quick doors, notes sourced from the project theses and the repo count. */}
      <div className="grid gap-3 border-t border-[rgba(44,40,35,0.16)] pt-4 lg:grid-cols-3">
        {quickLinks.map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid min-h-[86px] grid-cols-[auto_1fr] items-center gap-4 border border-[rgba(44,40,35,0.12)] bg-studio-paper/45 p-3 transition-colors hover:border-terracotta hover:bg-studio-paper"
          >
            {link.image ? (
              <Image
                src={link.image}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 object-cover"
                aria-hidden="true"
              />
            ) : (
              <span
                className="grid h-14 w-14 place-items-center bg-ink font-serif text-[28px] italic text-studio-paper"
                aria-hidden="true"
              >
                {link.initial}
              </span>
            )}
            <span className="grid gap-1">
              <span className="font-serif text-[22px] font-light leading-none text-ink transition-colors group-hover:text-terracotta">
                {link.title}
              </span>
              <span className="max-w-[38ch] font-serif text-[13px] italic leading-snug text-ink-mute">
                {link.note}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
