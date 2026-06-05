import { createClient } from "@supabase/supabase-js";

// Uses the public anon key (safe to expose). Inserts are allowed via the
// Row Level Security policy in supabase/schema.sql — make sure you've run it.
// NEVER add a SELECT policy unless you want leads to be publicly readable.
let cached = null;

export function getSupabase() {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Accept Supabase's newer "publishable" key name or the classic "anon" name.
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null; // lets the API degrade gracefully if unconfigured
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
