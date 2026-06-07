"use client";

// Clean, realistic website-homepage previews (rendered in code, no images).
// Each variant looks like an actual business site — light, professional —
// rather than an abstract neon placeholder.

const SITES = {
  restaurant: {
    name: "Bella Cucina", template: "hero", accent: "#C0392B", domain: "bellacucina.co.uk",
    nav: ["Menu", "Reservations", "About", "Contact"], cta: "Book a Table",
    headline: "Authentic Italian, made fresh daily.",
    sub: "Hand-made pasta, wood-fired pizza and a warm welcome in the heart of town.",
    features: ["View the Menu", "Book Online", "5★ Reviews"],
  },
  gym: {
    name: "IronWorks Gym", template: "hero", accent: "#EA580C", domain: "ironworksgym.co.uk",
    nav: ["Classes", "Membership", "Trainers", "Join"], cta: "Free Trial",
    headline: "Train harder. Get stronger.",
    sub: "Top-spec kit, expert coaches and classes for every level — your first session is on us.",
    features: ["Class Timetable", "Membership", "Meet the Team"],
  },
  trades: {
    name: "Apex Builders", template: "hero", accent: "#1D4ED8", domain: "apexbuilders.co.uk",
    nav: ["Services", "Projects", "About", "Quote"], cta: "Free Quote",
    headline: "Quality building you can trust.",
    sub: "Extensions, renovations and new builds across the county. Fully insured, family-run.",
    features: ["Our Services", "Recent Work", "Get a Quote"],
  },
  landing: {
    name: "LaunchKit", template: "hero", accent: "#4F46E5", domain: "launchkit.io",
    nav: ["Features", "Pricing", "Docs", "Sign up"], cta: "Get Started",
    headline: "Launch your idea, faster.",
    sub: "Everything you need to get online and start growing — set up in minutes.",
    features: ["Fast setup", "No code needed", "24/7 support"],
  },
  booking: {
    name: "Glow Salon", template: "hero", accent: "#DB2777", domain: "glowsalon.co.uk",
    nav: ["Services", "Prices", "Team", "Book"], cta: "Book Now",
    headline: "Look good. Feel great.",
    sub: "Hair, beauty and nails by award-winning stylists — book your slot in seconds.",
    features: ["Our Services", "Price List", "Book Online"],
  },
  retail: {
    name: "Nord Store", template: "shop", accent: "#111827", domain: "nordstore.co.uk",
    nav: ["Shop", "New In", "Sale"], cta: "Shop Now",
    headline: "Modern essentials for everyday.", sub: "Free delivery on orders over £50.",
    products: [
      { name: "Wool Coat", price: "£120" }, { name: "Linen Shirt", price: "£45" },
      { name: "Leather Bag", price: "£89" }, { name: "Knit Jumper", price: "£60" },
      { name: "Trainers", price: "£75" }, { name: "Wool Scarf", price: "£25" },
    ],
  },
  ecommerce: {
    name: "Luxe Goods", template: "shop", accent: "#7C3AED", domain: "luxegoods.com",
    nav: ["Shop", "Collections", "Sale"], cta: "Shop Collection",
    headline: "Premium goods, delivered fast.", sub: "Handpicked quality you'll love.",
    products: [
      { name: "Classic Watch", price: "£240" }, { name: "Sunglasses", price: "£130" },
      { name: "Card Wallet", price: "£70" }, { name: "Headphones", price: "£199" },
      { name: "Eau de Parfum", price: "£85" }, { name: "Leather Backpack", price: "£150" },
    ],
  },
  portfolio: {
    name: "Studio Mono", template: "portfolio", accent: "#0EA5E9", domain: "studiomono.design",
    nav: ["Work", "Studio", "Contact"], cta: "Start a project",
    headline: "Design that speaks.", sub: "A brand & web design studio for ambitious teams.",
  },
};

