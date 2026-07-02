"use client";

import { useEffect, useRef, ReactNode, ElementType } from "react";

/**
 * Reveal: content emerging from beneath paper.
 *
 * Wraps children, starts them lowered + faded (via the [data-reveal] rule in
 * globals.css), and lifts them into place the first time they cross into view.
 * One observer per element, unobserved after it fires, so the motion happens
 * once and never repeats. Honors prefers-reduced-motion through CSS.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  style,
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    document.documentElement.classList.add("reveal-enhanced");

    const reveal = () => el.classList.add("is-visible");
    const fallback = globalThis.setTimeout(reveal, 1200);
    const clearFallback = () => globalThis.clearTimeout(fallback);

    // Already in view on mount (above the fold): show immediately.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) {
      reveal();
      clearFallback();
      return undefined;
    }
    if (!("IntersectionObserver" in window)) {
      reveal();
      clearFallback();
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-visible");
            clearFallback();
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -7% 0px" }
    );
    io.observe(el);
    return () => {
      clearFallback();
      io.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      className={className}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}
