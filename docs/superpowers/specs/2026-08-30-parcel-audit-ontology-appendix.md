# Zettel Parcel Source-Grounded Ontology Appendix

Date: 2026-08-30  
Parent design: `docs/superpowers/specs/2026-08-30-parcel-audit-landing-page-design.md`  
Status: Normative design appendix; candidate ontology pending domain-expert validation; implementation not started

## Purpose

This appendix defines how Zettel Parcel will create and govern the domain ontology that supports the landing-page promise:

> One confusing carrier charge becomes an understandable, evidence-backed case and, when successful, a verified credit.

This document is part of the design-review gate for the landing page and for the later Parcel backend. The landing page may use ontology-derived concepts in its examples and copy, but the ontology itself is not considered authoritative until qualified domain experts review and approve it.

The ontology must be implemented through the shared **Zettel Platform** typed semantic, graph, retrieval, provenance, operation, and review boundaries. Parcel owns the parcel-domain vocabulary and policy; it must not build a parallel graph, ontology, search, RAG, model, memory, or provenance stack.

---

## Core Decision: AI Is An Assistant, Not The Ontology Authority

An LLM may help accelerate ontology work, but it may not define the accepted domain model by itself.

Stanford's *Ontology Development 101* describes ontology development as work performed with domain experts, emphasizes that there is no single correct model, and treats development as an iterative process evaluated through applications and discussion with experts. It recommends beginning with domain and scope, the questions the ontology must answer, intended users and maintainers, reuse of existing models, important terms, class/property definitions, constraints, and instances.

Accordingly, all AI-produced ontology content has the status:

**candidate proposal requiring source mapping and human approval**

### AI may assist with

- extracting candidate terms and aliases from authoritative documents;
- drafting competency questions;
- proposing class/property candidates;
- proposing mappings between carrier-specific terms and normalized concepts;
- detecting duplicate names, missing definitions, possible cycles, or inconsistent cardinalities;
- generating positive, negative, boundary, and ambiguous test fixtures from expert-approved definitions;
- comparing ontology versions and identifying terms affected by a changed source;
- preparing review packets for domain experts.

### AI may not

- approve a class, relation, hierarchy, synonym, mapping, rule, or constraint;
- decide that two carrier terms mean the same thing merely because their names are similar;
- convert a Reddit story, support answer, competitor page, or model inference into authoritative domain truth;
- choose which contract or carrier rule governs a shipment without explicit applicability logic;
- silently reconcile contradictory measurements, rates, dates, or carrier statements;
- promote an inferred fact into an authoritative customer or carrier fact;
- invent a missing carrier code, deadline, formula, appeal path, or eligibility requirement;
- mark a case ready for action when the expert-approved evidence constraints are not met.

### Required human roles

The same person may fill more than one role only when they genuinely have the necessary expertise.

1. **Small-parcel billing/recovery domain expert**  
   Validates invoice, adjustment, surcharge, refund, dispute, denial, appeal, and credit semantics against real operating practice.

2. **Carrier-specific subject-matter reviewer**  
   Validates UPS and FedEx terms separately, including account-specific and service-specific differences. One carrier's terminology must not be projected onto the other.

3. **Knowledge engineer / ontology reviewer**  
   Validates class-versus-instance choices, hierarchy, identity, domain/range, cardinality, constraints, versioning, provenance, and competency-question coverage.

4. **Parcel operations owner**  
   Validates that the model supports the actual managed-service workflow and that landing-page statements are operationally deliverable.

5. **Legal/commercial reviewer when needed**  
   Reviews interpretations of customer contracts, negotiated rates, authorizations, and carrier terms when the product would act on those interpretations.

No ontology release may become production-authoritative solely because an engineer or model generated it.

---

## Authoritative Source Strategy

The ontology should reuse established semantics where they fit and derive carrier-specific concepts from primary carrier materials. It should not invent a universal logistics vocabulary from scratch.

### Methodology source

- Stanford, Noy and McGuinness, *Ontology Development 101: A Guide to Creating Your First Ontology*  
  https://protege.stanford.edu/publications/ontology_development/ontology101-noy-mcguinness.html

This source governs the development process: define domain and scope, specify the questions the ontology must answer, reuse existing models, enumerate terms, define classes/properties/constraints, instantiate examples, and iterate with domain experts and applications.

### Carrier-domain sources

#### UPS

- Current U.S. UPS Terms and Conditions of Service / Tariff in effect for the shipment date  
  https://www.ups.com/assets/resources/webcontent/en_US/terms-carriage-us-en.pdf
- UPS shipping-charge-correction guidance  
  https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight/avoid-additional-shipping-fees
- UPS Billing Center and Billing Data Dictionary resources  
  https://www.ups.com/us/en/business-solutions/ups-billing
- Applicable UPS rate/service guides, account contracts, charge-code descriptions, dispute procedures, and guarantee notices effective on the shipment date

UPS materials supply carrier-specific concepts such as billable weight, dimensional weight, shipping charge correction, Additional Handling, residential classification, incorrect weight, Large Package, invoice adjustment, service guarantee, claim/request windows, and billing-data fields.

#### FedEx

- Current FedEx Service Guide and the archived/effective version governing the shipment  
  https://www.fedex.com/en-us/service-guide.html
- Current FedEx money-back-guarantee status and effective-date notices  
  https://www.fedex.com/en-us/service-guide/money-back-guarantee.html
- FedEx Billing Online dispute workflow and applicable EDI/billing specifications  
  https://www.fedex.com/en-us/billing-online.html
