"use client";

import { ArticlePageFooterData } from "@/app/(blogLayout)/api/types";
import "highlight.js/styles/base16/dracula.min.css";
import ArticleLinkCard from "./components/ArticleLinkCard";

interface Props {
  footerItem: ArticlePageFooterData;
}

const BlogFooter = ({ footerItem }: Props) => {
  console.log("footerItem", footerItem);

  return (
    <section className="grid grid-cols-2 w-full max-w-4xl">
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
    </section>
  );
};

export default BlogFooter;
