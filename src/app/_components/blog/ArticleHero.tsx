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
            <time dateTime={post.date}>{post.date}</time>
            <span aria-hidden="true">/</span>
            <span>{post.readTime}</span>
          </div>
        </div>
        <ImageFigure image={post.heroImage} priority className="mb-0" />
      </div>
    </header>
  );
}
