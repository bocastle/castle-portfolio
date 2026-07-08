import * as githubLogsBlogSource from "./github-logs";
import * as githubMarkdownBlogSource from "./github-markdown";
import * as notionBlogSource from "./notion";
import {
  withGeneratedBlogThumbnail,
  withGeneratedBlogThumbnailForPageId,
} from "./blog-thumbnails";
import {
  AllArticle,
  ArticleCategoryProps,
  ArticlePageFooterData,
  ArticlePageHeaderDataWithBlur,
  BlogCategory,
  BlogTag,
} from "./types";

const FALLBACK_THUMBNAIL_URL = "https://i.ibb.co/7nxjpqB/image.png";
const FALLBACK_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==";

const sortArticleList = (list: AllArticle[]) =>
  [...list].sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
  );

const withSource = (list: AllArticle[], source: "notion" | "github") =>
  list.map((article) => ({
    ...article,
    source: article.source ?? source,
  }));

const uniqueByName = <T extends { name: string }>(items: T[]) =>
  Array.from(new Map(items.map((item) => [item.name, item])).values()).sort(
    (left, right) => (left.name > right.name ? 1 : -1)
  );

const safeRead = async <T>(
  read: () => Promise<T>,
  fallback: T,
  label: string
) => {
  try {
    return await read();
  } catch (error) {
    console.warn(label, error);
    return fallback;
  }
};

const fallbackArticleHeader = (): ArticlePageHeaderDataWithBlur => ({
  title: "블로그 글을 불러오지 못했습니다",
  description:
    "로컬 Notion 환경 변수가 없거나 유효하지 않아 글 정보를 불러오지 못했습니다.",
  categoryList: [],
  tagList: [],
  createdAt: new Date(),
  thumbnailUrl: FALLBACK_THUMBNAIL_URL,
  blurDataUrl: FALLBACK_BLUR_DATA_URL,
});

const fallbackArticleContent = () => ({
  parent: [
    "## 블로그 글을 불러오지 못했습니다",
    "",
    "로컬 Notion API token이 없거나 유효하지 않아 이 글의 본문을 불러오지 못했습니다.",
    "",
    "배포 환경에서는 정상 동작할 수 있으므로, 로컬 QA가 필요하면 `.env`의 Notion 설정을 확인하세요.",
  ].join("\n"),
});

export const getPageList = async (): Promise<AllArticle[]> => {
  const [notionPageList, githubPageList, githubLogsPageList] =
    await Promise.all([
      safeRead(
        () => notionBlogSource.getPageList(),
        [] as AllArticle[],
        "Failed to fetch Notion page list from blog facade"
      ),
      safeRead(
        () => githubMarkdownBlogSource.getPageList(),
        [] as AllArticle[],
        "Failed to fetch GitHub Markdown page list from blog facade"
      ),
      safeRead(
        () => githubLogsBlogSource.getPageList(),
        [] as AllArticle[],
        "Failed to fetch GitHub logs page list from blog facade"
      ),
    ]);

  return sortArticleList([
    ...withSource(notionPageList, "notion"),
    ...withSource(githubPageList, "github"),
    ...withSource(githubLogsPageList, "github"),
  ]).map(withGeneratedBlogThumbnail);
};

export const getCategoryList = async ({
  categoryName,
}: ArticleCategoryProps): Promise<AllArticle[]> => {
  const [notionCategoryList, githubCategoryList, githubLogsCategoryList] =
    await Promise.all([
      safeRead(
        () => notionBlogSource.getCategoryList({ categoryName }),
        [] as AllArticle[],
        "Failed to fetch Notion category list from blog facade"
      ),
      safeRead(
        () => githubMarkdownBlogSource.getCategoryList({ categoryName }),
        [] as AllArticle[],
        "Failed to fetch GitHub Markdown category list from blog facade"
      ),
      safeRead(
        () => githubLogsBlogSource.getCategoryList({ categoryName }),
        [] as AllArticle[],
        "Failed to fetch GitHub logs category list from blog facade"
      ),
    ]);

  const mergedList = sortArticleList([
    ...withSource(notionCategoryList, "notion"),
    ...withSource(githubCategoryList, "github"),
    ...withSource(githubLogsCategoryList, "github"),
  ]).map(withGeneratedBlogThumbnail);

  if (!categoryName) {
    return mergedList;
  }

  return mergedList.filter((article) =>
    article.categoryList.some((category) => category.name === categoryName)
  );
};

