# Zettel Parcel Audit Landing Page Design

Date: 2026-08-30  
Project: Zettel website / managed parcel audit product  
Status: Revised design direction; implementation not started

## Goal

Create a dedicated landing page for a managed UPS/FedEx refund and billing-audit service while preserving the existing Zettel visual language and conversion quality.

The page's single job is to get qualified small and midsized parcel shippers to start a free audit. A visitor should understand within seconds that:

1. Zettel audits UPS and FedEx shipping bills.
2. Zettel identifies refund-eligible service failures and questionable charges.
3. Zettel builds an evidence-backed case around each challenge, handles or coordinates recovery, and verifies posted credits.
4. The customer pays no setup or monthly platform fee for the managed MVP.
5. Zettel charges 25% of verified credits recovered.
6. A prospect can begin with an invoice instead of immediately sharing carrier credentials.

The product should feel like a competent financial-recovery operator, not an AI demo, logistics dashboard, or generic shipping-optimization platform.

The underlying implementation must use the shared **Zettel Platform** for agentic reasoning, context/knowledge graph memory, typed semantics, search/retrieval, provenance, durable operations, review, and shared infrastructure. Parcel may add product-specific domain logic and integrations around the Platform, but it must not build a parallel graph, RAG, ontology, search, memory, or agent stack.

---

## Research Basis

This design is grounded in three kinds of evidence:

1. Current parcel-audit competitors and adjacent products, to understand the patterns buyers already recognize.
2. Qualitative Reddit complaints from shippers, to understand where the current dispute experience breaks down in practice.
3. The current `zettel-ai/zettel_platform` architecture and implementation, to ensure the landing-page promise maps to the backend that will power the product.

The competitor research is design inspiration, not a source of copy to reproduce. The Reddit posts are anecdotal evidence and must not be presented as representative market statistics. The Platform repository is the architectural source of truth for shared intelligence/runtime capabilities; product-specific capabilities described here still require Parcel implementation and validation.

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

### Zettel Platform sources reviewed

The design specifically relies on the current Platform boundaries and capabilities documented or implemented in:

- `zettel_platform/README.md`
- `docs/architecture/product-extension-contract.md`
- `docs/control-plane.md`
- `docs/superpowers/specs/2026-08-12-aggressive-platform-simplification-design.md`
- `docs/superpowers/plans/2026-08-26-operational-zettel-platform-wedding-adoption.md`
- `packages/zettel_core/src/zettel_core/agents.py`
- `packages/zettel_core/src/zettel_core/operations.py`
- `packages/zettel_core/src/zettel_core/protocols.py`
- `packages/zettel_core/src/zettel_core/retrieval.py`
- `packages/zettel_core/src/zettel_core/reviews.py`
- `packages/zettel_core/src/zettel_core/sources.py`
- `packages/zettel_app/src/zettel_app/retrieval.py`
- `packages/zettel_app/src/zettel_app/actions.py`
- `packages/zettel_memory/src/zettel_memory/graphiti_memory.py`
- `packages/zettel_agents/src/zettel_agents/invocation.py`
- `packages/zettel_product/src/zettel_product/module.py`
- `packages/zettel_product/src/zettel_product/records.py`
- `packages/zettel_product/src/zettel_product/work.py`
- `packages/zettel_workers/src/zettel_workers/products.py`
- `tests/integration/test_typed_graphiti_contract.py`
- `features/ask_with_evidence.feature`
- `features/trace_persistence.feature`

The Platform `main` snapshot used for this design is the currently visible `b4299c3c42024d81356be8bb25dc153633d07437`. If a newer human-authored Platform revision becomes visible before implementation planning, re-check the architectural contract and update this spec if the ownership boundary changed.

---

## Zettel Platform Is A Hard Product Constraint

Zettel Parcel is not a standalone AI application that happens to share a company name with Zettel Platform.

It is a **first-class product extension of Zettel Platform**.

The dependency direction must remain one-way:

**Zettel Parcel imports and consumes Zettel Platform. Zettel Platform never imports Zettel Parcel.**

The current Platform product-extension contract already establishes this pattern. Platform constructs concrete API and worker runtime bundles once; a vertical product supplies explicit product factories and owns its domain behavior. Platform owns generic intelligence/runtime infrastructure and never discovers or interprets arbitrary product plugins.

### Platform owns

- Authentication and workspace isolation.
- `WorkspaceScope` and generic authorization boundaries.
- Durable operations, queue dispatch, retries, and operation state.
- Shared product work dispatch and stable `product_key` namespacing.
- Canonical knowledge/evidence records and source provenance.
- Shared source/body storage primitives.
- Context packs.
- Self-hosted Graphiti/Neo4j graph memory and maintenance.
- Typed Graphiti episode/triplet APIs.
- Canonical + graph retrieval and search infrastructure.
- Temporal fact validity/invalidation semantics.
- Retrieval provenance and native evidence citations.
- Knowledge completeness/degraded-state handling.
- Bounded AgentCore Harness invocation.
- Agent usage/cost attribution and bounded execution.
- Generic reviews, decision traces, and action-approval primitives.
- Shared AWS/Nango clients and generic provider effects.
- Generic workspace deletion effects.

### Parcel owns

- The parcel domain model.
- Carrier-specific invoice/shipment normalization rules.
- Carrier rule interpretation policy.
- Parcel entity types and relationships supplied to Platform graph APIs.
- Stable parcel identities and versioning policy.
- Parcel-specific prompt/schema for bounded reasoning.
- Audit-candidate policy and thresholds.
- Case state and dispute state.
- Parcel-specific product records.
- Evidence-to-case mapping.
- Carrier dispute/appeal business rules.
- Carrier-specific adapters and workflows not already provided by Platform.
- Credit verification logic.
- Contingency-fee calculation and billing workflow.
- Parcel UI and customer-facing language.
- Parcel-specific deletion/source hooks.

### Parcel must not own

