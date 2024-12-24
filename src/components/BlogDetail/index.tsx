"use client";

import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

const BlogDetail = ({ content }: Props) => {
  return (
    <div className="w-full max-w-4xl">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default BlogDetail;
