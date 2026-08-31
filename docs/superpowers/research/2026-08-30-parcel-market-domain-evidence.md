# Zettel Parcel Market And Domain Evidence

Date: 2026-08-30  
Status: Research closure artifact for landing-page design; operational/domain truth remains gated  
Applies to:
- `docs/superpowers/specs/2026-08-30-parcel-audit-landing-page-design.md`
- `docs/superpowers/specs/2026-08-30-parcel-audit-ontology-appendix.md`
- `docs/superpowers/specs/2026-08-30-parcel-audit-research-visuals-addendum.md`
- `docs/superpowers/plans/2026-08-30-zettel-parcel-landing-page.md`
- `docs/superpowers/plans/2026-08-30-zettel-parcel-research-visuals-supplement.md`

## Research Closure Decision

The research is sufficient to proceed with **landing-page implementation** provided the page obeys the truth gates in the design package:

- public carrier-specific claims come from primary carrier sources;
- public market statistics come from primary carriers or non-competing industry research;
- competitor research is internal design/product input only and never appears on the public Parcel page;
- audit categories remain hidden until Zettel has validated the real operating workflow for that category;
- the example Case File remains visibly illustrative;
- the ontology remains a candidate until qualified domain experts approve it;
- customer-specific contracts and negotiated rates remain required case inputs where they modify published carrier terms.

This artifact does **not** declare the Parcel backend, operating procedures, or ontology production-ready. It closes the information-gathering gap for designing and building a truthful landing page.

---

## Public-Site Competitor Exclusion

Competitors may be researched to learn category conventions, buyer expectations, pricing models, onboarding patterns, trust concerns, and product gaps.

They must **not** appear on the public Zettel Parcel website.

Do not render:

- competitor company or product names;
- competitor logos or screenshots;
- comparison tables against named competitors;
- competitor pricing;
- competitor recovery totals;
- competitor-originated error rates or savings statistics;
- outbound links to competitor domains;
- copy such as “unlike X,” “cheaper than X,” or “X only does Y.”

Competitor claims may inform an internal design decision only after the decision is independently supportable. A competitor claim does not become a Zettel fact by being paraphrased.

Implementation should enforce this with an automated scan of `src/app/parcel` and `public/diagrams/parcel` for known competitor names/domains.

---

## Public Validation Statistics

The existing drayage landing page uses a small number of sourced statistics to establish that the pain is economically meaningful. Zettel Parcel should use the same pattern: **three high-signal facts, each with a visible source link, and no unsupported “invoice error rate.”**

### Approved public stat 1 — U.S. parcel scale

**Display value:** `23.1B`

**Suggested label:** `U.S. parcels shipped in 2025`

**Suggested supporting copy:**

> U.S. parcel volume reached 23.1 billion shipments in 2025, or about 732 parcels every second. At that scale, shipment-level billing is not a small-data problem.

**Source:** Pitney Bowes Parcel Shipping Index 2026, reporting 2025 U.S. parcel volume.  
https://www.pitneybowes.com/us/shipping-index.html

**Source facts captured 2026-08-30:**

- 23.1 billion U.S. parcels in 2025;
- 3.3% year-over-year volume growth;
- 732 parcels generated per second;
- 171 parcels per household.

Use `23.1B` as the primary public statistic. The additional figures may support accessible copy or source notes but should not turn the section into a dense dashboard.

### Approved public stat 2 — 2026 carrier rate pressure

**Display value:** `5.9% / 5.9%`

**Suggested label:** `average 2026 rate increases announced by UPS and FedEx`

**Suggested supporting copy:**

> UPS implemented a separate average 5.9% net increase in base and accessorial rates for 2026, and FedEx increased parcel shipping rates by an average of 5.9% effective January 5, 2026.

**UPS source:** United Parcel Service 2025 Form 10-K.  
https://investors.ups.com/sec-filings/all-sec-filings/content/0001628280-26-008432/ups-20251231.htm

UPS states that in December 2025 it implemented a separate **average 5.9% net increase in base and accessorial rates** for Air and Ground products, expected to contribute to 2026 revenue per piece.

**FedEx source:** FedEx earnings release / 2026 rate increase announcement.  
https://investors.fedex.com/news-and-events/earnings-releases/default.aspx

FedEx states that effective January 5, 2026, FedEx parcel and FedEx Freight LTL shipping rates increased by an **average of 5.9%**.

