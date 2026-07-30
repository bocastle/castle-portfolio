"use client";

import { BlogTag } from "@/app/(blogLayout)/api/types";
import {
  addFilterBlogTag,
  removeFilterBlogTag,
  useArticleFilterStore,
} from "@/store/article-filter.store";
import { trackEvent } from "@/utils/analytics";
import { getBlogTagLabel } from "@/utils/blog-labels";

interface Props {
  articleTagInfo: BlogTag;
}

const ArticleTagList = ({ articleTagInfo }: Props) => {
  const { filterBlogTagList } = useArticleFilterStore();

  const isSelected = filterBlogTagList.some(
    ({ name }) => articleTagInfo.name === name
  );
  const label = getBlogTagLabel(articleTagInfo.name);

  const onToggleFilter = () => {
    trackEvent("Blog Tag Toggle", {
      tag: articleTagInfo.name,
      selected: !isSelected,
    });

    if (isSelected) {
      return removeFilterBlogTag(articleTagInfo);
    }
    return addFilterBlogTag(articleTagInfo);
  };

  // 알약 대신 괘선 한 겹. 선택된 것만 signal로 채워 어떤 필터가 걸렸는지 한눈에 보이게 한다.
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onToggleFilter}
      className={`rounded-sm border px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
        isSelected
          ? "border-signal text-signal"
          : "border-rule text-muted hover:border-signal hover:text-signal"
      }`}
    >
      {label}
    </button>
  );
};

export default ArticleTagList;
