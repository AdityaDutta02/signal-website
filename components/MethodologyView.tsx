"use client";

import { useState } from "react";
import { signals, type Signal } from "@/data/signals";
import { SignalsGraph } from "@/components/SignalsGraph";
import { focusNavScan } from "@/components/AuditForm";
import { ArrowRight } from "@/components/icons";

type Step = {
  num: string;
  title: string;
  blurb: string;
  owner: string;
  checks: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Find the gaps",
    blurb: "We pull the same prompts you want to rank for and run them against ChatGPT, Perplexity, Gemini. We see what gets cited, what gets paraphrased, and what gets ignored. The gap is the brief.",
    owner: "aakif",
    checks: "live prompt eval · 3 engines",
  },
  {
    num: "02",
    title: "Diagnose the entity",
    blurb: "Engines cite things they think they understand. We audit how clearly your brand exists as a referable entity — schema, identity graph, cross-source presence. If the model isn't sure who you are, it won't name you.",
    owner: "aditya",
    checks: "schema · identity · grounding",
  },
  {
    num: "03",
    title: "Repair the crawl surface",
    blurb: "The boring layer that quietly tanks half the sites we touch. Bot policy, render path, headers, edge rules. We make sure what the model fetches matches what a buyer sees.",
    owner: "aditya",
    checks: "render · robots · headers",
  },
  {
    num: "04",
    title: "Rewrite the answer",
    blurb: "The actual sentences. Lead with the answer, not the setup. Define the thing in the first paragraph. Strip the bridge copy. The top of every key page becomes something a model can lift verbatim.",
    owner: "aakif",
    checks: "above-fold · answer-first · density",
  },
  {
    num: "05",
    title: "Re-scan & handoff",
    blurb: "Day 7 we run the same scan against the same URL with the same rubric. You see the before-and-after per engine. Everything we shipped is in your repo. We close out.",
    owner: "aakif + aditya",
    checks: "day-7 scan · per-engine delta",
  },
];

