// Temporary diagnostic: reports which env vars the live function can see.
// Returns booleans only (never the secret values). Safe to remove afterwards.
export const runtime = "nodejs";

export async function GET() {
  const e = process.env;
  return Response.json({
    supabaseUrl: !!e.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: !!(e.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || e.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    resendKey: !!e.RESEND_API_KEY,
    fromEmail: !!e.FROM_EMAIL,
    ownerEmail: !!e.OWNER_EMAIL,
  });
}
