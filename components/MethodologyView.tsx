"use client";

import { useState } from "react";
import Link from "next/link";
import { signals, blocks, type Block, type Signal } from "@/data/signals";
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronUp, Download } from "lucide-react";

type Filter = Block | "all" | "fix";
type RubricFilter = Block | "all";

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
  const [rubricFilter, setRubricFilter] = useState<RubricFilter>("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(prev => (prev === id ? null : id));
  };

  const rubricVisible = rubricFilter === "all"
    ? signals
    : signals.filter(s => s.block === rubricFilter);

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
            className="mt-10 md:mt-14 font-display leading-[0.88] tracking-tight anim-fade-in"
            style={{ fontSize: "clamp(56px, 10vw, 144px)", animationDelay: "180ms" }}
          >
            every signal is<br />
            connected<span className="text-pink">.</span><br />
            fix one - three<br />
            others light up<span className="text-pink">.</span>
          </h1>

          <div className="mt-12 grid grid-cols-12 gap-6 md:gap-10 anim-fade-in items-end" style={{ animationDelay: "340ms" }}>
            <div className="col-span-12 md:col-span-7">
              <p className="text-base md:text-lg leading-snug max-w-[600px]">
                Eighteen signals across four blocks - entity, on-page, content, off-site. Block A and D carry multipliers (1.5× and 1.4×) because they move citation share the hardest. Raw max 115, normalised to /100.
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
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-12">
            <div>
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">/ ledger</div>
              <div className="mt-2 font-display text-3xl md:text-5xl tracking-tight leading-[0.95]">
                all 18 signals<span className="text-pink">.</span>
              </div>
            </div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
              showing {String(visible.length).padStart(2, "0")} / {signals.length}
            </div>
          </div>

          <div className="border-2 border-line">
            {signals.map((s, i) => (
              <LedgerRow
                key={s.id}
                signal={s}
                dimmed={!matches(s)}
                divider={i < signals.length - 1}
                active={selected?.id === s.id}
                onView={() => setSelected(s)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">

          <div className="border-b-2 border-line pb-10 md:pb-14 mb-10 md:mb-14">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">
              <span className="w-2 h-2 bg-pink" />
              <span>/ scoring rubric · v1.2</span>
              <span className="text-fg-muted/50">·</span>
              <span className="text-fg-muted/70">as of nov &apos;25</span>
            </div>
            <h2
              className="mt-6 font-display leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(36px, 6vw, 88px)" }}
            >
              how a 32 becomes a 71<span className="text-pink">.</span><br />
              signal by signal<span className="text-pink">.</span>
            </h2>
            <p className="mt-5 font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted max-w-[560px] leading-relaxed">
              Published Nov &apos;25 · same rubric used in every paid engagement · verified before handoff.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 border-2 border-line">
              {blocks.map((b, i) => (
                <div
                  key={b.key}
                  className={`p-4 md:p-5 ${i < 3 ? "border-b-2 md:border-b-0 md:border-r-2 border-line" : ""}`}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="font-display text-3xl md:text-4xl tracking-tighter leading-none">
                      <span className="text-pink">{b.key}</span>
                    </div>
                    <div className={`font-mono text-[10px] font-bold tracking-widest uppercase ${b.multiplier > 1 ? "text-pink" : "text-fg-muted"}`}>
                      × {b.multiplier.toFixed(1)}
                    </div>
                  </div>
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-2">{b.label}</div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-fg-muted">
                    raw {b.rawMax} · weighted {(b.rawMax * b.multiplier).toFixed(0)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1 mb-8">
            <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mr-3">filter</span>
            {(["all", "A", "B", "C", "D"] as RubricFilter[]).map((cat) => {
              const count = cat === "all" ? signals.length : signals.filter(s => s.block === cat).length;
              const active = rubricFilter === cat;
              const label = cat === "all" ? "all" : `block ${cat}`;
              return (
                <button
                  key={cat}
                  onClick={() => setRubricFilter(cat)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 border-2 transition-colors duration-150 font-mono text-[10px] font-bold tracking-widest uppercase whitespace-nowrap ${
                    active ? "bg-fg border-fg text-bg" : "border-line text-fg hover:bg-pink-wash"
                  }`}
                >
                  {label}
                  <span className={`font-display text-sm leading-none tracking-tighter ${active ? "text-pink" : "text-fg-muted"}`}>
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="border-2 border-line">
            {rubricVisible.map((s, i) => (
              <RubricRow
                key={s.id}
                signal={s}
                expanded={expandedRow === s.id}
                onToggle={() => toggleRow(s.id)}
                divider={i < rubricVisible.length - 1}
              />
            ))}
          </div>

          <div className="mt-8 border-2 border-line p-5 md:p-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted leading-relaxed max-w-[520px]">
              every audit is scored on this rubric. the math:
              <span className="text-fg"> sum(score × block multiplier) / 115 × 100</span>, rounded to integer. Same rubric, same URL, before and after.
            </p>
            <a
              href="#rubric-pdf"
              className="inline-flex items-center gap-2 border-2 border-line px-4 py-2.5 font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-pink-wash transition-colors duration-150"
            >
              <Download className="w-3.5 h-3.5" strokeWidth={2.5} />
              download rubric pdf
            </a>
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

function BlockChip({ block }: { block: Block }) {
  const meta = blocks.find(b => b.key === block);
  const multiplier = meta?.multiplier ?? 1;
  const isWeighted = multiplier > 1;
  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-8 border-2 font-mono text-[11px] font-bold leading-none ${
        isWeighted ? "border-pink text-pink" : "border-fg text-fg"
      }`}
      title={`block ${block} · ×${multiplier}`}
    >
      {block}
    </span>
  );
}

function RubricRow({
  signal,
  expanded,
  onToggle,
  divider,
}: {
  signal: Signal;
  expanded: boolean;
  onToggle: () => void;
  divider: boolean;
}) {
  return (
    <div className={divider ? "border-b-2 border-line" : ""}>
      <button
        onClick={onToggle}
        className="w-full text-left grid grid-cols-12 items-center gap-3 md:gap-4 px-5 md:px-6 py-4 md:py-5 hover:bg-pink-wash transition-colors duration-150"
      >
        <div className="col-span-2 md:col-span-1 font-display text-2xl tracking-tighter leading-none text-pink">
          {String(signal.num).padStart(2, "0")}
        </div>
        <div className="col-span-6 md:col-span-4 font-display text-xl tracking-tighter leading-none">
          {signal.title}
        </div>
        <div className="col-span-4 md:col-span-3 flex items-center">
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase border-2 border-line px-2 py-1 text-fg-muted">
            block {signal.block}
          </span>
        </div>
        <div className="hidden md:flex col-span-3 items-center gap-2">
          <BlockChip block={signal.block} />
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
            scored 0-5 · × {blocks.find(b => b.key === signal.block)?.multiplier.toFixed(1)}
          </span>
        </div>
        <div className="col-span-12 md:col-span-1 flex justify-end">
          {expanded
            ? <ChevronUp className="w-4 h-4 text-fg-muted" strokeWidth={2.5} />
            : <ChevronDown className="w-4 h-4 text-fg-muted" strokeWidth={2.5} />
          }
        </div>
      </button>

      {expanded && (
        <div className="border-t-2 border-line bg-pink-wash px-5 md:px-6 py-5 md:py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-pink mb-2">scoring 0-5</div>
            <p className="text-sm leading-snug">{signal.scoringCriteria}</p>
          </div>
          <div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-2">how we test</div>
            <p className="text-sm leading-snug text-fg-muted">{signal.howWeTest}</p>
          </div>
          <div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-2">failure looks like</div>
            <p className="text-sm leading-snug text-fg-muted">{signal.failureLooks}</p>
          </div>
        </div>
      )}
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
