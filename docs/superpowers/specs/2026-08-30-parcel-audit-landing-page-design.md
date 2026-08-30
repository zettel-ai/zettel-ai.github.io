# Zettel Parcel Audit Landing Page Design

Date: 2026-08-30
Project: Zettel website / managed parcel audit product
Status: Approved design direction; implementation not started

## Goal

Create a dedicated landing page for a managed UPS/FedEx refund and billing-audit service while preserving the existing Zettel visual language and conversion quality.

The page's single job is to get qualified small and midsized parcel shippers to start a free audit. It should make the offer understandable within seconds:

1. Zettel audits UPS and FedEx shipping bills.
2. Zettel identifies refund-eligible service failures and questionable charges.
3. Zettel handles or coordinates the recovery work and verifies posted credits.
4. The customer pays no upfront or monthly platform fee for the initial service.
5. Zettel charges 25% of verified credits recovered.
6. A prospect can start with an invoice rather than immediately sharing carrier credentials.

The product should be presented as a competent managed financial-recovery service, not as an AI demo, logistics dashboard, or generic shipping-optimization platform.

## Approved Direction

Use the existing Zettel landing page as the structural and visual template, but adapt the storytelling to the parcel-recovery problem rather than replacing freight nouns in the current copy.

The selected direction is an evolved template:

- Preserve the Zettel brand palette, Public Sans typography, restrained cards, borders, spacing, source-backed evidence, fixed navigation, and existing fast CTA interaction patterns.
- Replace the drayage-specific story with a money-recovery story.
- Introduce one distinct parcel-specific signature visual: the **Recovery Ledger**.
- Lead with the financial outcome rather than with AI or the underlying Zettel context-graph architecture.
- Make the primary CTA **Start a free audit**.
- Make the secondary CTA **See what we check**.
- Remove early-access framing from the parcel product.

## Product And Audience

### Product name

**Zettel Parcel**

Descriptor:

**Managed UPS & FedEx Refund + Billing Audit**

### Initial ideal customer profile

The MVP targets U.S. small and midsized businesses that:

- ship primarily through UPS and/or FedEx;
- have their own carrier account or usable carrier billing exports;
- ship enough volume that line-by-line manual invoice review is impractical;
- do not have a dedicated parcel-audit team;
- can make a vendor decision without enterprise procurement;
- are not already locked into a competing parcel-audit service.

Likely early segments include ecommerce brands, specialty retail, toy and hobby stores, parts distributors, subscription businesses, light manufacturing, and businesses that ship dimensionally variable products.

Shipment-volume thresholds should not be presented as hard requirements until customer discovery establishes a reliable floor.

## Offer And Pricing

The launch offer is intentionally low-friction:

- Free initial audit.
- No setup fee.
- No monthly platform fee for the managed-audit MVP.
- 25% of verified carrier credits recovered.
- If Zettel recovers $0, the customer owes $0.
- Carrier credits go to the customer's carrier account; Zettel does not hold the recovered funds.
- Zettel invoices its contingency fee after the credit is verified.

The page should explain pricing with a concrete example rather than a SaaS pricing table:

```text
Carrier credits your account     $1,000
Zettel fee                          $250
You keep                            $750
```

A founding-customer discount may be tested through direct sales, but it is not part of the canonical public landing-page offer unless explicitly approved later.

## Positioning

### Primary message

**We find the shipping charges you shouldn't have paid.**

Supporting message:

Zettel reviews UPS and FedEx bills for refund-eligible service failures and questionable charges, handles the recovery work, and verifies that the credit reaches the customer's account.

Risk reversal:

**No upfront fee. We only get paid when you recover money.**

### What the page should not lead with

Do not make the hero about:

- AI-powered logistics intelligence;
- context graphs or knowledge graphs;
- autonomous agents;
- generic parcel optimization;
- enterprise transformation;
- estimated or theoretical savings.

