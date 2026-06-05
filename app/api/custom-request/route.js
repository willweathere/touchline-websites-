import { Resend } from "resend";

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

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;
  const owner = process.env.OWNER_EMAIL;

  if (apiKey && from && owner) {
    const resend = new Resend(apiKey);
    const html = `
      <div style="font-family:Helvetica,Arial,sans-serif;background:#05060B;padding:24px">
        <div style="max-width:520px;margin:0 auto;background:#0A0C13;border:1px solid #1C2233;border-radius:16px;overflow:hidden">
          <div style="background:linear-gradient(90deg,#9B5CFF,#22E0FF);padding:20px 24px">
            <p style="margin:0;color:#05060B;font-size:18px;font-weight:800">Custom request</p>
          </div>
          <div style="padding:24px;color:#E6E9F2">
            <p style="margin:0 0 12px"><strong>From:</strong> ${esc(name || "—")} &lt;${esc(email)}&gt;</p>
            <p style="margin:0 0 12px"><strong>Needs advanced functionality:</strong> ${needsAdvanced ? "Yes" : "No"}</p>
            <p style="margin:0 0 6px"><strong>Message:</strong></p>
            <p style="margin:0;white-space:pre-wrap;color:#94A3B8">${esc(message)}</p>
          </div>
        </div>
      </div>`;
    try {
      await resend.emails.send({
        from,
        to: owner,
        replyTo: email,
        subject: `Custom request from ${name || email}`,
        html,
      });
    } catch (err) {
      console.error("[resend] custom-request failed:", err);
      return Response.json({ error: "Could not send right now. Please try again." }, { status: 502 });
    }
  } else {
    console.warn("[resend] not configured — custom request not emailed.");
  }

  return Response.json({ ok: true });
}
