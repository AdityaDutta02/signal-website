import Link from "next/link";
import { CAL_URL, BOOK_LABEL_ARROW } from "@/lib/links";

/**
 * Footer v5 — three columns, one CTA. No /about, no /pricing, no slot badge.
 */
export function Footer() {
  return (
    <footer className="bg-bg border-t-2 border-line">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-14">
          {/* Wordmark + one-liner + email */}
          <div>
            <Link href="/" className="flex items-baseline gap-0.5" aria-label="Signal home">
              <span className="font-display text-4xl md:text-5xl tracking-tighter leading-none">
                signal
              </span>
              <span className="text-pink font-display text-4xl md:text-5xl leading-none">*</span>
            </Link>
            <p className="mt-5 text-[15px] leading-[1.55] max-w-[340px]">
              We make ChatGPT, Perplexity, and Gemini cite your site. One engagement, one invoice.
            </p>
            <a
              href="mailto:aditya@besignalled.com"
              className="mt-4 inline-block text-[14px] underline underline-offset-4 decoration-fg/40 hover:decoration-pink hover:text-pink transition-colors"
            >
              aditya@besignalled.com
            </a>
          </div>

          {/* Site links */}
          <div>
            <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
              the site
            </div>
            <ul className="space-y-3 text-[14px]">
              <li><Link href="/work" className="hover:text-pink transition-colors">work</Link></li>
              <li><Link href="/methodology" className="hover:text-pink transition-colors">methodology</Link></li>
              <li><Link href="/notes" className="hover:text-pink transition-colors">notes</Link></li>
              <li>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener"
                  className="text-pink hover:underline underline-offset-4"
                >
                  {BOOK_LABEL_ARROW}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal + contact */}
          <div>
            <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
              elsewhere
            </div>
            <ul className="space-y-3 text-[14px]">
              <li><Link href="/contact" className="hover:text-pink transition-colors">contact</Link></li>
              <li><Link href="/privacy" className="hover:text-pink transition-colors">privacy</Link></li>
              <li><Link href="/terms" className="hover:text-pink transition-colors">terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-fg/30 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-fg-muted">
          <div>© 2026 signal · signalled.studio · built for ai search</div>
          <div>aakif + aditya · two operators, every engagement</div>
        </div>
      </div>
    </footer>
  );
}
