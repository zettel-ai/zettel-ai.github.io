import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const sourceDir = "/Users/jallen/projects/zettel_ai/assets/zettel_blogs";
const outputDir = path.join(process.cwd(), ".blog-drafts");

const posts = [
  ["blog.md", "ai-freight-email-automation"],
  ["blog copy 17.md", "ai-freight-document-management"],
  ["blog copy 16.md", "ai-import-operations"],
  ["blog copy 13.md", "container-ready-for-pickup"],
  ["blog copy 5.md", "demurrage-vs-detention"],
  ["blog copy 11.md", "document-ownership-freight"],
  ["blog copy 15.md", "documents-needed-for-container-pickup"],
  ["blog copy 12.md", "freight-document-checklist"],
  ["blog copy 2.md", "freight-document-management"],
  ["blog copy 3.md", "freight-exception-management"],
  ["blog copy 6.md", "freight-operations-prioritization"],
  ["blog copy 4.md", "freight-visibility-tools-not-enough"],
  ["blog copy 8.md", "last-free-day-shipping"],
  ["blog copy 10.md", "missing-documents-last-free-day"],
  ["blog copy 7.md", "missing-shipping-documents"],
  ["blog copy 9.md", "shipment-readiness-checklist"],
  ["blog copy 14.md", "shipping-document-organization"],
  ["blog copy.md", "what-is-blocking-my-shipment"],
];

const bottomBoilerplateMarkers = [
  "You can switch between modes anytime",
  "What would you like to do next?",
];

function normalizeLineEndings(markdown) {
  return markdown.replace(/\r\n?/g, "\n");
}

function stripBottomBoilerplate(markdown) {
  const markerIndexes = bottomBoilerplateMarkers
    .map((marker) => markdown.indexOf(marker))
    .filter((index) => index !== -1);

  if (markerIndexes.length === 0) {
    return markdown;
  }

  return markdown.slice(0, Math.min(...markerIndexes));
}

function stripBeforeFirstH1(markdown) {
  const firstH1 = markdown.search(/^#\s+/m);

  if (firstH1 === -1) {
    return markdown;
  }

  return markdown.slice(firstH1);
}

function removeFirstH1(markdown) {
  return markdown.replace(/^#\s+.*\n+/, "");
}

function stripLeadingHorizontalRules(markdown) {
  return markdown.replace(/^(?:\s*---\s*\n+)+/, "");
}

function stripLeadingMetadata(markdown) {
  let cleaned = markdown;
  let previous;

  do {
    previous = cleaned;
    cleaned = cleaned.replace(
      /^\s*\*\*(?:Meta Description|Meta description|Image note|Research and image note):\*\*.*\n+/i,
      "",
    );
    cleaned = stripLeadingHorizontalRules(cleaned);
  } while (cleaned !== previous);

  return cleaned;
}

function stripLeadingOutline(markdown) {
  return markdown.replace(
    /^\s*##\s+\*\*(?:Comprehensive\s+)?(?:SEO\s+)?Outline\*\*\s*\n[\s\S]*?(?:^---\s*\n+|(?=^#{1,6}\s+))/m,
    "",
  );
}

function stripTopBoilerplate(markdown) {
  let cleaned = stripBeforeFirstH1(markdown);
  cleaned = removeFirstH1(cleaned);
  cleaned = stripLeadingMetadata(cleaned);
  cleaned = stripLeadingOutline(cleaned);
  cleaned = stripLeadingMetadata(cleaned);
  return cleaned;
}

function stripMarkdownBoldFromHeadings(markdown) {
  return markdown.replace(/^(#{1,6})\s+\*\*(.*?)\*\*\s*$/gm, "$1 $2");
}

function normalize(markdown) {
  return stripMarkdownBoldFromHeadings(
    stripTopBoilerplate(stripBottomBoilerplate(normalizeLineEndings(markdown))),
  )
    .replaceAll("—", ", ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

fs.mkdirSync(outputDir, { recursive: true });

for (const [sourceFile, slug] of posts) {
  const sourcePath = path.join(sourceDir, sourceFile);
  const raw = fs.readFileSync(sourcePath, "utf8");
  const body = normalize(raw);
  fs.writeFileSync(path.join(outputDir, `${slug}.md`), `${body}\n`);
}

console.log(`Wrote ${posts.length} drafts to ${outputDir}`);
