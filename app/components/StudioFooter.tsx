import Link from "next/link";
import Reveal from "./studio/Reveal";

interface FootLink {
  label: string;
  href: string;
  external?: boolean;
}

const links: FootLink[] = [
  { label: "ModelMind", href: "https://apps.apple.com/us/app/modelmind/id6761348536", external: true },
  { label: "Paper Rooms", href: "https://apps.apple.com/us/app/paper-rooms/id6780741814", external: true },
  { label: "SUBSTRATE", href: "https://nexus-substrate.pages.dev", external: true },
  { label: "Open source", href: "/open-source" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/contact" },
];

/**
 * StudioFooter: the colophon. A single conviction set large, a row of doors out,
 * and the studio's address. Repeated at the foot of every room.
 */
export default function StudioFooter() {
  return (
    <footer className="mx-auto max-w-[1280px] px-5 pb-16 pt-28 sm:px-8 lg:px-14">
      <Reveal className="border-t border-[rgba(44,40,35,0.2)] pt-12 lg:pt-16">
        <p
          className="m-0 mb-7 max-w-[720px] font-serif font-light italic text-ink"
          style={{ fontSize: "clamp(26px, 4vw, 52px)", lineHeight: 1.18 }}
        >
          Not software that replaces intelligence. Infrastructure that expands it.
        </p>
        <div className="mb-14 flex flex-wrap items-baseline gap-x-10 gap-y-7">
          {links.map((l) =>
            l.external ? (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-[rgba(44,40,35,0.3)] pb-0.5 text-[15px] text-ink transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className="border-b border-[rgba(44,40,35,0.3)] pb-0.5 text-[15px] text-ink transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {l.label}
              </Link>
            )
          )}
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
          <span>Aria Han · Los Angeles · 2026</span>
          <span>Coordination over intelligence</span>
        </div>
      </Reveal>
    </footer>
  );
}
