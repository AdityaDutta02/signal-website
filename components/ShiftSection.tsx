/**
 * S2 · The shift — half-section, no image.
 *
 * Stat-led layout: large display headline with a black highlight pull on the
 * phrase that names the new buyer behavior ("chat prompt"), then a large
 * percentage number with one supporting line and a citation. No chart asset
 * (the G2 SVG was 84 KB of bundle weight that the section did not need).
 */
export function ShiftSection() {
  return (
    <section className="bg-pink-wash border-b-2 border-line">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 md:gap-16 items-center">
        <div>
          <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-4">
            / the shift
          </div>
          <h2
            className="font-display leading-[0.95] tracking-tighter"
            style={{ fontSize: "clamp(34px, 4.6vw, 64px)" }}
          >
            The B2B software funnel increasingly starts with a chat prompt, not a Google search.
          </h2>
        </div>

        <div className="border-l-2 border-fg pl-6 md:pl-8">
          <div
            className="font-display leading-none tracking-tighter text-fg"
            style={{ fontSize: "clamp(80px, 11vw, 152px)" }}
          >
            71%
          </div>
          <p className="mt-4 text-sm md:text-base leading-snug max-w-[440px]">
            rely on AI chatbots for software research (up from ~60% seven months ago).
          </p>
          <p className="mt-4 font-mono text-[11px] text-fg-muted">
            Source:{" "}
            <a
              href="https://learn.g2.com/g2-2026-ai-search-insight-report"
              target="_blank"
              rel="noopener"
              className="text-pink underline underline-offset-2 hover:text-fg transition-colors"
            >
              G2, &quot;The Answer Economy&quot; report, April 2026 ↗
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
