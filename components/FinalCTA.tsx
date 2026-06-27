import { ArrowRight } from "@/components/icons";
import { CAL_URL, BOOK_LABEL } from "@/lib/links";

/**
 * S6 · Final CTA — full section, dark.
 *
 * `data-final-sentinel` so the Nav's sticky CTA hides while this section is
 * visible (the page already has a primary CTA on screen).
 */
export function FinalCTA() {
  return (
    <section
      data-final-sentinel
      className="relative bg-fg text-bg border-b-2 border-line"
    >
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-24 md:py-32 flex flex-col">
        <h2
          className="font-display leading-[0.92] tracking-tighter"
          style={{ fontSize: "clamp(56px, 8.5vw, 128px)" }}
        >
          See where your site lands on <mark className="signal-mark" style={{ background: "var(--pink)", color: "var(--bg)" }}>every AI engine</mark>.
        </h2>

        <p className="mt-8 text-base md:text-xl leading-snug max-w-[760px] text-bg/85">
          Fifteen minutes. We pull your site live on the call, run the scan against ChatGPT,
          Perplexity, and Gemini, and you walk away knowing exactly where you would land.
        </p>

        <div className="mt-12">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-3 bg-pink text-bg px-7 py-5 hover:bg-bg hover:text-fg transition-colors font-mono text-[11px] md:text-[12px] font-bold tracking-[0.22em] uppercase border-2 border-pink hover:border-bg"
          >
            {BOOK_LABEL}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
