# Blog Section Design

Date: 2026-05-24
Project: Zettel Ops landing page

## Goal

Add a polished blog section to the existing Zettel Ops website using the 18 source markdown articles in `/Users/jallen/projects/zettel_ai/assets/zettel_blogs`.

The blog should look and feel like part of the current landing page, not a separate publication theme. It should support long-form freight operations articles with reusable images, custom D2 diagrams, inline citations, and cleaned human-sounding copy.

## Approved Scope

- Add a `/blog` index page.
- Add individual article routes at `/blog/[slug]`.
- Convert all 18 source markdown files into cleaned website-ready blog posts.
- Use plain Markdown with frontmatter, not MDX.
- Include one hero image per post and 1 to 2 inline images for longer posts.
- Use only free, high-quality, reusable/licensable image sources such as Unsplash, Pexels, and Wikimedia Commons.
- Add one custom D2 diagram per article.
- Store D2 source files under `/Users/jallen/projects/zettel_ai/website_diagram/blog/`.
- Render blog diagram SVGs into the landing site under `public/diagrams/blog/`.
- Include inline citations and a matching Sources section in every article.
- Remove source-generated boilerplate, SEO outlines, prompt-tool promotion, and unrelated closing prompts.
- Humanize the article prose and remove em dashes from final blog copy.

## Content Architecture

Cleaned posts will live in:

```text
src/content/blog/*.md
```

Each post will use frontmatter for metadata:

- `title`: polished article title.
- `slug`: URL-safe article slug.
- `description`: short article summary for cards and metadata.
- `date`: publication date.
- `topic`: high-level grouping such as freight operations, document readiness, or pickup readiness.
- `readTime`: estimated reading time.
- `heroImage`: local path, alt text, credit, source URL, and license.
- `inlineImages`: optional list of local paths, alt text, captions, credits, source URLs, and licenses.
- `diagram`: local SVG path, alt text, and caption.
- `sources`: numbered factual sources used by inline citations.

The Markdown body will remain readable and portable. Inline citations will use bracket references like `[1]`, and each number will correspond to the `sources` list.

## Application Architecture

The blog will be implemented with static App Router routes:

- `src/app/blog/page.tsx`: blog index page.
- `src/app/blog/[slug]/page.tsx`: blog article page.
- `src/app/_lib/blog.ts`: server-side helpers for reading Markdown, parsing frontmatter, generating slugs, sorting posts, and resolving adjacent or related posts.
- `src/app/_components/blog/*`: article shell, post cards, image figure, diagram figure, source list, and markdown component mappings.

The renderer will use plain Markdown libraries:

- `gray-matter` for frontmatter.
- `react-markdown` for React rendering.
- `remark-gfm` for tables, strikethrough, task lists, and common Markdown extensions.

This avoids MDX because the posts do not need JSX in the body. A shared renderer gives tighter control over typography, links, images, citations, and diagrams while keeping the content files simple.

## Routes And Navigation

The top navigation will add a Blog link while preserving the existing fixed header and pilot CTA.

Expected route behavior:

- `/blog` lists all posts.
- `/blog/[slug]` renders an article.
- Unknown slugs return `notFound()`.
- Article pages generate metadata from frontmatter.
- Static params are generated from the content directory.

The blog index will include:

- Compact editorial header.
- Featured or latest post treatment.
- Responsive grid of all 18 posts.
- Topic, read time, short description, and image per card.

## Article Page Design

Article pages will use a focused reading layout:

- Existing fixed top nav.
- Existing footer.
- Hero image with subtle gradient overlay or fade into the article intro.
- Constrained article column for readable line length.
- Short dek or description under the title.
- Metadata row with topic and read time.
- Optional lightweight "In this article" table of contents if it stays clean and useful.
- Inline images as article breaks with captions and source/license links.
- D2 diagram in a clean figure block with caption.
- Sources section at the end.
- Related posts after the article.

## Visual System

Blog pages must reuse the landing page visual language:

- Use the existing Public Sans font.
- Use Zettel green as the main accent.
- Use existing white, zinc, and surface colors.
- Use design tokens and styling patterns from `src/app/globals.css` where available.
- Reuse the current `TopNav` and `Footer`.
- Keep borders, shadows, spacing, and card styling restrained.
- Avoid introducing a separate editorial color palette.

