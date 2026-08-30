# Zettel Parcel Audit Landing Page Design

Date: 2026-08-30  
Project: Zettel website / managed parcel audit product  
Status: Revised design direction; implementation not started

## Goal

Create a dedicated landing page for a managed UPS/FedEx refund and billing-audit service while preserving the existing Zettel visual language and conversion quality.

The page's single job is to get qualified small and midsized parcel shippers to start a free audit. A visitor should understand within seconds that:

1. Zettel audits UPS and FedEx shipping bills.
2. Zettel identifies refund-eligible service failures and questionable charges.
3. Zettel builds the evidence trail, handles or coordinates recovery, and verifies posted credits.
4. The customer pays no setup or monthly platform fee for the managed MVP.
5. Zettel charges 25% of verified credits recovered.
6. A prospect can begin with an invoice instead of immediately sharing carrier credentials.

The product should feel like a competent financial-recovery operator, not an AI demo, logistics dashboard, or generic shipping-optimization platform.

## Research Basis

This revision grounds the design in two kinds of evidence:

1. Current parcel-audit competitors and adjacent products, to understand the patterns buyers already recognize.
2. Qualitative Reddit complaints from shippers, to understand where the current dispute experience breaks down in practice.

The competitor research is design inspiration, not a source of copy to reproduce. The Reddit posts are anecdotal evidence and must not be presented as representative market statistics.

### Competitor pages reviewed

- AuditShipment: https://www.auditshipment.com/
- LateShipment OneAudit: https://www.lateshipment.com/platform/oneaudit/
- LateShipment pricing: https://www.lateshipment.com/lspricing/
- Refund Retriever how it works: https://www.refundretriever.com/how-it-works
- Refund Retriever pricing: https://www.refundretriever.com/pricing/
- 71lbs: https://info.71lbs.com/refundsv1
- Sifted Parcel Audit: https://sifted.com/parcel-audit/
- Reveel Parcel Audit & Recovery: https://reveelgroup.com/solutions/parcel-audit-solution/
- Shipware Parcel Invoice Audit & Recovery: https://shipware.com/solutions/invoice-audit-recovery/
- TransImpact Parcel Spend Intelligence trial: https://transimpact.com/parcel-spend-intelligence-free-trial

### Reddit threads reviewed

- r/UPS, November 2021, repeated unexplained Additional Handling / Shipping Charge Corrections on otherwise identical packages: https://www.reddit.com/r/UPS/comments/qu48j3/
- r/FedEx, August 2023, incorrect dimensions producing an extreme post-shipment charge and a difficult appeal process: https://www.reddit.com/r/FedEx/comments/15mt9b1/
- r/UPS, March 2026, a one-inch carrier dimension difference triggering a large additional-handling/DIM adjustment: https://www.reddit.com/r/UPS/comments/1s61whg/
- r/smallbusiness, November 2025, a small business reconciling weekly UPS invoices and repeatedly disputing DIM and address-correction surcharges: https://www.reddit.com/r/smallbusiness/comments/1p68wjj/
- r/FedEx, February 2026, a post-shipment adjustment despite the shipper recording measurements and weight, complicated by a third-party label platform: https://www.reddit.com/r/FedEx/comments/1rfvjyf/
- r/UPS, July 2024, adjustments posted weeks after delivery with unclear surcharge reasons: https://www.reddit.com/r/UPS/comments/1dw5x4k/

## What Competitors Teach Us

The category already has a recognizable conversion grammar. Zettel should use the parts that reduce buyer uncertainty while avoiding category clichés and unsupported proof.

### 1. Make the risk reversal visible immediately

AuditShipment, LateShipment, Refund Retriever, and 71lbs all foreground some form of contingency economics: no setup fee, no monthly fee, no contract, or payment only after recovery.

Zettel should not bury this in pricing. Put it in the hero and repeat it next to the final CTA.

Approved line:

**No upfront fee. We only get paid when you recover money.**

### 2. Show the process in plain operational steps

