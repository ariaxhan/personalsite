"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import SectionHeader from "./studio/SectionHeader";
import Reveal from "./studio/Reveal";
import Modal from "./studio/Modal";

export interface WallItem {
  title: string;
  tag: string;
  accent: string;
  hook: string;
  body: string[];
  meta: Record<string, string>;
  link?: { label: string; href: string };
  /** hero image shown in the card plate */
  image?: string;
  /** full set shown as a small gallery in the story modal */
  images?: string[];
  /** brand mark shown as a chip in the story modal header */
  logo?: string;
  /** muted demo loop shown as the lead media in the story modal */
  video?: string;
  /** poster frame for the demo video */
  poster?: string;
  /** how the plate image sits: cover (fill, default) or contain (padded wordmark) */
  imageFit?: "cover" | "contain";
}

const rotations = [-2.4, 1.6, -1.1, 2.2, -1.8, 1.4, -3, 2];

/**
 * WorkshopWall: projects pinned to the studio wall.
 *
 * Each piece looks like evidence collected during exploration: a pushpin, a
 * little tilt, a textured plate. Resting on one straightens it and lifts it off
 * the wall; opening it expands into the written story rather than a feature
 * list. Shared by the Systems and Open Source rooms.
 */
export default function WorkshopWall({
  fig,
  label,
  title,
  note,
  items,
}: {
  fig: string;
  label: string;
  title: string;
  note: string;
  items: WallItem[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const active = open != null ? items[open] : null;
  const activeImages = active?.images ?? [];
  // The demo video is the default lead; picking a screenshot swaps it in, and
  // the play tile in the strip brings the video back.
  const showVideo = active?.video != null && selectedImage == null;
  const selectedPreview = showVideo ? null : selectedImage ?? activeImages[0] ?? null;

  useEffect(() => {
    setSelectedImage(null);
  }, [open]);

  return (
    <section className="mx-auto max-w-wall px-5 sm:px-8 lg:px-14" style={{ paddingTop: "clamp(92px, 12vw, 120px)" }}>
      <SectionHeader fig={fig} label={label} title={title} note={note} />

      <div className="mt-10 grid grid-cols-1 items-start gap-x-8 gap-y-10 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] sm:gap-y-12">
        {items.map((p, i) => (
          <Reveal key={p.title} delay={Math.min(i, 6) * 50}>
            <button
              onClick={() => setOpen(i)}
              className="group relative block w-full cursor-pointer border-0 bg-transparent p-0 text-left sm:[transform:var(--wall-tilt)]"
              style={{
                "--wall-tilt": `rotate(${rotations[i % rotations.length]}deg)`,
                transition: "transform .6s cubic-bezier(.2,.6,.2,1)",
              } as CSSProperties}
            >
              {/* pushpin */}
              <span
                className="absolute left-1/2 top-[-9px] z-10 h-[15px] w-[15px] -translate-x-1/2 rounded-full"
                style={{
                  background: "radial-gradient(circle at 38% 32%, #c97a5e, #8a4334)",
                  boxShadow: "0 4px 6px -2px rgba(44,40,35,.5)",
                }}
              />
              <div
                className="bg-studio-card p-5 transition-shadow duration-500 ease-paper group-hover:shadow-paper-lift"
                style={{ border: "1px solid rgba(44,40,35,.07)", boxShadow: "0 22px 34px -28px rgba(44,40,35,.55)" }}
              >
                {/* plate: a mounted image, or a printed placeholder if none */}
                {p.image ? (
                  <div
                    className="relative mb-4 overflow-hidden"
                    style={{ aspectRatio: "4 / 3", background: "#ece4d4", border: "1px solid rgba(44,40,35,.08)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={`${p.title} logo`}
                      loading="lazy"
                      className={`h-full w-full transition-transform duration-700 ease-paper group-hover:scale-[1.03] ${
                        p.imageFit === "contain" ? "object-contain p-8" : "object-cover"
                      }`}
                    />
                    <span className="absolute left-3 top-3 h-1 w-9 rounded-sm" style={{ background: p.accent }} />
                  </div>
                ) : (
                  <div
                    className="mb-4 flex items-end justify-between p-3"
                    style={{
                      aspectRatio: "4 / 3",
                      background: "#ece4d4",
                      backgroundImage: "repeating-linear-gradient(135deg, rgba(44,40,35,.05) 0 7px, transparent 7px 14px)",
                      border: "1px solid rgba(44,40,35,.08)",
                    }}
                  >
                    <span className="h-1 w-9 rounded-sm" style={{ background: p.accent }} />
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-mute">
                      studio · {p.title}
                    </span>
                  </div>
                )}
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-terracotta">
                    {p.tag}
                  </span>
                  <span className="font-mono text-[10px] text-ink-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="m-0 mb-3 font-serif text-[27px] font-normal leading-[1.05] text-ink">
                  {p.title}
                </h3>
                <p className="m-0 mb-4 font-serif text-[17.5px] italic leading-snug text-ink-soft">
                  {p.hook}
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-ghost">
                  read the story {"->"}
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Modal open={active != null} onClose={() => setOpen(null)} maxWidth={860}>
        {active && (
          <>
            <div className="mb-4 flex items-center gap-3">
              {active.logo && (
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[7px] bg-white"
                  style={{ border: "1px solid rgba(44,40,35,.12)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={active.logo} alt={`${active.title} logo`} className="h-full w-full object-contain p-1.5" />
                </span>
              )}
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-terracotta">
                {active.tag} · {active.title}
              </div>
            </div>
            <h3 className="m-0 mb-6 font-serif text-[clamp(28px,4.5vw,46px)] font-light leading-[1.1] text-ink">
              {active.title}
            </h3>

            {(active.video || selectedPreview) && (
              <div className="mb-7 flex flex-col gap-3">
                <div
                  className="flex items-center justify-center overflow-hidden rounded-[3px]"
                  style={{ border: "1px solid rgba(44,40,35,.1)", background: "#ece4d4" }}
                >
                  {selectedPreview ? (
                    <a href={selectedPreview} target="_blank" rel="noopener noreferrer" className="block w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedPreview}
                        alt={`${active.title} screenshot`}
                        className="mx-auto h-auto w-full object-contain"
                        style={{ maxHeight: "min(68vh, 760px)" }}
                      />
                    </a>
                  ) : (
                    <video
                      src={active.video ?? ""}
                      poster={active.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      className="w-full object-contain"
                      style={{ maxHeight: "min(68vh, 760px)" }}
                    />
                  )}
                </div>
                {activeImages.length + (active.video ? 1 : 0) > 1 && (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {active.video && (
                      <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="relative overflow-hidden rounded-[2px] bg-[#ece4d4] p-0"
                        aria-label={`Play ${active.title} demo`}
                        aria-pressed={showVideo}
                        style={{ border: showVideo ? "2px solid #b56a4f" : "1px solid rgba(44,40,35,.1)" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={active.poster} alt="" className="h-full w-full object-cover object-top" style={{ aspectRatio: "4 / 3" }} />
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(20,16,10,.55)] pl-0.5 text-[10px] text-white">
                            {"▶"}
                          </span>
                        </span>
                      </button>
                    )}
                    {activeImages.map((src, k) => {
                      const selected = src === selectedPreview;
                      return (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setSelectedImage(src)}
                          className="overflow-hidden rounded-[2px] bg-[#ece4d4] p-0"
                          aria-label={`Show ${active.title} screenshot ${k + 1}`}
                          aria-pressed={selected}
                          style={{
                            border: selected ? "2px solid #b56a4f" : "1px solid rgba(44,40,35,.1)",
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={src} alt="" className="h-full w-full object-contain" style={{ aspectRatio: "4 / 3" }} />
                        </button>
                      );
                    })}
                  </div>
                )}
                {selectedPreview && (
                  <a
                    href={selectedPreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[16px] italic text-ink transition-colors hover:border-terracotta hover:text-terracotta"
                  >
                    Open screenshot full size {"->"}
                  </a>
                )}
              </div>
            )}

            <p className="m-0 mb-8 font-serif text-[20px] italic leading-[1.4] text-ink-soft">
              {active.hook}
            </p>

            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
              The work
            </div>
            {active.body.map((para, j) => (
              <p key={j} className="m-0 mb-4 text-[16.5px] leading-[1.7] text-ink-soft">
                {para}
              </p>
            ))}

            <dl className="mt-7 grid gap-x-6 gap-y-3 border-t border-dashed border-[rgba(44,40,35,0.25)] pt-6 sm:grid-cols-2">
              {Object.entries(active.meta).map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-mute">
                    {k.replace(/_/g, " ")}
                  </dt>
                  <dd className="m-0 text-[14.5px] text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>

            {active.link && (
              <a
                href={active.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block border-b border-[rgba(44,40,35,0.3)] pb-1 font-serif text-[18px] italic text-ink transition-colors hover:border-terracotta hover:text-terracotta"
              >
                {active.link.label} {"->"}
              </a>
            )}
          </>
        )}
      </Modal>
    </section>
  );
}