The underlying Zettel architecture may support the service, but the landing page should translate that capability into a customer-facing promise: every challenge has an evidence trail, and every claimed recovery is tracked to an actual credit.

## Brand And Domain Architecture

The Zettel brand should support multiple product-specific surfaces.

### Apex site

The current production apex domain becomes the lightweight parent Zettel surface rather than remaining synonymous with drayage. Its eventual purpose is to explain the Zettel product family and route visitors to product-specific sites.

### Drayage product

Move the existing drayage-focused landing experience to the `drayage` subdomain of the current production domain.

Product naming may remain **Zettel Ops** or become **Zettel Drayage** during the later migration, but the existing drayage experience should retain its present visual identity and content unless separately redesigned.

### Parcel product

Host the new parcel-audit landing page on the `parcel` subdomain of the current production domain.

Use **Zettel Parcel** in navigation and product copy.

The `parcel` label is preferred over `refunds`, `audit`, or `recover` because it leaves room for future parcel invoice auditing, contract compliance, surcharge analysis, claims, carrier performance, and spend-assurance features.

### Implementation sequencing

This design does not require a new multi-product platform before launch.

Recommended sequence:

1. Build the parcel landing page using the existing site's patterns.
2. Move the existing drayage surface to the `drayage` subdomain.
3. Replace the apex with a lightweight parent-product selector.
4. Extract additional shared infrastructure only if maintaining the product surfaces becomes materially painful.

The current app is a static Next.js export, so the implementation should favor simple deployable surfaces over premature platform work.

## Information Architecture

The parcel landing page should use this narrative order:

1. Top navigation
2. Hero + Recovery Ledger
3. How it works
4. Why recoveries get missed
5. Recovery proof / evidence trail
6. What Zettel audits
7. Pricing
8. Trust and data handling
9. FAQ
10. Final free-audit CTA
11. Footer / legal language

This intentionally differs from the current Hero -> Steps -> Problem -> Solution -> Feature Grid -> CTA structure only where the parcel sales story benefits from a pricing and trust section.

## Navigation

Desktop and mobile navigation should use:

- Zettel Parcel logo/wordmark treatment
- How it works
- What we audit
- Pricing
- FAQ
- **Start free audit** primary CTA

Do not use **Request a Pilot**, **Book a Demo**, or **Join Early Access** on the parcel page.

Anchor labels and CTA labels must remain consistent everywhere on the page.

## Hero

### Eyebrow

**Managed UPS & FedEx parcel audit**

### Headline

**We find the shipping charges you shouldn't have paid.**

### Supporting copy

Zettel reviews UPS and FedEx bills for refund-eligible service failures and questionable charges, handles the recovery work, and verifies the credit reaches your account.

### Risk-reversal line

**No upfront fee. We only get paid when you recover money.**

### Actions

Primary: **Start a free audit**

Secondary: **See what we check**

The primary CTA opens the audit-intake flow. The secondary CTA scrolls to the audit-category section rather than opening another sales modal.

## Signature Visual: Recovery Ledger

The parcel page's distinctive visual element is a realistic, highly legible audit trail built from the visual language of carrier billing data.

Example content:

```text
UPS TRACKING 1Z84...

Original charge                         $84.72

DIM correction                         +$28.50
Additional handling                    +$19.25
                                      --------
Amount reviewed                         $47.75

Evidence
12 x 10 x 6 in
8.4 lb
Original shipment record                  ✓

Dispute submitted                       Aug 18
Carrier credit                         -$47.75
                                      --------
RECOVERED                               $47.75
```

The exact figures are illustrative UI content and must not be presented as a customer result or testimonial.

The visual concept is: **make ugly carrier billing data beautiful**. The page should use real parcel vocabulary, tracking IDs, invoice rows, evidence labels, statuses, timestamps, and dollar credits rather than generic SaaS charts or abstract AI graphics.

## How It Works

Adapt the current three-step Zettel sequence to the actual money-recovery workflow.

