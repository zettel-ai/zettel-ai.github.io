import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";

const root = process.cwd();
const contentDir = path.join(root, "src/content/blog");
const publicDir = path.join(root, "public");
const requiredFields = [
  "title",
  "slug",
  "description",
  "date",
  "topic",
  "readTime",
  "heroImage",
  "diagram",
  "sources",
];

const bannedPatterns = [
  "What would you like to do next",
  "writer-gpt.com",
  "Translate this article",
  "Private Prompt Library",
  "Article Mode",
  "Blog Article + Image Mode",
];

function fail(message) {
  console.error(`Blog validation failed: ${message}`);
  process.exitCode = 1;
}

function publicPathExists(src) {
  if (typeof src !== "string" || !src.startsWith("/")) return false;

  const candidate = path.resolve(publicDir, `.${src}`);
  const relative = path.relative(publicDir, candidate);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return false;

  return fs.existsSync(candidate);
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

if (!fs.existsSync(contentDir)) {
  fail(`missing content directory: ${path.relative(root, contentDir)}`);
} else {
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".md"));

  if (files.length !== 18) {
    fail(`expected 18 blog posts, found ${files.length}`);
  }

  const slugs = new Set();

  for (const file of files) {
    const fullPath = path.join(contentDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);
    const label = path.relative(root, fullPath);

    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === "") {
        fail(`${label} missing frontmatter field "${field}"`);
      }
    }

    if (typeof data.slug === "string") {
      if (slugs.has(data.slug)) fail(`${label} duplicate slug "${data.slug}"`);
      slugs.add(data.slug);
      if (`${data.slug}.md` !== file) {
        fail(`${label} filename must match slug "${data.slug}.md"`);
      }
    }

    if (raw.includes("—")) fail(`${label} contains an em dash`);
    for (const pattern of bannedPatterns) {
      if (raw.includes(pattern)) fail(`${label} contains banned boilerplate: ${pattern}`);
    }

    if (!data.heroImage || !publicPathExists(data.heroImage.src)) {
      fail(`${label} heroImage.src is missing or does not exist`);
    }

    const inlineImages = Array.isArray(data.inlineImages) ? data.inlineImages : [];
    for (const image of inlineImages) {
      if (!publicPathExists(image.src)) fail(`${label} inline image is missing: ${image.src}`);
      if (!hasText(image.sourceUrl) || !hasText(image.license)) {
        fail(`${label} inline image missing sourceUrl or license`);
      }
    }

    if (!hasText(data.heroImage?.sourceUrl) || !hasText(data.heroImage?.license)) {
      fail(`${label} hero image missing sourceUrl or license`);
    }

    if (!data.diagram || !publicPathExists(data.diagram.src)) {
      fail(`${label} diagram.src is missing or does not exist`);
    }

    if (!hasText(data.diagram?.alt) || !hasText(data.diagram?.caption)) {
      fail(`${label} diagram missing alt or caption`);
    }

    const sources = Array.isArray(data.sources) ? data.sources : [];
    if (sources.length === 0) fail(`${label} must include at least one factual source`);

    sources.forEach((source, index) => {
      if (!hasText(source.label) || !hasText(source.url)) {
        fail(`${label} source ${index + 1} missing label or url`);
      }
    });

    const sourcesHeading = content.match(/^## Sources\s*$/m);
    if (!sourcesHeading) {
      fail(`${label} missing "## Sources" section`);
    }

    const articleBody = sourcesHeading ? content.slice(0, sourcesHeading.index) : content;
    const sourcesSection = sourcesHeading ? content.slice(sourcesHeading.index + sourcesHeading[0].length) : "";

    if (sourcesHeading && sourcesSection.trim().length === 0) {
      fail(`${label} has an empty "## Sources" section`);
    }

    for (let i = 1; i <= sources.length; i += 1) {
      if (!sourcesSection.includes(`[${i}]`)) {
        fail(`${label} Sources section is missing source marker [${i}]`);
      }
    }

    const citations = Array.from(articleBody.matchAll(/\[(\d+)\]/g), (match) => Number(match[1]));
    if (citations.length === 0) fail(`${label} has no inline citations`);

    for (const citation of citations) {
      if (citation < 1 || citation > sources.length) {
        fail(`${label} citation [${citation}] does not match a declared source`);
      }
    }

    for (let i = 1; i <= sources.length; i += 1) {
      if (!articleBody.includes(`[${i}]`)) {
        fail(`${label} source ${i} is not cited inline`);
      }
    }

    if (articleBody.trim().length < 1500) {
      fail(`${label} content is unexpectedly short`);
    }
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Blog validation passed.");
