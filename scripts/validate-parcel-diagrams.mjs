import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const manifestPath = "docs/superpowers/parcel-diagram-sources.md";
assert(existsSync(manifestPath), "Parcel diagram provenance manifest must exist.");
const manifest = readFileSync(manifestPath, "utf8");

const assets = [
  ["parcel-case-assembly.svg", "FullContextSection.tsx", "parcel/parcel-case-assembly.d2"],
  ["same-box-different-bill.svg", "HistorySection.tsx", "parcel/same-box-different-bill.d2"],
];

for (const [asset, component, sourcePath] of assets) {
  const assetPath = `public/diagrams/parcel/${asset}`;
  const componentPath = `src/app/parcel/_components/${component}`;
  assert(existsSync(assetPath), `${assetPath} must exist.`);
  assert(existsSync(componentPath), `${componentPath} must exist.`);
  const svg = readFileSync(assetPath, "utf8");
  const componentSource = readFileSync(componentPath, "utf8");
  assert(svg.includes("<svg"), `${asset} must be SVG.`);
  assert(svg.includes("viewBox"), `${asset} must include a responsive viewBox.`);
  assert(componentSource.includes(`/diagrams/parcel/${asset}`), `${component} must render ${asset}.`);
  assert(manifest.includes(assetPath), `Manifest must include ${assetPath}.`);
  assert(manifest.includes(sourcePath), `Manifest must include ${sourcePath}.`);
}

assert(manifest.includes("zettel-ai/website_diagram"), "Manifest must identify the diagram source repository.");
assert(manifest.includes("D2 version"), "Manifest must record the D2 renderer version.");
