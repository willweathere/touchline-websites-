"use client";

import Link from "next/link";

const PERKS = [
  "On-brand posts written for your business",
  "Posts planned, created & scheduled for you",
  "Consistent posting across every platform",
  "Smart hashtags & the best times to post",
  "You approve — we publish. Zero hassle.",
];

// Real brand glyphs (single-path, 24x24).
const PLATFORMS = [
  { name: "Instagram", color: "#E1306C", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { name: "Facebook", color: "#1877F2", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: "TikTok", color: "#FFFFFF", path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
  { name: "X", color: "#FFFFFF", path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933zm-1.29 19.51h2.04L6.486 3.24H4.298L17.61 20.663z" },
  { name: "LinkedIn", color: "#0A66C2", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" },
];

// Sample posts shown in the visual (code-rendered, no images).
const POSTS = [
  { tag: "Restaurant", accent: "#FF45C8", text: "Fresh pasta, made daily 🍝 Book your table this weekend →" },
  { tag: "Gym", accent: "#3DFFA8", text: "New year, new PB 💪 First session free this week only." },
  { tag: "Salon", accent: "#9B5CFF", text: "Spring looks are in ✨ DM us to grab a slot." },
];

export default function SocialMedia() {
  return (
    <section id="social" className="relative overflow-hidden border-y border-white/5 bg-ink-900/40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-0 h-56 w-56 rounded-full bg-neon-pink/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-neon-purple/15 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-pink/40 bg-neon-pink/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neon-pink">
            <span className="h-2 w-2 rounded-full bg-neon-pink shadow-glow-pink" />
            Done-for-you
          </span>

          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Consistent <span className="neon-text">social media</span>, handled for you
          </h2>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300">
            More than websites — we keep your business posting. We plan, create and schedule
            regular posts across every platform, so your socials stay active and consistent
            while you get on with running things.
          </p>

          <ul className="mt-6 space-y-3">
            {PERKS.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-slate-200">
                <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 flex-shrink-0 text-neon-green" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </li>
            ))}
          </ul>

          {/* Platforms */}
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <span className="text-sm font-medium text-slate-400">Posting to:</span>
            {PLATFORMS.map((pl) => (
              <span key={pl.name} title={pl.name} aria-label={pl.name}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-white transition-colors hover:border-white/30">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
                  <path d={pl.path} />
                </svg>
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/social-media" className="btn-neon">
              See social media plans
            </Link>
            <Link href="/#custom" className="btn-ghost">
              Talk to us
            </Link>
          </div>
        </div>

        {/* Visual: a phone-style stack of scheduled posts */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-[2rem] border border-white/10 bg-ink-900 p-4 shadow-2xl shadow-black/50">
            {/* header */}
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-neon-cyan to-neon-green text-ink-950">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path d="M4 13.5 9.5 19 20 6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm font-bold text-white">Touchline Social</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-neon-cyan/40 bg-neon-cyan/[0.08] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-neon-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" /> Managed
              </span>
            </div>

            <div className="space-y-3">
              {POSTS.map((post) => (
                <div key={post.tag} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center gap-2">
                    <span className="h-7 w-7 rounded-full" style={{ background: `linear-gradient(135deg, ${post.accent}, transparent)` }} />
                    <div className="flex-1">
                      <div className="h-2 w-20 rounded bg-white/20" />
                      <div className="mt-1 h-1.5 w-12 rounded bg-white/10" />
                    </div>
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ color: post.accent, background: `${post.accent}1a` }}>
                      {post.tag}
                    </span>
                  </div>
                  <div className="mt-2.5 h-20 rounded-xl" style={{ background: `linear-gradient(135deg, ${post.accent}33, transparent)` }} />
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-300">{post.text}</p>
                  <div className="mt-2 flex items-center gap-3 text-slate-500">
                    <Heart /> <Comment /> <Share />
                    <span className="ml-auto text-[10px] font-medium text-neon-green">Scheduled ✓</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Heart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12 20s-7-4.3-9.3-8.4C1 8.5 2.5 5.5 5.5 5.5c2 0 3.2 1.2 3.5 2 .3-.8 1.5-2 3.5-2 3 0 4.5 3 2.8 6.1C16 15.7 12 20 12 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function Comment() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M4 5h16v11H8l-4 3V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function Share() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M4 12 20 4l-6 16-3-7-7-1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
