import Reveal from "./Reveal";

/**
 * SectionHeader: the museum-signage voice.
 *
 * A mono figure label, a large serif title, and an optional handwritten-feeling
 * italic note set to the right. Sits over a hairline rule. This is the rhythm
 * that repeats across every room of the studio. The title renders as an <h2> by
 * default; pass as="h1" on a dedicated page that needs its single top-level
 * heading.
 */
export default function SectionHeader({
  fig,
  label,
  title,
  note,
  as: Heading = "h2",
}: {
  fig: string;
  label: string;
  title: string;
  note?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className="flex flex-col items-start justify-between gap-5 border-b border-[rgba(44,40,35,0.18)] pb-4 sm:flex-row sm:items-end sm:gap-6">
      <div className="max-w-3xl">
        <div className="kicker mb-3">
          {fig} · {label}
        </div>
        <Heading className="font-serif font-light leading-[1.02] text-ink text-[clamp(34px,5vw,62px)]">
          {title}
        </Heading>
      </div>
      {note && (
        <p className="m-0 max-w-[34rem] text-left font-serif italic text-[16px] leading-snug text-ink-ghost sm:max-w-[260px] sm:text-right sm:text-[17px]">
          {note}
        </p>
      )}
    </Reveal>
  );
}