Parcel must not introduce its own:

- Neo4j or other graph database.
- Graphiti client/runtime.
- vector database.
- RAG framework.
- semantic-search stack.
- knowledge-memory layer.
- ontology engine that bypasses Zettel Platform.
- AgentCore deployment.
- generic model router.
- agent memory.
- autonomous tool runtime.
- generic workflow engine.
- generic provenance system.
- generic decision-trace system.

If Parcel demonstrates that a reusable semantic, ontology, retrieval, provenance, or agentic capability is missing, the reusable capability should be added to **Zettel Platform**. Parcel should then consume it through the Platform boundary.

---

## What The Platform Changes About The Customer Story

The landing page should not explain Graphiti, Neo4j, AgentCore, reciprocal-rank fusion, context packs, typed Pydantic graph schemas, or DynamoDB operations.

It should expose the customer-visible advantages those systems make possible.

### Platform capability -> Parcel promise

| Platform capability | Customer-facing Parcel expression |
|---|---|
| Canonical evidence with provider/version/hash/native locator provenance | **See exactly what evidence supports a challenge.** |
| Typed temporal Graphiti entities/edges | **Zettel connects the shipment, adjustment, rule, evidence, dispute, decision, and credit.** |
| Graph fact validity and invalidation timestamps | **Zettel can distinguish the rule/fact that applied at the time from what is true now.** |
| Exact history hydration plus graph/canonical retrieval | **Zettel can compare this charge with your own prior shipment/case history.** |
| Retrieval provenance | **A case can point back to the underlying source rather than a black-box score.** |
| `empty` / `backfilling` / `current` / `degraded` knowledge states | **If the evidence is incomplete, Zettel says so.** |
| Durable operations | **Cases keep moving through a traceable workflow instead of disappearing in an AI session.** |
| Review and external-action approval | **Zettel builds the case; you stay in control of sensitive actions.** |
| Decision traces | **The reasoning outcome and evidence trail persist after the operation completes.** |
| Bounded structured AgentCore generation | **AI helps assemble a typed recommendation; it is not an unbounded bot roaming carrier systems.** |
| Product work namespacing and workspace-scoped records | **Parcel case data remains a defined product domain inside a workspace.** |

This should become an internal copy test: if a proposed landing-page claim cannot be mapped to a Platform capability plus a Parcel-specific implementation, narrow or remove the claim.

---

## Parcel Semantic Case Model

The strongest use of Zettel Platform is not a generic "knowledge graph of shipping." It is a typed, temporal **case graph** around the exact question a customer cares about:

**Should this charge be challenged, why, with what evidence, and what happened?**

Conceptual domain path:

**Shipment -> Package -> Invoice -> Charge -> Adjustment -> Carrier Rule -> Evidence -> Audit Case -> Dispute -> Carrier Decision -> Credit**

Other useful entities may include:

- Carrier
- Service
- Account
- Contract / negotiated rate
- Address classification
- Tracking event
- Package profile
- SKU/package template
- Evidence artifact
- Dispute submission
- Denial reason
- Escalation
- Recovery

### Typed semantics

The Platform's current graph contract already supports caller-owned:

- entity types;
- excluded entity types;
- edge types;
- allowed edge maps;
- custom extraction instructions;
- stable typed episode identities;
- one predecessor episode for versioned lineage;
- explicit triplets;
- graph searches filtered by node labels, edge types, and valid/invalid dates.

Parcel should define its domain Pydantic graph schema and use the Platform's typed graph contract. It should not call Graphiti directly.

### Ontology rule

For this MVP, "ontology" means the explicit Parcel-owned semantic schema of entities, relations, constraints, identities, and extraction instructions executed through Zettel Platform's typed Graphiti boundary.

The current Platform is **not** a generic OWL/RDF ontology editing/reasoning platform. The landing page must not imply standards-based ontology reasoning that the backend does not provide.

If Parcel later needs a reusable ontology registry, ontology versioning, cross-product semantic constraints, OWL/RDF reasoning, SHACL validation, or another generalized semantic capability, that capability should be designed as an extension to Zettel Platform rather than embedded only in Parcel.

---

## Product-Owned Records

Use a stable product namespace such as:

`parcel`

The Platform product-record store is workspace-scoped, versioned, optimistic-concurrency-aware, and intentionally opaque to Platform domain logic.

Recommended Parcel record types include:

- `shipment`
- `package_profile`
- `invoice`
- `charge`
- `adjustment`
- `carrier_rule`
- `audit_case`
- `dispute`
- `carrier_decision`
- `credit`
- `recovery_fee`

The exact record model belongs in the later Parcel backend design, not in this landing-page implementation. This section exists to make the landing-page concept technically coherent with the shared Platform.

---

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

---

## What Reddit Changes About The Design

The Reddit research changes the page from a generic "carrier billing is complicated" story into a page about four concrete frustrations.

### Pain 1: Same box. Different bill.

One UPS shipper described sending 5-10 of the same package each week, with 1-2 receiving unexpected Shipping Charge Corrections or Additional Handling fees. Another 2026 UPS post described a package entered as 48 x 6 x 6 being audited at 49 x 7 x 7, which crossed a threshold and triggered a large adjustment.

Approved card headline:

**Same box. Different bill.**

Supporting idea:

A small measurement or classification change can materially alter the final charge. Zettel compares the carrier adjustment with the shipment record, relevant history, and available evidence instead of accepting the revised bill at face value.

### Pain 2: The bill says what changed, not why.

The 2021 UPS thread described corrections with little useful detail about the reason, measurements, or evidence. The 2024 UPS thread similarly described additional-handling adjustments with unclear explanations.

Approved card headline:

**A surcharge without the story is hard to challenge.**

Supporting idea:

Zettel reconstructs the case around the line item: original shipment facts, carrier adjustment, applicable rule, supporting evidence, dispute history, and final credit.

### Pain 3: The problem is not a $20 fee. It is fighting it every week.

