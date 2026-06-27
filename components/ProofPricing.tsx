import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "@/components/icons";
import { CAL_URL, BOOK_LABEL } from "@/lib/links";

type Row = {
  slug: string;
  client: string;
  before: string;
  after: string;
  changed: string;
};

const ROWS: Row[] = [
  { slug: "vellum",        client: "Vellum",        before: "cited in 12% of queries", after: "46%", changed: "answer-first rewrites, schema" },
  { slug: "stack-foundry", client: "Stack Foundry", before: "8%",  after: "41%", changed: "SSR migration, llms.txt" },
  { slug: "numerade",      client: "Numerade",      before: "17%", after: "38%", changed: "schema patch, bot allowlist" },
];

const BULLETS = [
  "Per-engine scorecard before and after, so you can see the move",
  "Answer-first rewrites on the three pages costing you the most citations",
  "Schema coverage on every key route, validated against Schema.org",
  "robots.txt, llms.txt, and an AI sitemap shipped to your repo",
  "SSR or hydration fixes when your stack is in the way",
  "All assets transferred. Your code, your repo, your control.",
];

/**
 * S3 · Proof + Pricing — merged, full section.
 *
 * Each proof row links to its full case study at /work/[slug].
 * Pricing copy: "Become AI Visible for $2,490." (no "six days", no operator brag).
 */
export function ProofPricing() {
  return (
    <section className="bg-bg border-b-2 border-line">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
          / proof + pricing
        </div>
        <h2
          className="font-display leading-[0.96] tracking-tighter"
          style={{ fontSize: "clamp(36px, 5.4vw, 72px)" }}
        >
          Three B2B SaaS Sites Got Cited More<br />By ChatGPT, Perplexity, And Gemini.
        </h2>
        <p className="mt-6 text-base md:text-lg leading-snug max-w-[680px]">
          Three engagements, three before-and-after scans, run against the same rubric the engines
          use to decide who to cite.
        </p>

        {/* Proof table — every row is a link to the full case study */}
        <div className="mt-10 border-2 border-line">
          <div className="grid grid-cols-12 px-5 md:px-6 py-3 bg-fg text-bg font-mono text-[11px] font-bold tracking-[0.22em] uppercase">
            <div className="col-span-3">client</div>
            <div className="col-span-3 hidden md:block">before</div>
            <div className="col-span-2 md:col-span-2">after</div>
            <div className="col-span-7 md:col-span-4 hidden md:block">what changed</div>
            <div className="col-span-7 md:col-span-0 md:hidden">change</div>
          </div>
          {ROWS.map((r) => (
            <Link
              key={r.slug}
              href={`/work/${r.slug}`}
              className="group grid grid-cols-12 items-center px-5 md:px-6 py-4 md:py-5 border-t-2 border-line hover:bg-pink-wash transition-colors"
            >
              <div className="col-span-3 font-display text-xl md:text-2xl tracking-tighter leading-none">
                {r.client}
              </div>
              <div className="col-span-3 hidden md:block text-sm">{r.before}</div>
              <div className="col-span-2 font-bold text-pink text-base md:text-lg">{r.after}</div>
              <div className="col-span-7 md:col-span-4 text-xs md:text-sm flex items-center justify-between gap-3">
                <span>{r.changed}</span>
                <ArrowUpRight
                  className="w-4 h-4 text-fg group-hover:text-pink transition-colors flex-shrink-0"
                  strokeWidth={2.5}
                />
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] text-fg-muted tracking-[0.04em]">
          past results · individual outcomes vary ·{" "}
          <Link href="/work" className="text-pink underline underline-offset-2 hover:text-fg">
            see every case study →
          </Link>
        </p>

        {/* Pricing band */}
        <div className="mt-12 border-2 border-line bg-pink-wash">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10">
            <div>
              <h3
                className="font-display leading-[0.92] tracking-tighter"
                style={{ fontSize: "clamp(40px, 5.6vw, 80px)" }}
              >
                Become AI Visible<br />for <span className="text-pink">$2,490</span>.
              </h3>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener"
                className="group mt-8 inline-flex items-center gap-3 bg-fg text-bg px-6 py-4 hover:bg-pink transition-colors font-mono text-[11px] font-bold tracking-[0.22em] uppercase border-2 border-fg hover:border-pink"
              >
                {BOOK_LABEL}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </a>
            </div>
            <ul className="space-y-3 self-center">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-baseline gap-2.5 text-sm md:text-[15px] leading-snug">
                  <Check className="w-3.5 h-3.5 text-pink flex-shrink-0 translate-y-0.5" strokeWidth={2.5} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
