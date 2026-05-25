import { readFileSync } from "node:fs";

const measurementId = "G-ETQ0XMHJ8R";
const layout = readFileSync("src/app/layout.tsx", "utf8");
const gtagSrc = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

function countOccurrences(haystack, needle) {
  return haystack.split(needle).length - 1;
}

const headIndex = layout.indexOf("<head>");
assert(headIndex !== -1, "Root layout must contain a <head> element for the Google tag.");

const headContents = layout.slice(headIndex + "<head>".length);
assert(
  headContents.trimStart().startsWith(`<script async src="${gtagSrc}"></script>`),
  "Google tag loader must be the first element immediately after <head>.",
);

assert(
  countOccurrences(layout, gtagSrc) === 1,
  `Expected exactly one Google tag loader for ${measurementId}.`,
);

assert(
  countOccurrences(layout, `gtag('config', '${measurementId}');`) === 1,
  `Expected exactly one gtag config call for ${measurementId}.`,
);

assert(
  layout.includes("window.dataLayer = window.dataLayer || [];") &&
    layout.includes("function gtag(){dataLayer.push(arguments);}") &&
    layout.includes("gtag('js', new Date());"),
  "Google tag inline initialization is missing.",
);
