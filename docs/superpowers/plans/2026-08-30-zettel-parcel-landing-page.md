# Zettel Parcel Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Zettel Parcel managed UPS/FedEx refund + billing-audit landing page at `/parcel/` using the approved design and ontology appendix, while leaving the existing drayage homepage and production domain configuration unchanged.

**Architecture:** Add a route-local Parcel page under `src/app/parcel` with Parcel-specific components and content constants while reusing the existing global Tailwind tokens, logo asset, Public Sans setup, and static-export architecture. Keep all Parcel copy, example-case data, source URLs, readiness gates, and analytics event names in route-local modules so the existing Zettel Ops homepage is not coupled to the new product. The first audit-intake experience is client-side and uses a structured `mailto:` handoff to the existing Zettel contact address; it does not upload carrier files or create a second backend before the Parcel/Zettel Platform backend plan exists.

**Tech Stack:** Next.js 16.2.6 App Router, React 19.2.4, TypeScript 5, Tailwind CSS v4 tokens from `src/app/globals.css`, static export via `output: "export"`, GitHub Pages, existing Google Analytics tag, Node validation scripts, npm.

**Spec:**
- `docs/superpowers/specs/2026-08-30-parcel-audit-landing-page-design.md`
- `docs/superpowers/specs/2026-08-30-parcel-audit-ontology-appendix.md`

## Global Constraints

- Implement Parcel at `/parcel/`; do not replace `src/app/page.tsx` in this plan.
- Do not modify `public/CNAME`, DNS, or GitHub Pages custom-domain settings in this plan.
- Do not move the current drayage experience to `drayage.<domain>` in this plan; that hosting migration is a separate subsystem and requires its own plan.
- Keep `next.config.ts` static export settings unchanged: `output: "export"`, `images: { unoptimized: true }`, `trailingSlash: true`.
- Before writing Next.js code, read the relevant installed Next 16 docs under `node_modules/next/dist/docs/` as required by `AGENTS.md`; do not rely on older App Router assumptions.
- Preserve the existing design system: Public Sans, green `#006527`, light green `#96F8A1`, warm background `#FBF9F8`, ink `#1B1C1C`, information blue `#004CCD`, restrained borders, square/low-radius surfaces.
- Primary headline: **We find the shipping charges you shouldn't have paid.**
- Primary CTA: **Start a free audit**.
- Public launch pricing: **25% of verified credits recovered**, `$0 setup`, `$0 monthly platform fee`, `$0 recovered = $0 fee`.
- Do not add fake recovery totals, customer logos, testimonials, savings averages, shipping-error rates, or unsupported carrier claims.
- Every illustrative financial/carrier example must visibly say **Example case**.
- Do not publish **expert-reviewed ontology**, **built by carrier billing experts**, or equivalent claims until the ontology appendix's actual expert-approval gate has been satisfied.
- Do not claim autonomous carrier actions; use **Zettel builds the case. You stay in control.**
- Use **Shipper-declared**, **Carrier-assessed**, **Calculated by Zettel**, **Rule in effect on shipment date**, **Missing evidence**, **Carrier response**, and **Credit verified** only in ways consistent with the ontology appendix.
- Historical package comparisons are context, not proof; UI copy must say **Similar package profile** when exact identity is not established.
- No invoice/file upload in this website plan. The intake form must explicitly say that Zettel will request a recent invoice in the follow-up.
- Do not add a Parcel-only graph, RAG service, vector store, ontology runtime, model router, agent memory, or other backend intelligence to this repository.
- Keep analytics free of invoice content, tracking numbers, package measurements, carrier account identifiers, or other sensitive shipment data.
- Target WCAG 2.2 AA, keyboard-operable controls, visible focus, text labels for states, and `prefers-reduced-motion` compatibility.
- Use existing dependencies unless the plan explicitly adds one. This plan adds no runtime or dev dependencies.

---

## File Structure

### Create

- `src/app/parcel/layout.tsx` — Parcel route metadata.
- `src/app/parcel/page.tsx` — Parcel page composition only.
- `src/app/parcel/_lib/content.ts` — approved Parcel copy, source URLs, example-case data, FAQ data, audit-category readiness.
- `src/app/parcel/_lib/analytics.ts` — typed Google Analytics event helper with non-sensitive event names only.
- `src/app/parcel/_components/ParcelTopNav.tsx` — Parcel-specific fixed navigation.
- `src/app/parcel/_components/ParcelFooter.tsx` — Parcel-specific footer and legal/source links.
- `src/app/parcel/_components/StartFreeAuditButton.tsx` — reusable CTA opener.
- `src/app/parcel/_components/AuditIntakeDialog.tsx` — accessible client-side free-audit intake and mailto handoff.
- `src/app/parcel/_components/CaseFile.tsx` — signature evidence-backed example case visual.
- `src/app/parcel/_components/ParcelHero.tsx` — hero copy, CTA, case visual.
- `src/app/parcel/_components/RiskReversalStrip.tsx` — three launch-economics facts.
- `src/app/parcel/_components/PainSection.tsx` — Reddit-informed pain cards without anecdotal statistics.
- `src/app/parcel/_components/FullContextSection.tsx` — one-charge case narrative.
- `src/app/parcel/_components/HistorySection.tsx` — similar-package historical context visual.
- `src/app/parcel/_components/HowItWorksSection.tsx` — Send → Audit → Build the case → Recover.
- `src/app/parcel/_components/DenialSection.tsx` — denial/next-action explanation.
- `src/app/parcel/_components/AuditCategoriesSection.tsx` — readiness-gated audit categories.
- `src/app/parcel/_components/EvidenceTrustSection.tsx` — no-black-box-score/source/evidence-completeness section.
- `src/app/parcel/_components/PricingSection.tsx` — 25% contingency offer and example.
- `src/app/parcel/_components/DataTrustSection.tsx` — invoice-first/no-password/data-handling copy.
- `src/app/parcel/_components/FaqSection.tsx` — native disclosure FAQ.
- `src/app/parcel/_components/FinalParcelCta.tsx` — final conversion block.
- `scripts/validate-parcel-route.mjs` — route isolation, metadata, and root-regression validation.
- `scripts/validate-parcel-copy.mjs` — approved-copy/pricing/false-claim guard.
- `scripts/validate-parcel-case-file.mjs` — example label, ontology-derived labels, and evidence-state guard.
- `scripts/validate-parcel-intake.mjs` — intake fields, no-upload fallback, email target, and analytics privacy guard.
- `scripts/validate-parcel-sections.mjs` — section IDs, required source-backed language, readiness gate, and FAQ guard.

