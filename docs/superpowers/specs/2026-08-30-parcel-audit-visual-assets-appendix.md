# Zettel Parcel Visual Assets Design Appendix

Date: 2026-08-30  
Parent design: `docs/superpowers/specs/2026-08-30-parcel-audit-landing-page-design.md`  
Related ontology appendix: `docs/superpowers/specs/2026-08-30-parcel-audit-ontology-appendix.md`  
Status: Normative visual-design appendix; implementation not started

## Purpose

This appendix defines the purposeful diagram/illustration assets required for the Zettel Parcel landing page and the cross-repository workflow used to create them.

The landing page should not rely only on text and UI cards when a visual can make a product idea materially easier to understand. At the same time, it should not become a generic infographic page or expose ontology/knowledge-graph internals that customers do not need.

The visual goal is:

**make the invisible work behind a parcel-audit case immediately understandable.**

## Source Repository And Ownership

Editable diagram source belongs in:

`zettel-ai/website_diagram`

Rendered website assets belong in:

`zettel-ai/zettel-ai.github.io/public/diagrams/parcel/`

Only the final rendered SVGs are copied into the landing-page repository. The D2 source, reusable diagram art, icons, and render-oriented source history remain in `website_diagram`.

## Existing Zettel Diagram Language To Reuse

The current diagram repository already establishes the visual system through files such as:

- `zettel_overview.d2`
- `analyze.d2`
- `ingest.d2`
- `communicate.d2`
- existing blog D2 diagrams under `blog/`

The Parcel visuals should reuse or closely follow these established conventions:

- ELK layout through the D2 config;
- white/very-light neutral canvas;
- restrained gray borders and connectors;
- modest rounded corners and shadows;
- Zettel green for the product/reasoning/case-building emphasis;
- information blue only for neutral information/channel concepts where helpful;
- simple line icons from the existing `icons/` collection;
- short labels rather than paragraph-heavy nodes;
- semantically meaningful arrows rather than decorative graph density;
- no glowing AI nodes, neural-network motifs, or generic “knowledge graph” spiderwebs.

Existing reusable art includes source cards, product cards, value cards, chips, outcome cards, channel cards, and icons such as package, receipt, file-text, alert, check, dollar, shuffle, mail, and related logistics symbols.

## Design Rule: A Diagram Must Answer A Customer Question

Every diagram must pass this test:

> What does the visitor understand after seeing this that would be slower or harder to understand from the adjacent copy alone?

If there is no concrete answer, do not add the diagram.

The launch page requires exactly three primary Parcel diagrams. Additional decorative diagrams are out of scope unless the design is revised.

## Diagram 1: Case Assembly

Source: `website_diagram/parcel/case-assembly.d2`  
Rendered source: `website_diagram/parcel/case-assembly.svg`  
Website copy: `public/diagrams/parcel/case-assembly.svg`

Customer question: **How does Zettel turn one confusing charge into a case worth reviewing?**

Placement: **One Charge. Full Context. / Every charge gets a case file.**

Visual story:

```text
Invoice line ─────┐
Shipment facts ───┤
Carrier rule ─────┼──> ZETTEL CASE FILE ───> Reviewable next action
Evidence ─────────┤
History/context ──┘
```

Required distinctions:

- invoice/billing source is distinct from shipment evidence;
- the carrier rule is visibly time-aware: **Rule in effect**;
- history is labeled **Similar package profile** or **History/context**, never proof;
- missing evidence may be shown as an explicit gap;
- final state is **Reviewable next action**, not autonomous submission;
- do not use Graphiti, ontology, context graph, RAG, or AgentCore terminology.

Suggested existing art reuse: receipt, package, file/clipboard, shuffle/comparison, and check/review icons; green product/value-card styling for Zettel Case File; neutral cards for source material.

## Diagram 2: Similar Package History

Source: `website_diagram/parcel/similar-package-history.d2`  
Rendered source: `website_diagram/parcel/similar-package-history.svg`  
Website copy: `public/diagrams/parcel/similar-package-history.svg`

Customer question: **Why is the same-looking package suddenly billed differently?**

Placement: **Same box. Different bill.**

Visual story:

