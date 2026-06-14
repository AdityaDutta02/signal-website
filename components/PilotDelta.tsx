"use client";

import Link from "next/link";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { cases, avgDelta as avgDeltaForCase } from "@/data/cases";

type Engine = { engine: string; before: number; after: number };

// Average across all three pilots' per-engine averages. Sourced from
// data/cases.ts so the home block can't drift from /work numbers.
const avgDelta = Math.round(
  cases.reduce((sum, c) => sum + avgDeltaForCase(c), 0) / cases.length,
);

// Cross-pilot averaged engine scores (rounded) for the visual breakdown.
const engineNames = ["chatgpt", "perplexity", "gemini"] as const;
const engines: Engine[] = engineNames.map((name) => {
  const rows = cases.flatMap((c) => c.scores.filter((s) => s.engine === name));
  const before = Math.round(rows.reduce((a, s) => a + s.before, 0) / rows.length);
  const after = Math.round(rows.reduce((a, s) => a + s.after, 0) / rows.length);
  return { engine: name, before, after };
});

const stripedPink =
  "repeating-linear-gradient(45deg, var(--pink) 0 8px, var(--bg) 8px 14px)";

export function PilotDelta() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const delta = useCountUp(avgDelta, 1400, inView);

  return (
    <section ref={ref} className="border-b-2 border-line">
      <div className="border-b-2 border-line bg-bg overflow-hidden">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6 md:mb-8">
            / 04 · proof
          </div>
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-7 relative">
              <div
                className="font-display text-pink leading-[0.78] tracking-tighter select-none"
                style={{ fontSize: "clamp(180px, 34vw, 440px)" }}
              >
                +{delta}
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 pb-2 md:pb-8">
              <h2 className="font-display text-3xl md:text-5xl leading-[0.95] tracking-tight">
                average score delta on the first three pilots<span className="text-pink">.</span>
              </h2>
              <p className="mt-6 text-base md:text-lg leading-snug max-w-[420px]">
                Same prompts. Same engines. Day 0 vs day 7. No re-prompting, no preferential routing, no marketing dressed on top.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8 md:mb-10">
          <div>
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">vellum · series a · ai infrastructure</div>
            <div className="mt-2 font-display text-2xl md:text-3xl tracking-tight">cross-engine breakdown</div>
          </div>
          <div className="flex items-center gap-6 font-mono text-[10px] font-bold tracking-widest uppercase">
            <span className="flex items-center gap-2">
              <span className="w-5 h-4 bg-pink border-2 border-line" />
              day 0 · solid
            </span>
            <span className="flex items-center gap-2">
              <span
                className="w-5 h-4 border-2 border-line"
                style={{ backgroundImage: stripedPink }}
              />
              day 7 · delta
            </span>
          </div>
        </div>

        <div className="border-2 border-line">
          {engines.map((e, i) => (
            <EngineRow key={e.engine} row={e} index={i} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] tracking-widest uppercase text-fg-muted">
          <span>crawler: signal-crawler/0.4</span>
          <span className="text-fg-muted/40">·</span>
          <span>scoring: 18-signal rubric v1.2</span>
          <span className="text-fg-muted/40">·</span>
          <span>verified by client team</span>
          <span className="text-fg-muted/40">·</span>
          <Link href="/work/vellum" className="border-b border-fg-muted hover:text-pink hover:border-pink">read the full case →</Link>
        </div>
      </div>
    </section>
  );
}

function EngineRow({ row, index }: { row: Engine; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const after = useCountUp(row.after, 900, inView);
  const delta = row.after - row.before;
  const beforePct = inView ? row.before : 0;
  const deltaPct = inView ? delta : 0;

  return (
    <div
      ref={ref}
      className="grid grid-cols-12 items-center gap-3 md:gap-4 px-5 md:px-6 py-5 md:py-6 border-b-2 border-line last:border-b-0"
    >
      <div className="col-span-12 md:col-span-2 font-display text-3xl md:text-4xl tracking-tight">
        {row.engine}
      </div>

      <div className="col-span-6 md:col-span-1 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
        <div>day 0</div>
        <div className="font-display text-xl md:text-2xl text-fg leading-none mt-1 tracking-tighter">
          {row.before}
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 relative h-12 md:h-14 border-2 border-line bg-bg overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 flex pointer-events-none">
          {[0, 25, 50, 75].map((t) => (
            <div key={t} className="border-r border-line/15" style={{ width: "25%" }} />
          ))}
        </div>
        <div
          className="absolute inset-y-0 left-0 bg-pink"
          style={{
            width: `${beforePct}%`,
            transition: `width 900ms cubic-bezier(0.16,1,0.3,1) ${index * 150}ms`,
          }}
        />
        <div
          className="absolute inset-y-0 border-l-2 border-line"
          style={{
            left: `${beforePct}%`,
            width: `${deltaPct}%`,
            backgroundImage: stripedPink,
            transition: `width 1100ms cubic-bezier(0.16,1,0.3,1) ${index * 150 + 360}ms, left 900ms cubic-bezier(0.16,1,0.3,1) ${index * 150}ms`,
          }}
        />
        <div
          className="absolute inset-y-0 border-r-2 border-fg pointer-events-none"
          style={{
            left: 0,
            width: `${beforePct + deltaPct}%`,
            transition: `width 1100ms cubic-bezier(0.16,1,0.3,1) ${index * 150 + 360}ms`,
            opacity: 0.85,
          }}
        />
      </div>

      <div className="col-span-6 md:col-span-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
        <div>day 7</div>
        <div className="font-display text-2xl md:text-3xl text-fg leading-none mt-1 tracking-tighter">
          {after}
          <span className="text-fg-muted text-base">/100</span>
        </div>
      </div>

      <div className="col-span-6 md:col-span-1 font-display text-3xl md:text-4xl text-pink text-right leading-none tracking-tighter">
        +{delta}
      </div>
    </div>
  );
}
