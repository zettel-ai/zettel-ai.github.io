# Zettel Parcel Research, Statistics, And Visuals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add source-backed Parcel validation statistics and two useful Zettel-style explanatory diagrams to the `/parcel/` landing page while keeping competitor research strictly internal and preserving editable diagram source in `zettel-ai/website_diagram`.

**Architecture:** Extend the route-local Parcel content model from the main implementation plan with public evidence/source records, render a three-card source-backed statistics section, and integrate two reviewed SVG diagrams. Editable D2 and rendered canonical SVGs live in `zettel-ai/website_diagram`; the landing-page repo receives only reviewed SVG copies plus a provenance mapping. The native HTML/CSS Zettel Case File remains the primary hero visual.

**Tech Stack:** Next.js 16.2.6 App Router, React 19.2.4, TypeScript 5, Tailwind CSS v4, Node validation scripts, static export, D2 with the existing `website_diagram` ELK-based design language, SVG, Git.

**Spec:**
- `docs/superpowers/specs/2026-08-30-parcel-audit-landing-page-design.md`
- `docs/superpowers/specs/2026-08-30-parcel-audit-ontology-appendix.md`
- `docs/superpowers/specs/2026-08-30-parcel-audit-research-visuals-addendum.md`
- `docs/superpowers/research/2026-08-30-parcel-market-domain-evidence.md`

**Base plan:** `docs/superpowers/plans/2026-08-30-zettel-parcel-landing-page.md`

## Global Constraints

- Execute this supplement together with the base plan; where public competitor/statistics/diagram requirements differ, this supplement governs.
- Implement the website at `/parcel/`; do not change the current root drayage page, `public/CNAME`, DNS, GitHub Pages workflow, or `next.config.ts`.
- Competitors are internal research only. No competitor name, product name, logo, screenshot, price, recovery result, vendor statistic, or outbound competitor domain may appear in `src/app/parcel` or `public/diagrams/parcel`.
- Approved public headline statistics are exactly `23.1B`, `5.9% / 5.9%`, and `250 → 270`, with the explanatory wording and source constraints from the research/visuals addendum.
- Do not publish a generic parcel invoice-error percentage.
- Every public headline statistic must display a visible non-competitor source link.
- Keep the hero Zettel Case File native HTML/CSS; do not replace it with a static SVG.
- Create editable diagram source in `zettel-ai/website_diagram`, not in the landing-page repo.
- Required diagram sources are `parcel/parcel-case-assembly.d2` and `parcel/same-box-different-bill.d2`; required canonical rendered files are the same paths with `.svg`.
- Copy reviewed SVGs to `public/diagrams/parcel/` in the website repo and record source commit provenance in `docs/superpowers/parcel-diagram-sources.md`.
- Reuse the existing `website_diagram` visual language: ELK layout, white/transparent canvas, Zettel green, information blue, neutral borders/text, rounded cards, restrained connector lines, repository-local icons.
- Do not use UPS/FedEx logos in the diagrams. Neutral labels are sufficient.
- Historical similarity is context, not proof. The history diagram must visibly communicate `Historical context — not proof` and use `Similar package profile` for the evidentiary object.
- Diagrams may not be the sole carrier of a critical fact; adjacent HTML must communicate the same concept.
- Diagram text must remain legible at narrow widths; no horizontal page overflow at 320 CSS pixels.
- Before modifying Next.js components, read the relevant installed Next 16 documentation under `node_modules/next/dist/docs/` as required by `AGENTS.md`.
- Before editing diagram source, inspect the current `zettel-ai/website_diagram` source patterns (`ingest.d2`, `analyze.d2`, `communicate.d2`) and its current D2/rendering instructions if present.
- Do not add runtime dependencies for this work.

---

## File Structure

### Website repository — create

- `src/app/parcel/_components/ParcelStatsSection.tsx` — three sourced market/domain validation cards.
- `scripts/validate-parcel-public-evidence.mjs` — public-stat/source/competitor-exclusion validation.
- `scripts/validate-parcel-diagrams.mjs` — required copied SVG/provenance/accessibility guard.
- `public/diagrams/parcel/parcel-case-assembly.svg` — reviewed copy from diagram repo.
- `public/diagrams/parcel/same-box-different-bill.svg` — reviewed copy from diagram repo.
- `docs/superpowers/parcel-diagram-sources.md` — immutable mapping from website asset to diagram source path/commit/purpose/text equivalent.

### Website repository — modify