- Applicable FedEx rate sheets, account contracts, surcharge definitions, invoice data specifications, and adjustment procedures effective on the shipment date

FedEx materials supply carrier-specific concepts such as actual weight, dimensional weight, billed/rated weight, Additional Handling categories, Oversize, invoice adjustment, service-failure and non-service-failure disputes, money-back-guarantee eligibility, dispute reason, and carrier resolution.

### Reusable logistics and business-document semantics

#### GS1 EPCIS and Core Business Vocabulary

- EPCIS and CBV overview  
  https://www.gs1.org/standards/epcis
- EPCIS/CBV linked-data reference  
  https://ref.gs1.org/epcis/

EPCIS provides a reusable event model for the **what, when, where, why, and how** of objects and assets. Parcel should reuse relevant ideas such as event time, record time, business step, disposition, read point/location, source, destination, object aggregation, and business-transaction association instead of inventing incompatible event semantics.

#### OASIS Universal Business Language 2.4

- OASIS UBL 2.4 Standard  
  https://docs.oasis-open.org/ubl/UBL-2.4.html

UBL provides reusable transportation and billing semantics. Particularly relevant concepts include Shipment, Consignment, Transport Handling Unit, Invoice, Invoice Line, Freight Invoice, Allowance Charge, Application Response, Debit Note, and Credit Note. UBL's distinction between a logical shipment and a consignment governed by a transport arrangement helps prevent the ontology from treating every order, package, tracking number, and carrier movement as the same entity.

### Provenance and constraint semantics

#### W3C PROV-O

- PROV-O Recommendation  
  https://www.w3.org/TR/prov-o/

PROV-O supplies a reference model for Entities, Activities, Agents, derivation, generation, usage, attribution, association, revision/specialization, invalidation, and time. Parcel should map its evidence and decision lineage to these concepts even if the MVP does not serialize RDF.

#### W3C SHACL

- SHACL Recommendation  
  https://www.w3.org/TR/shacl/

SHACL supplies a reference vocabulary for shapes, cardinality, value type, allowed values, closed shapes, validation results, and severity. The current Zettel Platform is not an RDF/SHACL execution environment, so MVP constraints should be implemented through Parcel Pydantic schemas, explicit validation, and Platform typed Graphiti contracts. SHACL is a design reference, not a claim that SHACL validation runs in production.

### Customer-specific governing sources

Customer data can change which published rule or rate applies. The ontology must represent, not flatten, the relationship among:

- customer-carrier contract;
- negotiated rate agreement;
- account-specific discount or exception;
- published carrier terms/service guide;
- invoice and charge-code data;
- shipment record;
- package measurements/evidence;
- carrier audit/adjustment;
- carrier dispute response;
- posted credit.

A customer contract may modify published commercial terms. The model must record the precedence decision and its source instead of assuming a universal list rate.

### Non-authoritative discovery sources

The following may reveal pain, terminology, edge cases, or missing competency questions, but they may not define ontology truth:

- Reddit and other public user discussions;
- competitor marketing pages;
- blogs and SEO articles;
- support-forum answers without governing-source support;
- generated model output;
- historical billing patterns by themselves.

---

## Source Authority Is Contextual, Not A Single Ranking

The ontology must not store only a vague `source = UPS` or `source = FedEx` field. Applicability depends on context.

Every rule, rate, deadline, formula, or carrier assertion that may influence a case should carry or resolve to:

- source document identity;
- source version/hash;
- issuing authority;
- source type;
- carrier;
- jurisdiction/origin/destination scope as applicable;
- service scope;
- package/shipment scope;
- account or contract scope;
- effective start;
- effective end or supersession state;
- publication/observation time;
- clause, page, field, charge code, or native locator;
- interpretation/review status;
- expert reviewer and review date;
- precedence relationship to other sources.

Recommended `SourceAuthorityType` controlled values:

- `customer_contract`
- `negotiated_rate_agreement`
- `carrier_terms`
- `carrier_service_guide`
- `carrier_rate_guide`
- `carrier_guarantee_notice`
- `carrier_billing_dictionary`
- `carrier_invoice_or_edi_schema`
- `carrier_dispute_procedure`
- `carrier_response`
- `customer_system_record`
- `physical_evidence`
- `interoperability_standard`
- `expert_interpretation`
- `anecdotal_discovery`
- `ai_proposal`

`ai_proposal` and `anecdotal_discovery` may never be selected as governing authority for a case.

---

## Domain And Scope

### Domain

**U.S. small-parcel UPS/FedEx billing audit, evidence assembly, dispute/recovery, carrier decision, and verified credit reconciliation for direct carrier-account shippers.**

### Primary application

Support the managed Zettel Parcel service in answering:

> Is this billed charge or missed service credit worth reviewing, which governing rules and facts apply, what evidence supports or weakens the case, what action is available, and did a carrier credit actually post?

### Intended users

- Zettel Parcel auditors/operators;
- customer operations and finance users;
- reviewers approving dispute actions;
- engineers implementing ingestion, retrieval, case generation, and reconciliation;
- domain experts maintaining the ontology and rule corpus.

### Explicit non-goals for the first ontology release

Unless a launch audit category requires them, do not model the full domains of:

- freight/LTL/FTL or drayage;
- customs classification and duty/tax adjudication;
- cargo damage/loss claims;
- warehouse/3PL billing;
- ecommerce order management;
- complete carrier network operations;
- all international carrier jurisdictions;
- every field in UPS/FedEx billing exports;
- a universal supply-chain ontology;
- OWL/RDF reasoning as a production feature.

The ontology should include only the distinctions needed to answer approved Parcel competency questions and support verified service workflows.

