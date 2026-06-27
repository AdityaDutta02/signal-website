"use client";

import { useEffect, useState } from "react";

/**
 * SEO + LLM-safe rotating word.
 *
 * Renders every word in the static HTML so crawlers, screen readers, and
 * citation bots see all of them. CSS toggles which one is the "active" one
 * (display + opacity + transform); the inactive words are absolutely positioned
 * inside an overflow:hidden slot sized by the widest word.
 *
 * The slot height is fixed to 1em so the line never reflows.
 * prefers-reduced-motion: stays on the first word.
 */
export function WordRotator({
  words,
  intervalMs = 2500,
}: {
  words: string[];
  intervalMs?: number;
}) {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (words.length < 2) return;

    const id = setInterval(() => {
      setActive((cur) => {
        setLeaving(cur);
        return (cur + 1) % words.length;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, words.length]);

  // Pick the widest word for the sizer so the slot never narrows mid-transition.
  const widest = words.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <span className="signal-rotator">
      <span className="signal-rotator-sizer" aria-hidden="true">
        {widest}
      </span>
      {words.map((w, i) => (
        <span
          key={w}
          data-i={i}
          className={[
            "signal-rotator-word",
            i === active ? "is-active" : "",
            i === leaving ? "is-leaving" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {w}
        </span>
      ))}
    </span>
  );
}
