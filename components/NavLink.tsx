"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  to: string;
  className?: string | ((p: { isActive: boolean }) => string);
  children: ReactNode;
};

/**
 * react-router-dom <NavLink> shim for Next App Router.
 * Supports both string className and (isActive)=>className callback.
 */
export function NavLink({ to, className, children }: Props) {
  const pathname = usePathname();
  const isActive = pathname === to;
  const cls = typeof className === "function" ? className({ isActive }) : className;
  return (
    <Link href={to} className={cls}>
      {children}
    </Link>
  );
}
