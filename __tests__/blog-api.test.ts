jest.mock("../src/app/(blogLayout)/api/notion", () => ({
  fetchArticlePageContent: jest.fn(),
  fetchArticlePageFooterData: jest.fn(),
  fetchArticlePageHeaderData: jest.fn(),
  getArticleCategoryList: jest.fn(),
  getArticlePageHeaderData: jest.fn(),
  getArticleTagList: jest.fn(),
  getCategoryList: jest.fn(),
  getPageList: jest.fn(),
}));

describe("blog api facade", () => {
  it("Notion 전용 함수들을 블로그 소스 진입점으로 노출한다", async () => {
    const blogApi = await import("../src/app/(blogLayout)/api/blog");

    expect(typeof blogApi.getPageList).toBe("function");
    expect(typeof blogApi.getCategoryList).toBe("function");
    expect(typeof blogApi.getArticleTagList).toBe("function");
    expect(typeof blogApi.getArticlePageHeaderData).toBe("function");
    expect(typeof blogApi.fetchArticlePageContent).toBe("function");
  });
});
