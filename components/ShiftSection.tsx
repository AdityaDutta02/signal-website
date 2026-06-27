import Image from "next/image";

/**
 * S2 · The shift — half-section.
 *
 * Chart bleeds below the section's bottom edge: visible chart fills the
 * upper half of the right column, the remaining ~40% of the SVG sits below
 * the section's overflow:hidden boundary. Tablet/mobile the chart is full.
 */
export function ShiftSection() {
  return (
    <section className="relative bg-pink-wash border-b-2 border-line overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20 min-h-[50vh] grid grid-cols-1 md:grid-cols-[1.05fr_1fr] gap-10 md:gap-16 items-start">
        <div>
          <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
            / the shift
          </div>
          <h2
            className="font-display leading-[0.92] tracking-tighter"
            style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
          >
            51% Of B2B Buyers Now Start<br />Research In ChatGPT.
          </h2>
          <p className="mt-6 text-base md:text-lg leading-snug max-w-[560px]">
            Eleven months ago it was 29%. The funnel has moved, and most sites have not. If
            ChatGPT can&apos;t read your page, parse your schema, or trust your sources, you don&apos;t
            make the shortlist. Your competitors do.
          </p>
          <p className="mt-6 font-mono text-[11px] text-fg-muted">
            Source:{" "}
            <a
              href="https://learn.g2.com/g2-2026-ai-search-insight-report"
              target="_blank"
              rel="noopener"
              className="text-pink underline underline-offset-2 hover:text-fg transition-colors"
            >
              G2, &quot;The Answer Economy&quot; report, April 2026 (n=1,076 B2B decision-makers) ↗
            </a>
          </p>
        </div>

        <figure className="relative md:translate-y-[18%]">
          <Image
            src="/proof/g2-heatmap.svg"
            alt="G2 heatmap: AI search adoption by company size, showing 51% of buyers start research with AI chatbots"
            width={840}
            height={580}
            className="w-full h-auto border-2 border-fg bg-bg"
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