---

## Ontology Development Process

The ontology lifecycle is iterative and expert-governed.

### Step 1: Approve scope and competency questions

Define exactly what the ontology must answer and which launch audit categories it supports. Do not begin with a class hierarchy generated from broad logistics vocabulary.

### Step 2: Inventory authoritative terms

Extract candidate terms from carrier terms, service guides, rate guides, billing dictionaries, invoice layouts, dispute procedures, customer contracts, GS1 EPCIS/CBV, UBL, PROV-O, and SHACL.

Preserve:

- original term;
- source locator;
- carrier/standard;
- definition;
- effective date/version;
- candidate aliases;
- open ambiguity.

### Step 3: Reuse before inventing

Map common events, documents, financial objects, and provenance to reusable standards where those definitions fit. Create Parcel-specific concepts only when a carrier or product distinction cannot be represented accurately through the reused model.

### Step 4: Separate words from concepts

A carrier label, billing column, charge code, customer nickname, and normalized concept are different things.

For example:

- preserve raw carrier charge code and label;
- map them to a normalized `ChargeCategory` only after expert review;
- allow carrier-specific subclasses or properties where semantics differ;
- record mappings as versioned artifacts rather than erasing the source vocabulary.

Synonyms do not automatically create separate classes, and similar labels do not automatically denote the same class.

### Step 5: Define classes, relations, identities, and constraints together

For every proposed class or relation, document:

- preferred name;
- definition;
- purpose/competency questions served;
- authoritative source or modeling rationale;
- examples;
- counterexamples;
- aliases and carrier-specific terms;
- stable identity strategy;
- required properties;
- domain/range;
- cardinality;
- temporal behavior;
- provenance requirements;
- expert approval status.

### Step 6: Validate with real cases

For every launch audit category and carrier, the expert review set must contain:

- positive examples;
- negative examples;
- threshold/boundary examples;
- conflicting-source examples;
- missing-evidence examples;
- superseded-rule examples;
- denied and credited examples where operationally available.

The exact sample count belongs in the backend validation plan, but no category is approved from a single illustrative case.

### Step 7: Test competency questions

Represent example instances and verify that the ontology and retrieval design can answer each approved question without silently filling gaps.

### Step 8: Version and repeat

Carrier rules, guarantee status, charge criteria, billing schemas, and dispute procedures change. Every approved ontology release must record its version, reviewers, source set, effective date, change rationale, migrations/mappings, and impacted competency tests.

---

## Competency Questions

These questions define what the first Parcel ontology must support. They are also acceptance-test inputs for the future backend.

### Identity and linkage

1. Which customer shipment, carrier consignment, package, tracking identifier, invoice, invoice line, and account refer to the same billed movement?
2. Does an invoice line apply to a package, a multi-package shipment, a service, an account-level charge, or another billing scope?
3. Which party is the shipper, payer, consignee, carrier, reviewer, and credit recipient?
4. Which raw carrier code and label produced the normalized charge category?

### Measurements and package facts

5. What dimensions and weights did the shipper declare?
6. What dimensions and weights did the carrier assess?
7. What independent or contemporaneous physical evidence exists?
8. Which measurement method, unit, rounding rule, timestamp, and observer apply?
9. Which value became actual weight, dimensional weight, or billable/rated weight under the governing formula?
10. Are conflicting measurements preserved as separate assertions rather than overwritten?

### Rules and applicability

11. Which carrier rule, guide, contract term, rate, discount, guarantee notice, or exception was in effect on the shipment date?
12. Which service, geography, account, package type, measurement threshold, or event condition makes the rule applicable?
13. Did a customer-specific contract or negotiated term alter the published carrier rule or rate?
14. Which formula, threshold, rounding step, minimum, maximum, or exclusion produced the charge?
15. Is the rule current, superseded, suspended, reinstated, or outside the case's effective period?

### Billing and audit

16. What was originally billed?
17. What adjustment or correction changed it, by how much, in which currency, and for what carrier-stated reason?
18. Is the adjustment a revised charge, an additional surcharge, a correction fee, a duplicate, a rebill, or another financial event?
19. What amount does Zettel calculate under the approved rule interpretation, and which inputs were used?
20. Is the discrepancy defensible, ambiguous, unsupported, or outside the launch service scope?

### Evidence and provenance

21. Which source supports each fact or assertion?
22. Which evidence contradicts it?
23. Which evidence is missing, stale, superseded, untrusted, or only historical context?
24. Can a reviewer open the native invoice line, carrier clause, shipment record, photo, event, or response behind the assertion?
25. Was a conclusion generated by an agent, calculated deterministically, asserted by a carrier, supplied by a customer, or approved by a human reviewer?

### Disputes and decisions

26. What issue is the dispute challenging?
27. What submission channel, deadline, required identifiers, reason, and evidence apply?
28. Who authorized submission and what exact payload was approved?
29. What did the carrier decide, when, and for what stated reason?
30. Is another supported action available, is more evidence required, or should the case close?
31. Is a denial preserved as a new source-backed event rather than treated as deletion of the original case?

### Recovery and verification

32. Did a credit or refund actually post?
33. Which account, invoice, transaction, tracking identifier, case, amount, currency, and posting date link the credit to the dispute?
34. Is the credit partial, full, reversed, duplicated, or unrelated?
35. What contingency fee is due only after the credit is verified?

### History and uncertainty

36. Have materially similar package profiles, services, destinations, or charge types appeared before?
37. Are prior shipments merely contextual, or do they contain authoritative physical evidence?
38. Which knowledge lane is incomplete or degraded?
39. What fact prevents the case from becoming ready for review?
40. Can the system explicitly answer `unknown` or `not supported` rather than inventing certainty?

