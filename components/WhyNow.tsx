"use client";

import { useCountUp } from "../hooks/useCountUp";
import { useInView } from "../hooks/useInView";

export function WhyNow() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const v51 = useCountUp(51, 1600, inView);
  const v29 = useCountUp(29, 1600, inView);

  return (
    <section ref={ref} className="border-b-2 border-line bg-bg relative overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-8 md:mb-12">
          / 01 · the shift
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 md:col-span-7 relative">
            <div
              className="font-display text-pink leading-[0.78] tracking-tighter select-none"
              style={{ fontSize: "clamp(180px, 34vw, 440px)" }}
            >
              {v51}%
            </div>
            <span className="absolute bottom-3 left-1 md:left-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted italic">
              — g2, april 2026
            </span>
          </div>

          <div className="col-span-12 md:col-span-5 pb-2 md:pb-6">
            <h2 className="font-display text-3xl md:text-5xl leading-[0.95] tracking-tight">
              of b2b buyers now start their software research in chatgpt<span className="text-pink">.</span>
            </h2>
            <p className="mt-6 text-base md:text-lg leading-snug max-w-[460px]">
              Up from {v29}% twelve months earlier. They get a synthesised answer with three or four named sources and rarely click through. If your site isn't readable by ChatGPT, Perplexity, and Gemini, you're invisible at the moment buyers decide.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t-2 border-line pt-6">
              <div>
                <div className="font-display text-2xl md:text-3xl tracking-tighter leading-none">
                  <span className="text-fg-muted">29</span>
                </div>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-2">apr '25 · %</div>
              </div>
              <div>
                <div className="font-display text-2xl md:text-3xl tracking-tighter leading-none text-pink">
                  51
                </div>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-2">apr '26 · %</div>
              </div>
              <div>
                <div className="font-display text-2xl md:text-3xl tracking-tighter leading-none">
                  +22
                </div>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-2">12-mo shift</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
