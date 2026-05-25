import { readFileSync } from "node:fs";

const contact = readFileSync("src/app/_components/Contact.tsx", "utf8");
const expectedSrc =
  "https://tally.so/embed/NpRbO0?alignLeft=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1";

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

assert(
  contact.includes(`const TALLY_EMBED_SRC =\n  "${expectedSrc}";`),
  "Tally embed URL must enable formEventsForwarding=1 while preserving existing options.",
);

assert(
  contact.includes("data-tally-src={TALLY_EMBED_SRC}"),
  "Tally iframe must use the validated embed URL.",
);
