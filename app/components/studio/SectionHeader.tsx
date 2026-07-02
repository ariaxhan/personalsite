import Reveal from "./Reveal";

/**
 * SectionHeader: the museum-signage voice.
 *
 * A mono figure label, a large serif title, and an optional handwritten-feeling
 * italic note set to the right. Sits over a hairline rule. This is the rhythm
 * that repeats across every room of the studio.
 */
export default function SectionHeader({
  fig,
  label,
  title,
  note,
}: {
  fig: string;
  label: string;
  title: string;
  note?: string;
}) {
  return (
    <Reveal className="flex flex-col items-start justify-between gap-5 border-b border-[rgba(44,40,35,0.18)] pb-4 sm:flex-row sm:items-end sm:gap-6">
      <div className="max-w-3xl">
        <div className="kicker mb-3">
          {fig} · {label}
        </div>
        <h2 className="font-serif font-light leading-[1.02] text-ink text-[clamp(34px,5vw,62px)]">
          {title}
        </h2>
      </div>
      {note && (
        <p className="m-0 max-w-[34rem] text-left font-serif italic text-[16px] leading-snug text-ink-ghost sm:max-w-[260px] sm:text-right sm:text-[17px]">
          {note}
        </p>
      )}
    </Reveal>
  );
}
