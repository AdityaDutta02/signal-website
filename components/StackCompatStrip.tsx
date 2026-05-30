type Stack = {
  name: string;
  status: "full" | "partial" | "manual";
  note: string;
};

const STACKS: Stack[] = [
  { name: "next.js", status: "full", note: "full repo · PR shipped" },
  { name: "astro", status: "full", note: "full repo · PR shipped" },
  { name: "remix", status: "full", note: "full repo · PR shipped" },
  { name: "sveltekit", status: "full", note: "full repo · PR shipped" },
  { name: "webflow", status: "partial", note: "custom code blocks + cms" },
  { name: "framer", status: "partial", note: "code overrides + cms" },
  { name: "wordpress", status: "partial", note: "theme files + schema plugin" },
  { name: "vanilla / custom", status: "manual", note: "patch file + handoff doc" },
];

const STATUS_LABEL: Record<Stack["status"], string> = {
  full: "full ship",
  partial: "partial ship",
  manual: "patch + handoff",
};

const STATUS_DOT: Record<Stack["status"], string> = {
  full: "bg-pink",
  partial: "bg-fg",
  manual: "bg-fg-muted",
};

export function StackCompatStrip({ className = "" }: { className?: string }) {
  return (
    <section className={`border-2 border-line bg-bg ${className}`}>
      <header className="border-b-2 border-line px-5 md:px-7 py-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">/ stack compatibility</div>
          <h3 className="mt-2 font-display text-2xl md:text-3xl leading-none tracking-tighter">
            we ship on <span className="text-pink">your stack</span>.
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-4 font-mono text-[9px] font-bold tracking-widest uppercase">
          <LegendDot color="bg-pink" label="full ship" />
          <LegendDot color="bg-fg" label="partial ship" />
          <LegendDot color="bg-fg-muted" label="patch + handoff" />
        </div>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {STACKS.map((s, i) => (
          <div
            key={s.name}
            className={`p-4 md:p-5 border-line ${i % 4 !== 3 ? "md:border-r-2" : ""} ${i % 2 !== 1 ? "border-r-2 md:border-r-2" : ""} ${i < STACKS.length - (STACKS.length % 4 || 4) ? "border-b-2" : ""}`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 ${STATUS_DOT[s.status]}`} />
              <span className="font-display text-xl tracking-tighter leading-none">{s.name}</span>
            </div>
            <div className="mt-2 font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">
              {STATUS_LABEL[s.status]}
            </div>
            <div className="mt-1 text-xs leading-snug">{s.note}</div>
          </div>
        ))}
      </div>
      <footer className="border-t-2 border-line px-5 md:px-7 py-3 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
        not listed? <a href="/contact" className="text-fg hover:text-pink transition-colors">tell us your stack →</a>
      </footer>
    </section>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2 h-2 ${color}`} />
      {label}
    </span>
  );
}
