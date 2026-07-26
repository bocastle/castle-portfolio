"use client";

import { getBlogQuestion } from "@/app/(blogLayout)/api/blog-questions";
import { getBlogTakeaway } from "@/app/(blogLayout)/api/blog-takeaways";
import { AllArticle } from "@/app/(blogLayout)/api/types";
import {
  loadMoreArticle,
  useArticleFilterStore,
} from "@/store/article-filter.store";
import { trackEvent } from "@/utils/analytics";
import { getBlogTagLabel } from "@/utils/blog-labels";
import { getYearMonthDay } from "@/utils/date";
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
    (node: HTMLElement | null) => {
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
    <div className="w-full min-w-0 border-t border-rule">
      {filteredArticleList.filteredArticleList.map((item, index) => {
        const isLast =
          index === filteredArticleList.filteredArticleList.length - 1;
        const takeaway = getBlogTakeaway(item.pageId);
        const question = getBlogQuestion(item.pageId);

        return (
          <Link
            href={`/blog/${item.pageId}`}
            aria-label={`${item.title} 글 보기`}
            key={item.pageId}
            ref={(el) => {
              if (isLast) lastItemRef(el);
            }}
            onClick={() =>
              trackEvent("Blog Article Click", {
                pageId: item.pageId,
                source: item.source ?? "unknown",
                title: item.title,
              })
            }
            className="group block min-w-0 border-b border-rule py-7 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal motion-reduce:transition-none"
          >
            {/* 질문을 앞에 세운다. 없으면 제목이 그 자리를 대신한다. */}
            <h3 className="break-words py-0 text-[1.375rem] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-200 ease-out group-hover:text-signal motion-reduce:transition-none">
              {question ?? item.title}
            </h3>
            {takeaway ? (
              <p className="mt-2.5 max-w-2xl text-[0.95rem] leading-7 text-muted">
                {takeaway}
              </p>
            ) : null}
            <div className="mt-3.5 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              {question ? (
                <>
                  <span className="normal-case">{item.title}</span>
                  <span aria-hidden="true">·</span>
                </>
              ) : null}
              {item.tagList.length > 0 ? (
                <>
                  <span>{getBlogTagLabel(item.tagList[0].name)}</span>
                  <span aria-hidden="true">·</span>
                </>
              ) : null}
              <span>{getYearMonthDay(item.createdAt)}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;
