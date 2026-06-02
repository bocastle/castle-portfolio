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
    <div className="w-full max-w-4xl">
      <BlogTableOfContents items={tocItems} />
      {/* {content} */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          h1: createHeadingComponent("h1", "text-3xl font-bold"),
          h2: createHeadingComponent("h2", "text-3xl font-bold", headingSlug),
          h3: createHeadingComponent("h3", "text-3xl font-bold", headingSlug),
          h4: createHeadingComponent("h4", "text-3xl font-bold"),
          // hr: (props) => <hr className="my-4" {...props} />,
          img: (props) => <img {...props} />,
          ul: ({ children }) => <ul className="list-disc">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal">{children}</ol>,
          li: ({ children }) => (
            <li className="mb-2">
              <div>{children}</div>
            </li>
          ),
          a: (props) => (
            <a
              className="text-blue-600 dark:text-sky-300 underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          pre: (props) => (
            <pre
              className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 my-3 rounded overflow-x-auto"
              {...props}
            />
          ),
          code: (props) => (
            <code
              className="text-sm font-mono bg-gray-100 dark:bg-gray-900 text-teal-700 dark:text-teal-200 rounded"
              {...props}
            />
          ),
          p: (props) => <p className="text-lg" {...props} />,
          table: (props) => (
            <table className="table-auto w-full border-collapse" {...props} />
          ),
          td: (props) => (
            <td
              className="border border-gray-300 dark:border-slate-600 p-2"
              {...props}
            />
          ),
          th: (props) => (
            <th
              className="border border-gray-300 dark:border-slate-600 p-2"
              {...props}
            />
          ),
          blockquote: (props) => (
            <blockquote
              className="border-l-4 border-gray-300 dark:border-slate-500 bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-100 py-3 pl-4 pr-3 rounded-r"
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

const BlogTableOfContents = ({ items }: { items: BlogTocItem[] }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="글 목차"
      className="mb-10 rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-slate-700 dark:bg-slate-900"
    >
      <h2 className="pb-3 text-xl font-semibold">목차</h2>
      <ol className="m-0 flex list-none flex-col gap-2 p-0">
        {items.map((item) => (
          <li key={item.id} className={item.depth === 3 ? "pl-4" : ""}>
            <a
              className="text-sm text-gray-700 underline-offset-4 hover:text-teal-700 hover:underline dark:text-gray-200 dark:hover:text-teal-300"
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
