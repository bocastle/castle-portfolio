"use client";

import { ArticlePageHeaderDataWithBlur } from "@/app/(blogLayout)/api/types";
import { getDistanceFromToday, getYearMonthDay } from "@/utils/date";
import "highlight.js/styles/base16/dracula.min.css";
import Image from "next/image";

interface Props {
  headerItem: ArticlePageHeaderDataWithBlur;
}

const BlogHeader = ({ headerItem }: Props) => {
  // console.log("item", item);

  return (
    <div className="flex flex-col items-start w-full max-w-4xl max-md:w-max">
      <h1>{headerItem.title}</h1>
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
            {tag.name}
          </div>
        ))}
      </div>
      <div className="max-md:w-96">
        <Image
          unoptimized
          src={headerItem.thumbnailUrl}
          alt={headerItem.title}
          width={0}
          height={0}
          // objectFit={"contain"}
          style={{ width: "100%" }}
          priority
        />
      </div>
    </div>
  );
};

export default BlogHeader;
