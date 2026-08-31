# Zettel Parcel Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Zettel Parcel managed UPS/FedEx refund + billing-audit landing page at `/parcel/` using the approved design and ontology appendix, while leaving the existing drayage homepage and production domain configuration unchanged.

**Architecture:** Add a route-local Parcel page under `src/app/parcel` with Parcel-specific components and content constants while reusing the existing global Tailwind tokens, logo asset, Public Sans setup, and static-export architecture. Keep Parcel copy, example-case data, source URLs, readiness gates, and analytics event names in route-local modules so the existing Zettel Ops homepage remains isolated. The first audit-intake experience is client-side and uses a structured `mailto:` handoff to the existing Zettel contact address; it does not upload carrier files or introduce a second backend before the Parcel/Zettel Platform backend plan exists.

**Tech Stack:** Next.js 16.2.6 App Router, React 19.2.4, TypeScript 5, Tailwind CSS v4 tokens from `src/app/globals.css`, static export via `output: "export"`, GitHub Pages, existing Google Analytics tag, Node validation scripts, npm.

**Spec:**
- `docs/superpowers/specs/2026-08-30-parcel-audit-landing-page-design.md`
- `docs/superpowers/specs/2026-08-30-parcel-audit-ontology-appendix.md`

## Global Constraints

- Implement Parcel at `/parcel/`; do not replace `src/app/page.tsx` in this plan.
- Do not modify `public/CNAME`, DNS, or GitHub Pages custom-domain settings in this plan.
- Do not move the current drayage experience to `drayage.<domain>` in this plan; hosting migration is a separate subsystem and requires its own plan.
- Keep `next.config.ts` unchanged: `output: "export"`, `images: { unoptimized: true }`, `trailingSlash: true`.
- Before writing Next.js code, read the relevant installed Next 16 docs under `node_modules/next/dist/docs/` as required by `AGENTS.md`.
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
- No invoice/file upload in this website plan. The intake form must explicitly say Zettel will request a recent invoice in follow-up.
- Do not add a Parcel-only graph, RAG service, vector store, ontology runtime, model router, agent memory, or backend intelligence to this repository.
- Keep analytics free of invoice content, tracking numbers, package measurements, carrier account identifiers, user email, company, or other sensitive shipment/customer data.
- Target WCAG 2.2 AA, keyboard-operable controls, visible focus, text labels for states, and `prefers-reduced-motion` compatibility.
- Use existing dependencies. This plan adds no runtime or dev dependencies.

---

## File Structure

### Create

- `src/app/parcel/layout.tsx` — Parcel route metadata.
- `src/app/parcel/page.tsx` — Parcel page composition only.
- `src/app/parcel/_lib/content.ts` — approved copy, source URLs, example-case data, FAQ data, audit-category readiness.
- `src/app/parcel/_lib/analytics.ts` — typed Google Analytics event helper with non-sensitive event names only.
- `src/app/parcel/_components/ParcelTopNav.tsx`
- `src/app/parcel/_components/ParcelFooter.tsx`
- `src/app/parcel/_components/StartFreeAuditButton.tsx`
- `src/app/parcel/_components/AuditIntakeDialog.tsx`
- `src/app/parcel/_components/CaseFile.tsx`
- `src/app/parcel/_components/ParcelHero.tsx`
- `src/app/parcel/_components/RiskReversalStrip.tsx`
- `src/app/parcel/_components/PainSection.tsx`
- `src/app/parcel/_components/FullContextSection.tsx`
- `src/app/parcel/_components/HistorySection.tsx`
- `src/app/parcel/_components/HowItWorksSection.tsx`
- `src/app/parcel/_components/DenialSection.tsx`
- `src/app/parcel/_components/AuditCategoriesSection.tsx`
- `src/app/parcel/_components/EvidenceTrustSection.tsx`
- `src/app/parcel/_components/PricingSection.tsx`
- `src/app/parcel/_components/DataTrustSection.tsx`
- `src/app/parcel/_components/FaqSection.tsx`
- `src/app/parcel/_components/FinalParcelCta.tsx`
- `scripts/validate-parcel-route.mjs`
- `scripts/validate-parcel-copy.mjs`
- `scripts/validate-parcel-case-file.mjs`
- `scripts/validate-parcel-intake.mjs`
- `scripts/validate-parcel-sections.mjs`

