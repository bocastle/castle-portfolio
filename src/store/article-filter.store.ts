import { BlogTag } from "@/app/(blogLayout)/api/types";
import { proxy, useSnapshot } from "valtio";

export const store = proxy<{
  filterBlogTagList: BlogTag[];
  articleSliceLength: number;
}>({
  filterBlogTagList: [],
  articleSliceLength: 10,
});

export const addFilterBlogTag = (tag: BlogTag) => {
  store.filterBlogTagList.push(tag);
  store.articleSliceLength = 10;
};

export const removeFilterBlogTag = (tag: BlogTag) => {
  store.filterBlogTagList = [...store.filterBlogTagList].filter(
    ({ id }) => id !== tag.id
  );
  store.articleSliceLength = 10;
};

export const loadMoreArticle = () => {
  store.articleSliceLength += 10;
};

export const resetFilterStore = () => {
  store.filterBlogTagList = [];
  store.articleSliceLength = 10;
};

export const useArticleFilterStore = () => useSnapshot(store);
