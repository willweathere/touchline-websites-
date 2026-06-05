"use client";

import WebsiteMockup from "./WebsiteMockup";
import { WHEEL_VARIANTS } from "../siteContent";

// A slow, blurred wheel of website previews turning in the background.
// Deliberately subtle: low opacity, blurred, masked at the edges.
export default function HeroWheel() {
  const n = WHEEL_VARIANTS.length;
  const radius = 340; // px from centre

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 -z-0 hidden -translate-x-1/2 -translate-y-1/2 select-none sm:block"
      style={{
        width: 820,
        height: 820,
        // Fade the wheel out towards the edges so it stays nonchalant.
        maskImage: "radial-gradient(circle at center, #000 35%, transparent 72%)",
        WebkitMaskImage: "radial-gradient(circle at center, #000 35%, transparent 72%)",
      }}
    >
      <div className="absolute inset-0 animate-[spin_80s_linear_infinite] opacity-[0.28] blur-[2px] motion-reduce:animate-none">
        {WHEEL_VARIANTS.map((variant, i) => {
          const angle = (360 / n) * i;
          return (
            <div
              key={variant}
              className="absolute left-1/2 top-1/2 w-44"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px)`,
              }}
            >
              <WebsiteMockup variant={variant} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