The 2021 UPS poster explicitly described $15-$30 unexpected charges as impractical to call about every week. The 2025 small-business thread described hundreds of dollars in weekly surcharges while someone manually reconciled invoices.

Approved card headline:

**The problem isn't a $20 surcharge. It's fighting it every week.**

Supporting idea:

Small disputes are economically irrational to chase one at a time. Zettel makes them worth pursuing by turning repetitive review, evidence gathering, submission, follow-up, and reconciliation into a managed workflow.

### Pain 4: Evidence exists, but the dispute still stalls.

A FedEx shipper described an extreme dimension correction, submitted photo evidence, received a rejection, and ultimately got the charge reversed only after continued escalation. Another 2026 FedEx post described recording package dimensions and weight but still facing a large adjustment.

Approved card headline:

**A denial shouldn't erase the evidence.**

Supporting idea:

Zettel keeps a case file after the first decision. If a legitimate dispute is denied, the workflow records the reason, checks the evidence gap, and determines the next available action rather than treating "denied" as the end state.

### Important scope note

Some Reddit complaints involve labels purchased through eBay or other third-party platforms. The initial Zettel Parcel service is designed around direct UPS/FedEx billing data. Third-party-label disputes are a later product path and must not be implied as supported at launch unless the operating process is implemented and tested.

---

## Approved Product Direction

Use the existing Zettel landing page as the visual foundation, but change the storytelling around the category-specific research and Platform-backed differentiation.

Preserve:

- Zettel green and neutral palette.
- Public Sans typography.
- Restrained card, border, and spacing language.
- Source-backed evidence style.
- Fixed navigation.
- Existing fast CTA interaction patterns.
- Responsive and accessibility quality.

Add:

- A parcel-specific **Zettel Case File** as the signature visual.
- Reddit-informed pain language.
- A visible denial/next-action state.
- Public contingency pricing.
- Stronger trust/data handling language.
- Historical-context demonstration for repeated package patterns.
- Explicit evidence completeness/missing-evidence states.
- A **No black-box savings score** trust section.
- Customer-visible source/rule provenance without exposing backend jargon.

Avoid:

- AI-first positioning.
- Knowledge-graph diagrams in the hero.
- Fake refund totals.
- Fake customer logos.
- Fake testimonials.
- Unsupported "average savings" claims.
- Unsupported error-rate claims such as "1 in 5 invoices."
- A savings calculator based on assumptions we cannot defend.
- Copy that accuses UPS or FedEx of intentional wrongdoing.
- Claims that an autonomous agent directly roams carrier systems.
- Claims of OWL/RDF ontology reasoning that the current Platform does not provide.

---

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

---

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

---

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

### Platform-backed trust message

Use later on the page:

**Every flagged charge comes with the reason.**

Supporting idea:

Zettel connects what you shipped, what the carrier changed, which rule applied, what evidence supports the challenge, and what happened next. If the evidence is incomplete, Zettel says so.

### Agentic positioning

Approved concept:

**Zettel builds the case. You stay in control.**

Do not position the MVP as an autonomous carrier-dispute bot. The current Platform AgentCore boundary is intentionally stateless, bounded, schema-constrained, proposal-oriented, and separated from Graphiti, canonical storage, Nango, provider tools, and direct writes. That is a trust advantage for financial disputes.

### What the page should not lead with

Do not make the hero about:

- AI-powered logistics intelligence;
- context graphs or knowledge graphs;
- autonomous agents;
- ontology infrastructure;
- generic parcel optimization;
- enterprise transformation;
- estimated or theoretical savings.

The landing page should translate backend sophistication into a simple promise: every challenge gets an understandable case file, and every claimed recovery is tracked to an actual credit.

---

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

The website does not require a new multi-product frontend platform before launch.

Recommended sequence:

1. Build the parcel landing page using the existing site's patterns.
2. Move the existing drayage surface to the `drayage` subdomain.
3. Replace the apex with a lightweight parent-product selector.
4. Extract additional shared frontend infrastructure only if maintaining the product surfaces becomes materially painful.

This frontend simplicity must not be confused with the backend boundary: **Zettel Parcel's intelligent backend behavior must use Zettel Platform from the beginning.**

---

## Revised Information Architecture

Recommended narrative:

1. Top navigation
2. Hero + example Zettel Case File
3. Immediate risk-reversal strip
4. **Why shippers give up on disputes** — Reddit-informed problem section
5. **One charge. Full context.** — large case-file demonstration
6. **Same box. Different bill.** — historical/package-pattern demonstration
7. **How Zettel works** — Send -> Audit -> Build the case -> Recover
8. **What happens when the carrier says no** — denial/next-action state
9. What Zettel audits
10. **No black-box savings score** — evidence/provenance/completeness/review trust
11. Pricing
12. Trust and data handling
13. FAQ
14. Final free-audit CTA
15. Footer / legal language

This keeps the current Zettel site's efficient single-page funnel while making the content specific to parcel disputes and the Platform's real differentiation.

---

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

---

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

---

## Signature Visual: Zettel Case File

The parcel page's distinctive visual element is a realistic, highly legible **case file** built from carrier billing and supporting evidence.

The visual should answer:

**What changed? Why does it matter? What evidence supports the challenge? Which rule applied? What happened next?**

The case file is the customer-facing representation of the Platform's canonical evidence, temporal graph relationships, provenance, durable operation, and decision/review concepts.

Do not label the visual as a "knowledge graph," "context graph," or "AI trace."

### Hero case example

```text
CASE #0173                                      NEEDS REVIEW

UPS Ground • 1Z84...
Amount challenged                                  $47.75

WHY ZETTEL FLAGGED IT

Your shipment
48 x 6 x 6 in • 12.1 lb
Packing / shipment record                              ✓

Carrier adjustment
49 x 7 x 7 in
Additional Handling                               +$47.75

RULE IN EFFECT ON SHIPMENT DATE
UPS carrier rule • effective Aug 2026
View source                                             ↗

YOUR HISTORY
Same package profile
14 prior shipments • 0 prior corrections

EVIDENCE
Shipment record                                        ✓
Original invoice                                       ✓
Applicable rule                                        ✓
Package photo                                     missing

RECOMMENDED ACTION
Challenge dimensional correction

                                      [ Review case ]
```

