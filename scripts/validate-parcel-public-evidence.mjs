import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const contentPath = "src/app/parcel/_lib/content.ts";
assert(existsSync(contentPath), "Parcel content model must exist before evidence validation.");
const content = readFileSync(contentPath, "utf8");

for (const required of [
  "23.1B",
  "5.9% / 5.9%",
  "250 → 270",
  "Pitney Bowes Parcel Shipping Index 2026",
  "UPS 2025 Form 10-K",
  "FedEx 2026 rate announcement",
  "UPS Billing Center",
]) {
  assert(content.includes(required), `Parcel evidence content must include: ${required}`);
}

const forbidden = [
  "AuditShipment",
  "LateShipment",
  "Refund Retriever",
  "71lbs",
  "Sifted",
  "Reveel",
  "Shipware",
  "TransImpact",
  "Intelligent Audit",
  "Catalyst",
  "Green Mountain Technology",
  "Lojistic",
  "ShipSigma",
  "Transportation Insight",
  "auditshipment.com",
  "lateshipment.com",
  "refundretriever.com",
  "71lbs.com",
  "sifted.com",
  "reveelgroup.com",
  "shipware.com",
  "transimpact.com",
  "intelligentaudit.com",
  "gmtcorp.com",
  "lojistic.com",
  "shipsigma.com",
  "transportationinsight.com",
];

function textFiles(root) {
  if (!existsSync(root)) return [];
  const result = [];
  for (const name of readdirSync(root)) {
    const path = join(root, name);
    const stat = statSync(path);
    if (stat.isDirectory()) result.push(...textFiles(path));
    else if ([".ts", ".tsx", ".js", ".mjs", ".svg"].includes(extname(path))) result.push(path);
  }
  return result;
}

for (const path of [...textFiles("src/app/parcel"), ...textFiles("public/diagrams/parcel")]) {
  const source = readFileSync(path, "utf8").toLowerCase();
  for (const term of forbidden) {
    assert(!source.includes(term.toLowerCase()), `Public Parcel asset ${path} must not expose competitor term/domain: ${term}`);
  }
}
