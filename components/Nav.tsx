"use client";

import { useState } from "react";
import Link from "next/link";
import { NavLink } from "./NavLink";
import { CAL_URL, BOOK_LABEL_ARROW } from "@/lib/links";

/**
 * Nav v5 — single conversion CTA, no scan, no theme, no slot badge.
 * Sticky `book a 15-min call →` always visible.
 * Mobile: hamburger drawer with same three text links + the CTA at the top.
 */

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors duration-150 font-mono text-[11px] font-bold tracking-[0.22em] uppercase ${
    isActive ? "text-pink" : "hover:text-pink"
  }`;

const LINKS = [
  { to: "/work", label: "work" },
  { to: "/methodology", label: "methodology" },
  { to: "/notes", label: "notes" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-bg border-b-2 border-line">
      <div className="max-w-8xl mx-auto pl-6 md:pl-10 pr-6 md:pr-6 h-[60px] md:h-[68px] flex items-stretch justify-between">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="flex items-baseline gap-0.5 flex-shrink-0 hover:text-pink transition-colors duration-150"
            aria-label="Signal home"
          >
            <span className="font-display text-3xl md:text-4xl tracking-tighter leading-none">
              signal
            </span>
            <span className="text-pink font-display text-3xl md:text-4xl leading-none">*</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Desktop CTA */}
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener"
          className="hidden md:inline-flex items-center self-center bg-fg text-bg px-5 py-3 hover:bg-pink transition-colors font-mono text-[11px] font-bold tracking-[0.22em] uppercase"
        >
          {BOOK_LABEL_ARROW}
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-12 -mr-3 font-mono text-[11px] font-bold tracking-[0.22em] uppercase"
        >
          {open ? "close" : "menu"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t-2 border-line bg-bg px-6 py-6 flex flex-col gap-5 font-mono text-[12px] font-bold tracking-[0.22em] uppercase">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center bg-fg text-bg px-5 py-3 hover:bg-pink transition-colors"
            onClick={() => setOpen(false)}
          >
            {BOOK_LABEL_ARROW}
          </a>
          {LINKS.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className="hover:text-pink"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="hover:text-pink"
            onClick={() => setOpen(false)}
          >
            contact
          </Link>
        </div>
      )}
    </nav>
  );
}