---

## Candidate Ontology Modules

The following is a **source-grounded candidate model**, not an expert-approved final ontology.

### Module A: Parties, accounts, and agreements

#### Core classes

- `Party`
- `Carrier`
- `Shipper`
- `Payer`
- `Consignee`
- `CustomerOrganization`
- `Auditor`
- `Reviewer`
- `CarrierAccount`
- `Agreement`
- `CarrierContract`
- `NegotiatedRateAgreement`
- `Authorization`

#### Key distinctions

- `Shipper` and `Payer` may be different parties.
- A `CarrierAccount` belongs to a party but may have multiple agreements over time.
- A published rate and a negotiated rate are not the same object.
- An expert interpretation is not itself a contract term.

### Module B: Shipment, consignment, package, and identifiers

#### Core classes

- `CustomerShipment`
- `CarrierConsignment`
- `Package`
- `TransportHandlingUnit`
- `PackageProfile`
- `PackagingType`
- `CarrierService`
- `ServiceLevel`
- `TrackingIdentifier`
- `InvoiceIdentifier`
- `AccountIdentifier`
- `Address`
- `Location`

#### Key distinctions

- `CustomerShipment` represents the customer's logical shipment/fulfillment grouping.
- `CarrierConsignment` represents the carrier-transport arrangement or billed movement.
- `Package` is a physical handling unit.
- `PackageProfile` is a reusable expected pattern derived from packaging/SKU history; it is contextual evidence, not proof of an individual package's dimensions.
- `TrackingIdentifier` is modeled separately from the thing it identifies because carriers and systems may assign identifiers at different scopes.
- Multi-package shipments must be representable without forcing one package to equal one shipment.

### Module C: Events and observations

#### Core classes

- `BusinessEvent`
- `ShipmentEvent`
- `PackingEvent`
- `TenderEvent`
- `ShippingEvent`
- `ArrivalEvent`
- `DeliveryAttemptEvent`
- `DeliveryEvent`
- `BillingEvent`
- `AdjustmentPostedEvent`
- `DisputeSubmittedEvent`
- `CarrierDecisionEvent`
- `CreditPostedEvent`
- `Observation`

#### EPCIS-inspired properties

- `eventTime`
- `recordTime`
- `businessStep`
- `disposition`
- `readPoint`
- `businessLocation`
- `sourcePartyOrLocation`
- `destinationPartyOrLocation`
- `observedObject`
- `associatedBusinessTransaction`
- `errorOrCorrectionDeclaration`

Parcel does not need to implement the entire EPCIS standard. It should reuse the event semantics needed to preserve a coherent timeline and avoid creating conflicting definitions of event time, recorded time, location, source, destination, and transaction association.

### Module D: Measurements and physical evidence

#### Core classes

- `Measurement`
- `DimensionMeasurement`
- `WeightMeasurement`
- `DeclaredMeasurement`
- `CarrierAssessedMeasurement`
- `PhysicalEvidenceMeasurement`
- `CalculatedMeasurement`
- `Length`
- `Width`
- `Height`
- `Girth`
- `CubicVolume`
- `ActualWeight`
- `DimensionalWeight`
- `BillableWeight`
- `RatedWeight`
- `MeasurementMethod`
- `UnitOfMeasure`
- `RoundingRule`
- `ScaleReading`
- `DimensioningSystemReading`

#### Required modeling rule

Do not put one mutable `package.weight` or `package.dimensions` value on a package and overwrite it.

Each measurement must preserve:

- measured subject;
- measurement kind;
- numeric value;
- unit;
- source/observer;
- method;
- captured time;
- observed time;
- rounding/normalization applied;
- evidence artifact;
- confidence/review status where applicable.

Declared, carrier-assessed, calculated, and independently evidenced measurements are separate assertions that may conflict.

### Module E: Billing and financial consequences

#### Core classes

- `Invoice`
- `FreightInvoice`
- `InvoiceLine`
- `Charge`
- `TransportationCharge`
- `Surcharge`
- `CorrectionCharge`
- `AuditFee`
- `AllowanceCharge`
- `Rate`
- `Discount`
- `MinimumCharge`
- `Adjustment`
- `Rebill`
- `CreditNote`
- `Credit`
- `Refund`
- `Payment`
- `CurrencyAmount`

#### Candidate normalized charge categories

- `dimensional_weight_correction`
- `incorrect_weight_correction`
- `additional_handling`
- `large_or_oversize_package`
- `residential_classification`
- `address_correction`
- `duplicate_charge`
- `rate_or_discount_discrepancy`
- `service_failure_credit`
- `shipping_charge_correction_audit_fee`
- `other_unmapped_carrier_charge`

These are normalized candidate concepts. Raw carrier charge code, label, description, and billing-field identity must always be retained. A mapping to one of these categories requires a versioned, expert-approved mapping.

### Module F: Rules, formulas, and applicability

#### Core classes

- `AuthoritativeDocument`
- `CarrierRuleDocument`
- `RuleVersion`
- `RuleClause`
- `CarrierChargeCodeDefinition`
- `EligibilityRule`
- `EligibilityCriterion`
- `Exclusion`
- `Exception`
- `Threshold`
- `Formula`
- `FormulaInput`
- `RoundingPolicy`
- `GuaranteePolicy`
- `GuaranteeStatusNotice`
- `ClaimWindow`
- `DisputeWindow`
- `SubmissionRequirement`
- `EvidenceRequirement`
- `SubmissionChannel`
- `ApplicabilityContext`
- `PrecedenceDecision`

