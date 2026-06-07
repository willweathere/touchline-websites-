"use client";

import { useEffect, useRef, useState } from "react";

// Progressive-enhancement reveal.
// Content renders VISIBLE by default (in SSR, and if JS never runs / hydration
// fails on a slow or old mobile browser). Only once JS has confirmed it can run
// do we switch on the hidden→animate-in behaviour. This guarantees the page is
// never blank below the hero, which is the safe failure mode.
export default function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    setArmed(true);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = armed ? `reveal ${shown ? "reveal-in" : ""} ${className}` : className;
  return (
    <div
      ref={ref}
      className={cls.trim()}
      style={armed && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
