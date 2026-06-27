import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CAL_URL, BOOK_LABEL } from "@/lib/links";
import { HeroSticker } from "./HeroSticker";
import { WordRotator } from "./WordRotator";

/**
 * S1 · Hero — Brutalis-style.
 *
 * - Big left-aligned display H1 with the brand-word rotator (ChatGPT →
 *   Gemini → Perplexity, 2.5 s). All three words ship in static HTML for
 *   crawlers + citation bots.
 * - Right side carries a tilted pink "s*" sticker (HeroSticker) — the
 *   editorial decoration that replaces the previous floating engine logos.
 *   Sharp corners, 10 px black offset shadow, no gradients.
 * - `data-hero-sentinel` reserved on the section for any future
 *   intersection logic; the sticky nav CTA stays visible regardless.
 */
export function HeroV5() {
  return (
    <section
      data-hero-sentinel
      className="relative bg-bg border-b-2 border-line overflow-hidden text-fg"
    >
      <HeroSticker mark="s" asterisk />

      <div className="relative z-[3] max-w-8xl mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
          / ai search
        </div>

        <h1
          className="font-display leading-[0.86] tracking-tighter max-w-[860px]"
          style={{ fontSize: "clamp(48px, 8vw, 128px)" }}
        >
          Make{" "}
          <WordRotator words={["ChatGPT", "Gemini", "Perplexity"]} />
          <br />
          Recommend You.
        </h1>

        <p className="mt-8 text-lg md:text-xl leading-snug max-w-[560px]">
          Your customers now search on AI chat. We help you show up.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-3 bg-fg text-bg px-7 py-4 hover:bg-pink hover:text-bg transition-colors font-mono text-[11px] font-bold tracking-[0.22em] uppercase border-2 border-fg hover:border-pink"
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