#### Required rule attributes

A governing `RuleVersion` must include or resolve to:

- stable rule identity;
- carrier;
- source document/version/hash;
- source locator;
- effective start;
- effective end or supersession state;
- applicable services;
- jurisdiction/route scope;
- account/contract scope if any;
- package/shipment conditions;
- criteria/exclusions;
- calculation/rounding semantics where relevant;
- review status and approving expert.

A rule published after the shipment date may be explanatory context but must not be silently treated as the governing rule.

### Module G: Evidence, assertions, and provenance

#### Core classes

- `EvidenceArtifact`
- `InvoiceEvidence`
- `ShipmentRecordEvidence`
- `ManifestEvidence`
- `CarrierBillingRecordEvidence`
- `PackagePhoto`
- `ScalePhoto`
- `DimensionPhoto`
- `TrackingEvidence`
- `ContractEvidence`
- `CarrierRuleEvidence`
- `CarrierResponseEvidence`
- `CreditPostingEvidence`
- `SourceCitation`
- `Assertion`
- `Interpretation`
- `Calculation`
- `AgentProposal`
- `HumanReviewActivity`
- `EvidenceCompletenessAssessment`

#### PROV-O-aligned interpretation

Parcel should map:

- source documents, records, photos, responses, assertions, and case outputs to provenance `Entity` concepts;
- ingestion, calculation, retrieval, proposal generation, review, submission, and verification to `Activity` concepts;
- customer, carrier, operator, reviewer, and system identities to `Agent` concepts;
- source lineage to concepts equivalent to `used`, `wasGeneratedBy`, `wasDerivedFrom`, `wasAttributedTo`, and `wasAssociatedWith`.

The MVP may implement these mappings through Zettel Platform's canonical evidence, native locators, decision traces, graph episode lineage, and product records rather than serializing PROV-O RDF.

### Module H: Audit case, dispute, decision, and recovery

#### Core classes

- `AuditCase`
- `AuditFinding`
- `EligibilityAssessment`
- `Discrepancy`
- `EvidenceGap`
- `ActionProposal`
- `CaseReview`
- `Dispute`
- `DisputeSubmission`
- `Denial`
- `Escalation`
- `CarrierDecision`
- `DecisionReason`
- `CaseOutcome`
- `CreditVerification`
- `Recovery`
- `RecoveryFee`

#### Candidate case states

- `candidate`
- `evidence_incomplete`
- `unsupported`
- `ready_for_review`
- `approved_for_submission`
- `submitted`
- `carrier_responded`
- `denied`
- `needs_more_evidence`
- `next_action_available`
- `closed_no_recovery`
- `credit_pending`
- `credit_verified`
- `credit_reversed`

These are Parcel domain states and must not be confused with Zettel Platform's generic operation statuses.

---

## Candidate Relations

The final relation vocabulary requires expert and knowledge-engineering review. Candidate relations include:

### Identity and containment

- `customerShipmentHasConsignment`
- `consignmentContainsPackage`
- `packageUsesPackageProfile`
- `trackingIdentifierIdentifies`
- `accountOwnedByParty`
- `agreementAppliesToAccount`
- `shipmentUsesCarrierService`
- `eventObservesObject`
- `eventAssociatedWithTransaction`

### Billing

- `invoiceContainsLine`
- `invoiceIssuedToPayer`
- `invoiceLineReferencesConsignment`
- `invoiceLineReferencesPackage`
- `invoiceLineAssessesCharge`
- `chargeUsesRate`
- `chargeUsesDiscount`
- `adjustmentModifiesInvoiceLine`
- `adjustmentAddsCharge`
- `creditReferencesInvoice`
- `creditOffsetsCharge`
- `creditPostsToAccount`

### Measurements and rules

- `measurementIsAboutPackage`
- `measurementGeneratedByEvent`
- `measurementSupportedByEvidence`
- `calculatedMeasurementUsesInput`
- `calculatedMeasurementUsesFormula`
- `chargeArisesFromMeasurement`
- `chargeGovernedByRuleVersion`
- `ruleVersionContainedInDocument`
- `ruleVersionAppliesToService`
- `ruleVersionAppliesToAccount`
- `ruleVersionSupersedesRuleVersion`
- `criterionEvaluatesFact`
- `exceptionOverridesCriterion`
- `precedenceDecisionSelectsRule`

### Evidence and provenance

- `assertionSupportedByEvidence`
- `assertionContradictedByEvidence`
- `assertionDerivedFromSource`
- `artifactGeneratedByActivity`
- `activityUsedEntity`
- `activityAssociatedWithAgent`
- `interpretationReviewedBy`
- `proposalBasedOnAssertion`
- `sourceCitationLocatesArtifact`

### Case and recovery

- `caseConcernsAdjustment`
- `caseConcernsCharge`
- `caseUsesEvidence`
- `caseAppliesRuleVersion`
- `caseHasEvidenceGap`
- `caseHasAssessment`
- `reviewEvaluatesProposal`
- `reviewApprovesSubmission`
- `disputeChallengesAdjustment`
- `submissionImplementsApprovedAction`
- `decisionRespondsToDispute`
- `decisionStatesReason`
- `denialMayLeadToEscalation`
- `creditResolvesCase`
- `verificationConfirmsCredit`
- `recoveryProducesFee`
- `caseHasHistoricalContext`

Relation names should be reviewed for direction, inverses, domain/range, and whether a relation is truly semantic or merely an implementation field.

---