```text
Similar package profile

Shipment A   declared 18×12×8   billed $14.72
Shipment B   declared 18×12×8   billed $14.72
Shipment C   declared 18×12×8   billed $14.72
Shipment D   carrier assessed 20×14×9   billed $34.97
                                      ↓
                              Additional Handling

Context, not proof.
```

Required distinctions:

- the marketing headline may remain **Same box. Different bill.**;
- the diagram uses **Similar package profile** unless exact identity is established;
- shipper-declared and carrier-assessed values are separately labeled;
- previous consistent billing is context, not proof the carrier is wrong;
- no anomaly probability or confidence score.

Suggested reuse: package, receipt/dollar, shuffle/comparison icons; neutral white cards for prior shipments; information blue or neutral styling for carrier-assessed facts; green only for Zettel's comparison insight.

## Diagram 3: Denial To Resolution

Source: `website_diagram/parcel/denial-resolution.d2`  
Rendered source: `website_diagram/parcel/denial-resolution.svg`  
Website copy: `public/diagrams/parcel/denial-resolution.svg`

Customer question: **What happens after a carrier says no?**

Placement: **Denied isn't the same as explained.**

Visual story:

```text
Case submitted
      ↓
Carrier response
      ↓
Denied / needs evidence / approved
      ↓
Review reason + evidence gap
      ↓
Next supported action
      ↓
Closed / credit pending / credit verified
```

Required distinctions:

- **Denied** is an intermediate case state;
- denial does not imply escalation is always available;
- use **Next supported action**, not universal **Appeal**;
- missing evidence remains explicit;
- **Credit verified** is distinct from approved or credit pending;
- do not imply automatic next-action submission.

Suggested reuse: alert, file/clipboard, and check icons; neutral outcome cards; green for supported/reviewed case progress; restrained red/orange only as an accessible state accent.

## What Not To Generate

Do not generate:

- a public ontology graph;
- Graphiti/Neo4j node-link art;
- AgentCore architecture art;
- neural-network illustrations;
- decorative parcel art with no explanatory value;
- carrier logos implying partnership;
- fake invoice screenshots resembling customer data;
- unsupported recovery statistics;
- confidence meters or AI scores.

## Cross-Repository Artifact Workflow

```text
website_diagram/parcel/*.d2
        ↓ d2 render
website_diagram/parcel/*.svg
        ↓ reviewed copy
zettel-ai.github.io/public/diagrams/parcel/*.svg
        ↓ Next static export
/parcel/ landing page
```

Source-of-truth rules:

- D2 is the editable source of truth.
- SVG beside the D2 source is the canonical reviewed render for that source revision.
- The website copy must be byte-for-byte identical at copy time.
- Do not hand-edit website SVG copies.
- Changes begin in D2, then re-render, review, and copy again.

## Provenance Manifest

The landing-page repository must maintain:

`docs/superpowers/parcel-diagram-sources.md`

For each copied asset, record:

- website asset path;
- `website_diagram` repository;
- D2 source path;
- rendered SVG source path;
- source commit SHA;
- copied SVG SHA-256;
- landing-page purpose/section;
- review date;
- D2 renderer version.

## Responsive And Accessibility Requirements

- remain legible around 320–375px content width when displayed full-width;
- avoid tiny labels that only work on desktop;
- prefer fewer larger nodes over dense graphs;
- use an SVG viewBox for responsive scaling;
- avoid external font dependencies that disappear in static hosting;
- surrounding HTML provides caption/description and remains the accessible source of meaning;
- diagrams must not require horizontal scrolling to understand.

If a single layout cannot remain legible on mobile, simplify it rather than introducing a second visual language.

## Design Success Criteria

1. A visitor can understand how evidence becomes a case without learning graph terminology.
2. The history visual makes the anomalous adjustment obvious while preserving **context, not proof**.
3. The denial visual shows denial as a sourced intermediate state rather than a disappearing case.
4. The visuals belong recognizably to the existing Zettel diagram family.
5. No diagram claims a capability or carrier fact still behind an operational/expert-review gate.
6. Every website SVG is reproducible from a D2 source and traceable through the provenance manifest.

## Final Principle

**Use diagrams where they compress reasoning, not where they merely fill space.**

For Parcel, the three visual explanations are:

**build the case → compare the history carefully → preserve the case through the carrier decision.**