### Modify

- `package.json` — add `validate:parcel:*` scripts and one aggregate `validate:parcel` script.
- `README.md` — add local preview/validation instructions for `/parcel/` after implementation is complete.

### Deliberately do not modify

- `src/app/page.tsx`
- existing drayage components under `src/app/_components/*`
- `public/CNAME`
- `.github/workflows/deploy.yml`
- `next.config.ts`

The implementation branch may touch one of those files only if a real build failure proves the route-local approach impossible; such a deviation requires review before continuing.

---

### Task 1: Add Parcel Route Shell Without Touching Drayage

**Files:**
- Create: `scripts/validate-parcel-route.mjs`
- Modify: `package.json`
- Create: `src/app/parcel/layout.tsx`
- Create: `src/app/parcel/page.tsx`
- Create: `src/app/parcel/_components/ParcelTopNav.tsx`
- Create: `src/app/parcel/_components/ParcelFooter.tsx`

**Interfaces:**
- Consumes: existing root `src/app/layout.tsx`, `src/app/globals.css`, `/images/zettel_logo.png`.
- Produces: static `/parcel/` route with Parcel metadata and product-local navigation/footer.

- [ ] **Step 1: Read the installed Next 16 route/layout/static-export docs**

Read the relevant files under `node_modules/next/dist/docs/` for App Router layouts/pages, route metadata, and static export before editing. Record the exact docs consulted in the implementation review note; do not change `AGENTS.md`.

- [ ] **Step 2: Write the failing route validation**

Create `scripts/validate-parcel-route.mjs`:

```js
import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const parcelPagePath = "src/app/parcel/page.tsx";
const parcelLayoutPath = "src/app/parcel/layout.tsx";
const rootPage = readFileSync("src/app/page.tsx", "utf8");
const cname = readFileSync("public/CNAME", "utf8").trim();

assert(existsSync(parcelPagePath), "Parcel route page must exist at src/app/parcel/page.tsx.");
assert(existsSync(parcelLayoutPath), "Parcel route layout must exist at src/app/parcel/layout.tsx.");
assert(
  rootPage.includes("<Hero />") && rootPage.includes("<Steps />"),
  "Existing drayage root composition must remain intact during Parcel implementation.",
);
assert(cname === "zettelops.com", "Parcel page implementation must not change the current CNAME.");

const parcelPage = readFileSync(parcelPagePath, "utf8");
const parcelLayout = readFileSync(parcelLayoutPath, "utf8");

assert(parcelPage.includes("ParcelTopNav"), "Parcel route must use ParcelTopNav.");
assert(parcelPage.includes("ParcelFooter"), "Parcel route must use ParcelFooter.");
assert(parcelLayout.includes("Zettel Parcel"), "Parcel metadata must identify Zettel Parcel.");
```

- [ ] **Step 3: Register the validation script**

Add to `package.json` scripts without removing existing scripts:

```json
"validate:parcel:route": "node scripts/validate-parcel-route.mjs"
```

- [ ] **Step 4: Run the route validation and verify failure**

Run:

```bash
npm run validate:parcel:route
```

Expected: FAIL because `src/app/parcel/page.tsx` and `layout.tsx` do not exist.

- [ ] **Step 5: Create Parcel route metadata**

Create `src/app/parcel/layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zettel Parcel | Managed UPS & FedEx Refund + Billing Audit",
  description:
    "Zettel reviews UPS and FedEx shipping bills, builds evidence-backed cases for supported charges, and charges only after verified carrier credits are recovered.",
};

export default function ParcelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
```

- [ ] **Step 6: Create minimal Parcel-local navigation and footer**

Create `ParcelTopNav.tsx` and `ParcelFooter.tsx` as route-local components. Initial navigation links must target these IDs even before later sections exist:

```tsx
const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "What we audit", href: "#what-we-audit" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];
```

Brand text is `Zettel Parcel`; logo asset is `/images/zettel_logo.png`. Do not import or modify root `TopNav`/`Footer` because those are drayage-specific.

For the footer, include:

```tsx
<p>Zettel is not affiliated with UPS or FedEx.</p>
<a href="mailto:zettel.ops@gmail.com">zettel.ops@gmail.com</a>
```

Do not add a privacy-policy URL that does not exist.

- [ ] **Step 7: Create the minimal Parcel page shell**

Create `src/app/parcel/page.tsx`:

```tsx
import { ParcelFooter } from "./_components/ParcelFooter";
import { ParcelTopNav } from "./_components/ParcelTopNav";

export default function ParcelPage() {
  return (
    <>
      <ParcelTopNav />
      <main className="flex-grow pt-20">
        <section className="min-h-[50vh] bg-surface-container-lowest px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Managed UPS & FedEx parcel audit
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-on-background md:text-7xl">
              We find the shipping charges you shouldn&apos;t have paid.
            </h1>
          </div>
        </section>
      </main>
      <ParcelFooter />
    </>
  );
}
```

- [ ] **Step 8: Run route validation, lint, and static build**

Run:

```bash
npm run validate:parcel:route
npm run lint
npm run build
```

Expected: all pass and `out/parcel/index.html` exists after build.

- [ ] **Step 9: Commit**

```bash
git add package.json scripts/validate-parcel-route.mjs src/app/parcel

git commit -m "feat: add isolated Zettel Parcel route"
```

---

### Task 2: Centralize Approved Parcel Copy, Sources, Example Data, And Readiness

**Files:**
- Create: `src/app/parcel/_lib/content.ts`
- Create: `scripts/validate-parcel-copy.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: exported `parcelCopy`, `parcelSources`, `exampleCase`, `painCards`, `processSteps`, `auditCategories`, `faqItems` used by all later server components.
- No component may duplicate pricing/headline/source URLs as hard-coded strings except accessibility labels.

- [ ] **Step 1: Write the failing copy validation**

Create `scripts/validate-parcel-copy.mjs`:

```js
import { readFileSync } from "node:fs";

