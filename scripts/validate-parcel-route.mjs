import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const pagePath = "src/app/parcel/page.tsx";
const layoutPath = "src/app/parcel/layout.tsx";
const navPath = "src/app/parcel/_components/ParcelTopNav.tsx";
const footerPath = "src/app/parcel/_components/ParcelFooter.tsx";

for (const path of [pagePath, layoutPath, navPath, footerPath]) {
  assert(existsSync(path), `${path} must exist.`);
}

const rootPage = readFileSync("src/app/page.tsx", "utf8");
const cname = readFileSync("public/CNAME", "utf8").trim();
const page = readFileSync(pagePath, "utf8");
const layout = readFileSync(layoutPath, "utf8");
const calendly = readFileSync("src/app/_components/CalendlyBadge.tsx", "utf8");

assert(rootPage.includes("<Hero />") && rootPage.includes("<Steps />"), "Existing drayage root composition must remain intact.");
assert(cname === "zettelops.com", "Parcel implementation must not change CNAME.");
assert(page.includes("ParcelTopNav"), "Parcel page must use ParcelTopNav.");
assert(page.includes("ParcelFooter"), "Parcel page must use ParcelFooter.");
assert(layout.includes("Zettel Parcel"), "Parcel metadata must identify Zettel Parcel.");
assert(calendly.includes("usePathname"), "Global Calendly badge must be route-aware.");
assert(calendly.includes('pathname.startsWith("/parcel")'), "Global Request-a-Pilot badge must stay off /parcel routes.");
