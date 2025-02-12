"use client";

import { AllArticle } from "@/app/(blogLayout)/api/types";
import {
  loadMoreArticle,
  useArticleFilterStore,
} from "@/store/article-filter.store";
import { getDistanceFromToday, getYearMonthDay } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useRef } from "react";

interface Props {
  list: AllArticle[];
}

const BlogList = ({ list }: Props) => {
  // console.log("BlogList::", list);
  const observer = useRef<IntersectionObserver | null>(null);
  const { filterBlogTagList, articleSliceLength } = useArticleFilterStore();
  const filteredArticleList = useMemo(() => {
    const filterTagIdSet = new Set(filterBlogTagList.map(({ id }) => id));

    const filteredArticleList =
      filterTagIdSet.size > 0
        ? list.filter(({ tagList }) =>
            tagList.some((tag) => filterTagIdSet.has(tag.id))
          )
        : list;

    const slicedArticleList = filteredArticleList.slice(0, articleSliceLength);
    const isMoreArticleLoadable =
      filteredArticleList.length > articleSliceLength;

    return {
      filteredArticleList: slicedArticleList,
      isMoreArticleLoadable,
    };
  }, [list, filterBlogTagList, articleSliceLength]);

  // console.log("filteredArticleList", filteredArticleList.filteredArticleList);
  // console.log("filteredArticleList", filteredArticleList.isMoreArticleLoadable);

  // infinite scroll
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      // console.log("lastItemRef", filteredArticleList.isMoreArticleLoadable);
      if (!filteredArticleList.isMoreArticleLoadable) return;

      const options: IntersectionObserverInit = {
        root: document.querySelector("#blog_layout_container"),
        rootMargin: "10px", // 컨테이너 마직 추가해서 아이템 올라올때 일찍 오버랩되게
        threshold: 0.5,
      };
      // console.log("options", options);

      // 무한스크롤 어느 지점에 도달시 페이지넘버 올라가면서 데이터 불러옴.
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          loadMoreArticle();
        }
      }, options);

      if (node) observer.current.observe(node);
    },
    [filteredArticleList.isMoreArticleLoadable]
  );

  return (
    <div className="grid grid-cols-2 max-xl:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1 gap-6">
      {filteredArticleList.filteredArticleList.map((item, index) => {
        return (
          <Link
            href={`/blog/${item.pageId}`}
            key={item.pageId}
            className="flex flex-col items-start gap-5"
          >
            <div
              className="w-[476px] h-[270px] relative max-2xl:w-[370px] max-xl:w-80 max-lg:w-96 max-md:w-96 max-md:h-[270px]"
              ref={(el) => {
                if (
                  index ===
                  filteredArticleList.filteredArticleList.length - 1
                )
                  lastItemRef(el);
              }}
            >
              <Image
                unoptimized
                loading="lazy"
                src={item.thumbnailUrl}
                alt="thumbnail"
                placeholder="blur"
                className="rounded-lg border-[1px] border-gray-400 border-solid hover:rounded-lg hover:border-[1px] hover:border-gray-400 after:hover:border-solid after:hover:transition-opacity after:hover:opacity-100 after:hover:duration-700 after:hover:ease-in-out"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==" // 추가
                fill
              />
            </div>
            <div className="gap-4 w-[476px] max-2xl:w-[370px] max-xl:w-80 max-lg:w-96 max-md:w-96">
              <div className="items-start overflow-hidden whitespace-nowrap text-ellipsis text-[24px]">
                {item.title}
              </div>
              <div className="flex flex-col gap-24 items-start text-[14px] text-gray-600 dark:text-indigo-300">
                {getYearMonthDay(item.createdAt)}&nbsp;&nbsp;
                {getDistanceFromToday(item.createdAt)}
              </div>
              <div className="flex gap-3 pt-2 items-start">
                {item.tagList.map((tag) => (
                  <div
                    key={tag.id}
                    className="cursor-default text-[16px] leading-5 font-medium bg-gray-400/30 dark:bg-sky-400/10 rounded-full py-1 px-3 flex items-center"
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;
