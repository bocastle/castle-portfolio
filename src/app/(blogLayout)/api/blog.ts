import {
  fetchArticlePageContent,
  fetchArticlePageFooterData,
  fetchArticlePageHeaderData,
  getArticleCategoryList,
  getArticlePageHeaderData,
  getArticleTagList,
  getCategoryList,
  getPageList,
} from "./notion";

type BlogSource = {
  fetchArticlePageContent: typeof fetchArticlePageContent;
  fetchArticlePageFooterData: typeof fetchArticlePageFooterData;
  fetchArticlePageHeaderData: typeof fetchArticlePageHeaderData;
  getArticleCategoryList: typeof getArticleCategoryList;
  getArticlePageHeaderData: typeof getArticlePageHeaderData;
  getArticleTagList: typeof getArticleTagList;
  getCategoryList: typeof getCategoryList;
  getPageList: typeof getPageList;
};

const notionBlogSource: BlogSource = {
  fetchArticlePageContent,
  fetchArticlePageFooterData,
  fetchArticlePageHeaderData,
  getArticleCategoryList,
  getArticlePageHeaderData,
  getArticleTagList,
  getCategoryList,
  getPageList,
};

const getActiveBlogSource = () => notionBlogSource;

export const fetchArticlePageContentFromBlogSource: BlogSource["fetchArticlePageContent"] =
  (...args) => getActiveBlogSource().fetchArticlePageContent(...args);

export const fetchArticlePageFooterDataFromBlogSource: BlogSource["fetchArticlePageFooterData"] =
  (...args) => getActiveBlogSource().fetchArticlePageFooterData(...args);

export const fetchArticlePageHeaderDataFromBlogSource: BlogSource["fetchArticlePageHeaderData"] =
  (...args) => getActiveBlogSource().fetchArticlePageHeaderData(...args);

export const getArticleCategoryListFromBlogSource: BlogSource["getArticleCategoryList"] =
  (...args) => getActiveBlogSource().getArticleCategoryList(...args);

export const getArticlePageHeaderDataFromBlogSource: BlogSource["getArticlePageHeaderData"] =
  (...args) => getActiveBlogSource().getArticlePageHeaderData(...args);

export const getArticleTagListFromBlogSource: BlogSource["getArticleTagList"] =
  (...args) => getActiveBlogSource().getArticleTagList(...args);

export const getCategoryListFromBlogSource: BlogSource["getCategoryList"] =
  (...args) => getActiveBlogSource().getCategoryList(...args);

export const getPageListFromBlogSource: BlogSource["getPageList"] = (...args) =>
  getActiveBlogSource().getPageList(...args);

export {
  fetchArticlePageContentFromBlogSource as fetchArticlePageContent,
  fetchArticlePageFooterDataFromBlogSource as fetchArticlePageFooterData,
  fetchArticlePageHeaderDataFromBlogSource as fetchArticlePageHeaderData,
  getArticleCategoryListFromBlogSource as getArticleCategoryList,
  getArticlePageHeaderDataFromBlogSource as getArticlePageHeaderData,
  getArticleTagListFromBlogSource as getArticleTagList,
  getCategoryListFromBlogSource as getCategoryList,
  getPageListFromBlogSource as getPageList,
};