## Core Constraints And Invariants

These constraints are candidates for Pydantic/domain validation and Platform-compatible typed graph rules. SHACL terminology is a design reference only.

### Source and provenance

1. Every case-relevant assertion must identify its source or be explicitly marked `unsupported`.
2. Every normalized carrier term must retain the raw carrier field/code/label and the mapping version.
3. An `ai_proposal` cannot be the authoritative source of a carrier rule, measurement, rate, decision, or credit.
4. A source-backed fact must retain its native locator and source version/hash where available.
5. A superseded source remains addressable for historical cases.
6. Conflicting assertions are retained separately and linked to their evidence; one may not silently overwrite another.

### Identity

7. A tracking identifier is not automatically identical to a shipment, consignment, or package.
8. Every invoice line belongs to exactly one invoice.
9. Every adjustment must identify the invoice line, charge, or billing scope it changes.
10. Every credit verification must identify the account and financial posting used as proof.

### Measurement

11. Every measurement requires a subject, kind, value, unit, source/observer, and relevant time.
12. Calculated dimensional/billable/rated weight must retain formula version, inputs, rounding, and output.
13. Declared, carrier-assessed, calculated, and physical-evidence measurements are distinct types or roles.
14. A historical package profile may inform a review but cannot prove the physical measurement of a specific package.

### Rule applicability

15. Every governing rule must have a source, carrier, effective period, and applicability context.
16. No case may use a rule effective after the shipment date as governing authority unless an expert-approved retrospective rule explicitly applies.
17. Contract-specific rates/terms and published carrier terms must remain distinct.
18. Every precedence decision must state why one source governs another for the case.
19. Suspended or reinstated guarantee status must be modeled as time-scoped rule state, not a timeless Boolean.
20. Raw carrier rule language and the expert interpretation must be separately traceable.

### Case readiness

21. A case cannot become `ready_for_review` without an identified charge/credit opportunity, the relevant shipment/billing identity, a candidate governing rule or explicit rule gap, and source-backed facts supporting the assessment.
22. A case with required missing evidence must remain `evidence_incomplete` or another expert-approved non-ready state.
23. A recommendation must distinguish `supported`, `ambiguous`, `unsupported`, and `out_of_scope`.
24. A denial adds evidence and state; it does not erase the dispute or original assessment.
25. External submission requires an exact approved payload and reviewer/authorization record unless an expert-approved automatic policy is later enabled.

### Recovery

26. `credit_verified` requires a carrier/customer financial artifact showing amount, currency, posting date, account, and a defensible link to the case.
27. An estimated saving, approved dispute, promised credit, or carrier response is not a verified credit.
28. Partial, reversed, duplicate, and unrelated credits must be representable.
29. A contingency fee may be calculated only from expert-approved verified-credit semantics.

### Uncertainty

30. Unknown, missing, contradictory, degraded, and out-of-scope states must remain explicit.
31. The system may not substitute a confidence percentage for missing authoritative evidence.
32. A graph/search outage or incomplete source set must not render as an apparently complete case.

---

## Source-To-Ontology Mapping

| Authoritative source family | Concepts or semantics to reuse |
|---|---|
| UPS terms, service/rate guides, correction guidance | UPS service, package criteria, billable weight, correction/surcharge categories, audit rights, invoice adjustments, guarantee/request windows, exceptions |
| UPS Billing Data Dictionary and charge codes | Invoice/line identity, account, tracking references, charge code/description, amounts, adjustments, credits, billing field semantics |
| FedEx Service Guide, rates/surcharges, guarantee notices | FedEx service, actual/dimensional/rated weight, handling/oversize criteria, billing audit, invoice adjustments, guarantee status/windows, exceptions |
| FedEx Billing Online/EDI specifications | Invoice/shipment dispute identity, dispute reason, additional detail, adjustment/remittance and resolution data |
| Customer carrier contract/rate agreement | Account-specific rate, discount, minimum, exception, authorization, precedence, effective period |
| GS1 EPCIS/CBV | Object/event identity, event time, record time, business step, disposition, location, source/destination, aggregation, transaction association |
| OASIS UBL 2.4 | Shipment/Consignment/Handling Unit distinctions, Invoice, Invoice Line, Freight Invoice, Allowance Charge, Application Response, Credit Note, document references |
| W3C PROV-O | Entity/Activity/Agent and derivation, generation, usage, attribution, association, revision/invalidation lineage |
| W3C SHACL | Shape-style cardinality, type, allowed-value, closed-structure, severity, and validation-report design |
| Customer shipment/packing/finance evidence | Case-specific facts and observations; never generalized into universal carrier rules without expert review |
| Reddit/user reports | Pain discovery, edge-case candidates, and competency questions only |

---

## Example Case Graph

This example demonstrates the intended distinctions. It is illustrative, not a real carrier case and not an approved ontology instance.

