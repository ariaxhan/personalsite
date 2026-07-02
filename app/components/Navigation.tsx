"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  n: string;
}

// The studio index. Each room is a tab; order mirrors the way the site has
// always read.
const navItems: NavItem[] = [
  { label: "Entrance", href: "/", n: "00" },
  { label: "About", href: "/about", n: "01" },
  { label: "Hackathons", href: "/hackathons", n: "02" },
  { label: "Systems", href: "/systems", n: "03" },
  { label: "Open Source", href: "/open-source", n: "04" },
  { label: "Writing", href: "/writing", n: "05" },
  { label: "Timeline", href: "/timeline", n: "06" },
  { label: "Contact", href: "/contact", n: "07" },
];

/**
 * Navigation: the studio masthead.
 *
 * A serif wordmark on the left, the index of rooms on the right. Fixed to the
 * top, transparent over the paper until you scroll, then it settles onto a thin
 * ivory shelf so the labels stay readable over any room. Collapses to a single
 * Index toggle on small screens.
 */
export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[200] transition-colors duration-500 ${
        scrolled
          ? "bg-studio-ivory/85 backdrop-blur-md border-b border-[rgba(44,40,35,0.1)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-5 sm:px-8 lg:h-auto lg:px-14 lg:py-4">
        {/* Wordmark */}
        <Link
          href="/"
          className="inline-flex min-h-10 items-center py-1 font-serif text-[19px] leading-normal tracking-[0.01em] text-ink transition-colors hover:text-terracotta"
        >
          Aria&nbsp;Han
        </Link>

        {/* Desktop index */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative font-mono text-[11px] uppercase tracking-[0.18em] transition-colors"
                style={{ color: active ? "#b56a4f" : "#8a8275" }}
              >
                <span className="transition-colors group-hover:text-ink">
                  {item.label}
                </span>
                <span
                  className="absolute -bottom-1 left-0 h-px bg-terracotta transition-all duration-300"
                  style={{ width: active ? "100%" : "0%" }}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="nav-index-toggle inline-flex h-10 min-h-0 appearance-none items-center justify-center border-0 bg-transparent p-0 font-mono text-[11px] leading-none uppercase tracking-[0.2em] text-ink-mute transition-colors hover:text-terracotta lg:hidden"
          aria-expanded={open}
          aria-label="Toggle studio index"
        >
          {open ? "Close" : "Index"}
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="border-t border-[rgba(44,40,35,0.12)] bg-studio-ivory/95 backdrop-blur-md lg:hidden">
          <nav className="grid grid-cols-2 gap-px px-5 py-4">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-baseline gap-2 py-2.5"
                  style={{ color: active ? "#b56a4f" : "#5c564c" }}
                >
                  <span className="font-mono text-[10px] text-ink-mute">{item.n}</span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.14em]">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
