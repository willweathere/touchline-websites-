"use client";

import Link from "next/link";
import { PACKAGES } from "../constants";

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <SectionHeading
        eyebrow="Ready-made packages"
        title="Simple, transparent pricing"
        sub="Three fixed packages — tap any one to see exactly what it looks like and what's included. Want something bespoke instead? Build your own further down."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {PACKAGES.map((p) => (
          <Link
            key={p.value}
            href={`/packages/${p.value}`}
            className={`group relative flex flex-col rounded-3xl border p-6 transition-colors duration-200
              ${p.popular
                ? "border-neon-cyan/60 bg-neon-cyan/[0.06] shadow-glow-cyan"
                : "border-white/10 bg-white/[0.03] hover:border-neon-cyan/50"}`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neon-pink px-3 py-1 text-xs font-bold text-ink-950 shadow-glow-pink">
                {p.tagline}
              </span>
            )}

            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{p.medal}</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-white">{p.name}</h3>

            <div className="mt-4 flex items-end gap-1">
              <span className="font-display text-4xl font-bold text-white">£{p.setup}</span>
              <span className="mb-1 text-sm text-slate-400">setup</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-neon-cyan">+ £{p.monthly}/month</p>

            <ul className="mt-6 flex-1 space-y-3">
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-green" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {perk}
                </li>
              ))}
            </ul>

            <span className={`mt-7 w-full ${p.popular ? "btn-neon" : "btn-ghost"}`}>
              View {p.name}
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="text-sm font-bold uppercase tracking-widest text-neon-cyan">{eyebrow}</p>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {sub && <p className="mt-3 text-slate-400">{sub}</p>}
    </div>
  );
}
