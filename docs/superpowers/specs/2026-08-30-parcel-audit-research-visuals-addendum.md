# Zettel Parcel Research, Statistics, And Visuals Design Addendum

Date: 2026-08-30  
Parent design: `docs/superpowers/specs/2026-08-30-parcel-audit-landing-page-design.md`  
Ontology appendix: `docs/superpowers/specs/2026-08-30-parcel-audit-ontology-appendix.md`  
Research artifact: `docs/superpowers/research/2026-08-30-parcel-market-domain-evidence.md`  
Status: Normative design addendum; implementation not started

## Purpose

This addendum closes three design gaps before implementation:

1. how competitor research may influence the product without appearing on the public website;
2. which source-backed statistics may be used to establish the scale and complexity of parcel billing;
3. how useful Parcel visuals are created and maintained through `zettel-ai/website_diagram` while preserving the existing Zettel visual language.

Where this addendum conflicts with the parent landing-page spec on competitor exposure, public statistics, or diagram-generation workflow, this addendum governs.

---

## Competitor Research Is Internal Only

Competitor research exists to understand category conventions, buyer expectations, onboarding friction, pricing structures, trust mechanics, and product gaps.

It is **not public Parcel content**.

The public `/parcel/` page must not contain:

- competitor company names;
- competitor product names;
- competitor logos or screenshots;
- competitor pricing;
- competitor recovery totals or customer results;
- competitor-originated market/error-rate statistics;
- comparison tables against named competitors;
- outbound competitor links;
- "unlike X" / "cheaper than X" / "X only does Y" copy.

Competitor research may influence an internal design decision only if the resulting Zettel statement can stand on its own. Factual public claims must be supported by carrier, government, standards, or independent industry sources rather than by a competitor's marketing page.

### Internal competitor lessons retained

The category already includes some combination of:

- free audits and free recovery offers;
- contingency models;
- automated claim submission;
- credit verification;
- human escalation after denials;
- contract/rate validation;
- AI explanations using contracts and shipment history;
- dozens or hundreds of advertised audit checks.

Therefore the public Zettel Parcel page must not position Zettel as:

- "the AI parcel auditor";
- "the cheapest parcel audit";
- "the most audit checks";
- "the only provider that verifies refunds."

The launch differentiation remains:

- invoice-first managed entry;
- an understandable Case File instead of a black-box savings score;
- source-backed evidence and native provenance;
- the rule/version/effective time that governed the shipment;
- visible evidence gaps and uncertainty;
- durable denial/decision history;
- bounded AI proposals with human control;
- verified financial outcomes;
- Zettel Platform as the shared intelligence/provenance foundation.

---

## Public Validation Statistics

The Parcel landing page should use the same credibility pattern as the existing drayage page: a small number of high-signal statistics, each with a visible source link and one sentence explaining why it matters.

The purpose is to establish **scale and structural complexity**, not to imply that carriers make mistakes at a particular rate.

### Section placement

Place the statistics after the hero/risk-reversal context and before or as the opening of **Why shippers give up**.

### Section headline

**Parcel billing is a moving target at massive scale.**

### Supporting sentence

**Billions of shipments, annual rate changes, and hundreds of billing fields create a lot of places for one confusing charge to hide.**

### Stat card 1 — U.S. parcel scale

**Display:** `23.1B`

**Label:** `U.S. parcels shipped in 2025`

**Body:**

> U.S. parcel volume reached 23.1 billion shipments in 2025. At that scale, shipment-level billing is not a small-data problem.

**Source label:** `Source: Pitney Bowes Parcel Shipping Index 2026`

**Source URL:** `https://www.pitneybowes.com/us/shipping-index.html`

The source also reports 732 parcels per second, 171 parcels per household, and 3.3% year-over-year growth. Those may be used in source notes or accessible supporting text but should not make the card visually busy.

### Stat card 2 — 2026 carrier rate pressure

**Display:** `5.9% / 5.9%`

**Label:** `average 2026 rate increases announced by UPS and FedEx`

**Body:**

> UPS implemented a separate average 5.9% net increase in base and accessorial rates for 2026, while FedEx increased parcel shipping rates by an average of 5.9% effective January 5, 2026.

**UPS source label:** `Source: UPS 2025 Form 10-K`