All values are illustrative and must be visibly labeled **Example case**. They must not imply a real Zettel recovery, real carrier outcome, or currently verified carrier rule.

### Why this visual is better than a dashboard

The existing category is full of savings totals, dashboards, and audit-count claims. Zettel should instead make one confusing charge understandable.

The case file visually expresses:

**Shipment -> Package -> Charge -> Adjustment -> Rule -> Evidence -> Dispute -> Decision -> Credit**

without exposing backend implementation details.

### Visual treatment

- Public Sans for explanatory labels.
- Restrained monospace for tracking IDs, measurements, invoice rows, timestamps, and dollar values.
- Green only for verified positive outcomes.
- Red/orange for challenged or denied states, with text labels so color is never the only signal.
- Blue/neutral for source facts and rules.
- Thin evidence connectors rather than decorative AI-node graphics.
- Source affordances should look clickable where a future authenticated product could open the underlying evidence.
- One subtle sequential reveal may animate case assembly, with reduced-motion support.

The design signature is:

**Make ugly carrier billing data understandable.**

---

## Risk-Reversal Strip

Use a compact strip rather than a large pricing card immediately after the hero:

- **Start free** — send one invoice/export.
- **No monthly fee** — for the managed MVP.
- **Pay on recovery** — 25% after the carrier credit is verified.

Do not use phrases such as "risk free" if legal review has not approved them. State the economics directly instead.

---

## Reddit-Informed Problem Section: Why Shippers Give Up

Replace generic problem cards with four cards based on the recurring qualitative issues.

### Card 1: Same box. Different bill.

Small measurement or classification changes can alter the final charge materially. Zettel compares the revised carrier billing with the original shipment record, relevant historical pattern, and available evidence.

Visual cue: two nearly identical parcel outlines with original vs. carrier dimensions.

### Card 2: A surcharge without the story is hard to challenge.

Invoice adjustments may show a changed charge without giving the shipper a complete, convenient explanation of the measurement, rule, or supporting evidence.

Visual cue: an adjustment line expanding into shipment facts, rule, and evidence.

### Card 3: The problem isn't a $20 surcharge. It's fighting it every week.

The cost of manually investigating, calling, filing, and following up can exceed the value of one small adjustment. Repetition is the real pain.

Visual cue: several small adjustments accumulating into a managed case queue.

### Card 4: A denial shouldn't erase the evidence.

When a first dispute is denied, Zettel preserves the case record and determines whether the issue should be escalated, supplemented with evidence, or closed.

Visual cue: case timeline with **Denied** as an intermediate state rather than the end.

### Source treatment

The live page may cite carrier documentation for factual rules. Reddit should inform copy and UX, but isolated anecdotes must not be presented as proof of a population-level error rate.

---

## One Charge. Full Context.

This section replaces a generic SaaS dashboard screenshot.

Headline:

**Every charge gets a case file.**

Supporting copy:

**See what changed, which rule applied, what evidence supports the challenge, what we submitted, what the carrier said, and whether the money actually came back.**

The section should visually connect:

**invoice line -> shipment facts -> adjustment -> rule in effect -> evidence -> dispute -> response -> verified credit**

### Platform-backed details worth surfacing visually

Do not mention internal class names, but the visual may express these concepts:

- **Source:** where a fact came from.
- **Observed:** when Zettel received it.
- **Effective:** when a rule/fact applied.
- **Superseded:** when a newer fact replaced it.
- **Evidence complete / incomplete:** whether the case has enough authoritative support.
- **View source:** direct path back to the underlying evidence where the authenticated product supports it.

This is the customer-facing expression of the Platform's temporal provenance and native citations.

---

## Same Box. Different Bill.

This should be more than a problem card. It should demonstrate why persistent semantic history matters.

Suggested visual:

```text
PACKAGE PROFILE: 18 x 12 x 8 / 7.4 LB

Jan 8       UPS Ground       $14.72       ✓
Jan 14      UPS Ground       $14.72       ✓
Jan 21      UPS Ground       $14.72       ✓
Jan 29      UPS Ground       $34.97       !
                                         |
                              Carrier changed:
                              18x12x8 -> 20x14x9
                                         |
                              + Additional Handling
```

Headline option:

**Zettel remembers what happened before.**

Supporting idea:

One shipment may look ambiguous by itself. Your own prior shipments can provide context. Zettel connects repeated package and charge history so a reviewer can see whether a new adjustment is consistent with the pattern or deserves a closer look.

### Important truth constraint

Historical consistency is **evidence**, not proof that a carrier adjustment is invalid. The live product must not automatically treat prior billing as authoritative measurement evidence.

---

## How It Works

Use four steps because **Build the case** is a meaningful differentiator.

### 1. Send

**Send us a recent UPS or FedEx invoice.**

For the initial assessment, do not require a carrier password if an invoice/export is sufficient.

### 2. Audit

**We find charges worth reviewing.**

Zettel connects invoice lines with available shipment facts, service commitments, rates, relevant history, and carrier rules.

### 3. Build the case

**We assemble the reason and the evidence.**

The case file should show the original charge, carrier adjustment, rule in effect, evidence, relevant history, dispute state, and missing information.

### 4. Recover

**We pursue the supported next action and verify any credit that actually posts.**

The final success state is a verified carrier credit, not an estimated saving.

### Internal implementation mapping

This user-visible process may span Parcel product records, Platform durable product work, Platform graph/canonical retrieval, bounded structured reasoning, review, and Parcel-specific carrier actions. The page should not expose those implementation boundaries.

