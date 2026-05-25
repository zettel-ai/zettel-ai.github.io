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
        <div className="relative aspect-[16/10] overflow-hidden [content-visibility:auto]">
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
            <span className="text-outline" aria-hidden="true">
              /
            </span>
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
