"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const chapters: { num: string; title: string }[] = [
  { num: "01", title: "the answer-engine landscape" },
  { num: "02", title: "what crawlers actually see" },
  { num: "03", title: "robots.txt audit pattern" },
  { num: "04", title: "gpt vs perplexity vs gemini - what's different" },
  { num: "05", title: "render-path debugging" },
  { num: "06", title: "schema for citation" },
  { num: "07", title: "the answer-first paragraph" },
  { num: "08", title: "llms.txt - the new robots.txt" },
  { num: "09", title: "cdn bot-management rules" },
  { num: "10", title: "sitemap freshness and indexnow" },
  { num: "11", title: "above-fold density scoring" },
  { num: "12", title: "hidden text and accordion patterns" },
  { num: "13", title: "org schema and entity disambiguation" },
  { num: "14", title: "faq schema as cite-anchor" },
  { num: "15", title: "breadcrumb hierarchy for crawlers" },
  { num: "16", title: "definitional copy - the 40-word test" },
  { num: "17", title: "citation structure and source blocks" },
  { num: "18", title: "title clarity - concept to product pattern" },
  { num: "19", title: "og and twitter meta for engine context" },
  { num: "20", title: "canonical tags and url variants" },
  { num: "21", title: "cross-engine scoring rubric" },
  { num: "22", title: "the 6-day engagement model" },
  { num: "23", title: "the +15 ship floor explained" },
  { num: "24", title: "what to do on monday morning" },
];

function EmailForm({ label, placeholder }: { label: string; placeholder?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "sending" || status === "sent") return;
    setErr(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "report", email: email.trim() }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({ error: "send failed" }));
        throw new Error(j.error ?? "send failed");
      }
      setStatus("sent");
    } catch (e2) {
      setStatus("error");
      setErr(e2 instanceof Error ? e2.message : "send failed");
    }
  };

  return (
    <div className="max-w-[520px]">
      <form onSubmit={handleSubmit} className="flex items-stretch border-2 border-line bg-bg">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder ?? "you@company.com"}
          disabled={status === "sending" || status === "sent"}
          className="flex-1 px-5 py-4 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/70 disabled:opacity-60"
          aria-label="Your email"
        />
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="group flex items-center gap-2 px-6 py-4 bg-fg text-bg hover:bg-pink transition-colors duration-200 font-mono text-[11px] font-bold tracking-widest uppercase whitespace-nowrap disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {status === "sent" ? (
            <>sent <Check className="w-4 h-4 anim-scale-in" strokeWidth={2.5} /></>
          ) : status === "sending" ? (
            <>sending…</>
          ) : (
            <>{label} <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} /></>
          )}
        </button>
      </form>
      {err && <div className="mt-2 font-mono text-[10px] font-bold tracking-widest uppercase text-pink">{err}</div>}
      {status === "sent" && (
        <div className="mt-2 font-mono text-[10px] tracking-widest uppercase text-fg-muted">
          inbox in under 2 minutes · check spam if missing
        </div>
      )}
    </div>
  );
}

function PDFCover() {
  return (
    <div className="relative flex justify-center md:justify-start">
      <div className="rotate-[-3deg] hover:rotate-[-1deg] transition-transform duration-500 ease-out">
        <div className="w-[260px] md:w-[340px] aspect-[3/4] bg-fg border-2 border-line p-5 md:p-6 flex flex-col shadow-[8px_8px_0_0_var(--pink)]">
          <div className="flex items-center justify-between font-mono text-[10px] font-bold tracking-widest uppercase text-bg/60">
            <span>the aeo report</span>
            <span>&apos;25 / nov</span>
          </div>
          <div className="mt-1 font-mono text-[10px] tracking-widest uppercase text-bg/40">24 pages · free pdf</div>

          <div className="mt-6 md:mt-8 font-display text-[44px] md:text-[60px] leading-[0.82] tracking-tighter text-bg">
            the<br />aeo<br />report<span className="text-pink">.</span>
          </div>

          <div className="mt-auto pt-6 border-t-2 border-bg/20">
            <div className="font-mono text-[9px] tracking-widest uppercase text-bg/50 leading-relaxed">
              412 sites scanned<br />
              18 signals · 5 categories<br />
              written nov &apos;25
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="font-display text-2xl text-bg">signal<span className="text-pink">*</span></div>
              <div className="font-display text-2xl text-pink">◉</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-4 -right-4 md:-top-6 md:-right-8 rotate-[12deg]">
        <div className="bg-pink text-bg border-[3px] border-fg px-3 py-2 w-[110px] md:w-[124px] text-center">
          <div className="font-display text-2xl md:text-3xl leading-none">FREE</div>
          <div className="font-display text-base md:text-lg leading-tight">PDF</div>
          <div className="font-mono text-[8px] tracking-widest mt-1 leading-tight">no drip · one email</div>
        </div>
      </div>
    </div>
  );
}

