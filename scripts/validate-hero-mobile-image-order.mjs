import { readFileSync } from "node:fs";

const hero = readFileSync("src/app/_components/Hero.tsx", "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const offerIndex = hero.indexOf("Early adopter offer");
const mobileImageIndex = hero.indexOf('className="relative mx-auto mb-8 w-full max-w-[360px] lg:hidden"');
const ctaIndex = hero.indexOf('className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"');

assert(offerIndex !== -1, "Hero must include the early adopter offer.");
assert(mobileImageIndex !== -1, "Hero must include a mobile-only iPhone image after the offer.");
assert(ctaIndex !== -1, "Hero must include CTA buttons.");
assert(
  offerIndex < mobileImageIndex && mobileImageIndex < ctaIndex,
  "Mobile iPhone image must appear between the early adopter offer and CTA buttons.",
);
assert(
  hero.includes('className="relative hidden w-full max-w-[563px] mx-auto lg:mx-0 lg:ml-auto lg:block"'),
  "Hero must preserve the desktop iPhone image in the right column.",
);
