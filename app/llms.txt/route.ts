import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

const BODY = `# Signal - signalled.studio

> Signal makes B2B SaaS sites citeable by AI engines.
> 6-day build, $2,490 flat, day-7 final scan + handoff.
> Run by 2 operators (Aakif: SEO + content; Aditya: AI + tech).
> Scored on Signal's 18-signal rubric (Block A entity ×1.5, B on-page, C content, D off-site ×1.4).
> Day-7 re-scan reports before/after delta per engine. No forward guarantee on score lift.

## Pages
- [Home](https://signalled.studio/) - what Signal does, how it works, pricing
- [About](https://signalled.studio/about) - the bet, principles, founder
- [Rubric](https://signalled.studio/rubric) - the published 18-signal AEO rubric (self-audit)
- [Methodology](https://signalled.studio/methodology) - alias of /rubric, same 18-signal content
- [Work](https://signalled.studio/work) - case studies
- [Process](https://signalled.studio/process) - the day-by-day 6-day build
- [Pricing](https://signalled.studio/pricing) - $2,490 flat, what is and isn't included
- [Report](https://signalled.studio/report) - the 24-page AEO report (free PDF)
- [Notes](https://signalled.studio/notes) - field notes and playbooks
- [FAQ](https://signalled.studio/faq) - engagement, team, pricing, risk
- [Fit check](https://signalled.studio/fit-check) - 15-minute scope confirmation call
- [Contact](https://signalled.studio/contact) - reach the operator
- [Privacy](https://signalled.studio/privacy)
- [Terms](https://signalled.studio/terms)

## Audit
- [Sample audit](https://signalled.studio/audit/demo) - a representative per-prospect scorecard

## Contact
Aditya - aditya@besignalled.com
`;

export function GET() {
  return new NextResponse(BODY, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
