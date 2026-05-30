import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "terms of service",
  description: "Terms governing use of signalled.studio, the AEO audit tool, and Signal's $2,490 build engagement.",
  alternates: { canonical: "https://signalled.studio/terms" },
};

const SECTIONS: { num: string; heading: string; body: string[] }[] = [
  {
    num: "01",
    heading: "what these terms cover",
    body: [
      "These terms govern your use of signalled.studio, the free AEO audit tool, the State of AI Search PDF report, and any paid engagement with Signal (the \"Service\").",
      "By submitting a URL, downloading the report, booking a fit check, or reserving a build slot, you accept these terms and the privacy policy. If you don't accept them, don't use the Service.",
    ],
  },
  {
    num: "02",
    heading: "the audit tool",
    body: [
      "Anyone can submit a URL and receive a 18-signal AEO scorecard. The audit fetches the URL's homepage, /robots.txt, /llms.txt, and /sitemap.xml from publicly accessible endpoints. We do not bypass authentication, captcha, or IP-blocking.",
      "Audit results are heuristic. Signal scores are an opinionated estimate of how answer engines (ChatGPT, Perplexity, Gemini, Claude) treat the page. They are not a guarantee of citation, ranking, or traffic.",
      "You may submit any URL you control or any publicly accessible URL. You may not use the audit tool to denial-of-service a third party's site by repeatedly submitting their URL.",
    ],
  },
  {
    num: "03",
    heading: "the paid engagement",
    body: [
      "A Signal engagement is $2,490 flat. It includes the day-0 audit, a 6-day build (days 1-6), and the day 7 final scan. The engagement ends at handoff. There is no retainer, no rolling fee, no day-30 obligation.",
      "Scope is fixed before payment. The engagement doc names every fix that will ship. Anything outside that scope is out of scope and requires a fresh engagement.",
      "Payment is 100% upfront. A $500 deposit reserves the slot and is applied to the $2,490 total; the remainder is due on day 1.",
    ],
  },
  {
    num: "04",
    heading: "the +15 ship floor",
    body: [
      "On day 7 we run the same 18-signal scan we ran on day 0. If the score has not moved at least +15 points, we do not call the engagement shipped. We continue building - on our dime - until the score clears +15 or until 14 additional calendar days have passed, whichever comes first.",
      "After 14 additional days without clearing +15, we issue a 50% refund and the engagement closes. We have not had to do this on any pilot to date.",
      "The ship floor measures the same URL, on the same rubric, with the same scanner version. We do not move the goalposts.",
    ],
  },
  {
    num: "05",
    heading: "refunds",
    body: [
      "14-day refund window from payment, before the first PR is shipped. After the first PR, the engagement is underway and the standard refund window closes; the ship-floor refund (50% after 14 days without +15) is the only remaining refund mechanism.",
      "Refunds are processed back to the original payment method within 7 business days.",
    ],
  },
  {
    num: "06",
    heading: "ip and assets",
    body: [
      "Every asset produced during the engagement - PRs, schema files, copy docs, configuration - is yours from the moment it is delivered. We do not retain access after handoff and we do not use your assets in another engagement without your written consent.",
      "The 18-signal rubric, the scorecard format, and the Signal-built audit tooling remain ours.",
      "You may publish your scorecard, the engagement doc, and the before/after delta. We may publish the same with your written consent (NDA available on request).",
    ],
  },
  {
    num: "07",
    heading: "warranties and liability",
    body: [
      "The Service is provided as-is. Signal makes no warranty that any specific score, citation rate, ranking, or revenue outcome will result from the engagement beyond the +15 ship floor stated in section 04.",
      "To the maximum extent permitted by law, Signal's liability for any claim arising from the Service is capped at the fees you paid Signal in the 12 months preceding the claim.",
      "Nothing in these terms excludes liability for fraud, gross negligence, or anything else that cannot be excluded under applicable law.",
    ],
  },
  {
    num: "08",
    heading: "acceptable use",
    body: [
      "Don't use the Service to: submit URLs that you do not own and have no legitimate professional reason to scan; scrape the audit endpoint or rebuild it elsewhere; impersonate Signal in outreach; misrepresent a scorecard from another tool as a Signal scorecard.",
      "We reserve the right to rate-limit or block any IP, ASN, or address that abuses the Service.",
    ],
  },
  {
    num: "09",
    heading: "governing law",
    body: [
      "These terms are governed by the laws of India. Any dispute will be brought in the courts of Bengaluru, India, except where local consumer-protection law in your jurisdiction grants you the right to bring the dispute in your home courts (in which case those rules apply).",
      "If you are an EU or UK consumer, your statutory consumer rights are unaffected.",
    ],
  },
  {
    num: "10",
    heading: "changes",
    body: [
      "We may update these terms. Material changes will be summarised at the top and re-dated below. Continued use of the Service after the change date constitutes acceptance.",
      "Last updated: 2026-05-29.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="border-b-2 border-line bg-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ legal · terms</div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tighter">
            terms of<br />
            <span className="text-pink">service</span>.
          </h1>
          <p className="mt-8 text-base md:text-lg leading-snug max-w-[640px]">
            The terms covering the audit tool, the report download, and the $2,490 build engagement. Plain language. No surprises in the small print.
          </p>
          <div className="mt-8 inline-flex items-center gap-4 border-2 border-line bg-bg px-4 py-2.5 font-mono text-[10px] font-bold tracking-widest uppercase">
            <span className="w-2 h-2 bg-pink" />
            <span>v1.0</span>
            <span className="text-fg-muted">·</span>
            <span>last updated 2026-05-29</span>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-line bg-bg">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="border-2 border-line divide-y-2 divide-line">
            {SECTIONS.map((s) => (
              <div key={s.num} className="grid grid-cols-12 gap-6 px-5 md:px-8 py-8 md:py-10">
                <div className="col-span-12 md:col-span-3">
                  <div className="font-display text-4xl md:text-5xl text-pink tracking-tighter leading-none">{s.num}</div>
                  <div className="mt-3 font-display text-2xl md:text-3xl tracking-tighter leading-tight">{s.heading}<span className="text-pink">.</span></div>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-4 text-sm md:text-base leading-snug">
                  {s.body.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-fg text-bg border-b-2 border-line">
        <div className="max-w-8xl mx-auto px-6 md:px-10 py-12 md:py-16 flex flex-wrap items-baseline justify-between gap-6">
          <div>
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60 mb-3">/ legal contact</div>
            <p className="text-sm leading-snug max-w-[460px]">
              Notice, disputes, or DPA requests: <a className="text-pink underline" href="mailto:aditya@besignalled.com">aditya@besignalled.com</a>. We acknowledge within 7 business days.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 font-mono text-[11px] font-bold tracking-widest uppercase">
            <Link href="/privacy" className="border-2 border-bg/40 px-4 py-2.5 hover:border-pink hover:text-pink transition-colors">privacy policy →</Link>
            <Link href="/" className="border-2 border-bg/40 px-4 py-2.5 hover:border-pink hover:text-pink transition-colors">back to signal*</Link>
          </div>
        </div>
      </section>
    </>
  );
}
