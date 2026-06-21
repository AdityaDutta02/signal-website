"use client";

import { openExitIntentModal } from "./ExitIntentModal";

// Thin pink strip that sits between Nav and Hero. Scrolling promo for the
// 24-page AEO field guide PDF. Click anywhere on the strip → opens the
// ExitIntentModal in PDF-capture mode.
const TOKENS = [
  "UNDERSTAND HOW CHATGPT ACTUALLY RECOMMENDS",
  "→",
  "FREE IN YOUR INBOX",
  "→",
];

// One "rail" = TOKENS repeated enough times to overflow the widest viewport
// we care about (~1920px). Two rails are rendered side-by-side so the
// -50% translate animation produces a seamless loop.
const RAIL_REPEAT = 6;

export function PdfMarqueeBar() {
  return (
    <button
      type="button"
      onClick={openExitIntentModal}
      aria-label="Grab the free 24-page AEO field guide PDF"
      className="group relative block w-full overflow-hidden bg-pink text-bg border-b-2 border-line h-9 md:h-10 hover:bg-fg transition-colors duration-150"
    >
      <div className="anim-marquee flex items-center whitespace-nowrap h-full will-change-transform">
        {[0, 1].map((rail) => (
          <div key={rail} className="flex items-center gap-6 md:gap-8 pr-6 md:pr-8">
            {Array.from({ length: RAIL_REPEAT }).flatMap((_, rep) =>
              TOKENS.map((t, i) => (
                <span
                  key={`${rail}-${rep}-${i}`}
                  className={`font-mono text-[10px] md:text-[11px] font-bold tracking-widest uppercase ${t === "→" ? "opacity-60" : ""}`}
                >
                  {t}
                </span>
              )),
            )}
          </div>
        ))}
      </div>
    </button>
  );
}
