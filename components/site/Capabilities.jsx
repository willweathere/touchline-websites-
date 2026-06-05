"use client";

import Link from "next/link";
import { CAPABILITIES } from "../siteContent";
import { SectionHeading } from "./Pricing";

const ICONS = {
  link: "M9 15l6-6M10.5 6.5l1.8-1.8a4 4 0 0 1 5.7 5.7l-1.8 1.8M13.5 17.5l-1.8 1.8a4 4 0 0 1-5.7-5.7l1.8-1.8",
  play: "M8 5v14l11-7L8 5Z",
  card: "M3 7h18a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1ZM2 11h20M6 15h4",
  calendar: "M7 3v3M17 3v3M4 9h16M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
};

export default function Capabilities() {
  return (
    <section id="capabilities" className="border-y border-white/5 bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <SectionHeading
          eyebrow="What we can build"
          title="Way more than just a website"
          sub="Social feeds, video, online stores, bookings and more — tap any one to see what it can do for you."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/services/${c.slug}`}
              className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-200 hover:border-neon-cyan/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan transition-colors group-hover:bg-neon-cyan/20">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                  <path d={ICONS[c.icon]} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">{c.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-400">{c.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-neon-cyan">
                See what it does
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