### Modify

- `package.json` — add Parcel validation scripts.
- `README.md` — add `/parcel/` local review instructions.

### Deliberately do not modify

- `src/app/page.tsx`
- existing drayage components under `src/app/_components/*`
- `public/CNAME`
- `.github/workflows/deploy.yml`
- `next.config.ts`

A real build failure may prove a route-local assumption wrong. If that happens, stop for architecture review before touching a file in the deliberate-no-change list.

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
- Consumes: root `src/app/layout.tsx`, `src/app/globals.css`, `/images/zettel_logo.png`.
- Produces: static `/parcel/` route with Parcel-local metadata, nav, and footer.

- [ ] **Step 1: Read installed Next 16 route/layout/static-export docs**

Read the relevant files under `node_modules/next/dist/docs/` for layouts/pages, metadata, and static export. Record the exact docs in the implementation review note.

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

const pagePath = "src/app/parcel/page.tsx";
const layoutPath = "src/app/parcel/layout.tsx";
const rootPage = readFileSync("src/app/page.tsx", "utf8");
const cname = readFileSync("public/CNAME", "utf8").trim();

assert(existsSync(pagePath), "Parcel page must exist at src/app/parcel/page.tsx.");
assert(existsSync(layoutPath), "Parcel layout must exist at src/app/parcel/layout.tsx.");
assert(
  rootPage.includes("<Hero />") && rootPage.includes("<Steps />"),
  "Existing drayage root composition must remain intact.",
);
assert(cname === "zettelops.com", "Parcel implementation must not change CNAME.");

const page = readFileSync(pagePath, "utf8");
const layout = readFileSync(layoutPath, "utf8");
assert(page.includes("ParcelTopNav"), "Parcel page must use ParcelTopNav.");
assert(page.includes("ParcelFooter"), "Parcel page must use ParcelFooter.");
assert(layout.includes("Zettel Parcel"), "Parcel metadata must identify Zettel Parcel.");
```

- [ ] **Step 3: Register and run the failing validation**

Add to `package.json`:

```json
"validate:parcel:route": "node scripts/validate-parcel-route.mjs"
```

Run:

```bash
npm run validate:parcel:route
```

Expected: FAIL because the Parcel route does not exist.

- [ ] **Step 4: Create Parcel metadata**

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

- [ ] **Step 5: Create Parcel-local nav/footer**

`ParcelTopNav.tsx` uses brand `Zettel Parcel`, the existing logo, and anchors:

```tsx
const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "What we audit", href: "#what-we-audit" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];
```

`ParcelFooter.tsx` includes `Zettel Parcel`, those same anchors, `mailto:zettel.ops@gmail.com`, and:

```tsx
<p>Zettel is not affiliated with UPS or FedEx.</p>
```

Do not add nonexistent privacy/terms links.

- [ ] **Step 6: Create minimal page composition**

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

- [ ] **Step 7: Verify route, lint, and export**

```bash
npm run validate:parcel:route
npm run lint
npm run build
test -f out/parcel/index.html
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add package.json scripts/validate-parcel-route.mjs src/app/parcel
git commit -m "feat: add isolated Zettel Parcel route"
```

---

### Task 2: Centralize Approved Copy, Sources, Example Data, And Readiness

**Files:**
- Create: `src/app/parcel/_lib/content.ts`
- Create: `scripts/validate-parcel-copy.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `parcelCopy`, `parcelSources`, `exampleCase`, `painCards`, `processSteps`, `auditCategories`, `faqItems`.
- Shared headline, pricing, source URLs, and example-case labels come from `content.ts` rather than being duplicated across components.

- [ ] **Step 1: Write failing copy validation**

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

