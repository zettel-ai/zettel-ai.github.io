import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const path = "src/app/parcel/_components/CaseFile.tsx";
assert(existsSync(path), "CaseFile component must exist.");
const source = readFileSync(path, "utf8");

for (const required of [
  "Example case",
  "Shipper-declared",
  "Carrier-assessed",
  "Rule in effect on shipment date",
  "Missing evidence",
  "Similar package profile",
  "Review case",
]) {
  assert(source.includes(required), `Case File must include: ${required}`);
}

assert(!source.includes("Knowledge graph"), "Case File must not expose knowledge-graph jargon.");
assert(!source.includes("AI confidence"), "Case File must not replace evidence with an AI confidence score.");
