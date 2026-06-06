"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";

// Client button used on the (server-rendered) tier + social pages.
export default function AddToCart({ pkg, className = "btn-neon" }) {
  const { add, has } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = has(pkg.value);

  if (inCart) {
    return (
      <Link href="/cart" className={className}>
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        In cart — view cart
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => { add(pkg); setJustAdded(true); }}
      className={className}
    >
      {justAdded ? "Added ✓" : `Add ${pkg.name} to cart`}
      {!justAdded && (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .7h8.7a1 1 0 0 0 1-.8L21 8H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
