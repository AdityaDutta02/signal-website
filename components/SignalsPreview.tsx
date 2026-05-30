import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SignalsGraph } from "./SignalsGraph";

const topFixes = [
  {
    num: "10",
    title: "ai bot allowlist",
    body: "62% of B2B SaaS sites accidentally block GPTBot, PerplexityBot, or ClaudeBot via CDN defaults. One robots.txt block and a CDN whitelist - you go from invisible to indexable overnight.",
  },
  {
    num: "01",
    title: "organization json-ld",
    body: "If your Org schema is flat - no @graph, no @id anchoring - engines can't traverse to Person, Product, or sameAs. We ship a full entity graph that grounds the brand in one pass.",
  },
  {
    num: "06",
    title: "definitional first 200w",
    body: "Engines cite paragraphs that lead with 'X is Y' in the first 100 words. We rewrite your homepage opening so the claim lands before the setup.",
  },
];

export function SignalsPreview() {
  return (
    <section id="signals" className="border-b-2 border-line bg-bg">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-8">
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">/ 03 · methodology</div>
            <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9] tracking-tight">
              eighteen signals<span className="text-pink">.</span>
              <br />three move<br />the needle<span className="text-pink">.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 flex md:items-end md:justify-end">
            <Link
              href="/rubric"
              className="group inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest uppercase border-2 border-line px-4 py-3 hover:bg-fg hover:text-bg transition-colors duration-150"
            >
              see all 18
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0 border-2 border-line">
          <div className="col-span-12 lg:col-span-8 border-b-2 lg:border-b-0 lg:border-r-2 border-line relative bg-bg">
            <div className="aspect-[5/4] lg:aspect-auto lg:h-[560px] relative">
              <SignalsGraph mode="preview" />
            </div>
            <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase bg-bg px-2 py-1 border border-line">
              network · 18n · 23e
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase bg-bg px-2 py-1 border border-line">
              <span className="w-2 h-2 bg-pink anim-pulse-soft" />
              preview
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-fg text-bg px-3 py-2">
              <span className="w-2.5 h-2.5 bg-pink" />
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase">top 3 fixes · pink nodes</span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 divide-y-2 divide-line flex flex-col">
            {topFixes.map((f) => (
              <FixCard key={f.num} f={f} />
            ))}
            <Link
              href="/rubric"
              className="group block p-6 md:p-7 hover:bg-fg hover:text-bg transition-colors duration-150 mt-auto"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[11px] font-bold tracking-widest uppercase">see all 18 signals →</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.5} />
              </div>
              <p className="mt-2 font-mono text-[10px] tracking-widest uppercase text-fg-muted group-hover:text-bg/70">
                full interactive graph · zoom · click · filter
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FixCard({ f }: { f: { num: string; title: string; body: string } }) {
  return (
    <div className="group p-6 md:p-7 hover:bg-pink-wash transition-colors duration-150">
      <div className="flex items-start gap-4">
        <div className="font-display text-5xl md:text-6xl text-pink leading-none tracking-tighter">{f.num}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="font-display text-2xl md:text-3xl tracking-tight">{f.title}</div>
            <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-bg bg-pink px-1.5 py-0.5">fix</span>
          </div>
          <p className="mt-2 text-sm leading-snug text-fg">{f.body}</p>
        </div>
      </div>
    </div>
  );
}