Refund Retriever uses a simple connect -> monitor -> reports -> refunds flow. AuditShipment uses connect -> audit -> claim -> recover. Buyers in this category already expect a simple end-to-end explanation.

Zettel should keep that clarity but differentiate by showing the evidence-building step explicitly.

Approved process:

**Send -> Audit -> Build the case -> Recover**

### 3. Put proof before product breadth

LateShipment uses customer logos, recovery totals, and concrete operational promises. TransImpact emphasizes actual recovered dollars. Reveel uses a large case-study recovery and explains where/how/why an overcharge occurred.

Zettel has no right to imitate those proof assets until it has real customers. The launch page should therefore use a clearly labeled **example case file** rather than fake statistics, logos, or testimonials.

After the first verified customer outcome, the design should make it easy to replace the example with a real anonymized case study.

### 4. Explain exactly what happens when the carrier says no

LateShipment explicitly differentiates on human escalation after denials. This is important because Reddit complaints repeatedly describe automatic or poorly explained denials as the point where shippers give up.

Zettel's managed-service promise should therefore include a denial state in the design. A case does not visually disappear after "Denied." The case timeline shows what was denied, why, what evidence exists, and whether Zettel escalated, requested more evidence, or closed the case.

Do not promise a specific escalation channel until the operational process has been tested with each carrier.

### 5. Make pricing legible without a sales call

Refund Retriever and LateShipment publish contingency pricing. Transparent pricing reduces the biggest question a small-business buyer has before submitting data.

Zettel should publish the launch offer directly:

**25% of verified credits recovered.**

### 6. Borrow trust mechanics, not enterprise theater

Competitors use phrases such as read-only access, no workflow change, refunds paid to the carrier account, and no long-term contract. These address real adoption anxiety.

Zettel's stronger launch version is even lower-friction:

**Start with an invoice, not your password.**

The page should avoid enterprise logo clouds, massive platform diagrams, or security badges that Zettel has not earned.

## What Reddit Changes About the Design

The Reddit research changes the page from a generic "carrier billing is complicated" story into a page about four concrete frustrations.

### Pain 1: Same box. Different bill.

One UPS shipper described sending 5-10 of the same package each week, with 1-2 receiving unexpected Shipping Charge Corrections or Additional Handling fees. Another 2026 UPS post described a package entered as 48 x 6 x 6 being audited at 49 x 7 x 7, which crossed a threshold and triggered a large adjustment.

This is a better problem statement than "billing errors happen."

Approved card headline:

**Same box. Different bill.**

Supporting idea:

A small measurement or classification change can materially alter the final charge. Zettel compares the carrier adjustment with the shipment record and available evidence instead of accepting the revised bill at face value.

### Pain 2: The bill says what changed, not why.

The 2021 UPS thread described corrections with little useful detail about the reason, measurements, or evidence. The 2024 UPS thread similarly described additional-handling adjustments with unclear explanations.

Approved card headline:

**A surcharge without the story is hard to challenge.**

Supporting idea:

Zettel reconstructs the case around the line item: original shipment facts, carrier adjustment, applicable rule, supporting evidence, dispute history, and final credit.

### Pain 3: The problem is not a $20 fee. It is fighting it every week.

The 2021 UPS poster explicitly described $15-$30 unexpected charges as impractical to call about every week. The 2025 small-business thread described hundreds of dollars in weekly surcharges while someone manually reconciled invoices.

This should become one of the page's strongest lines.

Approved card headline:

**The problem isn't a $20 surcharge. It's fighting it every week.**

Supporting idea:

Small disputes are economically irrational to chase one at a time. Zettel makes them worth pursuing by turning the repetitive review, evidence gathering, submission, follow-up, and reconciliation into a managed workflow.

### Pain 4: Evidence exists, but the dispute still stalls.

A FedEx shipper described an extreme dimension correction, submitted photo evidence, received a rejection, and ultimately got the charge reversed only after continued escalation. Another 2026 FedEx post described recording package dimensions and weight but still facing a large adjustment.

Approved card headline:

**A denial shouldn't erase the evidence.**

