export type ParcelSource = {
  label: string;
  href: string;
  authority: "carrier" | "industry";
};

export type ParcelStatistic = {
  value: string;
  label: string;
  body: string;
  sources: ParcelSource[];
};

export type AuditCategory = {
  id: string;
  title: string;
  bill: string;
  check: string;
  evidence: string;
  launchState: "hidden" | "validated";
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "What we audit", href: "#what-we-audit" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const parcelCopy = {
  eyebrow: "Managed UPS & FedEx parcel audit",
  headline: "We find the shipping charges you shouldn't have paid.",
  supporting:
    "Zettel reviews UPS and FedEx bills, turns questionable charges into evidence-backed case files, and verifies the carrier credit before we calculate our fee.",
  cta: "Start a free audit",
  secondaryCta: "See what we check",
  riskLine: "No upfront fee. We only get paid when you recover money.",
  pricingHeadline: "25% of verified credits",
  pricingFacts: ["$0 setup", "$0 monthly platform fee", "$0 recovered = $0 fee"],
  controlLine: "Zettel builds the case. You stay in control.",
  evidenceLine: "If the evidence isn't there, Zettel says so.",
  exampleLabel: "Example case",
  historyLabel: "Similar package profile",
  ruleLabel: "Rule in effect on shipment date",
} as const;

export const parcelSources = {
  pitneyBowesIndex: {
    label: "Pitney Bowes Parcel Shipping Index 2026",
    href: "https://www.pitneybowes.com/us/shipping-index.html",
    authority: "industry",
  },
  ups10k: {
    label: "UPS 2025 Form 10-K",
    href: "https://investors.ups.com/sec-filings/all-sec-filings/content/0001628280-26-008432/ups-20251231.htm",
    authority: "carrier",
  },
  fedexRateAnnouncement: {
    label: "FedEx 2026 rate announcement",
    href: "https://investors.fedex.com/news-and-events/earnings-releases/default.aspx",
    authority: "carrier",
  },
  upsBilling: {
    label: "UPS Billing Center",
    href: "https://www.ups.com/us/en/business-solutions/ups-billing",
    authority: "carrier",
  },
  upsTerms: {
    label: "UPS U.S. Terms and Conditions",
    href: "https://assets.ups.com/adobe/assets/urn:aaid:aem:c6bf8a2f-018f-4aa0-838b-ffc1a75eb1d9/original/as/terms-carriage-us-en.pdf",
    authority: "carrier",
  },
  fedexServiceGuide: {
    label: "FedEx Service Guide",
    href: "https://www.fedex.com/en-us/service-guide.html",
    authority: "carrier",
  },
} as const satisfies Record<string, ParcelSource>;

export const parcelStatistics: ParcelStatistic[] = [
  {
    value: "23.1B",
    label: "U.S. parcels shipped in 2025",
    body:
      "U.S. parcel volume reached 23.1 billion shipments in 2025. At that scale, shipment-level billing is not a small-data problem.",
    sources: [parcelSources.pitneyBowesIndex],
  },
  {
    value: "5.9% / 5.9%",
    label: "average 2026 rate increases announced by UPS and FedEx",
    body:
      "Both carriers announced average 5.9% increases for 2026. Your actual spend still depends on your agreement, services, accessorials, fuel, zones, packaging, and mix.",
    sources: [parcelSources.ups10k, parcelSources.fedexRateAnnouncement],
  },
  {
    value: "250 → 270",
    label: "columns in UPS's standardized Global Flat File CSV",
    body:
      "UPS says the billing CSV expands from 250 to 270 columns in September 2026 and tells automated users to update parsing and validation.",
    sources: [parcelSources.upsBilling],
  },
];

export const painCards = [
  {
    title: "Same box. Different bill.",
    body:
      "A small measurement or classification change can materially change the final charge. The hard part is reconstructing what actually changed.",
  },
  {
    title: "A surcharge without the story is hard to challenge.",
    body:
      "One invoice line rarely tells you the shipment fact, rule, evidence, and history you need to make a defensible decision.",
  },
  {
    title: "The problem isn't a $20 surcharge. It's fighting it every week.",
    body:
      "Small disputes become expensive when someone has to investigate, document, submit, follow up, and reconcile every one by hand.",
  },
  {
    title: "A denial shouldn't erase the evidence.",
    body:
      "The carrier response belongs in the case history. Zettel preserves what was submitted, what came back, and what information is still missing.",
  },
] as const;

export const processSteps = [
  {
    title: "Send",
    body: "Start with a short audit request. We ask for one recent carrier invoice in the follow-up.",
  },
  {
    title: "Audit",
    body: "We connect billing lines to available shipment facts, applicable rules, and relevant history.",
  },
  {
    title: "Build the case",
    body: "Each supported finding gets a reason, source trail, evidence state, and reviewable next action.",
  },
  {
    title: "Recover",
    body: "We pursue the supported workflow and verify an actual posted carrier credit before recovery is counted.",
  },
] as const;

export const auditCategories: AuditCategory[] = [
  {
    id: "service-failure",
    title: "Refund-eligible service failures",
    bill: "A service commitment appears to have been missed.",
    check: "Applicable guarantee, service, events, exclusions, and request window.",
    evidence: "Invoice, tracking events, service commitment, governing guarantee.",
    launchState: "hidden",
  },
  {
    id: "measurement",
    title: "DIM and weight corrections",
    bill: "The carrier assessed different dimensions or weight.",
    check: "Declared, measured, carrier-assessed, rated values, formula, and rule in effect.",
    evidence: "Shipment record, package measurements, invoice, photos or scale evidence when available.",
    launchState: "hidden",
  },
  {
    id: "duplicate",
    title: "Duplicate charges",
    bill: "Two billing items appear to charge for the same movement or service.",
    check: "Shipment, package, tracking, invoice-line, charge, and adjustment identity.",
    evidence: "Invoice lines, shipment records, carrier billing references.",
    launchState: "hidden",
  },
  {
    id: "address-classification",
    title: "Address and classification charges",
    bill: "The carrier applied an address-related correction or classification.",
    check: "Address facts, classification, carrier-stated reason, and governing terms.",
    evidence: "Shipment/address record, invoice, carrier response, applicable rule.",
    launchState: "hidden",
  },
  {
    id: "handling",
    title: "Additional handling and package-size charges",
    bill: "The carrier applied an additional package-handling or size charge.",
    check: "Carrier-assessed package facts against the applicable criteria and exclusions.",
    evidence: "Invoice, package record, carrier assessment, relevant physical evidence.",
    launchState: "hidden",
  },
  {
    id: "rates",
    title: "Rate and discount discrepancies",
    bill: "Billed pricing appears inconsistent with the applicable agreement.",
    check: "Published terms plus the customer's actual negotiated rate/discount documents.",
    evidence: "Invoice, executed agreement, rate schedules, amendments, applicable service facts.",
    launchState: "hidden",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "What kinds of UPS and FedEx charges do you review?",
    answer:
      "We review direct carrier billing for charges that have enough source data to support a real investigation. Exact supported categories depend on carrier, service, shipment date, agreement, and evidence; we only publish a category as supported after its recovery workflow is validated.",
  },
  {
    question: "How much does Zettel cost?",
    answer:
      "The managed launch offer is 25% of verified carrier credits. There is no setup fee and no monthly platform fee for this service. If no verified credit is recovered, the recovery fee is $0.",
  },
  {
    question: "What do I need to send you?",
    answer:
      "The landing page starts with your contact details, carrier, and approximate shipment volume. We request one recent invoice in the follow-up so you do not have to upload sensitive billing data into this website.",
  },
  {
    question: "Do I need to give you my carrier password?",
    answer:
      "Not for the initial audit request. We start with the least privileged information needed and only discuss additional access if a validated ongoing workflow requires it.",
  },
  {
    question: "How does Zettel decide a charge is worth reviewing?",
    answer:
      "A case connects the billed item to available shipment facts, the rule or agreement that applied at the time, relevant evidence, and any missing information. Historical similarity can add context, but it is not proof that a carrier assessment is wrong.",
  },
  {
    question: "What happens if evidence is missing?",
    answer:
      "The case says so. Missing, contradictory, or degraded evidence stays visible instead of being replaced with an unexplained confidence score.",
  },
  {
    question: "What happens if the carrier denies a dispute?",
    answer:
      "The denial and stated reason become part of the case. Zettel reviews the response, identifies any evidence gap, and determines the next supported action. We do not promise an appeal path where one has not been validated.",
  },
  {
    question: "What if I don't have package photos or scale evidence?",
    answer:
      "We use the evidence that actually exists and show what is missing. When physical evidence would materially strengthen a future case, the case can make that gap explicit.",
  },
  {
    question: "How do you verify recovery?",
    answer:
      "A promised or approved credit is not enough. Recovery is counted only after a matching carrier credit has posted and can be reconciled back to the case.",
  },
  {
    question: "How far back can you audit?",
    answer:
      "It varies by carrier, charge type, agreement, and the rule in effect. The free audit determines what is supportable rather than applying one lookback window to every case.",
  },
  {
    question: "Do you support labels bought through another shipping platform?",
    answer:
      "The launch promise is focused on direct UPS and FedEx billing. Third-party label and marketplace workflows are not implied as supported until their operational paths are separately validated.",
  },
  {
    question: "Are you affiliated with UPS or FedEx?",
    answer: "No. Zettel is an independent service and is not affiliated with UPS or FedEx.",
  },
  {
    question: "What data does this page keep?",
    answer:
      "This landing page does not upload carrier invoices. The audit request opens a structured message in your mail client; we request billing files separately and provide handling details before you send them.",
  },
];
