"use client";

import { ArticlePageHeaderDataWithBlur } from "@/app/(blogLayout)/api/types";
import { getBlogTagLabel } from "@/utils/blog-labels";
import { getDistanceFromToday, getYearMonthDay } from "@/utils/date";
import "highlight.js/styles/base16/dracula.min.css";
import Image from "next/image";

interface Props {
  headerItem: ArticlePageHeaderDataWithBlur;
}

const BlogHeader = ({ headerItem }: Props) => {
  // console.log("item", item);
  const sourceLabel =
    headerItem.source === "github"
      ? "GitHub"
      : headerItem.source === "notion"
        ? "Notion"
        : undefined;

  return (
    <div className="flex w-full min-w-0 max-w-4xl flex-col items-start">
      {sourceLabel ? (
        <span className="mb-3 inline-flex rounded-md border border-teal-500/40 px-2 py-0.5 text-xs font-semibold text-teal-700 dark:text-teal-300">
          {sourceLabel}
        </span>
      ) : null}
      <h1 className="max-w-full break-words py-0 text-3xl font-semibold leading-tight tracking-normal sm:text-4xl md:text-5xl">
        {headerItem.title}
      </h1>
      <span className="mb-6">
        {getYearMonthDay(headerItem.createdAt)}&nbsp;&nbsp;
        {getDistanceFromToday(headerItem.createdAt)}
      </span>
      <div className="flex flex-wrap gap-2 mb-12">
        {headerItem.tagList.map((tag) => (
          <div
            key={tag.id}
            className="cursor-default text-[16px] leading-5 font-medium bg-gray-400/30 dark:bg-sky-400/10 rounded-full py-1 px-3 flex items-center "
          >
            {getBlogTagLabel(tag.name)}
          </div>
        ))}
      </div>
      <div className="w-full overflow-hidden rounded-lg">
        <Image
          unoptimized
          src={headerItem.thumbnailUrl}
          alt={headerItem.title}
          width={1200}
          height={675}
          className="h-auto w-full object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default BlogHeader;
