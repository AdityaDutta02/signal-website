import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CAL_URL, BOOK_LABEL_ARROW } from "@/lib/links";

export const metadata: Metadata = {
  title: "Sample AI Visibility Scorecard · acme.ai",
  description:
    "Sample AI visibility scorecard for acme.ai. See the per-engine breakdown and recommendations before you scan your own site.",
  alternates: { canonical: "https://signalled.studio/audit/demo" },
};

const DEMO = {
  domain: "acme.ai",
  composite: 42,
  chatgpt: 47,
  perplexity: 38,
  gemini: 41,
  weakest: [
    {
      label: "A4 · Schema.org Organisation block",
      why: "No Organization JSON-LD on the homepage means the engines cannot reliably tie your site to a citable entity.",
    },
    {
      label: "B3 · llms.txt at root",
      why: "Without llms.txt, the engines fall back to crawling marketing pages, which read as advertising, not as a source.",
    },
    {
      label: "C1 · Answer-first lede",
      why: "Your top three pages open with brand copy. The engines lift the first paragraph and need it to answer a question.",
    },
  ],
};

export default function AuditDemoPage() {
  return (
    <>
      <section className="bg-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 pt-20 md:pt-24 pb-10">
          <div className="border-2 border-pink bg-pink-wash p-4 md:p-5 flex flex-wrap items-center justify-between gap-4 mb-10">
            <p className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase">
              this is a sample scorecard
            </p>
            <Link
              href="/ai-visibility-score"
              className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-pink hover:text-fg underline underline-offset-2"
            >
              score your site →
            </Link>
          </div>

          <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
            / sample · ai visibility scorecard
          </div>
          <h1
            className="font-display leading-[0.92] tracking-tighter"
            style={{ fontSize: "clamp(48px, 7vw, 112px)" }}
          >
            Sample Scorecard:<br /><span className="text-pink">acme.ai</span>.
          </h1>
          <p className="mt-6 font-mono text-[11px] text-fg-muted">
            sample scan rendered for {DEMO.domain}. Numbers below are representative, not real-world.
          </p>

          {/* Composite + per-engine */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_1fr] border-2 border-fg">
            <ScoreCell label="composite" value={DEMO.composite} highlight />
            <ScoreCell label="chatgpt" value={DEMO.chatgpt} />
            <ScoreCell label="perplexity" value={DEMO.perplexity} />
            <ScoreCell label="gemini" value={DEMO.gemini} last />
          </div>
        </div>
      </section>

      {/* Weakest signals */}
      <section className="bg-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
            / three signals dragging the score down
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO.weakest.map((s) => (
              <div key={s.label} className="border-2 border-line p-6">
                <div className="font-display text-lg leading-tight tracking-tighter">{s.label}</div>
                <p className="mt-3 text-sm leading-snug">{s.why}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-[11px] text-fg-muted">
            the full 18-signal breakdown + per-engine recommendations are in the emailed report after you run your own scan.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-fg text-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-end">
          <div>
            <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-bg/60 mb-4">
              / your site, live on the call
            </div>
            <h2
              className="font-display leading-[0.95] tracking-tighter"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              Bring Your URL.<br />We Will Tell You The <span className="text-pink">Move</span>.
            </h2>
          </div>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-3 bg-pink text-bg px-7 py-5 hover:bg-bg hover:text-fg transition-colors font-mono text-[12px] font-bold tracking-[0.22em] uppercase border-2 border-pink hover:border-bg"
          >
            {BOOK_LABEL_ARROW}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </a>
        </div>
      </section>
    </>
  );
}

function ScoreCell({
  label,
  value,
  highlight,
  last,
}: {
  label: string;
  value: number;
  highlight?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`p-5 md:p-7 ${!last ? "md:border-r-2 border-b-2 md:border-b-0 border-fg" : ""} ${
        highlight ? "bg-pink-wash" : "bg-bg"
      }`}
    >
      <div className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-fg-muted">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span
          className="font-display leading-none tracking-tighter"
          style={{ fontSize: highlight ? "clamp(56px, 9vw, 128px)" : "clamp(40px, 5vw, 64px)" }}
        >
          {value}
        </span>
        <span className="font-mono text-sm text-fg-muted">/100</span>
      </div>
    </div>
  );
}