export default function WebsiteMockup({ variant = "landing", className = "" }) {
  const s = SITES[variant] || SITES.landing;
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-white shadow-2xl shadow-black/50 ${className}`}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28C840" }} />
        <span className="ml-2 truncate rounded bg-white px-2 py-0.5 text-[9px] text-slate-400">{s.domain}</span>
      </div>
      {/* Page */}
      <div className="h-[250px] sm:h-[280px]">
        {s.template === "hero" && <HeroSite s={s} />}
        {s.template === "shop" && <ShopSite s={s} />}
        {s.template === "portfolio" && <PortfolioSite s={s} />}
      </div>
    </div>
  );
}

function Nav({ s, dark }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
      <span className="text-[11px] font-extrabold tracking-tight" style={{ color: dark ? "#0f172a" : s.accent }}>{s.name}</span>
      <div className="hidden items-center gap-2.5 sm:flex">
        {s.nav.map((l) => <span key={l} className="text-[8px] font-medium text-slate-500">{l}</span>)}
        <span className="rounded px-2 py-1 text-[8px] font-bold text-white" style={{ background: s.accent }}>{s.cta}</span>
      </div>
    </div>
  );
}

function HeroSite({ s }) {
  return (
    <div className="flex h-full flex-col bg-white text-slate-900">
      <Nav s={s} />
      <div className="flex flex-1 items-center gap-3 px-3 py-3">
        <div className="flex-1">
          <div className="text-[13px] font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-[16px]">{s.headline}</div>
          <div className="mt-1.5 text-[8px] leading-snug text-slate-500 sm:text-[10px]">{s.sub}</div>
          <div className="mt-2.5 flex items-center gap-1.5">
            <span className="rounded px-2.5 py-1 text-[8px] font-bold text-white" style={{ background: s.accent }}>{s.cta}</span>
            <span className="rounded border border-slate-300 px-2.5 py-1 text-[8px] font-semibold text-slate-600">Learn more</span>
          </div>
        </div>
        <div className="h-full w-[40%] rounded-lg" style={{ background: `linear-gradient(135deg, ${s.accent}, ${shade(s.accent)})` }} />
      </div>
      <div className="grid grid-cols-3 gap-2 px-3 pb-3">
        {s.features.map((f) => (
          <div key={f} className="rounded-md border border-slate-200 bg-slate-50 p-1.5">
            <span className="block h-2 w-2 rounded-full" style={{ background: s.accent }} />
            <span className="mt-1 block text-[7px] font-semibold text-slate-700 sm:text-[9px]">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShopSite({ s }) {
  return (
    <div className="flex h-full flex-col bg-white text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
        <span className="text-[11px] font-extrabold tracking-tight" style={{ color: s.accent }}>{s.name}</span>
        <div className="hidden items-center gap-2.5 sm:flex">
          {s.nav.map((l) => <span key={l} className="text-[8px] font-medium text-slate-500">{l}</span>)}
          <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-slate-700" aria-hidden="true">
            <path d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .7h8.7a1 1 0 0 0 1-.8L21 8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="20" r="1.3" fill="currentColor" /><circle cx="18" cy="20" r="1.3" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="mx-3 mt-2 flex items-center justify-between rounded-lg px-3 py-2 text-white" style={{ background: s.accent }}>
        <div>
          <div className="text-[10px] font-bold sm:text-[12px]">{s.headline}</div>
          <div className="text-[7px] opacity-90 sm:text-[9px]">{s.sub}</div>
        </div>
        <span className="rounded bg-white px-2 py-1 text-[7px] font-bold sm:text-[9px]" style={{ color: s.accent }}>{s.cta}</span>
      </div>
      <div className="grid flex-1 grid-cols-3 content-start gap-2 p-3">
        {s.products.map((p) => (
          <div key={p.name} className="overflow-hidden rounded-md border border-slate-200">
            <div className="h-9 sm:h-12" style={{ background: `linear-gradient(135deg, ${s.accent}22, #e5e7eb)` }} />
            <div className="p-1">
              <div className="truncate text-[7px] font-semibold text-slate-700 sm:text-[8px]">{p.name}</div>
              <div className="text-[7px] font-bold sm:text-[9px]" style={{ color: s.accent }}>{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioSite({ s }) {
  return (
    <div className="flex h-full flex-col bg-white text-slate-900">
      <Nav s={s} dark />
      <div className="px-3 pb-2 pt-3">
        <div className="text-[15px] font-extrabold tracking-tight sm:text-[19px]">{s.headline}</div>
        <div className="mt-0.5 text-[8px] text-slate-500 sm:text-[10px]">{s.sub}</div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 px-3 pb-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-md border border-slate-200" style={{ background: i % 3 === 0 ? `${s.accent}1f` : "#f1f5f9" }} />
        ))}
      </div>
    </div>
  );
}

// Darken a hex colour for the hero gradient end-stop.
function shade(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((n >> 16) & 255) - 60);
  const g = Math.max(0, ((n >> 8) & 255) - 60);
  const b = Math.max(0, (n & 255) - 60);
  return `rgb(${r},${g},${b})`;
}
