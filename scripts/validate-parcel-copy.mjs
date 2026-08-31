import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const path = "src/app/parcel/_lib/content.ts";
assert(existsSync(path), "Parcel content model must exist.");
const content = readFileSync(path, "utf8");

for (const required of [
  "We find the shipping charges you shouldn't have paid.",
  "Start a free audit",
  "25% of verified credits",
  "$0 recovered = $0 fee",
  "Example case",
  "Similar package profile",
  "Rule in effect on shipment date",
  "Zettel builds the case. You stay in control.",
]) {
  assert(content.includes(required), `Parcel content must include: ${required}`);
}

for (const forbidden of [
  "AI-powered",
  "expert-reviewed ontology",
  "built by carrier billing experts",
  "autonomous carrier",
  "we recover every dollar",
  "average savings",
  "one in five invoices",
]) {
  assert(!content.toLowerCase().includes(forbidden.toLowerCase()), `Forbidden public claim: ${forbidden}`);
}
