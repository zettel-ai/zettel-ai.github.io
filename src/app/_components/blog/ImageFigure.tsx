import Image from "next/image";

import type { BlogImage } from "@/app/_lib/blog";

type ImageFigureProps = {
  image: BlogImage;
  priority?: boolean;
  className?: string;
};

export function ImageFigure({ image, priority = false, className = "" }: ImageFigureProps) {
  return (
    <figure
      className={`my-10 overflow-hidden border border-outline-variant bg-surface-container-lowest ${className}`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden [content-visibility:auto]">
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
          <a
            className="font-medium text-primary hover:underline"
            href={image.sourceUrl}
            rel="noreferrer"
            target="_blank"
          >
            {image.credit}
          </a>
          <span> / {image.license}</span>
        </figcaption>
      )}
    </figure>
  );
}