Supporting idea:

Zettel keeps a case file after the first decision. If a legitimate dispute is denied, the workflow records the reason, checks the evidence gap, and determines the next available escalation rather than treating "denied" as the end state.

### Important scope note

Some Reddit complaints involve labels purchased through eBay or other third-party platforms. The initial Zettel Parcel service is designed around direct UPS/FedEx billing data. Third-party-label disputes are a later product path and must not be implied as supported at launch unless the operating process is implemented and tested.

## Approved Product Direction

Use the existing Zettel landing page as the visual foundation, but change the storytelling around the category-specific research above.

Preserve:

- Zettel green and neutral palette.
- Public Sans typography.
- Restrained card, border, and spacing language.
- Source-backed evidence style.
- Fixed navigation.
- Existing fast CTA interaction patterns.
- Responsive and accessibility quality.

Add:

- A parcel-specific Recovery Ledger / Case File visual.
- Reddit-informed pain language.
- A visible denial/escalation state.
- Public contingency pricing.
- Stronger trust/data handling language.

Avoid:

- AI-first positioning.
- Fake refund totals.
- Fake customer logos.
- Fake testimonials.
- Unsupported "average savings" claims.
- Unsupported error-rate claims such as "1 in 5 invoices."
- A savings calculator based on assumptions we cannot yet defend.
- Copy that accuses UPS or FedEx of intentional wrongdoing.

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

Pricing example:

```text
Carrier credits your account     $1,000
Zettel fee                          $250
You keep                            $750
```

A founding-customer discount may be tested through direct sales, but it is not part of the canonical public landing-page offer unless explicitly approved later.

## Positioning

### Primary hero message

**We find the shipping charges you shouldn't have paid.**

Supporting copy:

Zettel reviews UPS and FedEx bills for refund-eligible service failures and questionable charges, builds the evidence behind each challenge, handles the recovery work, and verifies that the credit reaches your account.

Risk reversal:

**No upfront fee. We only get paid when you recover money.**

### Secondary emotional message

Use later on the page:

**The problem isn't a $20 surcharge. It's fighting it every week.**

This is more specific to the lived pain than generic "save time and money" language.

### What the page should not lead with

Do not make the hero about:

- AI-powered logistics intelligence;
- context graphs or knowledge graphs;
- autonomous agents;
- generic parcel optimization;
- enterprise transformation;
- estimated or theoretical savings.

The underlying Zettel architecture may support the service, but the landing page should translate that capability into a customer-facing promise: every challenge has a case file, and every claimed recovery is tracked to an actual credit.

## Brand And Domain Architecture

The Zettel brand should support multiple product-specific surfaces.

### Apex site

The current production apex domain becomes the lightweight parent Zettel surface rather than remaining synonymous with drayage. Its eventual purpose is to explain the Zettel product family and route visitors to product-specific sites.

### Drayage product

Move the existing drayage-focused **Zettel Ops** experience to the `drayage` subdomain of the current production domain without redesigning it as part of this parcel project.

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

The current app is a static Next.js export, so implementation should favor simple deployable surfaces over premature platform work.

## Revised Information Architecture

The research changes the middle of the page. The recommended narrative is:

1. Top navigation
2. Hero + Recovery Ledger
3. Immediate risk-reversal strip
4. **Why shippers give up on disputes** — Reddit-informed problem section
5. **How Zettel works** — Send -> Audit -> Build the case -> Recover
6. **One charge, fully explained** — example case file
7. **What happens when the carrier says no** — denial/escalation state
8. What Zettel audits
9. Pricing
10. Trust and data handling
11. FAQ
12. Final free-audit CTA
13. Footer / legal language

This keeps the current Zettel site's efficient single-page funnel while making the content specific to the actual parcel dispute experience.

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

Zettel reviews UPS and FedEx bills for refund-eligible service failures and questionable charges, builds the evidence behind each challenge, handles the recovery work, and verifies the credit reaches your account.

### Risk-reversal line

**No upfront fee. We only get paid when you recover money.**

