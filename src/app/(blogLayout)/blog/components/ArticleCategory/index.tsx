"use client";

import { BlogCategory } from "@/app/(blogLayout)/api/types";

interface Props {
  list: BlogCategory[];
}
export const ArticleCategory = ({ list }: Props) => {
  console.log("ArticleCategoryList", list);
  return (
    <div className="flex flex-col gap-5 md:flex sm:hidden max-md:hidden">
      <div
        className="leading-[1.15] md:text-sm sm:text-sm max-sm:text-sm cursor-pointer"
        onClick={() => {
          alert("준비중");
        }}
      >
        <span className="text-white font-bold">전체메뉴</span>
      </div>
      <div className="flex flex-col gap-2">
        {list.map((item) => (
          <div
            key={item.id}
            className="leading-[1.15] md:text-sm sm:text-sm max-sm:text-sm cursor-pointer"
            onClick={() => {
              alert("준비중");
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
