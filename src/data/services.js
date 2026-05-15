export const PRICING = {
  draftingPerPage: 199,
  filing: 2999,
  appearHearing: 2999,
};

export const SERVICE_CONFIG = {
  drafting: {
    value: "drafting",
    label: "Drafting",
    calculatorLabel: "Drafting",
    detail: "₹199/page",
    description: "Professional legal drafting charged per page.",
    requiresPages: true,
    trackingSteps: ["Drafting", "Completed"],
  },
  filing: {
    value: "filing",
    label: "Filing",
    calculatorLabel: "Filing",
    detail: "₹2,999",
    description: "Excluding court fee & Intercity",
    requiresPages: false,
    fixedPrice: PRICING.filing,
    trackingSteps: ["Filing", "Numbering", "Completed"],
  },
  both: {
    value: "both",
    label: "Both",
    calculatorLabel: "Both",
    detail: "Drafting + Filing",
    description: "Drafting pages + filing, excluding court fee & Intercity",
    requiresPages: true,
    trackingSteps: ["Drafting", "Filing", "Numbering", "Completed"],
  },
  appearHearing: {
    value: "appearHearing",
    label: "Appear Hearing",
    calculatorLabel: "Appear Hearing",
    detail: "₹2,999",
    description: "Intercity",
    requiresPages: false,
    fixedPrice: PRICING.appearHearing,
    trackingSteps: ["Appear Hearing", "Completed"],
  },
};

export const SERVICE_OPTIONS = Object.values(SERVICE_CONFIG);

export const FORM_SERVICE_OPTIONS = SERVICE_OPTIONS.map(({ value, label }) => ({
  value,
  label,
}));

export function normalizeService(value = "") {
  const raw = String(value).toLowerCase();
  const compact = raw.replace(/[^a-z]/g, "");

  if (!raw.trim()) return "drafting";
  if (raw.includes("both") || raw.includes("drafting & filing") || raw.includes("drafting and filing")) return "both";
  if (compact.includes("draftingfiling") || (raw.includes("draft") && raw.includes("fil"))) return "both";
  if (raw.includes("appear") || raw.includes("hearing")) return "appearHearing";
  if (raw.includes("filing") || raw.includes("file")) return "filing";
  if (raw.includes("draft")) return "drafting";

  return SERVICE_CONFIG[value]?.value || "drafting";
}

export function normalizeStatus(value = "") {
  const raw = String(value).trim().toLowerCase();
  const compact = raw.replace(/[^a-z]/g, "");

  if (!raw) return "in-progress";
  if (compact === "inprogess" || compact === "inprogress" || raw === "pending") return "in-progress";
  if (compact === "drafting") return "drafting";
  if (compact === "filing") return "filing";
  if (compact === "numbering") return "numbering";
  if (compact === "appearhearing" || compact === "appear") return "appear-hearing";
  if (compact === "draftingcompleted" || compact === "draftcompleted") return "drafting-completed";
  if (compact === "filingcompleted" || compact === "filecompleted") return "filing-completed";
  if (compact === "completed" || compact === "complete" || compact === "done") return "completed";
  if (compact === "notfound") return "not-found";
  if (compact === "error") return "error";

  return raw.replace(/\s+/g, "-");
}

export function getServiceConfig(value) {
  return SERVICE_CONFIG[normalizeService(value)];
}

export function getTrackingSteps(value) {
  return getServiceConfig(value).trackingSteps;
}

export function calculateServiceTotal(serviceType, pages) {
  const normalized = normalizeService(serviceType);
  const pageCount = Math.max(1, Number.parseInt(pages, 10) || 1);

  if (normalized === "filing") return PRICING.filing;
  if (normalized === "appearHearing") return PRICING.appearHearing;
  if (normalized === "both") return pageCount * PRICING.draftingPerPage + PRICING.filing;

  return pageCount * PRICING.draftingPerPage;
}