- [ ] **Step 2: Register and run failing validation**

```json
"validate:parcel:copy": "node scripts/validate-parcel-copy.mjs"
```

```bash
npm run validate:parcel:copy
```

Expected: FAIL because `content.ts` does not exist.

- [ ] **Step 3: Create typed content/source model**

Use:

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

Primary carrier sources:

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

Launch copy:

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

`exampleCase` must include `label: "Example case"`, explicit **Shipper-declared** and **Carrier-assessed** labels, `ruleLabel: "Rule in effect on shipment date"`, `historyLabel: "Similar package profile"`, and a missing package-photo state.

Define all six candidate audit categories with `launchState: "hidden"`. Execution may change an individual category to `"validated"` only after a separate reviewed operational-validation artifact exists.

- [ ] **Step 4: Verify and commit**

```bash
npm run validate:parcel:copy
npm run lint
git add package.json scripts/validate-parcel-copy.mjs src/app/parcel/_lib/content.ts
git commit -m "feat: centralize Parcel landing-page content"
```

---

### Task 3: Build Signature Case File, Hero, And Risk Strip

**Files:**
- Create: `scripts/validate-parcel-case-file.mjs`
- Modify: `package.json`
- Create: `src/app/parcel/_components/CaseFile.tsx`
- Create: `src/app/parcel/_components/ParcelHero.tsx`
- Create: `src/app/parcel/_components/RiskReversalStrip.tsx`
- Modify: `src/app/parcel/page.tsx`

**Interfaces:**
- Components consume `parcelCopy`/`exampleCase`; validators check both component structure and centralized content.

- [ ] **Step 1: Write failing Case File validation**

```js
import { readFileSync } from "node:fs";

const component = readFileSync("src/app/parcel/_components/CaseFile.tsx", "utf8");
const content = readFileSync("src/app/parcel/_lib/content.ts", "utf8");

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}

assert(component.includes("exampleCase"), "CaseFile must render centralized exampleCase data.");
for (const label of [
  "Example case",
  "Shipper-declared",
  "Carrier-assessed",
  "Rule in effect on shipment date",
  "Similar package profile",
  "Missing evidence",
  "Needs review",
]) {
  assert(content.includes(label), `Case content must define ${label}.`);
}
assert(!component.includes("AI confidence"), "CaseFile must not use AI confidence as evidence.");
```

Register `validate:parcel:case`, run it, and expect FAIL because `CaseFile.tsx` does not exist.

- [ ] **Step 2: Implement `CaseFile.tsx`**

Use semantic `<dl>/<dt>/<dd>` groups, a visible `Example case` badge, textual state labels, and `font-mono` for tracking IDs, measurements, dates, and amounts. Missing photo evidence renders `Missing`, never color alone.

- [ ] **Step 3: Implement `ParcelHero.tsx`**

Use a two-column desktop/vertical mobile composition and render `CaseFile`. Hero text comes from `parcelCopy`. Before Task 4, use a real anchor `href="#audit-intake"` for the primary CTA; Task 4 replaces it with the dialog opener.

Secondary CTA: **See what we check** → `#what-we-audit`.

- [ ] **Step 4: Implement `RiskReversalStrip.tsx`**

Render exactly:

- Start with an invoice
- 25% of verified credits
- $0 recovered = $0 fee

Use borders and typography rather than card shadows.

- [ ] **Step 5: Compose and verify**

`page.tsx` replaces the temporary hero with:

```tsx
<ParcelHero />
<RiskReversalStrip />
```

Run:

