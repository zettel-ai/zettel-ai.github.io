# Zettel Parcel Audit Landing Page Design

Date: 2026-08-30  
Project: Zettel website / managed parcel audit product  
Status: Approved design direction; implementation not started

## Goal

Create a dedicated landing page for a managed UPS/FedEx refund and billing-audit service while preserving the existing Zettel visual language and conversion quality.

The page's single job is to get qualified small and midsized parcel shippers to start a free audit. A visitor should understand within seconds that:

1. Zettel audits UPS and FedEx shipping bills.
2. Zettel identifies refund-eligible service failures and questionable charges.
3. Zettel handles or coordinates recovery and verifies posted credits.
4. The customer pays no setup or monthly platform fee for the managed MVP.
5. Zettel charges 25% of verified credits recovered.
6. A prospect can begin with an invoice instead of immediately sharing carrier credentials.

The product should feel like a competent financial-recovery operator, not an AI demo, logistics dashboard, or generic shipping-optimization platform.

## Approved Direction

Use the existing Zettel landing page as the structural and visual template, but adapt the narrative to parcel recovery rather than swapping drayage nouns for parcel nouns.

Preserve:

- Zettel green/neutral palette;
- Public Sans typography;
- fixed navigation;
- restrained cards, borders, shadows, and spacing;
- source-backed factual claims;
- existing fast CTA/popup interaction patterns;
- responsive and accessibility quality already established in the site.

Change:

- the product story from container operations to recovered shipping spend;
- the primary CTA to **Start a free audit**;
- the secondary CTA to **See what we check**;
- early-access/pilot language to an immediately purchasable managed-service offer;
- the hero product visual to a parcel-specific **Recovery Ledger**.

Do not lead with AI, context graphs, autonomous agents, or estimated savings.

## Product And Audience

### Product name

**Zettel Parcel**

Descriptor: **Managed UPS & FedEx Refund + Billing Audit**

### Initial ideal customer

The MVP targets U.S. small and midsized businesses that:

- ship primarily through UPS and/or FedEx;
- have their own carrier account or usable carrier billing exports;
- ship enough volume that line-by-line manual invoice review is impractical;
- do not have a dedicated parcel-audit team;
- can make a vendor decision without enterprise procurement;
- are not already locked into a competing parcel-audit service.

Likely early segments include ecommerce brands, specialty retail, toy and hobby stores, parts distributors, subscription businesses, light manufacturing, and businesses shipping dimensionally variable products.

Do not publish a hard shipment-volume minimum until customer discovery establishes one.

## Offer And Pricing

Public MVP offer:

- Free initial audit.
- $0 setup fee.
- $0 monthly platform fee.
- Zettel receives 25% of verified carrier credits recovered.
- If Zettel recovers $0, the customer owes $0.
- Carrier credits go to the customer's carrier account; Zettel does not hold recovered funds.
- Zettel invoices its contingency fee after the credit is verified.

Pricing should be explained with one concrete example rather than SaaS tiers:

```text
Carrier credits your account     $1,000
Zettel fee                          $250
You keep                            $750
```

Do not publish estimated savings percentages or a savings calculator in the MVP.

## Positioning And Hero

### Eyebrow

**Managed UPS & FedEx parcel audit**

### Headline

**We find the shipping charges you shouldn't have paid.**

### Supporting copy

Zettel reviews UPS and FedEx bills for refund-eligible service failures and questionable charges, handles the recovery work, and verifies the credit reaches your account.

### Risk reversal

**No upfront fee. We only get paid when you recover money.**

### Actions

Primary: **Start a free audit**  
Secondary: **See what we check**

The primary CTA opens the same audit-intake flow everywhere it appears. The secondary CTA scrolls to the audit-category section.

## Brand And Domain Architecture

Use the current production domain as the Zettel parent brand and move product-specific experiences to subdomains.

### Apex

The apex becomes a lightweight Zettel product-family page after the product pages are ready. It should route visitors to product-specific surfaces rather than remain synonymous with drayage.

### Drayage

Move the current drayage landing experience to the `drayage` subdomain of the production domain.

Keep the existing **Zettel Ops** product name, visual identity, and drayage content during this migration. Renaming or redesigning the drayage product is out of scope.

### Parcel

Host the new landing page at the `parcel` subdomain of the production domain and brand it **Zettel Parcel**.

`parcel` is intentionally broader than `refunds`, `audit`, or `recover`, leaving room for later parcel cost-assurance features.

### Sequencing

