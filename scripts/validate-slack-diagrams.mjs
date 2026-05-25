import { readFileSync } from "node:fs";

const sourceRoot = "/Users/jallen/projects/zettel_ai/website_diagram";

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

function read(path) {
  return readFileSync(path, "utf8");
}

const ingestD2 = read(`${sourceRoot}/ingest.d2`);
const communicateD2 = read(`${sourceRoot}/communicate.d2`);
const sourceIngestSvg = read(`${sourceRoot}/ingest.svg`);
const sourceCommunicateSvg = read(`${sourceRoot}/communicate.svg`);
const publicIngestSvg = read("public/diagrams/ingest.svg");
const publicCommunicateSvg = read("public/diagrams/communicate.svg");

assert(ingestD2.includes("slack: Slack"), "ingest.d2 must include Slack as an ingest channel.");
assert(ingestD2.includes("slack -> docs"), "ingest.d2 must connect Slack to Documents.");
assert(
  ingestD2.includes("channel: {\n    width: 104\n    height: 52"),
  "ingest.d2 channel boxes should be smaller to accommodate Slack without expanding the diagram.",
);
assert(
  communicateD2.includes('slack_out: "Slack"'),
  "communicate.d2 must include Slack as an output channel.",
);
assert(
  communicateD2.includes("slack_out <-> stakeholders"),
  "communicate.d2 must connect Slack to Stakeholders.",
);
assert(
  communicateD2.includes("channel: {\n    width: 104\n    height: 52"),
  "communicate.d2 channel boxes should be smaller to accommodate Slack without expanding the diagram.",
);

assert(
  sourceIngestSvg.includes('viewBox="0 0 680 496"') &&
    sourceIngestSvg.includes('width="680" height="496"') &&
    publicIngestSvg.includes('viewBox="0 0 680 496"') &&
    publicIngestSvg.includes('width="680" height="496"'),
  "Ingest SVG dimensions must remain 680x496 in source and public diagrams.",
);

assert(
  sourceCommunicateSvg.includes('viewBox="0 0 660 439"') &&
    sourceCommunicateSvg.includes('width="660" height="439"') &&
    publicCommunicateSvg.includes('viewBox="0 0 660 439"') &&
    publicCommunicateSvg.includes('width="660" height="439"'),
  "Communicate SVG dimensions must remain 660x439 in source and public diagrams.",
);

assert(publicIngestSvg.includes(">Slack<"), "Public ingest diagram must render a Slack label.");
assert(publicCommunicateSvg.includes(">Slack<"), "Public communicate diagram must render a Slack label.");
