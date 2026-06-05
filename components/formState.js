// Shared form configuration used by both the provider (LandingPage) and the
// multi-step LeadForm so they agree on defaults, storage key and step gating.

export const STORAGE_KEY = "touchline_lead_form_v2";

export const DEFAULTS = {
  fullName: "",
  email: "",
  businessName: "",
  phone: "",
  websiteType: "",
  businessType: "",
  features: [],
  primaryColor: "#22E0FF",
  exampleWebsites: "",
  styleDescription: "",
  customRequest: "",
  needsAdvanced: false,
  selectedPackage: "",
};

// Which registered fields gate each step before the user can continue.
export const STEP_FIELDS = {
  1: ["fullName", "email", "businessName"],
  2: ["websiteType", "businessType"],
  3: [],
  4: ["primaryColor"],
  5: ["selectedPackage"],
  6: [],
};
