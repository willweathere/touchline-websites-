"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

// Industries — each just swaps the business name, accent and "after" layout.
const INDUSTRIES = [
  { key: "restaurant", label: "Restaurant", name: "Bella Cucina", accent: "#FF45C8", tagline: "Book a table tonight" },
  { key: "football", label: "Football Club", name: "Park United FC", accent: "#3DFFA8", tagline: "Fixtures, news & tickets" },
  { key: "gym", label: "Gym", name: "IronWorks Gym", accent: "#22E0FF", tagline: "Start your free trial" },
  { key: "construction", label: "Construction", name: "Apex Builders", accent: "#F97316", tagline: "Get a free quote" },
  { key: "dentist", label: "Dentist", name: "Bright Smile Dental", accent: "#38BDF8", tagline: "Book your check-up" },
  { key: "estate", label: "Estate Agent", name: "Prime Property", accent: "#9B5CFF", tagline: "Find your next home" },
];

const BEFORE_CONS = [
  "Outdated design", "Slow loading", "Poor on mobile", "Hard to contact",
  "Confusing layout", "No clear call to action", "Low trust",
];
const AFTER_PROS = [
  "Modern design", "Lightning fast", "Mobile optimised", "Easy to contact",
  "Clean, clear layout", "Built to generate leads", "Professional branding",
];

