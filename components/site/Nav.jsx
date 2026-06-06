"use client";

import Link from "next/link";
import { useCart } from "../cart/CartProvider";

const LINKS = [
  { href: "/#social", label: "Social media" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#capabilities", label: "What we build" },
  { href: "/#results", label: "Results" },
];

export default function Nav() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green text-ink-950 shadow-glow-green">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path d="M4 13.5 9.5 19 20 6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Touchline
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-neon-cyan">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/cart" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] text-white transition-colors hover:border-neon-cyan/60">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .7h8.7a1 1 0 0 0 1-.8L21 8H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.4" fill="currentColor" />
              <circle cx="18" cy="20" r="1.4" fill="currentColor" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-neon-pink px-1 text-[11px] font-bold text-ink-950 shadow-glow-pink">
                {count}
              </span>
            )}
          </Link>
          <Link href="/#quote" className="btn-neon px-4 py-2.5 text-sm">
            Build your site
          </Link>
        </div>
      </nav>
    </header>
  );
}
