"use client";

import { BlogCategory } from "@/app/(blogLayout)/api/types";
import { trackEvent } from "@/utils/analytics";
import { getBlogCategoryLabel } from "@/utils/blog-labels";
import Link from "next/link";

interface Props {
  list: BlogCategory[];
}

/**
 * 카테고리 가로 줄.
 * 좌측 사이드바를 걷어낸 뒤 카테고리로 들어가는 입구다.
 * 세로 목록이 아니라 한 줄로 두어 문서사이트 느낌을 만들지 않는다.
 */
export const ArticleCategory = ({ list }: Props) => {
  const linkClass =
    "font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted underline decoration-transparent underline-offset-4 transition-colors hover:text-signal hover:decoration-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal";

  return (
    <nav
      aria-label="카테고리"
      className="flex w-full flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-rule pb-6"
    >
      <Link
        className={linkClass}
        href="/categories"
        onClick={() => trackEvent("Blog Category Click", { category: "all" })}
      >
        전체
      </Link>
      {list.map((item) => (
        <Link
          key={item.id}
          className={linkClass}
          href={encodeURI(`/categories/${item.name}`)}
          onClick={() =>
            trackEvent("Blog Category Click", {
              category: item.name,
              categoryLabel: getBlogCategoryLabel(item.name),
            })
          }
        >
          {getBlogCategoryLabel(item.name)}
        </Link>
      ))}
    </nav>
  );
};
