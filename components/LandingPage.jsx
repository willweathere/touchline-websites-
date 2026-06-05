"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { STORAGE_KEY, DEFAULTS } from "./formState";
import { packageFor } from "./constants";
import Nav from "./site/Nav";
import Hero from "./site/Hero";
import Pricing from "./site/Pricing";
import Capabilities from "./site/Capabilities";
import Features from "./site/Features";
import Growth from "./site/Growth";
import Work from "./site/Work";
import CustomRequest from "./site/CustomRequest";
import SiteFooter from "./site/SiteFooter";
import LeadForm from "./LeadForm";

export default function LandingPage() {
  const [step, setStep] = useState(1);
  const hydrated = useRef(false);

  const methods = useForm({ defaultValues: DEFAULTS, mode: "onTouched" });
  const { watch, reset, getValues, setValue } = methods;

  // Restore saved progress once on mount, then apply any ?plan= from a tier page.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        reset({ ...DEFAULTS, ...parsed.values });
        if (parsed.step) setStep(parsed.step);
      }
    } catch {
      /* ignore corrupt storage */
    }

    // Preselect a package if the user arrived from a tier page (/?plan=business).
    try {
      const plan = new URLSearchParams(window.location.search).get("plan");
      if (plan && packageFor(plan)) {
        setValue("selectedPackage", plan, { shouldDirty: true });
        setStep(5);
      }
    } catch {
      /* ignore */
    }

    hydrated.current = true;
    // Mount-only: reset/setValue are stable RHF methods.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on every change.
  useEffect(() => {
    const sub = watch((values) => {
      if (!hydrated.current) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, step }));
      } catch {
        /* storage unavailable */
      }
    });
    return () => sub.unsubscribe();
  }, [watch, step]);

  // Keep persisted step in sync.
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ values: getValues(), step }));
    } catch {
      /* ignore */
    }
  }, [step, getValues]);

  const scrollToId = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Edit links from the review screen: numbers jump form steps, strings scroll to a section.
  const goToStep = (target) => {
    if (typeof target === "number") setStep(target);
    else scrollToId(target);
  };

  return (
    <FormProvider {...methods}>
      <Nav />
      <main>
        <Hero />
        <Pricing />
        <Capabilities />
        <Features />
        <Growth />
        <Work />
        <CustomRequest />

        {/* Build-your-own custom site (separate from the 3 fixed packages) */}
        <section id="quote" className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-neon-cyan/15 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-neon-purple/15 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl px-4 py-16 sm:py-24">
            <div className="mx-auto mb-8 max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neon-cyan">
                <span className="h-2 w-2 rounded-full bg-neon-cyan shadow-glow-cyan" />
                Build your own
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Make your own <span className="neon-text">custom site</span>
              </h2>
              <p className="mt-3 text-slate-300">
                Not sure which package fits? Build it your way — pick your features, style and colours,
                and we'll tailor a quote just for you.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-300">
                {["Under 3 minutes", "No obligation", "Reply within 24h"].map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-neon-green" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <LeadForm step={step} setStep={setStep} goToStep={goToStep} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </FormProvider>
  );
}
