"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

// Add-on (NOT part of pricing). Values still flow into the main form, AND this
// section can fire a quick email straight to the owner via the Send button.
export default function CustomRequest() {
  const { register, getValues } = useFormContext();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const send = async () => {
    setError("");
    const message = (getValues("customRequest") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email.");
    if (!message) return setError("Tell us what you need first.");

    setStatus("sending");
    try {
      const res = await fetch("/api/custom-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: getValues("fullName"),
          message,
          needsAdvanced: getValues("needsAdvanced"),
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Failed to send.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Could not send. Please try again.");
    }
  };

  return (
    <section id="custom" className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <div className="card-surface relative overflow-hidden p-6 sm:p-9">
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-neon-purple/25 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-neon-cyan/15 blur-3xl" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-purple/40 bg-neon-purple/[0.08] px-3 py-1 text-xs font-bold uppercase tracking-widest text-neon-purple">
            Add-on
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Need something custom beyond these packages?
          </h2>
          <p className="mt-2 max-w-xl text-slate-300">
            Member areas, multi-language, bespoke integrations — if you can dream it, we can quote it.
            Drop us a line and we'll come back with ideas (this won't change your package price).
          </p>

          {status === "sent" ? (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-neon-green/40 bg-neon-green/[0.08] p-5">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 flex-shrink-0 text-neon-green" aria-hidden="true">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm font-medium text-white">
                Sent! We've got your request and will reply within 24 hours.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="customRequestField" className="text-sm font-semibold text-white">
                  Your idea
                </label>
                <textarea
                  id="customRequestField"
                  rows={3}
                  className="input-base resize-none"
                  placeholder="e.g. customer login area, multi-language, custom integrations…"
                  {...register("customRequest")}
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-neon-purple/30 bg-neon-purple/[0.06] p-4 text-sm font-medium text-white">
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer rounded border-white/30 bg-transparent accent-neon-purple"
                  {...register("needsAdvanced")}
                />
                My project needs advanced functionality
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  inputMode="email"
                  className="input-base sm:flex-1"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Your email address"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={status === "sending"}
                  className="btn-neon sm:w-auto"
                >
                  {status === "sending" ? "Sending…" : "Send request"}
                  {status !== "sending" && (
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>

              {error && <p className="text-sm font-medium text-neon-pink" role="alert">{error}</p>}
              <p className="text-xs text-slate-500">
                This sends straight to our team. Prefer the full builder? Use the form below.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