### 1. Send

**Send us a recent UPS or FedEx invoice.**

For the initial assessment, do not require a carrier password if an invoice/export is sufficient.

### 2. Audit

**We identify eligible refunds and questionable charges.**

Zettel connects invoice charges to the relevant shipment facts and applicable carrier rules or evidence.

### 3. Recover

**We pursue the credit and verify it actually posts.**

The final success state is a verified carrier credit, not an estimated saving.

## Problem Section

Retain the existing Zettel pattern of sourced problem cards. The parcel version should use conservative, carrier-supported language and avoid accusing UPS or FedEx of deliberate wrongdoing.

Recommended cards:

### Refunds exist. Someone still has to find them.

UPS provides processes for eligible Guaranteed Service Refunds and billing disputes.

### Corrections hide inside ordinary shipping charges.

Carrier documentation describes corrections and surcharges related to dimensional weight, incorrect weight, residential classification, Additional Handling, and package-size rules.

### Disputes require shipment-level detail.

FedEx Billing Online supports shipment disputes across reasons such as dimensions, weight, service type, surcharges, and rate/discount issues.

Copy should frame the problem as **complex billing that deserves review**, not as carriers "stealing" from shippers.

## Recovery Proof Section

Replace the current drayage solution-screenshot role with a parcel-specific proof artifact.

Preferred concept: a realistic weekly recovery email or report that makes the managed-service experience obvious.

Example:

```text
Subject: Zettel recovered $428.17 this week

4 carrier credits posted

UPS Ground
Incorrect dimensional adjustment
Recovered: $86.42

FedEx Ground
Duplicate charge
Recovered: $142.18

UPS 2nd Day Air
Eligible service failure
Recovered: $116.37

UPS Ground
Residential correction
Recovered: $83.20

Total recovered this week: $428.17

View evidence and carrier responses ->
```

These values are illustrative only. Do not imply that they represent historical Zettel performance.

The intended customer impression is: **I do not need another logistics dashboard; the service finds issues, follows them, and tells me when money comes back.**

## What We Audit

Reuse the current six-card feature-grid pattern, but make each card a real audit category rather than a generic software feature.

Candidate launch categories:

1. **Late-delivery refunds** — for services covered by the applicable carrier guarantee.
2. **DIM and weight corrections** — where carrier-billed measurements differ from shipment records or available evidence.
3. **Duplicate charges** — duplicated shipment or service billing.
4. **Residential/commercial classification** — address-classification-related charges.
5. **Additional Handling / Large Package charges** — validate charges against the applicable carrier criteria.
6. **Rate or discount discrepancies** — apparent differences between billed pricing and the customer's agreed rates/discounts.

A category must not appear on the live site until the operational recovery process for that category has been tested and can be delivered reliably.

## Pricing Section

Use one prominent percentage rather than tiers:

**25% of verified credits**

Supporting points:

- $0 setup
- $0 monthly platform fee
- $0 recovered = $0 fee

Include the $1,000 / $250 / $750 example to remove ambiguity.

Do not use fake ROI calculators, estimated savings percentages, or unsupported "average savings" claims in the MVP.

## Trust And Data Handling

Parcel auditing asks a prospect to share financial and carrier information, so trust deserves its own section.

Primary message:

**Start with an invoice, not your password.**

For the initial audit, request the least privileged data necessary. More privileged carrier access may be introduced only when required for ongoing recovery.

Required trust statements, subject to implementation truth:

- Carrier credits go directly to the customer's carrier account.
- Zettel invoices only after recovery is verified.
- The customer can see the evidence behind each challenge.
- The customer owns its invoice and shipment data.
- Do not make security, encryption, retention, compliance, or certification claims that the implementation cannot prove.
- Place a clear privacy-policy link adjacent to any invoice-upload flow.
- Include an appropriate footer disclaimer that Zettel is not affiliated with UPS or FedEx.

## Audit Intake Flow

