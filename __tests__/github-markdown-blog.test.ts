/**
 * @jest-environment node
 */
import path from "path";

process.env.GITHUB_MARKDOWN_BLOG_DIR = path.join(
  process.cwd(),
  "__tests__",
  "fixtures",
  "blog-markdown"
);

describe("github markdown blog source", () => {
  it("frontmatter가 있는 Markdown 글을 블로그 목록 데이터로 변환한다", async () => {
    const githubBlog = await import("../src/app/(blogLayout)/api/github-markdown");

    const pageList = await githubBlog.getPageList();

    expect(pageList).toHaveLength(2);
    expect(pageList[0]).toMatchObject({
      pageId: "github-fullstack-service-ops",
      title: "풀스택 개발자로 서비스 운영 흐름 다루기",
      source: "github",
      thumbnailUrl: "/images/projects/castlecms/external-api-clients.png",
    });
    expect(pageList[1]).toMatchObject({
      pageId: "github-codex-workflow",
      title: "Codex로 포트폴리오 QA 자동화하기",
      source: "github",
      thumbnailUrl: "/images/projects/castlecms/dashboard-posts-media.png",
    });
    expect(pageList[1].categoryList.map((category) => category.name)).toEqual([
      "AI 개발",
    ]);
    expect(pageList[1].tagList.map((tag) => tag.name)).toEqual(["Codex", "QA"]);
  });

  it("frontmatter slug를 GitHub Markdown pageId로 사용한다", async () => {
    const githubBlog = await import("../src/app/(blogLayout)/api/github-markdown");

    await expect(
      githubBlog.fetchArticlePageHeaderData("github-fullstack-service-ops")
    ).resolves.toMatchObject({
      title: "풀스택 개발자로 서비스 운영 흐름 다루기",
      source: "github",
    });
    await expect(
      githubBlog.fetchArticlePageContent("github-fullstack-service-ops")
    ).resolves.toMatchObject({
      parent: expect.stringContaining("## 서비스 흐름을 함께 보는 이유"),
    });
  });

  it("Markdown 본문과 상세 header/footer 데이터를 pageId로 조회한다", async () => {
    const githubBlog = await import("../src/app/(blogLayout)/api/github-markdown");

    await expect(
      githubBlog.fetchArticlePageContent("github-codex-workflow")
    ).resolves.toMatchObject({
      parent: expect.stringContaining("## 자동 QA를 붙인 이유"),
    });
    await expect(
      githubBlog.fetchArticlePageHeaderData("github-codex-workflow")
    ).resolves.toMatchObject({
      title: "Codex로 포트폴리오 QA 자동화하기",
      source: "github",
    });
    await expect(
      githubBlog.fetchArticlePageFooterData("github-codex-workflow")
    ).resolves.toEqual({
      prevArticle: {
        pageId: "github-fullstack-service-ops",
        title: "풀스택 개발자로 서비스 운영 흐름 다루기",
      },
    });
  });
});
