"use client";

import { SectionHeading } from "./Pricing";

// Monthly customer-enquiry trend (illustrative). Replace with real numbers anytime.
const DATA = [12, 18, 22, 30, 41, 52, 64, 79, 92, 110, 128, 150];
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const STATS = [
  { value: "+312%", label: "More enquiries in 6 months" },
  { value: "2.4×", label: "More customers on average" },
  { value: "< 1s", label: "Average page load time" },
  { value: "24h", label: "Typical reply time" },
];

export default function Growth() {
  const W = 600, H = 240, pad = 16;
  const max = Math.max(...DATA);
  const stepX = (W - pad * 2) / (DATA.length - 1);
  const points = DATA.map((v, i) => {
    const x = pad + i * stepX;
    const y = H - pad - (v / max) * (H - pad * 2);
    return [x, y];
  });
  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${points[points.length - 1][0].toFixed(1)},${H - pad} L${points[0][0].toFixed(1)},${H - pad} Z`;

  return (
    <section id="results" className="border-y border-white/5 bg-ink-900/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <SectionHeading
          eyebrow="Real results"
          title="Websites that grow your customer base"
          sub="A great site doesn't just look good — it brings in more enquiries, bookings and sales, month after month."
        />

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-5">
          {/* Chart */}
          <div className="card-surface p-5 sm:p-6 lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Monthly customer enquiries</p>
                <p className="font-display text-2xl font-bold text-neon-green">▲ Trending up</p>
              </div>
              <span className="rounded-full border border-neon-green/40 bg-neon-green/[0.08] px-3 py-1 text-xs font-semibold text-neon-green">
                Last 12 months
              </span>
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Line chart showing customer enquiries rising over 12 months">
              <defs>
                <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3DFFA8" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#3DFFA8" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="growthLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22E0FF" />
                  <stop offset="100%" stopColor="#3DFFA8" />
                </linearGradient>
              </defs>

              {/* gridlines */}
              {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1={pad} x2={W - pad} y1={pad + g * (H - pad * 2)} y2={pad + g * (H - pad * 2)}
                  stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              ))}

              <path d={area} fill="url(#growthFill)" />
              <path d={line} fill="none" stroke="url(#growthLine)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {points.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i === points.length - 1 ? 5 : 2.5}
                  fill={i === points.length - 1 ? "#3DFFA8" : "#22E0FF"} />
              ))}

              {MONTHS.map((m, i) => (
                <text key={i} x={pad + i * stepX} y={H - 2} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.35)">{m}</text>
              ))}
            </svg>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="font-display text-3xl font-bold text-neon-green">{s.value}</p>
                <p className="mt-1 text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-slate-500">
          Figures are illustrative of typical results for clients who move from no site (or an old one) to a fast, modern, SEO-ready website.
        </p>
      </div>
    </section>
  );
}
