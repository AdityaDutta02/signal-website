"use client";

import { useEffect, useState } from "react";
import { SlotBadge } from "./SlotBadge";

// Hides the nav-slot badge while the Hero "[data-hero-sentinel]" element
// is in the viewport (so the Hero's own slot badge carries the message).
// Slides the nav badge up into view once the user scrolls past the hero.
// On pages without a hero sentinel (any non-home route), the nav badge
// is visible by default.
export function NavSlotReveal({ variant = "nav" }: { variant?: "nav" | "nav-mobile" }) {
  const [revealed, setRevealed] = useState(true);

  useEffect(() => {
    const sentinel = document.querySelector<HTMLElement>("[data-hero-sentinel]");
    if (!sentinel) {
      setRevealed(true);
      return;
    }
    setRevealed(false);
    const obs = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setRevealed(!entry.isIntersecting);
      },
      { rootMargin: "0px 0px -40% 0px", threshold: 0 },
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        revealed
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
      aria-hidden={!revealed}
    >
      <SlotBadge variant={variant} />
    </div>
  );
}
