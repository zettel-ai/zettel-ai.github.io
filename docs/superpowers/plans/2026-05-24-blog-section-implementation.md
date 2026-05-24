# Blog Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, polished blog section with 18 cleaned freight operations articles, reusable images, D2 diagrams, inline citations, and landing-page-matched styling.

**Architecture:** Use plain Markdown files with frontmatter in `src/content/blog`, parsed server-side by `src/app/_lib/blog.ts`, rendered by shared blog components, and exposed through App Router routes `/blog` and `/blog/[slug]`. Keep all images local under `public/images/blog`, all rendered diagrams under `public/diagrams/blog`, and all D2 source under `/Users/jallen/projects/zettel_ai/website_diagram/blog`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 design tokens, `gray-matter`, `react-markdown`, `remark-gfm`, D2 CLI 0.7.1, npm.

---

## References And Constraints

- Approved design spec: `docs/superpowers/specs/2026-05-24-blog-section-design.md`.
- Source articles: `/Users/jallen/projects/zettel_ai/assets/zettel_blogs/*.md`.
- App Router docs already checked:
  - `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
  - `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md`
  - `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md`
  - `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`
  - `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`
- Next 16 route params are promises in page and metadata functions. Use `const { slug } = await params`.
- `next.config.ts` has `output: "export"`, `images: { unoptimized: true }`, and `trailingSlash: true`; all blog article routes need `generateStaticParams`.
- The blog must reuse the existing landing palette from `src/app/globals.css`: green primary, neutral surfaces, Public Sans, restrained borders.
- Do not touch unrelated untracked files unless the user explicitly approves.

## File Structure

Create:

- `src/content/blog/*.md`: final cleaned posts.
- `src/app/_lib/blog.ts`: frontmatter parsing, content loading, validation, sorting, related-post helpers.
- `src/app/_components/blog/BlogCard.tsx`: post cards for `/blog`.
- `src/app/_components/blog/BlogMarkdown.tsx`: Markdown renderer and styled Markdown component mapping.
- `src/app/_components/blog/ArticleHero.tsx`: article hero image/title block.
- `src/app/_components/blog/ImageFigure.tsx`: captioned image block.
- `src/app/_components/blog/DiagramFigure.tsx`: captioned SVG diagram block.
- `src/app/_components/blog/SourcesList.tsx`: numbered source section.
- `src/app/blog/page.tsx`: blog index route.
- `src/app/blog/[slug]/page.tsx`: article route with `generateStaticParams` and `generateMetadata`.
- `scripts/clean-blog-sources.mjs`: repeatable draft conversion from raw source markdown to cleaned draft files.
- `scripts/validate-blog-content.mjs`: content, citation, path, boilerplate, and em-dash validation.
- `public/images/blog/<slug>/`: local blog images.
- `public/diagrams/blog/<slug>.svg`: rendered blog diagrams.
- `/Users/jallen/projects/zettel_ai/website_diagram/blog/<slug>.d2`: diagram source files.

Modify:

- `package.json`: add dependencies and validation script.
- `package-lock.json`: dependency lock updates.
- `src/app/_components/TopNav.tsx`: add Blog link while preserving pilot CTA.

## Slugs

Use these 18 slugs and map one source file to each during content conversion:

- `ai-freight-email-automation`
- `ai-freight-document-management`
- `ai-import-operations`
- `container-ready-for-pickup`
- `demurrage-vs-detention`
- `document-ownership-freight`
- `documents-needed-for-container-pickup`
- `freight-document-checklist`
- `freight-document-management`
- `freight-exception-management`
- `freight-operations-prioritization`
- `freight-visibility-tools-not-enough`
- `last-free-day-shipping`
- `missing-documents-last-free-day`
- `missing-shipping-documents`
- `shipment-readiness-checklist`
- `shipping-document-organization`
- `what-is-blocking-my-shipment`

---

### Task 1: Install Markdown Dependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Install runtime Markdown packages**

Run:

```bash
npm install gray-matter react-markdown remark-gfm
```

Expected: `package.json` includes `gray-matter`, `react-markdown`, and `remark-gfm`; `package-lock.json` updates.

- [ ] **Step 2: Add validation script entry**

Modify `package.json` scripts to include:

```json
"validate:blog": "node scripts/validate-blog-content.mjs"
```

Keep existing scripts unchanged.

- [ ] **Step 3: Run dependency sanity check**

Run:

```bash
npm run lint
```

Expected: lint passes or reports only pre-existing issues. If lint fails because `scripts/validate-blog-content.mjs` does not exist yet, do not run this step until Task 2 creates the script.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "Add blog markdown dependencies"
```

---

### Task 2: Add Blog Validation Script

**Files:**
- Create: `scripts/validate-blog-content.mjs`
- Modify: `package.json`

- [ ] **Step 1: Create the validator**

Create `scripts/validate-blog-content.mjs`:

```js
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import matter from "gray-matter";

const root = process.cwd();
const contentDir = path.join(root, "src/content/blog");
const publicDir = path.join(root, "public");
const requiredFields = [
  "title",
  "slug",
  "description",
  "date",
  "topic",
  "readTime",
  "heroImage",
  "diagram",
  "sources",
];

const bannedPatterns = [
  "What would you like to do next",
  "writer-gpt.com",
  "Translate this article",
  "Private Prompt Library",
  "Article Mode",
  "Blog Article + Image Mode",
];

function fail(message) {
  console.error(`Blog validation failed: ${message}`);
  process.exitCode = 1;
}

function publicPathExists(src) {
  if (typeof src !== "string" || !src.startsWith("/")) return false;
  return fs.existsSync(path.join(publicDir, src));
}

function countMatches(content, regex) {
  return Array.from(content.matchAll(regex)).length;
}

if (!fs.existsSync(contentDir)) {
  fail(`missing content directory: ${path.relative(root, contentDir)}`);
} else {
  const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".md"));

  if (files.length !== 18) {
    fail(`expected 18 blog posts, found ${files.length}`);
  }

  const slugs = new Set();

  for (const file of files) {
    const fullPath = path.join(contentDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);
    const label = path.relative(root, fullPath);

    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === "") {
        fail(`${label} missing frontmatter field "${field}"`);
      }
    }

    if (typeof data.slug === "string") {
      if (slugs.has(data.slug)) fail(`${label} duplicate slug "${data.slug}"`);
      slugs.add(data.slug);
      if (`${data.slug}.md` !== file) {
        fail(`${label} filename must match slug "${data.slug}.md"`);
      }
    }

    if (raw.includes("—")) fail(`${label} contains an em dash`);
    for (const pattern of bannedPatterns) {
      if (raw.includes(pattern)) fail(`${label} contains banned boilerplate: ${pattern}`);
    }

    if (!data.heroImage || !publicPathExists(data.heroImage.src)) {
      fail(`${label} heroImage.src is missing or does not exist`);
    }

    const inlineImages = Array.isArray(data.inlineImages) ? data.inlineImages : [];
    for (const image of inlineImages) {
      if (!publicPathExists(image.src)) fail(`${label} inline image is missing: ${image.src}`);
      if (!image.sourceUrl || !image.license) fail(`${label} inline image missing sourceUrl or license`);
    }

    if (!data.heroImage.sourceUrl || !data.heroImage.license) {
      fail(`${label} hero image missing sourceUrl or license`);
    }

    if (!data.diagram || !publicPathExists(data.diagram.src)) {
      fail(`${label} diagram.src is missing or does not exist`);
    }

    const sources = Array.isArray(data.sources) ? data.sources : [];
    if (sources.length === 0) fail(`${label} must include at least one factual source`);

    sources.forEach((source, index) => {
      if (!source.label || !source.url) {
        fail(`${label} source ${index + 1} missing label or url`);
      }
    });

    const citationCount = countMatches(content, /\[(\d+)\]/g);
    if (citationCount === 0) fail(`${label} has no inline citations`);

    for (let i = 1; i <= sources.length; i += 1) {
      if (!content.includes(`[${i}]`)) {
        fail(`${label} source ${i} is not cited inline`);
      }
    }

    if (!/## Sources\s*$/m.test(content)) {
      fail(`${label} missing "## Sources" section`);
    }

    if (content.trim().length < 1500) {
      fail(`${label} content is unexpectedly short`);
    }
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log("Blog validation passed.");
```

- [ ] **Step 2: Confirm validator fails before content exists**

Run:

```bash
npm run validate:blog
```

Expected: FAIL with `missing content directory: src/content/blog` or `expected 18 blog posts`.

- [ ] **Step 3: Commit**

```bash
git add package.json scripts/validate-blog-content.mjs
git commit -m "Add blog content validator"
```

---

### Task 3: Add Blog Content Loader

**Files:**
- Create: `src/app/_lib/blog.ts`
- Create: `src/content/blog/.gitkeep`

- [ ] **Step 1: Add content directory marker**

Create `src/content/blog/.gitkeep` as an empty file so the directory exists before posts are generated.

- [ ] **Step 2: Create `src/app/_lib/blog.ts`**

```ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogImage = {
  src: string;
  alt: string;
  caption?: string;
  credit: string;
  sourceUrl: string;
  license: string;
};

export type BlogDiagram = {
  src: string;
  alt: string;
  caption: string;
};

export type BlogSource = {
  label: string;
  url: string;
};

export type BlogPostMeta = {
  title: string;
  slug: string;
  description: string;
  date: string;
  topic: string;
  readTime: string;
  heroImage: BlogImage;
  inlineImages: BlogImage[];
  diagram: BlogDiagram;
  sources: BlogSource[];
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const postsDirectory = path.join(process.cwd(), "src/content/blog");

function assertString(value: unknown, field: string, file: string): asserts value is string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${file} is missing required string frontmatter field "${field}"`);
  }
}

function assertImage(value: unknown, field: string, file: string): asserts value is BlogImage {
  if (!value || typeof value !== "object") {
    throw new Error(`${file} is missing required image frontmatter field "${field}"`);
  }

  const image = value as Record<string, unknown>;
  for (const key of ["src", "alt", "credit", "sourceUrl", "license"]) {
    assertString(image[key], `${field}.${key}`, file);
  }
}

function assertDiagram(value: unknown, file: string): asserts value is BlogDiagram {
  if (!value || typeof value !== "object") {
    throw new Error(`${file} is missing required diagram frontmatter`);
  }

  const diagram = value as Record<string, unknown>;
  for (const key of ["src", "alt", "caption"]) {
    assertString(diagram[key], `diagram.${key}`, file);
  }
}

function assertSources(value: unknown, file: string): asserts value is BlogSource[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${file} must include at least one source`);
  }

  value.forEach((source, index) => {
    if (!source || typeof source !== "object") {
      throw new Error(`${file} source ${index + 1} must be an object`);
    }
    const sourceRecord = source as Record<string, unknown>;
    assertString(sourceRecord.label, `sources.${index}.label`, file);
    assertString(sourceRecord.url, `sources.${index}.url`, file);
  });
}

function parsePost(fileName: string): BlogPost {
  const fullPath = path.join(postsDirectory, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  for (const field of ["title", "slug", "description", "date", "topic", "readTime"]) {
    assertString(data[field], field, fileName);
  }

  assertImage(data.heroImage, "heroImage", fileName);
  assertDiagram(data.diagram, fileName);
  assertSources(data.sources, fileName);

  const inlineImages = Array.isArray(data.inlineImages) ? data.inlineImages : [];
  inlineImages.forEach((image, index) => assertImage(image, `inlineImages.${index}`, fileName));

  return {
    title: data.title,
    slug: data.slug,
    description: data.description,
    date: data.date,
    topic: data.topic,
    readTime: data.readTime,
    heroImage: data.heroImage,
    inlineImages,
    diagram: data.diagram,
    sources: data.sources,
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(parsePost)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllPostSlugs() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fileName = `${slug}.md`;
  const fullPath = path.join(postsDirectory, fileName);

  if (!fs.existsSync(fullPath)) return null;

  return parsePost(fileName);
}

export function getRelatedPosts(currentSlug: string, topic: string, limit = 3): BlogPostMeta[] {
  const sameTopic = getAllPosts().filter((post) => post.slug !== currentSlug && post.topic === topic);
  const otherPosts = getAllPosts().filter((post) => post.slug !== currentSlug && post.topic !== topic);

  return [...sameTopic, ...otherPosts].slice(0, limit);
}
```

- [ ] **Step 3: Run lint**

Run:

```bash
npm run lint
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/app/_lib/blog.ts src/content/blog/.gitkeep
git commit -m "Add blog content loader"
```

---

### Task 4: Build Blog Rendering Components

**Files:**
- Create: `src/app/_components/blog/BlogCard.tsx`
- Create: `src/app/_components/blog/ImageFigure.tsx`
- Create: `src/app/_components/blog/DiagramFigure.tsx`
- Create: `src/app/_components/blog/SourcesList.tsx`
- Create: `src/app/_components/blog/ArticleHero.tsx`
- Create: `src/app/_components/blog/BlogMarkdown.tsx`

- [ ] **Step 1: Create `ImageFigure.tsx`**

```tsx
import Image from "next/image";
import type { BlogImage } from "@/app/_lib/blog";

type ImageFigureProps = {
  image: BlogImage;
  priority?: boolean;
  className?: string;
};

export function ImageFigure({ image, priority = false, className = "" }: ImageFigureProps) {
  return (
    <figure className={`my-10 overflow-hidden border border-outline-variant bg-surface-container-lowest ${className}`}>
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 960px"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-on-background/45 to-transparent" />
      </div>
      {(image.caption || image.credit) && (
        <figcaption className="px-4 py-3 text-sm leading-6 text-on-surface-variant">
          {image.caption && <span>{image.caption} </span>}
          <a className="font-medium text-primary hover:underline" href={image.sourceUrl}>
            {image.credit}
          </a>
          <span> · {image.license}</span>
        </figcaption>
      )}
    </figure>
  );
}
```

- [ ] **Step 2: Create `DiagramFigure.tsx`**

```tsx
import Image from "next/image";
import type { BlogDiagram } from "@/app/_lib/blog";

type DiagramFigureProps = {
  diagram: BlogDiagram;
};

export function DiagramFigure({ diagram }: DiagramFigureProps) {
  return (
    <figure className="my-12 border border-outline-variant bg-surface-container-lowest p-4 shadow-sm">
      <div className="relative aspect-[16/10] w-full">
        <Image src={diagram.src} alt={diagram.alt} fill sizes="(max-width: 768px) 100vw, 900px" className="object-contain" />
      </div>
      <figcaption className="mt-3 border-t border-outline-variant pt-3 text-sm leading-6 text-on-surface-variant">
        {diagram.caption}
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 3: Create `SourcesList.tsx`**

```tsx
import type { BlogSource } from "@/app/_lib/blog";

type SourcesListProps = {
  sources: BlogSource[];
};

export function SourcesList({ sources }: SourcesListProps) {
  return (
    <section aria-labelledby="sources-heading" className="mt-14 border-t border-outline-variant pt-8">
      <h2 id="sources-heading" className="text-2xl font-semibold tracking-tight text-on-background">
        Sources
      </h2>
      <ol className="mt-5 space-y-3 text-sm leading-6 text-on-surface-variant">
        {sources.map((source, index) => (
          <li key={source.url}>
            <span className="font-semibold text-on-background">[{index + 1}] </span>
            <a className="text-primary hover:underline" href={source.url}>
              {source.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 4: Create `BlogCard.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/app/_lib/blog";

type BlogCardProps = {
  post: BlogPostMeta;
  priority?: boolean;
};

export function BlogCard({ post, priority = false }: BlogCardProps) {
  return (
    <article className="group overflow-hidden border border-outline-variant bg-surface-container-lowest transition-colors hover:border-primary">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.heroImage.src}
            alt={post.heroImage.alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-background/50 via-transparent to-transparent" />
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
            <span>{post.topic}</span>
            <span className="text-outline">/</span>
            <span>{post.readTime}</span>
          </div>
          <h2 className="mt-3 text-xl font-semibold leading-7 tracking-tight text-on-background group-hover:text-primary">
            {post.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant">{post.description}</p>
        </div>
      </Link>
    </article>
  );
}
```

- [ ] **Step 5: Create `ArticleHero.tsx`**

```tsx
import type { BlogPost } from "@/app/_lib/blog";
import { ImageFigure } from "./ImageFigure";

type ArticleHeroProps = {
  post: BlogPost;
};

export function ArticleHero({ post }: ArticleHeroProps) {
  return (
    <header className="bg-surface-container-lowest pt-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{post.topic}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-on-background md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-on-surface-variant">{post.description}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-on-surface-variant">
            <span>{post.date}</span>
            <span aria-hidden="true">/</span>
            <span>{post.readTime}</span>
          </div>
        </div>
        <ImageFigure image={post.heroImage} priority className="mb-0" />
      </div>
    </header>
  );
}
```

- [ ] **Step 6: Create `BlogMarkdown.tsx`**

```tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BlogMarkdownProps = {
  content: string;
};

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="mt-12 text-3xl font-semibold leading-tight tracking-tight text-on-background">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 text-2xl font-semibold leading-tight tracking-tight text-on-background">{children}</h3>
        ),
        p: ({ children }) => <p className="mt-5 text-base leading-8 text-on-surface">{children}</p>,
        ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-8 text-on-surface">{children}</ul>,
        ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-base leading-8 text-on-surface">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        a: ({ href, children }) => (
          <a href={href} className="font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="mt-8 border-l-4 border-primary bg-surface-container-low px-5 py-4 text-on-surface-variant">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="mt-8 overflow-x-auto border border-outline-variant">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="border-b border-outline-variant bg-surface-container-low px-4 py-3 font-semibold">{children}</th>,
        td: ({ children }) => <td className="border-b border-outline-variant px-4 py-3 align-top">{children}</td>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
```

- [ ] **Step 7: Run lint**

Run:

```bash
npm run lint
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/app/_components/blog
git commit -m "Add blog rendering components"
```

---

### Task 5: Add Blog Routes And Navigation

**Files:**
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/_components/TopNav.tsx`

- [ ] **Step 1: Add `/blog` index page**

Create `src/app/blog/page.tsx`:

```tsx
import type { Metadata } from "next";
import { BlogCard } from "@/app/_components/blog/BlogCard";
import { Footer } from "@/app/_components/Footer";
import { TopNav } from "@/app/_components/TopNav";
import { getAllPosts } from "@/app/_lib/blog";

export const metadata: Metadata = {
  title: "Blog | Zettel Ops",
  description: "Practical freight operations guides for import, drayage, document readiness, and pickup readiness teams.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <TopNav />
      <main className="flex-grow bg-background pt-20">
        <section className="border-b border-outline-variant bg-surface-container-lowest">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Zettel Ops Blog</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-on-background md:text-5xl">
              Freight operations guides for teams that need cleaner shipment context.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-on-surface-variant">
              Practical articles on document readiness, pickup blockers, last free day risk, and the workflows behind faster exception resolution.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14">
          {featured && (
            <div className="mb-12">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary">Featured</p>
              <div className="max-w-3xl">
                <BlogCard post={featured} priority />
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Add `/blog/[slug]` page**

Create `src/app/blog/[slug]/page.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleHero } from "@/app/_components/blog/ArticleHero";
import { BlogCard } from "@/app/_components/blog/BlogCard";
import { BlogMarkdown } from "@/app/_components/blog/BlogMarkdown";
import { DiagramFigure } from "@/app/_components/blog/DiagramFigure";
import { ImageFigure } from "@/app/_components/blog/ImageFigure";
import { SourcesList } from "@/app/_components/blog/SourcesList";
import { Footer } from "@/app/_components/Footer";
import { TopNav } from "@/app/_components/TopNav";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/app/_lib/blog";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog post not found | Zettel Ops",
    };
  }

  return {
    title: `${post.title} | Zettel Ops`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.heroImage.src],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, post.topic);

  return (
    <>
      <TopNav />
      <main className="flex-grow bg-background">
        <ArticleHero post={post} />
        <article className="mx-auto max-w-3xl px-6 py-12">
          <BlogMarkdown content={post.content.replace(/\n## Sources[\s\S]*$/m, "")} />
          {post.inlineImages.map((image) => (
            <ImageFigure key={image.src} image={image} />
          ))}
          <DiagramFigure diagram={post.diagram} />
          <SourcesList sources={post.sources} />
        </article>

        {relatedPosts.length > 0 && (
          <section className="border-t border-outline-variant bg-surface-container-low px-6 py-14">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-2xl font-semibold tracking-tight text-on-background">Related Posts</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Add Blog link to nav**

Modify `src/app/_components/TopNav.tsx` so the button group includes a Blog link before the pilot CTA:

```tsx
<div className="flex items-center gap-4">
  <a
    href="/blog"
    className="text-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
  >
    Blog
  </a>
  <a
    href="/#early-access"
    aria-label="Request a Pilot — schedule a time to talk with us"
    className="group relative inline-flex items-center justify-center h-10 px-6 text-sm font-medium text-white bg-primary hover:bg-on-primary-fixed-variant transition-colors active:scale-95 duration-150"
  >
    Request a Pilot
    <span className="pointer-events-none absolute top-full right-0 mt-2 px-3 py-1.5 rounded-md bg-inverse-surface text-inverse-on-surface text-xs font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
      Schedule a time to talk with us
    </span>
  </a>
</div>
```

- [ ] **Step 4: Run build before content**

Run:

```bash
npm run build
```

Expected: PASS with empty blog index if no posts exist yet. If `generateStaticParams` returns no routes, static export still succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/app/blog src/app/_components/TopNav.tsx
git commit -m "Add blog routes"
```

---

### Task 6: Add Draft Content Conversion Script

**Files:**
- Create: `scripts/clean-blog-sources.mjs`

- [ ] **Step 1: Create source-to-slug mapping script**

Create `scripts/clean-blog-sources.mjs`:

```js
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const sourceDir = "/Users/jallen/projects/zettel_ai/assets/zettel_blogs";
const outputDir = path.join(process.cwd(), ".blog-drafts");

const posts = [
  ["blog.md", "ai-freight-email-automation"],
  ["blog copy 17.md", "ai-freight-document-management"],
  ["blog copy 16.md", "ai-import-operations"],
  ["blog copy 13.md", "container-ready-for-pickup"],
  ["blog copy 5.md", "demurrage-vs-detention"],
  ["blog copy 11.md", "document-ownership-freight"],
  ["blog copy 15.md", "documents-needed-for-container-pickup"],
  ["blog copy 12.md", "freight-document-checklist"],
  ["blog copy 2.md", "freight-document-management"],
  ["blog copy 3.md", "freight-exception-management"],
  ["blog copy 6.md", "freight-operations-prioritization"],
  ["blog copy 4.md", "freight-visibility-tools-not-enough"],
  ["blog copy 8.md", "last-free-day-shipping"],
  ["blog copy 10.md", "missing-documents-last-free-day"],
  ["blog copy 7.md", "missing-shipping-documents"],
  ["blog copy 9.md", "shipment-readiness-checklist"],
  ["blog copy 14.md", "shipping-document-organization"],
  ["blog copy.md", "what-is-blocking-my-shipment"],
];

const boilerplateStartPatterns = [
  /^## \*\*(Comprehensive |SEO ).*?Outline\*\*[\s\S]*?(?=^# )/m,
];

const boilerplateEndPatterns = [
  /\n+You can switch between modes anytime[\s\S]*$/m,
  /\n+What would you like to do next\?[\s\S]*$/m,
];

function stripMarkdownBoldFromHeadings(markdown) {
  return markdown.replace(/^(#{1,4}) \*\*(.*?)\*\*\s*$/gm, "$1 $2");
}

function stripBoilerplate(markdown) {
  let cleaned = markdown;
  for (const pattern of boilerplateStartPatterns) cleaned = cleaned.replace(pattern, "");
  for (const pattern of boilerplateEndPatterns) cleaned = cleaned.replace(pattern, "");
  return cleaned;
}

function removeFirstH1(markdown) {
  return markdown.replace(/^# .*\n+/, "");
}

function normalize(markdown) {
  return removeFirstH1(stripMarkdownBoldFromHeadings(stripBoilerplate(markdown)))
    .replaceAll("—", ", ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

fs.mkdirSync(outputDir, { recursive: true });

for (const [sourceFile, slug] of posts) {
  const sourcePath = path.join(sourceDir, sourceFile);
  const raw = fs.readFileSync(sourcePath, "utf8");
  const body = normalize(raw);
  fs.writeFileSync(path.join(outputDir, `${slug}.md`), `${body}\n`);
}

console.log(`Wrote ${posts.length} draft blog posts to ${path.relative(process.cwd(), outputDir)}`);
```

- [ ] **Step 2: Run draft conversion**

Run:

```bash
node scripts/clean-blog-sources.mjs
```

Expected: `Wrote 18 draft blog posts to .blog-drafts`.

- [ ] **Step 3: Confirm draft bodies have no known source boilerplate**

Run:

```bash
rg -n "What would you like to do next|writer-gpt.com|Translate this article|Private Prompt Library|Article Mode|Blog Article \\+ Image Mode|—" .blog-drafts
```

Expected: no matches.

- [ ] **Step 4: Commit script only**

```bash
git add scripts/clean-blog-sources.mjs
git commit -m "Add blog source conversion script"
```

Do not commit `.blog-drafts`; it is a working aid for the editorial pass.

---

### Task 7: Research, Download, And Attribute Images

**Files:**
- Create: `public/images/blog/<slug>/*`
- Create: `docs/superpowers/blog-image-sources.md`

- [ ] **Step 1: Create image directories**

Run:

```bash
mkdir -p public/images/blog/ai-freight-email-automation public/images/blog/ai-freight-document-management public/images/blog/ai-import-operations public/images/blog/container-ready-for-pickup public/images/blog/demurrage-vs-detention public/images/blog/document-ownership-freight public/images/blog/documents-needed-for-container-pickup public/images/blog/freight-document-checklist public/images/blog/freight-document-management public/images/blog/freight-exception-management public/images/blog/freight-operations-prioritization public/images/blog/freight-visibility-tools-not-enough public/images/blog/last-free-day-shipping public/images/blog/missing-documents-last-free-day public/images/blog/missing-shipping-documents public/images/blog/shipment-readiness-checklist public/images/blog/shipping-document-organization public/images/blog/what-is-blocking-my-shipment
```

- [ ] **Step 2: Select reusable images**

For each post, choose:

- One hero image.
- One inline image for posts over 2,500 words.
- Two inline images for posts over 3,500 words.

Only use image pages with clear reusable licensing from Unsplash, Pexels, Wikimedia Commons, or another source with explicit reuse terms.

- [ ] **Step 3: Download images**

Use `curl -L` or browser download to save images as:

```text
public/images/blog/<slug>/hero.jpg
public/images/blog/<slug>/inline-1.jpg
public/images/blog/<slug>/inline-2.jpg
```

Use `.png` instead of `.jpg` only when the source format needs transparency or the source file is PNG-only.

- [ ] **Step 4: Record image metadata**

Create `docs/superpowers/blog-image-sources.md` and record complete image metadata for each post:

```markdown
# Blog Image Sources

## freight-document-management

Hero:
- Local path: `/images/blog/freight-document-management/hero.jpg`
- Alt: `Container terminal with stacked shipping containers`
- Caption: `Freight document problems often surface only after a container is close to pickup.`
- Credit: `Creator or source name from the image page`
- Source URL: `Original image page URL`
- License: `Unsplash License, Pexels License, or exact Wikimedia Commons license`

Inline 1:
- Local path: `/images/blog/freight-document-management/inline-1.jpg`
- Alt: `Freight documents and a laptop on an operations desk`
- Caption: `A clean shipment file gives operations teams a faster way to see what is missing.`
- Credit: `Creator or source name from the image page`
- Source URL: `Original image page URL`
- License: `Unsplash License, Pexels License, or exact Wikimedia Commons license`
```

- Repeat that section for all 18 slugs.

- [ ] **Step 5: Commit images and image source inventory**

```bash
git add public/images/blog docs/superpowers/blog-image-sources.md
git commit -m "Add reusable blog images"
```

---

### Task 8: Create And Render D2 Diagrams

**Files:**
- Create: `/Users/jallen/projects/zettel_ai/website_diagram/blog/*.d2`
- Create: `public/diagrams/blog/*.svg`
- Create: `docs/superpowers/blog-diagram-sources.md`

- [ ] **Step 1: Create diagram source/output directories**

Run:

```bash
mkdir -p /Users/jallen/projects/zettel_ai/website_diagram/blog public/diagrams/blog
```

- [ ] **Step 2: Create one D2 file per slug**

Each file should use the landing diagram style: neutral background, green product emphasis, readable node labels, and clean workflow arrows. Use this base style and customize the nodes for the article:

```d2
vars: {
  d2-config: {
    layout-engine: elk
  }
}

direction: right

classes: {
  source: {
    style: {
      fill: "#FFFFFF"
      stroke: "#BECABB"
      stroke-width: 1
      border-radius: 8
      font-color: "#3F4A3E"
    }
  }
  zettel: {
    style: {
      fill: "#006527"
      stroke: "#00531E"
      stroke-width: 2
      border-radius: 10
      font-color: "#FFFFFF"
      bold: true
    }
  }
  outcome: {
    style: {
      fill: "#F5F3F3"
      stroke: "#BECABB"
      stroke-width: 1
      border-radius: 8
      font-color: "#1B1C1C"
    }
  }
}
```

Example for `freight-document-management.d2`:

```d2
email: "Email attachments" { class: source }
portals: "Carrier and terminal portals" { class: source }
drive: "Shared drives" { class: source }
zettel: "Connected shipment record" { class: zettel }
ready: "Document readiness" { class: outcome }
pickup: "Pickup readiness" { class: outcome }
exceptions: "Earlier exception action" { class: outcome }

email -> zettel
portals -> zettel
drive -> zettel
zettel -> ready
ready -> pickup
ready -> exceptions
```

- [ ] **Step 3: Render all diagrams**

Run one render command per file:

```bash
d2 /Users/jallen/projects/zettel_ai/website_diagram/blog/freight-document-management.d2 public/diagrams/blog/freight-document-management.svg
```

Repeat for all 18 slug files.

- [ ] **Step 4: Record diagram metadata**

Create `docs/superpowers/blog-diagram-sources.md` and record the diagram metadata that the final post frontmatter will use:

```markdown
# Blog Diagram Sources

## freight-document-management

- D2 source: `/Users/jallen/projects/zettel_ai/website_diagram/blog/freight-document-management.d2`
- SVG path: `/diagrams/blog/freight-document-management.svg`
- Alt: `Workflow diagram showing scattered freight documents becoming a connected shipment record`
- Caption: `How scattered shipment files become a connected shipment record that supports document readiness and pickup readiness.`
```

- Repeat that section for all 18 slugs.

- [ ] **Step 5: Commit website diagram repo changes**

Run from `/Users/jallen/projects/zettel_ai/website_diagram`:

```bash
git status --short
git add blog
git commit -m "Add blog D2 diagrams"
```

Do not include unrelated existing modified files in that repository.

- [ ] **Step 6: Commit landing repo diagram outputs**

Run from `/Users/jallen/projects/zettel_ai/zettel_landing_page`:

```bash
git add public/diagrams/blog docs/superpowers/blog-diagram-sources.md
git commit -m "Add rendered blog diagrams"
```

---

### Task 9: Final Editorial And Citation Pass

**Files:**
- Modify: `src/content/blog/*.md`

- [ ] **Step 1: Rewrite each post**

For every file in `src/content/blog`, complete these edits:

- Remove source outlines and prompt boilerplate.
- Rewrite title and headings into natural title case.
- Remove em dashes.
- Shorten long paragraphs.
- Remove repetitive AI-generated transitions.
- Keep claims conservative.
- Keep practical FAQs when useful.
- Add operational examples where the article feels generic.

- [ ] **Step 2: Add factual sources**

Each article must have real sources in frontmatter:

```yaml
sources:
  - label: "Readable source title"
    url: "https://source-url"
```

Prefer authoritative factual sources such as FMC, CBP, port/terminal guidance, carrier guidance, logistics education pages, or standards bodies. Image source URLs stay in image metadata and do not count as factual sources unless they support a factual claim.

- [ ] **Step 3: Add inline citations**

Use citations in the Markdown body like:

```markdown
Demurrage usually relates to cargo or containers remaining at a terminal beyond allowed free time [1].
```

Every source in frontmatter must be cited at least once with its matching number.

- [ ] **Step 4: Keep a Sources section**

Every post must end with:

```markdown
## Sources

[1] Source title.
[2] Source title.
```

The source titles in this section must match the frontmatter source labels.

- [ ] **Step 5: Run content validation**

Run:

```bash
npm run validate:blog
```

Expected: PASS.

- [ ] **Step 6: Commit final content**

```bash
git add src/content/blog
git commit -m "Add cleaned blog articles"
```

---

### Task 10: Integrate Inline Images And Diagrams In Article Flow

**Files:**
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/content/blog/*.md`

- [ ] **Step 1: Add image insertion markers**

In posts with inline images, add markers where images should appear:

```markdown
{{image:0}}
```

and:

```markdown
{{image:1}}
```

Add the diagram marker where the D2 diagram best explains the article:

```markdown
{{diagram}}
```

- [ ] **Step 2: Update article page renderer**

Replace the article body rendering in `src/app/blog/[slug]/page.tsx` with section splitting:

```tsx
const bodyWithoutSources = post.content.replace(/\n## Sources[\s\S]*$/m, "");
const parts = bodyWithoutSources.split(/(\{\{image:\d+\}\}|\{\{diagram\}\})/g);
```

Render inside the article:

```tsx
{parts.map((part, index) => {
  const imageMatch = part.match(/^\{\{image:(\d+)\}\}$/);

  if (imageMatch) {
    const image = post.inlineImages[Number(imageMatch[1])];
    return image ? <ImageFigure key={`${part}-${index}`} image={image} /> : null;
  }

  if (part === "{{diagram}}") {
    return <DiagramFigure key={`${part}-${index}`} diagram={post.diagram} />;
  }

  return <BlogMarkdown key={index} content={part} />;
})}
```

Remove the old unconditional inline image and diagram rendering so visuals appear in context.

- [ ] **Step 3: Validate markers**

Extend `scripts/validate-blog-content.mjs` so it fails if:

- A post has `inlineImages` but no matching `{{image:N}}` marker.
- A post has an image marker with no matching image metadata.
- A post has no `{{diagram}}` marker.

Use this code after citation checks:

```js
const imageMarkers = Array.from(content.matchAll(/\{\{image:(\d+)\}\}/g)).map((match) => Number(match[1]));
for (const markerIndex of imageMarkers) {
  if (!inlineImages[markerIndex]) fail(`${label} has image marker without inline image metadata: ${markerIndex}`);
}
if (inlineImages.length > 0) {
  for (let i = 0; i < inlineImages.length; i += 1) {
    if (!imageMarkers.includes(i)) fail(`${label} inline image ${i} is not placed with an image marker`);
  }
}
if (!content.includes("{{diagram}}")) fail(`${label} missing diagram marker`);
```

- [ ] **Step 4: Run validation and build**

Run:

```bash
npm run validate:blog
npm run build
```

Expected: both PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/blog/[slug]/page.tsx scripts/validate-blog-content.mjs src/content/blog
git commit -m "Place blog visuals in article flow"
```

---

### Task 11: Final Visual QA And Polish

**Files:**
- Modify as needed: `src/app/_components/blog/*.tsx`
- Modify as needed: `src/app/blog/page.tsx`
- Modify as needed: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Start local dev server**

Run:

```bash
npm run dev
```

Expected: app starts on `http://localhost:3000` or the next available port.

- [ ] **Step 2: Inspect pages**

Open and inspect:

```text
http://localhost:3000/blog
http://localhost:3000/blog/freight-document-management
http://localhost:3000/blog/last-free-day-shipping
http://localhost:3000/blog/container-ready-for-pickup
```

Check:

- Blog index cards do not overflow on mobile or desktop.
- Hero image fades feel integrated with the landing palette.
- Article text line length is readable.
- Captions and source links are visible but not noisy.
- D2 diagrams are readable.
- Related posts do not dominate the article.
- Blog colors match `src/app/globals.css` tokens.

- [ ] **Step 3: Fix visual issues**

If text is too wide, keep article content at `max-w-3xl`. If images feel too tall, keep hero images at `aspect-[16/9]`. If diagrams are cramped, use `aspect-[16/10]` with `object-contain`.

- [ ] **Step 4: Run final checks**

Run:

```bash
npm run validate:blog
npm run lint
npm run build
```

Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/_components/blog src/app/blog
git commit -m "Polish blog visual design"
```

---

### Task 12: Final Repository Audit

**Files:**
- No intended file changes unless checks reveal issues.

- [ ] **Step 1: Confirm no banned content remains**

Run:

```bash
rg -n "What would you like to do next|writer-gpt.com|Translate this article|Private Prompt Library|Article Mode|Blog Article \\+ Image Mode" src/content/blog
```

Expected: no matches.

- [ ] **Step 2: Confirm no em dashes remain**

Run:

```bash
rg -n "—" src/content/blog
```

Expected: no matches.

- [ ] **Step 3: Confirm all routes build**

Run:

```bash
npm run build
```

Expected: PASS and static export includes `/blog` plus 18 `/blog/<slug>/` routes.

- [ ] **Step 4: Check working tree**

Run:

```bash
git status --short
```

Expected: only intentionally untracked user files remain. Do not stage `.serena/` or unrelated existing image files unless the user asks.

- [ ] **Step 5: Final handoff**

Report:

- Number of posts added.
- Image sources used and license types.
- Diagram source/output locations.
- Validation commands run.
- Any skipped checks or unresolved risks.
