import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/site/Nav";
import SiteFooter from "@/components/site/SiteFooter";
import WebsiteMockup from "@/components/site/WebsiteMockup";
import { CAPABILITIES, capabilityFor } from "@/components/siteContent";

export function generateStaticParams() {
  return CAPABILITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cap = capabilityFor(slug);
  if (!cap) return { title: "Service not found — Touchline Websites" };
  return { title: `${cap.title} · Touchline Websites`, description: cap.blurb };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const cap = capabilityFor(slug);
  if (!cap) notFound();

  const others = CAPABILITIES.filter((c) => c.slug !== cap.slug).slice(0, 3);

  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-white/5">
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-neon-purple/15 blur-3xl" />
          <div className="relative mx-auto max-w-5xl px-4 py-12 sm:py-16">
            <Link href="/#capabilities" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-neon-cyan">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All capabilities
            </Link>

            <div className="mt-5 grid gap-8 sm:grid-cols-2 sm:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-neon-cyan">Capability</p>
                <h1 className="mt-1 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{cap.title}</h1>
                <p className="mt-4 text-lg leading-relaxed text-slate-300">{cap.blurb}</p>
                <Link href="/#quote" className="btn-neon mt-7">Add this to my site</Link>
              </div>
              <WebsiteMockup variant={cap.mockup} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <h2 className="font-display text-2xl font-bold text-white">What you get</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {cap.details.map((d) => (
              <div key={d} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 flex-shrink-0 text-neon-green" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-slate-200">{d}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Explore others */}
        <section className="border-t border-white/5 bg-ink-900/40">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
            <h2 className="font-display text-2xl font-bold text-white">Explore more</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((o) => (
                <Link key={o.slug} href={`/services/${o.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-neon-cyan/50">
                  <h3 className="font-bold text-white">{o.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-400">{o.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-neon-cyan">
                    Learn more
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