1. Build the parcel landing page using established site patterns.
2. Move the current Zettel Ops/drayage surface to the `drayage` subdomain.
3. Replace the apex with a lightweight parent/product selector.
4. Extract more shared multi-site infrastructure only if maintaining both surfaces proves painful.

The repository currently builds as a static Next.js export, so implementation should prefer simple deployable surfaces over premature platform work.

## Information Architecture

The parcel landing page uses this narrative order:

1. Navigation
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

Navigation destinations:

- How it works
- What we audit
- Pricing
- FAQ
- **Start free audit**

Do not use **Request a Pilot**, **Book a Demo**, or **Join Early Access** on the parcel page.

## Signature Visual: Recovery Ledger

The parcel page's memorable visual should be a realistic, legible audit trail inspired by carrier billing data rather than a generic SaaS dashboard.

Illustrative content:

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

All figures in mockups are illustrative UI content and must be explicitly presented as examples, never as customer results or Zettel performance claims.

The design thesis is: **make ugly carrier billing data beautiful**. Use parcel-native artifacts such as tracking IDs, invoice rows, measurements, evidence labels, statuses, timestamps, and dollar credits instead of glowing AI graphics or generic analytics charts.

## How It Works

Adapt the current three-step Zettel sequence to the money-recovery workflow.

### 1. Send

**Send us a recent UPS or FedEx invoice.**

The initial assessment requests the least privileged data required and should not require a carrier password when an invoice/export is sufficient.

### 2. Audit

**We identify eligible refunds and questionable charges.**

Zettel connects invoice charges to shipment facts and the applicable carrier rule/evidence.

### 3. Recover

**We pursue the credit and verify it actually posts.**

The success state is a verified carrier credit, not estimated savings.

## Problem Section

Retain the current site's sourced-problem-card pattern. Use conservative carrier-supported language; do not accuse carriers of deliberate wrongdoing.

Recommended cards:

### Refunds exist. Someone still has to find them.

Use official carrier documentation showing refund and billing-dispute processes.

### Corrections hide inside ordinary shipping charges.

Use carrier documentation covering dimensional weight, incorrect weight, residential classification, Additional Handling, package-size rules, or other supported correction categories.

### Disputes require shipment-level detail.

Use official carrier billing/dispute documentation showing the information and dispute reasons required.

The framing is **complex billing that deserves review**, not "the carriers are stealing from you."

## Recovery Proof Section

Replace the current drayage solution-screenshot role with a parcel-specific proof artifact, preferably a weekly recovery email/report.

Illustrative example:

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

The values are examples only. The intended impression is: **I do not need another logistics dashboard; Zettel follows issues and tells me when money actually comes back.**

## What We Audit

Reuse the current six-card feature-grid pattern, but make cards audit categories rather than generic software features.

Candidate launch categories:

1. **Late-delivery refunds** — only for services covered by the applicable carrier guarantee.
2. **DIM and weight corrections** — where carrier-billed measurements differ from shipment records or evidence.
3. **Duplicate charges** — duplicated shipment or service billing.
4. **Residential/commercial classification** — address-classification-related charges.
5. **Additional Handling / Large Package charges** — validate against applicable carrier criteria.
6. **Rate or discount discrepancies** — apparent differences between billed pricing and agreed rates/discounts.

A category must not go live until Zettel has a tested operational process for auditing and recovering that category reliably.

## Trust And Data Handling

Parcel auditing requires prospects to share financial/carrier data, so trust needs a first-class section.

Primary message: **Start with an invoice, not your password.**

Requirements:

- request the least privileged information needed for the initial audit;
- explain that carrier credits go directly to the customer's carrier account;
- invoice Zettel's fee only after recovery is verified;
- expose the evidence supporting each recovery when available;
- link a clear privacy policy adjacent to any invoice-upload flow;
- include an appropriate footer statement that Zettel is not affiliated with UPS or FedEx;
- make no encryption, retention, compliance, certification, or security promises unless the implementation can prove them.

Any public statement about data ownership, retention, deletion, or security must be aligned with an approved privacy policy before launch.

## Audit Intake Flow

Reuse the site's low-latency popup/modal interaction pattern for **Start a free audit**.

Initial fields:

- Name
- Work email
- Company
- Carrier: UPS / FedEx / both
- Approximate shipments per month
- Optional invoice upload, if secure upload is implemented for launch

If secure invoice upload is not part of the first release, omit the field entirely and explain the follow-up process after submission. Do not render a nonfunctional upload affordance.

## Visual System

Preserve the current Zettel visual system:

- Primary green: `#006527`
- Recovery/light green: `#96F8A1`
- Warm background: `#FBF9F8`
- White surface: `#FFFFFF`
- Dark ink: `#1B1C1C`
- Information blue: `#004CCD`
- Public Sans for display, body, navigation, and controls

Add one parcel-specific utility role: a restrained monospace for tracking numbers, invoice rows, amounts, measurements, timestamps, and evidence metadata. Prefer IBM Plex Mono if it can be added without unnecessary loading complexity; otherwise use an existing/system monospace stack.

Semantic color use:

- green = recovered/accepted/positive outcome;
- blue = neutral carrier or shipment information;
- red = disputed/problematic charge;
- neutral ink = ordinary financial data.

Color must never be the only indicator of state.

## Layout Concept

```text
+---------------------------------------------------------+
| ZETTEL PARCEL              How it works     Pricing     |
|                            What we audit     [Free audit]|
+---------------------------------------------------------+
| Managed UPS & FedEx parcel audit                       |
|                                                         |
| WE FIND THE SHIPPING CHARGES     +------------------+  |
| YOU SHOULDN'T HAVE PAID.         | RECOVERY LEDGER  |  |
| Supporting explanation           | charge/evidence  |  |
| [ Start a free audit ]           | dispute/credit   |  |
| See what we check                +------------------+  |
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
+---------------------------------------------------------+
| WHAT WE AUDIT                                           |
| [late] [DIM] [duplicates] [residential] [handling] ... |
+---------------------------------------------------------+
| SIMPLE PRICING: 25% OF VERIFIED CREDITS                |
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

Keep motion restrained. One orchestrated effect is enough: the Recovery Ledger may reveal its stages in sequence once, provided content remains available without animation and `prefers-reduced-motion` is honored.

Preserve existing production behavior:

- responsive layout;
- visible keyboard focus;
- semantic links/buttons;
- stable CTA geometry;
- layout-stable media;
- reduced-motion support;
- mobile navigation parity;
- readable source links.

## FAQ Topics

The launch FAQ should cover:

- What kinds of UPS/FedEx charges do you review?
- How much does Zettel cost?
- What do I need to send you?
- Do I need to give you my carrier password?
- How do credits reach me?
- What happens if you find nothing?
- How far back can you audit?
- Are you affiliated with UPS or FedEx?
- What data do you keep?

The lookback-period answer must be derived from current carrier terms and supported audit categories at implementation time rather than hard-coded in this design.

## Evidence And Source Policy

Preserve the existing site's source-backed style.

Evidence hierarchy:

1. Official UPS/FedEx billing, guarantee, surcharge, and dispute documentation.
2. Published carrier terms/rate guides.
3. Authoritative platform documentation when a third party is involved.
4. Competitor sites only for market/pricing-model evidence, not carrier-rule claims.

Sources identified during brainstorming:

- UPS Billing: https://www.ups.com/us/en/business-solutions/ups-billing
- UPS dimensions/weight guidance: https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight/avoid-additional-shipping-fees
- UPS Service Guarantee: https://www.ups.com/us/en/support/shipping-support/legal-terms-conditions/ups-service-guarantee
- FedEx Billing Online guide: https://www.fedex.com/content/dam/fedex-com/billing/help/FedEx_Billing_Online_User_Guide_en_us.pdf
- 71lbs market/pricing context: https://portal.71lbs.com/terms
- LateShipment pricing context: https://www.lateshipment.com/lspricing/

Every live quantitative or rules-based claim must be re-verified against current official sources during implementation. Do not copy competitor savings percentages into Zettel marketing copy without independent evidence.

## SEO And Migration

The existing site is associated with drayage/import-document operations. Before changing production routing, inventory:

- indexable routes;
- canonical URLs;
- sitemap entries;
- internal links;
- high-value blog URLs;
- required permanent redirects from moved drayage URLs to the new host.

Use permanent redirects for content that moves and update canonicals/sitemaps accordingly.

Do not reorganize every blog URL merely because the landing page moves. Blog ownership between apex and product subdomains is a separate content/SEO decision.

Initial parcel topics may include parcel audit, UPS invoice audit, FedEx invoice audit, shipping refunds, dimensional-weight adjustments, carrier billing errors, and shipping-charge corrections. Programmatic SEO pages are out of scope.

## Analytics

Track the funnel required to validate the page:

- free-audit CTA click;
- **See what we check** click;
- intake form open;
- intake form submit;
- invoice-upload start/success/failure if upload is included;
- CTA source/section.

Do not put invoice contents or other sensitive financial data into analytics events.

Primary success metric: qualified free-audit submissions.

## Technical Direction

The repository uses Next.js App Router and static export. The parcel page should reuse the current stack and established generic patterns where possible without forcing drayage-specific semantics into shared components.

Prefer:

- durable brand-token reuse;
- reuse/extension of generic CTA and navigation behavior;
- parcel-specific components for Recovery Ledger and proof content;
- reviewable content structures for carrier claims/source links;
- static-first rendering;
- minimal new dependencies.

Do not build a generalized multi-site platform until parcel + drayage maintenance demonstrates the need.

## Accessibility And Responsive Requirements

Target WCAG 2.2 AA.

At minimum:

- use native semantic interactive controls;
- preserve visible keyboard focus;
- do not rely on color alone for financial states;
- make decorative document visuals hidden from assistive technology or give meaningful alternatives;
- keep the Recovery Ledger readable at narrow widths without horizontal page scrolling;
- respect reduced-motion preferences;
- keep source links keyboard accessible and readable;
- associate form errors with fields and preserve entered values;
- provide the same destinations and primary action in mobile and desktop navigation.

## Verification Plan

Before implementation is considered complete:

- run the repository's lint/format checks;
- run type checking if configured;
- run `npm run build` and verify static export succeeds;
- inspect desktop and narrow/mobile layouts;
- verify keyboard navigation, visible focus, and reduced motion;
- verify illustrative recovery values cannot be mistaken for real customer results;
- re-check factual carrier claims and outbound source links against current official sources;
- verify pricing copy is consistent everywhere;
- verify every **Start a free audit** CTA reaches one intake workflow;
- verify secondary CTA anchors;
- verify no unsupported security/compliance claims;
- verify there are no fake customer logos, testimonials, or recovery statistics;
- before the drayage migration goes live, verify redirects, canonicals, sitemap behavior, and previous high-value URLs.

## MVP Scope

### In scope

- Parcel navigation.
- Hero and Recovery Ledger.
- Three-step workflow.
- Sourced problem section.
- Recovery-proof artifact.
- Up to six operationally supported audit-category cards.
- Pricing.
- Trust/data section.
- FAQ.
- Final CTA.
- Free-audit intake flow.
- Responsive/accessibility behavior.
- Funnel analytics.
- Appropriate legal/footer disclaimer.
- Deployment/routing work needed for `parcel` and `drayage` subdomains and staged apex migration.

### Out of scope

- Customer dashboard or login.
- Automated savings calculator.
- Public API.
- Interactive AI demo/chatbot.
- Full carrier-account OAuth unless independently required by the service workflow.
- Enterprise pricing tiers.
- Fake logos, testimonials, or recovery statistics.
- Broad resource center.
- Programmatic SEO pages.
- Redesigning/renaming Zettel Ops beyond relocating it.
- Generalized multi-site CMS/platform work before it is needed.

## Service/Product Boundary

The public page describes the outcome, not whether each internal step is manual or automated.

The initial managed service may combine manual and semi-automated work:

1. receive billing/shipment data;
2. normalize it;
3. identify audit candidates;
4. verify carrier rules and evidence;
5. prepare/file/coordinate disputes;
6. track carrier decisions;
7. verify credits;
8. invoice the contingency fee.

Future automation can replace internal steps without changing the core promise.

## Final Design Principle

**Show money moving through evidence.**

The canonical page story is:

```text
invoice -> shipment facts -> carrier rule -> evidence -> dispute -> decision -> verified credit
```

This sequence is both the customer's value proposition and the clearest customer-facing expression of Zettel's evidence/provenance advantage.

## Final Decision Summary

- Product: **Zettel Parcel**.
- Category: managed UPS & FedEx refund + billing audit.
- Product host: `parcel` subdomain of the current production domain.
- Existing drayage host: `drayage` subdomain, retaining the **Zettel Ops** name and design.
- Apex: staged transition to a lightweight Zettel parent surface.
- Headline: **We find the shipping charges you shouldn't have paid.**
- Primary CTA: **Start a free audit**.
- Secondary CTA: **See what we check**.
- Public MVP pricing: **25% of verified credits recovered**.
- Signature visual: **Recovery Ledger**.
- Core proof chain: **invoice -> evidence -> dispute -> carrier decision -> verified credit**.
- Visual approach: preserve current Zettel identity and interaction quality; distinguish parcel through evidence/financial vocabulary rather than a brand redesign.
