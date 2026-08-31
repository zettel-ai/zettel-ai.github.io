# Zettel Parcel Diagram Assets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create three purposeful Zettel Parcel D2 diagrams in `zettel-ai/website_diagram`, render and review SVGs there, copy only the reviewed SVG artifacts into the Parcel landing page, record source provenance, and integrate the visuals into the correct Parcel sections.

**Architecture:** Treat `zettel-ai/website_diagram` as the editable source-of-truth repository for diagrams and `zettel-ai/zettel-ai.github.io` as a consumer of reviewed SVG artifacts. Reuse the existing Zettel D2 visual language, ELK layout, shared `icons/` assets, neutral source cards, green product/case emphasis, blue information accents, gray connectors, and restrained shadows. Every copied SVG must remain byte-identical to its reviewed source render and be traceable through a provenance manifest.

**Tech Stack:** D2 CLI with ELK layout configured in source files, SVG, existing `zettel-ai/website_diagram/icons/*`, Next.js 16 static export, React 19, TypeScript, Node validation scripts, SHA-256 checksums, npm.

**Spec:**
- `docs/superpowers/specs/2026-08-30-parcel-audit-landing-page-design.md`
- `docs/superpowers/specs/2026-08-30-parcel-audit-ontology-appendix.md`
- `docs/superpowers/specs/2026-08-30-parcel-audit-visual-assets-appendix.md`

## Execution Order

Execute this companion plan **after Task 7 and before Task 8** of `docs/superpowers/plans/2026-08-30-zettel-parcel-landing-page.md`. The target Parcel sections exist by then, so the final task can integrate reviewed SVGs without placeholder components; main-plan Tasks 8–12 then verify the complete page with diagrams present.

## Global Constraints

- Editable sources live only in `zettel-ai/website_diagram/parcel/*.d2`.
- Canonical rendered source artifacts live beside them as `zettel-ai/website_diagram/parcel/*.svg`.
- Landing-page copies live only in `zettel-ai/zettel-ai.github.io/public/diagrams/parcel/*.svg`.
- Do not hand-edit copied landing-page SVGs; edit D2, re-render, review, and copy.
- Reuse visual vocabulary from `zettel_overview.d2`, `analyze.d2`, `ingest.d2`, `communicate.d2`, and existing `icons/`.
- Use D2 ELK layout as in existing sources.
- Preserve green product emphasis, white/neutral cards, gray connectors, and information blue only where useful.
- No carrier logos, partnership marks, fake invoice screenshots, fake metrics, or customer-identifying data.
- No public ontology/knowledge-graph, AgentCore, Neo4j, RAG, or neural-network illustration.
- History must say **Similar package profile** and **Context, not proof.**
- Case assembly ends in **Reviewable next action**, not autonomous submission.
- Denial uses **Next supported action**, not a universal appeal promise.
- `Credit verified` remains distinct from approved/credit pending.
- Text must remain legible at approximately 320–375px content width.
- Adjacent HTML is the accessible source of meaning; diagrams are supplemental.
- No new npm dependency is required in the website repo.

---

## File Structure

### `zettel-ai/website_diagram`

Create:

- `parcel/README.md`
- `parcel/case-assembly.d2`
- `parcel/case-assembly.svg`
- `parcel/similar-package-history.d2`
- `parcel/similar-package-history.svg`
- `parcel/denial-resolution.d2`
- `parcel/denial-resolution.svg`

Reuse existing icons such as `receipt.svg`, `package.svg`, `file-text.svg`, `clipboard-check.svg`, `shuffle.svg`, `alert-triangle.svg`, `circle-check.svg`, and `dollar-sign.svg` when useful.

### `zettel-ai/zettel-ai.github.io`

Create:

- `public/diagrams/parcel/case-assembly.svg`
- `public/diagrams/parcel/similar-package-history.svg`
- `public/diagrams/parcel/denial-resolution.svg`
- `docs/superpowers/parcel-diagram-sources.md`
- `scripts/validate-parcel-diagrams.mjs`

