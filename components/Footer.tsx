import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type FooterLink = { label: string; href: string; external?: boolean };

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-7">
        {title}
      </div>
      <ul className="space-y-3.5">
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a
                href={l.href}
                target={l.href.startsWith("mailto:") || l.href.startsWith("tel:") ? undefined : "_blank"}
                rel={l.href.startsWith("mailto:") || l.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                className="text-[15px] hover:text-pink transition-colors duration-150"
              >
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="text-[15px] hover:text-pink transition-colors duration-150"
              >
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-bg pb-28 md:pb-16">
      <div className="max-w-8xl mx-auto px-6 md:px-12 pt-16 md:pt-20">
        <div className="flex items-start justify-between gap-6">
          <div className="font-display text-[28vw] md:text-[22vw] leading-[0.78] tracking-[-0.05em] select-none">
            signal<span className="text-pink">*</span>
          </div>
          <div className="text-right pt-2 md:pt-4">
            <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-pink inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-pink" />
              taking 2 · q1 '26
            </div>
            <a
              href="mailto:aditya@besignalled.com"
              className="block mt-2 font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted hover:text-fg transition-colors"
            >
              aditya@besignalled.com
            </a>
          </div>
        </div>

        <div className="mt-8 md:mt-10 border-t border-fg" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 pt-12 md:pt-14 pb-16 md:pb-20">
          <FooterCol title="the studio" links={[
            { label: "work", href: "/work" },
            { label: "notes", href: "/notes" },
            { label: "methodology", href: "/methodology" },
            { label: "the aeo report '26", href: "/report" },
          ]} />

          <FooterCol title="signals" links={[
            { label: "all 18 signals", href: "/rubric" },
            { label: "block A · entity · 05", href: "/rubric" },
            { label: "block B · on-page · 05", href: "/rubric" },
            { label: "block C · content · 04", href: "/rubric" },
            { label: "block D · off-site · 04", href: "/rubric" },
            { label: "scoring formula", href: "/methodology" },
          ]} />

          <FooterCol title="contact" links={[
            { label: "aditya@besignalled.com", href: "mailto:aditya@besignalled.com", external: true },
            { label: "fit check · 15 min", href: "/fit-check" },
            { label: "privacy policy", href: "/privacy" },
            { label: "terms of service", href: "/terms" },
          ]} />

          <div>
            <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-7">
              operators
            </div>
            <p className="text-[15px] leading-[1.5] mb-5">
              Run by Aakif and Aditya. SEO + content (11 years) and AI + tech (9 years). Same two on every audit, every fix, every handoff.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-1 font-mono text-[11px] font-bold tracking-[0.22em] uppercase border-b border-fg pb-0.5 hover:text-pink hover:border-pink transition-colors"
            >
              read about
              <ArrowUpRight className="w-3 h-3" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        <div className="border-t border-fg" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6 font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-fg-muted">
          <div>© 2026 signal studio · async, async, async</div>
          <div className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-2 text-pink">
              <span className="w-1.5 h-1.5 bg-pink" />
              site v0.3
            </span>
            <span>·</span>
            <span>last self-scored 11.11.25 · 100/100</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
