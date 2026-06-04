/**
 * @jest-environment node
 */
import path from "path";
import { AllArticle } from "../src/app/(blogLayout)/api/types";

process.env.GITHUB_MARKDOWN_BLOG_DIR = path.join(
  process.cwd(),
  "__tests__",
  "fixtures",
  "blog-markdown"
);
process.env.GITHUB_LOGS_BLOG_ENABLED = "false";

const notionArticle: AllArticle = {
  id: 1,
  title: "Notion에서 작성한 글",
  categoryList: [{ id: "notion-category-dev", name: "개발", description: null }],
  tagList: [{ id: "notion-tag-next", name: "Next.js" }],
  createdAt: new Date("2026-06-01"),
  updatedAt: new Date("2026-06-02"),
  thumbnailUrl: "https://example.com/notion.png",
  pageId: "notion-page",
};

const mockNotionApi = {
  fetchArticlePageContent: jest.fn(),
  fetchArticlePageFooterData: jest.fn(),
  fetchArticlePageHeaderData: jest.fn(),
  getArticleCategoryList: jest.fn(),
  getArticlePageHeaderData: jest.fn(),
  getArticleTagList: jest.fn(),
  getCategoryList: jest.fn(),
  getPageList: jest.fn(),
};

jest.mock("../src/app/(blogLayout)/api/notion", () => mockNotionApi);

describe("blog api facade", () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => undefined);

    mockNotionApi.fetchArticlePageContent.mockResolvedValue({
      parent: "## Notion 본문",
    });
    mockNotionApi.fetchArticlePageFooterData.mockResolvedValue({});
    mockNotionApi.fetchArticlePageHeaderData.mockResolvedValue({
      title: notionArticle.title,
      description: "Notion 글 설명",
      categoryList: notionArticle.categoryList,
      tagList: notionArticle.tagList,
      createdAt: notionArticle.createdAt,
      thumbnailUrl: notionArticle.thumbnailUrl,
      blurDataUrl: notionArticle.thumbnailUrl,
    });
    mockNotionApi.getArticleCategoryList.mockResolvedValue(
      notionArticle.categoryList
    );
    mockNotionApi.getArticlePageHeaderData.mockResolvedValue({
      title: notionArticle.title,
      description: "Notion 글 설명",
      categoryList: notionArticle.categoryList,
      tagList: notionArticle.tagList,
      createdAt: notionArticle.createdAt,
      thumbnailUrl: notionArticle.thumbnailUrl,
      blurDataUrl: notionArticle.thumbnailUrl,
    });
    mockNotionApi.getArticleTagList.mockResolvedValue(notionArticle.tagList);
    mockNotionApi.getCategoryList.mockResolvedValue([notionArticle]);
    mockNotionApi.getPageList.mockResolvedValue([notionArticle]);
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it("Notion 글과 GitHub Markdown 글을 하나의 목록으로 병합한다", async () => {
    const blogApi = await import("../src/app/(blogLayout)/api/blog");

    const pageList = await blogApi.getPageList();
    const tagList = await blogApi.getArticleTagList();
    const categoryList = await blogApi.getArticleCategoryList();
    const githubCategoryList = await blogApi.getCategoryList({
      categoryName: "AI 개발",
    });

    expect(pageList.map((article) => article.title)).toEqual([
      "풀스택 개발자로 서비스 운영 흐름 다루기",
      "Codex로 포트폴리오 QA 자동화하기",
      "Notion에서 작성한 글",
    ]);
    expect(tagList.map((tag) => tag.name)).toEqual([
      "AI 개발",
      "Codex",
      "Fullstack",
      "Next.js",
      "QA",
      "운영",
    ]);
    expect(categoryList.map((category) => category.name)).toEqual([
      "AI 개발",
      "개발",
      "커리어",
    ]);
    expect(githubCategoryList.map((article) => article.pageId)).toEqual([
      "github-codex-workflow",
    ]);
  });

  it("GitHub Markdown pageId는 Notion을 거치지 않고 상세 데이터를 조회한다", async () => {
    const blogApi = await import("../src/app/(blogLayout)/api/blog");

    await expect(
      blogApi.fetchArticlePageContent("github-codex-workflow")
    ).resolves.toMatchObject({
      parent: expect.stringContaining("## 자동 QA를 붙인 이유"),
    });
    await expect(
      blogApi.fetchArticlePageHeaderData("github-codex-workflow")
    ).resolves.toMatchObject({
      title: "Codex로 포트폴리오 QA 자동화하기",
      source: "github",
    });
    expect(mockNotionApi.fetchArticlePageContent).not.toHaveBeenCalled();
    expect(mockNotionApi.fetchArticlePageHeaderData).not.toHaveBeenCalled();
  });

  it("Notion 상세 조회가 실패하면 블로그 상세가 500으로 터지지 않도록 fallback을 반환한다", async () => {
    mockNotionApi.fetchArticlePageContent.mockRejectedValue(
      new Error("invalid notion token")
    );
    mockNotionApi.fetchArticlePageHeaderData.mockRejectedValue(
      new Error("invalid notion token")
    );
    mockNotionApi.fetchArticlePageFooterData.mockRejectedValue(
      new Error("invalid notion token")
    );

    const blogApi = await import("../src/app/(blogLayout)/api/blog");

    await expect(blogApi.fetchArticlePageContent("notion-page")).resolves.toEqual({
      parent: expect.stringContaining("블로그 글을 불러오지 못했습니다"),
    });
    await expect(
      blogApi.fetchArticlePageHeaderData("notion-page")
    ).resolves.toMatchObject({
      title: "블로그 글을 불러오지 못했습니다",
      tagList: [],
    });
    await expect(blogApi.fetchArticlePageFooterData("notion-page")).resolves.toEqual(
      {}
    );
  });
});
