import { readFileSync } from "node:fs";

const hero = readFileSync("src/app/_components/Hero.tsx", "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

assert(
  hero.includes("All from your inbox."),
  "Hero must include the emphasized inbox value statement.",
);

assert(hero.includes("Early adopter offer"), "Hero must include the early adopter offer label.");
assert(
  hero.includes("Get $200 in usage credits and the first 3 months of platform fees waived."),
  "Hero must include the full early adopter offer details.",
);

assert(
  hero.includes("bg-primary-fixed") || hero.includes("border-primary"),
  "Hero offer/message must use visual treatment that makes it stand out.",
);
