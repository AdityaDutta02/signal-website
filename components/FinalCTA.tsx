"use client";

import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import { ArrowRight } from "@/components/icons";

export function FinalCTA() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const v412 = useCountUp(412, 1600, inView);
  const [url, setUrl] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setSent(true);
    setTimeout(() => setSent(false), 2400);
  };

  return (
    <section ref={ref} className="bg-fg text-bg border-b-2 border-line relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-pink rotate-45 opacity-10 pointer-events-none" />

      <div className="max-w-8xl mx-auto px-6 md:px-10 py-20 md:py-32">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60">/ 08 · last thing</div>
            <h2 className="mt-4 font-display text-6xl md:text-8xl leading-[0.88] tracking-tight">
              get scored<span className="text-pink">.</span>
              <br />be next<span className="text-pink">.</span>
            </h2>
            <p className="mt-6 max-w-[500px] text-base md:text-lg leading-snug text-bg/85">
              Drop your URL. We run a free 18-signal scan in ninety seconds and email you the report. No call required, no follow-up sequence.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 flex items-stretch border-2 border-bg max-w-[640px]"
            >
              <div className="flex items-center gap-2 px-4 md:px-5 bg-pink text-bg select-none">
                <span className="w-2 h-2 bg-bg anim-blink" />
                <span className="font-mono text-[10px] md:text-[11px] font-bold tracking-widest uppercase">https://</span>
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="yourcompany.com"
                className="flex-1 px-4 md:px-5 py-4 font-mono text-sm bg-fg text-bg focus:outline-none placeholder:text-bg/40"
                aria-label="Your site URL"
              />
              <button
                type="submit"
                className="group flex items-center gap-2 px-5 md:px-6 py-4 bg-bg text-fg hover:bg-pink hover:text-bg transition-colors duration-200 font-mono text-[11px] font-bold tracking-widest uppercase"
              >
                {sent ? "scanning…" : "scan it"}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-[10px] tracking-widest uppercase text-bg/70">
              <span>90s scan</span>
              <span className="text-bg/30">·</span>
              <span>18 signals</span>
              <span className="text-bg/30">·</span>
              <span>no account required</span>
              <span className="text-bg/30">·</span>
              <span>pdf to your inbox</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 flex flex-col md:items-end mt-12 md:mt-0">
            <div className="font-display text-[140px] md:text-[220px] leading-[0.78] text-pink tracking-tighter">
              {v412}
            </div>
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/80 mt-2 md:text-right">
              sites already scanned<br />nov &apos;25
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
