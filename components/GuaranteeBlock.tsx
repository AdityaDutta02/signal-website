import { Shield } from "lucide-react";

type Variant = "wide" | "compact" | "stacked";

export function GuaranteeBlock({ variant = "wide", className = "" }: { variant?: Variant; className?: string }) {
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-start gap-3 border-2 border-line bg-bg px-4 py-3 ${className}`}>
        <Shield className="w-4 h-4 text-pink mt-0.5 flex-shrink-0" strokeWidth={2} />
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase leading-relaxed">
          +15 ship floor <span className="text-fg-muted">·</span> we don’t hand off until it clears
        </div>
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`border-2 border-line bg-bg p-6 ${className}`}>
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-pink" strokeWidth={2} />
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase">the +15 guarantee</div>
        </div>
        <p className="mt-4 font-display text-2xl leading-[1.05] tracking-tight">
          we don’t call it shipped until your score moves <span className="text-pink">+15</span>. if day 7 needs to become day 8, that’s <span className="text-pink">on us</span>.
        </p>
        <p className="mt-4 text-sm text-fg-muted leading-snug">
          Scored on the same 18-signal rubric, audited by the same two operators, on the same URL. No re-scoping, no follow-on invoice, no day-30 retainer.
        </p>
      </div>
    );
  }

  return (
    <div className={`border-2 border-line bg-bg relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-pink-wash rotate-12" />
      <div className="relative grid grid-cols-12 gap-6 p-6 md:p-8">
        <div className="col-span-12 md:col-span-3 flex items-start gap-3">
          <Shield className="w-6 h-6 text-pink flex-shrink-0" strokeWidth={2} />
          <div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">/ guarantee</div>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase mt-1">v1.2 · published</div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <p className="font-display text-2xl md:text-3xl leading-[1.05] tracking-tight">
            +15 ship floor on the same rubric - we don’t hand off until the score <span className="text-pink">clears the bar</span>. extra days are on us.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 font-mono text-[9px] font-bold tracking-widest uppercase">
            <span className="bg-fg text-bg px-2 py-1">same 18 signals</span>
            <span className="bg-fg text-bg px-2 py-1">same two operators</span>
            <span className="bg-fg text-bg px-2 py-1">same url</span>
            <span className="bg-fg text-bg px-2 py-1">no follow-on invoice</span>
          </div>
        </div>
      </div>
    </div>
  );
}