```bash
npm run validate:parcel:case
npm run validate:parcel:copy
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit**

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
- Modify: `src/app/parcel/page.tsx`

**Interfaces:**
- `StartFreeAuditButton` dispatches `parcel:open-audit-intake`.
- One `AuditIntakeDialog` listens for that event.
- `trackParcelEvent(name)` accepts an event name only; no event payload parameter exists.

- [ ] **Step 1: Write failing intake validation**

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
  assert(dialog.includes(field), `Audit intake must include ${field}.`);
}
assert(dialog.includes("zettel.ops@gmail.com"), "Audit intake must use existing Zettel email.");
assert(
  dialog.includes("We'll request a recent carrier invoice in our follow-up."),
  "No-upload fallback must explain the follow-up.",
);
assert(!dialog.includes('type="file"'), "Static intake must not pretend to upload invoices.");
assert(
  analytics.includes("trackParcelEvent(name: ParcelAnalyticsEvent)"),
  "Analytics helper must accept only the event name.",
);
assert(!analytics.includes("params:"), "Parcel analytics helper must not accept arbitrary params.");
```

Register `validate:parcel:intake`; run and expect FAIL.

- [ ] **Step 2: Implement analytics helper**

```ts
export type ParcelAnalyticsEvent =
  | "parcel_free_audit_open"
  | "parcel_free_audit_submit_mailto"
  | "parcel_see_checks_click"
  | "parcel_faq_toggle";

type GtagWindow = Window & {
  gtag?: (command: "event", name: string, params?: Record<string, string>) => void;
};

export function trackParcelEvent(name: ParcelAnalyticsEvent) {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", name, { product: "parcel" });
}
```

- [ ] **Step 3: Implement `StartFreeAuditButton.tsx`**

On click:

```ts
window.dispatchEvent(new Event("parcel:open-audit-intake"));
trackParcelEvent("parcel_free_audit_open");
```

Accept only `className` and `children` props.

- [ ] **Step 4: Implement `AuditIntakeDialog.tsx`**

Use a native `<dialog>`. Required data shape:

```ts
type AuditIntake = {
  name: string;
  workEmail: string;
  company: string;
  carrier: "UPS" | "FedEx" | "Both";
  monthlyShipments: "Under 100" | "100–499" | "500–1,999" | "2,000+" | "Not sure";
};
```

On valid submit:

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

trackParcelEvent("parcel_free_audit_submit_mailto");
window.location.href = `mailto:zettel.ops@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
```

Visible note:

**We'll request a recent carrier invoice in our follow-up. This website does not upload carrier files.**

No carrier password field.

- [ ] **Step 5: Replace primary CTAs and mount one dialog**

Use `StartFreeAuditButton` in Parcel top nav and hero. Mount exactly one `AuditIntakeDialog` in `page.tsx` with `id="audit-intake"` on its containing element/dialog.

- [ ] **Step 6: Verify and commit**

```bash
npm run validate:parcel:intake
npm run lint
npm run build
git add package.json scripts/validate-parcel-intake.mjs src/app/parcel
git commit -m "feat: add Parcel free-audit intake"
```

---

### Task 5: Build Pain, Full-Context, History, And Process Sections

**Files:**
- Create: `scripts/validate-parcel-sections.mjs`
- Modify: `package.json`
- Create: `src/app/parcel/_components/PainSection.tsx`
- Create: `src/app/parcel/_components/FullContextSection.tsx`
- Create: `src/app/parcel/_components/HistorySection.tsx`
- Create: `src/app/parcel/_components/HowItWorksSection.tsx`
- Modify: `src/app/parcel/page.tsx`

**Interfaces:**
- Components consume `painCards`, `exampleCase`, `processSteps`, `parcelSources`.
- Validation combines component source with `content.ts`, so centralized copy remains centralized.

- [ ] **Step 1: Write failing section validation**

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

const combined = [
  readFileSync("src/app/parcel/_lib/content.ts", "utf8"),
  ...files.map((file) => readFileSync(file, "utf8")),
].join("\n");

