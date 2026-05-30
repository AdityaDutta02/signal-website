import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "privacy policy",
  description: "How Signal collects, uses, and stores data from signalled.studio visitors and prospects.",
  alternates: { canonical: "https://signalled.studio/privacy" },
};

const SECTIONS: { num: string; heading: string; body: string[] }[] = [
  {
    num: "01",
    heading: "who we are",
    body: [
      "Signal (\"we\", \"us\") operates signalled.studio and the outreach domain besignalled.com.",
      "The service is run by Aakif and Aditya as a two-person studio. The legal entity is registered in India. Correspondence: aditya@besignalled.com.",
    ],
  },
  {
    num: "02",
    heading: "what we collect",
    body: [
      "When you submit a URL via the audit form, we record: the URL you submitted, the resulting scorecard (18 signals, per-engine scores, top fixes), the timestamp, and a short scan id used as the audit page handle.",
      "When you submit an email (report download, fit-check booking, contact form, build-slot reservation, exit-intent modal), we record the email address, the source surface, and any notes you typed into the form.",
      "We do not run third-party analytics, advertising trackers, or session replay on signalled.studio. Server logs (IP, user-agent, request path) are retained for 30 days for abuse detection.",
    ],
  },
  {
    num: "03",
    heading: "how we use it",
    body: [
      "URL submissions are used to generate the per-prospect scorecard and, when an email is also provided, to email you the PDF and a follow-up engagement offer. Cold-outreach emails from besignalled.com are sent only after you submit a URL or reach out to us first.",
      "Email addresses are used for the transactional message tied to the surface you used (PDF delivery, fit-check confirmation, reservation confirmation) and for at most a three-message outreach sequence offering the $2,490 build. Every email contains a one-click unsubscribe.",
      "We do not sell data. We do not share data with brokers, ad networks, or AI training providers.",
    ],
  },
  {
    num: "04",
    heading: "where it lives",
    body: [
      "Audits, leads, and reservations are stored in a Turso database (libSQL/SQLite) hosted in the EU region. Backups are encrypted at rest.",
      "When TURSO_URL is not configured (local development only), data is written to the local filesystem under /.data. Production deployments always use Turso.",
      "Emails are sent via SMTP from besignalled.com. We do not use third-party CRMs.",
    ],
  },
  {
    num: "05",
    heading: "how long",
    body: [
      "Audit results: 365 days from generation. After that, the audit page returns 404 and the underlying row is purged on the next scheduled cleanup.",
      "Lead records (emails captured via forms): until you unsubscribe or request deletion, whichever is sooner. After unsubscribe, the address is added to a suppression list so we never email it again.",
      "Reservation records: 90 days after the engagement closes, or 365 days if no engagement ever started.",
      "Server logs: 30 days, then purged.",
    ],
  },
  {
    num: "06",
    heading: "your rights",
    body: [
      "Under GDPR, UK GDPR, and CCPA, you may request access to, correction of, or deletion of your data by emailing aditya@besignalled.com with the address you used. We respond within 7 business days.",
      "You may unsubscribe from any email by clicking the unsubscribe link in the footer of that message, or by emailing the same address with \"unsubscribe\" in the subject line.",
      "We do not engage in automated decision-making with legal effect on you.",
    ],
  },
  {
    num: "07",
    heading: "cookies",
    body: [
      "signalled.studio sets no analytics, advertising, or session cookies. The site uses no client-side persistent storage beyond what Next.js requires for SSR rehydration (no cookies set).",
      "If we ever add analytics, this page will be updated and the change will be dated below.",
    ],
  },
  {
    num: "08",
    heading: "ai crawlers",
    body: [
      "We allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and CCBot to crawl signalled.studio. The marketing content on this site is intended to be cited.",
      "We do not allow AI crawlers to access audit pages under /audit/[leadid] - those are private to the prospect they were issued for.",
    ],
  },
  {
    num: "09",
    heading: "changes",
    body: [
      "This page is the source of truth. Material changes will be summarised at the top and re-dated below.",
      "Last updated: 2026-05-29.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b-2 border-line bg-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-8xl mx-auto px-6 md:px-10 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-fg-muted mb-6">/ legal · privacy</div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.88] tracking-tighter">
            privacy<br />
            <span className="text-pink">policy</span>.
          </h1>
          <p className="mt-8 text-base md:text-lg leading-snug max-w-[640px]">
            We collect the minimum we need to run the service. No third-party analytics, no ad trackers, no data resale. This page is the source of truth.
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
            <div className="font-mono text-[11px] font-bold tracking-widest uppercase text-bg/60 mb-3">/ data request</div>
            <p className="text-sm leading-snug max-w-[460px]">
              Email <a className="text-pink underline" href="mailto:aditya@besignalled.com">aditya@besignalled.com</a> with the address you used and what you want done (access, correction, deletion). We respond within 7 business days.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 font-mono text-[11px] font-bold tracking-widest uppercase">
            <Link href="/terms" className="border-2 border-bg/40 px-4 py-2.5 hover:border-pink hover:text-pink transition-colors">terms of service →</Link>
            <Link href="/" className="border-2 border-bg/40 px-4 py-2.5 hover:border-pink hover:text-pink transition-colors">back to signal*</Link>
          </div>
        </div>
      </section>
    </>
  );
}
