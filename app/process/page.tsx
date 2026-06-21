import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { FitCheckCTA } from "@/components/FitCheckCTA";

type Day = {
  num: string;
  title: string;
  owner: string;
  ownerRole: string;
  description: string;
  ships: string[];
  deliverable: string;
  accent: boolean;
};

const DAYS: Day[] = [
  { num: "01", title: "diagnose", owner: "aakif", ownerRole: "seo + content", description: "Full 18-signal scan on your URL. Per-engine scoring across ChatGPT, Perplexity, Gemini. Competitive citation diff against 3 peers. Audit doc delivered by EOD.", ships: ["18-signal scorecard", "per-engine breakdown", "top 3 fix priorities ranked by delta"], deliverable: "audit doc + priority matrix", accent: false },
  { num: "02", title: "render", owner: "aditya", ownerRole: "ai + tech", description: "Render-path audit. SSR check, hydration timing, bot-allow headers, CDN bot-management rules. If your stack is client-rendering content that crawlers can't see, this is the day we fix it.", ships: ["render-mode diagnosis", "gptbot / perplexitybot allow fix", "CDN rule patch if needed"], deliverable: "PR #1 - render + crawl fixes", accent: false },
  { num: "03", title: "robots", owner: "aditya", ownerRole: "ai + tech", description: "robots.txt audit and rewrite. llms.txt authored and shipped. AI sitemap generated and submitted. IndexNow ping if applicable.", ships: ["robots.txt rewrite", "llms.txt authored", "AI sitemap + IndexNow"], deliverable: "PR #2 - crawl surface files", accent: false },
  { num: "04", title: "schema", owner: "aakif + aditya", ownerRole: "seo + tech", description: "Schema.org coverage across all primary routes. Article, FAQ, Organization, BreadcrumbList, SoftwareApplication where applicable. Validated against Google Rich Results and schema.org validator.", ships: ["Article schema on all blog/docs routes", "FAQ schema on product pages", "Org + BreadcrumbList sitewide"], deliverable: "PR #3 - schema coverage", accent: false },
  { num: "05", title: "copy", owner: "aakif", ownerRole: "seo + content", description: "Answer-first rewrites on your top 3 pages. The 40-word definitional test applied to every hero. Above-fold density scored and fixed. Title clarity pass - concept-to-product pattern.", ships: ["answer-first hero rewrites (×3)", "above-fold density fix", "title clarity pass"], deliverable: "copy doc + PR #4 - content patches", accent: false },
  { num: "06", title: "deploy + scan", owner: "aakif + aditya", ownerRole: "both operators", description: "Final QA pass across all 3 engines. All PRs merged. Day 7: we run the final 18-signal re-scan on the same URL, same rubric. You see the before/after delta per engine and get the handoff report.", ships: ["all PRs merged", "day 0 vs day 7 delta per engine", "handoff report"], deliverable: "engagement doc + handoff", accent: true },
];

const INTAKE_ITEMS = [
  { label: "repo access", note: "read + write, or PR review only - your call" },
  { label: "CMS access", note: "editor role minimum; admin if schema plugin needed" },
  { label: "prompt list", note: "the 5–10 queries you want to rank for in AI engines" },
  { label: "primary contact", note: "one person, async preferred - slack or email" },
  { label: "brand voice doc", note: "optional but useful for copy rewrites" },
  { label: "slack / email channel", note: "shared channel or thread - we post daily updates" },
  { label: "staging URL", note: "if you want fixes previewed before merge" },
];

