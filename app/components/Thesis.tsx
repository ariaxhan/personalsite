import Reveal from "./studio/Reveal";

export default function Thesis() {
  return (
    <section className="mx-auto flex min-h-[48svh] max-w-[1120px] items-center px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
      <Reveal>
        <p
          className="m-0 max-w-[960px] font-serif font-light text-ink"
          style={{ fontSize: "clamp(34px, 5.6vw, 68px)", lineHeight: 1.06 }}
        >
          The interesting problem isn&apos;t making models smarter.
          <br />
          <span className="italic text-ink-soft">
            It&apos;s building environments where intelligence compounds.
          </span>
        </p>
      </Reveal>
    </section>
  );
}