---

## What Happens When The Carrier Says No

Headline:

**Denied isn't the same as explained.**

Body concept:

A carrier response becomes another piece of the case, not a dead end. Zettel records the response, preserves the evidence, checks what is missing, and determines the next supported action.

### Case states

The UI concept should support states such as:

- Candidate
- Evidence incomplete
- Ready for review
- Approved for submission
- Submitted
- Carrier responded
- Denied
- Needs more evidence
- Escalation available
- Closed / unsupported
- Credit pending
- Credit verified

These are Parcel domain states, not direct mappings to the Platform's generic operation status enum.

### Required truth constraint

Before implementation publishes escalation copy, document and test UPS and FedEx workflows for:

- first dispute submission;
- denial reason capture;
- evidence supplementation;
- available appeal/escalation path;
- status follow-up;
- final credit verification.

If a carrier or charge category does not support a reliable escalation path, say Zettel **reviews the denial and next available action**, not that Zettel will necessarily appeal it.

---

## What We Audit

Candidate launch categories:

1. **Late-delivery refunds** — for services covered by the applicable carrier guarantee.
2. **DIM and weight corrections** — where carrier-billed measurements differ from shipment records or available evidence.
3. **Duplicate charges** — duplicated shipment or service billing.
4. **Residential/commercial classification** — address-classification-related charges.
5. **Additional Handling / Large Package charges** — validate charges against the applicable carrier criteria.
6. **Rate or discount discrepancies** — apparent differences between billed pricing and the customer's agreed rates/discounts.

A category must not appear on the live site until the operational recovery process for that category has been tested and can be delivered reliably.

### Category-card structure

Each card should answer:

- **What you see on the bill**
- **What Zettel checks**
- **What evidence may matter**

Example:

**DIM / weight correction**

- Bill: carrier-adjusted dimensions or billed weight.
- Check: original dimensions/weight vs. carrier-adjusted values, history, and applicable rule.
- Evidence: shipment record, package/SKU dimensions, scale/photo evidence when available.

---

## No Black-Box Savings Score

This section is a Platform-informed differentiator and should appear before pricing/trust.

Headline:

**Every flagged charge comes with the reason.**

Supporting copy:

Zettel does not need to ask you to trust an unexplained savings score. A case can show what changed, which evidence supports the challenge, which rule applied, and what information is still missing.

### Three trust cards

#### 1. Evidence you can trace

Show source-backed facts rather than only a confidence percentage.

Customer language:

**See the invoice, shipment fact, rule, or evidence behind the recommendation.**

#### 2. Time matters

Carrier rules and shipment facts can change.

Customer language:

**Zettel checks the rule and facts in context, including when they applied.**

Use wording such as **Rule in effect on shipment date** inside case visuals.

#### 3. Missing evidence stays missing

Do not manufacture certainty.

Customer language:

**If the evidence isn't there, Zettel says so.**

Possible visual states:

- Evidence complete
- Missing package measurement
- Rule needs verification
- Historical context available
- Needs human review

### Degraded knowledge behavior

The Platform can explicitly represent degraded knowledge/retrieval states. The Parcel UI should preserve that philosophy: if part of the evidence/retrieval pipeline is unavailable, do not silently present a complete-looking case.

The exact customer-facing degraded state is a later product design decision, but the landing-page examples should normalize visible uncertainty rather than fake certainty.

---

## Agentic Behavior And Human Review

Zettel Platform's current AgentCore Harness is bounded, stateless, typed, and proposal-only. It has no AgentCore Memory and no direct Graphiti, Nango, product-store, provider-tool, shell, or canonical-write access.

That means the Parcel product should be designed around **assembled context -> bounded structured recommendation -> explicit product acceptance/action**, not an agent that independently explores systems.

### Landing-page implication

Use:

**Zettel builds the case. You stay in control.**

Avoid:

- "Our autonomous AI disputes every charge for you."
- "The agent logs into UPS and investigates on its own."
- "AI independently reads your graph and takes action."

### MVP review posture

For financially sensitive external actions, default product design should assume a reviewable case/action until operational evidence supports a narrower automatic mode.

Platform already supports generic review-required vs. automatic workspace policy and bounded automatic operation caps. Parcel may later use those Platform controls, but the landing page should not promise automatic dispute submission until the Parcel workflow is proven.

---

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

Current competitors publish contingency rates ranging from approximately 35% to 50% on the pages reviewed, while Reveel currently markets its audit service as free to shippers. Zettel should therefore avoid claiming to be the "cheapest" or universally lowest-cost option.

Sell:

**transparent managed recovery + evidence-backed cases + low-friction onboarding + verified outcomes.**

---

## Trust And Data Handling

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

### Platform-derived trust facts that may inform future authenticated-product copy

The current Platform architecture provides workspace-scoped canonical/graph/product records, durable operations, and explicit provenance boundaries. These are useful implementation foundations, but the marketing site must still avoid security/compliance claims not formally reviewed for the deployed Parcel environment.

### Evidence trust message

**Already photograph or measure your packages? Send the proof with the case. Don't have it? Zettel shows what evidence is missing and what is worth capturing next time.**

This responds to users who began photographing shipments only after being burned by an adjustment, without requiring a packing-station capture product in the first release.

---

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

If invoice upload is available:

**Upload one recent carrier invoice or billing export. We'll use it to see whether there are charges worth reviewing.**

If invoice upload is not implemented in the first release, the form must clearly tell the prospect what happens next rather than presenting a dead upload affordance.

### Backend boundary

The landing site's intake mechanism may use a small purpose-built submission service if needed. That does not relax the Platform requirement for the actual Parcel product's agentic/retrieval/semantic workflow.

The eventual ingestion path for carrier data must normalize into a Platform-compatible evidence/canonical model or another explicitly approved Platform extension. Do not create a hidden Parcel-only RAG corpus behind the intake form.

---

