/**
 * Hero: Fig. 00, the entrance.
 *
 * Arrival. Very little text, very large type, a single sentence that sets the
 * whole tone. Marginalia in the corners like a catalogue plate. The thin line
 * at the bottom breathes, a quiet invitation to wander in rather than a button
 * shouting to be clicked.
 */
export default function Hero() {
  return (
    <section
      id="entrance"
      className="relative grid min-h-[100svh] px-5 pb-8 sm:px-8 sm:pb-10 lg:px-14"
      style={{ gridTemplateRows: "auto 1fr auto", paddingTop: "clamp(92px, 14vw, 120px)" }}
    >
      {/* Top marginalia */}
      <div className="flex items-start justify-between gap-4">
        <div className="kicker" style={{ lineHeight: 2 }}>
          Fig. 00 · Entrance
          <br />Welcome to the workshop.
        </div>
        <div
          className="kicker max-w-[230px] text-right"
          style={{ lineHeight: 2, letterSpacing: "0.14em" }}
        >
          Los Angeles, California
          <br />
          Building since 2024
        </div>
      </div>

      {/* Center */}
      <div className="grid max-w-[1180px] gap-8 self-center">
        <div>
          <h1
            className="m-0 font-serif font-light text-ink"
            style={{
              fontSize: "clamp(58px, 18vw, 232px)",
              lineHeight: 1.02,
              paddingTop: "0.06em",
            }}
          >
            Aria Han
          </h1>
        </div>
        <div className="grid gap-5 pl-1">
          <p
            className="m-0 max-w-[640px] font-serif font-light italic text-ink-soft"
            style={{ fontSize: "clamp(22px, 2.9vw, 38px)", lineHeight: 1.32 }}
          >
            I build AI systems that remember, work together, and get better with use.
          </p>
          <p
            className="m-0 max-w-[470px] text-ink-faint"
            style={{ fontSize: "15.5px", lineHeight: 1.7 }}
          >
            This is where I publish the systems, experiments, and thinking behind them.
          </p>
        </div>
      </div>

      {/* Bottom marginalia */}
      <div className="grid grid-cols-1 gap-4 border-t border-[rgba(44,40,35,0.16)] pt-4 sm:flex sm:items-end sm:justify-between sm:gap-6">
        <div className="kicker" style={{ letterSpacing: "0.16em" }}>
          AI Systems Architect
          <br />
          Writer
          <br />
          Open Source Builder
        </div>
        <div className="hidden flex-col items-center gap-2 sm:flex">
          <span className="kicker" style={{ fontSize: "10px", letterSpacing: "0.22em" }}>
            Start anywhere.
            <br />
            Follow whatever catches your eye.
          </span>
          <span
            className="block h-[34px] w-px animate-drift"
            style={{ background: "linear-gradient(#8a8275, transparent)" }}
          />
        </div>
        <div className="kicker text-left sm:text-right" style={{ letterSpacing: "0.16em" }}>
          Coordination
          <br />
          Over Intelligence
        </div>
      </div>
    </section>
  );
}