**UPS source URL:** `https://investors.ups.com/sec-filings/all-sec-filings/content/0001628280-26-008432/ups-20251231.htm`

**FedEx source label:** `Source: FedEx 2026 rate announcement`

**FedEx source URL:** `https://investors.fedex.com/news-and-events/earnings-releases/default.aspx`

**Truth constraint:** Never imply every customer's actual spend increased exactly 5.9%. Contract terms, accessorials, fuel, zones, packaging, mix, and service levels change actual spend.

### Stat card 3 — billing-data complexity

**Display:** `250 → 270`

**Label:** `columns in UPS's standardized Global Flat File CSV`

**Body:**

> UPS says its Global Flat File billing CSV expands from 250 columns to 270 columns in September 2026, and tells automated users to update their parsing and validation processes.

**Source label:** `Source: UPS Billing Center`

**Source URL:** `https://www.ups.com/us/en/business-solutions/ups-billing`

### Optional supporting fact — weekly fuel surcharge changes

UPS states that its U.S. Ground Domestic and Domestic Air fuel surcharges are adjusted weekly.

**Source:** `https://www.ups.com/us/en/support/shipping-support/shipping-costs-rates/fuel-surcharges`

Use this as supporting copy only if it helps explain why **Rule in effect on shipment date** matters. Do not create a fourth headline card unless visual testing proves the section benefits from it.

---

## Statistics The Public Page Must Not Use

Do not publish a generic carrier billing-error rate unless an independent authoritative source is found and reviewed.

Specifically reject public use of vendor-originated claims such as:

- 3–5% of parcel spend is billing errors;
- 80% of businesses are overpaying;
- 1–9% of invoice value is recoverable;
- 75% of parcel credits go unclaimed;
- "one in five invoices" contains an error;
- competitor savings/recovery/ROI percentages;
- Reddit anecdotes converted into population-level rates.

A competitor statistic remains competitor marketing even if Zettel paraphrases it.

---

## Current Carrier Source Artifacts

The implementation should treat `docs/superpowers/research/2026-08-30-parcel-market-domain-evidence.md` as the source register for the research snapshot used by this design.

Particularly important exact artifacts include:

### UPS

- 2026 U.S. UPS Tariff/Terms and Conditions of Service, effective April 17, 2026:  
  `https://assets.ups.com/adobe/assets/urn:aaid:aem:c6bf8a2f-018f-4aa0-838b-ffc1a75eb1d9/original/as/terms-carriage-us-en.pdf`
- 2026 U.S. UPS Daily Rate and Service Guide:  
  `https://assets.ups.com/adobe/assets/urn:aaid:aem:356d938a-4f0a-4c71-b50e-bdd890f50b47/original/as/daily-rates-us-en.pdf`
- UPS Billing Center:  
  `https://www.ups.com/us/en/business-solutions/ups-billing`
- UPS Shipping Charge Corrections guidance:  
  `https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight/avoid-additional-shipping-fees`
- UPS Service Guarantee:  
  `https://www.ups.com/us/en/support/shipping-support/legal-terms-conditions/ups-service-guarantee`

The April 17 terms support the product's package-specific case design: general invoice-adjustment requests are subject to a 180-day rule absent another specified window and require shipment date, tracking number for each disputed charge, and reason. Do not generalize that 180-day period to service guarantees, loss/damage, or other categories with separate rules.

### FedEx

- 2026 FedEx Service Guide, updated July 20, 2026:  
  `https://www.fedex.com/content/dam/fedex/us-united-states/services/Service_Guide_2026.pdf`
- FedEx Service Guide home/current-version page:  
  `https://www.fedex.com/en-us/service-guide.html`
- FedEx Money-Back Guarantee:  
  `https://www.fedex.com/en-us/service-guide/money-back-guarantee.html`
- FedEx Billing Online:  
  `https://www.fedex.com/en-us/billing-online.html`
- FedEx Invoice Download File Data Dictionary:  
  `https://www.fedex.com/content/dam/fedex/us-united-states/accounts/images/US_FBO_Download_Data_Dictionary.pdf`
- FedEx CSV Invoice and Remittance Implementation Guide:  
  `https://www.fedex.com/content/dam/fedex/us-united-states/shipping/images/CSV_Format_Express-Ground_Invoice_and_Remittance_Implementation_Guide.pdf`

