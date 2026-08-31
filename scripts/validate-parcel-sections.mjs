import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const pagePath = "src/app/parcel/page.tsx";
const contentPath = "src/app/parcel/_lib/content.ts";
assert(existsSync(pagePath), "Parcel page must exist.");
assert(existsSync(contentPath), "Parcel content model must exist.");

const page = readFileSync(pagePath, "utf8");
const content = readFileSync(contentPath, "utf8");

for (const component of [
  "ParcelHero",
  "RiskReversalStrip",
  "ParcelStatsSection",
  "PainSection",
  "FullContextSection",
  "HistorySection",
  "HowItWorksSection",
  "DenialSection",
  "AuditCategoriesSection",
  "EvidenceTrustSection",
  "PricingSection",
  "DataTrustSection",
  "FaqSection",
  "FinalParcelCta",
]) {
  assert(page.includes(component), `Parcel page must render ${component}.`);
}

for (const anchor of ["how-it-works", "what-we-audit", "pricing", "faq"]) {
  assert(page.includes(anchor) || content.includes(anchor), `Parcel page/content must expose #${anchor}.`);
}

assert(content.includes('launchState: "hidden"'), "Candidate audit categories must default to hidden until validated.");
assert(content.includes("Denied isn't the same as explained."), "Denial section copy must be present.");
assert(content.includes("If the evidence isn't there, Zettel says so."), "Evidence-completeness trust copy must be present.");
