"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/icons";
import { CAL_URL, BOOK_LABEL } from "@/lib/links";

type Step = { num: string; title: string; body: string };

const STEPS: Step[] = [
  { num: "01", title: "Scan",     body: "We run your URL through every engine and score the 18 signals they use to decide who to recommend." },
  { num: "02", title: "Diagnose", body: "We surface the three pages losing you the most citations, and the three signals each one is missing." },
  { num: "03", title: "Rewrite",  body: "We rewrite those pages answer-first, the way the engines parse them, not the way Google ranked them." },
  { num: "04", title: "Ship",     body: "We patch schema, llms.txt, the AI sitemap, the bot allowlist, and any render fixes your stack needs." },
  { num: "05", title: "Verify",   body: "We re-scan after handoff. You see the delta on the same scorecard." },
];

type FaqItem = { q: string; a: string };

const FAQS: FaqItem[] = [
  {
    q: "What does this work actually do?",
    a: "We rebuild your site for the way ChatGPT, Perplexity, and Gemini decide who to cite in an answer. Schema, llms.txt, SSR, AI sitemap, and answer-first rewrites on the pages costing you the most citations. The fastest way to see whether the move applies to your URL is the call.",
  },
  {
    q: "Will this hurt my Google ranking?",
    a: "No. Every change we ship is also strong classic SEO: structured content, faster render, cleaner crawl. Showing up in AI search and ranking on Google move in the same direction.",
  },
  {
    q: "How is this different from an SEO agency?",
    a: "Different funnel. Classic SEO optimises for Google's link graph. We optimise for how ChatGPT, Perplexity, and Gemini decide who to cite. Different signals, different scoring, different work.",
  },
];

/**
 * S4 · How + FAQ — merged, full section.
 *
 * Five abstracted steps in a row, then a 3-item FAQ accordion.
 * Long-form FAQ lives on /faq for SEO; the 3 shown here are the most common
 * blockers between landing and booking.
 */
export function HowFAQ() {
  return (
    <section id="how" className="bg-bg border-b-2 border-line">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
          / how it works
        </div>
        <h2
          className="font-display leading-[0.96] tracking-tighter"
          style={{ fontSize: "clamp(36px, 5.4vw, 72px)" }}
        >
          Five Moves. Your Site Cited More<br />By ChatGPT, Perplexity, And Gemini.
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 border-2 border-line">
          {STEPS.map((s, i) => (
            <div
              key={s.num}
              className={`p-5 md:p-6 ${i < STEPS.length - 1 ? "md:border-r-2 border-b-2 md:border-b-0 border-line" : ""}`}
            >
              <div className="font-mono text-[11px] font-bold tracking-[0.22em] text-pink">
                {s.num}
              </div>
              <h3 className="mt-2 font-display text-3xl md:text-4xl leading-none tracking-tighter">
                {s.title}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.5]">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-[1fr_360px] gap-10 items-start">
          <div>
            <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-4">
              / before you book
            </div>
            <FaqAccordion items={FAQS} />
            <p className="mt-6 text-sm">
              Still have questions?{" "}
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener"
                className="text-pink underline underline-offset-2 hover:text-fg transition-colors font-mono text-[11px] font-bold tracking-[0.22em] uppercase"
              >
                book the call →
              </a>
            </p>
          </div>

          <aside className="bg-fg text-bg p-6 md:p-8">
            <div className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-bg/60 mb-3">
              / the call
            </div>
            <p className="font-display text-3xl leading-[0.95] tracking-tighter">
              Fifteen minutes.<br />Your URL.<br />Every engine scanned.
            </p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener"
              className="group mt-6 inline-flex items-center gap-3 bg-pink text-bg px-5 py-3 hover:bg-bg hover:text-fg transition-colors font-mono text-[11px] font-bold tracking-[0.22em] uppercase border-2 border-pink"
            >
              {BOOK_LABEL}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="border-t-2 border-line">
      {items.map((it, i) => {
        const open = openIdx === i;
        return (
          <div key={it.q} className="border-b-2 border-line">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIdx(open ? null : i)}
              className="w-full flex items-center justify-between gap-6 text-left py-4 md:py-5 hover:text-pink transition-colors"
            >
              <span className="font-bold text-[15px] md:text-[17px] leading-snug">{it.q}</span>
              <span className="font-mono text-[18px] font-bold text-fg-muted">{open ? "−" : "+"}</span>
            </button>
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
              }`}
              aria-hidden={!open}
            >
              <p className="pb-5 text-sm md:text-[15px] leading-[1.6] pr-4">{it.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
