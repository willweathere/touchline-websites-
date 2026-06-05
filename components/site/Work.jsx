"use client";

import { SectionHeading } from "./Pricing";

// Real, live client sites shown as embedded previews.
// To add a project: drop a new object in here (it embeds the live URL).
const PROJECTS = [
  {
    name: "Braintree Town F.C.",
    type: "Football club · matchday site",
    url: "https://braintreedemo.netlify.app",
    blurb:
      "A bold home for ‘The Iron’ — fixtures, news and club info at Cressing Road, built to load fast and look sharp on any phone.",
  },
  {
    name: "Worcester Park FC",
    type: "Football club · matchday site",
    url: "https://worcesterparkfc1.netlify.app",
    blurb:
      "‘Pride of the Park’ — a clean, modern club site with news, teams and a strong matchday feel that members actually use.",
  },
];

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
      <SectionHeading
        eyebrow="Our work"
        title="Real sites we’ve built — live right now"
        sub="These aren’t mockups. They’re working websites for real clubs — tap any one to open the live site."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.url} {...p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ name, type, url, blurb }) {
  const domain = url.replace(/^https?:\/\//, "");
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors duration-200 hover:border-neon-cyan/50">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-ink-850 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-neon-pink/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-neon-green/60" />
        <span className="ml-2 truncate rounded bg-white/5 px-2 py-0.5 text-[11px] text-slate-400">{domain}</span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-neon-green/40 bg-neon-green/[0.08] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-neon-green">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-green shadow-glow-green" />
          Live
        </span>
      </div>

      {/* Live embedded preview (non-interactive — click opens the real site) */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open the live ${name} website in a new tab`}
        className="relative block h-80 overflow-hidden"
      >
        <iframe
          src={url}
          title={`${name} — live website preview`}
          loading="lazy"
          scrolling="no"
          tabIndex={-1}
          style={{ width: "calc(100% + 18px)" }}
          className="pointer-events-none h-full border-0 bg-ink-900"
        />
        {/* Hover overlay + visit pill */}
        <span className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
        <span className="absolute inset-0 flex items-center justify-center bg-ink-950/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="btn-neon pointer-events-none px-5 py-3 text-sm">
            Visit live site
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </a>

      {/* Meta */}
      <div className="p-5 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-neon-cyan">{type}</p>
        <h3 className="mt-1 font-display text-xl font-bold text-white">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{blurb}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-neon-cyan hover:text-white"
        >
          Open live site
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
