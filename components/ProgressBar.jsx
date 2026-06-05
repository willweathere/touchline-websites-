"use client";

import { STEPS } from "./constants";

export default function ProgressBar({ current }) {
  const total = STEPS.length;
  const pct = Math.round((current / total) * 100);
  const title = STEPS[current - 1]?.title ?? "";

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-baseline justify-between">
        <p className="text-sm font-bold text-white">
          Step {current} of {total}
          <span className="ml-2 font-medium text-slate-400">· {title}</span>
        </p>
        <p className="text-sm font-semibold text-neon-cyan">{pct}%</p>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Form progress: step ${current} of ${total}`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-green shadow-glow-green transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
