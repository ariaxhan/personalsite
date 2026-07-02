import SectionHeader from "./studio/SectionHeader";
import Reveal from "./studio/Reveal";
import { moments, timelineTerminus } from "../utils/studioData";

const typeColor: Record<string, string> = {
  company: "#b56a4f",
  practice: "#6f8696",
  achievement: "#56695a",
  creative: "#b08a4c",
};

/**
 * Timeline: Fig. 06, a walk through the years.
 *
 * A corridor on large screens, a vertical field note stack on mobile. Each
 * year gets a marker, then the room it opened.
 */
export default function Timeline() {
  return (
    <section
      className="py-24 lg:py-28"
      style={{ paddingTop: 120, background: "linear-gradient(180deg, #ece4d2, #e7dec9)" }}
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-14">
        <SectionHeader
          fig="Fig. 06"
          label="Timeline"
          title="A walk through the years"
          note="Three companies, six wins, hundreds of builders met. A few markers from the path."
        />
      </div>

      <Reveal className="mt-12 px-5 pb-6 sm:px-8 md:overflow-x-auto lg:px-14" style={{ scrollbarWidth: "thin" }}>
        <div className="relative flex max-w-full flex-col gap-9 md:min-w-max md:flex-row md:gap-7 lg:gap-12">
          {/* the line */}
          <div
            className="absolute bottom-0 left-[5px] top-[76px] w-px md:left-0 md:right-0 md:top-[90px] md:h-px md:w-auto"
            style={{ background: "rgba(44,40,35,.22)" }}
          />
          {moments.map((m) => (
            <div
              key={m.title}
              className="relative grid min-w-0 grid-cols-[24px_1fr] gap-x-4 transition-transform duration-500 ease-paper hover:-translate-y-1.5 md:block md:flex-[0_0_308px]"
            >
              <div className="col-start-2 flex min-h-[56px] items-end md:min-h-[78px]">
                <span
                  className="font-serif text-[46px] font-light leading-[0.9] md:text-[58px]"
                  style={{ color: typeColor[m.type] }}
                >
                  {m.year}
                </span>
              </div>
              <div className="col-start-1 row-span-4 row-start-1 flex h-full items-start justify-center pt-[66px] md:relative md:flex md:h-6 md:items-center md:justify-start md:pt-0">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: "#2c2823", border: "3px solid #ece4d2", boxShadow: "0 0 0 1px rgba(44,40,35,.3)" }}
                />
              </div>
              <div className="col-start-2 mb-2 mt-2 break-words font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                {m.period}
              </div>
              <h3 className="col-start-2 m-0 mb-3 break-words font-serif text-[22px] font-medium leading-[1.12] text-ink">
                {m.title}
              </h3>
              <p className="col-start-2 m-0 max-w-[290px] text-[14.5px] leading-[1.65] text-ink-muted">
                {m.body}
              </p>
            </div>
          ))}
          {/* terminus */}
          <div className="grid min-w-0 grid-cols-[24px_1fr] gap-x-4 md:flex md:flex-[0_0_280px] md:items-start">
            <p className="col-start-2 max-w-[260px] font-serif text-[18px] italic leading-snug text-ink-ghost md:mt-[68px]">
              {timelineTerminus}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
