import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const faqPagePath = "src/app/faq/page.tsx";
const topNav = readFileSync("src/app/_components/TopNav.tsx", "utf8");
const footer = readFileSync("src/app/_components/Footer.tsx", "utf8");

assert(existsSync(faqPagePath), "FAQ page must exist at /faq.");

const faqPage = readFileSync(faqPagePath, "utf8");
const questionCount = (faqPage.match(/question:/g) || []).length;

assert(questionCount === 20, `FAQ page should define 20 questions, found ${questionCount}.`);
assert(faqPage.includes('"@type": "FAQPage"'), "FAQ page must include FAQPage JSON-LD.");
assert(
  faqPage.includes("JSON.stringify(faqJsonLd).replace(/</g,"),
  "FAQ JSON-LD must escape '<' before rendering.",
);
assert(faqPage.includes("Frequently Asked Questions"), "FAQ page must render the FAQ heading.");
assert(faqPage.includes("What is Zettel Ops?"), "FAQ page must include the first FAQ question.");
assert(faqPage.includes("Is there an early adopter offer?"), "FAQ page must include the final FAQ question.");

assert(topNav.includes('href="/faq"') && topNav.includes("FAQ"), "Desktop/mobile navigation must link to /faq.");
assert(footer.includes('href: "/faq"') && footer.includes('title: "FAQ"'), "Footer navigation must include FAQ.");
