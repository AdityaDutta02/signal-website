import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

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

/**
 * S3a · Proof — full section.
 *
 * Three linked case-study rows. Each row navigates to /work/[slug] for the
 * full case study. Headline pulls attention via the `<mark>` highlight on the
 * verb that matters ("cited more").
 */
export function ProofSection() {
  return (
    <section className="bg-bg border-b-2 border-line">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
          / proof
        </div>
        <h2
          className="font-display leading-[0.96] tracking-tighter"
          style={{ fontSize: "clamp(36px, 5.4vw, 72px)" }}
        >
          Three B2B SaaS sites got <mark className="signal-mark">cited more</mark> by ChatGPT, Perplexity, and Gemini.
        </h2>
        <p className="mt-6 text-base md:text-lg leading-snug max-w-[680px]">
          Three engagements, three before-and-after scans, run against the same rubric the engines
          use to decide who to cite.
        </p>

        <div className="mt-10 border-2 border-line">
          <div className="grid grid-cols-12 px-5 md:px-6 py-3 bg-fg text-bg font-mono text-[11px] font-bold tracking-[0.22em] uppercase">
            <div className="col-span-3">client</div>
            <div className="col-span-3 hidden md:block">before</div>
            <div className="col-span-2">after</div>
            <div className="col-span-7 md:col-span-4 hidden md:block">what changed</div>
            <div className="col-span-7 md:hidden">change</div>
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
      </div>
    </section>
  );
}
