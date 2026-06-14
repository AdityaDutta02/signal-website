const items = [
  "412 sites scanned",
  "3 pilots shipped",
  "18 signals tested",
  "chatgpt",
  "perplexity",
  "gemini",
  "claude",
  "copilot",
  "day-7 final scan",
  "built for b2b saas",
];

export function Marquee() {
  const doubled = [...items, ...items];
  return (
    <section className="border-b-2 border-line overflow-hidden bg-fg text-bg" aria-hidden="true">
      <div className="flex anim-marquee w-max">
        {doubled.map((it, i) => (
          <div key={i} className="flex items-center gap-8 px-8 py-5 whitespace-nowrap">
            <span className="font-display text-3xl md:text-5xl leading-none">{it}</span>
            <span className="text-pink font-display text-3xl md:text-5xl leading-none">★</span>
          </div>
        ))}
      </div>
    </section>
  );
}
