import { getSupabase } from "@/lib/supabase";
import { normalise, ownerEmail, clientEmail } from "@/lib/format";
import { sendMail, mailerConfigured } from "@/lib/mailer";

export const runtime = "nodejs";

// Server-side guard so a malformed/empty submission can't hit the DB or emails.
function validate(n) {
  if (!n.fullName) return "Name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n.email)) return "A valid email is required.";
  if (!n.businessName) return "Business name is required.";
  if (!n.websiteType) return "Website type is required.";
  if (!n.businessType) return "Business type is required.";
  if (!n.selectedPackage) return "A package selection is required.";
  return null;
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const n = normalise(body);
  const invalid = validate(n);
  if (invalid) return Response.json({ error: invalid }, { status: 422 });

  const submittedAt = new Date().toISOString();

  // 1) Store in Supabase (best-effort: failure here is logged, not fatal to the lead).
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      full_name: n.fullName,
      email: n.email,
      business_name: n.businessName,
      phone: n.phone || null,
      website_type: n.websiteType,
      business_type: n.businessType,
      features: n.features,
      primary_color: n.primaryColor,
      example_websites: n.exampleWebsites || null,
      style_description: n.styleDescription || null,
      custom_request: n.notes || n.customRequest || null,
      needs_advanced: n.needsAdvanced,
      selected_package: n.selectedPackage,
      package_setup: n.package?.setup ?? null,
      package_monthly: n.package?.monthly ?? null,
      submitted_at: submittedAt,
    });
    if (error) console.error("[supabase] insert failed:", error.message);
  } else {
    console.warn("[supabase] not configured — skipping DB insert.");
  }

  // 2) Send emails (owner notification + customer confirmation) via the mailer.
  const owner = process.env.OWNER_EMAIL;
  if (mailerConfigured()) {
    const ownerMsg = ownerEmail(n);
    const clientMsg = clientEmail(n);
    const results = await Promise.allSettled([
      owner
        ? sendMail({ to: owner, replyTo: n.email, subject: ownerMsg.subject, html: ownerMsg.html })
        : Promise.resolve({ ok: true }),
      // Customer "success" confirmation
      sendMail({ to: n.email, subject: clientMsg.subject, html: clientMsg.html }),
    ]);
    results.forEach((r, i) => {
      const label = i === 0 ? "owner" : "customer";
      if (r.status === "rejected") console.error(`[mail] ${label} send rejected:`, r.reason);
      else if (r.value && !r.value.ok) console.error(`[mail] ${label} send failed:`, r.value.error);
    });
  } else {
    console.warn("[mail] not configured — skipping emails.");
  }

  return Response.json({ ok: true });
}
