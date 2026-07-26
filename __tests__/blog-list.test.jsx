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

  it("제목 아래에 그 글의 결론 한 줄을 보여준다", () => {
    render(<BlogList list={[article]} />);

    expect(
      screen.getByText(/되돌아갈 기준을 남긴다/)
    ).toBeInTheDocument();
  });

  it("결론이 없는 글은 결론 줄을 생략한다", () => {
    render(
      <BlogList
        list={[{ ...article, pageId: "unknown-post", tagList: [] }]}
      />
    );

    expect(screen.queryByText(/되돌아갈 기준을 남긴다/)).not.toBeInTheDocument();
  });

  it("질문을 앞에 세우고 제목·태그·날짜는 메타 줄로 내린다", () => {
    render(<BlogList list={[article]} />);

    // 큰 활자 자리는 질문이 차지한다.
    expect(
      screen.getByRole("heading", { name: "파이프라인 단계를 왜 나누나" })
    ).toBeInTheDocument();
    // 제목은 메타 줄에 남는다(제목 자체가 사라지지는 않는다).
    expect(screen.getByText("CI/CD 파이프라인 운영 흐름")).toBeInTheDocument();
    expect(screen.getByText("CI/CD")).toBeInTheDocument();
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it("질문이 없는 글은 제목이 큰 활자 자리를 대신한다", () => {
    render(<BlogList list={[{ ...article, pageId: "unknown-post" }]} />);

    expect(
      screen.getByRole("heading", { name: "CI/CD 파이프라인 운영 흐름" })
    ).toBeInTheDocument();
  });
});
