"use client";

import { useEffect, useRef, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import ProgressBar from "./ProgressBar";
import { Field, OptionCard, StepNav, Spinner } from "./ui";
import Summary from "./Summary";
import { STORAGE_KEY, STEP_FIELDS } from "./formState";
import {
  WEBSITE_TYPES,
  BUSINESS_TYPES,
  FEATURES,
  PACKAGES,
  STEPS,
} from "./constants";

const SWATCHES = [
  "#22E0FF", "#3DFFA8", "#FF45C8", "#9B5CFF",
  "#F97316", "#FACC15", "#38BDF8", "#FFFFFF",
];

// Consumes the shared react-hook-form context provided by LandingPage.
export default function LeadForm({ goToStep, step, setStep }) {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const topRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext();

  // Scroll the form into view when the user advances a step — but NOT on first
  // mount/reload, otherwise restoring a saved step jumps the page to the bottom.
  const didMount = useRef(false);
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const goNext = async () => {
    const ok = await trigger(STEP_FIELDS[step]);
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length));
  };
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data) => {
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      localStorage.removeItem(STORAGE_KEY);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Could not submit. Please try again.");
    }
  };

  if (status === "success") {
    return <SuccessScreen email={getValues("email")} />;
  }

  return (
    <div
      ref={topRef}
      className="card-surface p-5 shadow-2xl shadow-black/40 sm:p-7"
    >
      <ProgressBar current={step} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div key={step} className="animate-fade-in">
          {/* STEP 1 — Business details */}
          {step === 1 && (
            <Section heading="Let's start with you" sub="So we know who to send your quote to.">
              <Field label="Full name" htmlFor="fullName" error={errors.fullName?.message}>
                <input id="fullName" className="input-base" placeholder="Jane Smith" autoComplete="name"
                  {...register("fullName", { required: "Please enter your name." })} />
              </Field>
              <Field label="Email address" htmlFor="email" error={errors.email?.message}>
                <input id="email" type="email" inputMode="email" className="input-base"
                  placeholder="jane@business.co.uk" autoComplete="email"
                  {...register("email", {
                    required: "Please enter your email.",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address." },
                  })} />
              </Field>
              <Field label="Business name" htmlFor="businessName" error={errors.businessName?.message}>
                <input id="businessName" className="input-base" placeholder="Smith & Co." autoComplete="organization"
                  {...register("businessName", { required: "Please enter your business name." })} />
              </Field>
              <Field label="Phone number" htmlFor="phone" optional error={errors.phone?.message}>
                <input id="phone" type="tel" inputMode="tel" className="input-base"
                  placeholder="07123 456789" autoComplete="tel" {...register("phone")} />
              </Field>
            </Section>
          )}

          {/* STEP 2 — Website type */}
          {step === 2 && (
            <Section heading="What do you need?" sub="Pick the option that fits best.">
              <Controller
                control={control}
                name="websiteType"
                rules={{ required: "Please choose a website type." }}
                render={({ field }) => (
                  <Group label="Website type" error={errors.websiteType?.message}>
                    {WEBSITE_TYPES.map((o) => (
                      <OptionCard key={o.value} title={o.label} hint={o.hint}
                        selected={field.value === o.value} onClick={() => field.onChange(o.value)} />
                    ))}
                  </Group>
                )}
              />
              <Controller
                control={control}
                name="businessType"
                rules={{ required: "Please choose your business type." }}
                render={({ field }) => (
                  <Group label="Business type" error={errors.businessType?.message} className="mt-6">
                    <div className="grid grid-cols-2 gap-3">
                      {BUSINESS_TYPES.map((o) => (
                        <OptionCard key={o.value} title={o.label}
                          selected={field.value === o.value} onClick={() => field.onChange(o.value)} />
                      ))}
                    </div>
                  </Group>
                )}
              />
            </Section>
          )}

          {/* STEP 3 — Features */}
          {step === 3 && (
            <Section heading="Which features do you need?" sub="Select all that apply — you can change these later.">
              <Controller
                control={control}
                name="features"
                render={({ field }) => {
                  const toggle = (val) => {
                    // Read the freshest value from RHF (not the render closure) so
                    // multiple quick taps don't clobber each other.
                    const set = new Set(getValues("features") || []);
                    set.has(val) ? set.delete(val) : set.add(val);
                    field.onChange([...set]);
                  };
                  return (
                    <div className="space-y-3">
                      {FEATURES.map((o) => (
                        <OptionCard key={o.value} title={o.label} multi
                          selected={field.value?.includes(o.value)} onClick={() => toggle(o.value)} />
                      ))}
                    </div>
                  );
                }}
              />
            </Section>
          )}

          {/* STEP 4 — Design preferences */}
          {step === 4 && (
            <Section heading="Make it yours" sub="Help us match your brand and style.">
              <Controller
                control={control}
                name="primaryColor"
                rules={{
                  required: "Please choose a colour.",
                  pattern: { value: /^#([0-9A-Fa-f]{6})$/, message: "Use a 6-digit HEX colour." },
                }}
                render={({ field }) => (
                  <Field label="Primary brand colour" error={errors.primaryColor?.message}>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <HexColorPicker color={field.value} onChange={field.onChange} />
                      <div className="mt-4 flex items-center gap-3">
                        <span className="h-11 w-11 flex-shrink-0 rounded-xl border border-white/20"
                          style={{ backgroundColor: field.value }} aria-hidden="true" />
                        <input aria-label="HEX colour value" className="input-base font-mono uppercase"
                          value={field.value}
                          onChange={(e) => {
                            let v = e.target.value.trim();
                            if (v && !v.startsWith("#")) v = "#" + v;
                            field.onChange(v.slice(0, 7));
                          }} />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {SWATCHES.map((c) => (
                          <button key={c} type="button" aria-label={`Choose colour ${c}`}
                            onClick={() => field.onChange(c)}
                            className={`h-9 w-9 cursor-pointer rounded-lg border-2 transition-transform
                              ${field.value?.toUpperCase() === c ? "border-white" : "border-white/10"}`}
                            style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                  </Field>
                )}
              />

              <Field label="Example websites you like" htmlFor="exampleWebsites" optional>
                <input id="exampleWebsites" className="input-base"
                  placeholder="https://a-site-you-love.com" {...register("exampleWebsites")} />
              </Field>

              <Field label="Describe your ideal website style" htmlFor="styleDescription" optional>
                <textarea id="styleDescription" rows={3} className="input-base resize-none"
                  placeholder="Bold and modern, dark theme, neon accents, easy to book…"
                  {...register("styleDescription")} />
              </Field>
            </Section>
          )}

          {/* STEP 5 — Pricing */}
          {step === 5 && (
            <Section heading="Choose your package" sub="No hidden fees. Cancel the monthly plan anytime.">
              <Controller
                control={control}
                name="selectedPackage"
                rules={{ required: "Please select a package." }}
                render={({ field }) => (
                  <Group error={errors.selectedPackage?.message}>
                    <div className="space-y-3">
                      {PACKAGES.map((p) => (
                        <PackageCard key={p.value} pkg={p}
                          selected={field.value === p.value} onClick={() => field.onChange(p.value)} />
                      ))}
                    </div>
                  </Group>
                )}
              />
            </Section>
          )}

          {/* STEP 6 — Review & submit */}
          {step === 6 && (
            <Section heading="Quick review" sub="Check everything looks right, then send it over.">
              <Summary values={watch()} onEdit={goToStep} />
              {status === "error" && (
                <p className="mt-4 rounded-xl border border-neon-pink/40 bg-neon-pink/10 px-4 py-3 text-sm font-medium text-neon-pink" role="alert">
                  {errorMsg}
                </p>
              )}
            </Section>
          )}
        </div>

        {/* Navigation */}
        {step < 6 ? (
          <StepNav onBack={goBack} onNext={goNext} backDisabled={step === 1} />
        ) : (
          <div className="mt-7 flex items-center gap-3">
            <button type="button" onClick={goBack} className="btn-ghost px-5 py-3.5">Back</button>
            <button type="submit" disabled={status === "submitting"} className="btn-neon flex-1 px-5 py-4">
              {status === "submitting" && <Spinner />}
              {status === "submitting" ? "Sending…" : "Send my enquiry"}
            </button>
          </div>
        )}
      </form>

      <p className="mt-5 text-center text-xs text-slate-500">
        Your details are private and never shared. We reply within 24 hours.
      </p>
    </div>
  );
}

function Section({ heading, sub, children }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
        {heading}
      </h2>
      {sub && <p className="mt-1.5 text-slate-400">{sub}</p>}
      <div className="mt-6 space-y-5">{children}</div>
    </div>
  );
}

function Group({ label, error, className = "", children }) {
  return (
    <div className={className}>
      {label && <p className="mb-3 text-sm font-semibold text-white">{label}</p>}
      {children}
      {error && <p className="mt-2 text-sm font-medium text-neon-pink" role="alert">{error}</p>}
    </div>
  );
}

function PackageCard({ pkg, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`relative w-full cursor-pointer rounded-2xl border p-5 text-left transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-neon-cyan/40
        ${selected ? "border-neon-cyan bg-neon-cyan/10 shadow-glow-cyan" : "border-white/10 bg-white/[0.03] hover:border-white/25"}`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 right-4 rounded-full bg-neon-pink px-3 py-1 text-xs font-bold text-ink-950 shadow-glow-pink">
          {pkg.tagline}
        </span>
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{pkg.medal}</p>
          <p className="text-xl font-extrabold text-white">{pkg.name}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-extrabold text-white">£{pkg.setup}</p>
          <p className="text-sm font-medium text-slate-400">setup</p>
          <p className="mt-0.5 text-sm font-semibold text-neon-cyan">+ £{pkg.monthly}/mo</p>
        </div>
      </div>
      <ul className="mt-4 space-y-1.5">
        {pkg.perks.map((perk) => (
          <li key={perk} className="flex items-center gap-2 text-sm text-slate-300">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 flex-shrink-0 text-neon-green" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {perk}
          </li>
        ))}
      </ul>
    </button>
  );
}

function SuccessScreen({ email }) {
  return (
    <div className="card-surface animate-fade-in p-8 text-center shadow-2xl shadow-black/40">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-neon-cyan to-neon-green text-ink-950 shadow-glow-green">
        <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-white">
        Enquiry sent — thank you!
      </h2>
      <p className="mx-auto mt-2 max-w-sm text-slate-400">
        We've emailed a copy to{" "}
        <span className="font-semibold text-white">{email}</span>. Our team will be in touch
        within <span className="font-semibold text-neon-cyan">24 hours</span>.
      </p>
    </div>
  );
}
