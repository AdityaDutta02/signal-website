import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";

type Variant = "card" | "banner" | "inline";

export function FitCheckCTA({ variant = "card", className = "" }: { variant?: Variant; className?: string }) {
  if (variant === "inline") {
    return (
      <Link
        href="/fit-check"
        className={`group inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest uppercase border-b-2 border-line hover:border-pink hover:text-pink transition-colors ${className}`}
      >
        fit check · 15 min
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
      </Link>
    );
  }

  if (variant === "banner") {
    return (
      <div className={`border-2 border-line bg-bg px-5 md:px-7 py-4 flex flex-wrap items-center justify-between gap-4 ${className}`}>
        <div className="flex items-center gap-4">
          <CalendarClock className="w-5 h-5 text-pink" strokeWidth={2} />
          <div>
            <div className="font-display text-lg leading-none tracking-tighter">not sure yet? book a fit check.</div>
            <div className="mt-1 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">15 min · not a sales call · no follow-up sequence</div>
          </div>
        </div>
        <Link
          href="/fit-check"
          className="group inline-flex items-center gap-2 bg-fg text-bg px-5 py-3 hover:bg-pink transition-colors font-mono text-[11px] font-bold tracking-widest uppercase"
        >
          pick a slot
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
        </Link>
      </div>
    );
  }

  return (
    <div className={`border-2 border-line bg-bg p-6 md:p-7 ${className}`}>
      <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">/ fence-sitter? talk to us</div>
      <h3 className="mt-3 font-display text-3xl md:text-4xl leading-[0.95] tracking-tighter">
        fit check.<br /><span className="text-pink">15 min.</span>
      </h3>
      <p className="mt-4 text-sm leading-snug">
        Before you wire <span className="font-mono text-xs">$2,490</span>, you may want to confirm your stack is in scope and your problem is something we’ve shipped before. That’s what this call is for.
      </p>
      <ul className="mt-4 space-y-1.5 text-xs">
        {[
          "not a sales call · no follow-up sequence",
          "either operator (aakif or aditya) on the line",
          "you get a written “in scope / out of scope” by eod",
        ].map((l) => (
          <li key={l} className="flex items-baseline gap-2">
            <span className="text-pink font-mono text-[9px] font-bold leading-none">▸</span>
            <span>{l}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/fit-check"
        className="group mt-6 inline-flex items-center gap-3 bg-fg text-bg px-5 py-3 hover:bg-pink transition-colors font-mono text-[11px] font-bold tracking-widest uppercase"
      >
        book a fit check
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