**Copy guard:** Do not imply every customer's actual spend increased exactly 5.9%. Customer mix, contracts, accessorials, fuel, zones, service levels, packaging, and other factors change actual spend.

### Approved public stat 3 — billing-data complexity

**Display value:** `250 → 270`

**Suggested label:** `columns in UPS's standardized Global Flat File CSV`

**Suggested supporting copy:**

> UPS says its Global Flat File billing CSV will expand from 250 columns to 270 columns in September 2026. Parcel billing complexity is literally encoded into the source data.

**Source:** UPS Billing Center / Manage Billing and Invoices.  
https://www.ups.com/us/en/business-solutions/ups-billing

**Source fact captured 2026-08-30:** UPS states that as of September 2026 the CSV header row file increases from **250 to 270 columns** and tells customers with automated parsing or validation processes to update their integrations.

### Optional supporting fact — rule volatility

Do not make this a fourth headline statistic unless layout testing shows it adds value.

**Fact:** UPS states that U.S. Ground Domestic and Domestic Air fuel surcharges are adjusted **weekly**.  
https://www.ups.com/us/en/support/shipping-support/shipping-costs-rates/fuel-surcharges

**Use:** reinforces why Zettel must store the rule/rate state in effect for the shipment rather than treat today's page as timeless truth.

---

## Statistics We Explicitly Reject For The Public Site

The research found many attractive parcel-audit statistics, but the available sources are competitors or adjacent audit vendors. They must remain internal-only unless independently validated later.

Do not publish these as Zettel market facts:

- “3–5% of parcel spend is billing errors” — currently surfaced by TransImpact;
- “80% of businesses are overpaying” — currently surfaced by Intelligent Audit Catalyst;
- “1–9% of invoice value is recoverable” — currently surfaced by Shipware;
- “75% of parcel credits go unclaimed” / `$1.25B` unclaimed — currently surfaced by Reveel;
- “one in five invoices has an error” or similar vendor-origin claims;
- vendor recovery percentages, customer savings percentages, ROI, or unclaimed-refund totals;
- Reddit anecdotes converted into population-level rates.

Internal vendor research may motivate a customer-discovery question, but it is not public statistical provenance.

---

## Current Carrier Source Register

Source status values:

- **FROZEN** — exact artifact URL/version/effective date captured; retain a content hash when ingested by the product.
- **LIVE** — carrier webpage changes over time; capture observation time and, for case decisions, preserve the version/snapshot used.
- **ACQUIRE** — source is known to exist but the exact current artifact must be acquired during product implementation or carrier onboarding.
- **CUSTOMER** — must come from the customer's own account/agreement; public research cannot supply it.

### UPS

| Source | Status | Why it matters | Current research note |
|---|---|---|---|
| 2026 UPS Tariff/Terms and Conditions of Service — U.S. | FROZEN | invoice adjustments, billing, shipping charge corrections, service guarantee, claims, definitions | Effective **April 17, 2026**. Exact artifact: https://assets.ups.com/adobe/assets/urn:aaid:aem:c6bf8a2f-018f-4aa0-838b-ffc1a75eb1d9/original/as/terms-carriage-us-en.pdf |
| 2026 UPS Daily Rate and Service Guide — U.S. | FROZEN | rates, zones, accessorial definitions, billable-weight rules, service-specific rates | Exact artifact currently linked by UPS: https://assets.ups.com/adobe/assets/urn:aaid:aem:356d938a-4f0a-4c71-b50e-bdd890f50b47/original/as/daily-rates-us-en.pdf |
| UPS Service Terms update page | LIVE | identifies when the Tariff/Terms and Rate Guide have changed | https://www.ups.com/stc/doWork |
| UPS Shipping Costs and Rates | LIVE | new rate/surcharge effective dates | https://www.ups.com/us/en/support/shipping-support/shipping-costs-rates |
| UPS Fuel Surcharges | LIVE | weekly shipment-date-sensitive fuel surcharge | https://www.ups.com/us/en/support/shipping-support/shipping-costs-rates/fuel-surcharges |
| UPS Service Guarantee | LIVE | exact services currently guaranteed/suspended | https://www.ups.com/us/en/support/shipping-support/legal-terms-conditions/ups-service-guarantee |
| UPS Avoid Shipping Charge Corrections | LIVE | correction categories and current package criteria | https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight/avoid-additional-shipping-fees |
| UPS Billing Center | LIVE | invoice tooling, CSV formats, current schema-change notices | https://www.ups.com/us/en/business-solutions/ups-billing |
| UPS Billing Data Dictionary / header row / charge-code descriptions | ACQUIRE | exact invoice-field meanings and source-code mappings | UPS Billing Center advertises these resources. Acquire the exact current dictionary/header/change-code artifacts before production normalization rather than relying on a copied historic version. |
| Customer UPS agreement, amendments, incentive/rate schedules, waivers | CUSTOMER | may override or modify public commercial terms/rates | Required whenever applicability or amount depends on negotiated account terms. |

