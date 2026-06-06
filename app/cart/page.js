"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/site/Nav";
import SiteFooter from "@/components/site/SiteFooter";
import { useCart } from "@/components/cart/CartProvider";

export default function CartPage() {
  const { items, remove, clear, setupTotal, monthlyTotal } = useCart();
  const [checkoutNote, setCheckoutNote] = useState(false);

  return (
    <>
      <Nav />
      <main className="mx-auto min-h-[60vh] max-w-3xl px-4 py-12 sm:py-16">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Your cart</h1>

        {items.length === 0 ? (
          <div className="card-surface mt-8 p-8 text-center">
            <p className="text-slate-400">Your cart is empty.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/#pricing" className="btn-neon">Browse packages</Link>
              <Link href="/#quote" className="btn-ghost">Build a custom site</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-8 space-y-3">
              {items.map((i) => (
                <div key={i.value} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div>
                    <p className="font-display text-lg font-bold text-white">
                      {i.name}
                      {i.kind === "social" ? " social" : " package"}
                    </p>
                    <p className="text-sm text-slate-400">
                      {i.kind === "social" || !i.setup
                        ? `£${i.monthly}/month`
                        : `£${i.setup} setup · £${i.monthly}/month`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(i.value)}
                    className="rounded-lg border border-white/15 px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:border-neon-pink/60 hover:text-neon-pink"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="card-surface mt-6 p-6">
              <div className="flex items-center justify-between text-slate-300">
                <span>One-off setup</span>
                <span className="font-semibold text-white">£{setupTotal}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-slate-300">
                <span>Then per month</span>
                <span className="font-semibold text-neon-cyan">£{monthlyTotal}/mo</span>
              </div>
              <div className="my-4 h-px bg-white/10" />
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Due today</span>
                <span className="font-display text-2xl font-bold text-white">£{setupTotal}</span>
              </div>

              <button type="button" onClick={() => setCheckoutNote(true)} className="btn-neon mt-6 w-full">
                Proceed to secure checkout
              </button>
              {checkoutNote && (
                <p className="mt-3 rounded-xl border border-neon-cyan/30 bg-neon-cyan/[0.06] px-4 py-3 text-sm text-slate-200">
                  Card payments are being set up. In the meantime,{" "}
                  <Link href="/#quote" className="font-semibold text-neon-cyan underline">send your order as an enquiry</Link>{" "}
                  and we'll confirm everything within 24 hours.
                </p>
              )}

              <div className="mt-4 flex items-center justify-between text-sm">
                <Link href="/#pricing" className="font-medium text-slate-400 hover:text-white">Continue browsing</Link>
                <button type="button" onClick={clear} className="font-medium text-slate-500 hover:text-neon-pink">Clear cart</button>
              </div>
            </div>
          </>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