The existing low-latency popup/modal interaction pattern can be reused for the free-audit CTA.

The first step should be deliberately short:

- Name
- Work email
- Company
- Carrier: UPS / FedEx / both
- Approximate shipments per month
- Optional invoice upload

Do not begin with a long enterprise qualification form.

If invoice upload is not implemented in the first release, the form must clearly tell the prospect what happens next rather than presenting a dead upload affordance.

## Visual System

### Existing brand values to preserve

The current site already defines a recognizable Zettel system around:

- Primary green: `#006527`
- Recovery/light green: `#96F8A1`
- Warm background: `#FBF9F8`
- White surface: `#FFFFFF`
- Dark ink: `#1B1C1C`
- Information blue: `#004CCD`
- Public Sans for primary typography

Do not redesign the Zettel brand for this page.

### Parcel-specific extension

Add a restrained monospace utility role for:

- tracking numbers;
- invoice rows;
- dollar amounts;
- measurements;
- timestamps;
- status/evidence metadata.

IBM Plex Mono or a similar restrained open-source monospace is the preferred direction, subject to implementation review and loading cost.

Public Sans remains the display, body, navigation, and control face.

### Semantic color use

- Green: recovered, accepted, positive financial outcome.
- Blue: neutral carrier/shipment information.
- Red: disputed or problematic charge.
- Ink/neutral: ordinary financial and explanatory data.

Do not turn the site into a red/green trading dashboard. Financial states must remain understandable without color alone.

## Layout Concept

```text
+---------------------------------------------------------+
| ZETTEL PARCEL                 How it works   Pricing    |
|                               What we audit  [Free audit]|
+---------------------------------------------------------+
| Managed UPS & FedEx parcel audit                       |
|                                                         |
| WE FIND THE SHIPPING CHARGES     +------------------+  |
| YOU SHOULDN'T HAVE PAID.         | RECOVERY LEDGER  |  |
|                                  | charge / dispute |  |
| Supporting explanation           | evidence / credit|  |
| [ Start a free audit ]           +------------------+  |
| See what we check                                      |
| No upfront fee - pay only on recovery                  |
+---------------------------------------------------------+
| HOW IT WORKS                                            |
| SEND  ------------>  AUDIT  ------------>  RECOVER     |
+---------------------------------------------------------+
| WHY MONEY GETS MISSED                                   |
| [refunds]       [corrections]       [manual disputes]   |
+---------------------------------------------------------+
| EVERY RECOVERY HAS A PAPER TRAIL                        |
| invoice -> shipment -> rule -> dispute -> decision -> $ |
|               sample recovery report                   |
+---------------------------------------------------------+
| WHAT WE AUDIT                                           |
| [late] [DIM] [duplicates] [residential] [handling] ... |
+---------------------------------------------------------+
| SIMPLE PRICING                                          |
|                 25% OF VERIFIED CREDITS                |
+---------------------------------------------------------+
| START WITH AN INVOICE, NOT YOUR PASSWORD                |
+---------------------------------------------------------+
| FAQ                                                     |
+---------------------------------------------------------+
| THINK YOUR SHIPPING BILL DESERVES A SECOND LOOK?        |
|                  [ Start free audit ]                   |
+---------------------------------------------------------+
```

## Motion And Interaction

The page should remain restrained.

One orchestrated motion moment is enough: the Recovery Ledger may reveal its stages in order on initial viewport entry or first load, provided reduced-motion preferences are respected and the content remains fully available without animation.

Do not scatter scroll animations throughout the page.

Preserve existing production-quality behavior from the current site:

- responsive layout;
- visible keyboard focus;
- semantic buttons and links;
- stable CTA dimensions while interactive/busy;
- no layout-shifting media;
- reduced-motion support;
- mobile navigation parity;
- strong source-link contrast.

## FAQ Topics

The initial FAQ should answer the questions most likely to block a free audit:

- What kinds of UPS/FedEx charges do you review?
- How much does Zettel cost?
- What do I need to send you?
- Do I need to give you my carrier password?
- How do refunds/credits reach me?
- What happens if you find nothing?
- How far back can you audit?
- Are you affiliated with UPS or FedEx?
- What data do you keep?

The exact answer to "how far back" must follow current carrier terms and the categories actually supported at launch; do not hard-code an unsupported lookback period.

## Evidence And Source Policy

The existing Zettel site uses source-backed claims, and the parcel page should preserve that standard.

Preferred evidence hierarchy:

1. UPS/FedEx official billing, service-guarantee, surcharge, and dispute documentation.
2. Published carrier terms/rate guides.
3. Authoritative platform documentation when a workflow involves a third party.
4. Competitor sites only for demonstrating that a business/pricing model exists, not for factual carrier rules.

Useful design-evidence sources identified during brainstorming:

- UPS Billing: https://www.ups.com/us/en/business-solutions/ups-billing
- UPS shipping dimensions/weight and correction guidance: https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight/avoid-additional-shipping-fees
- UPS Service Guarantee: https://www.ups.com/us/en/support/shipping-support/legal-terms-conditions/ups-service-guarantee
- FedEx Billing Online user guide: https://www.fedex.com/content/dam/fedex-com/billing/help/FedEx_Billing_Online_User_Guide_en_us.pdf
- 71lbs service/pricing context: https://portal.71lbs.com/terms
- LateShipment pricing context: https://www.lateshipment.com/lspricing/

Every live quantitative or rules-based claim must be verified against the current carrier source during implementation. Do not copy competitor savings percentages or claims into Zettel marketing copy without independent support.

## SEO And Migration

The existing public site is strongly associated with drayage/import-document operations. Moving that material to a subdomain must preserve search equity as much as practical.

Implementation should include a migration inventory before changing production routing:

- current indexable routes;
- current canonical URLs;
- sitemap entries;
- inbound internal links;
- high-value blog URLs;
- redirect map from moved drayage URLs to the new drayage host.

Use permanent redirects for content that truly moves. Update canonicals and sitemaps accordingly.

Do not simultaneously reorganize every blog URL simply because the product landing page is moving. Blog ownership between apex and product subdomains should be decided separately based on content topic and search value.

Parcel SEO can begin around topics such as:

- parcel audit;
- UPS invoice audit;
- FedEx invoice audit;
- shipping refunds;
- dimensional weight adjustments;
- carrier billing errors;
- shipping charge corrections;
- UPS refund audit;
- FedEx refund audit.

Do not create SEO-scaled comparison or programmatic pages in the MVP.

## Analytics

Track only the funnel needed to validate the landing page:

- free-audit CTA click;
- secondary "See what we check" click;
- intake form open;
- intake form submit;
- optional invoice-upload start/success/failure if upload exists;
- CTA source/section for conversion attribution.

Do not collect carrier invoice contents or other sensitive financial data in analytics events.

Primary landing-page success metric: qualified free-audit submissions.

Secondary metrics: CTA-to-form-open conversion, form completion, and percentage of submitted prospects that provide usable billing data.

## Technical Direction

The current repository uses Next.js App Router and a static export. The parcel landing page should initially reuse the same stack and established components/patterns where doing so does not force drayage-specific semantics into shared code.

Implementation should prefer:

- reuse of durable brand tokens and generic CTA/navigation primitives;
- parcel-specific components for the Recovery Ledger and recovery-proof content;
- content structures that keep carrier claims/source URLs reviewable;
- static-first rendering;
- minimal new dependencies.

Do not build a shared multi-site abstraction unless the parcel + drayage implementation proves that duplicated maintenance is becoming a real problem.

## Accessibility And Responsive Requirements

Target WCAG 2.2 AA.

At minimum:

- all interactive elements use native semantic controls;
- visible keyboard focus is preserved;
- color is not the sole indicator of charge/recovery state;
- all decorative carrier-document visuals are either hidden from assistive technology or have concise meaningful alternatives;
- the Recovery Ledger remains readable at narrow widths without horizontal page scrolling;
- motion respects `prefers-reduced-motion`;
- source links remain readable and keyboard accessible;
- form errors are associated with their fields and preserve entered values;
- mobile navigation exposes the same destinations and primary action as desktop.

## Verification Plan

Before implementation is considered complete:

- Run the repository formatter/lint command(s).
- Run type checking if configured.
- Run `npm run build` and verify static export succeeds.
- Inspect the parcel page at desktop and narrow/mobile widths.
- Verify keyboard navigation, visible focus, and reduced-motion behavior.
- Verify the Recovery Ledger does not imply a real customer result.
- Verify all factual carrier claims and outbound source links against current official sources.
- Verify pricing copy is consistent everywhere: 25% of verified credits, no setup/monthly fee for the managed MVP, no recovery = no fee.
- Verify every **Start a free audit** CTA reaches the same intake workflow.
- Verify secondary CTA anchors land correctly.
- Verify no unsupported security/compliance claims exist.
- Verify no fake customer logos, testimonials, or recovery statistics exist.
- Before the drayage migration goes live, verify redirects, canonical URLs, sitemap behavior, and the previous high-value routes.

## MVP Scope

### In scope

- Parcel product navigation.
- Hero and Recovery Ledger.
- Three-step workflow section.
- Sourced problem section.
- Recovery-proof artifact.
- Six audit-category cards, limited to operationally supported categories.
- Pricing section.
- Trust/data section.
- FAQ.
- Final CTA.
- Free-audit intake flow.
- Responsive and accessible behavior.
- Conversion analytics.
- Required legal/footer disclaimer.
- Deployment/routing work necessary to expose parcel and drayage on their respective subdomains.

### Out of scope

- Customer dashboard.
- Authentication/login.
- Automated savings calculator.
- Public API.
- Interactive AI demo/chatbot.
- Full carrier-account OAuth/integration unless independently required by the service workflow.
- Enterprise pricing tiers.
- Fake customer logos, fake testimonials, or fake recovery statistics.
- Broad resources center.
- Programmatic SEO pages.
- Redesigning the existing drayage product beyond what is required to relocate it.
- Building a generalized multi-site CMS/platform before it is needed.

## Service/Product Boundary

The public page should describe the outcome Zettel can deliver, not whether each step is manual or automated internally.

The initial managed service may combine manual and semi-automated work:

1. receive billing/shipment data;
2. normalize it;
3. identify audit candidates;
4. verify applicable carrier rules and evidence;
5. prepare/file/coordinate disputes;
6. track carrier decisions;
7. verify credits;
8. invoice the contingency fee.

Future automation can progressively replace internal steps without changing the core customer promise.

## Design Principle

**Show money moving through evidence.**

The canonical story of the page is:

```text
invoice -> shipment facts -> carrier rule -> evidence -> dispute -> decision -> verified credit
```

This sequence is both the value proposition and the clearest customer-facing expression of Zettel's evidence/provenance advantage.

## Final Decision Summary

- Product: **Zettel Parcel**.
- Category: managed UPS & FedEx refund + billing audit.
- Product host: `parcel` subdomain of the current production domain.
- Existing drayage experience: move to `drayage` subdomain.
- Apex: become a lightweight Zettel parent surface in the staged migration.
- Primary headline: **We find the shipping charges you shouldn't have paid.**
- Primary CTA: **Start a free audit**.
- Secondary CTA: **See what we check**.
- Public MVP pricing: **25% of verified credits recovered**.
- Signature visual: **Recovery Ledger**.
- Core proof chain: **invoice -> evidence -> dispute -> carrier decision -> verified credit**.
- Visual approach: preserve current Zettel identity and production interaction quality; add parcel-specific evidence/financial vocabulary rather than redesigning the brand.