### Actions

Primary: **Start a free audit**

Secondary: **See what we check**

The primary CTA opens the audit-intake flow. The secondary CTA scrolls to the audit-category section rather than opening another sales modal.

### Immediate trust strip

Directly below the hero CTA, use three concise facts:

**Start with an invoice**  |  **25% of verified credits**  |  **$0 recovered = $0 fee**

This borrows the effective reassurance pattern used by category competitors without adding unearned social proof.

## Signature Visual: Recovery Ledger / Case File

The parcel page's distinctive visual element is a realistic, highly legible audit trail built from carrier billing data.

The strongest version is not merely a financial ledger. It visually answers the Reddit complaint: **what changed, why did it change, what evidence do I have, and what happened next?**

Example:

```text
TRACKING 1Z84...

ORIGINAL SHIPMENT
Declared dimensions                    48 x 6 x 6 in
Declared weight                         11.5 lb
Original charge                          $24.80

CARRIER ADJUSTMENT
Audited dimensions                     49 x 7 x 7 in
Billed DIM weight                         40 lb
Additional adjustment                   +$97.11

CASE EVIDENCE
Original shipment record                     ✓
Package / SKU dimensions                     ✓
Supporting photo                        available
Applicable rule                         attached

CASE STATUS
Dispute submitted                         Aug 18
Carrier response                          Denied
Evidence reviewed                         Aug 20
Escalation submitted                      Aug 21
Carrier credit                           -$97.11

RECOVERED                                 $97.11
```

The numbers are illustrative UI content inspired by the type of issue described in public shipper discussions. They must be labeled **Example case** and must not imply that Zettel recovered this money for a real customer.

### Visual treatment

- Public Sans for explanatory labels.
- Restrained monospace for tracking IDs, measurements, invoice rows, timestamps, and dollar values.
- Green only for verified positive outcomes.
- Red/orange for challenged/denied states, with text labels so color is never the only signal.
- Thin evidence connectors rather than decorative AI-node graphics.
- One subtle sequential reveal may animate the case from adjustment -> evidence -> dispute -> credit, with reduced-motion support.

The design signature is: **make ugly carrier billing data understandable.**

## Risk-Reversal Strip

Competitor research shows that contingency economics are often the most important trust message after the hero.

Use a compact strip rather than a large pricing card this early:

- **Start free** — send one invoice/export.
- **No monthly fee** — for the managed MVP.
- **Pay on recovery** — 25% after the carrier credit is verified.

Do not use phrases such as "risk free" if legal review has not approved them. State the economics directly instead.

## Reddit-Informed Problem Section: Why Shippers Give Up

Replace generic problem cards with four cards based on the recurring qualitative issues.

### Card 1: Same box. Different bill.

Small measurement or classification changes can alter the final charge materially. Zettel compares the revised carrier billing with the original shipment record and available evidence.

Visual cue: two nearly identical parcel outlines with original vs. carrier dimensions.

### Card 2: A surcharge without the story is hard to challenge.

Invoice adjustments may show a changed charge without giving the shipper a complete, convenient explanation of the measurement, rule, or supporting evidence.

Visual cue: an adjustment line expanding into shipment facts, rule, and evidence.

### Card 3: The problem isn't a $20 surcharge. It's fighting it every week.

The cost of manually investigating, calling, filing, and following up can exceed the value of one small adjustment. Repetition is the real pain.

Visual cue: several small $15-$30 adjustments accumulating into a weekly total and one managed queue.

### Card 4: A denial shouldn't erase the evidence.

When a first dispute is denied, Zettel preserves the case record and determines whether the issue should be escalated, supplemented with evidence, or closed.

Visual cue: case timeline with **Denied** as an intermediate state rather than the end.

### Source treatment

The live page may cite carrier documentation for factual rules. Reddit should inform copy and UX, but the page should not present isolated Reddit anecdotes as proof that a specific percentage of shipments are wrong.

If public-user excerpts are ever shown, obtain an appropriate reuse basis and avoid exposing usernames or tracking information unnecessarily.

