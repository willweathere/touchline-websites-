"use client";

import Link from "next/link";

const PERKS = [
  "AI agents write on-brand captions in your voice",
  "Posts planned, created & scheduled for you",
  "Consistent posting across every platform",
  "Smart hashtags & best-time-to-post built in",
  "You approve — we publish. Zero hassle.",
];

const PLATFORMS = [
  { name: "Instagram", glyph: "IG" },
  { name: "Facebook", glyph: "f" },
  { name: "TikTok", glyph: "♪" },
  { name: "X", glyph: "X" },
  { name: "LinkedIn", glyph: "in" },
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
            New · AI-powered
          </span>

          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            We run your <span className="neon-text">social media</span> — with AI agents
          </h2>

          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300">
            Not just websites. We create, write and schedule social media posts for your business —
            powered by AI agents that learn your brand. Stay active on every platform without lifting
            a finger.
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
              <span key={pl.name} title={pl.name}
                className="flex h-9 min-w-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-2.5 text-sm font-bold text-white">
                {pl.glyph}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#custom" className="btn-neon">
              Get social media for my business
            </Link>
            <Link href="/services/social-media" className="btn-ghost">
              See how it works
            </Link>
          </div>
        </div>

        {/* Visual: a phone-style stack of AI-generated posts */}
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
                <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" /> AI agent
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