### UPS invoice-adjustment truth captured from the April 17, 2026 terms

Section 53.1.a states that general invoice-adjustment requests — examples include incorrect rate, billable weight, account number, failure to tender, service type, shipping charge correction, or duplicate payment — must be received within **180 days of receiving the contested invoice**, absent another specified rule.

Section 53.1.c requires the notice to include:

- date of shipment;
- tracking number for each disputed charge;
- reason for the disputed charge.

The terms also require a good-faith basis for package-specific adjustment requests and permit UPS to deny unsupported batch/multiple requests. This is strong support for Zettel's evidence-backed, case-specific design.

**Important:** 180 days is not a universal refund window. Service-guarantee, fraud, loss/damage, and other claim types have their own rules.

### UPS current guarantee truth captured 2026-08-30

UPS currently states that its Service Guarantee is active for a limited set of domestic Air and International services and **remains suspended for all other UPS shipments/services not listed**. The guarantee is explicitly subject to change.

Therefore, public copy may say Zettel reviews **refund-eligible service failures**; it must not promise refunds for every late UPS delivery.

### FedEx

| Source | Status | Why it matters | Current research note |
|---|---|---|---|
| 2026 FedEx Service Guide PDF | FROZEN | rates, terms, dimensional/chargeable weight, surcharge rules, U.S. billing terms | Effective Jan. 5, 2026; **updated July 20, 2026**. https://www.fedex.com/content/dam/fedex/us-united-states/services/Service_Guide_2026.pdf |
| FedEx Service Guide home | LIVE | indicates current guide and upcoming revisions | Currently previews another update effective **Sept. 11, 2026**. https://www.fedex.com/en-us/service-guide.html |
| FedEx Shipping Rate Changes | LIVE | in-year surcharge/rate changes | Updated Aug. 18, 2026 in current research. https://www.fedex.com/en-us/shipping/rate-changes.html |
| FedEx Money-Back Guarantee | LIVE | currently eligible services, suspensions, temporary commitment changes | https://www.fedex.com/en-us/service-guide/money-back-guarantee.html |
| FedEx Billing Online | LIVE | billing/dispute tooling and EDI resources | https://www.fedex.com/en-us/billing-online.html |
| FedEx Invoice Download File Data Dictionary | FROZEN + VERIFY | raw invoice fields: account, tracking, charges, service, actual/rated weight, DIM dimensions/divisor, original/corrected address, zone, multi-piece IDs, etc. | https://www.fedex.com/content/dam/fedex/us-united-states/accounts/images/US_FBO_Download_Data_Dictionary.pdf. Artifact is older; verify current schema before production ingestion. |
| FedEx CSV Invoice and Remittance Data File Implementation Guide | FROZEN + VERIFY | invoice/remittance/adjustment request/adjustment resolution workflow | https://www.fedex.com/content/dam/fedex/us-united-states/shipping/images/CSV_Format_Express-Ground_Invoice_and_Remittance_Implementation_Guide.pdf. Guide says to contact FedEx to ensure the latest version before implementation. |
| FedEx EDI Codes Dictionary | ACQUIRE | adjustment reason and denial/reject code definitions | The CSV guide says this is a separate spreadsheet and directs requests to `EDI-InvandRemit@fedex.com`. Acquire before production mapping. |
| Customer FedEx agreement, amendments, rate sheets, waivers | CUSTOMER | may modify public terms/rates | Required whenever negotiated contract terms govern a case. |

### FedEx source facts that validate the case model

The current FedEx 2026 Service Guide states that the published Guide forms the contract of carriage **unless modified under a separate agreement**. This validates keeping `CustomerCarrierAgreement` distinct from public carrier rules.

The current FedEx terms state that overcharge adjustment requests generally must be received within **180 days after the original invoice date** (or ship date for certain prepaid shipments) and route service-failure requests to separate Money-Back Guarantee rules.

FedEx's Billing Online data dictionary explicitly contains fields for:

- invoice/account identity;
- tracking ID;
- transportation and net charge amounts;
- service type;
- shipment and proof-of-delivery dates/times;
- actual weight;
- rated weight;
- number of pieces;
- dimensional length/width/height/divisor/unit;
- original and corrected recipient-address information;
- zone and cross-reference tracking IDs.

This strongly supports the ontology's decision to preserve measurement roles, multi-piece identity, address correction context, and billing/shipment identity as separate concepts.

FedEx's CSV Invoice and Remittance guide shows a formal electronic workflow:

1. FedEx transmits invoices.
2. Customer or Freight Bill/Audit/Pay provider transmits remittance and/or invoice-adjustment requests.
3. FedEx returns an Invoice Adjustment Resolution Response.
4. Customer provides payment.

The response-file schema includes resolution codes such as **Credit**, **Denial**, **Refund**, **Reject**, and **Other**, plus denial/reject reason, requested amount, amount due, and amount adjusted. This provides authoritative support for treating a carrier response/decision as a durable sourced event rather than collapsing the workflow into a Boolean `refunded` field.

### FedEx current guarantee truth captured 2026-08-30

FedEx says its U.S. Money-Back Guarantee currently applies only to a listed subset of time-definite domestic and international services and remains suspended for other services. FedEx also publishes dated suspensions/reinstatements and temporary delivery-commitment changes.

Therefore, service-failure eligibility must be shipment-date/service-specific and time-aware.

---

## Standards Source Register

These are modeling references rather than carrier rule authorities:

- Stanford, *Ontology Development 101*: https://protege.stanford.edu/publications/ontology_development/ontology101-noy-mcguinness.html
- OASIS UBL 2.4: https://docs.oasis-open.org/ubl/os-UBL-2.4/UBL-2.4.html
- GS1 EPCIS/CBV 2.0.1: https://ref.gs1.org/standards/epcis/2.0.1/
- QUDT: https://qudt.org/doc/DOC_SCHEMA-QUDT.html
- UNECE Recommendation No. 20 — Codes for Units of Measure Used in International Trade
- W3C OWL-Time: https://www.w3.org/TR/owl-time/
- W3C SKOS: https://www.w3.org/TR/skos-reference/
- W3C PROV-O: https://www.w3.org/TR/prov-o/
- W3C SHACL: https://www.w3.org/TR/shacl/

Use them to avoid inventing generic logistics/event/unit/provenance semantics. Do not claim formal standards conformance until actual mappings/serializations are validated.

---

## Internal Competitor Profile — Never Render On The Public Website

The purpose of this section is to learn the category's conversion grammar and identify where Zettel's product story must be stronger. It is not website copy.

### AuditShipment

Sources:
- https://www.auditshipment.com/
- https://www.auditshipment.com/pricing.html

Current pattern:
- contingency pricing with published spend bands;
- free audit/no setup/no subscription framing;
- 50+ error/service-failure categories;
- automated claim filing/tracking and dashboard.

Internal lesson:
- transparent contingency pricing is expected;
- Zettel should not compete through “we also have lots of checks.” Lead with an understandable evidence-backed case and low-friction invoice-first entry.

### LateShipment OneAudit

Sources:
- https://www.lateshipment.com/platform/oneaudit/
- https://www.lateshipment.com/lspricing/

Current pattern:
- 35% contingency;
- large audit-checkpoint count;
- automated claim submission;
- explicit human escalation after denials.

Internal lesson:
- denial handling is a buyer-visible category expectation. Zettel's differentiation should be the durable evidence/decision trail and explicit uncertainty, not simply “we escalate denials.”

**Do not adopt OneAudit's advertised generic claim-window wording. Carrier windows differ by category; use primary carrier rules.**

### Refund Retriever

Sources:
- https://www.refundretriever.com/how-it-works
- https://www.refundretriever.com/pricing/

Current pattern:
- simple end-to-end process;
- refund credited to customer's carrier account;
- no setup/monthly framing;
- published contingency bands of 50%, 45%, and 40% for the first three spend tiers currently shown.

Internal lesson:
- buyers value transparent economics and direct-to-account credits. Zettel's 25% launch offer is legible, but do not market “cheapest.”

### 71lbs

Source:
- https://www.71lbs.com/faq/

Current pattern:
- contingency model;
- automation plus customer-success/operations support;
- refund credits return directly to the customer's carrier account;
- weekly recovery summaries;
- no long-term contract.