## How It Works

Use four steps instead of the current three because **Build the case** is a meaningful differentiator.

### 1. Send

**Send us a recent UPS or FedEx invoice.**

For the initial assessment, do not require a carrier password if an invoice/export is sufficient.

### 2. Audit

**We find charges worth reviewing.**

Zettel compares invoice lines with shipment facts, service commitments, rates, and available carrier rules.

### 3. Build the case

**We assemble the reason and the evidence.**

The case file should show the original charge, carrier adjustment, applicable rule, evidence, dispute state, and any missing information.

### 4. Recover

**We pursue the credit and verify it actually posts.**

The final success state is a verified carrier credit, not an estimated saving.

## One Charge, Fully Explained

This section replaces a generic SaaS dashboard screenshot.

Use a larger version of the Recovery Ledger with explanatory callouts around one example adjustment.

The section headline should be:

**Every charge gets a case file.**

Supporting copy:

**See what changed, what the carrier says, what the evidence shows, what we submitted, and whether the credit actually came back.**

The visual should connect:

**invoice line -> shipment facts -> carrier adjustment -> rule -> evidence -> dispute -> response -> verified credit**

This is the customer-facing expression of Zettel's provenance/context-graph advantage without using graph terminology.

## What Happens When the Carrier Says No

This is a new standalone section because denial friction appears repeatedly in user complaints and is underexplained on many competitor sites.

Headline:

**Denied isn't the same as explained.**

Body concept:

A carrier response becomes another piece of the case, not a dead end. Zettel records the reason, checks whether the evidence supports another step, requests missing proof when needed, and tracks any supported escalation through resolution.

### Required truth constraint

The launch site must only claim escalation behavior that the actual managed service can perform reliably. Before implementation publishes this copy, document and test the UPS and FedEx workflows for:

- first dispute submission;
- denial reason capture;
- evidence supplementation;
- available appeal/escalation path;
- status follow-up;
- final credit verification.

If a carrier or charge category does not support a reliable escalation path, the copy must say Zettel **reviews the denial and next available action**, not that Zettel will necessarily appeal it.

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

### Category-card design change

Each card should answer three things rather than provide generic marketing prose:

- **What you see on the bill**
- **What Zettel checks**
- **What evidence may matter**

Example:

**DIM / weight correction**

- Bill: carrier-adjusted dimensions or billed weight.
- Check: original dimensions/weight vs. carrier-adjusted values and applicable DIM rules.
- Evidence: shipment record, package/SKU dimensions, scale/photo evidence when available.

This directly addresses users who know something looks wrong but do not know what is needed to challenge it.

## Pricing Section

Use one prominent percentage rather than tiers:

# 25% of verified credits

Supporting points:

- $0 setup
- $0 monthly platform fee
- $0 recovered = $0 fee

Include the $1,000 / $250 / $750 example to remove ambiguity.

Do not use fake ROI calculators, estimated savings percentages, or unsupported "average savings" claims in the MVP.

### Competitive context

Current competitors publish contingency rates ranging from approximately 35% to 50% on the pages reviewed, while Reveel currently markets its audit service as free to shippers. Zettel should therefore avoid claiming to be the "cheapest" or universally lowest-cost option. The design should sell **transparent managed recovery + evidence + low-friction onboarding**, with 25% as the simple launch price.

## Trust And Data Handling

Parcel auditing asks a prospect to share financial and carrier information, so trust deserves its own section.

Primary message:

# Start with an invoice, not your password.

For the initial audit, request the least privileged data necessary. More privileged carrier access may be introduced only when required for ongoing recovery.

Required trust statements, subject to implementation truth:

- Carrier credits go directly to the customer's carrier account.
- Zettel invoices only after recovery is verified.
- The customer can see the evidence behind each challenge.
- The customer owns its invoice and shipment data.
- Do not make security, encryption, retention, compliance, or certification claims that the implementation cannot prove.
- Place a clear privacy-policy link adjacent to any invoice-upload flow.
- Include an appropriate footer disclaimer that Zettel is not affiliated with UPS or FedEx.