Modify:

- `package.json`
- `src/app/parcel/_components/FullContextSection.tsx`
- `src/app/parcel/_components/HistorySection.tsx`
- `src/app/parcel/_components/DenialSection.tsx`

---

### Task 1: Establish Parcel Diagram Source Area And Style Contract

**Repository:** `zettel-ai/website_diagram`

**Files:**
- Create: `parcel/README.md`
- Inspect: `zettel_overview.d2`, `analyze.d2`, `ingest.d2`, `communicate.d2`, `icons/`

- [ ] **Step 1: Verify D2 is available**

```bash
d2 --version
```

Expected: exit 0. Record the version later in the provenance manifest. Do not upgrade D2 unless existing sources fail to render.

- [ ] **Step 2: Smoke-test an existing source**

```bash
d2 analyze.d2 /tmp/zettel-analyze-smoke.svg
```

Expected: exit 0 and the SVG exists.

- [ ] **Step 3: Create `parcel/README.md`**

Include the established style contract and these render commands:

```bash
d2 parcel/case-assembly.d2 parcel/case-assembly.svg
d2 parcel/similar-package-history.d2 parcel/similar-package-history.svg
d2 parcel/denial-resolution.d2 parcel/denial-resolution.svg
```

State explicitly that D2 is editable source of truth and rendered SVGs must not be hand-edited.

- [ ] **Step 4: Commit**

```bash
git add parcel/README.md
git commit -m "docs: define Parcel diagram visual contract"
```

---

### Task 2: Create And Review Case Assembly

**Repository:** `zettel-ai/website_diagram`

**Files:**
- Create: `parcel/case-assembly.d2`
- Create: `parcel/case-assembly.svg`

- [ ] **Step 1: Create the D2 source**

Required visible concepts:

```text
Invoice line
Shipper-declared
Carrier-assessed
Rule in effect
Evidence
Similar package profile
Missing evidence
Zettel Case File
Reviewable next action
```

Use existing neutral source/card styling, a green product/case node for `Zettel Case File`, gray connectors, and existing receipt/package/file/shuffle/check icons where helpful. Keep the graph sparse. Do not include `AI`, `ontology`, `Graphiti`, `RAG`, `AgentCore`, or `knowledge graph` labels.

- [ ] **Step 2: Render**

```bash
d2 parcel/case-assembly.d2 parcel/case-assembly.svg
```

- [ ] **Step 3: Inspect**

Verify no clipping, the Case File is the focal point, missing evidence is textual, `Reviewable next action` is separate, and labels remain legible at a 375px preview. Fix D2 and re-render if needed.

- [ ] **Step 4: Commit**

```bash
git add parcel/case-assembly.d2 parcel/case-assembly.svg
git commit -m "feat: add Parcel case assembly diagram"
```

---

### Task 3: Create And Review Similar Package History

**Repository:** `zettel-ai/website_diagram`

**Files:**
- Create: `parcel/similar-package-history.d2`
- Create: `parcel/similar-package-history.svg`

- [ ] **Step 1: Create the source**

Required visible concepts:

```text
Similar package profile
Shipment A — shipper-declared 18 × 12 × 8 — $14.72
Shipment B — shipper-declared 18 × 12 × 8 — $14.72
Shipment C — shipper-declared 18 × 12 × 8 — $14.72
Shipment D — carrier-assessed 20 × 14 × 9 — $34.97
Additional Handling
Context, not proof.
```

Use illustrative values only. Use neutral repeated cards for A/B/C, a distinct but neutral carrier-assessed D card, and one restrained green comparison insight. No anomaly/confidence score.

- [ ] **Step 2: Render and inspect**

```bash
d2 parcel/similar-package-history.d2 parcel/similar-package-history.svg
```

Verify the anomalous adjustment is obvious, **Similar package profile** is prominent, and **Context, not proof.** is legible.

- [ ] **Step 3: Commit**