const content = readFileSync("src/app/parcel/_lib/content.ts", "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

for (const required of [
  "We find the shipping charges you shouldn't have paid.",
  "Start a free audit",
  "25% of verified credits",
  "$0 recovered = $0 fee",
  "Example case",
  "Similar package profile",
  "Rule in effect on shipment date",
  "Zettel builds the case. You stay in control.",
]) {
  assert(content.includes(required), `Parcel content must include: ${required}`);
}

for (const forbidden of [
  "AI-powered",
  "expert-reviewed ontology",
  "built by carrier billing experts",
  "autonomous carrier",
  "we recover every dollar",
  "average savings",
]) {
  assert(!content.toLowerCase().includes(forbidden.toLowerCase()), `Forbidden public claim: ${forbidden}`);
}
```

- [ ] **Step 2: Register and run the failing copy validation**

Add:

```json
"validate:parcel:copy": "node scripts/validate-parcel-copy.mjs"
```

Run:

```bash
npm run validate:parcel:copy
```

Expected: FAIL because `content.ts` does not exist.

- [ ] **Step 3: Create `content.ts` with typed constants**

Use this interface shape:

```ts
export type ParcelSource = {
  label: string;
  href: string;
  authority: "carrier" | "standard" | "methodology";
};

export type AuditCategory = {
  id: string;
  title: string;
  bill: string;
  check: string;
  evidence: string;
  sourceKey: "upsCorrections" | "upsBilling" | "fedexBilling" | "fedexServiceGuide";
  launchState: "hidden" | "validated";
};
```

Define these source URLs exactly:

```ts
export const parcelSources = {
  upsCorrections: {
    label: "UPS: Avoid Shipping Charge Corrections",
    href: "https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight/avoid-additional-shipping-fees",
    authority: "carrier",
  },
  upsBilling: {
    label: "UPS Billing",
    href: "https://www.ups.com/us/en/business-solutions/ups-billing",
    authority: "carrier",
  },
  fedexBilling: {
    label: "FedEx Billing Online",
    href: "https://www.fedex.com/en-us/billing-online.html",
    authority: "carrier",
  },
  fedexServiceGuide: {
    label: "FedEx Service Guide",
    href: "https://www.fedex.com/en-us/service-guide.html",
    authority: "carrier",
  },
} as const satisfies Record<string, ParcelSource>;
```

Define launch copy as constants:

```ts
export const parcelCopy = {
  eyebrow: "Managed UPS & FedEx parcel audit",
  headline: "We find the shipping charges you shouldn't have paid.",
  cta: "Start a free audit",
  riskLine: "No upfront fee. We only get paid when you recover money.",
  pricingHeadline: "25% of verified credits",
  pricingFacts: ["$0 setup", "$0 monthly platform fee", "$0 recovered = $0 fee"],
  controlLine: "Zettel builds the case. You stay in control.",
} as const;
```

Define `exampleCase` with `label: "Example case"`, explicit **Shipper-declared** and **Carrier-assessed** labels, `ruleLabel: "Rule in effect on shipment date"`, `historyLabel: "Similar package profile"`, a missing package-photo state, and no claim that the example is a real recovery.

Define all six candidate audit categories with `launchState: "hidden"`. The page must not claim they are validated until operational review changes individual entries to `"validated"` in a later reviewed commit.

- [ ] **Step 4: Run copy validation**

Run:

```bash
npm run validate:parcel:copy
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add package.json scripts/validate-parcel-copy.mjs src/app/parcel/_lib/content.ts

git commit -m "feat: centralize Parcel landing-page content"
```

---

### Task 3: Build The Signature Case File, Hero, And Risk-Reversal Strip

**Files:**
- Create: `scripts/validate-parcel-case-file.mjs`
- Modify: `package.json`
- Create: `src/app/parcel/_components/CaseFile.tsx`
- Create: `src/app/parcel/_components/ParcelHero.tsx`
- Create: `src/app/parcel/_components/RiskReversalStrip.tsx`
- Modify: `src/app/parcel/page.tsx`

**Interfaces:**
- Consumes: `parcelCopy` and `exampleCase` from `content.ts`.
- Produces: `CaseFile`, `ParcelHero`, `RiskReversalStrip` server components.

- [ ] **Step 1: Write failing Case File validation**

Create `scripts/validate-parcel-case-file.mjs`:

```js
import { readFileSync } from "node:fs";

const caseFile = readFileSync("src/app/parcel/_components/CaseFile.tsx", "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

for (const label of [
  "Example case",
  "Shipper-declared",
  "Carrier-assessed",
  "Rule in effect on shipment date",
  "Similar package profile",
  "Missing evidence",
  "Needs review",
]) {
  assert(caseFile.includes(label), `Case File must expose ${label}.`);
}

assert(!caseFile.includes("AI confidence"), "Case File must not use an AI confidence score as evidence.");
```

Register:

```json
"validate:parcel:case": "node scripts/validate-parcel-case-file.mjs"
```

Run and expect FAIL because `CaseFile.tsx` does not exist.

- [ ] **Step 2: Implement `CaseFile.tsx`**

Use semantic `<dl>`/`<dt>`/`<dd>` groups for measurement/evidence values, a visible `Example case` badge, and textual state labels. Use `font-mono` for tracking IDs, dimensions, timestamps, and amounts; do not add a new font dependency.

The component must visibly separate:

```text
Shipper-declared
Carrier-assessed
Rule in effect on shipment date
Similar package profile
Evidence
Missing evidence
Recommended action
Needs review
```

A missing package photo must render as text (`Missing`) rather than only a red icon.

- [ ] **Step 3: Implement `ParcelHero.tsx`**

Hero layout:

```tsx
<section className="border-b border-outline-variant bg-surface-container-lowest">
  <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.85fr)] lg:items-center lg:py-24">
    {/* copy + actions */}
    <CaseFile />
  </div>
</section>
```

Use headline/risk copy only from `content.ts`. Primary CTA must render `<StartFreeAuditButton>` after Task 4; until then use a temporary `<a href="#audit-intake">Start a free audit</a>` that Task 4 replaces in the same implementation branch.

Secondary action is a plain anchor to `#what-we-audit` with text **See what we check**.

- [ ] **Step 4: Implement `RiskReversalStrip.tsx`**

Render exactly:

- `Start with an invoice`
- `25% of verified credits`
- `$0 recovered = $0 fee`

Use borders and typography, not card shadows.

- [ ] **Step 5: Compose hero and strip into `page.tsx`**

Replace the Task 1 temporary hero section with:

```tsx
<ParcelHero />
<RiskReversalStrip />
```

- [ ] **Step 6: Run validation, lint, and build**

```bash
npm run validate:parcel:case
npm run validate:parcel:copy
npm run lint
npm run build
```

Expected: PASS and `/parcel/` remains statically exported.

- [ ] **Step 7: Commit**

```bash
git add package.json scripts/validate-parcel-case-file.mjs src/app/parcel

git commit -m "feat: add Parcel hero and evidence case file"
```

---

### Task 4: Add Accessible Free-Audit Intake And Non-Sensitive Analytics

**Files:**
- Create: `scripts/validate-parcel-intake.mjs`
- Modify: `package.json`
- Create: `src/app/parcel/_lib/analytics.ts`
- Create: `src/app/parcel/_components/StartFreeAuditButton.tsx`
- Create: `src/app/parcel/_components/AuditIntakeDialog.tsx`
- Modify: `src/app/parcel/_components/ParcelTopNav.tsx`
- Modify: `src/app/parcel/_components/ParcelHero.tsx`

**Interfaces:**
- `StartFreeAuditButton` calls `openParcelAuditDialog()` through a shared window event; all primary CTAs use the same dialog.
- `AuditIntakeDialog` creates the `mailto:` URL only after native form validation succeeds.
- `trackParcelEvent(name)` records event names only, no user form values.

- [ ] **Step 1: Write failing intake validation**

Create `scripts/validate-parcel-intake.mjs`:

```js
import { readFileSync } from "node:fs";

const dialog = readFileSync("src/app/parcel/_components/AuditIntakeDialog.tsx", "utf8");
const analytics = readFileSync("src/app/parcel/_lib/analytics.ts", "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

for (const field of ["name", "workEmail", "company", "carrier", "monthlyShipments"]) {
  assert(dialog.includes(field), `Audit intake must include field ${field}.`);
}
assert(dialog.includes("zettel.ops@gmail.com"), "Audit intake must send to the existing Zettel contact address.");
assert(
  dialog.includes("We'll request a recent carrier invoice in our follow-up."),
  "No-upload fallback must explain the next step.",
);
assert(!dialog.includes('type="file"'), "Static-site intake must not pretend to upload invoices.");
for (const sensitive of ["tracking", "invoice", "dimensions", "accountNumber", "workEmail", "company"]) {
  assert(!analytics.includes(`params.${sensitive}`), `Analytics must not transmit ${sensitive}.`);
}
```

Register:

```json
"validate:parcel:intake": "node scripts/validate-parcel-intake.mjs"
```

Run and expect FAIL because the files do not exist.

- [ ] **Step 2: Add typed analytics helper**

Create `src/app/parcel/_lib/analytics.ts`:

```ts
export type ParcelAnalyticsEvent =
  | "parcel_free_audit_open"
  | "parcel_free_audit_submit_mailto"
  | "parcel_see_checks_click"
  | "parcel_faq_toggle";

type GtagWindow = Window & {
  gtag?: (command: "event", name: string, params?: Record<string, string | number | boolean>) => void;
};

export function trackParcelEvent(name: ParcelAnalyticsEvent) {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", name, { product: "parcel" });
}
```

No form values are accepted by this helper.

- [ ] **Step 3: Implement a reusable opener button**

`StartFreeAuditButton.tsx` is a client component that dispatches:

```ts
window.dispatchEvent(new Event("parcel:open-audit-intake"));
trackParcelEvent("parcel_free_audit_open");
```

It accepts `className` and `children` props. Keep button text supplied by the caller so the same component works in hero/nav/final CTA.

- [ ] **Step 4: Implement `AuditIntakeDialog.tsx`**

Use a native `<dialog>` and client state. Required fields:

```ts
type AuditIntake = {
  name: string;
  workEmail: string;
  company: string;
  carrier: "UPS" | "FedEx" | "Both";
  monthlyShipments: "Under 100" | "100–499" | "500–1,999" | "2,000+" | "Not sure";
};
```

On submit:

```ts
const subject = `Free Parcel Audit — ${values.company}`;
const body = [
  `Name: ${values.name}`,
  `Work email: ${values.workEmail}`,
  `Company: ${values.company}`,
  `Carrier: ${values.carrier}`,
  `Approx. monthly shipments: ${values.monthlyShipments}`,
  "",
  "Please reply with instructions for sending one recent carrier invoice or billing export.",
].join("\n");
window.location.href = `mailto:zettel.ops@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
trackParcelEvent("parcel_free_audit_submit_mailto");
```

Visible note below the fields:

**We'll request a recent carrier invoice in our follow-up. This website does not upload carrier files.**

Dialog requirements:

- explicit heading with `aria-labelledby`;
- close button with text/accessible label;
- Escape closes through native dialog behavior;
- focus enters the dialog on open;
- no background-scroll workaround unless testing proves native behavior insufficient;
- no carrier password field.

- [ ] **Step 5: Replace all initial primary CTAs**

Use `StartFreeAuditButton` in Parcel top nav and hero. Render one `AuditIntakeDialog` once in `page.tsx`, after the top nav and before the footer.

- [ ] **Step 6: Run intake validation, lint, and build**

```bash
npm run validate:parcel:intake
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add package.json scripts/validate-parcel-intake.mjs src/app/parcel

git commit -m "feat: add Parcel free-audit intake"
```

---

### Task 5: Build Reddit-Informed Pain, Full-Context, History, And Process Sections

**Files:**
- Create: `scripts/validate-parcel-sections.mjs`
- Modify: `package.json`
- Create: `src/app/parcel/_components/PainSection.tsx`
- Create: `src/app/parcel/_components/FullContextSection.tsx`
- Create: `src/app/parcel/_components/HistorySection.tsx`
- Create: `src/app/parcel/_components/HowItWorksSection.tsx`
- Modify: `src/app/parcel/page.tsx`

**Interfaces:**
- Consumes: `painCards`, `exampleCase`, `processSteps`, `parcelSources` from `content.ts`.
- Produces: section IDs `why-shippers-give-up`, `full-context`, `same-box`, `how-it-works`.

- [ ] **Step 1: Extend the section validation first**

Create `scripts/validate-parcel-sections.mjs` with initial checks:

```js
import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