export function MethodologyView() {
  const [selected, setSelected] = useState<Signal | null>(
    signals.find((s) => s.fix) ?? null,
  );

  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section className="relative border-b-2 border-line overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-0 w-3 h-3 bg-pink" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-pink" />

        <div className="relative w-full max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 font-mono text-[11px] font-bold tracking-widest uppercase anim-fade-in">
            <span className="w-2 h-2 bg-pink" />
            <span>methodology</span>
            <span className="text-fg-muted">/</span>
            <span>5 steps · 6 days</span>
          </div>

          <h1
            className="mt-8 md:mt-12 font-display leading-[0.88] tracking-tight anim-fade-in"
            style={{ fontSize: "clamp(48px, 8vw, 116px)", animationDelay: "180ms" }}
          >
            How we fix your<br />
            AEO presence<span className="text-pink">.</span>
          </h1>

          <div className="mt-8 md:mt-10 max-w-[640px] anim-fade-in" style={{ animationDelay: "260ms" }}>
            <p className="text-base md:text-lg leading-snug text-fg-muted">
              We don&apos;t score sites &mdash; HubSpot does. What we do is the work that moves the score. Five steps. Same two operators on every one.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── 5 STEPS ─────────── */}
      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-12 md:py-20">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-8 md:mb-12">
            / the five steps
          </div>
          <ol className="border-2 border-line">
            {STEPS.map((s, i) => (
              <li
                key={s.num}
                className={`grid grid-cols-12 gap-4 md:gap-8 px-5 md:px-8 py-8 md:py-10 ${
                  i < STEPS.length - 1 ? "border-b-2 border-line" : ""
                } hover:bg-pink-wash/40 transition-colors`}
              >
                <div className="col-span-12 md:col-span-2">
                  <div className="font-display text-5xl md:text-7xl tracking-tighter leading-none text-pink">
                    {s.num}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <h3 className="font-display text-2xl md:text-4xl tracking-tight leading-[0.95]">
                    {s.title}<span className="text-pink">.</span>
                  </h3>
                  <p className="mt-3 md:mt-4 text-sm md:text-base leading-snug max-w-[560px]">
                    {s.blurb}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-3 flex flex-col gap-2 md:items-end font-mono text-[10px] font-bold tracking-widest uppercase">
                  <span className="text-fg-muted">{s.owner}</span>
                  <span className="text-fg">{s.checks}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─────────── GRAPH + PLAIN-ENGLISH OVERLAY ─────────── */}
      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6 md:mb-8">
            <div>
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">/ what we actually touch</div>
              <div className="mt-2 font-display text-3xl md:text-5xl tracking-tight leading-[0.95]">
                18 things, 4 surfaces<span className="text-pink">.</span>
              </div>
            </div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted max-w-[320px] text-right">
              click any node to see what goes wrong and what we ship
            </div>
          </div>

          <div className="grid grid-cols-12 border-2 border-line">
            <div className="col-span-12 md:col-span-8 border-b-2 md:border-b-0 md:border-r-2 border-line relative">
              <div className="h-[480px] md:h-[680px] relative bg-bg">
                <SignalsGraph mode="full" onSelect={(s) => setSelected(s)} />
              </div>
              <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-bg/95 border-2 border-line p-3 md:p-4 max-w-[280px] font-mono text-[10px] leading-relaxed">
                <div className="font-bold tracking-widest uppercase text-pink mb-2">how to read this</div>
                <div className="space-y-1.5 text-fg">
                  <div><span className="inline-block w-2 h-2 bg-pink mr-2 align-middle" />pink = top-3 fix (highest impact)</div>
                  <div><span className="inline-block w-2 h-2 border border-fg mr-2 align-middle" />white = signal we still check</div>
                  <div>lines = signals we ship together</div>
                  <div>four corners = entity, on-page, content, off-site</div>
                </div>
              </div>
            </div>
            <DetailPanel signal={selected} />
          </div>
        </div>
      </section>

      {/* ─────────── SCAN CTA ─────────── */}
      <section className="bg-fg text-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-7">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60">/ see your score</div>
              <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[0.95] tracking-tight">
                Run the scan on<br />your site<span className="text-pink">.</span>
              </h2>
              <p className="mt-6 max-w-[440px] text-bg/80 leading-snug">
                Drop your URL in the nav. Report appears on screen and arrives by email. No call, no account.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <button
                type="button"
                onClick={focusNavScan}
                className="group w-full flex items-center justify-between gap-4 bg-pink text-bg px-6 py-6 hover:bg-bg hover:text-fg transition-colors duration-200 border-2 border-pink hover:border-bg"
              >
                <span className="font-display text-3xl md:text-4xl tracking-tight">scan my site</span>
                <ArrowRight className="w-8 h-8 transition-transform duration-200 group-hover:translate-x-2" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DetailPanel({ signal }: { signal: Signal | null }) {
  if (!signal) {
    return (
      <div className="col-span-12 md:col-span-4 p-8 md:p-10 bg-bg flex items-center justify-center min-h-[300px] md:min-h-[680px]">
        <div className="text-center font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted leading-relaxed">
          click any node<br />
          to see what we ship
        </div>
      </div>
    );
  }

  const surface = signal.block === "A" ? "entity" : signal.block === "B" ? "on-page" : signal.block === "C" ? "content" : "off-site";

  return (
    <div key={signal.id} className="col-span-12 md:col-span-4 p-6 md:p-10 bg-pink-wash flex flex-col anim-fade-in">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-pink bg-bg px-2 py-1 border-2 border-pink">
          {surface}
        </span>
        {signal.fix && (
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg bg-pink px-2 py-1">
            top 3 fix
          </span>
        )}
        <span className="font-mono text-[10px] tracking-widest uppercase text-fg-muted ml-auto">
          {String(signal.num).padStart(2, "0")} / 18
        </span>
      </div>

      <h3 className="mt-6 font-display text-3xl md:text-4xl tracking-tight leading-[0.95]">
        {signal.title}<span className="text-pink">.</span>
      </h3>

      <div className="mt-6 border-t-2 border-line pt-4">
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-2">
          - what goes wrong
        </div>
        <p className="text-sm md:text-base leading-snug">{signal.problem}</p>
      </div>

      <div className="mt-4 border-t-2 border-line pt-4">
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-pink mb-2">
          + what we ship
        </div>
        <p className="text-sm md:text-base leading-snug">{signal.solution}</p>
      </div>
    </div>
  );
}
