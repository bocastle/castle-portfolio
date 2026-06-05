/**
 * @jest-environment node
 */

describe("github logs blog source", () => {
  beforeEach(() => {
    process.env.GITHUB_LOGS_BLOG_ENABLED = "true";
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("exposes selected logs articles as GitHub blog list items", async () => {
    const logsBlog = await import("../src/app/(blogLayout)/api/github-logs");

    const pageList = await logsBlog.getPageList();
    const jpaArticle = pageList.find(
      (article) => article.pageId === "logs-jpa-n-plus-one"
    );

    expect(pageList).toHaveLength(21);
    expect(jpaArticle).toMatchObject({
      title: "JPA N+1 쿼리 성능 개선",
      thumbnailUrl: "/images/blog/logs/backend.svg",
      source: "github",
    });
    expect(jpaArticle?.categoryList.map((category) => category.name)).toEqual([
      "Backend",
    ]);
    expect(jpaArticle?.tagList.map((tag) => tag.name)).toEqual(
      expect.arrayContaining(["JPA", "Database"])
    );
  });

  it("fetches selected logs Markdown content from the raw GitHub source", async () => {
    const fetchSpy = jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      text: async () => "# JPA N+1 쿼리 성능 개선\n\n## 원인\n\n본문",
    } as Response);
    const logsBlog = await import("../src/app/(blogLayout)/api/github-logs");

    await expect(
      logsBlog.fetchArticlePageContent("logs-jpa-n-plus-one")
    ).resolves.toEqual({
      parent: expect.stringContaining("## 원인"),
    });
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        "https://raw.githubusercontent.com/bocastle/logs/main/"
      ),
      expect.objectContaining({ next: { revalidate: 3600 } })
    );
  });

  it("routes logs page ids without falling through to other blog sources", async () => {
    const logsBlog = await import("../src/app/(blogLayout)/api/github-logs");

    await expect(
      logsBlog.fetchArticlePageHeaderData("logs-jpa-n-plus-one")
    ).resolves.toMatchObject({
      title: "JPA N+1 쿼리 성능 개선",
      source: "github",
    });
    await expect(
      logsBlog.fetchArticlePageFooterData("logs-jpa-n-plus-one")
    ).resolves.toMatchObject({
      prevArticle: expect.any(Object),
      nextArticle: expect.any(Object),
    });
    expect(logsBlog.isGitHubLogsPageId("logs-jpa-n-plus-one")).toBe(true);
    expect(logsBlog.isGitHubLogsPageId("github-codex-workflow")).toBe(false);
  });

  it("keeps the public logs metadata polished for portfolio readers", async () => {
    const logsBlog = await import("../src/app/(blogLayout)/api/github-logs");

    const pageList = await logsBlog.getPageList();
    const pageIds = pageList.map((article) => article.pageId);
    const mojibakePattern = /[�]|Ã|ì|í|ê|ë|諛|硫|媛|濡/;

    expect(new Set(pageIds).size).toBe(pageIds.length);
    expect(pageList).toHaveLength(21);

    for (const article of pageList) {
      expect(article.pageId).toMatch(/^logs-[a-z0-9-]+$/);
      expect(article.title).not.toMatch(mojibakePattern);
      expect(article.title).not.toMatch(/정리$/);
      expect(article.title).not.toMatch(/면접|준비/);
      expect(article.title.length).toBeGreaterThanOrEqual(6);
      expect(article.thumbnailUrl).toMatch(/^\/images\/blog\/logs\//);
      expect(article.tagList.length).toBeGreaterThanOrEqual(2);

      const header = await logsBlog.fetchArticlePageHeaderData(article.pageId);
      expect(header.description).not.toMatch(mojibakePattern);
      expect(header.description).not.toMatch(/면접|준비/);
      expect(header.description.length).toBeGreaterThanOrEqual(30);
      expect(header.description.length).toBeLessThanOrEqual(120);
    }
  });
});