const files = [
  "PainSection.tsx",
  "FullContextSection.tsx",
  "HistorySection.tsx",
  "HowItWorksSection.tsx",
].map((file) => `src/app/parcel/_components/${file}`);
for (const file of files) assert(existsSync(file), `${file} must exist.`);

const combined = files.map((file) => readFileSync(file, "utf8")).join("\n");
for (const phrase of [
  "Same box. Different bill.",
  "The problem isn't a $20 surcharge. It's fighting it every week.",
  "A denial shouldn't erase the evidence.",
  "Every charge gets a case file.",
  "Similar package profile",
  "Send",
  "Audit",
  "Build the case",
  "Recover",
]) {
  assert(combined.includes(phrase), `Parcel sections must include: ${phrase}`);
}
assert(!/\b\d+% of (shipments|invoices|packages)\b/i.test(combined), "Do not turn Reddit anecdotes into population statistics.");
```

Register:

```json
"validate:parcel:sections": "node scripts/validate-parcel-sections.mjs"
```

Run and expect FAIL.

- [ ] **Step 2: Implement `PainSection.tsx`**

Render four cards from content with these headlines:

- **Same box. Different bill.**
- **A surcharge without the story is hard to challenge.**
- **The problem isn't a $20 surcharge. It's fighting it every week.**
- **A denial shouldn't erase the evidence.**

Do not quote Reddit users, usernames, or numeric frequency as proof. Use the approved paraphrased pain framing only.

- [ ] **Step 3: Implement `FullContextSection.tsx`**

Headline: **Every charge gets a case file.**

Use a horizontal-to-vertical responsive sequence:

```text
Invoice line → Shipment facts → Rule in effect → Evidence → Dispute → Carrier response → Verified credit
```

Each node uses a short label and one sentence. Avoid drawing a network graph.

- [ ] **Step 4: Implement `HistorySection.tsx`**

Use an illustrative four-row history table/list from `content.ts` and label it **Example case**. The comparison heading inside the data visual is **Similar package profile**, not “same package.” The marketing section headline may remain **Same box. Different bill.**

Explicit note:

**Prior shipments are context, not proof that a new carrier assessment is wrong.**

- [ ] **Step 5: Implement `HowItWorksSection.tsx`**

Section `id="how-it-works"`. Four steps:

1. **Send** — Send us your contact details; we request a recent invoice in follow-up.
2. **Audit** — We identify supported charges worth reviewing.
3. **Build the case** — We connect source facts, the rule in effect, evidence, and gaps.
4. **Recover** — We pursue supported next actions and verify credits that actually post.

Do not imply the static landing page already performs the audit automatically.

- [ ] **Step 6: Compose the four sections after the risk strip**

Order:

```tsx
<PainSection />
<FullContextSection />
<HistorySection />
<HowItWorksSection />
```

- [ ] **Step 7: Run validation and build**

```bash
npm run validate:parcel:sections
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add package.json scripts/validate-parcel-sections.mjs src/app/parcel

git commit -m "feat: add Parcel evidence and pain sections"
```

---

### Task 6: Add Denial Workflow And Readiness-Gated Audit Categories

**Files:**
- Create: `src/app/parcel/_components/DenialSection.tsx`
- Create: `src/app/parcel/_components/AuditCategoriesSection.tsx`
- Modify: `src/app/parcel/_lib/content.ts`
- Modify: `scripts/validate-parcel-sections.mjs`
- Modify: `src/app/parcel/page.tsx`

**Interfaces:**
- `visibleAuditCategories = auditCategories.filter(({ launchState }) => launchState === "validated")`.
- If no categories are validated, the page renders a truthful generic free-audit scope message instead of six unsupported capability cards.

- [ ] **Step 1: Extend validation before implementation**

Add to `validate-parcel-sections.mjs`:

```js
const denial = readFileSync("src/app/parcel/_components/DenialSection.tsx", "utf8");
const categories = readFileSync("src/app/parcel/_components/AuditCategoriesSection.tsx", "utf8");
const content = readFileSync("src/app/parcel/_lib/content.ts", "utf8");

assert(denial.includes("Denied isn't the same as explained."), "Denial section headline is required.");
assert(denial.includes("next supported action"), "Denial copy must not promise an appeal for every case.");
assert(categories.includes('launchState === "validated"'), "Audit categories must be readiness gated.");
assert(content.includes('launchState: "hidden"'), "Unvalidated launch categories must default hidden.");
```

Run `npm run validate:parcel:sections`; expected FAIL because components do not exist.

- [ ] **Step 2: Implement `DenialSection.tsx`**

Headline: **Denied isn't the same as explained.**

Use states:

```text
Carrier responded → Review reason → Check evidence gap → Determine next supported action → Resolution
```

Copy must say **next supported action**, not **we always appeal**.

- [ ] **Step 3: Implement `AuditCategoriesSection.tsx`**

Section `id="what-we-audit"`.

```ts
const visibleAuditCategories = auditCategories.filter(
  (category) => category.launchState === "validated",
);
```

If `visibleAuditCategories.length === 0`, render:

> **What we check in a free audit**  
> We start with your actual UPS or FedEx bill and confirm which charge types we can support before we file anything. We won't submit a dispute for a category we haven't operationally validated.

When categories are validated in a later reviewed commit, render each card with exactly:

- **What you see on the bill**
- **What Zettel checks**
- **What evidence may matter**
- one primary carrier source link from `parcelSources`.

Do not change any `launchState` to `validated` in this implementation plan unless a product owner provides the corresponding operational truth evidence during execution.

- [ ] **Step 4: Compose sections**

Place `DenialSection` before `AuditCategoriesSection`.

- [ ] **Step 5: Run validation and build**

```bash
npm run validate:parcel:sections
npm run lint
npm run build
```

Expected: PASS with the truthful generic audit-scope state when all category readiness values remain hidden.

- [ ] **Step 6: Commit**

```bash
git add scripts/validate-parcel-sections.mjs src/app/parcel