export const getArticleCategoryList = async (): Promise<BlogCategory[]> => {
  const [notionCategoryList, githubCategoryList, githubLogsCategoryList] =
    await Promise.all([
      safeRead(
        () => notionBlogSource.getArticleCategoryList(),
        [] as BlogCategory[],
        "Failed to fetch Notion article categories from blog facade"
      ),
      safeRead(
        () => githubMarkdownBlogSource.getArticleCategoryList(),
        [] as BlogCategory[],
        "Failed to fetch GitHub Markdown article categories from blog facade"
      ),
      safeRead(
        () => githubLogsBlogSource.getArticleCategoryList(),
        [] as BlogCategory[],
        "Failed to fetch GitHub logs article categories from blog facade"
      ),
    ]);

  return uniqueByName([
    ...notionCategoryList,
    ...githubCategoryList,
    ...githubLogsCategoryList,
  ]);
};

export const getArticleTagList = async (): Promise<BlogTag[]> => {
  const [notionTagList, githubTagList, githubLogsTagList] = await Promise.all([
    safeRead(
      () => notionBlogSource.getArticleTagList(),
      [] as BlogTag[],
      "Failed to fetch Notion article tags from blog facade"
    ),
    safeRead(
      () => githubMarkdownBlogSource.getArticleTagList(),
      [] as BlogTag[],
      "Failed to fetch GitHub Markdown article tags from blog facade"
    ),
    safeRead(
      () => githubLogsBlogSource.getArticleTagList(),
      [] as BlogTag[],
      "Failed to fetch GitHub logs article tags from blog facade"
    ),
  ]);

  return uniqueByName([...notionTagList, ...githubTagList, ...githubLogsTagList]);
};

export const getArticlePageHeaderData = async (pageId: string) => {
  if (githubLogsBlogSource.isGitHubLogsPageId(pageId)) {
    return withGeneratedBlogThumbnailForPageId(
      pageId,
      await githubLogsBlogSource.getArticlePageHeaderData(pageId)
    );
  }

  if (githubMarkdownBlogSource.isGitHubMarkdownPageId(pageId)) {
    return withGeneratedBlogThumbnailForPageId(
      pageId,
      await githubMarkdownBlogSource.getArticlePageHeaderData(pageId)
    );
  }

  const header = await safeRead(
    () => notionBlogSource.getArticlePageHeaderData(pageId),
    fallbackArticleHeader(),
    "Failed to fetch Notion article header from blog facade"
  );
  return withGeneratedBlogThumbnailForPageId(pageId, {
    ...header,
    source: header.source ?? "notion",
  });
};

export const fetchArticlePageHeaderData = async (pageId: string) => {
  if (githubLogsBlogSource.isGitHubLogsPageId(pageId)) {
    return withGeneratedBlogThumbnailForPageId(
      pageId,
      await githubLogsBlogSource.fetchArticlePageHeaderData(pageId)
    );
  }

  if (githubMarkdownBlogSource.isGitHubMarkdownPageId(pageId)) {
    return withGeneratedBlogThumbnailForPageId(
      pageId,
      await githubMarkdownBlogSource.fetchArticlePageHeaderData(pageId)
    );
  }

  const header = await safeRead(
    () => notionBlogSource.fetchArticlePageHeaderData(pageId),
    fallbackArticleHeader(),
    "Failed to fetch Notion article header from blog facade"
  );
  return withGeneratedBlogThumbnailForPageId(pageId, {
    ...header,
    source: header.source ?? "notion",
  });
};

export const fetchArticlePageContent = async (pageId: string) => {
  if (githubLogsBlogSource.isGitHubLogsPageId(pageId)) {
    return githubLogsBlogSource.fetchArticlePageContent(pageId);
  }

  if (githubMarkdownBlogSource.isGitHubMarkdownPageId(pageId)) {
    return githubMarkdownBlogSource.fetchArticlePageContent(pageId);
  }

  return safeRead(
    () => notionBlogSource.fetchArticlePageContent(pageId),
    fallbackArticleContent(),
    "Failed to fetch Notion article content from blog facade"
  );
};

export const fetchArticlePageFooterData = async (
  pageId: string
): Promise<ArticlePageFooterData> => {
  if (githubLogsBlogSource.isGitHubLogsPageId(pageId)) {
    return githubLogsBlogSource.fetchArticlePageFooterData(pageId);
  }

  if (githubMarkdownBlogSource.isGitHubMarkdownPageId(pageId)) {
    return githubMarkdownBlogSource.fetchArticlePageFooterData(pageId);
  }

  return safeRead(
    () => notionBlogSource.fetchArticlePageFooterData(pageId),
    {},
    "Failed to fetch Notion article footer from blog facade"
  );
};
