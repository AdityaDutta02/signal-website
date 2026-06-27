import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CAL_URL, BOOK_LABEL } from "@/lib/links";
import { ScoreForm } from "./ScoreForm";

export const metadata: Metadata = {
  title: "Free AI Visibility Score · Test Your Site Against ChatGPT, Perplexity, and Gemini",
  description:
    "Free AI visibility score. Drop your URL, get a per-engine score for ChatGPT, Perplexity, and Gemini in 90 seconds. The full breakdown comes by email.",
  alternates: { canonical: "https://signalled.studio/ai-visibility-score" },
  openGraph: {
    title: "Free AI Visibility Score · Signal",
    description: "Score your site the way ChatGPT scores it. 90 seconds, free, by URL.",
    url: "https://signalled.studio/ai-visibility-score",
  },
};

const WHAT_YOU_GET = [
  { kicker: "free, on the spot", line: "Composite AI visibility score, /100" },
  { kicker: "in the emailed report", line: "Per-engine breakdown: ChatGPT, Perplexity, Gemini" },
  { kicker: "in the emailed report", line: "Three weakest signals dragging your score down" },
  { kicker: "in the emailed report", line: "What it would take to fix each of them" },
];

const INLINE_FAQ = [
  {
    q: "What is a free AI visibility score?",
    a: "It is a /100 score that tells you how often ChatGPT, Perplexity, and Gemini would cite your site in answers to questions in your category. We run the same 18-signal rubric we use for paid engagements.",
  },
  {
    q: "Does the AI visibility score include ChatGPT, Perplexity, and Gemini?",
    a: "Yes. We score against all three. The composite is the average across the three engines, normalised to /100. The per-engine breakdown lands by email.",
  },
  {
    q: "Will running the scan affect my Google ranking?",
    a: "No. The scan is read-only. We hit the engines with category-relevant prompts and parse the answers. Nothing is written back to your site.",
  },
  {
    q: "How accurate is the AI visibility score?",
    a: "We run the same rubric we use for paid engagements. The score is reproducible to within a few points if you scan twice in the same week. The engines themselves drift over weeks, which is why we re-scan on day seven of an engagement.",
  },
  {
    q: "What do I get in the free report?",
    a: "Per-engine scores, the 18-signal breakdown for your site, and the three highest-leverage fixes for your score. Free, by email.",
  },
];

export default function AiVisibilityScorePage() {
  return (
    <>
      {/* FAQPage schema for SERP eligibility */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: INLINE_FAQ.map((it) => ({
              "@type": "Question",
              name: it.q,
              acceptedAnswer: { "@type": "Answer", text: it.a },
            })),
          }),
        }}
      />

      {/* Hero + scan form */}
      <section className="bg-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
            / free ai visibility score
          </div>
          <h1
            className="font-display leading-[0.92] tracking-tighter"
            style={{ fontSize: "clamp(40px, 6vw, 92px)" }}
          >
            Free AI Visibility Score:<br />
            Test Your Site Against<br />
            ChatGPT, Perplexity, And Gemini.
          </h1>
          <p className="mt-8 text-lg leading-snug max-w-[680px]">
            Drop your URL. We run the same scan we use for paid engagements. You get your composite
            AI visibility score in 90 seconds, free. The full per-engine breakdown and
            recommendations are emailed to you as a free report.
          </p>

          <div className="mt-10 max-w-[640px]">
            <ScoreForm />
          </div>

          <p className="mt-3 font-mono text-[10px] text-fg-muted">
            we run this scan on real LLM endpoints. it takes about 90 seconds.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-pink-wash border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
            / what you get
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 border-2 border-line bg-bg">
            {WHAT_YOU_GET.map((c, i) => (
              <div
                key={c.line}
                className={`p-5 md:p-6 ${i < WHAT_YOU_GET.length - 1 ? "md:border-r-2 border-b-2 md:border-b-0 border-line" : ""}`}
              >
                <div className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase text-pink mb-3">
                  {c.kicker}
                </div>
                <p className="font-display text-2xl md:text-3xl leading-[1.05] tracking-tighter">
                  {c.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO body */}
      <section className="bg-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          <article>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.05] tracking-tighter">
              Why your business is not ranking on ChatGPT
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65]">
              If your site ranks on Google but never gets named in a ChatGPT answer, the gap is not
              your authority. It is your shape. The engines do not crawl pages, they parse answers.
              A site built for the link graph reads as advertising to a language model. A site built
              for citation reads as a source. Most B2B sites are still built for the first one. The
              score above tells you, in numbers, how far off the second one you are.
            </p>
          </article>
          <article>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.05] tracking-tighter">
              How ChatGPT decides who to recommend
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65]">
              ChatGPT, Perplexity, and Gemini all do the same three things before they put a name
              in an answer. They check whether you exist as a citable entity in their knowledge
              base. They check whether your page can be parsed cleanly enough to lift a sentence
              from. They check whether other sources confirm what your page claims. If you fail any
              of the three, you do not get named. The free AI visibility score measures all three.
            </p>
          </article>
          <article>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.05] tracking-tighter">
              What an AI visibility score actually measures
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65]">
              A site can rank in the top three on Google and still score under 40 on AI visibility.
              The two scores measure different funnels. The free AI visibility score measures the 18
              signals the engines themselves use, weighted by how much each signal moves their
              citation decision. The composite is averaged across ChatGPT, Perplexity, and Gemini
              and normalised to /100.
            </p>
          </article>
          <article>
            <h2 className="font-display text-3xl md:text-4xl leading-[1.05] tracking-tighter">
              The difference between SEO and AEO
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65]">
              SEO optimises for Google&apos;s link graph: keywords, backlinks, freshness, click
              signals. Answer engine optimization (AEO) optimises for how a language model decides
              which source to lift from. Same web, different funnel. The fixes overlap on schema,
              structured content, and render speed. The fixes diverge on entity grounding,
              llms.txt, AI sitemap, and answer-first content.
            </p>
          </article>
        </div>
      </section>

      {/* Inline FAQ (FAQPage schema covers it above) */}
      <section className="bg-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-14 md:py-20">
          <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
            / questions about the score
          </div>
          <div className="border-t-2 border-line max-w-[820px]">
            {INLINE_FAQ.map((it) => (
              <details key={it.q} className="border-b-2 border-line py-4 md:py-5 group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-6 font-bold text-base md:text-[17px]">
                  {it.q}
                  <span className="font-mono text-lg text-fg-muted group-open:hidden">+</span>
                  <span className="font-mono text-lg text-fg-muted hidden group-open:inline">−</span>
                </summary>
                <p className="mt-3 text-sm md:text-[15px] leading-[1.6]">{it.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm">
            Want to see a finished scorecard before you scan?{" "}
            <Link href="/audit/demo" className="text-pink underline underline-offset-2 hover:text-fg">
              see the sample audit →
            </Link>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-fg text-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <h2
            className="font-display leading-[0.92] tracking-tighter"
            style={{ fontSize: "clamp(48px, 7vw, 112px)" }}
          >
            Score Is Open.<br />Move The <span className="text-pink">Score</span>.
          </h2>
          <p className="mt-8 text-lg leading-snug max-w-[680px] text-bg/85">
            Fifteen minutes on a call, the same scan run live, the move named.
          </p>
          <div className="mt-10">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-3 bg-pink text-bg px-7 py-5 hover:bg-bg hover:text-fg transition-colors font-mono text-[11px] font-bold tracking-[0.22em] uppercase border-2 border-pink hover:border-bg"
            >
              {BOOK_LABEL}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
