import type { Metadata } from "next";

import { BlogCard } from "@/app/_components/blog/BlogCard";
import { Footer } from "@/app/_components/Footer";
import { TopNav } from "@/app/_components/TopNav";
import { getAllPosts } from "@/app/_lib/blog";

export const metadata: Metadata = {
  title: "Blog | Zettel Ops",
  description:
    "Practical freight operations guides for import, drayage, document readiness, and pickup readiness teams.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <TopNav />
      <main className="flex-grow bg-background pt-20">
        <section className="border-b border-outline-variant bg-surface-container-lowest">
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Zettel Ops Blog</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-on-background md:text-5xl">
              Freight operations guides for teams that need cleaner shipment context.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-on-surface-variant">
              Practical articles on document readiness, pickup blockers, last free day risk, and the workflows behind
              faster exception resolution.
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

          {rest.length > 0 && (
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary">Latest</p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
