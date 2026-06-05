"use client";

import { SITE_FEATURES } from "../constants";
import { SectionHeading } from "./Pricing";

// Consistent 24x24 stroke icons (no emojis) keyed by name from constants.
const ICONS = {
  mobile: "M7 4h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM11 18h2",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
  mail: "M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1ZM3.5 7l8.5 6 8.5-6",
  calendar: "M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z",
  card: "M3 7h18a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1ZM2 11h20M6 15h4",
  pin: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z",
  link: "M9 15l6-6M10.5 6.5l1.8-1.8a4 4 0 0 1 5.7 5.7l-1.8 1.8M13.5 17.5l-1.8 1.8a4 4 0 0 1-5.7-5.7l1.8-1.8",
  rocket: "M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8a2 2 0 0 0-3 0ZM9 13l-2-2c1-5 5-8 11-8 0 6-3 10-8 11ZM14.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
};

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <SectionHeading
        eyebrow="What's included"
        title="Everything your website needs"
        sub="Powerful features built in as standard — no surprise add-ons."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SITE_FEATURES.map((f) => (
          <div
            key={f.title}
            className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-200 hover:border-neon-cyan/40"
          >
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan transition-colors group-hover:bg-neon-cyan/20">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d={ICONS[f.icon]} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <h3 className="font-semibold text-white">{f.title}</h3>
              <p className="mt-0.5 text-sm text-slate-400">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
