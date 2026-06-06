// Temporary diagnostic: runs the REAL insert + email through the deployed
// function so we can see exactly what works in production. Remove afterwards.
import { getSupabase } from "@/lib/supabase";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function GET() {
  const e = process.env;
  const out = {
    env: {
      supabaseUrl: !!e.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: !!(e.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || e.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      resendKey: !!e.RESEND_API_KEY,
      fromEmail: !!e.FROM_EMAIL,
      ownerEmail: !!e.OWNER_EMAIL,
    },
  };

  // Real Supabase insert
  const supa = getSupabase();
  out.supabaseClient = !!supa;
  if (supa) {
    const { error } = await supa.from("leads").insert({
      full_name: "HEALTH CHECK (delete me)",
      email: "health@touchline.test",
      business_name: "Health Check",
      website_type: "business",
      business_type: "retail",
      selected_package: "business",
    });
    out.insert = error ? `ERROR: ${error.message}` : "OK";
  }

  // Real Resend send (owner only)
  if (e.RESEND_API_KEY && e.FROM_EMAIL && e.OWNER_EMAIL) {
    try {
      const resend = new Resend(e.RESEND_API_KEY);
      const res = await resend.emails.send({
        from: e.FROM_EMAIL,
        to: e.OWNER_EMAIL,
        subject: "Touchline health check",
        html: "<p>Health check email — system working.</p>",
      });
      out.email = res.error ? `ERROR: ${JSON.stringify(res.error)}` : `OK (${res.data?.id || "sent"})`;
    } catch (err) {
      out.email = `THROW: ${err.message}`;
    }
  }

  return Response.json(out);
}