const TRUST = [
  { icon: "⭐", text: "Modern, professional appearance" },
  { icon: "📱", text: "Perfect on every device" },
  { icon: "⚡", text: "Fast loading" },
  { icon: "📈", text: "Built to convert visitors into customers" },
];

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(68); // % from left; left = BEFORE, right = AFTER
  const [isDragging, setIsDragging] = useState(false);
  const ind = INDUSTRIES[active];

  const containerRef = useRef(null);
  const dragging = useRef(false);
  const raf = useRef(0);
  const lastX = useRef(0);

  const apply = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  // rAF-throttled update keeps the drag smooth (one update per frame).
  const schedule = useCallback(
    (clientX) => {
      lastX.current = clientX;
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        apply(lastX.current);
      });
    },
    [apply]
  );

  useEffect(() => () => raf.current && cancelAnimationFrame(raf.current), []);

  const onPointerDown = (e) => {
    dragging.current = true;
    setIsDragging(true);
    containerRef.current?.setPointerCapture?.(e.pointerId);
    document.body.style.userSelect = "none";
    apply(e.clientX);
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    schedule(e.clientX);
  };
  const endDrag = () => {
    dragging.current = false;
    setIsDragging(false);
    document.body.style.userSelect = "";
  };

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") { setPos((p) => Math.max(0, p - step)); e.preventDefault(); }
    else if (e.key === "ArrowRight") { setPos((p) => Math.min(100, p + step)); e.preventDefault(); }
    else if (e.key === "Home") { setPos(0); e.preventDefault(); }
    else if (e.key === "End") { setPos(100); e.preventDefault(); }
  };

  const beforeRatio = pos / 100;
  const afterRatio = 1 - pos / 100;
  const beforeEmphasis = 0.55 + 0.45 * beforeRatio;
  const afterEmphasis = 0.55 + 0.45 * afterRatio;
  // Each callout lights up progressively as the slider reveals its side.
  const itemActive = (ratio, i, n) => ratio * n >= i + 0.35;

  return (
    <section id="transform" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-cyan/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-neon-cyan">The transformation</p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            See what your website could become
          </h2>
          <p className="mt-3 text-lg text-slate-300">
            Drag the slider to reveal how a modern, conversion-focused website can transform your business.
          </p>
        </div>

        {/* Industry selector */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {INDUSTRIES.map((i, idx) => (
            <button
              key={i.key}
              type="button"
              onClick={() => setActive(idx)}
              aria-pressed={idx === active}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300
                ${idx === active
                  ? "border-transparent text-ink-950"
                  : "border-white/12 bg-white/[0.03] text-slate-300 hover:border-white/30 hover:text-white"}`}
              style={idx === active ? { backgroundColor: i.accent, boxShadow: `0 0 22px ${i.accent}66` } : undefined}
            >
              {i.label}
            </button>
          ))}
        </div>

        {/* Comparison */}
        <div className="mt-8">
          <div
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            style={{ touchAction: "pan-y" }}
            className={`relative mx-auto aspect-[16/10] w-full select-none overflow-hidden rounded-3xl border bg-ink-900 shadow-2xl shadow-black/60 cursor-ew-resize transition-shadow duration-300
              ${isDragging ? "border-neon-cyan/50" : "border-white/12"}`}
          >
            {/* BEFORE (base layer) */}
            <div key={`b-${ind.key}`} className="absolute inset-0 animate-fade-in">
              <BeforeSite ind={ind} />
            </div>

            {/* AFTER (clipped to the right of the handle) */}
            <div
              key={`a-${ind.key}`}
              className="absolute inset-0 animate-fade-in"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            >
              <AfterSite ind={ind} />
            </div>

            {/* Glossy glass sheen that rides with the handle while dragging */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 z-[15] transition-opacity duration-200"
              style={{
                left: `${pos}%`,
                width: 72,
                transform: "translateX(-50%)",
                opacity: isDragging ? 1 : 0,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
              }}
            />

            {/* Corner badges */}
            <span
              className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-ink-950/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-300 backdrop-blur-sm transition-opacity"
              style={{ opacity: beforeEmphasis }}
            >
              Before
            </span>
            <span
              className="pointer-events-none absolute right-3 top-3 z-20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-950 backdrop-blur-sm transition-opacity"
              style={{ opacity: afterEmphasis, backgroundColor: ind.accent, boxShadow: `0 0 18px ${ind.accent}66` }}
            >
              After
            </span>
            <span className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">
              ← Drag to compare →
            </span>

            {/* Neon divider line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 z-20 w-[2px] -translate-x-1/2"
              style={{
                left: `${pos}%`,
                background: "linear-gradient(180deg, #22E0FF, #3DFFA8)",
                boxShadow: isDragging ? "0 0 18px rgba(34,224,255,0.9)" : "0 0 10px rgba(34,224,255,0.55)",
              }}
            />

            {/* Glass neon handle */}
            <div
              role="slider"
              tabIndex={0}
              aria-label="Drag to compare the before and after website"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              onKeyDown={onKeyDown}
              className={`absolute top-1/2 z-30 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-neon-cyan/60 bg-white/15 backdrop-blur-md transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-neon-cyan/60 sm:h-14 sm:w-14
                ${isDragging ? "scale-110" : "hover:scale-105"}`}
              style={{
                left: `${pos}%`,
                boxShadow: isDragging
                  ? "0 0 0 5px rgba(34,224,255,0.18), 0 10px 34px rgba(0,0,0,0.55), 0 0 28px rgba(61,255,168,0.55)"
                  : "0 8px 30px rgba(0,0,0,0.5), 0 0 16px rgba(34,224,255,0.4)",
              }}
            >
              <span aria-hidden="true" className="absolute inset-0 rounded-full bg-gradient-to-br from-white/25 to-transparent" />
              <svg viewBox="0 0 24 24" fill="none" className="relative h-5 w-5 text-white drop-shadow" aria-hidden="true">
                <path d="M11 7l-5 5 5 5M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Callouts — light up progressively as the slider reveals each side */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-opacity duration-300" style={{ opacity: beforeEmphasis }}>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Before</p>
              <ul className="mt-3 space-y-2">
                {BEFORE_CONS.map((c, i) => {
                  const on = itemActive(beforeRatio, i, BEFORE_CONS.length);
                  return (
                    <li key={c} className="flex items-center gap-2.5 text-sm text-slate-400"
                      style={{ opacity: on ? 1 : 0.3, filter: on ? "none" : "blur(1.5px)", transform: on ? "none" : "translateY(4px)", transition: "all .35s ease" }}>
                      <span className="text-neon-pink">✕</span> {c}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="rounded-2xl border border-neon-green/20 bg-neon-green/[0.04] p-5 transition-opacity duration-300" style={{ opacity: afterEmphasis }}>
              <p className="text-xs font-bold uppercase tracking-widest text-neon-green">After</p>
              <ul className="mt-3 space-y-2">
                {AFTER_PROS.map((p, i) => {
                  const on = itemActive(afterRatio, i, AFTER_PROS.length);
                  return (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-slate-200"
                      style={{ opacity: on ? 1 : 0.3, filter: on ? "none" : "blur(1.5px)", transform: on ? "none" : "translateY(4px)", transition: "all .35s ease" }}>
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 flex-shrink-0 text-neon-green" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {p}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Trust + CTA */}
        <div className="mt-12 text-center">
          <p className="font-display text-2xl font-bold text-white sm:text-3xl">Imagine this being your business.</p>
          <div className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
            {TRUST.map((t) => (
              <div key={t.text} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left">
                <span className="text-xl">{t.icon}</span>
                <span className="text-sm font-medium text-slate-200">{t.text}</span>
              </div>
            ))}
          </div>

          <Link href="/#quote" className="btn-neon group mt-8 text-base">
            Get my free website mockup
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- The two rendered "websites" (no images) ---------------- */

function BeforeSite({ ind }) {
  return (
    <div className="h-full w-full overflow-hidden bg-[#e9e7e0] text-[#222]" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      <div className="bg-[#1d3a8a] px-2 py-1 text-center text-[9px] text-white sm:text-[11px]">
        ★ Welcome to {ind.name} ★ — Best viewed at 1024×768
      </div>
      <div className="p-3 text-center sm:p-6">
        <div className="text-base font-bold uppercase tracking-tight text-[#7a1f1f] underline sm:text-2xl">{ind.name}</div>
        <div className="mt-1 text-[9px] italic text-blue-800 underline sm:text-xs">Home | About Us | Services | Gallery | Contact</div>
        <div className="mx-auto mt-3 flex h-12 w-3/4 items-center justify-center border-2 border-dashed border-gray-400 bg-gray-200 text-[8px] text-gray-500 sm:h-20 sm:text-[10px]">
          [ logo image not found ]
        </div>
        <p className="mx-auto mt-3 max-w-md text-[8px] leading-snug text-gray-700 sm:text-[11px]">
          Welcome to our website!!! We are the best {ind.label.toLowerCase()} in the area. Please feel free to look
          around. Call us on 01234 567890 or email below for more info. Thank you for visiting our homepage.
        </p>
        <div className="mt-2 inline-block border border-gray-500 bg-gray-300 px-2 py-1 text-[8px] sm:text-[10px]">
          Click here to email us
        </div>
        <div className="mt-3 text-[7px] text-gray-500 sm:text-[9px]">Visitor counter: 000142 · Last updated 14/03/2009</div>
      </div>
    </div>
  );
}

function AfterSite({ ind }) {
  const soft = `${ind.accent}26`;
  return (
    <div className="relative h-full w-full overflow-hidden bg-ink-900 text-white">
      <div aria-hidden="true" className="absolute inset-0" style={{ background: `radial-gradient(120% 80% at 80% -10%, ${soft}, transparent)` }} />
      {/* nav */}
      <div className="relative flex items-center justify-between px-3 py-2 sm:px-5 sm:py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded sm:h-4 sm:w-4" style={{ backgroundColor: ind.accent }} />
          <span className="text-[10px] font-bold sm:text-sm">{ind.name}</span>
        </div>
        <div className="hidden items-center gap-3 text-[9px] text-slate-400 sm:flex sm:text-[11px]">
          <span>Home</span><span>About</span><span>Services</span>
          <span className="rounded-full px-2.5 py-1 text-[9px] font-bold text-ink-950 sm:text-[11px]" style={{ backgroundColor: ind.accent }}>
            {ind.tagline.split(" ")[0]}
          </span>
        </div>
      </div>
      {/* hero */}
      <div className="relative px-3 pt-3 sm:px-6 sm:pt-6">
        <h3 className="font-display text-lg font-bold leading-tight sm:text-3xl">{ind.name}</h3>
        <p className="mt-1 max-w-[80%] text-[9px] text-slate-300 sm:text-sm">{ind.tagline} — modern, fast and built to win you customers.</p>
        <div className="mt-2.5 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[9px] font-bold text-ink-950 sm:text-xs" style={{ backgroundColor: ind.accent, boxShadow: `0 0 18px ${ind.accent}55` }}>
          {ind.tagline}
        </div>
      </div>
      {/* cards */}
      <div className="relative mt-3 grid grid-cols-3 gap-2 px-3 sm:mt-5 sm:gap-3 sm:px-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
            <div className="h-1.5 w-8 rounded sm:h-2 sm:w-12" style={{ backgroundColor: ind.accent }} />
            <div className="mt-1.5 h-1 w-full rounded bg-white/15" />
            <div className="mt-1 h-1 w-2/3 rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