for (const phrase of [
  "Same box. Different bill.",
  "The problem isn't a $20 surcharge. It's fighting it every week.",
  "A denial shouldn't erase the evidence.",
  "Every charge gets a case file.",
  "Similar package profile",
  "Build the case",
]) {
  assert(combined.includes(phrase), `Parcel sections must include: ${phrase}`);
}
assert(!/\b\d+% of (shipments|invoices|packages)\b/i.test(combined), "Do not convert Reddit anecdotes to statistics.");
```

Register `validate:parcel:sections`; run and expect FAIL.

- [ ] **Step 2: Implement four pain cards**

Approved headlines:

- **Same box. Different bill.**
- **A surcharge without the story is hard to challenge.**
- **The problem isn't a $20 surcharge. It's fighting it every week.**
- **A denial shouldn't erase the evidence.**

No Reddit usernames, quotes, or frequency statistics.

- [ ] **Step 3: Implement full-context sequence**

Headline **Every charge gets a case file.** Sequence:

```text
Invoice line → Shipment facts → Rule in effect → Evidence → Dispute → Carrier response → Verified credit
```

This is a linear evidence story, not a decorative network graph.

- [ ] **Step 4: Implement history section**

Use illustrative history from `content.ts`, label **Example case**, call the evidentiary comparison **Similar package profile**, and include:

**Prior shipments are context, not proof that a new carrier assessment is wrong.**

- [ ] **Step 5: Implement four-step process**

Section `id="how-it-works"`:

1. Send — contact details first; invoice requested in follow-up.
2. Audit — identify supported charges worth reviewing.
3. Build the case — source facts, rule in effect, evidence, and gaps.
4. Recover — pursue supported next actions and verify posted credits.

- [ ] **Step 6: Compose, verify, commit**

Order:

```tsx
<PainSection />
<FullContextSection />
<HistorySection />
<HowItWorksSection />
```

```bash
npm run validate:parcel:sections
npm run lint
npm run build
git add package.json scripts/validate-parcel-sections.mjs src/app/parcel
git commit -m "feat: add Parcel evidence and pain sections"
```

---

### Task 6: Add Denial Workflow And Readiness-Gated Audit Categories

**Files:**
- Create: `src/app/parcel/_components/DenialSection.tsx`
- Create: `src/app/parcel/_components/AuditCategoriesSection.tsx`
- Modify: `scripts/validate-parcel-sections.mjs`
- Modify: `src/app/parcel/page.tsx`

**Interfaces:**
- `visibleAuditCategories = auditCategories.filter(({ launchState }) => launchState === "validated")`.
- With all initial states hidden, render safe generic audit-scope copy rather than unsupported cards.

- [ ] **Step 1: Extend validation first**

```js
const denial = readFileSync("src/app/parcel/_components/DenialSection.tsx", "utf8");
const categories = readFileSync("src/app/parcel/_components/AuditCategoriesSection.tsx", "utf8");
const content = readFileSync("src/app/parcel/_lib/content.ts", "utf8");

assert(denial.includes("next supported action"), "Denial copy must not promise an appeal for every case.");
assert(content.includes("Denied isn't the same as explained."), "Denial headline is required in centralized content.");
assert(categories.includes('launchState === "validated"'), "Audit categories must be readiness gated.");
assert(content.includes('launchState: "hidden"'), "Unvalidated categories must default hidden.");
```

Run validation; expect FAIL because components do not exist.

- [ ] **Step 2: Implement denial section**

Headline from content: **Denied isn't the same as explained.**

State path:

```text
Carrier responded → Review reason → Check evidence gap → Determine next supported action → Resolution
```

Never say every denial is appealable.

- [ ] **Step 3: Implement audit-category gate**

Section `id="what-we-audit"`:

```ts
const visibleAuditCategories = auditCategories.filter(
  (category) => category.launchState === "validated",
);
```

When none are validated, render exactly this safe state:

> **What we check in a free audit**  
> We start with your actual UPS or FedEx bill and confirm which charge types we can support before we file anything. We won't submit a dispute for a category we haven't operationally validated.

When a future reviewed commit marks categories validated, cards render:

- What you see on the bill
- What Zettel checks
- What evidence may matter
- one primary carrier source link

- [ ] **Step 4: Compose, verify, commit**

```bash
npm run validate:parcel:sections
npm run lint
npm run build
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
- Components consume centralized content.
- FAQ uses native `<details>`.
- Final CTA reuses `StartFreeAuditButton`; no second dialog instance.

