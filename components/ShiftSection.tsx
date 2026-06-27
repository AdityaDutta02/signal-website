import Image from "next/image";

/**
 * S2 · The shift — tight half-section.
 *
 * Compact layout: text + chart side by side, capped height so the section
 * never grows past one screen. Chart capped to ~280-300px so the section
 * stays short.
 */
export function ShiftSection() {
  return (
    <section className="relative bg-pink-wash border-b-2 border-line overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-10 md:py-14 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-14 items-center">
        <div>
          <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-4">
            / the shift
          </div>
          <h2
            className="font-display leading-[0.92] tracking-tighter"
            style={{ fontSize: "clamp(30px, 4.4vw, 60px)" }}
          >
            51% Of B2B Buyers Now Start<br />Research In ChatGPT.
          </h2>
          <p className="mt-4 text-sm md:text-base leading-snug max-w-[560px]">
            Eleven months ago it was 29%. The funnel has moved, and most sites have not. If
            ChatGPT can&apos;t read your page, parse your schema, or trust your sources, you don&apos;t
            make the shortlist. Your competitors do.
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

        <figure className="relative">
          <Image
            src="/proof/g2-heatmap.svg"
            alt="G2 heatmap: AI search adoption by company size, showing 51% of buyers start research with AI chatbots"
            width={420}
            height={290}
            className="w-full h-auto max-h-[260px] md:max-h-[300px] object-contain border-2 border-fg bg-bg"
            unoptimized
          />
          <figcaption className="mt-2 font-mono text-[10px] text-fg-muted tracking-[0.04em]">
            Heatmap: AI search adoption across SMB, Mid Market, Enterprise. Source: G2 Insight Report, Q1 FY27.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