```text
CustomerShipment SHIP-204
  customerShipmentHasConsignment -> CarrierConsignment 1Z84...

CarrierConsignment 1Z84...
  consignmentContainsPackage -> Package PKG-204-1
  shipmentUsesCarrierService -> UPS Ground

Package PKG-204-1
  hasMeasurement -> DeclaredMeasurement 48 x 6 x 6 in
  hasMeasurement -> CarrierAssessedMeasurement 49 x 7 x 7 in
  packageUsesPackageProfile -> PackageProfile BOX-A

Invoice INV-900
  invoiceContainsLine -> InvoiceLine LINE-17

InvoiceLine LINE-17
  invoiceLineReferencesConsignment -> 1Z84...
  invoiceLineAssessesCharge -> AdditionalHandlingCharge CHG-17

Adjustment ADJ-17
  adjustmentModifiesInvoiceLine -> LINE-17
  chargeArisesFromMeasurement -> CarrierAssessedMeasurement
  chargeGovernedByRuleVersion -> UPS-RULE-AH-2026-V3

AuditCase CASE-0173
  caseConcernsAdjustment -> ADJ-17
  caseAppliesRuleVersion -> UPS-RULE-AH-2026-V3
  caseUsesEvidence -> ShipmentRecordEvidence
  caseUsesEvidence -> InvoiceEvidence
  caseHasEvidenceGap -> MissingPackagePhoto
  caseHasHistoricalContext -> PackageProfile BOX-A
  caseHasAssessment -> ReviewRecommended

ActionProposal PROP-0173
  proposalBasedOnAssertion -> DimensionDiscrepancyAssertion
  status -> pending_human_review
```

The example intentionally preserves both measurements and marks the package photo missing. Prior package history provides context but does not prove which measurement is correct.

---

## Landing-Page Mapping

The public landing page should express ontology-backed concepts as an understandable case, not expose a taxonomy or network diagram.

### Zettel Case File fields

| Landing-page label | Ontology-backed meaning |
|---|---|
| **Your shipment** | customer shipment/consignment/package identity plus shipper-declared observations |
| **Carrier adjustment** | invoice line, charge, adjustment, carrier-assessed fact, and carrier-stated reason |
| **Rule in effect on shipment date** | expert-reviewed governing `RuleVersion` selected through applicability and precedence |
| **Your history** | package-profile and prior shipment/charge/case context, explicitly non-authoritative for the individual package |
| **Evidence** | source-backed artifacts and assertions with completeness state |
| **Missing** | explicit evidence gap; no inferred substitute |
| **Recommended action** | bounded `ActionProposal`, not an autonomous external action |
| **Carrier response** | source-backed decision event and stated reason |
| **Verified credit** | reconciled posting evidence linked to account, invoice/charge, case, amount, currency, and date |

### Copy consequences

The landing page may say, after expert validation and implementation truth are established:

- **Every flagged charge comes with the reason.**
- **Rule in effect on shipment date.**
- **If the evidence isn't there, Zettel says so.**
- **Zettel builds the case. You stay in control.**

The landing page must not say:

- **Our AI created the UPS/FedEx ontology.**
- **AI understands every carrier rule.**
- **The knowledge graph proves the carrier is wrong.**
- **The same box always proves the same charge.**
- **A high confidence score replaces supporting evidence.**
- **Zettel automatically knows which contract governs.**

### Trust language after expert sign-off

A future trust statement may say:

> Zettel's case model is grounded in carrier rules, billing data, logistics standards, and domain-expert review.

Do not publish that statement until the expert-approval records and source mappings exist.

### Visual design rule

Do not add an ontology diagram to the landing page merely to signal technical sophistication. The customer should see the ontology through the Case File's clarity:

**shipment -> adjustment -> governing rule -> evidence -> decision -> verified credit**

---

## Zettel Platform Integration

### Parcel owns

- ontology scope and competency questions;
- source-grounded domain definitions;
- expert-review workflow and approval status;
- parcel entity/edge Pydantic schemas;
- carrier term/code mappings;
- stable parcel identities;
- rule applicability and precedence policy;
- case/evidence completeness policy;
- product records and Parcel UI.

### Platform owns

- workspace isolation;
- canonical evidence and native source provenance;
- typed Graphiti episode/triplet/search contracts;
- graph persistence and maintenance;
- temporal fact validity/invalidation;
- canonical-plus-graph retrieval;
- durable product work/operations;
- bounded structured AgentCore proposal generation;
- generic reviews and decision traces;
- shared product runtime and storage boundaries.

### Required implementation pattern

1. Parcel defines expert-approved entity and edge schemas.
2. Parcel uses Platform `GraphMemory` typed operations rather than importing Graphiti directly.
3. Parcel maps authoritative source records into Platform-compatible canonical evidence.
4. Parcel uses Platform retrieval for case context and preserves citations/provenance.
5. Parcel sends an assembled, bounded prompt and output schema through Platform `StructuredAgentPort`.
6. Parcel validates and normalizes the result against expert-approved ontology constraints.
7. Parcel records proposed/approved actions and outcomes through durable product/operation boundaries.
8. Parcel never creates a second vector store, RDF store, graph database, model router, RAG service, or provenance store.

### Standards relationship

The first release should map to GS1, UBL, PROV-O, and SHACL concepts where useful but does not need to serialize or execute their complete standards.

If a reusable ontology registry, ontology version service, cross-product constraint engine, OWL/RDF serialization, SHACL execution, or standards-mapping framework becomes necessary, design it in **Zettel Platform** and consume it from Parcel. Do not hide a generalized semantic subsystem inside the Parcel package.

---

## Ontology Records And Versioning

The future Parcel backend should define product records or equivalent source-backed artifacts for:

- `ontology_release`
- `ontology_term`
- `ontology_relation`
- `ontology_constraint`
- `source_term_mapping`
- `charge_code_mapping`
- `rule_document`
- `rule_version`
- `expert_review`
- `competency_test`
- `ontology_change_request`

Every approved ontology release should include:

- semantic version or immutable release ID;
- status: `draft`, `in_review`, `approved`, `deprecated`;
- scope and supported carriers/categories;
- source inventory and hashes;
- effective date;
- term/relation/constraint definitions;
- mappings to carrier and standard vocabulary;
- approving reviewers;
- competency-test results;
- known ambiguities and exclusions;
- predecessor/supersession relationship;
- affected extraction, retrieval, prompt, and case-schema versions.

