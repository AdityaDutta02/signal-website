import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = 3600;

const BODY = `# Signal - signalled.studio

> Signal rebuilds B2B SaaS sites so ChatGPT, Perplexity, and Gemini cite them in answers.
> One engagement, one invoice, $2,490. Run end-to-end by two operators (Aakif: SEO + content, 11 years; Aditya: AI + tech, 9 years).
> Scored on Signal's published 18-signal rubric: Block A entity x1.5, B on-page x1.0, C content x1.0, D off-site x1.4.
> Before/after scan reported on the same scorecard. No promised score lift; published rubric, public method, fixed scope.

## Pages
- [Home](https://signalled.studio/) - what Signal does, the proof, the price, the call
- [Work](https://signalled.studio/work) - three before-and-after case studies
- [Methodology](https://signalled.studio/methodology) - the published 18-signal rubric
- [Notes](https://signalled.studio/notes) - field notes on getting cited by AI engines
- [Contact](https://signalled.studio/contact) - reach the two operators by note or email
- [FAQ](https://signalled.studio/faq) - long-form answers (SEO surface)
- [AI Visibility Score](https://signalled.studio/ai-visibility-score) - free scanner: ChatGPT, Perplexity, Gemini score
- [Report](https://signalled.studio/report) - free report on why most B2B sites are not cited
- [Privacy](https://signalled.studio/privacy)
- [Terms](https://signalled.studio/terms)

## Sample
- [Sample scorecard](https://signalled.studio/audit/demo) - a representative free AI visibility scorecard for acme.ai

## Contact
- Aakif - aakif@besignalled.com
- Aditya - aditya@besignalled.com
- Book a 15-min call - https://cal.com/aditya-studioionique/30min
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