## Parcel-Specific Platform Gaps To Design Before Product Implementation

The current Platform provides the intelligence/runtime foundation, but Parcel requires new product/domain capabilities around it.

### Gap 1: UPS/FedEx are not current canonical source providers

Current core source provider types are centered on Gmail, Google Workspace, and application corrections.

Parcel needs a Platform-compatible ingestion path for:

- UPS invoices / billing exports;
- FedEx invoices / billing exports;
- shipment manifests / shipment records;
- tracking/status events as needed;
- contracts/rate sheets where used;
- carrier rule documents / structured rules;
- customer-uploaded evidence.

Architecture principle:

**Extend Platform-compatible source/canonical ingestion rather than maintaining a Parcel-only evidence database for semantic reasoning.**

Whether this requires a new generic Platform provider type, an application/source adapter, or another narrow Platform extension is a backend-design question for the implementation plan.

### Gap 2: Carrier dispute actions are not current Platform external actions

The Platform action system demonstrates the desired safety properties for Gmail/Google Workspace: closed action schemas, exact previews, bounds, digests, review approval, and durable effects.

Parcel should follow the same philosophy for carrier actions.

Do not let the bounded reasoning Harness directly call carrier APIs or websites.

Potential later flow:

**Case recommendation -> Parcel action proposal -> review/authorization -> Parcel carrier adapter -> durable effect receipt/result -> case update**

The exact implementation belongs in a separate Parcel backend design.

### Gap 3: Carrier-rule corpus and temporal rule semantics

Parcel needs an authoritative or carefully sourced carrier-rule corpus with explicit:

- carrier;
- rule identity;
- effective date;
- supersession/version lineage;
- applicable service/package conditions;
- source citation;
- retrieval/search semantics.

Use Zettel Platform's canonical evidence and temporal graph capabilities for semantic memory/search. Do not create a separate rules vector database.

### Gap 4: Parcel-specific semantic schema

Define Parcel entity/edge types and extraction instructions, then use Platform typed Graphiti APIs.

Do not generalize into a cross-product ontology framework until another product proves the need.

### Gap 5: Credit verification

The landing page sells **verified credits**, so Parcel needs a reliable operational mechanism to identify the posted carrier credit and associate it with the case.

This is product-specific financial reconciliation, not a generic graph/agent capability.

---

## Visual System

### Existing brand values to preserve

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

### Semantic color use

- Green: recovered, accepted, verified positive financial outcome.
- Blue: neutral carrier/shipment/source information.
- Red/orange: challenged or denied state.
- Gray/neutral: missing evidence, ordinary financial and explanatory data.

Do not turn the site into a trading dashboard. Financial and case states must remain understandable without color alone.

---

## Revised Layout Concept

```text
+----------------------------------------------------------------+
| ZETTEL PARCEL                   How it works   What we audit    |
|                                 Pricing        [Free audit]     |
+----------------------------------------------------------------+
| Managed UPS & FedEx parcel audit                               |
|                                                                |
| WE FIND THE SHIPPING CHARGES       +------------------------+  |
| YOU SHOULDN'T HAVE PAID.           | EXAMPLE ZETTEL CASE    |  |
|                                    | original / adjusted    |  |
| Explanation                         | rule / evidence         |  |
| [ Start a free audit ]             | history / action       |  |
| See what we check                  +------------------------+  |
|                                                                |
| Start with invoice | 25% verified credits | $0 = $0           |
+----------------------------------------------------------------+
| WHY SHIPPERS GIVE UP                                           |
| [Same box. Different bill.] [Surcharge without the story]      |
| [$20 every week]          [A denial shouldn't erase evidence]  |
+----------------------------------------------------------------+
| EVERY CHARGE GETS A CASE FILE                                  |
| invoice -> facts -> rule -> evidence -> dispute -> decision -> $|
+----------------------------------------------------------------+
| SAME BOX. DIFFERENT BILL.                                      |
| repeated package history -> unusual adjustment -> closer look  |
+----------------------------------------------------------------+
| HOW ZETTEL WORKS                                               |
| SEND -> AUDIT -> BUILD THE CASE -> RECOVER                     |
+----------------------------------------------------------------+
| DENIED ISN'T THE SAME AS EXPLAINED                             |
| [denial] -> [evidence gap] -> [next action] -> [resolution]    |
+----------------------------------------------------------------+
| WHAT WE AUDIT                                                  |
| [late] [DIM] [duplicates] [residential] [handling] [rates]    |
+----------------------------------------------------------------+
| NO BLACK-BOX SAVINGS SCORE                                     |
| [trace evidence] [rule in effect] [missing stays missing]      |
+----------------------------------------------------------------+
| SIMPLE PRICING                                                 |
|                    25% OF VERIFIED CREDITS                     |
+----------------------------------------------------------------+
| START WITH AN INVOICE, NOT YOUR PASSWORD                       |
+----------------------------------------------------------------+
| FAQ                                                            |
+----------------------------------------------------------------+
| THINK YOUR SHIPPING BILL DESERVES A SECOND LOOK?               |
|                      [ Start free audit ]                       |
+----------------------------------------------------------------+
```

---

## Motion And Interaction

The page should remain restrained.

One orchestrated motion moment is enough: the example Case File may reveal its stages in order on viewport entry, provided reduced-motion preferences are respected and the content remains fully available without animation.

Suggested reveal:

1. Original shipment
2. Carrier adjustment
3. Rule in effect
4. Historical context
5. Evidence state
6. Recommended action / review
7. Later resolution / verified credit in the larger downstream example

Preserve existing production-quality behavior from the current site:

- responsive layout;
- visible keyboard focus;
- semantic buttons and links;
- stable CTA dimensions while interactive/busy;
- no layout-shifting media;
- reduced-motion support;
- mobile navigation parity;
- strong source-link contrast.

---

## FAQ Topics

The initial FAQ should answer:

- What kinds of UPS/FedEx charges do you review?
- How much does Zettel cost?
- What do I need to send you?
- Do I need to give you my carrier password?
- How does Zettel decide a charge is worth reviewing?
- What evidence does Zettel use?
- What happens if evidence is missing?
- What happens if the carrier denies a dispute?
- What if I do not have package photos or scale evidence?
- How do refunds/credits reach me?
- What happens if you find nothing?
- How far back can you audit?
- Do you support labels bought through Shopify, eBay, ShipStation, or another platform?
- Are you affiliated with UPS or FedEx?
- What data do you keep?

The exact answers to carrier-specific windows, third-party platform support, escalation paths, and data retention must come from verified operating rules before publication.

Do not expose internal Platform implementation details in the FAQ unless they directly help a buyer evaluate security, evidence quality, or control and the statement has been reviewed for accuracy.

---

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

Later quality metric:

**verified credits / submitted supported cases**

The page should not optimize for email-list signup because this is intended to be a purchasable managed service, not an early-access waitlist.

---

## Accessibility And Responsive Requirements

Target WCAG 2.2 AA.

- Every interactive element uses native semantics.
- Keyboard focus is visible and never obscured by fixed navigation.
- Problem/card information is not encoded by color alone.
- Case File rows remain readable at 200% zoom.
- On narrow screens, the Case File becomes a vertical timeline rather than horizontally scrolling tiny financial data.
- Any sequential animation respects `prefers-reduced-motion`.
- Source and privacy links have sufficient contrast and usable touch targets.
- Mobile CTA access remains obvious without covering page content.
- Evidence completeness and denial states use explicit text/icon labels in addition to color.

---

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

Supporting educational articles can later target:

- Why did UPS change my package dimensions?
- How do I dispute a UPS shipping charge correction?
- How do FedEx dimensional adjustments work?
- What evidence should I keep for a carrier billing dispute?
- Why did I get an Additional Handling charge?
- How should I document package dimensions before shipping?
- Why can the same package receive different adjustments?

Educational content should use primary carrier sources for factual rules and may use public shipper discussions only as qualitative context.

---

## MVP Landing Page Scope

### Build now

- Parcel-specific navigation
- Hero
- Example Zettel Case File
- Risk-reversal strip
- Reddit-informed problem cards
- Full-context case-file section
- Same-box historical-context section
- Four-step process
- Denial / next-action section
- Audit-category grid
- No-black-box-score trust section
- Public pricing
- Trust/data section
- FAQ
- Final CTA
- Intake popup/form
- Responsive/mobile treatment
- Accessibility/reduced-motion treatment
- CTA/funnel analytics

### Do not build in the landing-page repo yet

- Customer dashboard
- Login
- Automated savings calculator
- Carrier-account OAuth unless required to fulfill the first managed customers
- Packing-station photo capture product
- Automated appeal engine
- Public API
- Interactive AI demo
- Knowledge-graph explorer
- Ontology editor
- Multi-carrier platform beyond verified launch support
- Huge resource center
- Fake customer logos
- Fake recovery statistics
- Fake testimonials

---

## Parcel Backend Design Requirements For The Next Phase

The landing page can be implemented after this design is approved, but the full product requires a separate backend implementation plan/design that respects this boundary.

The next backend design must define:

1. Stable `parcel` product key and product composition factories.
2. Parcel product records and state transitions.
3. UPS/FedEx invoice/shipment/evidence ingestion into Platform-compatible canonical evidence.
4. Parcel semantic entity/edge schema supplied to Platform typed Graphiti.
5. Stable parcel graph identities and temporal versioning rules.
6. Carrier-rule source/version/effective-date model.
7. Retrieval lanes/queries for shipment facts, carrier rules, historical package/case context, and prior outcomes.
8. Evidence completeness rules.
9. Bounded Parcel reasoning prompt and structured output schema using Platform AgentCore.
10. Product review/acceptance behavior.
11. Carrier dispute action adapter and authorization boundary.
12. Denial/next-action workflow.
13. Credit verification/reconciliation.
14. Product-specific deletion/source hooks.
15. Contingency-fee calculation and verified-credit billing workflow.
16. Verification/e2e tests demonstrating no direct Parcel graph/model/search stack exists.

### Suggested retrieval perspectives

Parcel may conceptually retrieve across four perspectives while using Platform retrieval/search machinery:

- **This shipment** — exact shipment/invoice/evidence identity.
- **Carrier rules** — applicable rules and effective dates.
- **Your history** — similar package/shipment/charge history.
- **Prior cases** — relevant dispute decisions and outcomes.

These are product concepts, not a mandate for a specific public API or exactly four internal queries.

---

## Operational Truth Gate Before Launch

Because the page sells a managed financial service, verify before corresponding copy goes live:

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
12. Which carrier/rule sources are authoritative enough to drive case recommendations.
13. How effective dates and superseded rules are represented.
14. Which Parcel case actions require human review.
15. How a degraded or incomplete evidence state is surfaced to operators/customers.

If any item is not verified, use narrower wording rather than inventing a capability.

---

## Implementation Notes For Existing Website

The current home page is already split into reusable sections such as Hero, Steps, Problem, Solution, FeatureGrid, FinalCTA, TopNav, and Footer. Implementation should reuse the established design language and interaction patterns while allowing parcel-specific section components where the content model materially differs.

Do not force a one-to-one clone of existing components if that makes the parcel story awkward. Reuse visual primitives and tokens; create parcel-specific components for:

- Zettel Case File;
- historical-package comparison;
- denial/next-action timeline;
- evidence completeness;
- audit-category cards.

The current site uses a static Next.js export. Keep the landing page compatible with that architecture unless the intake/upload flow creates a verified need for a different runtime boundary.

The existing popup CTA work should be reused where appropriate, but invoice upload introduces privacy and file-handling requirements that must be designed before implementation.

The landing-page repo must not attempt to implement Zettel Platform or duplicate its backend behavior.

---