git commit -m "feat: add Parcel denial and audit readiness sections"
```

---

### Task 7: Add Evidence Trust, Pricing, Data Trust, FAQ, And Final CTA

**Files:**
- Create: `src/app/parcel/_components/EvidenceTrustSection.tsx`
- Create: `src/app/parcel/_components/PricingSection.tsx`
- Create: `src/app/parcel/_components/DataTrustSection.tsx`
- Create: `src/app/parcel/_components/FaqSection.tsx`
- Create: `src/app/parcel/_components/FinalParcelCta.tsx`
- Modify: `scripts/validate-parcel-sections.mjs`
- Modify: `src/app/parcel/page.tsx`

**Interfaces:**
- FAQ reads `faqItems` from `content.ts` and uses native `<details>`.
- Final CTA reuses `StartFreeAuditButton`; no second dialog instance.

- [ ] **Step 1: Extend validation first**

Add checks:

```js
for (const file of [
  "EvidenceTrustSection.tsx",
  "PricingSection.tsx",
  "DataTrustSection.tsx",
  "FaqSection.tsx",
  "FinalParcelCta.tsx",
]) {
  assert(existsSync(`src/app/parcel/_components/${file}`), `${file} must exist.`);
}

const trust = readFileSync("src/app/parcel/_components/EvidenceTrustSection.tsx", "utf8");
const pricing = readFileSync("src/app/parcel/_components/PricingSection.tsx", "utf8");
const dataTrust = readFileSync("src/app/parcel/_components/DataTrustSection.tsx", "utf8");
const faq = readFileSync("src/app/parcel/_components/FaqSection.tsx", "utf8");

assert(trust.includes("Every flagged charge comes with the reason."), "Evidence trust headline is required.");
assert(trust.includes("If the evidence isn't there, Zettel says so."), "Missing-evidence principle is required.");
assert(pricing.includes("25% of verified credits"), "Pricing must show the approved contingency rate.");
assert(dataTrust.includes("Start with an invoice, not your password."), "Data trust headline is required.");
assert(faq.includes("<details"), "FAQ must use native details/disclosure semantics.");
```

Run and expect FAIL.

- [ ] **Step 2: Implement `EvidenceTrustSection.tsx`**

Headline: **Every flagged charge comes with the reason.**

Three cards:

1. **Evidence you can trace** — source-backed facts and carrier-rule links.
2. **Time matters** — **Rule in effect on shipment date**.
3. **Missing evidence stays missing** — **If the evidence isn't there, Zettel says so.**

Use no “AI confidence” meter.

- [ ] **Step 3: Implement `PricingSection.tsx`**

Section `id="pricing"`.

Visible calculation:

```text
Carrier credits your account   $1,000
Zettel fee                        $250
You keep                          $750
```

Label it **Example**. The section must not use the word **cheapest**.

- [ ] **Step 4: Implement `DataTrustSection.tsx`**

Headline: **Start with an invoice, not your password.**

Copy must accurately reflect this website implementation:

- free-audit intake does not request a carrier password;
- this website does not upload carrier files;
- Zettel requests a recent invoice/billing export in follow-up;
- do not state encryption, retention, certification, or compliance claims not defined elsewhere.

- [ ] **Step 5: Implement `FaqSection.tsx`**

Section `id="faq"`. Use `<details>` and `<summary>` for each item from `faqItems`.

Required questions in `content.ts`:

- What kinds of UPS/FedEx charges do you review?
- How much does Zettel cost?
- What do I need to send you?
- Do I need to give you my carrier password?
- How does Zettel decide a charge is worth reviewing?
- What happens if evidence is missing?
- What happens if the carrier denies a dispute?
- How do refunds/credits reach me?
- What happens if you find nothing?
- Do you support Shopify/eBay/ShipStation-billed labels?
- Are you affiliated with UPS or FedEx?

For unresolved carrier-specific windows and third-party-label support, answers must say the current managed service confirms support during audit rather than inventing a rule.

If adding FAQ analytics, use only `parcel_faq_toggle`; do not send the question text or user identity.

- [ ] **Step 6: Implement `FinalParcelCta.tsx`**

Headline:

**Think your shipping bill deserves a second look?**

Use `StartFreeAuditButton` and repeat `$0 recovered = $0 fee` nearby.

- [ ] **Step 7: Compose sections**

Order after audit categories:

```tsx
<EvidenceTrustSection />
<PricingSection />
<DataTrustSection />
<FaqSection />
<FinalParcelCta />
```

- [ ] **Step 8: Run validations and build**

```bash
npm run validate:parcel:sections
npm run validate:parcel:copy
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add scripts/validate-parcel-sections.mjs src/app/parcel

git commit -m "feat: complete Parcel conversion funnel"
```

---

### Task 8: Finish Parcel Navigation, Footer, Source Treatment, And CTA Consistency

**Files:**
- Modify: `src/app/parcel/_components/ParcelTopNav.tsx`
- Modify: `src/app/parcel/_components/ParcelFooter.tsx`
- Modify: `src/app/parcel/_components/ParcelHero.tsx`
- Modify: `src/app/parcel/_components/AuditCategoriesSection.tsx`
- Modify: `src/app/parcel/_components/FaqSection.tsx`
- Modify: `scripts/validate-parcel-route.mjs`
- Modify: `scripts/validate-parcel-copy.mjs`

**Interfaces:**
- All primary CTAs use `StartFreeAuditButton`.
- All carrier factual outbound links come from `parcelSources`.

- [ ] **Step 1: Extend navigation/copy guards**

Add to route/copy validation:

```js
const topNav = readFileSync("src/app/parcel/_components/ParcelTopNav.tsx", "utf8");
assert(topNav.includes("How it works"), "Parcel nav must include How it works.");
assert(topNav.includes("What we audit"), "Parcel nav must include What we audit.");
assert(topNav.includes("Pricing"), "Parcel nav must include Pricing.");
assert(topNav.includes("FAQ"), "Parcel nav must include FAQ.");
assert(topNav.includes("StartFreeAuditButton"), "Parcel nav primary CTA must use StartFreeAuditButton.");
```

Also scan all Parcel `.tsx` files for forbidden CTA strings:

- `Request a Pilot`
- `Join Early Access`
- `Book a Demo`

- [ ] **Step 2: Implement mobile navigation parity**

`ParcelTopNav` must mirror the current root nav's accessible mobile menu behavior:

- `aria-expanded`;
- `aria-controls`;
- close/open label changes;
- all four anchor links;
- primary free-audit button.

Close the menu after an anchor click so mobile users see the destination.

- [ ] **Step 3: Finish footer links**

Parcel footer includes:

- `Zettel Parcel` brand;
- `How it works`, `What we audit`, `Pricing`, `FAQ` anchors;
- email link;
- **Zettel is not affiliated with UPS or FedEx.**
- a link back to the current root site labeled **Zettel Ops** while the drayage root remains at `/`.

Do not create nonexistent Terms/Privacy links.

- [ ] **Step 4: Verify carrier source treatment**

Carrier factual cards link to the primary carrier source in a visually legible style (`text-tertiary` or another spec-compliant high-contrast source treatment). External links use `target="_blank"` plus `rel="noreferrer"`.

Do not expose Reddit links as factual-rule citations on the live page.

- [ ] **Step 5: Run route/copy validation and build**

```bash
npm run validate:parcel:route
npm run validate:parcel:copy
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add scripts/validate-parcel-route.mjs scripts/validate-parcel-copy.mjs src/app/parcel

