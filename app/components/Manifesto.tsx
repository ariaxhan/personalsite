import Reveal from "./studio/Reveal";
import { getSiteContent } from "../content/repository";

/**
 * Manifesto: the note before you wander.
 *
 * Atmosphere before evidence. A large serif pull-quote that states the thesis
 * (ambient, not loud), then two quiet columns of body text. No cards, no
 * borders, just a held breath.
 */
export default async function Manifesto() {
  const { content: { PAGE_COPY } } = await getSiteContent();
  const copy = PAGE_COPY.manifesto;

  return (
    <section className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 lg:px-14 lg:py-24">
      <Reveal className="grid gap-10 border-t border-[rgba(44,40,35,0.16)] pt-10 lg:grid-cols-[220px_1fr] lg:gap-14 lg:pt-14">
        <div>
          <div className="kicker sticky top-28">{copy.label}</div>
        </div>
        <div className="max-w-[800px]">
          <p
            className="m-0 font-serif font-light text-ink"
            style={{ fontSize: "clamp(24px, 3.2vw, 40px)", lineHeight: 1.24 }}
          >
            {copy.lead.map((line, i) => (
              <span key={line}>
                {i > 0 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
                {line}
              </span>
            ))}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-dashed border-[rgba(44,40,35,0.18)] pt-8 sm:grid-cols-2 lg:gap-12">
            <p className="m-0 text-[16px] leading-[1.75] text-ink-muted">
              {copy.columns[0].map((line, i) => (
                <span key={line}>
                  {i > 0 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                  {line}
                </span>
              ))}
            </p>
            <p className="m-0 text-[16px] leading-[1.75] text-ink-muted">
              {copy.columns[1].map((line, i) => (
                <span key={line}>
                  {i > 0 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
