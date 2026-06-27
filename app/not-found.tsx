import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CAL_URL, BOOK_LABEL } from "@/lib/links";

export const metadata = {
  title: "Page Not Found",
  description:
    "This page is not here. ChatGPT probably can't find your top three either. Book a 15-minute call to find out where your site lands.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-bg min-h-[80vh] flex items-center">
      <div className="max-w-8xl mx-auto px-6 md:px-10 py-20 md:py-28 w-full">
        <div className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-fg-muted mb-6">
          / 404
        </div>
        <h1
          className="font-display leading-[0.92] tracking-tighter"
          style={{ fontSize: "clamp(64px, 10vw, 152px)" }}
        >
          This Page<br />Is Not Here.
        </h1>
        <p className="mt-8 text-lg md:text-xl leading-snug max-w-[640px]">
          ChatGPT probably can&apos;t find your top three either.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-3 bg-pink text-bg px-7 py-4 hover:bg-fg transition-colors font-mono text-[11px] font-bold tracking-[0.22em] uppercase border-2 border-pink hover:border-fg"
          >
            {BOOK_LABEL}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </a>
          <Link
            href="/"
            className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase border-b-2 border-fg pb-1 hover:text-pink hover:border-pink transition-colors"
          >
            ← back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
