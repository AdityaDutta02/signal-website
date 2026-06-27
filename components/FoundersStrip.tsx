/**
 * S5 · Who runs it — half section.
 *
 * Two founders, one line each, results-led (years + last role). No bios,
 * no operator brag, no link to /about (it does not exist). Closer line
 * doubles as the only nudge.
 */
type Founder = { name: string; line: string };

const FOUNDERS: Founder[] = [
  { name: "Aakif.",  line: "11 years rewriting B2B sites for citation. Last role: head of SEO at a Series B SaaS." },
  { name: "Aditya.", line: "9 years shipping production code. Last role: staff engineer on ML platform at a Series A." },
];

export function FoundersStrip() {
  return (
    <section className="bg-bg border-b-2 border-line">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20 min-h-[50vh] flex flex-col justify-center">
        <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-8">
          / who runs it
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {FOUNDERS.map((f) => (
            <div key={f.name} className="border-2 border-line p-7 md:p-9">
              <div className="font-display text-5xl md:text-6xl leading-none tracking-tighter">
                {f.name}
              </div>
              <p className="mt-5 text-base md:text-lg leading-snug">{f.line}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 font-bold text-base md:text-lg">
          When you book the call, these are the two people on it.
        </p>
      </div>
    </section>
  );
}
