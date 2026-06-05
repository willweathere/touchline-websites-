"use client";

import HeroWheel from "./HeroWheel";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Neon glow backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-cyan/20 blur-3xl animate-pulse-glow" />
        <div className="absolute top-10 -right-10 h-64 w-64 rounded-full bg-neon-purple/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-neon-green/10 blur-3xl" />
      </div>

      {/* Slow, blurred wheel of website previews turning behind the hero */}
      <HeroWheel />

      <div className="relative mx-auto max-w-3xl px-4 pt-16 pb-14 text-center sm:pt-24 sm:pb-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-slate-300">
          <span className="h-2 w-2 rounded-full bg-neon-green shadow-glow-green" />
          Now booking new projects
        </span>

        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
          Websites That Help Your{" "}
          <span className="neon-text">Business Grow</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
          Modern, lightning-fast websites built to win you customers — designed,
          launched, and looked after from just £99. No jargon, no hassle.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#quote" className="btn-neon w-full sm:w-auto">
            Get a Free Quote
          </a>
          <a href="#pricing" className="btn-ghost w-full sm:w-auto">
            View Pricing
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
          <Tick>Live in days, not months</Tick>
          <Tick>Mobile-first & SEO-ready</Tick>
          <Tick>Reply within 24 hours</Tick>
        </div>
      </div>
    </section>
  );
}

function Tick({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-neon-cyan" aria-hidden="true">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </span>
  );
}
