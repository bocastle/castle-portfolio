import { AllArticle } from "./types";

/**
 * 목록·sitemap에서 감출 글.
 *
 * 글 자체를 지우지는 않는다. URL로 들어오면 그대로 열린다.
 * 원본(Notion)에서 제목을 고치거나 비공개로 바꾸면 여기서 빼면 된다.
 */
const HIDDEN_PAGE_IDS = new Set<string>([
  // 제목이 LCP 경고 메시지로 저장되어 있다. Notion에서 제목을 고치면 해제.
  "1765abe4-94ef-80d1-af95-d9ca8e74d1b3",
]);

/** 제목이 없는 글은 목록에 세울 수 없다. */
const hasUsableTitle = (article: AllArticle) =>
  typeof article.title === "string" && article.title.trim().length > 0;

export const isListableArticle = (article: AllArticle) =>
  hasUsableTitle(article) && !HIDDEN_PAGE_IDS.has(article.pageId);

export const filterListableArticles = (list: AllArticle[]) =>
  list.filter(isListableArticle);
