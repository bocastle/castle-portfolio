"use client";

import "highlight.js/styles/base16/dracula.min.css";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";

interface Props {
  content: string;
}

const BlogDetail = ({ content }: Props) => {
  // console.log("content", content);

  return (
    <div className="w-full max-w-4xl">
      {/* {content} */}
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          [remarkToc, { tight: false, heading: "목차" }],
          remarkRehype,
        ]}
        rehypePlugins={[
          rehypeRaw,
          rehypeHighlight,
          rehypeSlug,
          rehypeAutolinkHeadings,
        ]}
        components={{
          h1: (props) => <h1 className="text-3xl font-bold" {...props} />,
          h2: (props) => <h2 className="text-3xl font-bold" {...props} />,
          h3: (props) => <h3 className="text-3xl font-bold" {...props} />,
          h4: (props) => <h4 className="text-3xl font-bold" {...props} />,
          // hr: (props) => <hr className="my-4" {...props} />,
          img: (props) => (
            <div>
              <img {...props} />
            </div>
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
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          pre: (props) => (
            <pre className="bg-gray-800 p-4 rounded" {...props} />
          ),
          code: (props) => (
            <code
              className="text-sm font-mono bg-gray-800 p-1 rounded"
              {...props}
            />
          ),
          p: (props) => <p className="text-lg" {...props} />,
          table: (props) => (
            <table className="table-auto w-full border-collapse" {...props} />
          ),
          td: (props) => (
            <td className="border border-gray-300 p-2" {...props} />
          ),
          th: (props) => (
            <th className="border border-gray-300 p-2" {...props} />
          ),
          blockquote: (props) => (
            <blockquote
              className="border-l-4 border-gray-300 pl-2"
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

export default BlogDetail;
