import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type MarkdownProps = {
  source: string;
};

// react-markdown passes its internal hast `node` to every component renderer.
// It is not a DOM prop — strip it before spreading onto elements.
function domProps<P extends { node?: unknown }>(props: P): Omit<P, "node"> {
  const copy = { ...props };
  delete copy.node;
  return copy;
}

export function Markdown({ source }: MarkdownProps) {
  return (
    <div className="blog-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // highlight.js ships no solidity grammar; solidity is close enough to
        // javascript (function/returns/comments/numbers) for token colors.
        rehypePlugins={[[rehypeHighlight, { aliases: { javascript: ["solidity"] } }]]}
        components={{
          a: (rawProps) => {
            const { href, children, ...props } = domProps(rawProps);
            const external = typeof href === "string" && /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...props}
              >
                {children}
              </a>
            );
          },
          table: (rawProps) => {
            const props = domProps(rawProps);
            return (
              <div className="table-scroll">
                <table {...props} />
              </div>
            );
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
