"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SlotBadge } from "./SlotBadge";

// Nav-slot reveal logic:
// • On the home page the Hero owns the slot badge. Nav slot stays hidden
//   while the hero is in the viewport, slides up into the nav once the
//   user scrolls past it.
// • On every other route there is no hero, so the nav slot is visible
//   immediately.
// • Uses [data-hero-sentinel] on the Hero element. To avoid the React
//   mount-order race (Nav can render before Hero), we defer the
//   IntersectionObserver setup with rAF + a small retry.
export function NavSlotReveal({ variant = "nav" }: { variant?: "nav" | "nav-mobile" }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [revealed, setRevealed] = useState(!isHome);

  useEffect(() => {
    // Off-home: always visible.
    if (!isHome) {
      setRevealed(true);
      return;
    }

    let obs: IntersectionObserver | null = null;
    let raf1 = 0;
    let raf2 = 0;
    let attempts = 0;

    const tryAttach = () => {
      const sentinel = document.querySelector<HTMLElement>("[data-hero-sentinel]");
      if (!sentinel) {
        // Sentinel not in the DOM yet (Hero hasn't mounted). Retry on next
        // frame up to ~15 frames (~250ms). If still not there, give up and
        // reveal.
        attempts += 1;
        if (attempts > 15) {
          setRevealed(true);
          return;
        }
        raf2 = window.requestAnimationFrame(tryAttach);
        return;
      }

      // Hero exists. Assume in-view at top-of-page → hide.
      setRevealed(false);
      obs = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (!entry) return;
          setRevealed(!entry.isIntersecting);
        },
        { rootMargin: "0px 0px -30% 0px", threshold: 0 },
      );
      obs.observe(sentinel);
    };

    // Defer one frame so Hero gets to mount.
    raf1 = window.requestAnimationFrame(tryAttach);

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      obs?.disconnect();
    };
  }, [isHome, pathname]);

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
