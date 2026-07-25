"use client";

import "highlight.js/styles/base16/dracula.min.css";
import { isValidElement, ReactNode, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import {
  type BlogTocItem,
  createHeadingSlugger,
  extractBlogTocItems,
} from "./toc";

interface Props {
  content: string;
}

const BlogDetail = ({ content }: Props) => {
  // console.log("content", content);
  const tocItems = useMemo(() => extractBlogTocItems(content), [content]);
  const headingSlug = createHeadingSlugger();

  return (
    <div className="w-full max-w-4xl min-w-0">
      <div className="xl:hidden">
        <BlogTableOfContents items={tocItems} />
      </div>
      {/* {content} */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeHighlight, { ignoreMissing: true }]]}
        components={{
          h1: createHeadingComponent(
            "h1",
            "break-words text-2xl font-bold leading-tight sm:text-3xl"
          ),
          h2: createHeadingComponent(
            "h2",
            "break-words text-2xl font-bold leading-tight sm:text-3xl",
            headingSlug
          ),
          h3: createHeadingComponent(
            "h3",
            "break-words text-xl font-bold leading-tight sm:text-2xl",
            headingSlug
          ),
          h4: createHeadingComponent(
            "h4",
            "break-words text-lg font-bold leading-tight sm:text-xl"
          ),
          // hr: (props) => <hr className="my-4" {...props} />,
          img: (props) => (
            <img
              className="my-6 h-auto max-w-full rounded border border-rule"
              {...props}
            />
          ),
          ul: ({ children }) => <ul className="list-disc">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal">{children}</ol>,
          li: ({ children }) => (
            <li className="mb-2">
              <div>{children}</div>
            </li>
          ),
          a: (props) => (
            <a
              className="text-signal underline underline-offset-[3px]"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          pre: (props) => (
            <pre
              className="bg-[color-mix(in_srgb,var(--ink)_5%,transparent)] text-ink my-3 rounded overflow-x-auto"
              {...props}
            />
          ),
          code: (props) => (
            <code
              className="text-sm font-mono bg-[color-mix(in_srgb,var(--ink)_7%,transparent)] text-ink rounded"
              {...props}
            />
          ),
          p: (props) => <p className="text-lg" {...props} />,
          table: (props) => (
            <div className="my-6 w-full overflow-x-auto">
              <table
                className="min-w-full table-auto border-collapse"
                {...props}
              />
            </div>
          ),
          td: (props) => (
            <td
              className="border border-rule p-2"
              {...props}
            />
          ),
          th: (props) => (
            <th
              className="border border-rule p-2"
              {...props}
            />
          ),
          blockquote: (props) => (
            <blockquote
              className="border-l-2 border-rule text-muted py-1 pl-5 pr-3"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export const BlogTocSidebar = ({ content }: Props) => {
  const tocItems = useMemo(() => extractBlogTocItems(content), [content]);

  return (
    <aside className="hidden w-64 self-start xl:sticky xl:top-24 xl:block">
      <BlogTableOfContents items={tocItems} variant="sidebar" />
    </aside>
  );
};

const BlogTableOfContents = ({
  items,
  variant = "inline",
}: {
  items: BlogTocItem[];
  variant?: "inline" | "sidebar";
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="글 목차"
      className={
        variant === "sidebar"
          ? "max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-rule pl-5"
          : "mb-10 border-l border-rule pl-5"
      }
    >
      <h2
        className={
          variant === "sidebar"
            ? "pb-3 text-base font-semibold"
            : "pb-3 text-xl font-semibold"
        }
      >
        목차
      </h2>
      <ol className="m-0 flex list-none flex-col gap-2 p-0">
        {items.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "pl-4" : ""}>
            <a
              className="block text-sm leading-6 text-muted underline-offset-4 transition-colors hover:text-signal hover:underline"
              href={`#${item.id}`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

const createHeadingComponent = (
  Tag: "h1" | "h2" | "h3" | "h4",
  className: string,
  slug?: ReturnType<typeof createHeadingSlugger>
) => {
  const Heading = ({
    children,
    ...props
  }: {
    children?: ReactNode;
    [key: string]: unknown;
  }) => {
    const title = textFromReactNode(children);
    const id = slug && title.length > 0 ? slug(title) : undefined;

    return (
      <Tag className={className} id={id} {...props}>
        {children}
      </Tag>
    );
  };

  return Heading;
};

const textFromReactNode = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(textFromReactNode).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textFromReactNode(node.props.children);
  }

  return "";
};

export default BlogDetail;
