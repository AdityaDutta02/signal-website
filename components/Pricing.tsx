"use client";

import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";

export function Pricing() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const price = useCountUp(2490, 1200, inView);

  return (
    <section ref={ref} className="border-b-2 border-line bg-fg text-bg overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60 mb-8 md:mb-12">
          / 04 · pricing · one flat fee
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 md:col-span-7">
            <div
              className="font-display leading-[0.78] tracking-tighter"
              style={{ fontSize: "clamp(100px, 22vw, 280px)" }}
            >
              <span className="text-pink">$</span>{price.toLocaleString()}
            </div>
            <div className="mt-2 font-mono text-[11px] font-bold tracking-widest uppercase text-bg/80">
              flat · all-in · per project · no retainer · no upsell
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 pb-2">
            <div className="grid grid-cols-3 border-2 border-bg/40">
              <div className="p-4 md:p-5 border-r-2 border-bg/40">
                <div className="font-display text-3xl md:text-4xl leading-none tracking-tighter">06</div>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg/70 mt-3">days</div>
              </div>
              <div className="p-4 md:p-5 border-r-2 border-bg/40">
                <div className="font-display text-3xl md:text-4xl leading-none tracking-tighter">
                  +15<span className="text-pink">.</span>
                </div>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg/70 mt-3">ship floor</div>
              </div>
              <div className="p-4 md:p-5">
                <div className="font-display text-3xl md:text-4xl leading-none tracking-tighter">
                  1<span className="text-pink">×</span>
                </div>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg/70 mt-3">revision</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-12 gap-0 border-t-2 border-bg/30">
          <div className="col-span-12 md:col-span-7 pt-8 md:pr-10 md:border-r-2 border-bg/30">
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-pink mb-5">+ what you get</div>
            <ul className="divide-y divide-bg/15 border-y-2 border-bg/30">
              {[
                ["01", "18-signal AEO audit", "live site + 3 competitors"],
                ["02", "schema + render path", "json-ld, ssr, hydration"],
                ["03", "robots.txt + llms.txt", "shipped to your repo"],
                ["04", "extractable rewrite", "top 12 pages · pr-ready"],
                ["05", "cross-engine final scan", "chatgpt · perplexity · gemini"],
                ["06", "one revision round", "async · 7-day window"],
              ].map(([n, title, sub]) => (
                <li key={n} className="flex items-baseline gap-4 md:gap-6 py-3.5">
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-pink w-6 flex-shrink-0">{n}</span>
                  <span className="font-display text-lg md:text-xl tracking-tight text-bg leading-tight flex-1">{title}</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-bg/55 text-right">{sub}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-5 md:ml-10 bg-bg text-fg p-6 md:p-8 border-2 border-bg">
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-5">- what you don&apos;t</div>
            <ul className="divide-y divide-fg/15 border-y-2 border-fg/30">
              {[
                "no retainer",
                "no monthly content",
                "no seo / backlinks / outreach",
                "no kickoff workshop",
                "no junior layer",
              ].map((item) => (
                <li key={item} className="flex items-baseline gap-4 py-3.5">
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg/50 w-6 flex-shrink-0">×</span>
                  <span className="font-display text-lg md:text-xl tracking-tight text-fg leading-tight line-through decoration-fg/60 decoration-[1.5px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
