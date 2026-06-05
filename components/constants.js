// Single source of truth for all options, pricing, site features + portfolio.
// The form, summary, emails and landing sections all read from here.

export const WEBSITE_TYPES = [
  { value: "new", label: "New website", hint: "Start fresh from scratch" },
  { value: "redesign", label: "Redesign", hint: "Refresh an existing site" },
  { value: "ecommerce", label: "E-commerce", hint: "Sell products online" },
  { value: "landing", label: "Landing page", hint: "Single high-impact page" },
  { value: "unsure", label: "Not sure yet", hint: "Help me decide" },
];

export const BUSINESS_TYPES = [
  { value: "restaurant", label: "Restaurant" },
  { value: "tradesman", label: "Tradesman" },
  { value: "gym", label: "Gym" },
  { value: "retail", label: "Retail" },
  { value: "other", label: "Other" },
];

// Form Step 3 — selectable features.
export const FEATURES = [
  { value: "contact_form", label: "Contact form" },
  { value: "booking_system", label: "Booking system" },
  { value: "online_store", label: "Online store" },
  { value: "seo_setup", label: "SEO setup" },
  { value: "logo_needed", label: "Logo needed" },
  { value: "google_maps", label: "Google Maps integration" },
  { value: "analytics", label: "Analytics" },
  { value: "social_integration", label: "Social integration" },
];

export const PACKAGES = [
  {
    value: "starter",
    name: "Starter",
    medal: "Bronze",
    setup: 99,
    monthly: 29,
    tagline: "Get online fast",
    perks: ["1–3 pages", "Mobile responsive", "Contact form", "Basic SEO", "Hosting included"],
  },
  {
    value: "business",
    name: "Business",
    medal: "Silver",
    setup: 249,
    monthly: 49,
    tagline: "Most popular",
    popular: true,
    perks: [
      "Up to 6 pages",
      "Custom design",
      "Google Maps integration",
      "Improved SEO",
      "Faster performance",
    ],
  },
  {
    value: "premium",
    name: "Premium",
    medal: "Gold",
    setup: 499,
    monthly: 79,
    tagline: "The full package",
    perks: [
      "Up to 10 pages",
      "Fully custom design",
      "Booking system",
      "Advanced SEO",
      "Priority support",
    ],
  },
];

// Landing "What's included" feature grid. Icon keys map to SVGs in Features.jsx.
export const SITE_FEATURES = [
  { icon: "mobile", title: "Mobile-first design", desc: "Looks sharp on every screen size." },
  { icon: "bolt", title: "Fast loading", desc: "Optimised to load in under a second." },
  { icon: "search", title: "SEO optimisation", desc: "Built to be found on Google." },
  { icon: "mail", title: "Lead forms", desc: "Turn visitors into enquiries." },
  { icon: "calendar", title: "Booking systems", desc: "Let customers book in a tap." },
  { icon: "card", title: "Online payments", desc: "Take payments securely online." },
  { icon: "pin", title: "Google Maps", desc: "Help locals find your door." },
  { icon: "chart", title: "Analytics", desc: "See exactly what's working." },
  { icon: "lock", title: "SSL security", desc: "Encrypted and trusted by default." },
  { icon: "link", title: "Social integration", desc: "Connect every channel you use." },
  { icon: "rocket", title: "Performance tuning", desc: "Fast, smooth, and reliable." },
];

export const STEPS = [
  { id: 1, title: "Your details" },
  { id: 2, title: "Website type" },
  { id: 3, title: "Features" },
  { id: 4, title: "Design" },
  { id: 5, title: "Package" },
  { id: 6, title: "Review" },
];

// Helpers used by the summary + emails so labels stay consistent.
export const labelFor = (list, value) =>
  list.find((o) => o.value === value)?.label ?? value ?? "—";

export const labelsFor = (list, values = []) =>
  values.map((v) => labelFor(list, v));

export const packageFor = (value) =>
  PACKAGES.find((p) => p.value === value) ?? null;
