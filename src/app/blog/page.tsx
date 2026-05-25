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
        <section id="featured" className="border-b border-outline-variant bg-surface-container-lowest">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:py-16 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Zettel Ops Blog</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-on-background md:text-5xl">
                Freight operations guides for teams that need cleaner shipment context.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-on-surface-variant">
                Practical articles on document readiness, pickup blockers, last free day risk, and the workflows behind
                faster exception resolution.
              </p>
            </div>

            {featured && (
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary">Featured</p>
                <BlogCard post={featured} priority />
              </div>
            )}
          </div>
        </section>

        <section id="latest" className="mx-auto max-w-7xl px-6 py-14">
          {posts.length === 0 && (
            <div className="max-w-2xl border-l-4 border-primary bg-surface-container-low px-6 py-5">
              <h2 className="text-xl font-semibold tracking-tight text-on-background">No posts published yet</h2>
              <p className="mt-2 text-base leading-7 text-on-surface-variant">
                Blog posts are being prepared and will be published here as soon as they are ready.
              </p>
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
