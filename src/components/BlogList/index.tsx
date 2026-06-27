"use client";

import { AllArticle } from "@/app/(blogLayout)/api/types";
import {
  loadMoreArticle,
  useArticleFilterStore,
} from "@/store/article-filter.store";
import { trackEvent } from "@/utils/analytics";
import { getBlogTagLabel } from "@/utils/blog-labels";
import { getDistanceFromToday, getYearMonthDay } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Props {
  list: AllArticle[];
}

const FALLBACK_THUMBNAIL_URL = "/images/blog/logs/backend.svg";

const BlogThumbnail = ({ src }: { src: string }) => {
  const [thumbnailSrc, setThumbnailSrc] = useState(
    src || FALLBACK_THUMBNAIL_URL
  );

  useEffect(() => {
    setThumbnailSrc(src || FALLBACK_THUMBNAIL_URL);
  }, [src]);

  return (
    <Image
      unoptimized
      loading="lazy"
      src={thumbnailSrc}
      alt="thumbnail"
      placeholder="blur"
      onError={() => {
        if (thumbnailSrc !== FALLBACK_THUMBNAIL_URL) {
          setThumbnailSrc(FALLBACK_THUMBNAIL_URL);
        }
      }}
      className="rounded-lg border-[1px] border-gray-400 border-solid object-cover transition-[border-color,filter] duration-200 ease-out group-hover:border-teal-400 group-hover:brightness-95 dark:group-hover:border-teal-500"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      fill
    />
  );
};

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
    <div className="grid w-full min-w-0 grid-cols-1 gap-6 lg:grid-cols-2">
      {filteredArticleList.filteredArticleList.map((item, index) => {
        const sourceLabel =
          item.source === "github"
            ? "GitHub"
            : item.source === "notion"
              ? "Notion"
              : undefined;

        return (
          <Link
            href={`/blog/${item.pageId}`}
            key={item.pageId}
            onClick={() =>
              trackEvent("Blog Article Click", {
                pageId: item.pageId,
                source: item.source ?? "unknown",
                title: item.title,
              })
            }
            className="group flex min-w-0 flex-col items-start gap-5 rounded-lg transition-colors duration-200 ease-out hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none dark:hover:text-teal-300 dark:focus-visible:ring-offset-slate-950"
          >
            <div
              className="relative aspect-[16/9] w-full transform-gpu overflow-hidden rounded-lg transition-[box-shadow,transform] duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-lg group-focus-visible:-translate-y-1 group-focus-visible:shadow-lg motion-reduce:transition-none"
              ref={(el) => {
                if (
                  index ===
                  filteredArticleList.filteredArticleList.length - 1
                )
                  lastItemRef(el);
              }}
            >
              <BlogThumbnail src={item.thumbnailUrl} />
            </div>
            <div className="w-full min-w-0 gap-4">
              {sourceLabel ? (
                <span className="mb-2 inline-flex rounded-md border border-teal-500/40 px-2 py-0.5 text-xs font-semibold text-teal-700 dark:text-teal-300">
                  {sourceLabel}
                </span>
              ) : null}
              <div className="items-start break-words text-xl leading-snug transition-colors duration-200 ease-out group-hover:text-teal-700 dark:group-hover:text-teal-300 sm:text-2xl">
                {item.title}
              </div>
              <div className="mt-2 flex flex-col items-start text-[14px] text-gray-600 dark:text-indigo-300">
                {getYearMonthDay(item.createdAt)}&nbsp;&nbsp;
                {getDistanceFromToday(item.createdAt)}
              </div>
              <div className="flex flex-wrap gap-3 pt-2 items-start">
                {item.tagList.map((tag) => (
                  <div
                    key={tag.id}
                    className="cursor-default text-[16px] leading-5 font-medium bg-gray-400/30 dark:bg-sky-400/10 rounded-full py-1 px-3 flex items-center"
                  >
                    {getBlogTagLabel(tag.name)}
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
