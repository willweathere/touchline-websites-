// Unified mailer: prefers Gmail (no domain needed) and falls back to Resend.
// Today: Gmail via an App Password sends to anyone (owner + customers).
// Tomorrow: add a verified domain to Resend and remove the GMAIL_* vars to
// switch to branded sending automatically.
import { Resend } from "resend";
import nodemailer from "nodemailer";

let gmailTransport = null;

function getGmail() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  if (!gmailTransport) {
    gmailTransport = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return gmailTransport;
}

// Returns { ok, id?, error? } — never throws.
export async function sendMail({ to, subject, html, replyTo }) {
  // 1) Gmail (works for any recipient, no domain required)
  const gmail = getGmail();
  if (gmail) {
    try {
      const fromName = process.env.FROM_NAME || "Touchline Websites";
      const info = await gmail.sendMail({
        from: `"${fromName}" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        html,
        replyTo,
      });
      return { ok: true, id: info.messageId };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  // 2) Resend (needs a verified domain to email non-account addresses)
  const key = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;
  if (key && from) {
    try {
      const resend = new Resend(key);
      const res = await resend.emails.send({ from, to, subject, html, replyTo });
      if (res.error) return { ok: false, error: JSON.stringify(res.error) };
      return { ok: true, id: res.data?.id };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  return { ok: false, error: "No mailer configured" };
}

export function mailerConfigured() {
  return Boolean(
    (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) ||
      (process.env.RESEND_API_KEY && process.env.FROM_EMAIL)
  );
}
