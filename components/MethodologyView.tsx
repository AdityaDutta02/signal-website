"use client";

import { useState } from "react";
import { signals, type Signal } from "@/data/signals";
import { SignalsGraph } from "@/components/SignalsGraph";
import { AuditModal, openAuditModal } from "@/components/AuditModal";
import { ArrowRight } from "lucide-react";

export function MethodologyView() {
  const [selected, setSelected] = useState<Signal | null>(signals.find(s => s.fix) ?? null);

  return (
    <>
      {/* ─────────── HERO · 1vh ─────────── */}
      <section className="relative border-b-2 border-line overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-0 w-3 h-3 bg-pink" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-pink" />

        <div className="relative w-full max-w-8xl mx-auto px-6 md:px-10 py-16">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 font-mono text-[11px] font-bold tracking-widest uppercase anim-fade-in">
            <span className="w-2 h-2 bg-pink" />
            <span>methodology</span>
            <span className="text-fg-muted">/</span>
            <span>18 checks · 4 categories</span>
            <span className="text-fg-muted">/</span>
            <span>rubric v1.2 · nov &apos;25</span>
          </div>

          <h1
            className="mt-10 md:mt-14 font-display leading-[0.88] tracking-tight anim-fade-in"
            style={{ fontSize: "clamp(56px, 9vw, 128px)", animationDelay: "180ms" }}
          >
            How we score a site<span className="text-pink">.</span>
          </h1>

          <div className="mt-10 md:mt-12 grid grid-cols-12 gap-6 md:gap-10 anim-fade-in items-end" style={{ animationDelay: "280ms" }}>
            <div className="col-span-12 md:col-span-7">
              <p className="text-base md:text-lg leading-snug max-w-[560px] text-fg-muted">
                Eighteen things we check across four categories &mdash; schema, on-page, content, off-site. The graph below shows the lot. Click any to see what goes wrong and what we ship.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5 grid grid-cols-3 border-2 border-line">
              <div className="p-4 md:p-5 border-r-2 border-line">
                <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">18</div>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">checks</div>
              </div>
              <div className="p-4 md:p-5 border-r-2 border-line">
                <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">04</div>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">categories</div>
              </div>
              <div className="p-4 md:p-5">
                <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">412</div>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">sites scanned</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── GRAPH + DETAIL PANEL ─────────── */}
      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 border-b-2 md:border-b-0 md:border-r-2 border-line relative">
            <div className="h-[560px] md:h-[820px] relative bg-bg">
              <SignalsGraph mode="full" onSelect={(s) => setSelected(s)} />
              <div className="absolute top-4 left-4 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted pointer-events-none">
                / signal map · click any node
              </div>
            </div>
          </div>
          <DetailPanel signal={selected} />
        </div>
      </section>

      {/* ─────────── LEDGER (GRID ONLY · 1vh) ─────────── */}
      <section className="border-b-2 border-line bg-bg min-h-screen flex flex-col">
        <div className="max-w-8xl w-full mx-auto px-6 md:px-10 py-10 md:py-14 flex-1 flex flex-col">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6 md:mb-8">
            <div>
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">/ ledger</div>
              <div className="mt-2 font-display text-3xl md:text-5xl tracking-tight leading-[0.95]">
                all 18 signals<span className="text-pink">.</span>
              </div>
            </div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
              click any to load it in the graph above
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 grid-rows-6 sm:grid-rows-5 md:grid-rows-3 border-2 border-line flex-1">
            {signals.map((s, i) => {
              const isLast = i === signals.length - 1;
              const isActive = selected?.id === s.id;
              const colMod = i % 6;
              const rowMod = Math.floor(i / 6);
              return (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  title={s.title}
                  className={`relative text-left flex flex-col justify-between p-4 md:p-5 transition-colors duration-150 ${
                    isActive ? "bg-pink-wash" : "hover:bg-pink-wash/60"
                  } ${colMod < 5 && !isLast ? "border-r-2 border-line" : ""} ${
                    rowMod < 2 ? "border-b-2 border-line" : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-2xl md:text-4xl tracking-tighter leading-none text-pink">
                      {String(s.num).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">
                      {s.block}
                    </span>
                  </div>
                  <div className="font-display text-sm md:text-lg tracking-tight leading-[1.1] mt-3">
                    {s.title}
                  </div>
                  {s.fix && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-pink" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
            <span>18 / 18 · grouped left-to-right by category (A → B → C → D)</span>
            <span><span className="inline-block w-1.5 h-1.5 bg-pink mr-1.5 align-middle" />top-3 fix</span>
          </div>
        </div>
      </section>

      {/* ─────────── SCAN CTA ─────────── */}
      <section className="bg-fg text-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-7">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60">/ see your score</div>
              <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[0.95] tracking-tight">
                Run the 18-check scan on your site<span className="text-pink">.</span>
              </h2>
              <p className="mt-6 max-w-[440px] text-bg/80 leading-snug">
                Free. 90 seconds. PDF emailed. No call, no account.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <button
                type="button"
                onClick={openAuditModal}
                className="group w-full flex items-center justify-between gap-4 bg-pink text-bg px-6 py-6 hover:bg-bg hover:text-fg transition-colors duration-200 border-2 border-pink hover:border-bg"
              >
                <span className="font-display text-3xl md:text-4xl tracking-tight">scan my site</span>
                <ArrowRight className="w-8 h-8 transition-transform duration-200 group-hover:translate-x-2" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <AuditModal />
    </>
  );
}

function DetailPanel({ signal }: { signal: Signal | null }) {
  if (!signal) {
    return (
      <div className="col-span-12 md:col-span-4 p-8 md:p-10 bg-bg flex items-center justify-center min-h-[300px] md:min-h-[820px]">
        <div className="text-center font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted leading-relaxed">
          click any node<br />
          to see the<br />
          full signal
        </div>
      </div>
    );
  }

  return (
    <div key={signal.id} className="col-span-12 md:col-span-4 p-8 md:p-10 bg-pink-wash flex flex-col anim-fade-in">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-pink bg-bg px-2 py-1 border-2 border-pink">
          category {signal.block}
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

      <div className="mt-6 font-display leading-[0.78] tracking-tighter text-pink" style={{ fontSize: "clamp(110px, 14vw, 180px)" }}>
        {String(signal.num).padStart(2, "0")}
      </div>

      <h3 className="mt-2 font-display text-3xl md:text-4xl tracking-tight leading-[0.95]">
        {signal.title}<span className="text-pink">.</span>
      </h3>

      <div className="mt-8 border-t-2 border-line pt-5">
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-2">
          - what goes wrong
        </div>
        <p className="text-sm md:text-base leading-snug">{signal.problem}</p>
      </div>

      <div className="mt-6 border-t-2 border-line pt-5">
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-pink mb-2">
          + what we ship
        </div>
        <p className="text-sm md:text-base leading-snug">{signal.solution}</p>
      </div>
    </div>
  );
}
