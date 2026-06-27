import { Suspense } from "react";
import { AuditScorecard } from "@/components/AuditScorecard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Your AI Visibility Scorecard",
  description:
    "Your scored AI visibility report on ChatGPT, Perplexity, and Gemini. The full per-engine breakdown and recommendations are sent by email.",
  robots: { index: false, follow: false },
};

export default function AuditPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AuditScorecard />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="bg-bg min-h-[60vh] flex items-center justify-center">
      <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted flex items-center gap-3">
        <span className="w-2 h-2 bg-pink anim-blink" /> loading scorecard…
      </div>
    </div>
  );
}