### Evidence trust message

Add a short callout:

**Already photograph or measure your packages? Send the proof with the case. Don't have it? Zettel shows what evidence is missing and what is worth capturing next time.**

This responds to users who began photographing shipments only after being burned by an adjustment, without requiring Zettel to ship a packing-station capture product in the first release.

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

### Upload guidance

If invoice upload is available, the form should say exactly what is accepted and why:

**Upload one recent carrier invoice or billing export. We'll use it to see whether there are charges worth reviewing.**

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
- Red/orange: challenged or denied state.
- Ink/neutral: ordinary financial and explanatory data.

Do not turn the site into a red/green trading dashboard. Financial and case states must remain understandable without color alone.

## Revised Layout Concept

```text
+--------------------------------------------------------------+
| ZETTEL PARCEL                 How it works   What we audit    |
|                               Pricing        [Free audit]     |
+--------------------------------------------------------------+
| Managed UPS & FedEx parcel audit                             |
|                                                              |
| WE FIND THE SHIPPING CHARGES       +----------------------+   |
| YOU SHOULDN'T HAVE PAID.           | EXAMPLE CASE FILE    |   |
|                                    | original / adjusted  |   |
| Explanation                         | evidence / denied     |   |
| [ Start a free audit ]             | appeal / recovered   |   |
| See what we check                  +----------------------+   |
|                                                              |
| Start with invoice | 25% verified credits | $0 = $0         |
+--------------------------------------------------------------+
| WHY SHIPPERS GIVE UP                                         |
| [Same box. Different bill.]  [A surcharge without the story] |
| [$20 every week]             [A denial isn't the end]        |
+--------------------------------------------------------------+
| HOW ZETTEL WORKS                                             |
| SEND -> AUDIT -> BUILD THE CASE -> RECOVER                   |
+--------------------------------------------------------------+
| EVERY CHARGE GETS A CASE FILE                                |
| invoice -> facts -> adjustment -> rule -> evidence           |
|                     -> dispute -> response -> credit          |
+--------------------------------------------------------------+
| DENIED ISN'T THE SAME AS EXPLAINED                           |
| [denial] -> [evidence gap] -> [next action] -> [resolution]  |
+--------------------------------------------------------------+
| WHAT WE AUDIT                                                |
| [late] [DIM] [duplicates] [residential] [handling] [rates]  |
+--------------------------------------------------------------+
| SIMPLE PRICING                                               |
|                    25% OF VERIFIED CREDITS                   |
+--------------------------------------------------------------+
| START WITH AN INVOICE, NOT YOUR PASSWORD                     |
+--------------------------------------------------------------+
| FAQ                                                          |
+--------------------------------------------------------------+
| THINK YOUR SHIPPING BILL DESERVES A SECOND LOOK?             |
|                      [ Start free audit ]                     |
+--------------------------------------------------------------+
```

## Motion And Interaction

The page should remain restrained.

One orchestrated motion moment is enough: the Recovery Ledger / Case File may reveal its stages in order on initial viewport entry, provided reduced-motion preferences are respected and the content remains fully available without animation.

Suggested reveal:

1. Original shipment
2. Carrier adjustment
3. Evidence
4. Dispute
5. Denial / next action
6. Verified credit

This sequence makes the workflow understandable without scattered decorative animation.

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
- What happens if the carrier denies a dispute?
- What if I do not have package photos or scale evidence?
- How do refunds/credits reach me?
- What happens if you find nothing?
- How far back can you audit?
- Do you support labels bought through Shopify, eBay, ShipStation, or another platform?
- Are you affiliated with UPS or FedEx?
- What data do you keep?

The exact answers to carrier-specific windows, third-party platform support, escalation paths, and data retention must come from verified operating rules before publication.

## Conversion And Analytics

Track at minimum:

- hero **Start a free audit** click;
- secondary **See what we check** click;
- intake opened;
- intake started;
- carrier selected;
- invoice attached, if upload exists;
- intake submitted;
- FAQ expansion for denial, credentials, evidence, and pricing questions;
- final CTA click.

