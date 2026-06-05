import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import SiteFooter from "@/components/site/SiteFooter";
import WebsiteMockup from "@/components/site/WebsiteMockup";
import AddToCart from "@/components/cart/AddToCart";
import { PACKAGES, packageFor } from "@/components/constants";
import { tierDetailFor, capabilityFor } from "@/components/siteContent";

export function generateStaticParams() {
  return PACKAGES.map((p) => ({ tier: p.value }));
}

export async function generateMetadata({ params }) {
  const { tier } = await params;
  const pkg = packageFor(tier);
  if (!pkg) return { title: "Package not found — Touchline Websites" };
  return {
    title: `${pkg.name} package — £${pkg.setup} setup + £${pkg.monthly}/mo · Touchline Websites`,
    description: tierDetailFor(pkg.value)?.summary,
  };
}

export default async function TierPage({ params }) {
  const { tier } = await params;
  const pkg = packageFor(tier);
  const detail = tierDetailFor(tier);
  if (!pkg || !detail) notFound();

  const addOns = detail.addOns.map(capabilityFor).filter(Boolean);

  return (
    <>
      <Nav />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-neon-cyan/15 blur-3xl" />
          <div className="relative mx-auto max-w-5xl px-4 py-12 sm:py-16">
            <Link href="/#pricing" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-neon-cyan">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All packages
            </Link>

            <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{pkg.medal} package</p>
                <h1 className="mt-1 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{pkg.name}</h1>
                <p className="mt-3 max-w-xl text-slate-300">{detail.summary}</p>
              </div>
              <div className="flex-shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
                <p className="font-display text-3xl font-bold text-white">£{pkg.setup}</p>
                <p className="text-sm text-slate-400">setup</p>
                <p className="mt-1 text-sm font-semibold text-neon-cyan">+ £{pkg.monthly}/month</p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <AddToCart pkg={pkg} />
              <Link href="/#quote" className="btn-ghost">
                Or build your own custom site
              </Link>
            </div>
          </div>
        </section>

        {/* Previews */}
        <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <h2 className="font-display text-2xl font-bold text-white">What it could look like</h2>
          <p className="mt-1.5 text-slate-400">Example designs at the {pkg.name} level — yours is built around your brand.</p>
          <div className={`mt-7 grid gap-5 ${detail.mockups.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {detail.mockups.map((v) => (
              <WebsiteMockup key={v} variant={v} />
            ))}
          </div>
        </section>

        {/* What's included */}
        <section className="border-y border-white/5 bg-ink-900/40">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">What's included</h2>
                <ul className="mt-5 space-y-3">
                  {detail.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-slate-200">
                      <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 flex-shrink-0 text-neon-green" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Ideal for</h2>
                <p className="mt-5 text-slate-300">{detail.idealFor}</p>
                {addOns.length > 0 && (
                  <>
                    <p className="mt-8 text-sm font-bold uppercase tracking-widest text-neon-cyan">Popular add-ons</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {addOns.map((a) => (
                        <Link key={a.slug} href={`/services/${a.slug}`}
                          className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-slate-200 transition-colors hover:border-neon-cyan/50 hover:text-white">
                          {a.title}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">Ready to go with {pkg.name}?</h2>
          <p className="mt-3 text-slate-400">Add it to your cart, or send the details and we'll be in touch within 24 hours.</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <AddToCart pkg={pkg} />
            <Link href="/#pricing" className="btn-ghost">Compare packages</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
