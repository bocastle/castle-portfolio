"use client";

import { BlogTag } from "@/app/(blogLayout)/api/types";
import { useState } from "react";
import ArticleTagList from ".";

interface Props {
  /** 글에 많이 붙은 순서로 정렬된 태그. */
  tagList: BlogTag[];
}

/** 처음에 펼쳐 둘 개수. 넘는 것은 접는다. */
const VISIBLE_COUNT = 14;

/**
 * 태그가 40개를 넘으면 필터가 아니라 벽이 된다.
 * 많이 쓰인 것부터 보여주고 나머지는 접어 둔다.
 */
const TagFilterBar = ({ tagList }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const hasMore = tagList.length > VISIBLE_COUNT;
  const shownList = expanded ? tagList : tagList.slice(0, VISIBLE_COUNT);
  const restCount = tagList.length - VISIBLE_COUNT;

  return (
    <div className="flex w-full flex-wrap items-start gap-2 pt-4">
      {shownList.map((tag) => (
        <ArticleTagList key={tag.id} articleTagInfo={tag} />
      ))}

      {hasMore ? (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
          className="inline-flex min-h-[36px] items-center rounded-sm px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted underline decoration-rule underline-offset-4 transition-colors hover:text-signal hover:decoration-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        >
          {expanded ? "접기" : `+${restCount}개 더`}
        </button>
      ) : null}
    </div>
  );
};

export default TagFilterBar;
