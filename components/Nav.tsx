"use client";

import Link from "next/link";
import { NavLink } from "./NavLink";
import { NavSlotReveal } from "./NavSlotReveal";
import { AuditForm } from "./AuditForm";
import { ThemeToggle } from "./ThemeToggle";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors duration-150 ${isActive ? "text-pink" : "hover:text-pink"}`;

export function Nav() {
  return (
    <nav className="sticky top-0 z-40 bg-bg border-b-2 border-line">
      <div className="max-w-8xl mx-auto pl-6 md:pl-10 h-[60px] md:h-[68px] flex items-stretch justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-baseline gap-0.5 flex-shrink-0 hover:text-pink transition-colors duration-150" aria-label="Signal home">
            <span className="font-display text-3xl md:text-4xl tracking-tighter leading-none">signal</span>
            <span className="text-pink font-display text-3xl md:text-4xl leading-none">*</span>
          </Link>
          <div className="hidden md:flex items-center gap-5 lg:gap-7 font-mono text-[11px] font-bold tracking-widest uppercase">
            <NavLink to="/work" className={linkClass}>work</NavLink>
            <NavLink to="/methodology" className={linkClass}>methodology</NavLink>
            <NavLink to="/report" className={linkClass}>report</NavLink>
            <NavLink to="/notes" className={linkClass}>notes</NavLink>
          </div>
          <NavSlotReveal variant="nav" />
        </div>

        {/* Desktop - integrated audit form */}
        <AuditForm variant="nav" autoFocusId="audit-input" />

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-3 pr-6 font-mono text-[10px] font-bold tracking-widest uppercase">
          <NavSlotReveal variant="nav-mobile" />
          <NavLink to="/work" className={linkClass}>work</NavLink>
          <NavLink to="/methodology" className={linkClass}>method</NavLink>
          <ThemeToggle />
        </div>

        {/* Desktop theme toggle */}
        <div className="hidden md:flex items-center pr-4 border-l-2 border-line">
          <div className="pl-4"><ThemeToggle /></div>
        </div>
      </div>
    </nav>
  );
}