Internal lesson:
- “money reaches your carrier account first, provider bills separately” is familiar and trust-building. Use only if Zettel's actual workflow matches it.

### Sifted

Source:
- https://sifted.com/parcel-audit/

Current pattern:
- educational “what is a parcel audit” framing;
- compares invoices against rates/contracts and service guarantees;
- explicitly calls out address correction, residential surcharge, service failure, and manifested-not-shipped.

Internal lesson:
- a portion of traffic may not know the category. Zettel should explain the job plainly without drowning the page in carrier vocabulary.

### Reveel

Source:
- https://reveelgroup.com/solutions/parcel-audit-solution/

Current pattern:
- free parcel audit recovery;
- rate audit, billing audit, claims automation, service audit;
- continuous rather than periodic audit positioning;
- product surfaces recovered, pending, and denied disputes;
- emphasizes where/how/why a charge differs from the agreement.

Internal lesson:
- “free” means Zettel cannot rely on contingency price alone as differentiation. Evidence/provenance, managed case clarity, and invoice-first onboarding matter more.

### Shipware

Source:
- https://shipware.com/solutions/invoice-audit-recovery/

Current pattern:
- 65-point audit;
- managed claim filing;
- gainshare model;
- contract/rate, duplicate, surcharge, dimension/weight and service-failure coverage.

Internal lesson:
- large check counts are commodity category language. Avoid a “we have N audit points” arms race unless Zettel can define and verify every point.

### TransImpact Parcel Spend Intelligence

Source:
- https://transimpact.com/solutions/parcel-spend-intelligence/

Current pattern:
- 60-day free trial using real parcel data;
- customer keeps 100% of recovered refunds during trial;
- rate audit against contracts/discounts/rules;
- AI assistant reads carrier contracts, billing rules, and shipment history and explains what happened/what to do next;
- one-place parcel data and analytics.

Internal lesson:
- “AI explains the charge using contracts and shipment history” is no longer distinctive by itself. Zettel's stronger story is the persistent source-backed **case**, rule effective time, evidence gaps, durable decisions, human control, and verified outcome.

### Intelligent Audit Catalyst

Sources:
- https://www.intelligentaudit.com/products/catalyst-for-smbs
- https://www.intelligentaudit.com/catalyst/pricing

Current pattern:
- explicitly targets growing businesses;
- One-rate tier aimed at roughly $250K–$3M annual parcel spend;
- 90-day free trial;
- parcel audit/refund recovery/dashboards, with contract/rate audit in broader tiers.

Internal lesson:
- the SMB/growing-shipper wedge is validated by an established player. Zettel should stay simple and avoid enterprise procurement language.

### Green Mountain Technology

Sources:
- https://www2.greenmountaintechnology.com/target
- https://resources.greenmountaintechnology.com/process-automation

Current pattern:
- enterprise/large-shipper Parcel Spend Management;
- starts with parcel audit/invoice automation and expands to analytics, optimization, network improvement, and contract management.

Internal lesson:
- Zettel should avoid enterprise breadth at launch. A narrow managed recovery wedge with a credible case system is easier to understand and deliver.

### Lojistic

Source:
- https://www.lojistic.com/pricing

Current pattern:
- free invoice auditing/analytics;
- 29% contingency recovery tier;
- lower contingency rates paired with paid monthly tiers;
- longer data history and carrier connections.

Internal lesson:
- 25% is competitive but not uniquely “lowest.” Public pricing should emphasize transparency and verified-credit billing, not a market-superlative claim.

### ShipSigma

Sources:
- https://shipsigma.com/parcel-invoice-audit
- https://shipsigma.com/parcel-invoice-audit-lp

Current pattern:
- 50+ audit points;
- identifies, submits, and verifies claims;
- contract compliance and weekly auditing;
- late shipment, invalid surcharge, and lost/damaged coverage.

Internal lesson:
- “verify the credit” is not unique on its own. Zettel needs to make the complete source-backed case and uncertainty visible.

### Transportation Insight

Source:
- https://transportationinsight.com/solutions/parcel-audit-payment/

Current pattern:
- invoice, service, and compliance audits;
- consolidates base rate and surcharges associated with a package into one view;
- validates charges against carrier agreements and discount-tier applicability;
- recovery and closed-loop reporting.

Internal lesson:
- contract-level audit and a consolidated package charge view are established buyer expectations. Zettel's Case File should make the governing agreement/rule and evidence trail more legible, not omit them.

