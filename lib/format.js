// Server-side helpers to turn raw form values into human labels + email HTML.
// Re-uses the same option lists the UI uses so labels never drift.
import {
  WEBSITE_TYPES,
  BUSINESS_TYPES,
  ECOMMERCE_PROVIDERS,
  ECOMMERCE_FEATURES,
  FEATURES,
  labelFor,
  labelsFor,
  packageFor,
} from "@/components/constants";
import { SOCIAL_PLANS } from "@/components/siteContent";

export function normalise(data) {
  const pkg = packageFor(data.selectedPackage);
  const socialPlan = SOCIAL_PLANS.find((p) => p.value === data.socialPlan) || null;
  const n = {
    fullName: data.fullName?.trim() || "",
    email: data.email?.trim() || "",
    businessName: data.businessName?.trim() || "",
    phone: data.phone?.trim() || "",
    websiteType: data.websiteType || "",
    websiteTypeLabel: labelFor(WEBSITE_TYPES, data.websiteType),
    businessType: data.businessType || "",
    businessTypeLabel: labelFor(BUSINESS_TYPES, data.businessType),
    businessTypeOther: data.businessTypeOther?.trim() || "",
    ecommerceProvider: data.ecommerceProvider || "",
    ecommerceProviderLabel: data.ecommerceProvider ? labelFor(ECOMMERCE_PROVIDERS, data.ecommerceProvider) : "",
    ecommerceFeatures: Array.isArray(data.ecommerceFeatures) ? data.ecommerceFeatures : [],
    ecommerceFeatureLabels: labelsFor(ECOMMERCE_FEATURES, data.ecommerceFeatures),
    features: Array.isArray(data.features) ? data.features : [],
    featureLabels: labelsFor(FEATURES, data.features),
    socialPlan: data.socialPlan || "",
    socialPlanLabel: socialPlan ? `${socialPlan.name} (£${socialPlan.monthly}/mo)` : "",
    primaryColor: data.primaryColor || "",
    exampleWebsites: data.exampleWebsites?.trim() || "",
    styleDescription: data.styleDescription?.trim() || "",
    anythingElse: data.anythingElse?.trim() || "",
    customRequest: data.customRequest?.trim() || "",
    needsAdvanced: Boolean(data.needsAdvanced),
    selectedPackage: data.selectedPackage || "",
    package: pkg,
  };

  // A single combined string so the DB (which has no extra columns) still
  // captures every detail in custom_request.
  n.notes = [
    n.customRequest,
    n.needsAdvanced ? "Needs advanced functionality" : "",
    n.businessType === "other" && n.businessTypeOther ? `Business type: ${n.businessTypeOther}` : "",
    n.ecommerceProviderLabel ? `Store platform: ${n.ecommerceProviderLabel}` : "",
    n.ecommerceFeatureLabels.length ? `Store needs: ${n.ecommerceFeatureLabels.join(", ")}` : "",
    n.socialPlanLabel ? `Social plan: ${n.socialPlanLabel}` : "",
    n.anythingElse ? `Anything else: ${n.anythingElse}` : "",
  ]
    .filter(Boolean)
    .join(" | ");

  return n;
}

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

function rows(n) {
  const feats = n.featureLabels.length ? n.featureLabels.join(", ") : "None selected";
  const price = n.package
    ? `${esc(n.package.name)} — £${n.package.setup} setup + £${n.package.monthly}/month`
    : "Not selected";
  const custom = [
    n.needsAdvanced ? "Needs advanced functionality" : "",
    n.customRequest,
  ]
    .filter(Boolean)
    .join(" — ") || "—";

  const businessTypeText =
    n.businessType === "other" && n.businessTypeOther
      ? `Other — ${n.businessTypeOther}`
      : n.businessTypeLabel;

  const out = [
    ["Name", n.fullName],
    ["Email", n.email],
    ["Business", n.businessName],
    ["Phone", n.phone || "—"],
    ["Website type", n.websiteTypeLabel],
    ["Business type", businessTypeText],
  ];
  if (n.ecommerceProviderLabel) out.push(["Store platform", n.ecommerceProviderLabel]);
  if (n.ecommerceFeatureLabels.length) out.push(["Store needs", n.ecommerceFeatureLabels.join(", ")]);
  out.push(["Features", feats]);
  if (n.socialPlanLabel) out.push(["Social media plan", n.socialPlanLabel]);
  out.push(
    ["Brand colour", n.primaryColor],
    ["Example sites", n.exampleWebsites || "—"],
    ["Style notes", n.styleDescription || "—"]
  );
  if (n.anythingElse) out.push(["Anything else", n.anythingElse]);
  out.push(["Custom request", custom], ["Package", price]);

  return out
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 14px;background:#0E111B;border:1px solid #1C2233;font-weight:600;color:#94A3B8;white-space:nowrap;vertical-align:top">${esc(k)}</td>
        <td style="padding:10px 14px;border:1px solid #1C2233;color:#E6E9F2">${esc(v)}</td>
      </tr>`
    )
    .join("");
}

function shell(title, intro, n) {
  return `
  <div style="font-family:Helvetica,Arial,sans-serif;background:#05060B;padding:24px">
    <div style="max-width:560px;margin:0 auto;background:#0A0C13;border-radius:16px;overflow:hidden;border:1px solid #1C2233">
      <div style="background:linear-gradient(90deg,#22E0FF,#3DFFA8);padding:22px 24px">
        <p style="margin:0;color:#05060B;font-size:20px;font-weight:800">Touchline Websites</p>
      </div>
      <div style="padding:24px">
        <h1 style="margin:0 0 8px;font-size:20px;color:#FFFFFF">${esc(title)}</h1>
        <p style="margin:0 0 18px;color:#94A3B8;line-height:1.6">${intro}</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">${rows(n)}</table>
        <p style="margin:18px 0 0;color:#64748B;font-size:12px">
          Submitted ${esc(new Date().toLocaleString("en-GB", { timeZone: "Europe/London" }))} (UK time)
        </p>
      </div>
    </div>
  </div>`;
}

export function ownerEmail(n) {
  return {
    subject: `New website enquiry — ${n.businessName || n.fullName} (${n.package?.name ?? "no package"})`,
    html: shell(
      "New website enquiry",
      `You've received a new lead from <strong style="color:#22E0FF">${esc(n.fullName)}</strong>. Full details below.`,
      n
    ),
  };
}

export function clientEmail(n) {
  return {
    subject: "We've received your website enquiry — Touchline Websites",
    html: shell(
      `Thanks, ${esc(n.fullName.split(" ")[0] || "there")}!`,
      `We've received your enquiry and our team will respond within <strong style="color:#22E0FF">24 hours</strong>. Here's a summary of what you sent us:`,
      n
    ),
  };
}
