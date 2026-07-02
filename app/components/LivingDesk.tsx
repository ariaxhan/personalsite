import Link from "next/link";
import Reveal from "./studio/Reveal";
import SectionHeader from "./studio/SectionHeader";
import { deskObjects, DeskObject } from "../utils/studioData";

/**
 * LivingDesk: Fig. 01, the desk.
 *
 * A physical work surface, scattered but intentional. Each object is a door to
 * a room of the studio. Hovering lifts the object off the desk; clicking opens
 * the room. On small screens the scatter would collide, so it folds down into a
 * tidy index of the same doors.
 */
export default function LivingDesk() {
  return (
    <section className="mx-auto max-w-wall px-5 pb-24 pt-10 sm:px-8 lg:px-14">
      <SectionHeader
        fig="Fig. 01"
        label="The Desk"
        title="Everything within reach"
        note="Each object opens a room. Pick one up."
      />

      {/* The desk surface, md and up */}
      <Reveal
        className="relative mt-10 hidden overflow-hidden rounded-[5px] md:block"
        style={{
          minHeight: 640,
          background: "linear-gradient(168deg, #ece3d0, #e3d8c0)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,.5), 0 30px 70px -50px rgba(44,40,35,.5)",
        }}
      >
        {/* faint grain of the desk grain */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.6,
            backgroundImage:
              "repeating-linear-gradient(91deg, rgba(120,100,70,.05) 0 2px, transparent 2px 28px)",
          }}
        />
        {/* a pencil resting across the desk */}
        <div
          className="absolute"
          style={{
            left: "60%",
            top: "50%",
            width: 168,
            height: 9,
            borderRadius: 4,
            background: "linear-gradient(#caa14e, #b0894c)",
            transform: "rotate(28deg)",
            boxShadow: "0 8px 14px -8px rgba(44,40,35,.5)",
          }}
        />

        {deskObjects.map((obj) => (
          <Link
            key={obj.href}
            href={obj.href}
            className="group absolute flex flex-col items-center gap-3"
            style={{
              left: obj.pos.left,
              right: obj.pos.right,
              top: obj.pos.top,
              transform: obj.pos.rotate ? `rotate(${obj.pos.rotate}deg)` : undefined,
            }}
          >
            <div className="flex flex-col items-center gap-3 transition-transform duration-500 ease-paper group-hover:-translate-y-2">
              <DeskDrawing kind={obj.kind} />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-mute transition-colors group-hover:text-ink">
                {obj.label}
              </span>
            </div>
          </Link>
        ))}
      </Reveal>

      {/* Compact object room, small screens */}
      <Reveal
        className="relative mt-8 grid grid-cols-2 gap-3 overflow-hidden rounded-[5px] border border-[rgba(44,40,35,0.1)] p-3 md:hidden"
        style={{
          background: "linear-gradient(168deg, #ece3d0, #e3d8c0)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.5)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.45,
            backgroundImage:
              "repeating-linear-gradient(91deg, rgba(120,100,70,.05) 0 2px, transparent 2px 24px)",
          }}
        />
        {deskObjects.map((obj) => (
          <Link
            key={obj.href}
            href={obj.href}
            aria-label={`Open ${obj.caption}`}
            className="relative flex min-h-[168px] flex-col items-center justify-between gap-3 bg-studio-card px-3 py-4 text-center transition-transform active:scale-[0.99]"
            style={{ border: "1px solid rgba(44,40,35,.08)" }}
          >
            <div className="flex min-h-[86px] w-full items-center justify-center overflow-visible">
              <div style={{ transform: "scale(.62)", transformOrigin: "center" }}>
                <DeskDrawing kind={obj.kind} />
              </div>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.13em] text-terracotta">
                {obj.label}
              </div>
              <div className="mt-1 font-serif text-[16px] leading-tight text-ink">{obj.caption}</div>
            </div>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}

/** Small CSS-drawn objects, one per desk item. Pure decoration. */
function DeskDrawing({ kind }: { kind: DeskObject["kind"] }) {
  const drop = "drop-shadow(0 14px 16px rgba(44,40,35,.28))";
  switch (kind) {
    case "books":
      return (
        <div className="flex flex-col gap-1" style={{ filter: drop }}>
          <div style={{ width: 132, height: 17, borderRadius: 2, background: "#56695a" }} />
          <div style={{ width: 120, height: 17, borderRadius: 2, background: "#b56a4f", marginLeft: 8 }} />
          <div style={{ width: 126, height: 17, borderRadius: 2, background: "#b08a4c" }} />
        </div>
      );
    case "notebook":
      return (
        <div
          className="relative"
          style={{
            width: 142,
            height: 104,
            borderRadius: "3px 5px 5px 3px",
            background: "#fbf8f1",
            border: "1px solid rgba(44,40,35,.16)",
            borderLeft: "7px solid #485a4d",
            boxShadow: "0 16px 22px -16px rgba(44,40,35,.5)",
            padding: "16px 16px 0 18px",
          }}
        >
          <div style={{ height: 1, background: "rgba(44,40,35,.12)", marginBottom: 11 }} />
          <div style={{ height: 1, background: "rgba(44,40,35,.12)", marginBottom: 11, width: "80%" }} />
          <div style={{ height: 1, background: "rgba(44,40,35,.12)", width: "60%" }} />
        </div>
      );
    case "blueprint":
      return (
        <div
          className="relative overflow-hidden"
          style={{
            width: 158,
            height: 116,
            borderRadius: 3,
            background: "#cdd8db",
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(60,80,90,.16) 0 1px, transparent 1px 16px), repeating-linear-gradient(90deg, rgba(60,80,90,.16) 0 1px, transparent 1px 16px)",
            boxShadow: "0 16px 22px -16px rgba(44,40,35,.5)",
          }}
        >
          <div style={{ position: "absolute", left: 22, top: 26, width: 56, height: 56, border: "1.5px solid #41606c", borderRadius: "50%" }} />
          <div style={{ position: "absolute", left: 50, top: 54, width: 78, height: 1.5, background: "#41606c", transform: "rotate(-32deg)" }} />
          <div style={{ position: "absolute", right: 16, bottom: 12, fontFamily: "var(--font-mono)", fontSize: 8, color: "#41606c", letterSpacing: ".1em" }}>
            REV. 04
          </div>
        </div>
      );
    case "map":
      return (
        <div
          className="relative overflow-hidden"
          style={{ width: 150, height: 108, borderRadius: 3, background: "#efe6cf", boxShadow: "0 16px 22px -16px rgba(44,40,35,.5)" }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(90deg, transparent 49.6%, rgba(44,40,35,.1) 49.6% 50.4%, transparent 50.4%)" }} />
          <div style={{ position: "absolute", left: 20, top: 24, width: 70, height: 1, background: "#b56a4f", transform: "rotate(18deg)", opacity: 0.7 }} />
          <div style={{ position: "absolute", left: 38, top: 60, width: 64, height: 1, background: "#6f8696", transform: "rotate(-24deg)", opacity: 0.7 }} />
          <div style={{ position: "absolute", left: 30, top: 30, width: 5, height: 5, borderRadius: "50%", background: "#b56a4f" }} />
          <div style={{ position: "absolute", right: 28, bottom: 26, width: 5, height: 5, borderRadius: "50%", background: "#6f8696" }} />
        </div>
      );
    case "card":
      return (
        <div
          className="relative overflow-hidden"
          style={{ width: 154, height: 100, borderRadius: 3, background: "#fbf8f1", boxShadow: "0 16px 22px -16px rgba(44,40,35,.5)", padding: "22px 16px 0" }}
        >
          <div style={{ position: "absolute", left: 0, right: 0, top: 16, height: 1, background: "#b56a4f", opacity: 0.55 }} />
          <div style={{ height: 1, background: "rgba(44,40,35,.13)", marginBottom: 12 }} />
          <div style={{ height: 1, background: "rgba(44,40,35,.13)", marginBottom: 12, width: "76%" }} />
          <div style={{ height: 1, background: "rgba(44,40,35,.13)", width: "88%" }} />
        </div>
      );
    case "sticky":
      return (
        <div className="relative" style={{ width: 100, height: 92 }}>
          <div style={{ position: "absolute", left: 0, top: 6, width: 86, height: 86, background: "#e9cf7e", transform: "rotate(-6deg)", boxShadow: "0 12px 16px -12px rgba(44,40,35,.5)" }} />
          <div style={{ position: "absolute", left: 14, top: 0, width: 86, height: 86, background: "#efd98f", transform: "rotate(4deg)", boxShadow: "0 12px 16px -12px rgba(44,40,35,.5)", padding: 16 }}>
            <div style={{ height: 1.5, background: "rgba(80,60,30,.4)", marginBottom: 12, width: "70%" }} />
            <div style={{ height: 1.5, background: "rgba(80,60,30,.4)", marginBottom: 12, width: "86%" }} />
            <div style={{ height: 1.5, background: "rgba(80,60,30,.4)", width: "54%" }} />
          </div>
        </div>
      );
    case "coffee":
      return (
        <div className="relative" style={{ width: 78, height: 78, filter: "drop-shadow(0 14px 16px rgba(44,40,35,.3))" }}>
          <div style={{ position: "absolute", right: -16, top: 20, width: 30, height: 34, border: "7px solid #efe9da", borderRadius: "50%" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#faf6ee", border: "4px solid #efe9da" }} />
          <div style={{ position: "absolute", inset: 12, borderRadius: "50%", background: "radial-gradient(circle at 38% 34%, #7a6450, #4f3f30)" }} />
        </div>
      );
  }
}
