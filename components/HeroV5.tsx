import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CAL_URL, BOOK_LABEL } from "@/lib/links";
import { EngineLogosFloat } from "./EngineLogosFloat";
import { WordRotator } from "./WordRotator";

/**
 * S1 · Hero — the only place the H1 lives.
 *
 * - Engine logos float above the H1, idle bob + cursor parallax.
 * - The first noun of the H1 rotates ChatGPT → Gemini → Perplexity every 2.5s.
 *   All three words ship in static HTML for crawlers and citation bots.
 * - `data-hero-sentinel` so Nav's sticky CTA can hide while the hero is visible.
 */
export function HeroV5() {
  return (
    <section
      data-hero-sentinel
      className="relative bg-bg border-b-2 border-line overflow-hidden text-fg"
    >
      <EngineLogosFloat />
      <div className="relative z-[2] max-w-8xl mx-auto px-6 md:px-10 pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
          / ai search
        </div>

        <h1
          className="font-display leading-[0.86] tracking-tighter"
          style={{ fontSize: "clamp(56px, 9.5vw, 152px)" }}
        >
          Make{" "}
          <WordRotator words={["ChatGPT", "Gemini", "Perplexity"]} />
          <br />
          Recommend You.
        </h1>

        <p className="mt-8 text-lg md:text-xl leading-snug max-w-[600px]">
          Your customers now search on AI chat. We help you show up.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-3 bg-pink text-bg px-7 py-4 hover:bg-fg transition-colors font-mono text-[11px] font-bold tracking-[0.22em] uppercase border-2 border-pink hover:border-fg"
          >
            {BOOK_LABEL} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </a>
          <Link
            href="#how"
            className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase border-b-2 border-fg pb-1 hover:text-pink hover:border-pink transition-colors"
          >
            see how it works ↓
          </Link>
        </div>

        <p className="mt-12 font-mono text-[11px] text-fg-muted tracking-[0.04em]">
          we rebuild for ChatGPT, Perplexity, and Gemini.
        </p>
      </div>
    </section>
  );
}
