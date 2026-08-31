import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const dialogPath = "src/app/parcel/_components/AuditIntakeDialog.tsx";
const analyticsPath = "src/app/parcel/_lib/analytics.ts";
assert(existsSync(dialogPath), "Audit intake dialog must exist.");
assert(existsSync(analyticsPath), "Parcel analytics helper must exist.");

const dialog = readFileSync(dialogPath, "utf8");
const analytics = readFileSync(analyticsPath, "utf8");

for (const required of [
  "Name",
  "Work email",
  "Company",
  "Carrier",
  "Approximate shipments per month",
  "zettel.ops@gmail.com",
  "recent invoice",
  "noValidate",
]) {
  assert(dialog.includes(required), `Audit intake must include: ${required}`);
}

assert(!dialog.includes('type="file"'), "Website intake must not pretend file upload exists.");
assert(!analytics.includes("email"), "Analytics helper must not accept email values.");
assert(!analytics.includes("company"), "Analytics helper must not accept company values.");
assert(!analytics.includes("tracking"), "Analytics helper must not accept tracking data.");
