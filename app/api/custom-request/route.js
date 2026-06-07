import { sendMail, mailerConfigured } from "@/lib/mailer";

export const runtime = "nodejs";

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

// Lightweight "Need something custom?" sender — emails the owner directly.
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const name = (body.name || "").trim();
  const needsAdvanced = Boolean(body.needsAdvanced);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return Response.json({ error: "Please enter a valid email." }, { status: 422 });
  if (!message) return Response.json({ error: "Please describe what you need." }, { status: 422 });

  const owner = process.env.OWNER_EMAIL;

  if (mailerConfigured() && owner) {
    const html = `
      <div style="font-family:Helvetica,Arial,sans-serif;background:#05060B;padding:24px">
        <div style="max-width:520px;margin:0 auto;background:#0A0C13;border:1px solid #1C2233;border-radius:16px;overflow:hidden">
          <div style="background:#0A0C13;padding:18px 24px;border-bottom:1px solid #1C2233">
            <img src="https://touchlineweb.netlify.app/touchline-logo.png" alt="Touchline" height="34" style="display:inline-block;vertical-align:middle;border:0" />
            <span style="display:inline-block;vertical-align:middle;margin-left:10px;color:#FFFFFF;font-size:16px;font-weight:800">Custom request</span>
          </div>
          <div style="padding:24px;color:#E6E9F2">
            <p style="margin:0 0 12px"><strong>From:</strong> ${esc(name || "—")} &lt;${esc(email)}&gt;</p>
            <p style="margin:0 0 12px"><strong>Needs advanced functionality:</strong> ${needsAdvanced ? "Yes" : "No"}</p>
            <p style="margin:0 0 6px"><strong>Message:</strong></p>
            <p style="margin:0;white-space:pre-wrap;color:#94A3B8">${esc(message)}</p>
          </div>
        </div>
      </div>`;
    const res = await sendMail({
      to: owner,
      replyTo: email,
      subject: `Custom request from ${name || email}`,
      html,
    });
    if (!res.ok) {
      console.error("[mail] custom-request failed:", res.error);
      return Response.json({ error: "Could not send right now. Please try again." }, { status: 502 });
    }
  } else {
    console.warn("[mail] not configured — custom request not emailed.");
  }

  return Response.json({ ok: true });
}
