"use client";

import { ArticlePageFooterData } from "@/app/(blogLayout)/api/types";
import "highlight.js/styles/base16/dracula.min.css";
import ArticleLinkCard from "./components/ArticleLinkCard";

interface Props {
  footerItem: ArticlePageFooterData;
}

const BlogFooter = ({ footerItem }: Props) => {
  return (
    <nav
      aria-label="이전/다음 게시글"
      className="grid w-full max-w-4xl grid-cols-1 gap-3 md:grid-cols-2"
    >
      {footerItem.prevArticle ? (
        <ArticleLinkCard
          articleLinkerDataType="prev"
          articleLinkerData={footerItem.prevArticle}
        />
      ) : (
        <div />
      )}
      {footerItem.nextArticle ? (
        <ArticleLinkCard
          articleLinkerDataType="next"
          articleLinkerData={footerItem.nextArticle}
        />
      ) : (
        <div />
      )}
    </nav>
  );
};

export default BlogFooter;
