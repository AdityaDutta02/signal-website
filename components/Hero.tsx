"use client";

import { SlotBadge } from "./SlotBadge";
import { openExitIntentModal } from "./ExitIntentModal";
import { openBookCallModal } from "./BookCallModal";

export function Hero() {
  return (
    <section className="relative border-b-2 border-line overflow-hidden" data-hero-sentinel>
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-0 w-3 h-3 bg-pink pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 bg-pink pointer-events-none" />

      <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-10 md:pt-14 pb-12 md:pb-16">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 font-mono text-[11px] font-bold tracking-widest uppercase anim-fade-in">
          <span className="w-2 h-2 bg-pink" />
          <span>aeo</span>
          <span className="text-fg-muted">/</span>
          <span>seed–series a b2b saas</span>
          <span className="text-fg-muted hidden md:inline">/</span>
          <SlotBadge variant="inline" className="hidden md:inline-flex" />
        </div>

        <div className="relative mt-10 md:mt-14">
          <h1
            className="relative font-display leading-[0.88] tracking-tight anim-fade-in"
            style={{ fontSize: "clamp(56px, 11vw, 152px)", animationDelay: "260ms" }}
          >
            ChatGPT can&apos;t<br />
            find you<span className="text-pink">.</span>
          </h1>

          <h2
            className="relative mt-6 md:mt-8 font-display leading-[0.92] tracking-tight anim-fade-in max-w-[820px]"
            style={{ fontSize: "clamp(32px, 5.5vw, 80px)", animationDelay: "360ms" }}
          >
            We fix it in <span className="text-pink">6 days</span>.
          </h2>
        </div>

        <div className="relative mt-10 md:mt-14 grid grid-cols-12 gap-6 md:gap-10 items-end anim-fade-in" style={{ animationDelay: "480ms" }}>
          <div className="col-span-12 md:col-span-7">
            <p className="text-base md:text-lg leading-snug max-w-[540px]">
              We score your site across 18 signals, ship the fix to your repo, and re-scan on day 7. Built for seed&ndash;series A B2B SaaS.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] tracking-widest uppercase text-fg-muted">or</span>
              <button
                type="button"
                onClick={openExitIntentModal}
                className="group inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest uppercase border-b-2 border-line hover:border-pink hover:text-pink transition-colors duration-150 cursor-pointer"
              >
                grab the free 24-page aeo report
                <span className="bg-pink text-bg px-1.5 py-0.5 text-[9px]">pdf</span>
              </button>
              <span className="font-mono text-[11px] tracking-widest uppercase text-fg-muted">·</span>
              <button
                type="button"
                onClick={openBookCallModal}
                className="group inline-flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-widest uppercase border-b-2 border-line hover:border-pink hover:text-pink transition-colors duration-150 cursor-pointer"
              >
                or book a call
              </button>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 grid grid-cols-3 border-2 border-line">
            <div className="p-4 md:p-5 border-r-2 border-line">
              <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">
                <span className="text-pink">$</span>2,490
              </div>
              <div className="font-mono text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">flat fee</div>
            </div>
            <div className="p-4 md:p-5 border-r-2 border-line">
              <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">18</div>
              <div className="font-mono text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">signals</div>
            </div>
            <div className="p-4 md:p-5">
              <div className="font-display text-3xl md:text-5xl leading-none tracking-tighter">03</div>
              <div className="font-mono text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-fg-muted mt-3">engines</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