```bash
git add parcel/similar-package-history.d2 parcel/similar-package-history.svg
git commit -m "feat: add Parcel package history diagram"
```

---

### Task 4: Create And Review Denial Resolution

**Repository:** `zettel-ai/website_diagram`

**Files:**
- Create: `parcel/denial-resolution.d2`
- Create: `parcel/denial-resolution.svg`

- [ ] **Step 1: Create the source**

Required state path:

```text
Case submitted
Carrier response
Denied / needs evidence / approved
Review reason + evidence gap
Next supported action
Closed / credit pending / credit verified
```

Denied is intermediate, not a terminal dead-end. Use `Next supported action`, not universal `Appeal`. Keep `Credit pending` and `Credit verified` distinct. Use existing alert/document/check icons. Green signals supported/reviewed progression, not guaranteed recovery.

- [ ] **Step 2: Render and inspect**

```bash
d2 parcel/denial-resolution.d2 parcel/denial-resolution.svg
```

Verify the flow remains understandable at mobile width and does not resemble an autonomous workflow engine.

- [ ] **Step 3: Commit**

```bash
git add parcel/denial-resolution.d2 parcel/denial-resolution.svg
git commit -m "feat: add Parcel denial resolution diagram"
```

---

### Task 5: Copy, Record Provenance, Validate, And Integrate

**Repository:** `zettel-ai/zettel-ai.github.io`

**Prerequisite:** Tasks 2–4 are committed in the reviewed `website_diagram` branch/worktree.

**Files:**
- Create: three SVGs under `public/diagrams/parcel/`
- Create: `docs/superpowers/parcel-diagram-sources.md`
- Create: `scripts/validate-parcel-diagrams.mjs`
- Modify: `package.json`
- Modify: `FullContextSection.tsx`, `HistorySection.tsx`, `DenialSection.tsx`

- [ ] **Step 1: Copy without modification and prove byte identity**

Assuming `website_diagram` is checked out as sibling `../website_diagram`:

```bash
mkdir -p public/diagrams/parcel
cp ../website_diagram/parcel/case-assembly.svg public/diagrams/parcel/case-assembly.svg
cp ../website_diagram/parcel/similar-package-history.svg public/diagrams/parcel/similar-package-history.svg
cp ../website_diagram/parcel/denial-resolution.svg public/diagrams/parcel/denial-resolution.svg
cmp ../website_diagram/parcel/case-assembly.svg public/diagrams/parcel/case-assembly.svg
cmp ../website_diagram/parcel/similar-package-history.svg public/diagrams/parcel/similar-package-history.svg
cmp ../website_diagram/parcel/denial-resolution.svg public/diagrams/parcel/denial-resolution.svg
```

Expected: all `cmp` commands exit 0.

- [ ] **Step 2: Capture source commit and hashes**

```bash
DIAGRAM_COMMIT=$(git -C ../website_diagram rev-parse HEAD)
d2 --version
sha256sum public/diagrams/parcel/*.svg
```

Create `docs/superpowers/parcel-diagram-sources.md` with the real renderer version, source commit, D2 path, source SVG path, website path, SHA-256, purpose, and review date for each asset. Do not commit literal placeholders.

- [ ] **Step 3: Write the failing validator**

Create `scripts/validate-parcel-diagrams.mjs`:

```js
import { existsSync, readFileSync } from "node:fs";

const assets = [
  ["case-assembly.svg", "FullContextSection.tsx"],
  ["similar-package-history.svg", "HistorySection.tsx"],
  ["denial-resolution.svg", "DenialSection.tsx"],
];

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const manifest = readFileSync("docs/superpowers/parcel-diagram-sources.md", "utf8");

for (const [asset, component] of assets) {
  const assetPath = `public/diagrams/parcel/${asset}`;
  const componentPath = `src/app/parcel/_components/${component}`;
  assert(existsSync(assetPath), `${assetPath} must exist.`);
  const svg = readFileSync(assetPath, "utf8");
  assert(svg.includes("<svg"), `${asset} must be SVG.`);
  assert(svg.includes("viewBox"), `${asset} must include a responsive viewBox.`);
  assert(manifest.includes(assetPath), `Manifest must include ${assetPath}.`);
  assert(manifest.includes(asset.replace(".svg", ".d2")), `Manifest must include D2 source for ${asset}.`);
  const componentSource = readFileSync(componentPath, "utf8");
  assert(componentSource.includes(`/diagrams/parcel/${asset}`), `${component} must render ${asset}.`);
}
```