### Competitive conclusion

The category already contains:

- free audits;
- free recovery offerings;
- 29–50%+ contingency models;
- automated claim submission;
- credit verification;
- human denial escalation;
- contract/rate validation;
- AI explanations using contracts and shipment history;
- dozens or hundreds of advertised checks.

Therefore Zettel Parcel should **not** position itself as “the AI parcel auditor,” “the cheapest audit,” “the most audit points,” or “the only one that verifies refunds.”

The defensible launch differentiation is the combination of:

1. low-friction invoice-first managed entry;
2. an understandable case file rather than a black-box savings score;
3. source-backed evidence and native provenance;
4. rule/version/effective-time awareness;
5. visible missing evidence and uncertainty;
6. durable denial/decision history;
7. bounded AI proposals with human control;
8. verified financial outcomes;
9. Zettel Platform as the reusable intelligence/provenance foundation behind the vertical.

---

## Public Statistics Section Design Guidance

The Parcel page should mirror the drayage page's credibility pattern without copying its visual implementation exactly.

Recommended section location: after the initial risk-reversal/hero context and before or within **Why shippers give up**, so the visitor sees scale before anecdotal pain.

Recommended treatment:

- three cards on desktop, stacked on mobile;
- one large statistic per card;
- one sentence explaining why it matters;
- visible source label linked to the exact source;
- no chart requiring hover to understand;
- no competitor source;
- no population-level inference beyond what the cited source says.

Suggested section headline:

**Parcel billing is a moving target at massive scale.**

Suggested subhead:

**Billions of shipments, annual rate changes, and hundreds of billing fields create a lot of places for one confusing charge to hide.**

Do not say the scale proves carriers make mistakes. It proves the domain is high-volume and structurally complex — enough to justify a systematic audit workflow.

---

## What Public Research Cannot Resolve

These remain product/onboarding inputs rather than web-research gaps:

- a customer's executed UPS/FedEx agreement;
- account-specific incentives, discounts, tier thresholds, minimums, waivers, caps, and amendments;
- negotiated service-guarantee modifications;
- customer-specific authorization for Zettel to act;
- historical customer invoice formats or account-specific billing behavior;
- internal packing/WMS evidence;
- the customer's actual credit-posting/reconciliation pattern;
- carrier-side facts not exposed through the customer's available records;
- exact launch dispute/escalation procedures until tested in live or sanctioned carrier workflows.

The backend must therefore preserve a source-precedence decision rather than assume published list terms always control.

---

## Operational Evidence Still Required Before Enabling Audit Categories

For each carrier/category shown on the public site, collect a reviewed operating packet containing:

1. exact authoritative rule/version/effective interval;
2. source billing fields/codes;
3. minimum facts required to identify a candidate;
4. required and optional evidence;
5. deterministic calculations and rounding;
6. exclusions/waivers/contract overrides;
7. submission method and authorization;
8. deadline/window applicable to that category;
9. response/denial reason capture;
10. evidence supplementation or next-action behavior;
11. credit/adjustment reconciliation method;
12. positive, negative, boundary, ambiguous, missing-evidence, denial, and credit examples;
13. domain-expert approval.

Until that packet exists, `launchState` remains `hidden` in the landing-page implementation.

---

## Research Readiness Summary

### Ready for landing-page implementation

- buyer/category problem framing;
- competitor-informed conversion patterns;
- public contingency pricing choice;
- invoice-first onboarding position;
- source/evidence/uncertainty differentiation;
- Case File information architecture;
- denial/decision/credit lifecycle concept;
- three non-competitor public validation statistics;
- primary UPS/FedEx source families and several exact current artifacts;
- standards-informed ontology starting model;
- Zettel Platform ownership boundary.

### Not yet production-authoritative

- expert-approved ontology release;
- all carrier code mappings;
- exact current UPS Billing Data Dictionary artifact;
- current FedEx EDI Codes Dictionary;
- every carrier/category operating procedure;
- every escalation path;
- customer-specific contracts/rates;
- proof that all candidate public audit categories can be reliably recovered by Zettel.

Those are explicitly implementation/operations gates, not reasons to postpone building the truthful landing page.

---

## Final Research Principle

**Use competitors to learn the category. Use authoritative sources to state facts. Use real Zettel operating evidence to make promises.**

For the public page, credibility should come from primary/independent source links and a clear product demonstration — never from named competitor comparison or a recycled vendor statistic.