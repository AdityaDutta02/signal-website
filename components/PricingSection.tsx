import { ArrowRight, Check } from "@/components/icons";
import { CAL_URL, BOOK_LABEL } from "@/lib/links";

const BULLETS = [
  "Per-engine scorecard before and after, so you can see the move",
  "Answer-first rewrites on the three pages costing you the most citations",
  "Schema coverage on every key route, validated against Schema.org",
  "robots.txt, llms.txt, and an AI sitemap shipped to your repo",
  "SSR or hydration fixes when your stack is in the way",
  "All assets transferred. Your code, your repo, your control.",
];

/**
 * S3b · Pricing — full-bleed pink-wash section.
 *
 * Edge-to-edge: no max-w container. The section spans the entire viewport
 * width; only the inner content has side padding. Reverted from the dark
 * variant per user direction — the pink-wash version reads as a deliberate
 * price card, not a continuation of the proof block above.
 */
export function PricingSection() {
  return (
    <section className="bg-pink-wash border-b-2 border-line">
      <div className="w-full px-6 md:px-10 py-16 md:py-24">
        <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
          / pricing
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <h2
              className="font-display leading-[0.92] tracking-tighter"
              style={{ fontSize: "clamp(44px, 6.6vw, 96px)" }}
            >
              Become <span className="text-pink">AI visible</span> for $2,490.
            </h2>
            <p className="mt-6 text-base md:text-lg leading-snug text-fg max-w-[520px]">
              One engagement, one invoice. Run end-to-end by Aakif and Aditya. No retainer, no
              follow-on, no PMs.
            </p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener"
              className="group mt-8 inline-flex items-center gap-3 bg-fg text-bg px-7 py-4 hover:bg-pink hover:text-bg transition-colors font-mono text-[11px] font-bold tracking-[0.22em] uppercase border-2 border-fg hover:border-pink"
            >
              {BOOK_LABEL}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </a>
          </div>

          <ul className="space-y-3 md:pl-8 md:border-l-2 md:border-fg/40">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-baseline gap-2.5 text-sm md:text-[15px] leading-snug">
                <Check className="w-3.5 h-3.5 text-pink flex-shrink-0 translate-y-0.5" strokeWidth={2.5} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