- [ ] **Step 1: Extend validation first**

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

const components = [
  "EvidenceTrustSection.tsx",
  "PricingSection.tsx",
  "DataTrustSection.tsx",
  "FaqSection.tsx",
  "FinalParcelCta.tsx",
].map((file) => readFileSync(`src/app/parcel/_components/${file}`, "utf8")).join("\n");
const content = readFileSync("src/app/parcel/_lib/content.ts", "utf8");

for (const phrase of [
  "Every flagged charge comes with the reason.",
  "If the evidence isn't there, Zettel says so.",
  "25% of verified credits",
  "Start with an invoice, not your password.",
]) {
  assert(content.includes(phrase), `Centralized content must include ${phrase}`);
}
assert(components.includes("parcelCopy"), "Trust/pricing components must consume centralized copy.");
assert(components.includes("<details"), "FAQ must use native details disclosure.");
```

Run validation; expect FAIL.

- [ ] **Step 2: Implement evidence-trust section**

Headline: **Every flagged charge comes with the reason.**

Cards:

1. Evidence you can trace
2. Time matters — **Rule in effect on shipment date**
3. Missing evidence stays missing — **If the evidence isn't there, Zettel says so.**

No confidence meter.

- [ ] **Step 3: Implement pricing**

Section `id="pricing"`. Example:

```text
Carrier credits your account   $1,000
Zettel fee                        $250
You keep                          $750
```

Label **Example**. Do not use **cheapest**.

- [ ] **Step 4: Implement data trust**

Headline: **Start with an invoice, not your password.**

Accurate claims only:

- website intake does not request carrier password;
- website does not upload carrier files;
- invoice/billing export is requested in follow-up;
- no encryption/retention/compliance claims are added.

- [ ] **Step 5: Implement FAQ**

Section `id="faq"`, native `<details>/<summary>`. `faqItems` contains:

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

Unresolved carrier-specific windows/platform support use narrow, truthful answers.

- [ ] **Step 6: Implement final CTA**

Headline: **Think your shipping bill deserves a second look?**

Reuse `StartFreeAuditButton` and repeat `$0 recovered = $0 fee`.

- [ ] **Step 7: Compose, verify, commit**

```tsx
<EvidenceTrustSection />
<PricingSection />
<DataTrustSection />
<FaqSection />
<FinalParcelCta />
```

```bash
npm run validate:parcel:sections
npm run validate:parcel:copy
npm run lint
npm run build
git add scripts/validate-parcel-sections.mjs src/app/parcel
git commit -m "feat: complete Parcel conversion funnel"
```

---

### Task 8: Finish Navigation, Footer, Source Treatment, And CTA Consistency

**Files:**
- Modify: `src/app/parcel/_components/ParcelTopNav.tsx`
- Modify: `src/app/parcel/_components/ParcelFooter.tsx`
- Modify: `src/app/parcel/_components/ParcelHero.tsx`
- Modify: `src/app/parcel/_components/AuditCategoriesSection.tsx`
- Modify: `scripts/validate-parcel-route.mjs`
- Modify: `scripts/validate-parcel-copy.mjs`

**Interfaces:**
- All primary CTAs use `StartFreeAuditButton`.
- Factual carrier outbound links come from `parcelSources`.

- [ ] **Step 1: Extend navigation guards**

Add assertions that ParcelTopNav contains the four nav labels and `StartFreeAuditButton`. Recursively scan Parcel TSX files and fail on:

- Request a Pilot
- Join Early Access
- Book a Demo

- [ ] **Step 2: Finish mobile navigation**

Mirror the current root nav's accessible behavior:

- `aria-expanded`
- `aria-controls`
- dynamic open/close label
- same four links
- free-audit CTA
- close menu after anchor click

- [ ] **Step 3: Finish footer**

Include Parcel anchors, email, affiliation disclaimer, and a link to `/` labeled **Zettel Ops** while root remains drayage.

- [ ] **Step 4: Verify source links**

Carrier factual source links use `parcelSources`, high-contrast source styling, `target="_blank"`, and `rel="noreferrer"`. Reddit links do not appear as carrier-rule citations.

- [ ] **Step 5: Verify and commit**

```bash
npm run validate:parcel:route
npm run validate:parcel:copy
npm run lint
npm run build
git add scripts/validate-parcel-route.mjs scripts/validate-parcel-copy.mjs src/app/parcel
git commit -m "feat: polish Parcel navigation and sources"
```

---

### Task 9: Add Aggregate Parcel Regression Guard

**Files:**
- Modify: `package.json`
- Modify: all `scripts/validate-parcel-*.mjs`

**Interfaces:**
- Produces: one `npm run validate:parcel` command.

- [ ] **Step 1: Add aggregate script**

```json
"validate:parcel": "npm run validate:parcel:route && npm run validate:parcel:copy && npm run validate:parcel:case && npm run validate:parcel:intake && npm run validate:parcel:sections"
```

- [ ] **Step 2: Add static-export guards**

`validate-parcel-route.mjs` also asserts `next.config.ts` contains:

```js
assert(nextConfig.includes('output: "export"'), "Parcel route must remain static-export compatible.");
assert(nextConfig.includes("trailingSlash: true"), "Parcel route must preserve trailingSlash URLs.");
```

- [ ] **Step 3: Add ontology/false-claim recursive guard**

Scan every `src/app/parcel/**/*.ts(x)` file and fail on:

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

This guard remains until actual expert sign-off plus a spec revision changes publishable language.

- [ ] **Step 4: Run complete automated verification**

```bash
npm run validate:parcel
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add package.json scripts/validate-parcel-*.mjs
git commit -m "test: add Parcel landing-page regression guards"
```

---

### Task 10: Responsive, Accessibility, And Manual UX Verification

**Files:**
- Modify only Parcel components that fail checks.

- [ ] **Step 1: Start local server**

```bash
npm run dev
```

Review `/parcel/` at approximately 375px, 768px, 1024px, 1440px.

- [ ] **Step 2: Keyboard-only verification**

Verify:

- top nav
- mobile menu
- free-audit dialog open/close
- required-field validation
- every form field
- FAQ toggles
- source links
- final CTA

Expected: visible focus everywhere; no pointer-only controls; native dialog closes on Escape.

- [ ] **Step 3: 200% zoom / narrow-screen verification**

Confirm Case File becomes a readable vertical stack, no page-level horizontal scroll, pricing remains legible, dialog fits viewport, and fixed nav does not cover section targets.

- [ ] **Step 4: Verify states without color**

Text/icon labels exist for missing evidence, needs review, carrier response/denial example where shown, and verified credit example where shown.

- [ ] **Step 5: Rendered-copy truth review**

Confirm no fake metrics/logos/testimonials, no expert-ontology claim, no autonomous-agent claim, no third-party-label support claim, no “history proves error” claim, and no universal appeal promise.

- [ ] **Step 6: Re-run automation and commit fixes**

```bash
npm run validate:parcel
npm run lint
npm run build
```

If manual checks required code changes:

```bash
git add src/app/parcel scripts/validate-parcel-*.mjs
git commit -m "fix: harden Parcel responsive and accessible UX"
```

If no code changed, do not create an empty commit.

---

### Task 11: Documentation And Static-Export Handoff

**Files:**
- Modify: `README.md`
- Inspect: `out/parcel/index.html`

- [ ] **Step 1: Add README section**

Add these exact contents as ordinary Markdown (not as a nested code fence in this plan):

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

- [ ] **Step 2: Verify static output**

```bash
npm run build
test -f out/parcel/index.html
```

Expected: exit code 0.

- [ ] **Step 3: Verify deployment/root files remain unchanged**

```bash
git diff main -- public/CNAME .github/workflows/deploy.yml next.config.ts src/app/page.tsx
```

Expected: no implementation changes in those four paths. Documentation already present on the branch is unrelated to this check.

- [ ] **Step 4: Commit README**

```bash
git add README.md
git commit -m "docs: document Parcel landing-page workflow"
```

---

### Task 12: Final Verification And Review Gate

**Files:**
- No planned source changes.

- [ ] **Step 1: Run full repository verification**

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

Expected: every command PASS. If an existing validator already fails on the base commit, capture that base failure rather than weakening it.

- [ ] **Step 2: Verify changed-file scope**

```bash
git diff --name-only main...HEAD
```

Implementation changes must be confined to:

- `src/app/parcel/**`
- `scripts/validate-parcel-*.mjs`
- `package.json`
- `README.md`
- documentation files already belonging to the design/plan branch

- [ ] **Step 3: Review against both specs**

Check:

- hero/risk reversal
- Case File source/measurement/evidence distinctions
- Reddit pain without statistics
- historical context qualification
- four-step flow
- denial intermediate state
- readiness-gated audit categories
- evidence/time/missing-evidence trust
- 25% pricing
- invoice-first/no-password truth
- FAQ/final CTA
- ontology claims behind expert gate
- no Parcel-owned backend intelligence stack

- [ ] **Step 4: Request code review**

Use `superpowers:requesting-code-review`. Ask the reviewer to check:

1. conversion/design fidelity;
2. false-claim and ontology truth gates;
3. static-export compatibility;
4. accessibility/mobile behavior;
5. regression isolation from current drayage.

- [ ] **Step 5: Verification before completion**

Use `superpowers:verification-before-completion`. Do not claim completion unless the fresh Task 12 command output and `out/parcel/index.html` check are successful.

---

## Separate Follow-On Plans

### Product subdomain migration

The current repository is the organization GitHub Pages site and publishes one `out/` artifact with `public/CNAME = zettelops.com`. GitHub Pages supports custom subdomains and distinct custom domains on individual repository Pages sites, but `apex + drayage + parcel` hosting is independent from building the Parcel page.

A separate migration plan must choose and implement the production topology, including:

- apex ownership;
- separate GitHub Pages repositories/sites versus another static host;
- domain verification;
- DNS records;
- HTTPS issuance;
- redirects/canonicals;
- blog ownership;
- rollback/no-downtime order.

Do not use client-side hostname sniffing as a substitute for real domain routing.

### Parcel backend / Zettel Platform integration

Create a separate backend architecture/implementation plan for UPS/FedEx ingestion, source-grounded expert-reviewed ontology, temporal rule corpus, Platform GraphMemory/retrieval, bounded AgentCore proposals, controlled carrier actions, denial workflow, and verified-credit reconciliation. Those capabilities do not belong in this static website repository.

---

## Self-Review Results

### Spec coverage

Tasks 1–12 cover page structure/brand, hero, Case File, risk reversal, Reddit pain, history qualification, process, denial, readiness-gated audit categories, evidence/time/missing-evidence trust, public pricing, credential/data trust, intake fallback, FAQ/final CTA, analytics privacy, static export, mobile/accessibility, ontology claim gates, and Zettel Platform ownership boundaries.

Independent subsystems deliberately separated: subdomain/DNS migration, Parcel backend/Platform extensions, and actual ontology expert-validation program.

### Placeholder scan

No implementation step depends on fake API keys, invented form IDs, undefined backend endpoints, or an unspecified upload service. Unknown operational category readiness has an explicit safe default: all categories start `hidden`; the page uses truthful generic scope until a reviewed operational-validation commit changes individual states.

### Type/interface consistency

- All primary CTAs use `StartFreeAuditButton`.
- One `AuditIntakeDialog` is mounted.
- `content.ts` owns shared copy/source/readiness data.
- Validators that inspect approved copy read `content.ts`, not only consumer components.
- `trackParcelEvent` accepts an event name only.
- `AuditCategory.launchState` is exactly `"hidden" | "validated"`.
- Case terminology follows the ontology appendix: source assertions remain distinct, history is context, and verified credit is a financial outcome rather than an estimate.