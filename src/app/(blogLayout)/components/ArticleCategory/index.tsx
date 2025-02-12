"use client";

import { BlogCategory } from "@/app/(blogLayout)/api/types";
import Link from "next/link";

interface Props {
  list: BlogCategory[];
}
export const ArticleCategory = ({ list }: Props) => {
  // console.log("ArticleCategoryList", list);
  return (
    <div className="flex flex-col gap-5 md:flex sm:hidden max-md:hidden">
      <Link
        className="leading-[1.15] md:text-sm sm:text-sm max-sm:text-sm cursor-pointer"
        href={"/categories"}
      >
        <span className="font-bold">전체메뉴</span>
      </Link>

      <div className="flex flex-col gap-2">
        {list.map((item) => (
          <Link
            key={item.id}
            className="leading-[1.15] md:text-sm sm:text-sm max-sm:text-sm cursor-pointer"
            href={encodeURI(`/categories/${item.name}`)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
