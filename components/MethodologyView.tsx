"use client";

import { useState } from "react";
import Link from "next/link";
import { signals, blocks, type Block, type Signal } from "@/data/signals";
import { SignalsGraph } from "@/components/SignalsGraph";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Filter = Block | "all" | "fix";
type LedgerView = "grid" | "blocks" | "list";

const filterDefs: { key: Filter; label: string }[] = [
  { key: "all", label: "all" },
  { key: "fix", label: "top 3 fix" },
  { key: "A", label: "block A · entity" },
  { key: "B", label: "block B · on-page" },
  { key: "C", label: "block C · content" },
  { key: "D", label: "block D · off-site" },
];

export function MethodologyView() {
  const [selected, setSelected] = useState<Signal | null>(signals.find(s => s.fix) ?? null);
  const [filter, setFilter] = useState<Filter>("all");
  const [ledgerView, setLedgerView] = useState<LedgerView>("grid");

  const matches = (s: Signal) =>
    filter === "all" ? true : filter === "fix" ? s.fix : s.block === filter;

  const visible = signals.filter(matches);

  return (
    <>
      <section className="relative border-b-2 border-line overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-0 w-3 h-3 bg-pink" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-pink" />

        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-12 md:pb-16">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 font-mono text-[11px] font-bold tracking-widest uppercase anim-fade-in">
            <span className="w-2 h-2 bg-pink" />
            <span>methodology</span>
            <span className="text-fg-muted">/</span>
            <span>18 signals · 4 blocks</span>
            <span className="text-fg-muted">/</span>
            <span>rubric v1.2 · nov &apos;25</span>
          </div>

          <h1
            className="mt-10 md:mt-14 font-display leading-[0.86] tracking-tight anim-fade-in"
            style={{ fontSize: "clamp(64px, 11vw, 168px)", animationDelay: "180ms" }}
          >
            18 signals<span className="text-pink">.</span><br />
            3 do the lift<span className="text-pink">.</span>
          </h1>

          <h2
            className="mt-6 md:mt-8 font-display leading-[0.92] tracking-tight anim-fade-in max-w-[920px]"
            style={{ fontSize: "clamp(28px, 4.4vw, 60px)", animationDelay: "280ms" }}
          >
            The other 15 are necessary. These three decide whether an engine cites you.
          </h2>

          <div className="mt-12 grid grid-cols-12 gap-6 md:gap-10 anim-fade-in items-end" style={{ animationDelay: "380ms" }}>
            <div className="col-span-12 md:col-span-7">
              <p className="text-base md:text-lg leading-snug max-w-[600px]">
                Block A (entity, ×1.5) and Block D (off-site, ×1.4) carry the multipliers because they decide whether engines can identify you and trust you. Published rubric. Versioned. Same one we use on every engagement.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5 grid grid-cols-3 border-2 border-line">
              <div className="p-4 md:p-5 border-r-2 border-line">
                <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">18</div>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">signals</div>
              </div>
              <div className="p-4 md:p-5 border-r-2 border-line">
                <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">04</div>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">blocks</div>
              </div>
              <div className="p-4 md:p-5">
                <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">115</div>
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">raw max</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg sticky top-[60px] md:top-[68px] z-30">
        <div className="max-w-8xl mx-auto px-6 md:px-10 flex items-center overflow-x-auto no-scrollbar">
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mr-4 md:mr-6 flex-shrink-0">filter</span>
          <div className="flex items-center gap-1 py-3">
            {filterDefs.map((f) => {
              const count = signals.filter(s =>
                f.key === "all" ? true : f.key === "fix" ? s.fix : s.block === f.key
              ).length;
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`inline-flex items-center gap-2 px-3 md:px-3.5 py-1.5 md:py-2 border-2 transition-colors duration-150 font-mono text-[10px] font-bold tracking-widest uppercase whitespace-nowrap ${
                    active
                      ? "bg-fg border-fg text-bg"
                      : "border-line text-fg hover:bg-pink-wash"
                  }`}
                >
                  {f.label}
                  <span className={`font-display text-sm md:text-base leading-none tracking-tighter ${active ? "text-pink" : "text-fg-muted"}`}>
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 border-b-2 md:border-b-0 md:border-r-2 border-line relative">
            <div className="h-[440px] md:h-[720px] relative bg-bg">
              <SignalsGraph mode="full" onSelect={(s) => setSelected(s)} />
              <div className="absolute top-4 left-4 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted pointer-events-none">
                / signal map · click any node
              </div>
            </div>
          </div>
          <DetailPanel signal={selected} />
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg min-h-screen flex flex-col">
        <div className="max-w-8xl w-full mx-auto px-6 md:px-10 py-10 md:py-14 flex-1 flex flex-col">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6 md:mb-8">
            <div>
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">/ ledger</div>
              <div className="mt-2 font-display text-3xl md:text-5xl tracking-tight leading-[0.95]">
                all 18 signals<span className="text-pink">.</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mr-1">view</span>
              {(["grid", "blocks", "list"] as LedgerView[]).map((v) => {
                const active = ledgerView === v;
                return (
                  <button
                    key={v}
                    onClick={() => setLedgerView(v)}
                    className={`px-3 py-1.5 border-2 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors duration-150 ${
                      active ? "bg-fg border-fg text-bg" : "border-line text-fg hover:bg-pink-wash"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>

          {/* GRID view: 6 cols × 3 rows of compact cells. Filter dims, doesn't hide. */}
          {ledgerView === "grid" && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 border-2 border-line">
              {signals.map((s, i) => {
                const isLast = i === signals.length - 1;
                const isActive = selected?.id === s.id;
                const isDim = !matches(s);
                const colMod = i % 6;
                const rowMod = Math.floor(i / 6);
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelected(s)}
                    title={s.title}
                    className={`relative text-left p-3 md:p-4 transition-all duration-150 ${
                      isActive ? "bg-pink-wash" : "hover:bg-pink-wash/60"
                    } ${isDim ? "opacity-30" : "opacity-100"} ${
                      colMod < 5 && !isLast ? "border-r-2 border-line" : ""
                    } ${rowMod < 2 ? "border-b-2 border-line" : ""}`}
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-display text-2xl md:text-3xl tracking-tighter leading-none text-pink">
                        {String(s.num).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">
                        {s.block}
                      </span>
                    </div>
                    <div className="font-display text-sm md:text-base tracking-tight leading-[1.1]">
                      {s.title}
                    </div>
                    {s.fix && (
                      <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-pink" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* BLOCKS view: 4 columns, signals grouped by A/B/C/D. Filter dims rows + faded block headers. */}
          {ledgerView === "blocks" && (
            <div className="grid grid-cols-1 md:grid-cols-4 border-2 border-line">
              {blocks.map((b, bi) => {
                const blockSignals = signals.filter((s) => s.block === b.key);
                // A block header dims only when the active filter excludes the whole block
                const isBlockDimmed =
                  (filter !== "all" && filter !== "fix" && filter !== b.key) ||
                  (filter === "fix" && blockSignals.every((s) => !s.fix));
                return (
                  <div
                    key={b.key}
                    className={`${bi < blocks.length - 1 ? "border-b-2 md:border-b-0 md:border-r-2 border-line" : ""}`}
                  >
                    <div className={`px-3 py-3 border-b-2 border-line bg-pink-wash/40 transition-opacity ${isBlockDimmed ? "opacity-30" : "opacity-100"}`}>
                      <div className="flex items-baseline justify-between">
                        <div className="font-display text-2xl tracking-tighter leading-none">
                          <span className="text-pink">{b.key}</span>
                        </div>
                        <div className={`font-mono text-[9px] font-bold tracking-widest uppercase ${b.multiplier > 1 ? "text-pink" : "text-fg-muted"}`}>
                          × {b.multiplier.toFixed(1)}
                        </div>
                      </div>
                      <div className="mt-1 font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">
                        {b.label}
                      </div>
                    </div>
                    <div className="divide-y-2 divide-line">
                      {blockSignals.map((s) => {
                        const isActive = selected?.id === s.id;
                        const isDim = !matches(s);
                        return (
                          <button
                            key={s.id}
                            onClick={() => setSelected(s)}
                            className={`w-full text-left flex items-baseline gap-2 px-3 py-2 transition-all duration-150 ${
                              isActive ? "bg-pink-wash" : "hover:bg-pink-wash/60"
                            } ${isDim ? "opacity-30" : "opacity-100"}`}
                          >
                            <span className="font-display text-base text-pink tracking-tighter leading-none w-6 flex-shrink-0">
                              {String(s.num).padStart(2, "0")}
                            </span>
                            <span className="text-xs leading-tight flex-1">{s.title}</span>
                            {s.fix && <span className="w-1.5 h-1.5 bg-pink flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* LIST view: only matching signals, scrollable inside the viewport. */}
          {ledgerView === "list" && (
            <div className="border-2 border-line max-h-[calc(100vh-260px)] overflow-y-auto">
              {visible.map((s, i) => (
                <LedgerRow
                  key={s.id}
                  signal={s}
                  dimmed={false}
                  divider={i < visible.length - 1}
                  active={selected?.id === s.id}
                  onView={() => setSelected(s)}
                />
              ))}
              {visible.length === 0 && (
                <div className="px-5 py-8 font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted text-center">
                  no signals match this filter
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
            <span>showing {String(visible.length).padStart(2, "0")} / {signals.length} · click any signal to load it in the graph above</span>
            <span><span className="inline-block w-1.5 h-1.5 bg-pink mr-1.5 align-middle" />top-3 fix</span>
          </div>
        </div>
      </section>

      <section className="bg-fg text-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-7">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60">/ see your score</div>
              <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[0.95] tracking-tight">
                run the 18-signal scan on your site<span className="text-pink">.</span>
              </h2>
              <p className="mt-6 max-w-[440px] text-bg/80 leading-snug">
                Free, 90 seconds, PDF emailed. No call, no account. Same rubric we run on every paid engagement.
              </p>
            </div>
            <div className="col-span-12 md:col-span-5">
              <Link
                href="/#hero-audit"
                className="group flex items-center justify-between gap-4 bg-pink text-bg px-6 py-6 hover:bg-bg hover:text-fg transition-colors duration-200 border-2 border-pink hover:border-bg"
              >
                <span className="font-display text-3xl md:text-4xl tracking-tight">scan my site</span>
                <ArrowRight className="w-8 h-8 transition-transform duration-200 group-hover:translate-x-2" strokeWidth={2.5} />
              </Link>
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
      <div className="col-span-12 md:col-span-4 p-8 md:p-10 bg-bg flex items-center justify-center min-h-[300px] md:min-h-[720px]">
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
          block {signal.block}
        </span>
        {signal.fix && (
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg bg-pink px-2 py-1">
            top 3 fix
          </span>
        )}
        <span className="font-mono text-[10px] tracking-widest uppercase text-fg-muted ml-auto">
          signal {String(signal.num).padStart(2, "0")} / 18
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
          - the problem
        </div>
        <p className="text-sm md:text-base leading-snug">{signal.problem}</p>
      </div>

      <div className="mt-6 border-t-2 border-line pt-5">
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-pink mb-2">
          + the fix
        </div>
        <p className="text-sm md:text-base leading-snug">{signal.solution}</p>
      </div>
    </div>
  );
}

function LedgerRow({
  signal,
  dimmed,
  divider,
  active,
  onView,
}: {
  signal: Signal;
  dimmed: boolean;
  divider: boolean;
  active: boolean;
  onView: () => void;
}) {
  return (
    <button
      onClick={onView}
      className={`w-full text-left grid grid-cols-12 items-center gap-3 md:gap-6 px-5 md:px-6 py-5 md:py-6 transition-all duration-150 ${
        divider ? "border-b-2 border-line" : ""
      } ${active ? "bg-pink-wash" : "bg-bg hover:bg-pink-wash"} ${dimmed ? "opacity-30 hover:opacity-50" : ""}`}
    >
      <div className="col-span-2 md:col-span-1 font-display text-3xl md:text-4xl tracking-tighter leading-none text-pink">
        {String(signal.num).padStart(2, "0")}
      </div>
      <div className="col-span-7 md:col-span-3 font-display text-xl md:text-2xl tracking-tight leading-none">
        {signal.title}
      </div>
      <div className="col-span-3 md:col-span-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
        / block {signal.block}
      </div>
      <div className="hidden md:block col-span-5 text-sm leading-snug text-fg-muted">
        {signal.problem}
      </div>
      <div className="col-span-12 md:col-span-1 flex justify-end items-center">
        {signal.fix ? (
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase bg-pink text-bg px-2 py-1">fix</span>
        ) : (
          <ArrowUpRight className="w-5 h-5 text-fg-muted" strokeWidth={2.2} />
        )}
      </div>
    </button>
  );
}