function AuditPagePreview() {
  const engines = [
    { l: "chatgpt", n: 31 },
    { l: "perplexity", n: 28 },
    { l: "gemini", n: 42 },
    { l: "claude", n: 35 },
  ];
  const rows = [
    { n: "01", t: "article schema", p: false },
    { n: "05", t: "ssr content", p: false },
    { n: "07", t: "above-fold density", p: true },
    { n: "09", t: "gptbot allow", p: false },
    { n: "13", t: "answer-first copy", p: false },
    { n: "16", t: "title clarity", p: true },
  ];
  return (
    <div className="relative flex justify-center md:justify-end">
      <div className="rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500 ease-out w-full max-w-[520px]">
        <div className="border-2 border-line bg-bg shadow-[10px_10px_0_0_var(--pink)]">
          <div className="border-b-2 border-line px-4 py-2 flex items-center justify-between font-mono text-[9px] font-bold tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-pink anim-blink" />
              <span>audit</span>
              <span className="text-fg-muted">/</span>
              <span>acme.ai</span>
            </div>
            <span className="text-fg-muted">scan id 7c2a</span>
          </div>

          <div className="px-5 py-6 border-b-2 border-line">
            <div className="font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted">/ aeo scorecard</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-7xl leading-[0.82] tracking-tighter">38</span>
              <span className="font-display text-2xl text-fg-muted tracking-tighter">/ 100</span>
              <span className="ml-auto font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted self-end mb-2">median · 54</span>
            </div>
            <p className="mt-3 font-display text-base leading-tight">
              you&apos;re invisible in <span className="text-pink">chatgpt</span>. fixable in <span className="text-pink">6 days</span>.
            </p>
          </div>

          <div className="border-b-2 border-line grid grid-cols-4">
            {engines.map((e, i) => (
              <div key={e.l} className={`p-3 ${i < 3 ? "border-r-2 border-line" : ""}`}>
                <div className="font-mono text-[8px] font-bold tracking-widest uppercase text-fg-muted">{e.l}</div>
                <div className="mt-1 font-display text-2xl leading-none tracking-tighter">{e.n}</div>
                <div className="mt-2 h-1 bg-fg/10 relative">
                  <div className="absolute inset-y-0 left-0 bg-pink" style={{ width: `${e.n}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="divide-y-2 divide-line">
            {rows.map((s) => (
              <div key={s.n} className={`flex items-baseline gap-3 px-4 py-2.5 ${s.p ? "" : "bg-pink-wash/40"}`}>
                <span className="font-display text-lg text-pink tracking-tighter leading-none w-6">{s.n}</span>
                <span className="flex-1 text-xs">{s.t}</span>
                <span className={`font-mono text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 ${s.p ? "bg-fg/5 text-fg" : "bg-pink text-bg"}`}>
                  {s.p ? "pass" : "fail"}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-line px-4 py-3 font-mono text-[9px] font-bold tracking-widest uppercase text-fg-muted flex items-center justify-between">
            <span>+ 12 more signals · top 3 fixes · 6-day plan</span>
            <span className="text-pink">view full →</span>
          </div>
        </div>
      </div>

      <div className="absolute -top-4 -left-2 md:-top-7 md:left-0 rotate-[-8deg]">
        <div className="bg-pink text-bg border-[3px] border-fg px-3 py-2 w-[124px] text-center">
          <div className="font-display text-2xl leading-none">YOURS</div>
          <div className="font-display text-base leading-tight">IN 90s</div>
          <div className="font-mono text-[8px] tracking-widest mt-1 leading-tight">live url · pdf email</div>
        </div>
      </div>
    </div>
  );
}

function SampleSpread() {
  return (
    <div className="flex justify-center">
      <div className="rotate-[1.5deg] hover:rotate-0 transition-transform duration-500 ease-out">
        <div className="w-[300px] md:w-[420px] border-2 border-line bg-bg p-6 md:p-8 shadow-[6px_6px_0_0_#0A0A0A]">
          <div className="flex items-center justify-between font-mono text-[9px] tracking-widest uppercase text-fg-muted border-b-2 border-line pb-4 mb-5">
            <span>the aeo report · signal</span>
            <span>p. 11 / 24</span>
          </div>
          <div className="font-display text-2xl md:text-3xl tracking-tight leading-[0.92] mb-4">
            above-fold density<span className="text-pink">.</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-fg/10 w-full" />
            <div className="h-2 bg-fg/10 w-5/6" />
            <div className="h-2 bg-fg/10 w-full" />
            <div className="h-2 bg-fg/10 w-4/5" />
          </div>
          <div className="mt-5 border-l-4 border-pink pl-4">
            <div className="font-display text-base md:text-lg tracking-tight leading-snug">
              &quot;engines weight the first 1.5kb. your hero is mostly image and CTA.&quot;
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <div className="h-2 bg-fg/10 w-full" />
            <div className="h-2 bg-fg/10 w-3/4" />
            <div className="h-2 bg-fg/10 w-full" />
          </div>
          <div className="mt-5 flex items-center gap-3">
            <div className="w-6 h-6 bg-pink flex-shrink-0" />
            <div className="font-mono text-[9px] tracking-widest uppercase text-fg-muted">signal 07 · above-fold density · render cluster</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReportPage() {
  return (
    <>
      <section className="relative border-b-2 border-line overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-0 w-3 h-3 bg-pink" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-pink" />

        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-12 md:pb-16">
          <div className="flex flex-wrap items-center gap-2 md:gap-3 font-mono text-[11px] font-bold tracking-widest uppercase anim-fade-in">
            <span className="w-2 h-2 bg-pink" />
            <span>report</span>
            <span className="text-fg-muted">/</span>
            <span>24 pages</span>
            <span className="text-fg-muted">/</span>
            <span>free pdf</span>
          </div>

          <h1
            className="mt-10 md:mt-14 font-display leading-[0.88] tracking-tight anim-fade-in"
            style={{ fontSize: "clamp(56px, 10vw, 144px)", animationDelay: "180ms" }}
          >
            the aeo report<span className="text-pink">.</span>
          </h1>

          <div className="mt-8 anim-fade-in" style={{ animationDelay: "280ms" }}>
            <p className="text-base md:text-xl leading-snug max-w-[640px]">
              Twenty-four pages of audit data, scoring rubrics, fix patterns, and the decision tree we use on every engagement.
            </p>
          </div>

          <div className="mt-14 md:mt-16 grid grid-cols-12 gap-8 md:gap-16 items-center anim-fade-in" style={{ animationDelay: "380ms" }}>
            <div className="col-span-12 md:col-span-5">
              <PDFCover />
            </div>

            <div className="col-span-12 md:col-span-7">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ get the pdf</div>
              <EmailForm label="mail me the pdf" />
              <div className="mt-4 font-mono text-[10px] tracking-widest uppercase text-fg-muted">
                one email. no follow-up sequence. unsubscribe is one click.
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  "signal scoring rubric",
                  "robots.txt cookbook",
                  "render-mode triage",
                  "llms.txt template",
                  "schema starter pack",
                  "engine crawl behaviour",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg">
                    <span className="w-2 h-2 bg-pink flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ what&apos;s inside</div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-14">
            <h2 className="font-display text-4xl md:text-6xl leading-[0.92] tracking-tight">
              24 chapters<span className="text-pink">.</span>
            </h2>
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
              18 signals · 5 clusters · 412 audits
            </div>
          </div>

          <div className="border-2 border-line">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {chapters.map((ch, i) => {
                const isLeft = i % 2 === 0;
                const showBottom = i < chapters.length - (chapters.length % 2 === 0 ? 2 : 1);

                return (
                  <div
                    key={ch.num}
                    className={`flex items-baseline gap-4 md:gap-6 px-5 md:px-6 py-4 md:py-5 ${
                      showBottom ? "border-b-2 border-line" : ""
                    } ${isLeft ? "md:border-r-2 md:border-line" : ""}`}
                  >
                    <span className="font-display text-2xl md:text-3xl text-pink tracking-tighter leading-none flex-shrink-0 w-10">
                      {ch.num}
                    </span>
                    <span className="text-sm md:text-base leading-snug text-fg">
                      {ch.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-pink-wash">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ sample page preview</div>
          <div className="grid grid-cols-12 gap-6 md:gap-16 items-center">
            <div className="col-span-12 md:col-span-5">
              <h2 className="font-display text-4xl md:text-5xl leading-[0.92] tracking-tight">
                24 pages of<br />audit data<span className="text-pink">.</span>
              </h2>
              <p className="mt-6 text-base md:text-lg leading-snug max-w-[420px]">
                Every chapter follows the same pattern - signal definition, why it matters to answer engines, the fix, and a real example from the audit data.
              </p>
              <div className="mt-8 grid grid-cols-3 border-2 border-line">
                <div className="p-4 border-r-2 border-line">
                  <div className="font-display text-3xl leading-none tracking-tighter">24</div>
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-2">pages</div>
                </div>
                <div className="p-4 border-r-2 border-line">
                  <div className="font-display text-3xl leading-none tracking-tighter">412</div>
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-2">audits</div>
                </div>
                <div className="p-4">
                  <div className="font-display text-3xl leading-none tracking-tighter">v<span className="text-pink">1.2</span></div>
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-2">version</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <SampleSpread />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-8 md:gap-14 items-center">
            <div className="col-span-12 md:col-span-5">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ per-prospect audit</div>
              <h2 className="font-display text-4xl md:text-6xl leading-[0.9] tracking-tight">
                every url gets a<br /><span className="text-pink">custom scorecard</span>.
              </h2>
              <p className="mt-6 text-base md:text-lg leading-snug max-w-[440px]">
                The report is the foundation. Every URL you submit lands on its own scorecard - your score, the 18-signal breakdown for your site, top 3 fixes ranked by projected delta, and a sample of what we&apos;d ship in 6 days.
              </p>
              <div className="mt-8 grid grid-cols-3 border-2 border-line">
                <div className="p-4 border-r-2 border-line">
                  <div className="font-display text-3xl leading-none tracking-tighter">18</div>
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-2">signals scored</div>
                </div>
                <div className="p-4 border-r-2 border-line">
                  <div className="font-display text-3xl leading-none tracking-tighter">04</div>
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-2">engines</div>
                </div>
                <div className="p-4">
                  <div className="font-display text-3xl leading-none tracking-tighter">90<span className="text-fg-muted text-xl">s</span></div>
                  <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-2">to generate</div>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/audit/demo"
                  className="group inline-flex items-center gap-3 bg-fg text-bg px-6 py-4 hover:bg-pink transition-colors duration-200 font-mono text-[11px] font-bold tracking-widest uppercase"
                >
                  view sample scorecard
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </Link>
                <a
                  href="#audit-input"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("audit-input")?.focus();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 border-2 border-line px-5 py-4 hover:border-pink hover:text-pink transition-colors font-mono text-[11px] font-bold tracking-widest uppercase"
                >
                  scan my site
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </a>
              </div>
            </div>

            <div className="col-span-12 md:col-span-7">
              <AuditPagePreview />
            </div>
          </div>

          <div className="mt-14 md:mt-20 border-t-2 border-line pt-8">
            <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted mb-5">/ what&apos;s on the scorecard</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { n: "01", t: "your overall score · vs. b2b saas median" },
                { n: "02", t: "per-engine score · chatgpt, perplexity, gemini, claude" },
                { n: "03", t: "18-signal pass/fail breakdown with weights" },
                { n: "04", t: "top 3 fixes ranked by projected delta" },
                { n: "05", t: "one sample fix shown before/after as code" },
                { n: "06", t: "6-day rebuild plan, day by day" },
                { n: "07", t: "projected score after the rebuild" },
                { n: "08", t: "persistent url + pdf in your inbox" },
              ].map((c) => (
                <div key={c.n} className="border-2 border-line p-4 bg-bg">
                  <div className="font-display text-2xl text-pink tracking-tighter leading-none">{c.n}</div>
                  <div className="mt-3 text-xs md:text-sm leading-snug">{c.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-8 md:py-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] font-bold tracking-widest uppercase text-fg-muted">
            <span>412 audits used to write this</span>
            <span className="text-fg-muted/40">·</span>
            <span>v1.2</span>
            <span className="text-fg-muted/40">·</span>
            <span>last updated nov &apos;25</span>
            <span className="text-fg-muted/40">·</span>
            <span>cc-by-nc-sa</span>
          </div>
        </div>
      </section>

      <section className="bg-fg text-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="col-span-12 md:col-span-6">
              <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60">/ get the report</div>
              <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[0.95] tracking-tight">
                mail me<br />the pdf<span className="text-pink">.</span>
              </h2>
              <p className="mt-6 max-w-[400px] text-bg/80 leading-snug">
                One email. No follow-up sequence. No drip. Unsubscribe is one click.
              </p>
              <div className="mt-8">
                <EmailForm label="mail me the pdf" placeholder="you@company.com" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-col items-start md:items-end gap-4">
              <div className="font-mono text-[10px] font-bold tracking-widest uppercase text-bg/60">or scan your site first</div>
              <a
                href="#audit-input"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("audit-input")?.focus();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group flex items-center justify-between gap-4 bg-pink text-bg px-6 py-6 hover:bg-bg hover:text-fg transition-colors duration-200 border-2 border-pink hover:border-bg w-full md:max-w-[380px]"
              >
                <span className="font-display text-3xl md:text-4xl tracking-tight">scan my site</span>
                <ArrowRight className="w-8 h-8 transition-transform duration-200 group-hover:translate-x-2" strokeWidth={2.5} />
              </a>
              <div className="font-mono text-[10px] tracking-widest uppercase text-bg/50">
                free · 90 seconds · pdf emailed
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
