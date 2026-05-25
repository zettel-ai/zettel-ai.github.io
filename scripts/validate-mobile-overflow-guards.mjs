import { readFileSync } from "node:fs";

const files = [
  "src/app/_components/Hero.tsx",
  "src/app/_components/FinalCTA.tsx",
  "src/app/_components/TopNav.tsx",
];
const contact = readFileSync("src/app/_components/Contact.tsx", "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

for (const file of files) {
  const contents = readFileSync(file, "utf8");
  assert(
    !contents.includes("text-xs font-normal whitespace-nowrap opacity-0"),
    `${file} must not use always-rendered nowrap tooltip text that can widen mobile pages.`,
  );
}

assert(!contact.includes("minWidth: 320"), "Contact Calendly embed must not force a 320px minimum inside mobile padding.");
assert(contact.includes("width: \"100%\""), "Contact Calendly embed should fit its mobile container width.");
