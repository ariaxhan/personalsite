"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteCopy } from "./LocaleProvider";
import type { Locale } from "../utils/locale";

/**
 * Navigation: the studio masthead.
 *
 * Wordmark left, four English category labels centered, locale right.
 * Each category opens a full-width drop from the bar.
 */
export default function Navigation() {
  const pathname = usePathname();
  const { PAGE_COPY, locale, setLocale } = useSiteCopy();
  const nav = PAGE_COPY.navigation;
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const apply = () => {
      document.documentElement.style.setProperty("--masthead-height", `${bar.offsetHeight}px`);
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!openGroup) return;
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenGroup(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenGroup(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const groups = nav.groups.map((group) => ({
    label: group.label,
    items: group.hrefs.flatMap((href) => nav.items.filter((item) => item.href === href)),
  }));

  const activeGroup = groups.find((group) => group.label === openGroup) ?? null;
  const linkClass =
    "inline-flex h-10 w-full items-center justify-center gap-1 border-0 bg-transparent p-0 font-serif text-[15px] italic touch-manipulation sm:h-auto sm:w-auto sm:gap-1.5 sm:text-[18px]";

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-[200] pt-[env(safe-area-inset-top)] transition-colors duration-500 ${
        openGroup || scrolled
          ? "bg-studio-ivory/92 backdrop-blur-md border-b border-[rgba(44,40,35,0.1)]"
          : "border-b border-transparent"
      }`}
    >
      <div ref={barRef} className="px-5 sm:px-8 lg:px-14">
        <div className="relative flex h-12 items-center justify-between lg:h-16">
          <Link
            href="/"
            className="inline-flex items-center font-serif text-[20px] leading-none tracking-[0.01em] text-ink transition-colors hover:text-terracotta sm:text-[21px]"
          >
            Aria&nbsp;Han
          </Link>

          <nav
            className="hidden items-center justify-center gap-8 lg:absolute lg:left-1/2 lg:top-1/2 lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2"
            aria-label={nav.open}
          >
            {groups.map((group) => (
              <CategoryControl
                key={group.label}
                group={group}
                openGroup={openGroup}
                setOpenGroup={setOpenGroup}
                isActive={isActive}
                className={linkClass}
              />
            ))}
          </nav>

          <LocaleToggle locale={locale} setLocale={setLocale} />
        </div>

        <nav
          className="grid grid-cols-4 border-t border-[rgba(44,40,35,0.08)] lg:hidden"
          aria-label={nav.open}
        >
          {groups.map((group) => (
            <CategoryControl
              key={group.label}
              group={group}
              openGroup={openGroup}
              setOpenGroup={setOpenGroup}
              isActive={isActive}
              className={linkClass}
            />
          ))}
        </nav>
      </div>

      <div
        id="studio-index-panel"
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          activeGroup ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="max-h-[min(70vh,28rem)] overflow-y-auto border-t border-[rgba(44,40,35,0.12)] bg-studio-paper px-5 py-6 sm:px-8 sm:py-10 lg:px-14">
            {activeGroup && (
              <div className="flex flex-col items-center">
                <div className="kicker mb-4 sm:mb-5">{activeGroup.label}</div>
                <ul className="m-0 mx-auto flex w-max list-none flex-col gap-1 p-0 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-12 sm:gap-y-4">
                  {activeGroup.items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.href} className="relative">
                        <Link
                          href={item.href}
                          className="group flex min-h-11 items-center py-1.5 pl-8 text-left touch-manipulation sm:min-h-0 sm:items-baseline sm:gap-3 sm:py-0 sm:pl-0"
                          style={{ color: active ? "#b56a4f" : "#2c2823" }}
                        >
                          <span className="absolute left-0 top-1/2 w-7 -translate-y-1/2 text-right font-mono text-caption tracking-[0.14em] text-ink-mute sm:static sm:top-auto sm:w-auto sm:translate-y-0">
                            {item.n}
                          </span>
                          <span className="border-b border-transparent font-serif text-[22px] font-light leading-none transition-colors group-hover:border-[rgba(44,40,35,0.3)] group-hover:text-terracotta sm:text-[24px]">
                            {item.label}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function CategoryControl({
  group,
  openGroup,
  setOpenGroup,
  isActive,
  className,
}: {
  group: { label: string; items: { href: string; label: string; n: string }[] };
  openGroup: string | null;
  setOpenGroup: (next: string | null) => void;
  isActive: (href: string) => boolean;
  className: string;
}) {
  const direct = group.items.length === 1 ? group.items[0] : null;
  if (direct) {
    return (
      <Link
        href={direct.href}
        className={className}
        style={{ color: isActive(direct.href) ? "#b56a4f" : "#2c2823" }}
      >
        {direct.label}
      </Link>
    );
  }

  const open = openGroup === group.label;
  const groupActive = group.items.some((item) => isActive(item.href));
  return (
    <button
      type="button"
      onClick={() => setOpenGroup(open ? null : group.label)}
      className={className}
      style={{ color: open || groupActive ? "#b56a4f" : "#2c2823" }}
      aria-expanded={open}
      aria-controls="studio-index-panel"
    >
      {group.label}
      <Chevron open={open} />
    </button>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 11 11"
      aria-hidden="true"
      className={`translate-y-px transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M1.5 3.75 L5.5 7.25 L9.5 3.75"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function LocaleToggle({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (next: Locale) => void;
}) {
  return (
    <div className="flex items-center gap-1 font-mono text-caption uppercase tracking-[0.16em] sm:tracking-[0.18em]">
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`border-0 bg-transparent px-1 py-2 touch-manipulation ${locale === "en" ? "text-terracotta" : "text-ink-mute"}`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <span className="text-ink-mute" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => setLocale("ko")}
        className={`border-0 bg-transparent px-1 py-2 touch-manipulation ${locale === "ko" ? "text-terracotta" : "text-ink-mute"}`}
        aria-pressed={locale === "ko"}
      >
        KR
      </button>
    </div>
  );
}
