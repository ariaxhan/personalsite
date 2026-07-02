"use client";

import { ReactNode, useEffect } from "react";

/**
 * Modal: a sheet of paper lifted off the desk.
 *
 * Dim the room, float a warm panel, fade it up like a page being set down.
 * Closes on backdrop click, on the close control, and on Escape. Locks body
 * scroll while open so the page underneath stays put.
 */
export default function Modal({
  open,
  onClose,
  children,
  maxWidth = 640,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-10"
      style={{ background: "rgba(40,35,28,.6)", backdropFilter: "blur(2px)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full overflow-auto bg-studio-paper p-5 pt-12 shadow-modal animate-fade-up sm:p-12"
        style={{ maxWidth, maxHeight: "90svh" }}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 cursor-pointer border-0 bg-transparent font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute transition-colors hover:text-terracotta sm:right-6 sm:top-6"
        >
          close &times;
        </button>
        {children}
      </div>
    </div>
  );
}
