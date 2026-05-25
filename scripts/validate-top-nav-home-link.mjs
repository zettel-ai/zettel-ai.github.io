import { readFileSync } from "node:fs";

const topNav = readFileSync("src/app/_components/TopNav.tsx", "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const homeLinkPattern =
  /<Link\s+href="\/"\s+className=(?:\{navLinkClass\}|"[^"]*")\s*>\s*Home\s*<\/Link>/;

assert(homeLinkPattern.test(topNav), "TopNav must include a visible Home link to the landing page.");
