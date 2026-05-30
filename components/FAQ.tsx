"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Why six days and not six weeks?",
    a: "Because AEO is mostly tractable engineering work - schema, robots.txt, render mode, and a tight content rewrite - and the leverage is in shipping fast, not in workshops. We've done this enough times to scope it tight from the first call.",
  },
  {
    q: "What if my site is on a no-code or weird stack?",
    a: "Webflow, Framer, Next.js, Astro, WordPress, custom - we've shipped on all of them. You give us PR access or staging, we hand back exact-diff fixes you can review and merge. If there's no PR workflow we walk you through deploying the diff manually.",
  },
  {
    q: "Do you do ongoing retainer work?",
    a: "No. One project, one flat fee, one delivery window. If you want a second round in six months we re-quote then. We'd rather you have a clean fix that holds than a forever invoice that doesn't.",
  },
  {
    q: "What if the final scan doesn't move?",
    a: "We re-build the failing signals at no extra cost during the delivery window. If we still can't move the needle on at least two of three engines, we refund 50%. We've not had to do that yet - three for three pilots cleared +30 average.",
  },
  {
    q: "Is this just SEO with a new name?",
    a: "No. Google ranks pages and rewards links; answer engines cite paragraphs and reward render-mode plus schema. Different crawlers, different priorities, different success metric (citation rate, not blue links). Overlap with traditional SEO is under 30%.",
  },
  {
    q: "Who actually does the work?",
    a: "Two people. The founder (ex-staff engineer, eight years across three B2B SaaS) writes the diff. A second engineer reviews. No agency tower, no junior layer, no offshored content team.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="border-b-2 border-line">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-20 md:py-28 grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted">/ 07 · questions</div>
          <h2 className="mt-4 font-display text-5xl md:text-7xl leading-[0.9] tracking-tight">
            what<br />founders<br />ask<span className="text-pink">.</span>
          </h2>
          <p className="mt-6 text-sm leading-snug max-w-[300px] text-fg-muted">
            The six questions we get on every first call, answered straight.
          </p>
        </div>

        <div className="col-span-12 md:col-span-8 border-t-2 border-line">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="border-b-2 border-line">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className={`w-full flex items-start justify-between gap-6 px-2 py-5 md:py-6 text-left transition-colors duration-150 ${isOpen ? "bg-pink-wash" : "hover:bg-pink-wash/60"}`}
                >
                  <span className="font-display text-2xl md:text-3xl leading-tight tracking-tight">{f.q}</span>
                  <span className="relative w-8 h-8 md:w-9 md:h-9 flex-shrink-0 mt-1">
                    <Plus
                      className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`}
                      strokeWidth={1.5}
                    />
                    <Minus
                      className={`absolute inset-0 w-full h-full transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
                      strokeWidth={1.5}
                    />
                  </span>
                </button>
                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 280ms cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-2 pb-6 pr-2 md:pr-16 text-base leading-relaxed text-fg max-w-[640px]">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
