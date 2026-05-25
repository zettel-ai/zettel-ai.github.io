import { readFileSync } from "node:fs";

const topNav = readFileSync("src/app/_components/TopNav.tsx", "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

assert(topNav.startsWith('"use client";'), "TopNav must be a client component for mobile menu state.");
assert(topNav.includes("useState"), "TopNav must use state to open and close the mobile menu.");
assert(topNav.includes('aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}'), "Mobile menu button needs an accessible dynamic label.");
assert(topNav.includes("md:hidden"), "TopNav must include mobile-only hamburger/menu UI.");
assert(topNav.includes("hidden md:flex"), "Desktop navigation must remain hidden on mobile and visible from md up.");
assert(topNav.includes("isMobileMenuOpen &&"), "Mobile navigation panel must render only when open.");
assert(topNav.includes("menu") && topNav.includes("close"), "Mobile button must switch between menu and close icons.");
assert(topNav.includes("Request a Pilot"), "Mobile navigation must include Request a Pilot.");
