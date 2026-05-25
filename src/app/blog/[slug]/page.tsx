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

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog post not found | Zettel Ops",
      description: "The requested Zettel Ops blog post could not be found.",
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
  const contentWithoutSources = post.content.replace(/\n## Sources[\s\S]*$/m, "");

  return (
    <>
      <TopNav />
      <main className="flex-grow bg-background">
        <ArticleHero post={post} />
        <article className="mx-auto max-w-3xl px-6 py-12">
          <BlogMarkdown content={contentWithoutSources} />
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
