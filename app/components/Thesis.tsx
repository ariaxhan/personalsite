import Reveal from "./studio/Reveal";
import { PAGE_COPY } from "../utils/siteCopy";

export default function Thesis() {
  const line2 = "line2" in PAGE_COPY.thesis ? String(PAGE_COPY.thesis.line2) : null;

  return (
    <section className="mx-auto flex min-h-[48svh] max-w-[1120px] items-center px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
      <Reveal>
        <p
          className="m-0 max-w-[960px] font-serif font-light text-ink"
          style={{ fontSize: "clamp(34px, 5.6vw, 68px)", lineHeight: 1.06 }}
        >
          {PAGE_COPY.thesis.line1}
          {line2 && (
            <>
              <br />
              <span className="italic text-ink-soft">{line2}</span>
            </>
          )}
        </p>
      </Reveal>
    </section>
  );
}