Image gradients, overlays, captions, and diagram treatments should derive from the same green and neutral palette used on the landing page.

## Editorial Rules

Each source article will receive a stronger editorial pass:

- Remove "Comprehensive Outline", "SEO Outline", and similar source-planning sections.
- Remove bottom boilerplate about article modes, bulk SEO tools, prompt libraries, translation offers, image-generation prompts, and unrelated next-step prompts.
- Rewrite titles and headings into natural title case.
- Remove em dashes from final copy.
- Reduce repetitive phrasing and obvious AI-generated transitions.
- Keep the articles practical, specific, and useful for import, drayage, and logistics teams.
- Keep claims conservative, especially claims about AI preventing delays, avoiding demurrage, or guaranteeing outcomes.
- Preserve useful FAQ sections, but tighten answers.
- Prefer shorter paragraphs, scannable headings, and operational checklists.
- Add citations where factual claims rely on outside authority.

## Image Requirements

Images must be free, high quality, and reusable/licensable.

Acceptable sources:

- Unsplash.
- Pexels.
- Wikimedia Commons.
- Other clearly reusable/licensable sources only if license terms are captured.

Each downloaded image must be stored locally under:

```text
public/images/blog/<slug>/
```

Each image must include:

- Local path.
- Alt text.
- Caption where useful.
- Creator or source credit.
- Source URL.
- License name or license page URL.

Images should be relevant to the article topic, such as containers, terminals, freight documents, warehouses, port gates, logistics teams, inboxes, or operations workflows. Avoid generic stock imagery that does not help the reader understand the article.

## Diagram Requirements

Each article gets one custom D2 diagram.

D2 source files:

```text
/Users/jallen/projects/zettel_ai/website_diagram/blog/<slug>.d2
```

Rendered SVG outputs for the website:

```text
public/diagrams/blog/<slug>.svg
```

Diagrams should explain the article's core concept, such as:

- Document readiness workflow.
- Pickup readiness checks.
- Missing-document blocker path.
- LFD risk timeline.
- Freight exception prioritization.
- Connected shipment record model.

Diagrams should follow the existing Zettel diagram style where practical: clean nodes, green product emphasis, neutral backgrounds, readable labels, and minimal decorative noise.

## Citation Requirements

Every article must include both:

- Inline citations like `[1]`.
- A Sources section with matching numbered links.

Citation rules:

- Do not cite image source URLs as factual article sources unless the image page also supports a factual claim.
- Prefer authoritative sources for logistics, customs, demurrage/detention, port, carrier, or regulatory claims.
- Keep source labels readable.
- Ensure every inline citation has a matching Sources entry.
- Ensure every Sources entry is referenced at least once where practical.

## Error Handling

- Missing post slug: render `notFound()`.
- Missing required frontmatter during build: throw a clear error naming the file and field.
- Missing local image or diagram references: fail build or validation script before completion.
- Missing D2 CLI: stop diagram rendering and report the required install or render step.
- Image download failure: select a different reusable source rather than leaving a broken reference.

## Verification Plan

Before claiming implementation complete:

- Run `npm run lint`.
- Run `npm run build`.
- Inspect `/blog` and representative article pages locally.
- Verify all 18 posts are listed.
- Verify all article routes load.
- Search generated content for removed boilerplate patterns:
  - `What would you like to do next`
  - `writer-gpt.com`
  - `Translate this article`
  - `Private Prompt Library`
  - `Article Mode`
  - `Blog Article + Image Mode`
- Search final blog content for em dashes.
- Check that each post has a hero image, diagram, inline citations, and Sources section.
- Check that longer posts have 1 to 2 inline images.
- Check that image files and diagram files exist at referenced paths.
- Check that blog colors follow the landing page palette.

## Out Of Scope

- CMS integration.
- Search UI.
- Newsletter signup.
- Comments.
- Author profile system.
- Rich MDX components inside article bodies.
- Rewriting product positioning beyond what is needed to make articles readable and accurate.

## Open Assumptions

- The blog publication date can use the implementation date unless the user provides dates.
- Article order on `/blog` can be derived from the generated date/order metadata.
- Downloading images from allowed sources may require network approval.
- Rendering D2 diagrams depends on a working `d2` CLI or an approved install/render path.