Do not collect invoice contents or sensitive shipment fields in analytics events.

Primary funnel metric:

**qualified free-audit submissions / parcel landing-page visitors**

Early product metric after manual fulfillment begins:

**percentage of submitted audits with at least one defensible recovery candidate**

The page should not optimize for email-list signup because this is intended to be a purchasable managed service, not an early-access waitlist.

## Accessibility And Responsive Requirements

Target WCAG 2.2 AA.

- Every interactive element uses native semantics.
- Keyboard focus is visible and never obscured by fixed navigation.
- Problem/card information is not encoded by color alone.
- Recovery Ledger rows remain readable at 200% zoom.
- On narrow screens, the ledger becomes a vertical timeline rather than horizontally scrolling tiny financial data.
- Any sequential animation respects `prefers-reduced-motion`.
- Source and privacy links have sufficient contrast and usable touch targets.
- Mobile CTA access remains obvious without covering page content.

## SEO And Content Direction

Primary page topics:

- UPS invoice audit
- FedEx invoice audit
- parcel audit
- shipping refund recovery
- dimensional weight correction
- shipping charge correction
- additional handling dispute
- address correction fee
- carrier billing audit

The launch page itself should remain conversion-focused. Supporting educational articles can later target specific queries such as:

- Why did UPS change my package dimensions?
- How do I dispute a UPS shipping charge correction?
- How do FedEx dimensional adjustments work?
- What evidence should I keep for a carrier billing dispute?
- Why did I get an Additional Handling charge?

These topics map naturally to the questions found in public shipper discussions.

## MVP Scope

### Build now

- Parcel-specific navigation
- Hero
- Recovery Ledger / example case file
- Risk-reversal strip
- Reddit-informed problem cards
- Four-step process
- One-charge case-file section
- Denial / next-action section
- Audit-category grid
- Public pricing
- Trust/data section
- FAQ
- Final CTA
- Intake popup/form
- Responsive/mobile treatment
- Accessibility/reduced-motion treatment
- CTA/funnel analytics

### Do not build yet

- Customer dashboard
- Login
- Automated savings calculator
- Carrier-account OAuth unless required to fulfill the first managed customers
- Packing-station photo capture product
- Automated appeal engine
- Public API
- Interactive AI demo
- Multi-carrier platform beyond verified launch support
- Huge resource center
- Fake customer logos
- Fake recovery statistics
- Fake testimonials

## Operational Truth Gate Before Launch

Because the page is selling a managed financial service, the following must be verified before the corresponding copy goes live:

1. Which UPS charge categories Zettel can reliably identify and dispute.
2. Which FedEx charge categories Zettel can reliably identify and dispute.
3. How initial disputes are submitted for each supported category.
4. How denial reasons are captured.
5. What evidence can be added after denial.
6. What appeal/escalation channels actually exist.
7. How a posted credit is detected and verified.
8. How far back each supported audit type can be reviewed.
9. Whether the customer must authorize Zettel as an agent for any action.
10. How invoice and shipment data is stored, retained, and deleted.
11. Whether labels purchased through third-party platforms are explicitly unsupported at launch.

If any item is not verified, the landing page must use narrower wording rather than inventing a capability.

## Implementation Notes For Existing Site

The current home page is already split into reusable sections such as Hero, Steps, Problem, Solution, FeatureGrid, FinalCTA, TopNav, and Footer. Implementation should reuse the established design language and interaction patterns while allowing parcel-specific section components where the content model materially differs.

Do not force a one-to-one clone of existing components if that makes the parcel story awkward. Reuse visual primitives and tokens; create parcel-specific components for the Recovery Ledger, denial timeline, and audit-category cards.

The current site uses a static Next.js export. Keep the landing page compatible with that architecture unless the intake/upload flow creates a verified need for a different runtime boundary.

The existing popup CTA work should be reused where appropriate, but invoice upload introduces privacy and file-handling requirements that must be designed before implementation.

