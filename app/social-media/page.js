import Link from "next/link";
import Nav from "@/components/site/Nav";
import SiteFooter from "@/components/site/SiteFooter";
import Reveal from "@/components/Reveal";
import AddToCart from "@/components/cart/AddToCart";
import { SOCIAL_PLANS } from "@/components/siteContent";

export const metadata = {
  title: "Social media management — from £50/month · Touchline Websites",
  description:
    "Done-for-you social media. We plan, create and schedule consistent posts for your business across every platform. Monthly plans from £50.",
};

const STEPS = [
  { n: "1", title: "We learn your brand", text: "A quick chat about your business, your tone and what you want to shout about." },
  { n: "2", title: "We create & plan", text: "We write posts, design graphics and build a content calendar for the month." },
  { n: "3", title: "You approve", text: "You get the month's posts to review — tweak anything, then give the thumbs up." },
  { n: "4", title: "We post, consistently", text: "We publish at the best times across your platforms and keep an eye on engagement." },
];

export default function SocialMediaPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-neon-pink/15 blur-3xl" />
            <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-neon-purple/15 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
            <Link href="/#social" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-neon-cyan">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to home
            </Link>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-neon-pink/40 bg-neon-pink/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neon-pink">
              <span className="h-2 w-2 rounded-full bg-neon-pink shadow-glow-pink" />
              Done-for-you social media
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
              Consistent posts, <span className="neon-text">every week</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              We plan, create and schedule your social media so your business stays active and
              consistent — without you ever opening the apps. Simple monthly plans, cancel anytime.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-neon-cyan">Monthly plans</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pick your pace
            </h2>
            <p className="mt-3 text-slate-400">All plans are rolling monthly — no contracts, cancel anytime.</p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {SOCIAL_PLANS.map((p, i) => (
              <Reveal key={p.value} delay={i * 90} className="h-full">
                <div className={`relative flex h-full flex-col rounded-3xl border p-6
                  ${p.popular
                    ? "border-neon-cyan/60 bg-neon-cyan/[0.06] shadow-glow-cyan"
                    : "border-white/10 bg-white/[0.03]"}`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neon-pink px-3 py-1 text-xs font-bold text-ink-950 shadow-glow-pink">
                      {p.tagline}
                    </span>
                  )}
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{p.medal}</p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-white">{p.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{p.summary}</p>

                  <div className="mt-4 flex items-end gap-1">
                    <span className="font-display text-4xl font-bold text-white">£{p.monthly}</span>
                    <span className="mb-1 text-sm text-slate-400">/month</span>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 text-sm text-slate-200">
                        <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-green" aria-hidden="true">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 space-y-2">
                    <AddToCart
                      pkg={{ value: p.value, name: p.name, setup: 0, monthly: p.monthly, kind: "social" }}
                      className={`w-full ${p.popular ? "btn-neon" : "btn-ghost"}`}
                    />
                    <Link href="/#custom" className="block text-center text-sm font-medium text-slate-400 hover:text-neon-cyan">
                      Or enquire first
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-slate-500">
            Want a website <span className="text-slate-300">and</span> social media? Mention it when you get in
            touch and we'll bundle them.
          </p>
        </section>

        {/* How it works */}
        <section className="border-y border-white/5 bg-ink-900/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-neon-cyan">How it works</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Hands-off, start to finish
              </h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 90} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-neon-cyan to-neon-green font-display text-lg font-bold text-ink-950">
                      {s.n}
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-white">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">Ready to stay consistent?</h2>
          <p className="mt-3 text-slate-400">Tell us about your business and we'll get your socials sorted.</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/#custom" className="btn-neon">Get started</Link>
            <Link href="/#pricing" className="btn-ghost">See website prices</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
