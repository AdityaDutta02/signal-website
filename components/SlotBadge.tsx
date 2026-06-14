type Variant = "nav" | "nav-mobile" | "inline" | "stamp";

export function SlotBadge({ variant = "inline", className = "" }: { variant?: Variant; className?: string }) {
  if (variant === "nav") {
    return (
      <div
        className={`hidden md:flex items-center gap-2 px-3 py-1.5 border-2 border-line bg-pink-wash font-mono text-[11px] font-bold tracking-widest uppercase ${className}`}
        title="Two build slots remaining for Q1 2026"
      >
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 bg-pink anim-pulse-soft rounded-none" />
        </span>
        <span>2 slots · q1 ’26</span>
      </div>
    );
  }

  if (variant === "nav-mobile") {
    return (
      <div
        className={`md:hidden inline-flex items-center gap-1.5 px-2 py-0.5 border border-line bg-pink-wash font-mono text-[9px] font-bold tracking-widest uppercase ${className}`}
        title="Two build slots remaining for Q1 2026"
      >
        <span className="w-1.5 h-1.5 bg-pink anim-pulse-soft" />
        <span>2 slots</span>
      </div>
    );
  }

  if (variant === "stamp") {
    return (
      <div className={`inline-flex flex-col items-center bg-pink text-bg border-[3px] border-fg px-3 py-2 ${className}`}>
        <div className="font-display text-xl leading-none tracking-tighter">2 of 4</div>
        <div className="font-mono text-[8px] font-bold tracking-widest uppercase mt-1">slots remain</div>
        <div className="font-mono text-[8px] tracking-widest uppercase">q1 ’26</div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 border-2 border-line bg-bg font-mono text-[10px] font-bold tracking-widest uppercase ${className}`}>
      <span className="w-1.5 h-1.5 bg-pink anim-blink" />
      <span>2 of 4 slots · q1 ’26</span>
    </div>
  );
}
