"use client";

import { useState } from "react";

type Step = { num: string; title: string; body: string; time: string };

const steps: Step[] = [
  { num: "01", title: "first call", time: "0.5 days", body: "Thirty minutes. We pull your site live in front of ChatGPT and Perplexity and you watch what they actually say about you." },
  { num: "02", title: "gap analysis", time: "1.5 days", body: "We score 18 signals against your URLs, score your top 3 competitors the same way, and write you the delta in plain language." },
  { num: "03", title: "build the fix", time: "3 days", body: "Schema, render, robots, content, meta - shipped as a PR against your repo or staging branch. Reviewed line by line." },
  { num: "04", title: "deploy + prove", time: "1 day", body: "We merge, re-crawl, final scan across all engines on day 7, and hand off the before/after report. If +15 isn't cleared, we keep building - on us." },
];

export function Process() {
  return (
    <section className="border-b-2 border-line">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-8">
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">/ 02 · how it goes</div>
            <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9] tracking-tight">
              four steps<span className="text-pink">.</span>
              <br />six days<span className="text-pink">.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:items-end">
            <p className="font-mono text-[11px] tracking-widest uppercase text-fg-muted max-w-[280px]">
              No retainer. No &quot;discovery phase&quot;. You see real diff on day three.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 border-2 border-line">
          {steps.map((s, i) => (
            <ProcessStep key={s.num} step={s} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, isLast }: { step: Step; isLast: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`relative p-6 md:p-8 ${hover ? "bg-pink-wash" : "bg-bg"} ${isLast ? "" : "border-b-2 md:border-b-0 md:border-r-2 border-line"}`}
      style={{ transition: "background-color 200ms ease-out" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`font-display leading-none tracking-tighter ${hover ? "text-pink" : "text-fg"}`}
        style={{ fontSize: "84px", transition: "color 200ms ease-out" }}
      >
        {step.num}
      </div>
      <div className="mt-6 flex items-center gap-3 flex-wrap">
        <div className="font-display text-2xl md:text-3xl tracking-tight">{step.title}</div>
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-pink border border-pink px-2 py-0.5">
          {step.time}
        </div>
      </div>
      <p className="mt-4 text-sm leading-snug text-fg">{step.body}</p>
    </div>
  );
}
