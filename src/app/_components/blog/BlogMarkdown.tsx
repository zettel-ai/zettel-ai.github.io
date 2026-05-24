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
          <h2 className="mt-12 text-3xl font-semibold leading-tight tracking-tight text-on-background">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 text-2xl font-semibold leading-tight tracking-tight text-on-background">
            {children}
          </h3>
        ),
        p: ({ children }) => <p className="mt-5 text-base leading-8 text-on-surface">{children}</p>,
        ul: ({ children }) => (
          <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-8 text-on-surface">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-5 list-decimal space-y-2 pl-6 text-base leading-8 text-on-surface">
            {children}
          </ol>
        ),
        li: ({ children }) => <li>{children}</li>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
          >
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
        th: ({ children }) => (
          <th className="border-b border-outline-variant bg-surface-container-low px-4 py-3 font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b border-outline-variant px-4 py-3 align-top">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
