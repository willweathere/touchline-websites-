"use client";

import { MOCKUPS } from "../siteContent";

// A stylised, code-rendered "website screenshot" inside a browser frame.
// No image files needed — looks like a real site preview and matches the theme.
export default function WebsiteMockup({ variant = "landing", className = "" }) {
  const m = MOCKUPS[variant] ?? MOCKUPS.landing;
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/50 ${className}`}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-ink-850 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-neon-pink/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-neon-green/60" />
        <span className="ml-2 truncate rounded bg-white/5 px-2 py-0.5 text-[9px] text-slate-400">
          {m.label.toLowerCase().replace(/\s+/g, "")}.co.uk
        </span>
      </div>
      {/* Page body */}
      <div className="relative p-3" style={{ minHeight: 150 }}>
        <Layout kind={m.kind} accent={m.accent} label={m.label} />
      </div>
    </div>
  );
}

function Bar({ w = "100%", h = 8, c = "rgba(255,255,255,0.12)", r = 4 }) {
  return <div style={{ width: w, height: h, background: c, borderRadius: r }} />;
}

function Layout({ kind, accent, label }) {
  const soft = `${accent}33`;
  return (
    <>
      {/* top nav */}
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[11px] font-bold" style={{ color: accent }}>{label}</div>
        <div className="flex gap-1.5">
          <Bar w={18} h={6} /><Bar w={18} h={6} /><Bar w={18} h={6} />
        </div>
      </div>

      {kind === "hero" && (
        <div className="space-y-2">
          <div className="rounded-lg p-3" style={{ background: `linear-gradient(135deg, ${soft}, transparent)` }}>
            <Bar w="70%" h={12} c={accent} />
            <div className="mt-2 space-y-1"><Bar w="90%" /><Bar w="60%" /></div>
            <div className="mt-2 inline-block rounded px-3 py-1" style={{ background: accent }}>
              <Bar w={34} h={6} c="rgba(0,0,0,0.5)" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md bg-white/[0.05] p-2"><Bar h={20} c={soft} /><div className="mt-1"><Bar w="80%" h={5} /></div></div>
            ))}
          </div>
        </div>
      )}

      {kind === "shop" && (
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-md bg-white/[0.05] p-1.5">
              <div className="rounded" style={{ height: 30, background: i % 2 ? soft : "rgba(255,255,255,0.08)" }} />
              <div className="mt-1.5"><Bar w="70%" h={5} /></div>
              <div className="mt-1"><Bar w={20} h={6} c={accent} /></div>
            </div>
          ))}
        </div>
      )}

      {kind === "booking" && (
        <div className="flex gap-2">
          <div className="flex-1 rounded-lg p-2" style={{ background: `linear-gradient(135deg, ${soft}, transparent)` }}>
            <Bar w="65%" h={10} c={accent} />
            <div className="mt-2 space-y-1"><Bar w="95%" /><Bar w="85%" /><Bar w="55%" /></div>
          </div>
          <div className="w-[42%] rounded-lg bg-white/[0.05] p-2">
            <Bar w="60%" h={6} />
            <div className="mt-2 grid grid-cols-4 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="rounded-sm" style={{ height: 10, background: i === 5 ? accent : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>
            <div className="mt-2 rounded py-1 text-center" style={{ background: accent }}><Bar w={28} h={5} c="rgba(0,0,0,0.5)" /></div>
          </div>
        </div>
      )}

      {kind === "grid" && (
        <div className="space-y-2">
          <Bar w="50%" h={10} c={accent} />
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-md" style={{ height: 38, background: i % 3 === 0 ? soft : "rgba(255,255,255,0.06)" }} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
