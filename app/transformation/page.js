import Link from "next/link";
import Nav from "@/components/site/Nav";
import SiteFooter from "@/components/site/SiteFooter";
import BeforeAfter from "@/components/site/BeforeAfter";

export const metadata = {
  title: "See your website transformation · Touchline Websites",
  description:
    "Drag a live before-and-after slider to see how a modern, conversion-focused website can transform your business — for your industry.",
};

export default function TransformationPage() {
  return (
    <>
      <Nav />
      <main>
        <div className="mx-auto max-w-5xl px-4 pt-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-neon-cyan">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to home
          </Link>
        </div>
        <BeforeAfter />
      </main>
      <SiteFooter />
    </>
  );
}
