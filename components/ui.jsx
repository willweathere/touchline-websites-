"use client";

// Small, reusable presentational pieces shared across the form steps (dark/neon).

export function Field({ label, htmlFor, error, optional, children }) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-2 text-sm font-semibold text-white"
      >
        {label}
        {optional && (
          <span className="text-xs font-medium text-slate-500">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-sm font-medium text-neon-pink" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// A large, tap-friendly selectable card (radio or checkbox styling).
export function OptionCard({ selected, onClick, title, hint, multi = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left
        transition-colors duration-200 cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-neon-cyan/40
        ${
          selected
            ? "border-neon-cyan bg-neon-cyan/10 shadow-glow-cyan"
            : "border-white/10 bg-white/[0.03] hover:border-white/25"
        }`}
    >
      <span
        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 transition-colors
          ${multi ? "rounded-md" : "rounded-full"}
          ${selected ? "border-neon-cyan bg-neon-cyan text-ink-950" : "border-white/25 bg-transparent"}`}
        aria-hidden="true"
      >
        {selected && (
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="min-w-0">
        <span className="block font-semibold text-white">{title}</span>
        {hint && <span className="block text-sm text-slate-400">{hint}</span>}
      </span>
    </button>
  );
}

// Footer navigation buttons (Back / Continue).
export function StepNav({ onBack, onNext, nextLabel = "Continue", backDisabled, nextDisabled, submitting }) {
  return (
    <div className="mt-7 flex items-center gap-3">
      {!backDisabled && (
        <button
          type="button"
          onClick={onBack}
          className="btn-ghost px-5 py-3.5"
        >
          Back
        </button>
      )}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled || submitting}
        className="btn-neon flex-1 px-5 py-3.5"
      >
        {submitting && <Spinner />}
        {nextLabel}
      </button>
    </div>
  );
}

export function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
