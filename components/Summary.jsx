"use client";

import {
  WEBSITE_TYPES,
  BUSINESS_TYPES,
  ECOMMERCE_PROVIDERS,
  ECOMMERCE_FEATURES,
  FEATURES,
  labelFor,
  labelsFor,
  packageFor,
} from "./constants";
import { SOCIAL_PLANS } from "./siteContent";

// Read-only review of everything entered, with per-section "Edit" links.
export default function Summary({ values, onEdit }) {
  const pkg = packageFor(values.selectedPackage);
  const features = labelsFor(FEATURES, values.features);
  const socialPlan = SOCIAL_PLANS.find((p) => p.value === values.socialPlan);
  const hasCustom = values.customRequest || values.needsAdvanced;

  return (
    <div className="space-y-3">
      <Block title="Your details" step={1} onEdit={onEdit}>
        <Row label="Name" value={values.fullName} />
        <Row label="Email" value={values.email} />
        <Row label="Business" value={values.businessName} />
        {values.phone && <Row label="Phone" value={values.phone} />}
      </Block>

      <Block title="Website type" step={2} onEdit={onEdit}>
        <Row label="Type" value={labelFor(WEBSITE_TYPES, values.websiteType)} />
        <Row label="Business type" value={labelFor(BUSINESS_TYPES, values.businessType)} />
        {values.businessType === "other" && values.businessTypeOther && (
          <Row label="Business (other)" value={values.businessTypeOther} />
        )}
        {values.websiteType === "ecommerce" && values.ecommerceProvider && (
          <Row label="Store platform" value={labelFor(ECOMMERCE_PROVIDERS, values.ecommerceProvider)} />
        )}
        {values.websiteType === "ecommerce" && values.ecommerceFeatures?.length > 0 && (
          <Row label="Store needs" value={labelsFor(ECOMMERCE_FEATURES, values.ecommerceFeatures).join(", ")} />
        )}
      </Block>

      <Block title="Features" step={3} onEdit={onEdit}>
        {features.length ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {features.map((f) => (
              <span
                key={f}
                className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-sm font-medium text-neon-cyan"
              >
                {f}
              </span>
            ))}
          </div>
        ) : (
          <Row label="Features" value="None selected" />
        )}
        {socialPlan && (
          <Row label="Social plan" value={`${socialPlan.name} — £${socialPlan.monthly}/mo`} />
        )}
      </Block>

      <Block title="Design" step={4} onEdit={onEdit}>
        <div className="flex items-center justify-between py-1">
          <span className="text-sm text-slate-400">Brand colour</span>
          <span className="flex items-center gap-2">
            <span
              className="h-5 w-5 rounded-md border border-white/20"
              style={{ backgroundColor: values.primaryColor }}
            />
            <span className="font-mono text-sm font-semibold uppercase text-white">
              {values.primaryColor}
            </span>
          </span>
        </div>
        {values.exampleWebsites && <Row label="Examples" value={values.exampleWebsites} />}
        {values.styleDescription && <Row label="Style" value={values.styleDescription} />}
        {values.anythingElse && <Row label="Anything else" value={values.anythingElse} />}
      </Block>

      {hasCustom && (
        <Block title="Custom request" step="custom" onEdit={onEdit}>
          {values.needsAdvanced && <Row label="Advanced" value="Needs advanced functionality" />}
          {values.customRequest && <Row label="Details" value={values.customRequest} />}
        </Block>
      )}

      <Block title="Package" step={5} onEdit={onEdit}>
        {pkg ? (
          <div className="flex items-center justify-between py-1">
            <span className="font-semibold text-white">
              {pkg.name}{" "}
              <span className="text-xs font-medium uppercase text-slate-500">({pkg.medal})</span>
            </span>
            <span className="text-right text-sm font-semibold text-white">
              £{pkg.setup} setup
              <span className="block text-neon-cyan">+ £{pkg.monthly}/mo</span>
            </span>
          </div>
        ) : (
          <Row label="Package" value="None selected" />
        )}
      </Block>
    </div>
  );
}

function Block({ title, step, onEdit, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-1 flex items-center justify-between">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-400">{title}</p>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="cursor-pointer text-sm font-semibold text-neon-cyan transition-colors hover:text-neon-green"
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1">
      <span className="flex-shrink-0 text-sm text-slate-400">{label}</span>
      <span className="break-words text-right text-sm font-semibold text-white">
        {value || "—"}
      </span>
    </div>
  );
}
