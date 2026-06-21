"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "@/components/icons";

const OPEN_EVENT = "signal:open-book-call";

export function openBookCallModal(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

// Cal.com link, env-var driven. Placeholder until Aditya wires the real link.
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "signal/intro";
const CAL_URL = `https://cal.com/${CAL_LINK}?embed=true&theme=light`;

export function BookCallModal() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8 anim-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-call-title"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-fg/55 cursor-default"
      />
      <div className="relative w-full max-w-[820px] h-[80vh] bg-bg border-2 border-line shadow-[8px_8px_0_0_var(--pink)] anim-scale-in flex flex-col">
        <div className="flex items-center justify-between border-b-2 border-line px-5 md:px-7 py-3 flex-shrink-0">
          <div id="book-call-title" className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-pink anim-blink" />
            <span>book a call</span>
            <span className="text-fg-muted">·</span>
            <span className="text-fg-muted">15 min · async first</span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="w-7 h-7 grid place-items-center border-2 border-line hover:bg-pink-wash transition-colors"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
        <iframe
          src={CAL_URL}
          title="Book a call with Signal"
          className="flex-1 w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
}
