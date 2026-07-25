import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BlogList from "../src/components/BlogList";

jest.mock("../src/store/article-filter.store", () => ({
  loadMoreArticle: jest.fn(),
  useArticleFilterStore: () => ({
    filterBlogTagList: [],
    articleSliceLength: 10,
  }),
}));

jest.mock("../src/utils/analytics", () => ({
  trackEvent: jest.fn(),
}));

const article = {
  id: 1,
  pageId: "logs-cicd-pipeline",
  title: "CI/CD 파이프라인 운영 흐름",
  categoryList: [{ id: 1, name: "DevOps" }],
  tagList: [
    { id: 1, name: "CI/CD" },
    { id: 2, name: "배포" },
  ],
  createdAt: new Date("2026-06-01T00:00:00.000Z"),
  updatedAt: new Date("2026-06-01T00:00:00.000Z"),
  thumbnailUrl: "/images/blog/logs/devops.svg",
  source: "github",
};

describe("BlogList", () => {
  it("글을 카드가 아니라 괘선으로 구분된 행으로 보여준다", () => {
    render(<BlogList list={[article]} />);

    const link = screen.getByRole("link", {
      name: /CI\/CD 파이프라인 운영 흐름/,
    });

    expect(link).toHaveAttribute("href", "/blog/logs-cicd-pipeline");
    expect(link).toHaveClass("border-b");
    expect(link).toHaveClass("border-rule");
    // 카드 들어올림/그림자는 쓰지 않는다.
    expect(link).not.toHaveClass("hover:shadow-lg");
    expect(link).not.toHaveClass("hover:-translate-y-1");
  });

  it("목록에 썸네일 이미지를 렌더하지 않는다", () => {
    render(<BlogList list={[article]} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("첫 태그와 날짜를 메타 줄에 두고 나머지 태그는 아래에 둔다", () => {
    render(<BlogList list={[article]} />);

    expect(screen.getByText("CI/CD")).toBeInTheDocument();
    expect(screen.getByText("배포")).toBeInTheDocument();
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });
});
