"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

// Industries — each swaps the business name, accent and copy.
const INDUSTRIES = [
  { key: "restaurant", label: "Restaurant", name: "Bella Cucina", accent: "#FF45C8", tagline: "Book a table", nav: ["Menu", "About", "Reviews", "Contact"], cta: "Reserve" },
  { key: "football", label: "Football Club", name: "Park United FC", accent: "#3DFFA8", tagline: "Match tickets", nav: ["Fixtures", "Teams", "News", "Shop"], cta: "Buy tickets" },
  { key: "gym", label: "Gym", name: "IronWorks Gym", accent: "#22E0FF", tagline: "Free trial", nav: ["Classes", "Pricing", "Trainers", "Join"], cta: "Start free" },
  { key: "construction", label: "Construction", name: "Apex Builders", accent: "#F97316", tagline: "Free quote", nav: ["Services", "Projects", "About", "Quote"], cta: "Get quote" },
  { key: "dentist", label: "Dentist", name: "Bright Smile Dental", accent: "#38BDF8", tagline: "Book check-up", nav: ["Treatments", "Team", "Prices", "Book"], cta: "Book now" },
  { key: "estate", label: "Estate Agent", name: "Prime Property", accent: "#9B5CFF", tagline: "View homes", nav: ["Buy", "Sell", "Rent", "Valuation"], cta: "Free valuation" },
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
  const [pos, setPos] = useState(62); // % from left; left = BEFORE, right = AFTER
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
  const itemActive = (ratio, i, n) => ratio * n >= i + 0.35;

  return (
    <section id="transform" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-cyan/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:py-24">
        {/* The whole showcase sits inside one bordered premium panel */}
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5 shadow-2xl shadow-black/40 sm:rounded-[2.5rem] sm:p-8 lg:p-10">
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
          <div
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            style={{ touchAction: "pan-y" }}
            className={`relative mx-auto mt-8 h-[360px] w-full select-none overflow-hidden rounded-2xl border bg-ink-900 shadow-2xl shadow-black/60 cursor-ew-resize transition-colors duration-300 sm:h-[520px]
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
                width: 80,
                transform: "translateX(-50%)",
                opacity: isDragging ? 1 : 0,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
              }}
            />

            {/* Corner badges */}
            <span
              className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-ink-950/75 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-200 backdrop-blur-sm transition-opacity"
              style={{ opacity: beforeEmphasis }}
            >
              Before
            </span>
            <span
              className="pointer-events-none absolute right-3 top-3 z-20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-950 transition-opacity"
              style={{ opacity: afterEmphasis, backgroundColor: ind.accent, boxShadow: `0 0 18px ${ind.accent}66` }}
            >
              After
            </span>
            <span className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-ink-950/75 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">
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

          {/* Trust + CTA */}
          <div className="mt-10 text-center">
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
      </div>
    </section>
  );
}

/* ---------------- Detailed "before" website (outdated, cluttered) ---------------- */

function BeforeSite({ ind }) {
  const Link2 = ({ children }) => (
    <span className="cursor-pointer text-blue-800 underline">{children}</span>
  );
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#e7e4d7] text-[#1a1a1a]" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      {/* top banner */}
      <div className="bg-[#7a1020] py-1 text-center text-[8px] font-bold tracking-wide text-yellow-200 sm:text-[11px]">
        ✦✦✦ WELCOME TO {ind.name.toUpperCase()} ✦✦✦ ~ UNDER CONSTRUCTION ~ SIGN OUR GUESTBOOK! ✦✦✦
      </div>
      {/* title + nav */}
      <div className="bg-[#1d3a8a] px-2 py-1 text-center">
        <div className="text-sm font-bold uppercase text-white underline sm:text-xl" style={{ letterSpacing: 1 }}>{ind.name}</div>
        <div className="mt-0.5 text-[7px] text-yellow-200 sm:text-[10px]">"The best {ind.label.toLowerCase()} in town since 1998"</div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-1 gap-y-0.5 border-y border-gray-400 bg-[#cfc9b4] px-1 py-0.5 text-[7px] sm:text-[10px]">
        <Link2>Home</Link2><span>|</span><Link2>About Us</Link2><span>|</span><Link2>Services</Link2><span>|</span>
        <Link2>Gallery</Link2><span>|</span><Link2>Price List</Link2><span>|</span><Link2>Guestbook</Link2><span>|</span><Link2>Contact</Link2>
      </div>

      {/* body: sidebar + content */}
      <div className="flex flex-1 gap-1.5 overflow-hidden p-1.5 text-[7px] sm:gap-2 sm:p-2.5 sm:text-[10px]">
        {/* sidebar */}
        <div className="w-[28%] space-y-1.5">
          <div className="border-2 border-gray-500 bg-[#fffbe6] p-1">
            <div className="bg-[#1d3a8a] text-center font-bold text-white">NAVIGATION</div>
            <div className="mt-0.5 space-y-0.5">
              <div>» <Link2>Home Page</Link2></div>
              <div>» <Link2>About Us</Link2></div>
              <div>» <Link2>Our Services</Link2></div>
              <div>» <Link2>Photo Gallery</Link2></div>
              <div>» <Link2>Testimonials</Link2></div>
              <div>» <Link2>Contact Us</Link2></div>
            </div>
          </div>
          <div className="border-2 border-gray-500 bg-[#e9ffe9] p-1 text-center">
            <div className="font-bold text-[#7a1020]">VISITORS</div>
            <div className="mt-0.5 inline-block bg-black px-1 font-mono text-[8px] text-[#39ff14] sm:text-[11px]">00142</div>
            <div className="mt-0.5 text-[6px] text-gray-600 sm:text-[8px]">people since 2009</div>
          </div>
          <div className="border border-gray-500 bg-gray-200 p-0.5 text-center text-[6px] sm:text-[9px]">
            <span className="underline">Sign our Guestbook!</span>
          </div>
          <div className="flex flex-wrap gap-0.5">
            {["#ie", "#w3c", "#★", "#new"].map((b) => (
              <span key={b} className="border border-gray-500 bg-[#444] px-0.5 text-[6px] text-white sm:text-[8px]">{b}</span>
            ))}
          </div>
        </div>

        {/* content */}
        <div className="flex-1 overflow-hidden">
          <div className="text-center text-[10px] font-bold text-[#7a1020] underline sm:text-base">Welcome to our Homepage!!!</div>
          <div className="float-right ml-1 mt-1 flex h-10 w-14 items-center justify-center border-2 border-dashed border-gray-400 bg-gray-200 text-[6px] text-gray-500 sm:h-16 sm:w-24 sm:text-[9px]">
            [ photo.jpg<br />not found ]
          </div>
          <p className="mt-1 text-justify leading-snug text-gray-800">
            Hello and welcome!!! We are the best {ind.label.toLowerCase()} in the local area and have been serving
            customers for over 20 years. Please feel free to have a look around our website. We hope you like it!
            For bookings and enquiries please call us on the number below or send us an email.
          </p>
          <p className="mt-1 leading-snug text-gray-800">
            <span className="bg-yellow-300 font-bold">★ NEW ★</span> We have updated our price list! Click{" "}
            <span className="text-blue-800 underline">here</span> to view.
          </p>
          <ul className="mt-1 list-disc pl-3 text-gray-800">
            <li>Open 9am - 5pm Monday to Friday</li>
            <li>Free parking available out the back</li>
            <li>Family run business, est. 1998</li>
          </ul>
          <div className="mt-1 border border-gray-500 bg-[#fffbe6] p-0.5 text-[6px] sm:text-[9px]">
            ☎ Tel: 01234 567 890 &nbsp; ✉ Email: <span className="text-blue-800 underline">info@{ind.name.toLowerCase().replace(/[^a-z]/g, "")}.co.uk</span>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="border-t border-gray-400 bg-[#cfc9b4] px-1 py-0.5 text-center text-[6px] text-gray-700 sm:text-[9px]">
        © 2009 {ind.name} · Best viewed in Internet Explorer 6 at 1024×768 · Last updated 14/03/2009 · [ Webring ]
      </div>
    </div>
  );
}

/* ---------------- Detailed "after" website (modern, multi-section) ---------------- */

function AfterSite({ ind }) {
  const a = ind.accent;
  const soft = `${a}26`;
  const Lines = ({ w = "100%", n = 2 }) => (
    <div className="space-y-1">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="h-1 rounded bg-white/12" style={{ width: i === n - 1 ? "70%" : w }} />
      ))}
    </div>
  );

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-ink-900 text-white">
      <div aria-hidden="true" className="absolute inset-0" style={{ background: `radial-gradient(120% 70% at 85% -10%, ${soft}, transparent)` }} />

      {/* sticky nav */}
      <div className="relative flex items-center justify-between border-b border-white/10 px-3 py-2 backdrop-blur-sm sm:px-5 sm:py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3.5 w-3.5 rounded-md sm:h-5 sm:w-5" style={{ backgroundColor: a }} />
          <span className="text-[10px] font-bold sm:text-sm">{ind.name}</span>
        </div>
        <div className="hidden items-center gap-3 text-[9px] text-slate-300 sm:flex sm:text-[11px]">
          {ind.nav.map((l) => <span key={l}>{l}</span>)}
          <span className="rounded-full px-2.5 py-1 text-[9px] font-bold text-ink-950 sm:text-[11px]" style={{ backgroundColor: a, boxShadow: `0 0 14px ${a}66` }}>{ind.cta}</span>
        </div>
      </div>

      {/* hero */}
      <div className="relative flex items-center gap-3 px-3 pt-3 sm:gap-5 sm:px-6 sm:pt-5">
        <div className="flex-1">
          <span className="inline-block rounded-full px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider sm:text-[9px]" style={{ color: a, backgroundColor: soft }}>
            ★ Rated 4.9 / 5
          </span>
          <h3 className="mt-1.5 font-display text-base font-bold leading-tight sm:text-3xl">
            {ind.name}
          </h3>
          <p className="mt-1 text-[8px] text-slate-300 sm:text-xs">Modern, fast and built to win you more customers — {ind.tagline.toLowerCase()} in seconds.</p>
          <div className="mt-2 flex gap-1.5">
            <span className="rounded-md px-2.5 py-1 text-[8px] font-bold text-ink-950 sm:text-xs" style={{ backgroundColor: a, boxShadow: `0 0 16px ${a}55` }}>{ind.cta}</span>
            <span className="rounded-md border border-white/20 px-2.5 py-1 text-[8px] font-semibold text-white sm:text-xs">Learn more</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[7px] text-slate-400 sm:text-[10px]">
            <span style={{ color: a }}>★★★★★</span> Trusted by 500+ customers
          </div>
        </div>
        {/* hero preview card */}
        <div className="hidden w-[36%] rounded-xl border border-white/10 bg-white/[0.04] p-2 sm:block">
          <div className="h-14 rounded-lg" style={{ background: `linear-gradient(135deg, ${soft}, transparent)` }} />
          <div className="mt-2"><Lines n={2} /></div>
          <div className="mt-2 h-4 w-1/2 rounded" style={{ backgroundColor: a }} />
        </div>
      </div>

      {/* stats strip */}
      <div className="relative mt-3 grid grid-cols-4 border-y border-white/10 sm:mt-5">
        {[["4.9★", "rating"], ["500+", "customers"], ["#1", "local"], ["24/7", "online"]].map(([n, l]) => (
          <div key={l} className="px-1 py-1.5 text-center sm:py-2.5">
            <div className="text-[10px] font-bold sm:text-base" style={{ color: a }}>{n}</div>
            <div className="text-[6px] text-slate-400 sm:text-[9px]">{l}</div>
          </div>
        ))}
      </div>

      {/* feature cards */}
      <div className="relative grid grid-cols-3 gap-2 px-3 py-3 sm:gap-3 sm:px-6 sm:py-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-white/[0.04] p-2">
            <span className="flex h-4 w-4 items-center justify-center rounded sm:h-6 sm:w-6" style={{ backgroundColor: soft }}>
              <span className="h-1.5 w-1.5 rounded-full sm:h-2.5 sm:w-2.5" style={{ backgroundColor: a }} />
            </span>
            <div className="mt-1.5 h-1.5 w-3/4 rounded bg-white/20 sm:h-2" />
            <div className="mt-1.5"><Lines n={2} /></div>
          </div>
        ))}
      </div>

      {/* gallery + footer */}
      <div className="relative mt-auto">
        <div className="grid grid-cols-4 gap-1.5 px-3 sm:px-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-7 rounded-md sm:h-10" style={{ background: i % 2 ? soft : "rgba(255,255,255,0.06)" }} />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 px-3 py-1.5 text-[7px] text-slate-400 sm:px-6 sm:text-[10px]">
          <span className="font-semibold text-white">{ind.name}</span>
          <span className="hidden sm:inline">{ind.nav.join("  ·  ")}</span>
          <span>© 2026</span>
        </div>
      </div>
    </div>
  );
}