git commit -m "feat: polish Parcel navigation and sources"
```

---

### Task 9: Add Aggregate Parcel Validation And Regression Guards

**Files:**
- Modify: `package.json`
- Modify: `scripts/validate-parcel-copy.mjs`
- Modify: `scripts/validate-parcel-case-file.mjs`
- Modify: `scripts/validate-parcel-intake.mjs`
- Modify: `scripts/validate-parcel-sections.mjs`

**Interfaces:**
- Produces: one `npm run validate:parcel` command used by final verification and future CI work.

- [ ] **Step 1: Add an aggregate script**

Add to `package.json`:

```json
"validate:parcel": "npm run validate:parcel:route && npm run validate:parcel:copy && npm run validate:parcel:case && npm run validate:parcel:intake && npm run validate:parcel:sections"
```

- [ ] **Step 2: Add static-export truth guard**

Extend `validate-parcel-route.mjs` to verify:

```js
const nextConfig = readFileSync("next.config.ts", "utf8");
assert(nextConfig.includes('output: "export"'), "Parcel route must remain static-export compatible.");
assert(nextConfig.includes("trailingSlash: true"), "Parcel route must preserve trailingSlash static URLs.");
```

- [ ] **Step 3: Add ontology-claim guard**

Extend `validate-parcel-copy.mjs` to recursively scan Parcel `.tsx`/`.ts` files and fail on these public claims:

```js
const forbidden = [
  "expert-reviewed ontology",
  "built by carrier billing experts",
  "AI created the ontology",
  "AI understands every carrier rule",
  "knowledge graph proves",
  "autonomous carrier dispute",
];
```

This guard remains until expert sign-off and an explicit spec revision changes what is publishable.

- [ ] **Step 4: Add evidence-label guard**

Extend `validate-parcel-case-file.mjs` so any occurrence of dimensions/weight in the example case remains under explicit role headings and the case includes **Example case**. The validator does not need to parse JSX; string assertions are consistent with the repository's existing validation approach.

- [ ] **Step 5: Run complete automated verification**

```bash
npm run validate:parcel
npm run lint
npm run build
```

Expected: all commands PASS.

- [ ] **Step 6: Commit**

```bash
git add package.json scripts/validate-parcel-*.mjs

git commit -m "test: add Parcel landing-page regression guards"
```

---

### Task 10: Responsive, Accessibility, And Manual UX Verification

**Files:**
- Modify only the Parcel components that fail manual checks.
- No new dependency is added for this task.

**Interfaces:**
- Produces: review evidence that the page satisfies the spec on desktop/mobile without changing global drayage behavior.

- [ ] **Step 1: Start local development server**

```bash
npm run dev
```

Open `/parcel/` at widths approximately 375px, 768px, 1024px, and 1440px.

- [ ] **Step 2: Verify keyboard behavior**

Using keyboard only:

- tab through top navigation;
- open/close mobile menu where applicable;
- open free-audit dialog;
- move through every field;
- submit validation with required fields missing;
- close dialog with Close and Escape;
- tab through FAQ summaries and toggle them;
- reach all source links and final CTA.

Expected: visible focus at every step; no focus trapped outside the modal; no control requires a pointer.

- [ ] **Step 3: Verify 200% zoom and narrow screens**

At 200% browser zoom and 375px width:

- Case File is a vertical readable stack;
- tracking/amount lines do not force horizontal page scroll;
- pricing arithmetic remains legible;
- mobile nav and dialog fit viewport;
- section text does not overlap fixed navigation.

- [ ] **Step 4: Verify state meaning without color**

Confirm these states have visible text/icon labels:

- Missing evidence
- Needs review
- Carrier responded/denied example where shown
- Credit verified example where shown

No state meaning may rely on green/red alone.

- [ ] **Step 5: Verify no unsupported production claims**

Read the rendered page top-to-bottom and confirm:

- all financial/carrier case numbers are labeled illustrative;
- no fake testimonials/logos/metrics;
- no expert-ontology claim;
- no autonomous-agent claim;
- no third-party label support claim;
- no claim that prior package history proves a carrier error;
- no promise of an appeal when only a supported-next-action review is guaranteed.

- [ ] **Step 6: Re-run automated verification after any fixes**

```bash
npm run validate:parcel
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit any UX fixes**

```bash
git add src/app/parcel scripts/validate-parcel-*.mjs

git commit -m "fix: harden Parcel responsive and accessible UX"
```

Skip the commit only when manual verification required no changes.

---

### Task 11: Documentation And Static-Export Handoff

**Files:**
- Modify: `README.md`
- Inspect: `out/parcel/index.html` after build; do not commit `out/` unless repository policy already does so.

**Interfaces:**
- Produces: repeatable developer instructions and a clean handoff to the separate subdomain-migration plan.

- [ ] **Step 1: Add Parcel developer instructions to README**

Add a concise section:

```markdown
## Zettel Parcel landing page

The Parcel product landing page is implemented at `/parcel/` while the current Zettel Ops homepage remains at `/`.

```bash
npm ci
npm run validate:parcel
npm run lint
npm run build
npm run dev
```

Open `http://localhost:3000/parcel/` for local review.