Register `validate:parcel:diagrams` in `package.json`; run it and expect FAIL because the target section components do not yet reference the images.

- [ ] **Step 4: Integrate the reviewed SVGs**

Use `next/image` with these public paths and equivalent meaningful alt text:

```tsx
<Image src="/diagrams/parcel/case-assembly.svg" alt="Invoice, shipment facts, rule in effect, evidence, and historical context assembled into a Zettel Case File with a reviewable next action." width={1200} height={700} className="h-auto w-full" />
```

```tsx
<Image src="/diagrams/parcel/similar-package-history.svg" alt="Several similar package records compared with one carrier-assessed package and a higher Additional Handling charge; the history is context, not proof." width={1200} height={700} className="h-auto w-full" />
```

```tsx
<Image src="/diagrams/parcel/denial-resolution.svg" alt="A submitted case receives a carrier response, moves through denial or evidence review, then a supported next action and final closed, pending-credit, or verified-credit state." width={1200} height={700} className="h-auto w-full" />
```

Keep the adjacent HTML workflow/copy intact; the image is supplemental.

- [ ] **Step 5: Add to aggregate validation**

Add `npm run validate:parcel:diagrams` to the existing `validate:parcel` chain without removing other validators.

- [ ] **Step 6: Verify**

```bash
npm run validate:parcel:diagrams
npm run validate:parcel
npm run lint
npm run build
test -f out/diagrams/parcel/case-assembly.svg
test -f out/diagrams/parcel/similar-package-history.svg
test -f out/diagrams/parcel/denial-resolution.svg
```

Expected: PASS. Review `/parcel/` at 375px and 1440px widths for legibility and no horizontal overflow.

- [ ] **Step 7: Commit**

```bash
git add public/diagrams/parcel docs/superpowers/parcel-diagram-sources.md scripts/validate-parcel-diagrams.mjs package.json src/app/parcel/_components/FullContextSection.tsx src/app/parcel/_components/HistorySection.tsx src/app/parcel/_components/DenialSection.tsx
git commit -m "feat: add sourced Parcel explanatory diagrams"
```

---

## Final Cross-Repo Verification

```bash
# website_diagram
d2 parcel/case-assembly.d2 /tmp/case-assembly.svg
d2 parcel/similar-package-history.d2 /tmp/similar-package-history.svg
d2 parcel/denial-resolution.d2 /tmp/denial-resolution.svg
cmp /tmp/case-assembly.svg parcel/case-assembly.svg
cmp /tmp/similar-package-history.svg parcel/similar-package-history.svg
cmp /tmp/denial-resolution.svg parcel/denial-resolution.svg

# zettel-ai.github.io
npm run validate:parcel:diagrams
npm run validate:parcel
npm run lint
npm run build
```

Expected: every command exits 0.

## Review Gate

Review the renders for visual-family fidelity, usefulness rather than decoration, ontology-consistent terminology, no unsupported claims, mobile legibility, and reproducible source provenance. If a diagram fails, change D2, re-render, update source commit/hash in the manifest, copy again, and re-run verification. Never patch the consumer SVG directly.

## Self-Review Results

- Exactly three primary diagrams are required.
- Each has one customer question, one D2 source, one canonical render, one consumer copy, and one target section.
- Existing Zettel art/classes/icons are reused instead of creating a separate visual system.
- Technical graph/ontology/agent architecture remains off the public page.
- D2 source stays outside the landing-page repo; only SVGs and provenance metadata enter the website repo.
- Existing drayage root and domain configuration remain untouched.
