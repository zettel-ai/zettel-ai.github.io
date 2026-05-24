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
            <a className="text-primary hover:underline" href={source.url} rel="noreferrer" target="_blank">
              {source.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
