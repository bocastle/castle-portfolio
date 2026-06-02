"use client";

import { BlogTag } from "@/app/(blogLayout)/api/types";
import {
  addFilterBlogTag,
  removeFilterBlogTag,
  useArticleFilterStore,
} from "@/store/article-filter.store";

interface Props {
  articleTagInfo: BlogTag;
}

const ArticleTagList = ({ articleTagInfo }: Props) => {
  const { filterBlogTagList } = useArticleFilterStore();
  // console.log("articleTagInfo::", articleTagInfo);
  // console.log("filterBlogTagList::", filterBlogTagList);

  const isSelected = filterBlogTagList.some(
    ({ name }) => articleTagInfo.name === name
  );

  const onToggleFilter = () => {
    if (isSelected) {
      return removeFilterBlogTag(articleTagInfo);
    }
    return addFilterBlogTag(articleTagInfo);
  };

  //가독성이 너무 안좋은데...
  if (isSelected) {
    return (
      <div
        onClick={onToggleFilter}
        className={`w-fit h-auto text-ellipsis cursor-pointer text-[16px] leading-5 font-medium text-stone-950 rounded-xl py-1 px-3 flex items-center bg-stone-400 hover:bg-stone-400 dark:bg-stone-50 dark:hover:bg-stone-100`}
      >
        {articleTagInfo.name}
      </div>
    );
  }
  if (!isSelected) {
    return (
      <div
        onClick={onToggleFilter}
        className={`w-fit h-auto text-ellipsis cursor-pointer text-[16px] leading-5 font-medium text-gray-800 dark:text-sky-100 rounded-xl py-1 px-3 flex items-center hover:bg-stone-400 dark:hover:bg-sky-400/20 bg-gray-400/30 dark:bg-sky-400/10`}
      >
        {articleTagInfo.name}
      </div>
    );
  }
};

export default ArticleTagList;
