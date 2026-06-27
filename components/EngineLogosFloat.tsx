"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Three engine logos clustered above the hero H1.
 *
 * - Each logo has its own idle CSS bob (independent timing). Inline animation
 *   so Tailwind's JIT cannot drop the keyframe class as unused.
 * - Cursor parallax with sticky lerp catch-up via requestAnimationFrame.
 *   While the pointer is inside the hero, the JS overrides the transform; on
 *   pointer leave the CSS bob takes over again.
 * - prefers-reduced-motion: no parallax, CSS animation defers to OS setting.
 * - Logos load via next/image with priority — they sit above the fold.
 */
export function EngineLogosFloat() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const host = stage.parentElement;
    if (!host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
      const nx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
      const max = 28;
      for (const s of state) {
        s.tx = nx * max * s.depth;
        s.ty = ny * max * s.depth;
      }
    }

    function onLeave() {
      for (const s of state) {
        s.tx = 0;
        s.ty = 0;
        s.el.style.animationPlayState = "running";
      }
    }
    function onEnter() {
      for (const s of state) s.el.style.animationPlayState = "paused";
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

  // Clustered above the H1, tight horizontal arc near the top center.
  const items = [
    { src: "/logos/chatgpt.png",    alt: "ChatGPT",    parallax: 1.0, anim: "bob1 5.6s ease-in-out infinite",       style: { top: "8%",  left: "30%" } },
    { src: "/logos/gemini.png",     alt: "Gemini",     parallax: 0.7, anim: "bob2 6.4s ease-in-out infinite",       style: { top: "3%",  left: "45%" } },
    { src: "/logos/perplexity.svg", alt: "Perplexity", parallax: 1.2, anim: "bob3 6.0s ease-in-out infinite 0.4s",  style: { top: "10%", left: "60%" } },
  ];

  return (
    <div ref={stageRef} aria-hidden="true" className="absolute inset-0 pointer-events-none z-[1] overflow-visible">
      {items.map((it) => (
        <div
          key={it.src}
          data-logo
          data-parallax={it.parallax}
          className="absolute will-change-transform"
          style={{ ...it.style, width: 72, height: 72, animation: it.anim }}
        >
          <Image
            src={it.src}
            alt={it.alt}
            width={72}
            height={72}
            priority
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