The FedEx artifacts strongly support the semantic distinctions already present in the ontology appendix: actual versus rated/DIM weight, multi-piece identity, original versus corrected address information, invoice adjustment requests, carrier resolution responses, denial/reject reasons, and credit/refund outcomes.

### Artifact freshness rule

The public site may link to live carrier pages for educational provenance. The future backend must capture the exact artifact/version/hash/effective interval it used for a real case.

Known artifacts that still require acquisition/verification before production normalization include:

- current exact UPS Billing Data Dictionary/header/charge-code resources;
- current FedEx EDI Codes Dictionary;
- account-specific UPS/FedEx agreements, incentives, rate schedules, waivers, amendments, and authorization.

These are backend/operations gates, not reasons to block a truthful landing-page build.

---

## Visual Asset Strategy

Useful visuals are part of the product explanation, not decoration.

### Source repository

Editable diagram source belongs in:

`zettel-ai/website_diagram`

The website repo receives only the final web-ready SVG artifacts plus a provenance mapping document.

### Existing Zettel diagram language to reuse

The current diagram repository already establishes:

- D2 with ELK layout;
- white/transparent canvas;
- Zettel green (`#198038` in existing diagrams);
- information blue (`#0F62FE` in existing diagrams);
- neutral gray text/borders;
- rounded, lightly shadowed cards;
- small semantic icons from the repository's `icons/` folder;
- restrained connection lines;
- clean information hierarchy rather than decorative illustration.

Parcel diagrams should look like members of the same visual family as `ingest.d2`, `analyze.d2`, and `communicate.d2`.

Do not redesign the diagram system for Parcel.

### Required diagram 1 — Case assembly

**Diagram source:** `parcel/parcel-case-assembly.d2`  
**Rendered artifact:** `parcel/parcel-case-assembly.svg`  
**Website destination:** `public/diagrams/parcel/parcel-case-assembly.svg`

**Purpose:** Explain how scattered facts become a reviewable case.

**Conceptual flow:**

```text
Invoice / billing record ─┐
Shipment / package record ├─> Zettel Case File -> Human review -> Carrier response -> Credit verified
Carrier rule in effect ───┤
Customer evidence ────────┤
Relevant history ─────────┘
```

The diagram should visually distinguish:

- source facts;
- governing rule/version;
- customer evidence;
- historical context;
- the Case File;
- human review;
- carrier response;
- verified financial outcome.

It must not imply that historical context proves a carrier error or that the agent autonomously submits disputes.

**Recommended placement:** the **Every charge gets a case file** / full-context section.

### Required diagram 2 — Similar package, different bill

**Diagram source:** `parcel/same-box-different-bill.d2`  
**Rendered artifact:** `parcel/same-box-different-bill.svg`  
**Website destination:** `public/diagrams/parcel/same-box-different-bill.svg`

**Purpose:** Explain why persistent history is useful while preserving the ontology's evidence distinction.

**Conceptual flow:**

```text
Similar package profile
  Jan 8  -> normal charge
  Jan 14 -> normal charge
  Jan 21 -> normal charge
  Jan 29 -> carrier adjustment / outlier
                         |
                         v
                  closer review
```

The visual must include a direct label equivalent to:

**Historical context — not proof**

Do not title the evidentiary object `Same box` unless exact physical identity is actually established. The surrounding marketing section may retain **Same box. Different bill.** as user-language framing; the diagram itself should use **Similar package profile**.

**Recommended placement:** the historical-context section.

### Main Case File stays native HTML/CSS

The hero's Zettel Case File is a core product demonstration and must remain a responsive semantic UI component rather than becoming a static SVG.

Reasons:

- readable at 200% zoom;
- responsive reflow on small screens;
- selectable/accessible text;
- explicit status labels independent of color;
- easier future migration to a real authenticated product surface;
- source links can eventually become interactive.

The D2 diagrams supplement the Case File; they do not replace it.

### Optional later diagrams

Do not create these in the initial implementation unless the required two diagrams leave a genuine comprehension gap:

- denial → evidence gap → next action → resolution;
- rule-version timeline;
- invoice-line → adjustment → credit reconciliation.

YAGNI: two strong explanatory diagrams plus the native Case File are enough for the first landing page.

---

## Diagram Content Rules

Every Parcel diagram must:

- explain a specific customer concept in less time than prose alone;
- use only approved public terminology from the design/ontology package;
- avoid internal class names such as `GraphMemory`, `Graphiti`, `StructuredAgentPort`, or `WorkspaceScope`;
- avoid competitor names/logos/content;
- avoid carrier logos; use neutral text labels such as `Carrier billing record` or illustrative text only;
- avoid real tracking numbers, account numbers, invoice IDs, customer data, or confidential carrier artifacts;
- avoid unsupported carrier thresholds/formulas in illustrative diagrams;
- label illustrative data as illustrative/example where relevant;
- preserve the distinction among source fact, calculation, finding, human decision, carrier response, and verified credit;
- preserve explicit uncertainty/missing evidence where shown;
- remain understandable without animation.

---

## Diagram Provenance Workflow

For every website diagram:

1. Create/edit the `.d2` source in `zettel-ai/website_diagram`.
2. Reuse existing repository classes/icons/tokens where practical.
3. Render an SVG using the diagram repo's established D2 workflow.
4. Visually inspect the SVG at desktop and narrow widths.
5. Commit both `.d2` and `.svg` to the diagram repo.
6. Copy only the final SVG into `zettel-ai/zettel-ai.github.io/public/diagrams/parcel/`.
7. Record provenance in `docs/superpowers/parcel-diagram-sources.md`:
   - website asset path;
   - diagram source repo;
   - `.d2` source path;
   - source commit SHA;
   - purpose;
   - alt text / text equivalent;
   - source factual dependencies, if any.
8. Verify the copied website SVG hash/content matches the reviewed rendered artifact.

The website repo should not become the editable D2 source of truth.

---

## Accessibility And Responsive Rules For Visuals

- Critical information must also appear in surrounding HTML text; an SVG may not be the only way to understand a claim.
- Every diagram receives meaningful alt text or, when the adjacent prose fully describes it, appropriate accessible treatment that avoids redundant screen-reader noise.
- Text inside diagrams must remain legible at the rendered mobile width.
- Do not require hover to reveal labels or sources.
- Do not encode positive/negative/unknown states using color alone.
- The page must not horizontally overflow at 320 CSS pixels.
- Diagrams must preserve aspect ratio and avoid layout shift.
- If motion is added around a diagram, `prefers-reduced-motion` must render the complete final state without transition.

---

## Public Source Presentation

Statistics and factual carrier statements should follow the drayage page's provenance pattern:

- concise claim;
- visible `Source:` label;
- outbound source link;
- `target="_blank"` + `rel="noopener noreferrer"` where implementation uses a new tab;
- no hidden footnote-only provenance for headline statistics.

The public source label should name the source organization/document, not a competitor.

---

## Revised Information Architecture

The statistics and visuals refine the existing sequence to:

1. Parcel navigation
2. Hero + native example Zettel Case File
3. Risk-reversal strip
4. **Parcel billing is a moving target at massive scale** — three sourced statistics
5. Why shippers give up — qualitative pain cards
6. **Every charge gets a case file** — full-context explanation + case-assembly diagram
7. **Same box. Different bill.** — similar-package historical-context explanation + history diagram
8. How Zettel works
9. Carrier denial / next-action explanation
10. What Zettel audits — readiness-gated
11. No black-box savings score
12. Pricing
13. Trust/data handling
14. FAQ
15. Final CTA
16. Footer/legal

Do not insert a competitor-comparison section anywhere in this sequence.

---

## Landing-Page Research Closure Gate

Research is considered sufficient to implement the landing page when all of the following are true:

- the public competitor exclusion is enforced;
- each public statistic has a non-competitor source;
- primary carrier source families and current known exact artifacts are documented;
- carrier-specific promises remain behind operational readiness gates;
- the ontology remains explicitly candidate/expert-gated;
- customer-specific contract gaps are acknowledged rather than guessed;
- the two required diagram concepts and source workflow are defined;
- the Case File remains native accessible UI;
- public copy does not inherit competitor error-rate/savings claims.

This gate is now satisfied for **landing-page implementation**.

It is not a declaration that the Parcel backend, operating procedures, carrier actions, or ontology are production-authoritative.

---

## Final Principle

**Use competitors to learn the category. Use authoritative sources to state facts. Use real Zettel operating evidence to make promises. Use diagrams only when they make the evidence easier to understand.**