"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <section id="report" className="border-b-2 border-line bg-pink-wash overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-12 gap-6 md:gap-12 items-center">
          <div className="col-span-12 md:col-span-5 flex justify-center md:justify-start">
            <div className="relative">
              <div className="rotate-[-3deg] hover:rotate-[-1deg] transition-transform duration-500 ease-out">
                <div className="w-[260px] md:w-[340px] aspect-[3/4] bg-bg border-2 border-line p-5 md:p-6 flex flex-col shadow-[8px_8px_0_0_#0A0A0A]">
                  <div className="flex items-center justify-between font-mono text-[10px] font-bold tracking-widest uppercase">
                    <span>the aeo report</span>
                    <span className="text-fg-muted">&apos;26 / q1</span>
                  </div>
                  <div className="mt-1 font-mono text-[10px] tracking-widest uppercase text-fg-muted">field guide · 24 pages</div>

                  <div className="mt-6 md:mt-8 font-display text-[44px] md:text-[60px] leading-[0.82] tracking-tighter">
                    how<br />engines<br />read<br />the<span className="text-pink">.</span><br />web
                  </div>

                  <div className="mt-auto pt-6 border-t-2 border-line">
                    <div className="font-mono text-[9px] tracking-widest uppercase text-fg-muted leading-relaxed">
                      412 sites scanned<br />
                      18 signals · 5 categories<br />
                      written nov &apos;25
                    </div>
                    <div className="mt-3 font-display text-2xl">signal<span className="text-pink">*</span></div>
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
          </div>

          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">/ 06 · free report</div>
            <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9] tracking-tight">
              the 24-page<br />
              field guide<span className="text-pink">.</span>
            </h2>
            <p className="mt-6 max-w-[520px] text-base md:text-lg leading-snug">
              The actual signals we test. Crawler quirks per engine. What HubSpot&apos;s grader gets wrong. The exact robots.txt and llms.txt we ship to clients. PDF, no email funnel, no upsell.
            </p>

            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 max-w-[600px] font-mono text-[11px] tracking-widest uppercase text-fg">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-pink" />signal scoring rubric</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-pink" />robots.txt cookbook</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-pink" />render-mode triage</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-pink" />llms.txt template</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-pink" />schema starter pack</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-pink" />engine crawl behaviour</li>
            </ul>

            <form
              onSubmit={handleSubmit}
              className="mt-10 flex items-stretch max-w-[560px] border-2 border-line bg-bg"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 px-5 py-4 font-mono text-sm bg-bg focus:outline-none placeholder:text-fg-muted/70"
                aria-label="Your email"
              />
              <button
                type="submit"
                className="group flex items-center gap-2 px-6 py-4 bg-fg text-bg hover:bg-pink transition-colors duration-200 font-mono text-[11px] font-bold tracking-widest uppercase"
              >
                {sent ? (
                  <>sent <Check className="w-4 h-4 anim-scale-in" strokeWidth={2.5} /></>
                ) : (
                  <>send pdf <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} /></>
                )}
              </button>
            </form>
            <div className="mt-4 font-mono text-[10px] tracking-widest uppercase text-fg-muted">
              one email. one pdf. nothing else. unsubscribe one-click.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