The current GitHub Pages custom domain and drayage homepage are intentionally unchanged by the Parcel page implementation. Moving the products to `parcel.<domain>` and `drayage.<domain>` is a separate deployment/DNS migration.
```

- [ ] **Step 2: Verify static output**

Run:

```bash
npm run build

test -f out/parcel/index.html
```

Expected: exit code 0.

- [ ] **Step 3: Verify current production deployment config remains unchanged**

Run:

```bash
git diff main -- public/CNAME .github/workflows/deploy.yml next.config.ts src/app/page.tsx
```

Expected for this implementation plan:

- no `public/CNAME` change;
- no deploy workflow change;
- no `next.config.ts` change;
- no root `src/app/page.tsx` change.

If any of those changed, revert the unrelated change or stop for architecture review.

- [ ] **Step 4: Commit documentation**

```bash
git add README.md

git commit -m "docs: document Parcel landing-page workflow"
```

---

### Task 12: Final Verification And Implementation Review Gate

**Files:**
- No planned source changes.

- [ ] **Step 1: Run the complete repository verification**

```bash
npm ci
npm run validate:parcel
npm run validate:google-tag
npm run validate:tally-form-events
npm run validate:top-nav-home-link
npm run validate:footer-navigation
npm run validate:hero-offer
npm run validate:mobile-nav
npm run validate:hero-mobile-image-order
npm run validate:mobile-overflow-guards
npm run validate:slack-diagrams
npm run validate:faq-page
npm run validate:blog
npm run lint
npm run build
```

Expected: every command PASS. If an existing validation script is legitimately incompatible with the repository state before Parcel work, capture the pre-existing failure with the base commit and do not weaken that validation to make Parcel pass.

- [ ] **Step 2: Verify changed-file scope**

Run:

```bash
git diff --name-only main...HEAD
```

Expected changes are confined to:

- `src/app/parcel/**`
- `scripts/validate-parcel-*.mjs`
- `package.json`
- `README.md`
- implementation-plan/spec files already present on the documentation branch as applicable.

No root drayage component should need modification.

- [ ] **Step 3: Review against both approved specs**

Check every implemented section against:

- `docs/superpowers/specs/2026-08-30-parcel-audit-landing-page-design.md`
- `docs/superpowers/specs/2026-08-30-parcel-audit-ontology-appendix.md`

Spec coverage checklist:

- approved hero/risk reversal;
- example Case File with source/measurement/evidence distinctions;
- Reddit-informed pain without statistics;
- similar-package context warning;
- four-step process;
- denial as intermediate state;
- readiness-gated audit categories;
- no-black-box-score trust section;
- 25% pricing;
- invoice-first/no-password truth;
- FAQ/final CTA;
- ontology claims remain behind expert gate;
- no Parcel-owned backend intelligence stack.

- [ ] **Step 4: Request code review**

Use `superpowers:requesting-code-review` and explicitly ask the reviewer to check:

1. conversion/design fidelity;
2. false-claim/ontology truth gates;
3. static-export compatibility;
4. accessibility/mobile behavior;
5. regression isolation from the current drayage homepage.

- [ ] **Step 5: Run verification-before-completion**

Use `superpowers:verification-before-completion`. Do not claim the implementation is complete unless the fresh output from Step 1 and the static `/parcel/` output verification are successful.

---

## Separate Follow-On Plans

This implementation plan intentionally does **not** combine independent subsystems.

### Product subdomain migration

Create a separate plan after the `/parcel/` page is accepted. The current repo is the organization GitHub Pages site and publishes one `out/` artifact with `public/CNAME = zettelops.com`. GitHub Pages supports custom subdomains, including distinct custom domains on individual repository Pages sites, but the final `apex + drayage + parcel` hosting topology must be chosen deliberately rather than simulated with hostname-dependent client code.

The migration plan must cover:

- whether the apex remains on this organization site;
- whether `parcel` and `drayage` become separate GitHub Pages repositories/sites or move to another static host;
- custom-domain verification;
- DNS CNAME/A/ALIAS records;
- HTTPS issuance;
- redirects/canonicals;
- blog ownership;
- rollback and no-downtime order of operations.

Do not implement hostname sniffing in client JavaScript as a substitute for real domain routing.

### Parcel backend / Zettel Platform integration

Create a separate backend architecture and implementation plan after the website design is accepted. It must implement the spec's UPS/FedEx ingestion, source-grounded expert-reviewed ontology, temporal rule corpus, Platform GraphMemory/retrieval use, bounded AgentCore proposals, controlled carrier actions, denial workflow, and verified-credit reconciliation. None of those capabilities belong in the static landing-page repository.

---

## Self-Review Results

### Spec coverage

Covered by Tasks 1–12:

- page structure and branding;
- hero, case file, risk reversal;
- Reddit pain and competitor-informed funnel structure;
- historical context qualification;
- denial/next-action behavior;
- readiness-gated audit categories;
- evidence/time/missing-evidence trust messaging;
- public pricing;
- data/credential trust;
- intake behavior without fake upload;
- FAQ/final CTA;
- analytics privacy;
- static-export, responsive, and accessibility requirements;
- ontology/expert-approval language constraints;
- Zettel Platform ownership boundary.

Explicitly separated because the approved spec identifies them as independent/out-of-scope subsystems:

- product subdomain/DNS migration;
- Parcel backend and Zettel Platform extensions;
- actual ontology expert-validation program.

### Placeholder scan

The plan contains no `TODO`, `TBD`, fake API keys, invented form IDs, or undefined backend endpoints. Unknown operational audit-category readiness is handled by an explicit safe default: every category starts `hidden` and the rendered page uses truthful generic scope until a reviewed operational-validation commit changes that state.

### Type/interface consistency

- All primary Parcel CTAs use `StartFreeAuditButton`.
- Only one `AuditIntakeDialog` instance is mounted.
- `content.ts` owns shared copy/source/readiness data.
- `trackParcelEvent` accepts event names only and cannot accept form/customer/shipment payloads.
- `AuditCategory.launchState` is exactly `"hidden" | "validated"` across content, rendering, and validation.
- Case File terminology is consistent with the ontology appendix: declared/assessed/derived evidence remains distinct, historical context is not proof, and credit is verified only as a financial outcome concept.