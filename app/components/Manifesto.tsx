import Reveal from "./studio/Reveal";

/**
 * Manifesto: the note before you wander.
 *
 * Atmosphere before evidence. A large serif pull-quote that states the thesis
 * (ambient, not loud), then two quiet columns of body text. No cards, no
 * borders, just a held breath.
 */
export default function Manifesto() {
  return (
    <section className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 lg:px-14 lg:py-24">
      <Reveal className="grid gap-10 border-t border-[rgba(44,40,35,0.16)] pt-10 lg:grid-cols-[220px_1fr] lg:gap-14 lg:pt-14">
        <div>
          <div className="kicker sticky top-28">Before you explore</div>
        </div>
        <div className="max-w-[800px]">
          <p
            className="m-0 font-serif font-light text-ink"
            style={{ fontSize: "clamp(24px, 3.2vw, 40px)", lineHeight: 1.24 }}
          >
            Most portfolios tell the story backwards: the polished launch,
            everything that made it possible quietly deleted.
            <br />
            <br />
            This site is the opposite. A working record, finished products
            beside abandoned experiments, research notes beside shipped code,
            some ideas complete, others still in pencil.
            <br />
            <br />
            That&apos;s the more honest picture of how good systems get built.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-dashed border-[rgba(44,40,35,0.18)] pt-8 sm:grid-cols-2 lg:gap-12">
            <p className="m-0 text-[16px] leading-[1.75] text-ink-muted">
              I designed the site like a room instead of a resume.
              <br />
              <br />
              Pick something up. Open a drawer. Follow a thread.
              <br />
              <br />
              That&apos;s closer to how curiosity actually works.
            </p>
            <p className="m-0 text-[16px] leading-[1.75] text-ink-muted">
              You&apos;ll find successful projects here. You&apos;ll also find dead
              ends: benchmarks that disproved my own ideas, experiments that
              failed, half-finished diagrams.
              <br />
              <br />
              Keeping the failures visible matters almost as much as publishing
              the wins.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