- `src/app/parcel/_lib/content.ts` — add `ParcelStatistic` and approved public-stat/source data.
- `src/app/parcel/page.tsx` — render `ParcelStatsSection` in approved order and include diagram-bearing sections from the base plan.
- `src/app/parcel/_components/FullContextSection.tsx` — render case-assembly diagram next to/after accessible text.
- `src/app/parcel/_components/HistorySection.tsx` — render similar-package history diagram next to/after accessible text.
- `package.json` — register `validate:parcel:evidence` and `validate:parcel:diagrams`; include both in aggregate `validate:parcel`.
- `README.md` — document diagram-source repository/provenance workflow in Parcel developer notes.

### Diagram repository — create

- `parcel/parcel-case-assembly.d2`
- `parcel/parcel-case-assembly.svg`
- `parcel/same-box-different-bill.d2`
- `parcel/same-box-different-bill.svg`

### Diagram repository — reuse

- existing D2 classes/design patterns from `ingest.d2`, `analyze.d2`, `communicate.d2`;
- existing semantic icons under `icons/` where appropriate.

---

### Task 1: Add Public Evidence Data And Competitor-Exclusion Guard

**Dependencies:** Base plan Task 2 (`src/app/parcel/_lib/content.ts`) is complete.

**Files:**
- Modify: `src/app/parcel/_lib/content.ts`
- Create: `scripts/validate-parcel-public-evidence.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: existing `parcelSources` and `parcelCopy` from the base plan.
- Produces: `ParcelStatistic`, `parcelStatistics`, and `parcelEvidenceSources` for `ParcelStatsSection`.
- Produces: static validation that rejects competitor names/domains from public Parcel source/assets.

- [ ] **Step 1: Write the failing public-evidence validator**

Create `scripts/validate-parcel-public-evidence.mjs`:

```js
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const contentPath = "src/app/parcel/_lib/content.ts";
assert(existsSync(contentPath), "Parcel content model must exist before evidence validation.");
const content = readFileSync(contentPath, "utf8");

for (const required of [
  "23.1B",
  "5.9% / 5.9%",
  "250 → 270",
  "Pitney Bowes Parcel Shipping Index 2026",
  "UPS 2025 Form 10-K",
  "FedEx 2026 rate announcement",
  "UPS Billing Center",
]) {
  assert(content.includes(required), `Parcel evidence content must include: ${required}`);
}

for (const requiredUrl of [
  "https://www.pitneybowes.com/us/shipping-index.html",
  "https://investors.ups.com/sec-filings/all-sec-filings/content/0001628280-26-008432/ups-20251231.htm",
  "https://investors.fedex.com/news-and-events/earnings-releases/default.aspx",
  "https://www.ups.com/us/en/business-solutions/ups-billing",
]) {
  assert(content.includes(requiredUrl), `Missing approved public source: ${requiredUrl}`);
}

const forbidden = [
  "AuditShipment",
  "LateShipment",
  "Refund Retriever",
  "71lbs",
  "Sifted",
  "Reveel",
  "Shipware",
  "TransImpact",
  "Intelligent Audit",
  "Catalyst",
  "Green Mountain Technology",
  "Lojistic",
  "ShipSigma",
  "Transportation Insight",
  "auditshipment.com",
  "lateshipment.com",
  "refundretriever.com",
  "71lbs.com",
  "sifted.com",
  "reveelgroup.com",
  "shipware.com",
  "transimpact.com",
  "intelligentaudit.com",
  "greenmountaintechnology.com",
  "lojistic.com",
  "shipsigma.com",
  "transportationinsight.com",
];

const roots = ["src/app/parcel", "public/diagrams/parcel"];
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".svg", ".md"]);

function collectTextFiles(path) {
  if (!existsSync(path)) return [];
  if (statSync(path).isFile()) return textExtensions.has(extname(path)) ? [path] : [];
  return readdirSync(path).flatMap((entry) => collectTextFiles(join(path, entry)));
}

for (const file of roots.flatMap(collectTextFiles)) {
  const text = readFileSync(file, "utf8").toLowerCase();
  for (const token of forbidden) {
    assert(!text.includes(token.toLowerCase()), `Public Parcel asset ${file} contains forbidden competitor token: ${token}`);
  }
}

