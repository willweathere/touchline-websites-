// Temporary diagnostic: shows which mail transport the live function uses
// and tries a real send to ?to=. Remove afterwards.
import { sendMail } from "@/lib/mailer";

export const runtime = "nodejs";

export async function GET(req) {
  const to = new URL(req.url).searchParams.get("to") || process.env.OWNER_EMAIL;
  const e = process.env;
  const out = {
    gmailUser: !!e.GMAIL_USER,
    gmailPass: !!e.GMAIL_APP_PASSWORD,
    resendKey: !!e.RESEND_API_KEY,
    to,
  };
  out.result = await sendMail({
    to,
    subject: "Touchline maildiag",
    html: "<p>maildiag test — which transport sent this?</p>",
  });
  return Response.json(out);
}
