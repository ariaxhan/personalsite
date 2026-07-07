import Image from "next/image";
import GitHubContribPreview from "./GitHubContribPreview";

const proofStats = [
  { value: "47", label: "Public repositories" },
  { value: "6", label: "Hackathon wins" },
  { value: "2", label: "Live solo apps" },
  { value: "400+", label: "Daily agent artworks" },
  { value: "34", label: "Portable skills" },
  { value: "21", label: "Benchmark tasks" },
];

const badges = ["Open Source", "App Store", "PyPI", "GitHub Actions", "Cloudflare"];

const quickLinks = [
  {
    title: "Paper Rooms",
    href: "https://paper-rooms.com",
    image: "/studio/paperrooms-icon.jpg",
    note: "Local-first research library",
  },
  {
    title: "ModelMind",
    href: "https://model-mind.org",
    image: "/studio/modelmind-icon.jpg",
    note: "Learn how AI actually works",
  },
  {
    title: "GitHub",
    href: "https://github.com/ariaxhan",
    image: null,
    note: "Public systems and experiments",
  },
];

export default function Hero() {
  return (
    <section
      id="entrance"
      className="relative grid min-h-[100svh] grid-cols-[minmax(0,1fr)] overflow-hidden px-5 pb-8 sm:px-8 sm:pb-10 lg:px-14"
      style={{ gridTemplateRows: "auto 1fr auto", paddingTop: "clamp(88px, 10vw, 118px)" }}
    >
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="kicker" style={{ lineHeight: 2 }}>
          Fig. 00 · Entrance
          <br />Proof before prose.
        </div>
        <div
          className="kicker max-w-[150px] text-right sm:max-w-[230px]"
          style={{ lineHeight: 2, letterSpacing: "0.14em" }}
        >
          Los Angeles, CA
          <br />
          Building since 2024
        </div>
      </div>

      <div className="grid min-w-0 max-w-[1320px] gap-8 self-center py-10 sm:w-full lg:grid-cols-[minmax(0,0.92fr)_minmax(430px,0.72fr)] lg:items-center lg:gap-12">
        <div className="grid min-w-0 gap-7">
          <h1
            className="m-0 font-serif font-light text-ink"
            style={{
              fontSize: "clamp(62px, 12.5vw, 176px)",
              lineHeight: 0.94,
              paddingTop: "0.06em",
            }}
          >
            Aria Han
          </h1>

          <p
            className="m-0 max-w-[650px] font-serif font-light italic text-ink-soft"
            style={{ fontSize: "clamp(24px, 3.1vw, 42px)", lineHeight: 1.2 }}
          >
            AI systems architect building memory, evaluation, and tools that make agents more reliable.
          </p>

          <div className="grid grid-cols-2 border-y border-[rgba(44,40,35,0.16)] sm:grid-cols-3">
            {proofStats.map((stat) => (
              <div
                key={stat.label}
                className="min-h-[102px] border-b border-r border-[rgba(44,40,35,0.12)] px-4 py-5 [&:nth-child(2n)]:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 sm:min-h-[112px] sm:px-6 sm:py-5 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b sm:[&:nth-last-child(-n+3)]:border-b-0"
              >
                <div className="font-serif text-[38px] font-light leading-none text-ink sm:text-[46px]">
                  {stat.value}
                </div>
                <div className="mt-2 max-w-[130px] font-mono text-[9px] uppercase leading-4 tracking-[0.16em] text-ink-mute">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden sm:block">
          <GitHubContribPreview />
        </div>
      </div>

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
                G
              </span>
            )}
            <span className="grid gap-1">
              <span className="font-serif text-[24px] font-light leading-none text-ink transition-colors group-hover:text-terracotta">
                {link.title}
              </span>
              <span className="font-mono text-[9px] uppercase leading-4 tracking-[0.14em] text-ink-mute">
                {link.note}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
