import Image from "next/image";

import type { BlogDiagram } from "@/app/_lib/blog";

type DiagramFigureProps = {
  diagram: BlogDiagram;
};

export function DiagramFigure({ diagram }: DiagramFigureProps) {
  return (
    <figure className="my-12 border border-outline-variant bg-surface-container-lowest p-4 shadow-sm">
      <div className="relative aspect-[16/10] w-full [content-visibility:auto]">
        <Image
          src={diagram.src}
          alt={diagram.alt}
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          className="object-contain"
        />
      </div>
      <figcaption className="mt-3 border-t border-outline-variant pt-3 text-sm leading-6 text-on-surface-variant">
        {diagram.caption}
      </figcaption>
    </figure>
  );
}
