"use client";

import { useEffect, useRef } from "react";

/**
 * Three engine logos floating above the hero H1.
 *
 * - Each logo has its own idle CSS bob (independent timing).
 * - Cursor parallax with sticky lerp catch-up via requestAnimationFrame.
 * - prefers-reduced-motion: no parallax, no bob.
 * - SEO/LLM-irrelevant decoration → aria-hidden.
 */
export function EngineLogosFloat() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const host = stage.parentElement; // the hero section
    if (!host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const items = Array.from(stage.querySelectorAll<HTMLElement>("[data-logo]"));
    const state = items.map((el) => ({
      el,
      tx: 0,
      ty: 0,
      x: 0,
      y: 0,
      depth: Number(el.dataset.parallax ?? "1"),
    }));

    function onMove(e: PointerEvent) {
      const r = host!.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / r.width; // -0.5..0.5
      const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
      const max = 26;
      for (const s of state) {
        s.tx = nx * max * s.depth;
        s.ty = ny * max * s.depth;
      }
    }

    function onLeave() {
      for (const s of state) {
        s.tx = 0;
        s.ty = 0;
      }
      for (const s of state) {
        s.el.style.animationPlayState = "running";
      }
    }

    function onEnter() {
      for (const s of state) {
        s.el.style.animationPlayState = "paused";
      }
    }

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerenter", onEnter);

    let raf = 0;
    const tick = () => {
      for (const s of state) {
        s.x += (s.tx - s.x) * 0.08;
        s.y += (s.ty - s.y) * 0.08;
        s.el.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-[1] [&_[data-logo]]:will-change-transform"
    >
      <div
        data-logo
        data-parallax="1.0"
        className="absolute top-[6%] left-[5%] w-[72px] h-[72px] md:w-[96px] md:h-[96px] motion-safe:animate-[bob1_6.5s_ease-in-out_infinite]"
      >
        <ChatGPTSvg />
      </div>
      <div
        data-logo
        data-parallax="0.7"
        className="absolute top-[3%] left-[44%] w-[64px] h-[64px] md:w-[88px] md:h-[88px] motion-safe:animate-[bob2_7.2s_ease-in-out_infinite]"
      >
        <GeminiSvg />
      </div>
      <div
        data-logo
        data-parallax="1.2"
        className="absolute top-[9%] right-[6%] w-[68px] h-[68px] md:w-[92px] md:h-[92px] motion-safe:animate-[bob3_6.8s_ease-in-out_infinite]"
      >
        <PerplexitySvg />
      </div>
    </div>
  );
}

/* Inline SVGs so file:// + Lambda + first paint all render reliably. */

function ChatGPTSvg() {
  return (
    <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        fill="currentColor"
        d="M297.06 130.97a80.54 80.54 0 0 0-6.91-66.23 81.5 81.5 0 0 0-87.8-39.07A80.6 80.6 0 0 0 141.1 0a81.53 81.53 0 0 0-77.8 56.27A80.6 80.6 0 0 0 22.43 91.4a81.54 81.54 0 0 0 10.04 95.59A80.54 80.54 0 0 0 39.39 253.3a81.5 81.5 0 0 0 87.8 39.07 80.6 80.6 0 0 0 61.24 25.67 81.53 81.53 0 0 0 77.83-56.3 80.6 80.6 0 0 0 40.86-35.13 81.54 81.54 0 0 0-10.05-95.6zm-121.06 169.2a60.4 60.4 0 0 1-38.79-14.03c.49-.27 1.35-.74 1.91-1.09l64.39-37.18a10.45 10.45 0 0 0 5.29-9.15v-90.8l27.22 15.72a.97.97 0 0 1 .53.74v75.13a60.55 60.55 0 0 1-60.55 60.66zM45.85 244.27a60.39 60.39 0 0 1-7.22-40.6c.48.29 1.32.8 1.91 1.13l64.39 37.18a10.47 10.47 0 0 0 10.58 0l78.6-45.38v31.43a.97.97 0 0 1-.39.83l-65.06 37.57a60.61 60.61 0 0 1-82.81-22.17zM28.91 104.39a60.5 60.5 0 0 1 31.6-26.61v76.5a10.45 10.45 0 0 0 5.28 9.15l78.6 45.36-27.22 15.72a.97.97 0 0 1-.91.08l-65.16-37.62a60.61 60.61 0 0 1-22.21-82.59zm223.79 51.97-78.6-45.39 27.22-15.71a.97.97 0 0 1 .91-.08l65.18 37.59a60.56 60.56 0 0 1-9.35 109.34v-76.5a10.43 10.43 0 0 0-5.36-9.25zm27.1-40.78c-.48-.3-1.32-.8-1.91-1.13l-64.39-37.18a10.48 10.48 0 0 0-10.58 0l-78.6 45.38V91.22a.97.97 0 0 1 .39-.83l65.18-37.59A60.55 60.55 0 0 1 279.81 115.6zM167.4 158.83l-27.22-15.72v-30.5a.97.97 0 0 1 .39-.83l65.06-37.57a60.65 60.65 0 0 1 91.71 47.92c-.48-.27-1.35-.74-1.91-1.09l-64.39-37.18a10.46 10.46 0 0 0-10.58 0l-78.6 45.38V160.3l27.22 15.72a.97.97 0 0 1 .39.83v62.78c0 .56-.27 1.05-.71 1.32l-65.18 37.6a60.65 60.65 0 0 1-91.74-47.93c.48.3 1.34.8 1.91 1.13l64.39 37.18a10.5 10.5 0 0 0 10.58 0l78.6-45.38v-30.5z"
      />
    </svg>
  );
}

function GeminiSvg() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="signal-gemini-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4285F4" />
          <stop offset="0.5" stopColor="#9B72CB" />
          <stop offset="1" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path
        fill="url(#signal-gemini-grad)"
        d="M24 1c0 12.703 10.297 23 23 23-12.703 0-23 10.297-23 23 0-12.703-10.297-23-23-23 12.703 0 23-10.297 23-23z"
      />
    </svg>
  );
}

function PerplexitySvg() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="#22B8CD">
      <path d="M12 2L2 8.5v7L12 22l10-6.5v-7L12 2zm0 2.45L19.55 9 12 13.55 4.45 9 12 4.45zM4 10.84l7 4.21v5.32l-7-4.5v-5.03zm9 9.53v-5.32l7-4.21v5.03l-7 4.5z" />
    </svg>
  );
}