## Competitor-Inspired Patterns To Borrow

Borrow these category conventions deliberately:

- **AuditShipment:** free-audit CTA, immediate no-upfront-cost reassurance, clear what-we-audit taxonomy, transparent pricing/trust near the bottom.
- **LateShipment:** visible contingency pricing, strong explanation of denial escalation, proof near the top, and an explicit recovery-to-optimization narrative for future expansion.
- **Refund Retriever:** extremely simple process explanation, credits returning directly to the carrier account, no setup/monthly framing.
- **71lbs:** direct explanation of why account access is needed and where refunds go.
- **Sifted:** educational explanation for buyers who do not yet know what a parcel audit is; clear benefit framing around eliminating manual review.
- **Reveel:** explain exactly where/how/why a charge was wrong; use specific case evidence rather than vague "AI savings" language.
- **TransImpact:** when real outcomes exist, show recovered dollars as the proof rather than estimated opportunity.
- **Shipware:** explain the scope of invoice-line checks and emphasize that the service removes manual claim work.

## Patterns To Avoid

- Large unsupported market-size or error-rate claims.
- Auto-rotating logo walls with no relevance to the initial SMB buyer.
- Dense enterprise navigation on a single-product validation page.
- Hero copy that begins with "AI-powered."
- Generic dashboards full of charts that do not explain one disputed charge.
- Savings calculators that imply certainty from weak assumptions.
- "We recover every dollar" language.
- Carrier-blaming language that undermines credibility.
- Claiming a dispute is valid solely because a Reddit user believed it was valid.

## Design Success Criteria

A qualified visitor should understand within roughly ten seconds:

1. This is for UPS/FedEx shippers.
2. Zettel audits shipping bills and finds charges worth challenging.
3. Zettel handles the repetitive dispute/recovery work.
4. Zettel preserves the evidence and does not stop conceptually at a first denial.
5. The customer can start with one invoice.
6. There is no setup/monthly fee for the managed MVP.
7. Zettel charges 25% only after a verified credit.

The design should also make a shipper who has personally experienced a confusing adjustment think:

**"Yes. This is the exact problem I keep having."**

## Verification Plan For Implementation

Before claiming implementation complete:

- Run repository lint, typecheck/test commands if present, and production build.
- Verify static export still succeeds.
- Exercise desktop and narrow-mobile layouts.
- Exercise mobile navigation and all anchor links.
- Verify both CTAs behave as designed.
- Verify the audit-intake flow's success, failure, validation, keyboard, and privacy-link states.
- Verify reduced-motion behavior.
- Verify the Recovery Ledger stays readable without animation.
- Verify problem cards and audit-category cards remain understandable without color.
- Check all factual carrier claims against current UPS/FedEx primary sources.
- Check every competitor/Reddit-inspired statement on the live page: anecdotes should influence UX/copy but not be presented as population-level facts.
- Confirm illustrative case data is visibly labeled **Example case**.
- Confirm there are no fake customer outcomes, logos, or testimonials.
- Confirm pricing is consistent everywhere.
- Confirm third-party label support is not implied unless implemented.
- Confirm privacy/data-handling copy matches actual behavior.

## Out Of Scope

- Implementing the landing page in this design phase.
- Changing the managed-service price beyond the approved 25% launch offer.
- Building the parent apex page.
- Performing the drayage subdomain migration.
- Building a customer dashboard.
- Building a packing evidence-capture application.
- Supporting Shopify/eBay/ShipStation-mediated adjustments without a separately validated workflow.
- Defining legal terms of service or data-retention policy in this design document.

## Final Design Principle

**Show one confusing charge becoming an understandable case, then becoming a verified credit.**

The competitive category already knows how to say "we audit invoices." Zettel should make the hidden work visible:

**what changed -> why it matters -> what evidence exists -> what was submitted -> what the carrier said -> what happened next -> whether money actually came back.**

That is both the strongest response to the user pain in the Reddit threads and the clearest customer-facing expression of Zettel's provenance advantage.