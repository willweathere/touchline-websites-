// Rich content for the tier detail pages, capability pages and the hero wheel.
// Kept separate from constants.js (form options) to stay tidy.

// ---- Website preview mockups (rendered in code by WebsiteMockup.jsx) ----
// Each variant drives a stylised browser-frame "screenshot".
export const MOCKUPS = {
  restaurant: { label: "Bella Cucina", kind: "hero", accent: "#FF45C8", tag: "Restaurant" },
  gym: { label: "IronWorks Gym", kind: "booking", accent: "#3DFFA8", tag: "Gym" },
  retail: { label: "Nord Store", kind: "shop", accent: "#22E0FF", tag: "Retail" },
  ecommerce: { label: "Luxe Goods", kind: "shop", accent: "#9B5CFF", tag: "E-commerce" },
  trades: { label: "Apex Builders", kind: "hero", accent: "#22E0FF", tag: "Tradesman" },
  portfolio: { label: "Studio Mono", kind: "grid", accent: "#3DFFA8", tag: "Portfolio" },
  landing: { label: "LaunchKit", kind: "hero", accent: "#FF45C8", tag: "Landing" },
  booking: { label: "Glow Salon", kind: "booking", accent: "#9B5CFF", tag: "Booking" },
};

export const WHEEL_VARIANTS = [
  "restaurant", "gym", "retail", "ecommerce",
  "trades", "portfolio", "landing", "booking",
];

// ---- Capabilities / services (each gets a detail page at /services/[slug]) ----
export const CAPABILITIES = [
  {
    slug: "social-media",
    icon: "link",
    title: "Social media integration",
    blurb: "Connect Instagram, Facebook, TikTok & more so your feed and follower count live right on your site.",
    mockup: "retail",
    details: [
      "Live Instagram & TikTok feeds embedded on your pages",
      "One-tap follow and share buttons",
      "Auto-pull your latest posts — no manual updates",
      "Click-to-DM and WhatsApp chat buttons",
    ],
  },
  {
    slug: "video-motion",
    icon: "play",
    title: "Video & motion",
    blurb: "Background hero videos, reels and subtle animations that make your brand feel alive and premium.",
    mockup: "landing",
    details: [
      "Auto-playing background hero videos",
      "Embedded YouTube / Vimeo galleries",
      "Smooth scroll and reveal animations",
      "Optimised so video never slows the page down",
    ],
  },
  {
    slug: "online-store",
    icon: "card",
    title: "Online store & payments",
    blurb: "Sell products or services and take secure card payments, Apple Pay and Google Pay online.",
    mockup: "ecommerce",
    details: [
      "Product catalogue with photos and variants",
      "Secure checkout (Stripe) — cards, Apple & Google Pay",
      "Discount codes and stock tracking",
      "Order confirmation emails out of the box",
    ],
  },
  {
    slug: "booking",
    icon: "calendar",
    title: "Booking & enquiries",
    blurb: "Let customers book appointments or send enquiries 24/7 without a single phone call.",
    mockup: "booking",
    details: [
      "Calendar booking with time slots",
      "Automatic confirmation & reminder emails",
      "Lead forms that land straight in your inbox",
      "Sync with Google Calendar",
    ],
  },
  {
    slug: "seo-google",
    icon: "search",
    title: "SEO & Google",
    blurb: "Get found on Google, show up on Maps, and turn local searches into paying customers.",
    mockup: "trades",
    details: [
      "On-page SEO so Google understands your site",
      "Google Business Profile & Maps setup",
      "Fast loading — a key Google ranking factor",
      "Local keyword targeting for your area",
    ],
  },
  {
    slug: "analytics",
    icon: "chart",
    title: "Analytics & tracking",
    blurb: "See exactly how many visitors you get, where they come from, and what they click.",
    mockup: "portfolio",
    details: [
      "Visitor and traffic dashboards",
      "See which pages and buttons get clicked",
      "Track form submissions and sales",
      "Monthly plain-English performance summary",
    ],
  },
];

export const capabilityFor = (slug) =>
  CAPABILITIES.find((c) => c.slug === slug) ?? null;

// ---- Extra detail layered onto each pricing tier on its own page ----
export const TIER_DETAILS = {
  starter: {
    summary:
      "A clean, fast 1–3 page website that gets your business online and taking enquiries — perfect for getting started.",
    idealFor: "New businesses, tradesmen and anyone who needs a sharp online presence fast.",
    mockups: ["trades", "landing"],
    includes: [
      "1–3 professionally designed pages",
      "Mobile-first responsive layout",
      "Contact form straight to your inbox",
      "Basic SEO so Google can find you",
      "Hosting, SSL and updates included",
    ],
    addOns: ["social-media", "seo-google"],
  },
  business: {
    summary:
      "A bigger, fully custom site with the features growing businesses need — built to bring in real enquiries and bookings.",
    idealFor: "Established local businesses ready to look the part and convert visitors.",
    mockups: ["restaurant", "gym", "retail"],
    includes: [
      "Up to 6 custom-designed pages",
      "Google Maps & reviews integration",
      "Improved SEO and faster performance",
      "Booking or enquiry system",
      "Priority support",
    ],
    addOns: ["booking", "social-media", "analytics"],
  },
  premium: {
    summary:
      "The complete package — a fully bespoke website with store, bookings, advanced SEO and everything running like clockwork.",
    idealFor: "Businesses that want the full toolkit and a site that does the selling for them.",
    mockups: ["ecommerce", "booking", "portfolio"],
    includes: [
      "Up to 10 fully bespoke pages",
      "Online store & secure payments",
      "Booking system with reminders",
      "Advanced SEO setup",
      "Logo, branding and priority support",
    ],
    addOns: ["online-store", "video-motion", "analytics", "social-media"],
  },
};

export const tierDetailFor = (slug) => TIER_DETAILS[slug] ?? null;
