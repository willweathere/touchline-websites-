# Touchline Websites

A fast, mobile-first agency landing page **+** lead-generation system. Single-page
site with pricing tiers (each with its own detail page), capability pages, a cart for
fixed packages, a build-your-own custom-site form, and email + database on submit.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS** (black + neon theme)
- **React Hook Form** + **react-colorful** (multi-step form & colour picker)
- **Supabase** (stores leads) · **Resend** (owner + client emails)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your keys
npm run dev                  # http://localhost:3000
```

The site runs without keys — it just skips the database insert and emails (logging a
warning) so you can preview everything immediately.

## Environment variables

Copy `.env.example` → `.env.local` (locally) or add these in Netlify → Site settings →
Environment variables:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `RESEND_API_KEY` | Resend API key |
| `FROM_EMAIL` | Verified sender, e.g. `Touchline Websites <hello@yourdomain.com>` |
| `OWNER_EMAIL` | Where new-lead notifications go |

### Database

Run [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL editor. It creates
the `leads` table **and** the Row Level Security policy that lets the public form insert
(but not read) leads — required when using the anon key.

## Deploy to Netlify

1. Push this folder to a GitHub repo.
2. Netlify → **Add new site → Import an existing project → GitHub** → pick the repo.
3. Netlify auto-detects Next.js. Add the env vars above. Deploy.

## Customising

- Packages / options / pricing → [`components/constants.js`](components/constants.js)
- Tier & capability page content → [`components/siteContent.js`](components/siteContent.js)
- Growth-graph numbers → [`components/site/Growth.jsx`](components/site/Growth.jsx)
- Brand colours / fonts → [`tailwind.config.js`](tailwind.config.js)
- Email design → [`lib/format.js`](lib/format.js)