for (const rejectedStat of [
  "3–5%",
  "3-5%",
  "80% of businesses",
  "75% of parcel credits",
  "one in five invoices",
  "1–9%",
  "1-9%",
]) {
  assert(!content.toLowerCase().includes(rejectedStat.toLowerCase()), `Rejected vendor-origin statistic found: ${rejectedStat}`);
}
```

- [ ] **Step 2: Register the validator and verify it fails**

Add:

```json
"validate:parcel:evidence": "node scripts/validate-parcel-public-evidence.mjs"
```

Run:

```bash
npm run validate:parcel:evidence
```

Expected: FAIL because `content.ts` does not yet contain the approved statistics/source records.

- [ ] **Step 3: Add the typed public-stat model**

Add to `src/app/parcel/_lib/content.ts`:

```ts
export type ParcelStatistic = {
  value: string;
  label: string;
  body: string;
  sources: readonly {
    label: string;
    href: string;
  }[];
};
```

Add:

```ts
export const parcelStatistics = [
  {
    value: "23.1B",
    label: "U.S. parcels shipped in 2025",
    body: "U.S. parcel volume reached 23.1 billion shipments in 2025. At that scale, shipment-level billing is not a small-data problem.",
    sources: [
      {
        label: "Pitney Bowes Parcel Shipping Index 2026",
        href: "https://www.pitneybowes.com/us/shipping-index.html",
      },
    ],
  },
  {
    value: "5.9% / 5.9%",
    label: "average 2026 rate increases announced by UPS and FedEx",
    body: "UPS implemented a separate average 5.9% net increase in base and accessorial rates for 2026, while FedEx increased parcel shipping rates by an average of 5.9% effective January 5, 2026. Your actual spend depends on your agreement, mix, accessorials, fuel, zones, packaging, and services.",
    sources: [
      {
        label: "UPS 2025 Form 10-K",
        href: "https://investors.ups.com/sec-filings/all-sec-filings/content/0001628280-26-008432/ups-20251231.htm",
      },
      {
        label: "FedEx 2026 rate announcement",
        href: "https://investors.fedex.com/news-and-events/earnings-releases/default.aspx",
      },
    ],
  },
  {
    value: "250 → 270",
    label: "columns in UPS's standardized Global Flat File CSV",
    body: "UPS says its Global Flat File billing CSV expands from 250 columns to 270 columns in September 2026, and tells automated users to update parsing and validation processes.",
    sources: [
      {
        label: "UPS Billing Center",
        href: "https://www.ups.com/us/en/business-solutions/ups-billing",
      },
    ],
  },
] as const satisfies readonly ParcelStatistic[];
```

- [ ] **Step 4: Run the evidence validator**

```bash
npm run validate:parcel:evidence
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/parcel/_lib/content.ts scripts/validate-parcel-public-evidence.mjs package.json
git commit -m "feat: add sourced Parcel validation evidence"
```

---

### Task 2: Render The Three-Card Statistics Section

**Dependencies:** Task 1 complete.

**Files:**
- Create: `src/app/parcel/_components/ParcelStatsSection.tsx`
- Modify: `src/app/parcel/page.tsx`
- Modify: `scripts/validate-parcel-public-evidence.mjs`

**Interfaces:**
- Consumes: `parcelStatistics: readonly ParcelStatistic[]`.
- Produces: `<ParcelStatsSection />` with `id="parcel-scale"`, three source-linked cards, and no competitor content.

- [ ] **Step 1: Extend the validator to require the section**

Append to `scripts/validate-parcel-public-evidence.mjs`:

```js
const statsComponentPath = "src/app/parcel/_components/ParcelStatsSection.tsx";
const pagePath = "src/app/parcel/page.tsx";
assert(existsSync(statsComponentPath), "ParcelStatsSection must exist.");
assert(existsSync(pagePath), "Parcel page must exist.");

const statsComponent = readFileSync(statsComponentPath, "utf8");
const page = readFileSync(pagePath, "utf8");

assert(statsComponent.includes("parcelStatistics.map"), "Stats section must render the centralized parcelStatistics data.");
assert(statsComponent.includes('id="parcel-scale"'), "Stats section must expose #parcel-scale.");
assert(statsComponent.includes('target="_blank"'), "Headline statistic sources must be visibly linkable.");
assert(statsComponent.includes('rel="noopener noreferrer"'), "External source links must use safe rel attributes.");
assert(page.includes("<ParcelStatsSection"), "Parcel page must render ParcelStatsSection.");
```

- [ ] **Step 2: Run validation and verify failure**

```bash
npm run validate:parcel:evidence
```

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Create `ParcelStatsSection.tsx`**

Use this structure:

```tsx
import { parcelStatistics } from "../_lib/content";