## Competitor-Inspired Patterns To Borrow

- **AuditShipment:** free-audit CTA, immediate no-upfront-cost reassurance, clear what-we-audit taxonomy, transparent pricing/trust near the bottom.
- **LateShipment:** visible contingency pricing, strong explanation of denial escalation, proof near the top, and an explicit recovery-to-optimization narrative for future expansion.
- **Refund Retriever:** extremely simple process explanation, credits returning directly to the carrier account, no setup/monthly framing.
- **71lbs:** direct explanation of why account access is needed and where refunds go.
- **Sifted:** educational explanation for buyers who do not yet know what a parcel audit is; clear benefit framing around eliminating manual review.
- **Reveel:** explain exactly where/how/why a charge was wrong; use specific case evidence rather than vague "AI savings" language.
- **TransImpact:** when real outcomes exist, show recovered dollars as the proof rather than estimated opportunity.
- **Shipware:** explain the scope of invoice-line checks and emphasize that the service removes manual claim work.

---

## Patterns To Avoid

- Large unsupported market-size or error-rate claims.
- Auto-rotating logo walls with no relevance to the initial SMB buyer.
- Dense enterprise navigation on a single-product validation page.
- Hero copy that begins with "AI-powered."
- Generic dashboards full of charts that do not explain one disputed charge.
- Decorative network/knowledge-graph art that exposes implementation without clarifying value.
- Savings calculators that imply certainty from weak assumptions.
- "We recover every dollar" language.
- Carrier-blaming language that undermines credibility.
- Claiming a dispute is valid solely because a Reddit user believed it was valid.
- Claiming prior similar shipments prove a new adjustment is wrong.
- Pretending missing evidence is present.
- Pretending degraded graph/search knowledge is complete.
- Building or marketing a second Parcel-only graph/search/agent stack.

---

## Design Success Criteria

A qualified visitor should understand within roughly ten seconds:

1. This is for UPS/FedEx shippers.
2. Zettel audits shipping bills and finds charges worth reviewing.
3. Zettel builds an understandable evidence-backed case rather than only a savings score.
4. Zettel handles the repetitive dispute/recovery work.
5. Zettel preserves evidence and does not stop conceptually at a first denial.
6. The customer can start with one invoice.
7. There is no setup/monthly fee for the managed MVP.
8. Zettel charges 25% only after a verified credit.

A shipper who has experienced a confusing adjustment should think:

**"Yes. This is the exact problem I keep having."**

A technical reviewer should also be able to map the public story to the Zettel Platform boundary without finding a hidden duplicate intelligence stack.

---

## Verification Plan For Landing-Page Implementation

Before claiming landing-page implementation complete:

- Run repository lint, typecheck/test commands if present, and production build.
- Verify static export still succeeds.
- Exercise desktop and narrow-mobile layouts.
- Exercise mobile navigation and all anchor links.
- Verify both CTAs behave as designed.
- Verify the audit-intake flow's success, failure, validation, keyboard, and privacy-link states.
- Verify reduced-motion behavior.
- Verify the Case File stays readable without animation.
- Verify problem cards and audit-category cards remain understandable without color.
- Verify evidence-completeness states remain understandable without color.
- Check all factual carrier claims against current UPS/FedEx primary sources.
- Check every competitor/Reddit-inspired statement on the live page: anecdotes should influence UX/copy but not be presented as population-level facts.
- Confirm illustrative case data is visibly labeled **Example case**.
- Confirm there are no fake customer outcomes, logos, or testimonials.
- Confirm pricing is consistent everywhere.
- Confirm third-party label support is not implied unless implemented.
- Confirm privacy/data-handling copy matches actual behavior.
- Confirm no landing-page copy implies autonomous carrier actions not implemented by Parcel.
- Confirm no landing-page copy claims standards-based ontology reasoning not implemented by Platform.

---

## Verification Principles For Future Parcel Backend

The later Parcel backend implementation should include evidence that:

- Parcel uses Zettel Platform product-extension factories.
- Parcel work uses Platform durable product work/operations.
- Parcel reasoning uses Platform `StructuredAgentPort` / AgentCore boundary.
- Parcel graph writes/search use Platform `GraphMemory` / retrieval boundaries rather than direct Graphiti clients.
- Parcel canonical evidence uses Platform-compatible provenance/citation records.
- Parcel uses workspace-scoped product records.
- Parcel preserves knowledge-degraded/incomplete behavior rather than masking it.
- Carrier actions cannot be performed directly by the bounded AgentCore Harness.
- Parcel does not introduce another vector database, graph database, model router, RAG stack, or generic ontology engine.

---

## Out Of Scope

- Implementing the landing page in this design phase.
- Implementing the Parcel backend in this design phase.
- Changing the managed-service price beyond the approved 25% launch offer.
- Building the parent apex page.
- Performing the drayage subdomain migration.
- Building a customer dashboard.
- Building a packing evidence-capture application.
- Supporting Shopify/eBay/ShipStation-mediated adjustments without a separately validated workflow.
- Defining legal terms of service or data-retention policy in this design document.
- Replacing Zettel Platform's graph/search/agent architecture.
- Building a generic cross-product ontology framework without evidence from more than one product.

---

## Final Design Principle

**Show one confusing charge becoming an understandable case, then becoming a verified credit.**

The competitive category already knows how to say "we audit invoices." Zettel should make the hidden work visible:

**what changed -> which rule applied -> what evidence exists -> what history matters -> what is missing -> what was submitted -> what the carrier said -> what happened next -> whether money actually came back.**

The Zettel Platform makes that story technically coherent through durable operations, canonical evidence, temporal typed graph memory, provenance-aware retrieval, review, and bounded structured reasoning.

The Parcel product adds the shipping-specific semantics and operating workflow around that shared foundation.

That combination is the product differentiation:

**not another black-box savings score, and not another generic AI auditor — a managed, evidence-backed case system for parcel recovery.**
