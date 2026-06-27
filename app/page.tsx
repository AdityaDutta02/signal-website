import Link from "next/link";
import { CAL_URL, BOOK_LABEL_ARROW } from "@/lib/links";
import { organizationGraph, jsonLdScript } from "@/lib/jsonld";

/**
 * Home — v5 conversion rewrite.
 *
 * This file is a deliberate scaffold while the section components are built.
 * Commit 2 in `fix/v5-conversion-rewrite` replaces this with the full
 * S1-S6 stack (Hero with floating logos + rotator, Shift with G2 chart,
 * Proof + Pricing merged, How + FAQ merged, Founders, Final CTA).
 *
 * Keeping this file building means previews remain link-checkable while
 * the bigger pieces land.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationGraph) }}
      />
      <section className="relative bg-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 pt-24 pb-32 md:pt-32 md:pb-40">
          <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
            / ai search
          </div>
          <h1
            className="font-display leading-[0.88] tracking-tighter"
            style={{ fontSize: "clamp(64px, 10vw, 152px)" }}
          >
            Make ChatGPT<br />Recommend You.
          </h1>
          <p className="mt-8 text-lg md:text-xl leading-snug max-w-[560px]">
            Your customers now search on AI chat. We help you show up.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center bg-pink text-bg px-7 py-4 font-mono text-[11px] font-bold tracking-[0.22em] uppercase border-2 border-pink hover:bg-bg hover:text-fg transition-colors"
            >
              {BOOK_LABEL_ARROW}
            </a>
            <Link
              href="/methodology"
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
    </>
  );
}