### Change triggers

Review the ontology when any of the following changes:

- UPS or FedEx service guide/terms/rates/surcharge criteria;
- guarantee suspension or reinstatement;
- billing-data dictionary, EDI/API, or charge-code schema;
- customer contract semantics needed by the product;
- dispute or escalation procedure;
- supported audit category;
- evidence requirement;
- case workflow/state;
- reusable standard version used by Parcel;
- domain expert identifies a conflation or missing distinction.

A changed carrier source does not automatically rewrite historical cases. New rules apply according to effective dates and approved migration policy.

---

## Expert Approval Gate

The candidate ontology cannot be called production-ready until all of the following are complete.

### Domain review

- A qualified small-parcel billing/recovery expert approves the domain scope and competency questions.
- A UPS reviewer validates UPS terminology and mappings.
- A FedEx reviewer validates FedEx terminology and mappings.
- Reviewers explicitly identify terms that look similar but are not semantically equivalent.

### Knowledge-engineering review

- Every class and relation has a definition, purpose, examples, counterexamples, source/rationale, domain/range, and identity strategy.
- Class hierarchy cycles and unjustified subclasses are removed.
- Synonyms are represented as labels/mappings rather than duplicate classes.
- Required cardinality, allowed values, units, and temporal constraints are documented.
- Raw source vocabulary remains recoverable after normalization.

### Case validation

- Each launch audit category has positive, negative, boundary, ambiguous, conflicting-source, and missing-evidence examples.
- Competency questions are executable as test scenarios.
- Rule-effective-date selection is tested.
- Contract-versus-published-rule precedence is tested where supported.
- Historical-context examples demonstrate that similarity is not treated as proof.
- Denial, partial credit, unrelated credit, and reversed credit can be represented.

### Operational review

- The ontology supports the real submission, response, next-action, and credit-verification workflows.
- Landing-page case states correspond to deliverable service behavior.
- Unsupported charge categories and third-party-label workflows remain explicitly out of scope.

### AI safety gate

- No AI-generated term or mapping is marked approved without a human review record.
- Production rule selection cannot cite `ai_proposal` as governing authority.
- Agent outputs are schema-constrained proposals and preserve source citations.
- Unknown or missing facts remain unknown or missing.

---

## Landing-Page Launch Gate Additions

Before ontology-informed copy or visuals go live:

1. The ontology release used by the example Case File has an approved scope and expert reviewers.
2. Every displayed field maps to an approved concept/property.
3. Every factual carrier term maps to a primary carrier source effective for the stated example date.
4. The example is visibly labeled illustrative and does not imply an actual customer outcome.
5. `Rule in effect on shipment date` is backed by temporal applicability logic, not a static current-rule lookup.
6. `Your history` is labeled as context rather than proof.
7. Missing evidence is shown explicitly.
8. `Recommended action` is a reviewable proposal unless the exact action is operationally approved for automation.
9. `Verified credit` is used only for a posted, reconciled financial credit.
10. The public site does not claim that AI independently authored or validated the ontology.

---

## Backend Plan Requirements Added By This Appendix

The later Parcel backend design must include tasks for:

1. expert recruitment/assignment and review authority;
2. authoritative source inventory and version capture;
3. competency-question approval;
4. candidate term registry with source locators;
5. carrier-specific vocabulary and raw-code preservation;
6. normalized class/relation/constraint model;
7. GS1/UBL/PROV/SHACL concept mapping decisions;
8. ontology release/version records;
9. expert approval records;
10. typed Pydantic entity/edge schemas for Platform GraphMemory;
11. canonical evidence mapping and provenance;
12. temporal rule and guarantee-status modeling;
13. rule applicability/precedence service;
14. ontology validation and example-case fixtures;
15. retrieval tests for every competency question;
16. agent proposal schema constrained by the approved ontology;
17. regression tests preventing direct Parcel Graphiti/RDF/vector/model infrastructure;
18. change-management workflow for carrier-source updates.

---

## Open Questions For Expert Review

These are intentionally unresolved; an LLM should not decide them unilaterally.

- Where should the boundary fall between `CustomerShipment`, `CarrierConsignment`, and carrier-specific use of the word "shipment"?
- Does each launch carrier identify a package, shipment, or movement with its tracking number in every supported billing format?
- Which charge categories deserve normalized cross-carrier concepts, and which must remain carrier-specific?
- When should a carrier billing line be modeled as a revised charge versus a new adjustment or surcharge?
- Which customer contract terms modify applicability versus only price calculation?
- Which evidence classes are required versus optional for each dispute type?
- What precisely constitutes a partial or full resolution?
- How should carrier decision reasons be normalized without losing exact language?
- Which historical similarity dimensions are operationally meaningful: packaging, SKU, service, zone, origin/destination, account, or combinations?
- Which semantic constraints belong in Parcel Pydantic validation now, and which might justify a reusable Platform ontology/validation capability later?

Each answer must be recorded as a reviewed ontology decision with rationale and source support.

---

## Final Principle

**The ontology is a reviewed domain contract, not an LLM-generated diagram.**

Authoritative carrier documents, customer agreements, billing schemas, logistics standards, provenance standards, real cases, and expert judgment define the model. AI may help organize and test that work, but it cannot create domain truth.

For the landing page, the result should be invisible technical rigor made visible as clarity:

**what was shipped -> what was billed -> what changed -> which rule governed -> what evidence exists -> what is missing -> what was decided -> whether a credit posted.**
