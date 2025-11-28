"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  shortLabel: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", shortLabel: "00" },
  { label: "Evidence", href: "/evidence", shortLabel: "01" },
  { label: "Systems", href: "/systems", shortLabel: "02" },
  { label: "Open Source", href: "/open-source", shortLabel: "03" },
  { label: "Writing", href: "/writing", shortLabel: "04" },
  { label: "Timeline", href: "/timeline", shortLabel: "05" },
  { label: "Contact", href: "/contact", shortLabel: "06" },
  { label: "VN", href: "/vn", shortLabel: "∎" },
];

/**
 * Navigation: Site-wide navigation with punch-card aesthetic
 * 
 * Fixed position, shows current location in the information structure.
 * Minimal footprint, maximum clarity.
 */
export default function Navigation() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Find current page
  const currentPage = navItems.find((item) => item.href === pathname) || navItems[0];

  if (!mounted) return null;

  return (
    <>
      {/* Desktop Navigation - Fixed sidebar */}
      <nav className="fixed left-0 top-0 bottom-0 z-50 hidden lg:flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="ml-6 space-y-1"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isVN = item.href === "/vn";

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group flex items-center gap-3 py-2 px-3 rounded
                  transition-all duration-300 relative
                  ${isActive 
                    ? "bg-cognition/10 text-cognition" 
                    : "text-neutral-600 hover:text-neutral-300 hover:bg-glass-white"
                  }
                `}
              >
                {/* Index number */}
                <span className={`
                  font-mono text-[10px] w-4
                  ${isActive ? "text-cognition" : "text-neutral-700"}
                  ${isVN ? "text-emergence" : ""}
                `}>
                  {item.shortLabel}
                </span>

                {/* Label */}
                <span className={`
                  font-mono text-xs tracking-wide
                  transition-all duration-300
                  ${isActive ? "translate-x-1" : "group-hover:translate-x-1"}
                `}>
                  {item.label}
                </span>

                {/* Active indicator line */}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-cognition rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </motion.div>

        {/* Bottom indicator - current coordinates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-8 left-6"
        >
          <p className="text-[10px] font-mono text-neutral-700">
            LOC: {currentPage.shortLabel}
          </p>
        </motion.div>
      </nav>

      {/* Mobile Navigation - Top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-substrate-void/95 backdrop-blur-lg border-b border-glass-border"
        >
          {/* Collapsed state - just show current page */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-6 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-cognition">
                {currentPage.shortLabel}
              </span>
              <span className="font-mono text-sm text-neutral-300">
                {currentPage.label}
              </span>
            </div>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-neutral-600"
            >
              ▼
            </motion.span>
          </button>

          {/* Expanded navigation */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-b border-glass-border"
              >
                <div className="grid grid-cols-4 gap-1 p-4">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const isVN = item.href === "/vn";

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsExpanded(false)}
                        className={`
                          flex flex-col items-center gap-1 py-3 px-2 rounded
                          transition-all duration-300
                          ${isActive 
                            ? "bg-cognition/10 text-cognition" 
                            : "text-neutral-500 hover:text-neutral-300"
                          }
                          ${isVN ? "text-emergence" : ""}
                        `}
                      >
                        <span className="font-mono text-[10px]">
                          {item.shortLabel}
                        </span>
                        <span className="font-mono text-[10px] truncate max-w-full">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>
    </>
  );
}

