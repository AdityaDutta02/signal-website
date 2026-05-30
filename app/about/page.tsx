import Link from "next/link";
import { ArrowRight, ArrowUpRight, Linkedin, Github, Mail } from "lucide-react";
import { SlotBadge } from "@/components/SlotBadge";
import { FitCheckCTA } from "@/components/FitCheckCTA";

type Operator = {
  initials: string;
  name: string;
  role: string;
  yearsLine: string;
  bio: string;
  beats: string[];
  shipped: { client: string; what: string; metric: string }[];
  writing: { title: string; where: string }[];
  links: { label: string; href: string; icon: typeof Linkedin; external?: boolean }[];
  swatch: "pink" | "fg";
};

const OPERATORS: Operator[] = [
  {
    initials: "ak",
    name: "aakif",
    role: "seo + content",
    yearsLine: "11 years · technical seo · b2b content",
    bio:
      "Aakif owns the discoverability half. Schema, crawl hygiene, on-page density, the answer-first rewrite, and the prompt list every audit runs against. Before Signal: head of seo at a Series B b2b SaaS, three years in agency land before that. He's the one who decides whether your page can actually be cited.",
    beats: [
      "18-signal scan + rubric scoring",
      "answer-first content rewrites",
      "schema.org coverage & validation",
      "competitive citation diffs",
    ],
    shipped: [
      { client: "vellum", what: "+38 score · 6 days", metric: "12 ↗ 46 cited %" },
      { client: "stack foundry", what: "+44 score · pilot", metric: "8 ↗ 41 cited %" },
      { client: "numerade", what: "+29 score · re-platform", metric: "schema audit + ssr fix" },
    ],
    writing: [
      { title: "the 18 signals that make a page citable", where: "/notes" },
      { title: "schema.org isn't optional anymore", where: "/notes" },
      { title: "why ‘seo content’ is the wrong frame for aeo", where: "/notes" },
    ],
    links: [
      { label: "linkedin", href: "https://linkedin.com/company/signalled", icon: Linkedin, external: true },
      { label: "email", href: "mailto:aakif@besignalled.com", icon: Mail },
    ],
    swatch: "pink",
  },
  {
    initials: "ad",
    name: "aditya",
    role: "ai + tech",
    yearsLine: "9 years · ml infra · full-stack",
    bio:
      "Aditya owns the build half. He writes the patches, runs the eval harness against ChatGPT/Perplexity/Gemini/Claude, and ships the PR. Before Signal: staff engineer on ml platform at a Series A, infra lead at a YC company before that. He's the one who decides whether your stack can actually carry the changes.",
    beats: [
      "engine eval harness (4 engines, weekly)",
      "ssr / hydration / bot-allow fixes",
      "schema generators + cms patches",
      "llms.txt + ai sitemap shipping",
    ],
    shipped: [
      { client: "vellum", what: "ssr migration · day 3", metric: "edge render, gptbot allow" },
      { client: "linear-adjacent fintech", what: "schema patch · 4 days", metric: "112 routes covered" },
      { client: "two stealth co.", what: "llms.txt + ai sitemap", metric: "perplexity citation +6x" },
    ],
    writing: [
      { title: "running the eval harness against 4 engines", where: "/notes" },
      { title: "ssr is back, and it's about answer engines", where: "/notes" },
      { title: "what we put in llms.txt (and what we don't)", where: "/notes" },
    ],
    links: [
      { label: "linkedin", href: "https://linkedin.com/company/signalled", icon: Linkedin, external: true },
      { label: "github", href: "https://github.com/signalled", icon: Github, external: true },
      { label: "email", href: "mailto:aditya@besignalled.com", icon: Mail },
    ],
    swatch: "fg",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b-2 border-line bg-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ operators</div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tighter">
                two people.<br />
                <span className="text-pink">same two</span> on every<br />
                engagement.
              </h1>
              <p className="mt-8 text-base md:text-lg leading-snug max-w-[560px]">
                Signal is run by Aakif and Aditya. No PMs, no account managers, no agency tier you graduate down into after the kickoff. The two of us scan, ship, and verify every site. Below: who does what, what we&apos;ve shipped, and how to reach us before you buy.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:justify-self-end flex flex-col gap-4 items-start md:items-end">
              <SlotBadge variant="inline" />
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
                last updated · nov &apos;25
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 border-2 border-line">
            {[
              { n: "02", l: "operators" },
              { n: "00", l: "PMs · AMs" },
              { n: "27", l: "sites shipped" },
              { n: "+33", l: "avg. delivery delta" },
            ].map((s, i) => (
              <div key={s.l} className={`p-5 md:p-6 ${i < 3 ? "border-r-2 border-line" : ""} ${i < 2 ? "border-b-2 md:border-b-0 border-line" : ""}`}>
                <div className="font-display text-4xl md:text-5xl leading-none tracking-tighter">{s.n}</div>
                <div className="mt-3 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line">
        {OPERATORS.map((op, i) => (
          <OperatorBlock key={op.name} op={op} index={i + 1} reverse={i % 2 === 1} />
        ))}
      </section>

      <section className="border-b-2 border-line bg-fg text-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg-muted mb-6">/ the promise</div>
              <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tighter">
                same two people.<br />
                <span className="text-pink">every</span> engagement.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 space-y-6">
              {[
                { n: "01", t: "no agency tier", b: "You will not be handed off to a junior. Aakif and Aditya run every audit, every fix, every verification. If we can't both fit your engagement, we don't take it." },
                { n: "02", t: "no kickoff workshop", b: "We don't run discovery decks. You give us the URL and the stack, we send you the audit, and the build starts on day one. Async over Slack or shared doc." },
                { n: "03", t: "named scope, fixed price", b: "Every engagement is scoped to the 6-day rebuild against your audit. Pricing is $2,490 flat. No retainer, no rolling fees, no expansion conversation." },
                { n: "04", t: "+15 ship floor, on the same rubric", b: "Day 7, we run the same 18-signal scan on the same URL. If the score hasn't moved +15, we don't call it shipped - we keep building on our dime until it does. The rubric is published." },
              ].map((p) => (
                <div key={p.n} className="flex gap-5 border-b border-bg-muted/20 pb-6 last:border-b-0">
                  <div className="font-display text-3xl text-pink leading-none tracking-tighter w-12 flex-shrink-0">{p.n}</div>
                  <div>
                    <div className="font-display text-xl leading-tight tracking-tighter">{p.t}</div>
                    <p className="mt-2 text-sm leading-snug text-bg-muted">{p.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7">
            <FitCheckCTA variant="card" />
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-4">/ seen enough</div>
              <h3 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tighter">
                start with the<br />free audit.
              </h3>
              <p className="mt-4 text-sm leading-snug max-w-[400px]">
                Paste your URL on the home page. You&apos;ll have a per-prospect scorecard in 90 seconds, scored on the same 18-signal rubric we use for paid engagements.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 bg-fg text-bg px-5 py-3 hover:bg-pink transition-colors font-mono text-[11px] font-bold tracking-widest uppercase"
              >
                scan my site
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 border-2 border-line px-5 py-3 hover:border-pink hover:text-pink transition-colors font-mono text-[11px] font-bold tracking-widest uppercase"
              >
                pricing →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function OperatorBlock({ op, index, reverse }: { op: Operator; index: number; reverse: boolean }) {
  const swatchClass = op.swatch === "pink" ? "bg-pink text-bg" : "bg-fg text-bg";
  return (
    <div className={`border-b-2 border-line last:border-b-0 bg-bg`}>
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className={`grid grid-cols-12 gap-8 md:gap-14 ${reverse ? "md:[direction:rtl]" : ""}`}>
          <div className="col-span-12 md:col-span-5 [direction:ltr]">
            <div className="relative">
              <div className={`aspect-[4/5] ${swatchClass} border-2 border-line flex flex-col justify-between p-6 md:p-8 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
                <div className="relative flex items-start justify-between">
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase">
                    operator · 0{index}
                  </div>
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase">
                    {op.role}
                  </div>
                </div>
                <div className="relative">
                  <div className="font-display text-[140px] md:text-[180px] leading-[0.78] tracking-tighter">
                    {op.initials}<span className={op.swatch === "pink" ? "text-fg" : "text-pink"}>*</span>
                  </div>
                  <div className="mt-4 font-display text-3xl tracking-tighter leading-none">{op.name}</div>
                  <div className="mt-3 font-mono text-[10px] font-bold tracking-widest uppercase opacity-80">
                    {op.yearsLine}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {op.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="inline-flex items-center gap-1.5 border-2 border-line px-3 py-1.5 hover:border-pink hover:text-pink transition-colors font-mono text-[10px] font-bold tracking-widest uppercase"
                  >
                    <l.icon className="w-3 h-3" strokeWidth={2.5} />
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 [direction:ltr]">
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">/ {op.role}</div>
            <p className="mt-5 font-display text-2xl md:text-3xl leading-[1.05] tracking-tight">
              {op.bio}
            </p>

            <div className="mt-10">
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-4">/ what they own</div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {op.beats.map((b) => (
                  <li key={b} className="flex items-baseline gap-2 border-b border-line/60 py-2">
                    <span className="text-pink font-mono text-[9px] font-bold leading-none">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-4">/ shipped</div>
              <div className="border-2 border-line divide-y-2 divide-line">
                {op.shipped.map((s) => (
                  <div key={s.client} className="grid grid-cols-12 px-4 py-3 items-baseline gap-3 hover:bg-pink-wash/40 transition-colors">
                    <div className="col-span-3 font-display text-lg tracking-tighter leading-none">{s.client}</div>
                    <div className="col-span-5 text-xs leading-snug">{s.what}</div>
                    <div className="col-span-4 font-mono text-[10px] font-bold tracking-widest uppercase text-pink text-right">{s.metric}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-4">/ writing</div>
              <ul className="space-y-2">
                {op.writing.map((w) => (
                  <li key={w.title}>
                    <Link href={w.where} className="group inline-flex items-baseline gap-2 text-sm hover:text-pink transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5 text-pink flex-shrink-0 translate-y-0.5" strokeWidth={2.5} />
                      <span className="border-b border-line group-hover:border-pink">{w.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
