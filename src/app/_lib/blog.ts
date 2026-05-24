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
    .map((post) => ({
      title: post.title,
      slug: post.slug,
      description: post.description,
      date: post.date,
      topic: post.topic,
      readTime: post.readTime,
      heroImage: post.heroImage,
      inlineImages: post.inlineImages,
      diagram: post.diagram,
      sources: post.sources,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllPostSlugs(): { slug: string }[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fileName = `${slug}.md`;
  const fullPath = path.join(postsDirectory, fileName);

  if (!fs.existsSync(fullPath)) return null;

  return parsePost(fileName);
}

export function getRelatedPosts(currentSlug: string, topic: string, limit = 3): BlogPostMeta[] {
  const posts = getAllPosts().filter((post) => post.slug !== currentSlug);
  const sameTopic = posts.filter((post) => post.topic === topic);
  const otherPosts = posts.filter((post) => post.topic !== topic);

  return [...sameTopic, ...otherPosts].slice(0, limit);
}