export default function ProcessPage() {
  return (
    <>
      <section className="border-b-2 border-line bg-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ process</div>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tighter">
                six days.<br />
                <span className="text-pink">day-by-day.</span>
              </h1>
              <p className="mt-8 text-base md:text-lg leading-snug max-w-[560px]">
                No discovery phase. No kickoff workshop. Day 1 we scan, day 6 we ship. Here&apos;s exactly what happens between those two points - who does what, what ships each day, and what you&apos;ll have at the end.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:justify-self-end">
              <div className="border-2 border-line p-5 bg-bg">
                <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-4">/ engagement at a glance</div>
                <div className="space-y-3">
                  {[
                    { l: "duration", v: "6 days" },
                    { l: "operators", v: "aakif + aditya" },
                    { l: "communication", v: "async · slack / doc" },
                    { l: "final scan", v: "day 7" },
                    { l: "price", v: "$2,490 flat" },
                  ].map((r) => (
                    <div key={r.l} className="flex items-baseline justify-between border-b border-line/60 pb-2 last:border-b-0">
                      <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">{r.l}</span>
                      <span className="font-mono text-[10px] font-bold tracking-widest uppercase">{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-10">/ the six days</div>
          <div className="space-y-0 border-2 border-line">
            {DAYS.map((day) => (
              <div
                key={day.num}
                className={`grid grid-cols-12 gap-0 border-b-2 border-line last:border-b-0 ${day.accent ? "bg-pink-wash/40" : "bg-bg"}`}
              >
                <div className={`col-span-12 md:col-span-2 border-b-2 md:border-b-0 md:border-r-2 border-line p-5 md:p-7 flex md:flex-col items-baseline md:items-start gap-3 md:gap-0 ${day.accent ? "bg-pink text-bg" : ""}`}>
                  <div className={`font-display text-5xl md:text-7xl leading-[0.85] tracking-tighter ${day.accent ? "text-bg" : "text-pink"}`}>
                    {day.num}
                  </div>
                  <div className={`font-display text-xl md:text-2xl tracking-tighter leading-none md:mt-2 ${day.accent ? "text-bg" : ""}`}>
                    {day.title}
                  </div>
                  <div className={`font-mono text-[9px] font-bold tracking-widest uppercase md:mt-3 ${day.accent ? "text-bg/70" : "text-fg-muted"}`}>
                    {day.owner}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-5 border-b-2 md:border-b-0 md:border-r-2 border-line p-5 md:p-7">
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-3">/ what happens</div>
                  <p className="text-sm leading-snug">{day.description}</p>
                </div>

                <div className="col-span-12 md:col-span-5 p-5 md:p-7">
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-3">/ ships today</div>
                  <ul className="space-y-1.5 mb-5">
                    {day.ships.map((s) => (
                      <li key={s} className="flex items-baseline gap-2 text-xs">
                        <span className="text-pink font-mono text-[9px] font-bold leading-none">▸</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t-2 border-line pt-3">
                    <div className="font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">deliverable</div>
                    <div className="mt-1 font-mono text-[10px] font-bold tracking-widest uppercase">{day.deliverable}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-8 md:gap-14">
            <div className="col-span-12 md:col-span-5">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ intake</div>
              <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tighter">
                what we need<br />
                <span className="text-pink">from you</span>.
              </h2>
              <p className="mt-6 text-sm leading-snug max-w-[400px]">
                We keep the intake list short. Everything below is needed before day 1. Most founders can send this in under 20 minutes.
              </p>
            </div>
            <div className="col-span-12 md:col-span-7">
              <div className="border-2 border-line divide-y-2 divide-line">
                {INTAKE_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 px-5 py-4 hover:bg-pink-wash/40 transition-colors">
                    <div className="w-4 h-4 border-2 border-line flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono text-[10px] font-bold tracking-widest uppercase">{item.label}</div>
                      <div className="mt-1 text-xs text-fg-muted leading-snug">{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-fg text-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60 mb-8">/ how we communicate</div>
          <div className="grid grid-cols-2 md:grid-cols-4 border-2 border-bg/20">
            {[
              { n: "async", l: "slack or shared doc · always" },
              { n: "1 BD", l: "reply sla · one business day" },
              { n: "1×", l: "revision window · 7-day async" },
              { n: "0", l: "calls · unless you book a fit check" },
            ].map((s, i) => (
              <div key={s.l} className={`p-5 md:p-7 ${i < 3 ? "border-r-2 border-bg/20" : ""}`}>
                <div className="font-display text-3xl md:text-4xl leading-none tracking-tighter text-pink">{s.n}</div>
                <div className="mt-3 font-mono text-[10px] font-bold tracking-widest uppercase text-bg/60">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-snug text-bg/70 max-w-[560px]">
            We post a daily update to the shared doc or Slack channel. You don&apos;t need to be available - just check in when it suits you. The revision window opens on day 6 and runs for 7 days. Scope is limited to the fixes shipped in the engagement.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-8 md:gap-14">
            <div className="col-span-12 md:col-span-5">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ day 7</div>
              <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tighter">
                the final scan<br />
                <span className="text-pink">mechanics</span>.
              </h2>
              <p className="mt-6 text-sm leading-snug max-w-[400px]">
                On day 7, Aakif runs the same 18-signal scan on the same URL. Same rubric, same weights, same engine coverage. You see the before/after delta per engine and get the handoff report.
              </p>
              <div className="mt-8 space-y-3">
                {["same 18-signal rubric, same weights", "same three engines (ChatGPT · Perplexity · Gemini)", "same URL - no switching to a 'better' page", "before/after delta reported per engine", "engagement ends at handoff"].map((l) => (
                  <div key={l} className="flex items-baseline gap-2 text-sm">
                    <span className="text-pink font-mono text-[9px] font-bold leading-none">▸</span>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ after day 6</div>
          <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tighter mb-10">
            what happens<br />
            <span className="text-pink">post-engagement</span>.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-line">
            {[
              { n: "01", t: "assets are yours", b: "Every PR, every schema file, every copy doc - transferred to you on day 6. We don't retain access. Publish the audit if you want. We'll cite it back." },
              { n: "02", t: "free re-scan on request", b: "Months later, if you want a fresh AEO score, ask. We&apos;ll run it on the same rubric and send you the delta. No charge, no commitment, no obligation on either side." },
              { n: "03", t: "nda on request", b: "Standard mutual NDA available on request before the engagement starts. We don't publish client names without permission. Stealth-mode companies welcome." },
            ].map((c, i) => (
              <div key={c.n} className={`p-6 md:p-8 ${i < 2 ? "border-b-2 md:border-b-0 md:border-r-2 border-line" : ""}`}>
                <div className="font-display text-3xl text-pink tracking-tighter leading-none mb-4">{c.n}</div>
                <div className="font-display text-xl tracking-tighter leading-tight mb-3">{c.t}</div>
                <p className="text-sm leading-snug text-fg-muted">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-7">
              <FitCheckCTA variant="card" />
            </div>
            <div className="col-span-12 md:col-span-5 flex flex-col justify-between gap-6">
              <div>
                <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-4">/ ready to start</div>
                <h3 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tighter">
                  see the<br />pricing.
                </h3>
                <p className="mt-4 text-sm leading-snug max-w-[360px]">
                  $2,490 flat. No retainer. No kickoff workshop. Reserve a slot and we start on day 1.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/pricing"
                  className="group inline-flex items-center gap-2 bg-fg text-bg px-5 py-3 hover:bg-pink transition-colors font-mono text-[11px] font-bold tracking-widest uppercase"
                >
                  see pricing
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 border-2 border-line px-5 py-3 hover:border-pink hover:text-pink transition-colors font-mono text-[11px] font-bold tracking-widest uppercase"
                >
                  scan my site →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