export function ParcelStatsSection() {
  return (
    <section id="parcel-scale" className="border-b border-outline-variant bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Why systematic review matters</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-on-background md:text-5xl">
            Parcel billing is a moving target at massive scale.
          </h2>
          <p className="mt-5 text-lg leading-8 text-on-surface-variant">
            Billions of shipments, annual rate changes, and hundreds of billing fields create a lot of places for one confusing charge to hide.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {parcelStatistics.map((stat) => (
            <article key={stat.value} className="border border-outline-variant bg-surface-container-lowest p-6">
              <p className="text-4xl font-semibold tracking-tight text-primary">{stat.value}</p>
              <h3 className="mt-3 text-lg font-semibold text-on-background">{stat.label}</h3>
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">{stat.body}</p>
              <div className="mt-5 space-y-2">
                {stat.sources.map((source) => (
                  <a
                    key={source.href}
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs font-semibold uppercase tracking-[0.08em] text-primary hover:underline"
                  >
                    Source: {source.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Compose it in the approved page order**

Import and render `<ParcelStatsSection />` after the hero/risk-reversal block and before the qualitative pain section.

- [ ] **Step 5: Verify**

```bash
npm run validate:parcel:evidence
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/app/parcel/_components/ParcelStatsSection.tsx src/app/parcel/page.tsx scripts/validate-parcel-public-evidence.mjs
git commit -m "feat: add sourced Parcel scale statistics"
```

---

### Task 3: Create The Case-Assembly Diagram In `website_diagram`

**Repository:** `zettel-ai/website_diagram`

**Files:**
- Create: `parcel/parcel-case-assembly.d2`
- Create: `parcel/parcel-case-assembly.svg`

**Interfaces:**
- Produces: a canonical D2 source and reviewed SVG explaining source facts → Case File → review → carrier response → verified credit.
- Later Task 5 copies the reviewed SVG into the website repo.

- [ ] **Step 1: Create an isolated diagram-repo worktree**

Use `superpowers:using-git-worktrees` at execution time. Start from current `main` and create a feature branch such as:

```bash
git switch -c feature/parcel-landing-diagrams
```

If the skill creates the branch/worktree for you, use its resolved path rather than manually switching the primary checkout.

- [ ] **Step 2: Inspect the established design sources before editing**

Read:

```text
ingest.d2
analyze.d2
communicate.d2
```

List `icons/` and reuse existing semantic icons where possible. Run:

```bash
d2 --version
```

Record the actual D2 version in the implementation review note.

- [ ] **Step 3: Create a source-level content guard**

Before rendering, run this shell check after creating `parcel/parcel-case-assembly.d2`:

```bash
for token in AuditShipment LateShipment Reveel Shipware TransImpact ShipSigma Lojistic; do
  ! grep -qi "$token" parcel/parcel-case-assembly.d2 || exit 1
done
```

Also verify the source contains these required customer-facing labels:

```bash
grep -q "Invoice / billing record" parcel/parcel-case-assembly.d2
grep -q "Shipment / package record" parcel/parcel-case-assembly.d2
grep -q "Rule in effect" parcel/parcel-case-assembly.d2
grep -q "Customer evidence" parcel/parcel-case-assembly.d2
grep -q "Relevant history" parcel/parcel-case-assembly.d2
grep -q "Zettel Case File" parcel/parcel-case-assembly.d2
grep -q "Human review" parcel/parcel-case-assembly.d2
grep -q "Carrier response" parcel/parcel-case-assembly.d2
grep -q "Credit verified" parcel/parcel-case-assembly.d2
```

- [ ] **Step 4: Create the D2 source using the existing visual grammar**

The semantic layout must implement this flow:

```text
Invoice / billing record ─┐
Shipment / package record ├─> Zettel Case File -> Human review -> Carrier response -> Credit verified
Rule in effect ───────────┤
Customer evidence ────────┤
Relevant history ─────────┘
```

Use neutral source cards, a green Zettel Case File card, a distinct human-review card, and green only for the verified positive outcome. `Relevant history` must be visually secondary to direct source/evidence inputs.

Do not show:

- carrier logos;
- autonomous-agent/tool icons;
- a black-box confidence score;
- invented thresholds or refund amounts;
- a direct `AI -> Carrier` edge.

- [ ] **Step 5: Run source guards and render SVG**

Run the checks from Step 3, then:

```bash
d2 parcel/parcel-case-assembly.d2 parcel/parcel-case-assembly.svg
```

Expected: command exits 0 and creates a non-empty SVG.

- [ ] **Step 6: Inspect the SVG**

Open `parcel/parcel-case-assembly.svg` and verify:

- labels are legible at the intended landing-page width;
- no node overlaps or clipped text;
- the Case File is visually central;
- human review appears before carrier response;
- verified credit is clearly an outcome, not an estimate;
- the diagram reads without animation.

If any item fails, change the D2 source and re-render; do not hand-edit the SVG.

- [ ] **Step 7: Commit diagram source and canonical render**

```bash
git add parcel/parcel-case-assembly.d2 parcel/parcel-case-assembly.svg
git commit -m "feat: add Parcel case assembly diagram"
```

---

### Task 4: Create The Similar-Package History Diagram

**Repository:** `zettel-ai/website_diagram`

**Files:**
- Create: `parcel/same-box-different-bill.d2`
- Create: `parcel/same-box-different-bill.svg`

**Interfaces:**
- Produces: canonical editable/rendered history visual for the landing page.
- Must communicate historical similarity without claiming it proves carrier error.

- [ ] **Step 1: Write the source-level semantic checks**

After the file exists, these commands must pass:

```bash
grep -q "Similar package profile" parcel/same-box-different-bill.d2
grep -q "Historical context" parcel/same-box-different-bill.d2
grep -q "not proof" parcel/same-box-different-bill.d2
grep -q "Carrier adjustment" parcel/same-box-different-bill.d2
grep -q "Closer review" parcel/same-box-different-bill.d2
```

And competitor/carrier-logo labels must not appear:

```bash
for token in AuditShipment LateShipment Reveel Shipware TransImpact ShipSigma Lojistic "UPS logo" "FedEx logo"; do
  ! grep -qi "$token" parcel/same-box-different-bill.d2 || exit 1
done
```

- [ ] **Step 2: Create the D2 source**

Use the existing Zettel D2 classes/tokens to show:

```text
Similar package profile
  Jan 8  -> normal charge
  Jan 14 -> normal charge
  Jan 21 -> normal charge
  Jan 29 -> Carrier adjustment / outlier
                         |
                         v
                    Closer review

Historical context — not proof
```

The normal-history rows may use restrained neutral/green confirmation styling. The outlier/adjustment may use restrained warning styling. Do not visually label the carrier "wrong."

- [ ] **Step 3: Run checks and render**

```bash
d2 parcel/same-box-different-bill.d2 parcel/same-box-different-bill.svg
```

Run every source check from Step 1.

Expected: all pass and the SVG is non-empty.

- [ ] **Step 4: Inspect at desktop and narrow display widths**

Verify:

- the sequence is readable left-to-right or top-to-bottom without tiny text;
- `Historical context — not proof` is visually obvious;
- the adjustment is an outlier requiring review, not a proven error;
- no clipped/overlapping labels.

Make corrections only in `.d2`, then re-render.

- [ ] **Step 5: Commit**

```bash
git add parcel/same-box-different-bill.d2 parcel/same-box-different-bill.svg
git commit -m "feat: add Parcel history context diagram"
```

- [ ] **Step 6: Record the canonical diagram commit**

Run:

```bash
git rev-parse HEAD
```

Save the resulting full SHA for Task 5 provenance.

---

### Task 5: Copy Reviewed Diagrams And Record Provenance

**Dependencies:** Tasks 3–4 are reviewed and committed in `zettel-ai/website_diagram`.

**Files:**
- Create: `public/diagrams/parcel/parcel-case-assembly.svg`
- Create: `public/diagrams/parcel/same-box-different-bill.svg`
- Create: `docs/superpowers/parcel-diagram-sources.md`
- Create: `scripts/validate-parcel-diagrams.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: reviewed canonical SVGs and source commit SHA from `zettel-ai/website_diagram`.
- Produces: website-safe copied assets plus traceable editable-source mapping.

- [ ] **Step 1: Copy the canonical SVGs without editing them**

From the website repo worktree, copy the exact files from the reviewed diagram-repo worktree:

```bash
mkdir -p public/diagrams/parcel
cp <diagram-worktree>/parcel/parcel-case-assembly.svg public/diagrams/parcel/parcel-case-assembly.svg
cp <diagram-worktree>/parcel/same-box-different-bill.svg public/diagrams/parcel/same-box-different-bill.svg
```

Replace `<diagram-worktree>` with the actual path returned by the worktree skill. Do not open and manually edit the copied SVGs.

- [ ] **Step 2: Create the provenance document**

Create `docs/superpowers/parcel-diagram-sources.md` with this structure, substituting the real full commit SHA from Task 4 Step 6:

```markdown
# Zettel Parcel Diagram Sources

Canonical editable source repository: `zettel-ai/website_diagram`

## Parcel case assembly

- Website asset: `public/diagrams/parcel/parcel-case-assembly.svg`
- D2 source: `parcel/parcel-case-assembly.d2`
- Canonical SVG: `parcel/parcel-case-assembly.svg`
- Source commit: `<FULL_DIAGRAM_COMMIT_SHA>`
- Purpose: Show how billing/shipment/rule/evidence/history inputs become a reviewable Case File, then a carrier response and verified credit.
- Text equivalent: Invoice/billing record, shipment/package record, rule in effect, customer evidence, and relevant history feed a Zettel Case File. A human reviews the case before a carrier response. A posted outcome is only labeled Credit verified after verification.

## Similar package, different bill

- Website asset: `public/diagrams/parcel/same-box-different-bill.svg`
- D2 source: `parcel/same-box-different-bill.d2`
- Canonical SVG: `parcel/same-box-different-bill.svg`
- Source commit: `<FULL_DIAGRAM_COMMIT_SHA>`
- Purpose: Show that repeated similar package/charge history can identify an outlier worth reviewing without proving the adjustment is incorrect.
- Text equivalent: A similar package profile has several prior normal charges followed by one carrier adjustment/outlier. The diagram labels this historical context, not proof, and routes the outlier to closer review.
```

`<FULL_DIAGRAM_COMMIT_SHA>` here is an instruction in the plan document only; the implemented provenance file must contain the real 40-character SHA and no angle-bracket placeholder.

- [ ] **Step 3: Write the failing diagram validator**

Create `scripts/validate-parcel-diagrams.mjs`:

```js
import { existsSync, readFileSync, statSync } from "node:fs";

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const assets = [
  "public/diagrams/parcel/parcel-case-assembly.svg",
  "public/diagrams/parcel/same-box-different-bill.svg",
];

for (const asset of assets) {
  assert(existsSync(asset), `Missing Parcel diagram: ${asset}`);
  assert(statSync(asset).size > 500, `Parcel diagram is unexpectedly small: ${asset}`);
  const svg = readFileSync(asset, "utf8");
  assert(svg.includes("<svg"), `Parcel diagram must be SVG: ${asset}`);
}

const provenancePath = "docs/superpowers/parcel-diagram-sources.md";
assert(existsSync(provenancePath), "Parcel diagram provenance document must exist.");
const provenance = readFileSync(provenancePath, "utf8");

for (const required of [
  "zettel-ai/website_diagram",
  "parcel/parcel-case-assembly.d2",
  "parcel/same-box-different-bill.d2",
  "public/diagrams/parcel/parcel-case-assembly.svg",
  "public/diagrams/parcel/same-box-different-bill.svg",
  "Historical context, not proof",
]) {
  assert(provenance.includes(required), `Diagram provenance missing: ${required}`);
}

assert(/Source commit: `[0-9a-f]{40}`/.test(provenance), "Diagram provenance must record a full 40-character source commit SHA.");
```

- [ ] **Step 4: Register and run validation**

Add:

```json
"validate:parcel:diagrams": "node scripts/validate-parcel-diagrams.mjs"
```

Run:

```bash
npm run validate:parcel:diagrams
```

Expected: PASS after the exact reviewed SVGs and provenance file are present.

- [ ] **Step 5: Run competitor exclusion against copied SVGs**

```bash
npm run validate:parcel:evidence
```

Expected: PASS; the public-asset scan includes `public/diagrams/parcel`.

- [ ] **Step 6: Commit**

```bash
git add public/diagrams/parcel docs/superpowers/parcel-diagram-sources.md scripts/validate-parcel-diagrams.mjs package.json
git commit -m "feat: add sourced Parcel explanatory diagrams"
```

---

### Task 6: Integrate The Diagrams Into Accessible Parcel Sections

**Dependencies:** Base-plan `FullContextSection.tsx` and `HistorySection.tsx` exist; Task 5 complete.

**Files:**
- Modify: `src/app/parcel/_components/FullContextSection.tsx`
- Modify: `src/app/parcel/_components/HistorySection.tsx`
- Modify: `scripts/validate-parcel-diagrams.mjs`

**Interfaces:**
- FullContext consumes `/diagrams/parcel/parcel-case-assembly.svg`.
- History consumes `/diagrams/parcel/same-box-different-bill.svg`.
- Surrounding HTML provides a complete text explanation independent of SVG content.

- [ ] **Step 1: Read the installed Next 16 image/static-export documentation**

Read the relevant `next/image` and static-export docs under `node_modules/next/dist/docs/` before choosing `Image` versus a native `<img>` for local SVG rendering. Use the current documented approach that is compatible with the repo's `images: { unoptimized: true }` export configuration.

- [ ] **Step 2: Extend the diagram validator to require integration**

Append:

```js
const fullContextPath = "src/app/parcel/_components/FullContextSection.tsx";
const historyPath = "src/app/parcel/_components/HistorySection.tsx";
assert(existsSync(fullContextPath), "FullContextSection must exist before diagram integration.");
assert(existsSync(historyPath), "HistorySection must exist before diagram integration.");

const fullContext = readFileSync(fullContextPath, "utf8");
const history = readFileSync(historyPath, "utf8");

assert(fullContext.includes("/diagrams/parcel/parcel-case-assembly.svg"), "FullContextSection must render the case-assembly diagram.");
assert(history.includes("/diagrams/parcel/same-box-different-bill.svg"), "HistorySection must render the history diagram.");
assert(fullContext.includes("human review") || fullContext.includes("Human review"), "Full-context HTML must explain human review outside the SVG.");
assert(history.includes("context") && history.includes("proof"), "History HTML must explain that historical context is not proof outside the SVG.");
```

- [ ] **Step 3: Run validation and verify failure**

```bash
npm run validate:parcel:diagrams
```

Expected: FAIL because the sections do not yet reference the assets.

- [ ] **Step 4: Integrate the case-assembly diagram**

In `FullContextSection.tsx`, place the diagram after a prose block that already explains:

- what source facts feed the case;
- that Zettel assembles a recommendation/case;
- that sensitive action remains reviewable;
- that a carrier response and verified credit are downstream sourced outcomes.

Use meaningful alt text if the image is announced to screen readers:

```text
Invoice and shipment records, the rule in effect, customer evidence, and relevant history feed a Zettel Case File; a human reviews the case before a carrier response, and a credit is shown only after verification.
```

If the adjacent prose is deliberately made a complete text equivalent and current Next/accessibility guidance favors decorative treatment to avoid duplication, document that decision in the implementation review note.

- [ ] **Step 5: Integrate the history diagram**

In `HistorySection.tsx`, place the diagram adjacent to HTML that explicitly says:

```text
Prior similar package history can make an outlier easier to notice, but it does not prove what happened to one physical package.
```

The section's evidentiary label is **Similar package profile**. The marketing heading may remain **Same box. Different bill.**

Use meaningful alt text if announced:

```text
Several prior shipments with a similar package profile show consistent charges, followed by one carrier adjustment that is routed to closer review; the history is context, not proof.
```

- [ ] **Step 6: Run integration validation, lint, and build**

```bash
npm run validate:parcel:diagrams
npm run validate:parcel:evidence
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/app/parcel/_components/FullContextSection.tsx src/app/parcel/_components/HistorySection.tsx scripts/validate-parcel-diagrams.mjs
git commit -m "feat: integrate Parcel evidence diagrams"
```

---

### Task 7: Update Developer Documentation And Aggregate Verification

**Files:**
- Modify: `README.md`
- Modify: `package.json`
- Modify: `scripts/validate-parcel-public-evidence.mjs`
- Modify: `scripts/validate-parcel-diagrams.mjs`

**Interfaces:**
- Produces: one documented validation path for public evidence and diagram provenance.

- [ ] **Step 1: Add Parcel diagram provenance instructions to README**

Under the Parcel developer section, document:

```text
Editable Parcel diagram source lives in zettel-ai/website_diagram under parcel/*.d2.
Do not hand-edit public/diagrams/parcel/*.svg in this repository.
Re-render and review the SVG in website_diagram, commit it there, copy the reviewed SVG here, and update docs/superpowers/parcel-diagram-sources.md with the source commit SHA.
```

Also document the public evidence rule:

```text
Competitor research is internal only. Public Parcel statistics must use the approved non-competitor sources in src/app/parcel/_lib/content.ts and the research/design artifacts.
```

- [ ] **Step 2: Make the aggregate Parcel validation include evidence and diagrams**

Ensure `package.json` has:

```json
"validate:parcel:evidence": "node scripts/validate-parcel-public-evidence.mjs",
"validate:parcel:diagrams": "node scripts/validate-parcel-diagrams.mjs"
```

If the base plan has already created `validate:parcel`, append these commands to that aggregate script rather than defining a second aggregate.

- [ ] **Step 3: Run the complete automated verification**

Run:

```bash
npm run validate:parcel
npm run lint
npm run build
test -f out/parcel/index.html
```

Expected: all commands exit 0.

- [ ] **Step 4: Inspect the static output for accidental competitor leakage**

Run:

```bash
for token in AuditShipment LateShipment Reveel Shipware TransImpact "Intelligent Audit" Lojistic ShipSigma "Transportation Insight"; do
  ! grep -Rqi "$token" out/parcel || exit 1
done
```

Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add README.md package.json scripts/validate-parcel-public-evidence.mjs scripts/validate-parcel-diagrams.mjs
git commit -m "docs: document Parcel evidence and diagram workflow"
```

---

### Task 8: Manual Visual, Responsive, And Source Review

**Files:**
- No new production files unless review finds a specific defect.
- Update the existing implementation review note/checklist created by the base plan with the results below.

**Interfaces:**
- Consumes: complete `/parcel/` static build.
- Produces: reviewed evidence that statistics and diagrams improve comprehension without introducing unsupported claims.

- [ ] **Step 1: Start a local static preview using the repo's documented preview method**

Use the method established by the base implementation plan/README for reviewing `out/` or the Next development server. Review `/parcel/`.

- [ ] **Step 2: Review statistics at desktop and mobile widths**

Verify:

- exactly three headline stat cards render;
- `23.1B`, `5.9% / 5.9%`, and `250 → 270` are readable;
- every card has visible source link(s);
- the 5.9% card includes the qualification that actual customer spend varies;
- no card implies an invoice-error frequency;
- no competitor is mentioned.

- [ ] **Step 3: Review diagrams at 1440, 768, 390, and 320 CSS-pixel viewport widths**

Verify:

- no horizontal page overflow;
- diagram labels remain legible;
- the Case File remains native UI in the hero;
- the case-assembly diagram visibly shows human review before carrier response;
- the history diagram visibly says historical context is not proof;
- surrounding HTML remains understandable if images fail to load.

- [ ] **Step 4: Review keyboard and screen-reader semantics**

Verify:

- source links are keyboard reachable with visible focus;
- diagram alt/decorative treatment matches the adjacent text-equivalent decision;
- no state is encoded by color alone;
- no interaction is required to reveal a statistic source.

- [ ] **Step 5: Run final automated verification again after any review fixes**

```bash
npm run validate:parcel
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 6: Request code review**

Use `superpowers:requesting-code-review` and include both repositories in scope:

- website changes in `zettel-ai/zettel-ai.github.io`;
- D2/source SVG changes in `zettel-ai/website_diagram`.

Review specifically for source accuracy, competitor leakage, diagram semantics, accessibility, copy truthfulness, and source-provenance integrity.

- [ ] **Step 7: Verify before completion**

Use `superpowers:verification-before-completion`. Re-run the exact commands above and verify the diagram-repo source commit recorded in `docs/superpowers/parcel-diagram-sources.md` exists and contains both canonical D2/SVG pairs before claiming the visual work complete.

---

## Execution Order With The Base Plan

Use this supplement at these checkpoints:

1. Base plan Task 1 — create isolated `/parcel/` shell.
2. Base plan Task 2 — create centralized Parcel content/source model.
3. **Supplement Tasks 1–2** — add public evidence data/guards and the statistics section.
4. Continue base-plan hero/Case File/pain/full-context/history components until `FullContextSection` and `HistorySection` exist.
5. **Supplement Tasks 3–5** — generate canonical diagrams in `website_diagram`, copy reviewed SVGs, and record provenance.
6. **Supplement Task 6** — integrate diagrams into full-context/history sections.
7. Continue remaining base-plan sections, intake, analytics, accessibility, and copy verification.
8. **Supplement Tasks 7–8** — aggregate evidence/diagram verification and final two-repository review.
9. Complete base plan's final verification/review gate.

This ordering keeps the source model and public evidence guard in place before copy spreads through components, while avoiding diagram integration before the sections that consume the diagrams exist.

---

## Self-Review Checklist

### Spec coverage

- Competitors internal only: Tasks 1, 5, 7, 8.
- Three non-competitor public statistics: Tasks 1–2.
- Visible source links: Task 2 and Task 8.
- Reject vendor-originated error-rate claims: Task 1.
- Editable diagram source in `website_diagram`: Tasks 3–4.
- Case-assembly diagram: Tasks 3, 5, 6.
- Similar-package history diagram with context-not-proof semantics: Tasks 4–6.
- Native HTML/CSS hero Case File preserved: Global Constraints and Task 8.
- Diagram provenance/source commit: Task 5.
- Accessibility/responsive text equivalence: Tasks 6 and 8.
- Full build/lint/static validation: Tasks 7–8.

### Placeholder scan

The implementation plan contains no production `TODO` or `TBD`. The only angle-bracket notation appears inside the plan's copy command/provenance template to instruct the executor to substitute the actual worktree path and real 40-character diagram source SHA; Task 5 explicitly forbids leaving that notation in implemented files.

### Type/interface consistency

- `parcelStatistics` is defined once in `content.ts` and consumed by `ParcelStatsSection`.
- `ParcelStatsSection` is rendered once in `page.tsx`.
- Canonical editable diagrams remain in `website_diagram`; website copies use fixed `/diagrams/parcel/*.svg` paths.
- Both diagram integrations use adjacent HTML text equivalents.
- `validate:parcel:evidence` scans only public Parcel code/assets, so internal research documents may safely contain competitor analysis.

---

## Execution Handoff

This supplement is not executed independently of the base plan. After the design package is approved for execution, use **Subagent-Driven Development (recommended)** with fresh task-level review or **Inline Execution** with the existing Superpowers execution checkpoints. Both the website repository and the diagram-source repository participate in the implementation.